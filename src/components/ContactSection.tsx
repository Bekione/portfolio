"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import {
  CheckCircle2,
  Clock,
  Copy,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Briefcase,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
import { PERSONAL_INFO } from "../data/portfolioData";
import { ContactFormData } from "../types";
import { useTheme } from "../hooks/useTheme";
import { Noise } from "./Noise";
import { contactSchema } from "@/lib/contactValidation";

type FormErrors = Partial<Record<keyof ContactFormData | "token", string>>;

const SUBJECT_PLACEHOLDERS = [
  "Full-Stack Contract // Architecture Consultation",
  "High-concurrency Next.js & TypeScript Project",
  "Real-Time Voice AI Pipeline Architecture",
  "Enterprise ERP / Dashboard Engineering",
  "Database Query & Performance Optimization",
  "Discussing a Remote Collaboration",
];

export function ContactSection() {
  const { theme } = useTheme();

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [localTime, setLocalTime] = useState<string>("");
  const [subjectPlaceholderIndex, setSubjectPlaceholderIndex] = useState(0);

  // Cycle through subject placeholder suggestions on a loop
  useEffect(() => {
    if (formData.subject) return;

    const timer = setInterval(() => {
      setSubjectPlaceholderIndex(
        (prev) => (prev + 1) % SUBJECT_PLACEHOLDERS.length,
      );
    }, 3200);

    return () => clearInterval(timer);
  }, [formData.subject]);

  // Live Addis Ababa (UTC+3) Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Addis_Ababa",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setLocalTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const parsed = contactSchema.safeParse({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      token: turnstileToken || undefined,
      honeypot,
    });

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ContactFormData;
        if (field && !newErrors[field]) {
          newErrors[field] = issue.message;
        }
      }
    }

    // Turnstile validation (if active site key is configured or default testing key)
    const turnstileSiteKey =
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";
    if (turnstileSiteKey && !turnstileToken) {
      newErrors.token = "Please complete the security verification above";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          token: turnstileToken || "",
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to transmit message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setHoneypot("");
      setTurnstileToken(null);
      setTurnstileKey((prev) => prev + 1);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Transmission failed. Please try again or reach out directly via email.",
      );
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const turnstileSiteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

  return (
    <section
      id="contact"
      className="py-24 border-b border-(--border-subtle) bg-(--bg-primary)"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-12 border-b border-(--border-subtle)">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-vermilion">
              06 //
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
              GET IN TOUCH
            </h2>
          </div>
          <span className="font-mono text-xs text-(--text-muted) tracking-wider">
            DIRECT COMMUNICATION & INQUIRIES
          </span>
        </div>

        <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Information & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-bold text-(--text-primary)">
                Let's build something deliberate.
              </h3>
              <p className="text-sm text-(--text-secondary) leading-relaxed font-sans">
                Whether you need a senior frontend engineer for a
                high-concurrency SaaS platform, an AI pipeline specialist, or an
                architect to fix latency in an enterprise system, I am open to
                discussing projects.
              </p>
            </div>

            {/* Direct Contact Channels */}
            <div className="space-y-3 font-mono text-xs">
              {/* Email Direct */}
              <div className="p-4 border border-(--border-subtle) bg-(--bg-surface) rounded-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-vermilion" />
                  <div>
                    <span className="text-[10px] text-(--text-muted) block">
                      DIRECT EMAIL
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-(--text-primary) hover:text-vermilion transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={copyEmailToClipboard}
                  className="p-1.5 hover:text-vermilion transition-colors text-(--text-muted) cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              {/* Verified Location & Live Time */}
              <div className="p-4 border border-(--border-subtle) bg-(--bg-surface) rounded-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-(--text-muted)">
                    <MapPin className="w-3.5 h-3.5 text-vermilion" />
                    <span>LOCATION</span>
                  </span>
                  <span className="text-(--text-primary) font-medium">
                    Addis Ababa, Ethiopia
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-(--border-subtle)/60 pt-2">
                  <span className="flex items-center gap-2 text-(--text-muted)">
                    <Clock className="w-3.5 h-3.5 text-vermilion" />
                    <span>LOCAL TIME (EAT // UTC+3)</span>
                  </span>
                  <span className="text-vermilion font-semibold">
                    {localTime || "10:35:51"}
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-2.5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs flex items-center justify-center gap-2 hover:border-vermilion text-(--text-primary) hover:text-vermilion transition-colors"
                >
                  <Noise />
                  <Github className="w-3.5 h-3.5 text-vermilion relative z-10" />
                  <span className="relative z-10">GITHUB</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative overflow-hidden p-2.5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs flex items-center justify-center gap-2 hover:border-vermilion text-(--text-primary) hover:text-vermilion transition-colors"
                >
                  <Noise />
                  <Linkedin className="w-3.5 h-3.5 text-vermilion relative z-10" />
                  <span className="relative z-10">LINKEDIN</span>
                </a>

                {PERSONAL_INFO.upwork && (
                  <a
                    href={PERSONAL_INFO.upwork}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden p-2.5 border border-(--border-subtle) bg-(--bg-surface) rounded-xs flex items-center justify-center gap-2 hover:border-[#14a800] text-(--text-primary) hover:text-[#14a800] transition-colors"
                  >
                    <Noise />
                    <Briefcase className="w-3.5 h-3.5 text-[#14a800] relative z-10" />
                    <span className="relative z-10">UPWORK</span>
                  </a>
                )}
              </div>
            </div>

            {copiedEmail && (
              <div className="p-3 bg-vermilion/10 border border-vermilion/30 text-vermilion text-xs font-mono rounded-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Email address copied to clipboard.</span>
              </div>
            )}
          </div>

          {/* Real Functional Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 border border-(--border-strong) bg-(--bg-surface) rounded-xs shadow-xs">
              <div className="flex items-center justify-between pb-6 border-b border-(--border-subtle) mb-6">
                <span className="font-mono text-xs font-semibold text-(--text-primary)">
                  DISPATCH INQUIRY
                </span>
                <span className="font-mono text-[10px] text-(--text-muted)">
                  RESEND &amp; CLOUDFLARE ACTIVE
                </span>
              </div>

              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-vermilion/10 text-vermilion">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-xl font-bold text-(--text-primary)">
                    Message Dispatched Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-(--text-secondary) max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your transmission has been queued and an acknowledgment was sent to your email. I typically respond within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage(null);
                    }}
                    className="mt-4 px-4 py-2 border border-(--border-strong) hover:border-vermilion text-xs font-mono text-(--text-primary) hover:text-vermilion rounded-xs transition-colors cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot Spam Trap & Hidden Bot Protection */}
                  <div
                    aria-hidden="true"
                    className="opacity-0 absolute -left-[9999px] top-0 pointer-events-none select-none -z-50 h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="company_url_check">
                      Leave this field empty to confirm you are human
                    </label>
                    <input
                      id="company_url_check"
                      type="text"
                      name="company_url_check"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="new-password"
                    />
                    {/* Hidden input to protect honeypot and verify form integrity */}
                    <input
                      type="hidden"
                      name="_hp_verification"
                      value="secure_anti_spam_guard"
                    />
                  </div>

                  {/* Server Error Alert */}
                  {status === "error" && errorMessage && (
                    <div className="p-3.5 bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono rounded-xs flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setErrorMessage(null)}
                        className="text-red-500 hover:text-red-600 font-bold cursor-pointer"
                        aria-label="Dismiss error"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-(--text-secondary)">
                        NAME <span className="text-vermilion">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name)
                            setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. David Miller"
                        className={`w-full px-3.5 py-2.5 text-xs font-mono bg-(--bg-primary) border rounded-xs text-(--text-primary) placeholder:text-(--text-muted) focus:outline-hidden focus:ring-1 focus:ring-vermilion transition-colors ${
                          errors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-(--border-subtle)"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[10px] font-mono text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-(--text-secondary)">
                        EMAIL <span className="text-vermilion">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email)
                            setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="name@company.com"
                        className={`w-full px-3.5 py-2.5 text-xs font-mono bg-(--bg-primary) border rounded-xs text-(--text-primary) placeholder:text-(--text-muted) focus:outline-hidden focus:ring-1 focus:ring-vermilion transition-colors ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-(--border-subtle)"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[10px] font-mono text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-(--text-secondary)">
                      SUBJECT <span className="text-vermilion">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          if (errors.subject)
                            setErrors({ ...errors, subject: undefined });
                        }}
                        className={`w-full px-3.5 py-2.5 text-xs font-mono bg-(--bg-primary) border rounded-xs text-(--text-primary) focus:outline-hidden focus:ring-1 focus:ring-vermilion transition-colors ${
                          errors.subject
                            ? "border-red-500 focus:ring-red-500"
                            : "border-(--border-subtle)"
                        }`}
                      />
                      {/* Animated placeholder overlay */}
                      {!formData.subject && (
                        <div className="absolute inset-0 flex items-center px-3.5 pointer-events-none overflow-hidden">
                          <span className="text-xs font-mono text-(--text-muted)">e.g.&nbsp;</span>
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={subjectPlaceholderIndex}
                              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
                              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="text-xs font-mono text-(--text-muted) whitespace-nowrap"
                            >
                              {SUBJECT_PLACEHOLDERS[subjectPlaceholderIndex]}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                    {errors.subject && (
                      <p className="text-[10px] font-mono text-red-500">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-mono text-(--text-secondary)">
                        MESSAGE <span className="text-vermilion">*</span>
                      </label>
                      <span className="text-[10px] font-mono text-(--text-muted)">
                        {formData.message.length} / 3000
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message)
                          setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Describe the system, timeline, specifications, or engineering challenge..."
                      className={`w-full min-h-[120px] max-h-[260px] px-3.5 py-2.5 text-xs font-mono bg-(--bg-primary) border rounded-xs text-(--text-primary) placeholder:text-(--text-muted) focus:outline-hidden focus:ring-1 focus:ring-vermilion resize-y transition-colors ${
                        errors.message
                          ? "border-red-500 focus:ring-red-500"
                          : "border-(--border-subtle)"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[10px] font-mono text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Cloudflare Turnstile Security Verification */}
                  <div className="pt-1">
                    <div className="p-3 border border-(--border-subtle) bg-(--bg-primary) rounded-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-(--text-muted) uppercase tracking-wider">
                          SECURITY VERIFICATION
                        </span>
                        {turnstileToken && (
                          <span className="font-mono text-[10px] text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> VERIFIED
                          </span>
                        )}
                      </div>

                      <Turnstile
                        key={turnstileKey}
                        siteKey={turnstileSiteKey}
                        onSuccess={(token) => {
                          setTurnstileToken(token);
                          if (errors.token) {
                            setErrors((prev) => ({ ...prev, token: undefined }));
                          }
                        }}
                        onError={() => setTurnstileToken(null)}
                        onExpire={() => setTurnstileToken(null)}
                        options={{
                          theme: theme === "dark" ? "dark" : "light",
                          size: "flexible",
                        }}
                      />
                    </div>
                    {errors.token && (
                      <p className="text-[10px] font-mono text-red-500 pt-1.5">
                        {errors.token}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-(--border-subtle)">
                    <span className="text-[10px] font-mono text-(--text-muted)">
                      AES / TLS ENCRYPTED DISPATCH
                    </span>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#151515b9] dark:bg-[#ece8e0b9] text-[#F3F0E8] dark:text-[#121211] hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white font-mono text-xs font-medium tracking-wider transition-colors rounded-xs disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Noise />
                      {status === "submitting" ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin relative z-10" />
                          <span className="relative z-10">TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">SEND INQUIRY</span>
                          <Send className="w-3.5 h-3.5 relative z-10" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
