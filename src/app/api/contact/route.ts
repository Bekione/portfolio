import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/components/email-templates/ContactFormEmail";
import { ContactFormAdminEmailTemplate } from "@/components/email-templates/ContactFormAdminNotification";
import { contactSchema } from "@/lib/contactValidation";


// In-memory IP rate limiter: max 3 transmissions per 10 minutes per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS,
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  // Periodically clean up stale entries to prevent memory leak
  if (rateLimitMap.size > 500) {
    for (const [key, times] of rateLimitMap.entries()) {
      const active = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) rateLimitMap.delete(key);
      else rateLimitMap.set(key, active);
    }
  }

  return false;
}

export async function POST(req: Request) {
  try {
    // Rate limit check: prevent rapid repeated human or bot spam
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded
      ? forwarded.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          error:
            "Too many transmissions sent from this network. Please wait a few minutes before submitting another inquiry.",
        },
        { status: 429 },
      );
    }

    const rawBody = await req.json();

    // Map `fullname` to `name` if provided
    const payload = {
      ...rawBody,
      name: rawBody.name ?? rawBody.fullname,
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return NextResponse.json(
        { error: issue?.message || "Invalid input data" },
        { status: 400 },
      );
    }

    const { name, email, subject, message, token, honeypot } = parsed.data;

    // Honeypot bot trap: silently succeed without sending emails
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json(
        { message: "Message sent successfully!" },
        { status: 200 },
      );
    }

    // Cloudflare Turnstile server-side verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret && token) {
      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: token,
          }),
        },
      );

      const outcome = await turnstileRes.json();
      if (!outcome.success) {
        return NextResponse.json(
          { error: "Security verification failed. Please try again." },
          { status: 400 },
        );
      }
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn(
        "[Contact API] RESEND_API_KEY is not set. Skipping actual email dispatch (dev mode).",
      );
      return NextResponse.json(
        { message: "Message queued successfully (development mode)." },
        { status: 200 },
      );
    }

    const resend = new Resend(resendApiKey);
    const verifiedSender =
      process.env.VERIFIED_SENDER_EMAIL || "onboarding@resend.dev";
    const receiverEmail =
      process.env.EMAIL_RECEIVER || "bereket.kinfe23@gmail.com";

    const adminHtml = ContactFormAdminEmailTemplate({
      fullname: name,
      email,
      subject,
      message,
    });

    const visitorHtml = ContactEmailTemplate({
      fullname: name,
      email,
      subject,
    });

    const [adminResult, visitorResult] = await Promise.all([
      resend.emails.send({
        from: `Bereket Kinfe Contact Terminal <${verifiedSender}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `💼 Contact Inquiry: ${subject} [from ${name}]`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: `Bereket Kinfe <${verifiedSender}>`,
        to: email,
        subject: `Transmission Received: ${subject} — Bereket Kinfe`,
        html: visitorHtml,
      }),
    ]);

    if (adminResult.error) {
      console.error("[Resend Admin Email Error]:", adminResult.error);
    }

    if (visitorResult.error) {
      console.warn(
        `[Resend Visitor Auto-Reply Warning]: ${visitorResult.error.message}. ` +
          `(Note: 'onboarding@resend.dev' can only deliver to your own account email. Verify a custom domain at resend.com/domains to send auto-replies to all visitors.)`,
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
