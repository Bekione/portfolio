interface AdminEmailParams {
  fullname: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactFormAdminEmailTemplate({
  fullname,
  email,
  subject,
  message,
}: AdminEmailParams): string {
  const timestamp = new Date().toUTCString();
  const safeMessage = message.replace(/\n/g, "<br />");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Transmission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #121211; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ECE8E0;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #121211; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #181816; border: 1px solid #292825; border-radius: 4px; overflow: hidden;">
          
          <!-- Header Bar -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #292825; background-color: #141412;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #C94B32; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                    <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; letter-spacing: 0.1em; color: #C94B32; font-weight: 600; text-transform: uppercase;">TRANSMISSION RECEIVED</span>
                  </td>
                  <td align="right">
                    <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 10px; color: #6E6B63;">PORTFOLIO DISPATCH</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #ECE8E0; letter-spacing: -0.02em;">
                ${subject}
              </h1>
              <p style="margin: 0 0 24px 0; font-size: 13px; color: #A6A299;">
                A new inquiry was submitted through the portfolio contact terminal.
              </p>

              <!-- Meta Table -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #121211; border: 1px solid #292825; border-radius: 4px;">
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #22211F; width: 120px;">
                    <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; color: #6E6B63; text-transform: uppercase;">From</span>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #22211F;">
                    <strong style="font-size: 13px; color: #ECE8E0;">${fullname}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #22211F;">
                    <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; color: #6E6B63; text-transform: uppercase;">Reply Email</span>
                  </td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #22211F;">
                    <a href="mailto:${email}" style="color: #C94B32; text-decoration: none; font-size: 13px; font-family: 'JetBrains Mono', monospace, ui-monospace;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px;">
                    <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; color: #6E6B63; text-transform: uppercase;">Timestamp</span>
                  </td>
                  <td style="padding: 12px 16px;">
                    <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; color: #A6A299;">${timestamp}</span>
                  </td>
                </tr>
              </table>

              <!-- Message Body -->
              <div style="margin-bottom: 28px;">
                <span style="display: block; font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; color: #6E6B63; text-transform: uppercase; margin-bottom: 8px;">Message Payload</span>
                <div style="background-color: #141412; border: 1px solid #292825; border-left: 3px solid #C94B32; padding: 18px 20px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #ECE8E0;">
                  ${safeMessage}
                </div>
              </div>

              <!-- Action Button -->
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="background-color: #C94B32; border-radius: 2px;">
                    <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; padding: 12px 24px; font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 12px; font-weight: 600; color: #FFFFFF; text-decoration: none; text-transform: uppercase; letter-spacing: 0.05em;">
                      Reply Directly to ${fullname} &rarr;
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; border-top: 1px solid #292825; background-color: #141412;">
              <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 10px; color: #6E6B63; display: block;">
                Automated notification from Bereket Kinfe Portfolio // System Engine
              </span>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
