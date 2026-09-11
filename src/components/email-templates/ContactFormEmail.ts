interface ContactEmailParams {
  fullname: string;
  email: string;
  subject: string;
}

export function ContactEmailTemplate({
  fullname,
  subject,
}: ContactEmailParams): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Inquiry Received — Bereket Kinfe</title>
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
                    <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; letter-spacing: 0.1em; color: #C94B32; font-weight: 600; text-transform: uppercase;">BEREKET KINFE // ACKNOWLEDGMENT</span>
                  </td>
                  <td align="right">
                    <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 10px; color: #6E6B63;">UTC+3</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 700; color: #ECE8E0; letter-spacing: -0.02em;">
                Thank you for reaching out, ${fullname}.
              </h1>
              
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #A6A299;">
                I have received your transmission regarding <strong style="color: #ECE8E0;">"${subject}"</strong> and have queued it for review.
              </p>

              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #A6A299;">
                I typically review technical inquiries, contract proposals, and architecture consultations within 24 hours during standard working hours in Addis Ababa (EAT // UTC+3).
              </p>

              <!-- Highlight Box -->
              <div style="margin-bottom: 28px; background-color: #121211; border: 1px solid #292825; border-left: 3px solid #C94B32; padding: 16px 20px; border-radius: 4px;">
                <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #ECE8E0;">
                  If your inquiry requires urgent alignment or real-time communication, feel free to connect directly via LinkedIn or email.
                </p>
              </div>

              <!-- Channel Links -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <span style="display: block; font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 10px; color: #6E6B63; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.08em;">VERIFIED CHANNELS</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right: 12px;">
                          <a href="https://github.com/Bekione" style="display: inline-block; padding: 8px 14px; background-color: #141412; border: 1px solid #292825; font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; color: #ECE8E0; text-decoration: none; border-radius: 2px;">
                            GitHub &rarr;
                          </a>
                        </td>
                        <td style="padding-right: 12px;">
                          <a href="https://linkedin.com/in/bereket-k" style="display: inline-block; padding: 8px 14px; background-color: #141412; border: 1px solid #292825; font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 11px; color: #ECE8E0; text-decoration: none; border-radius: 2px;">
                            LinkedIn &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Signoff -->
              <div style="border-top: 1px solid #292825; padding-top: 20px; margin-top: 28px;">
                <strong style="display: block; font-size: 14px; color: #ECE8E0;">Bereket Kinfe</strong>
                <span style="display: block; font-size: 12px; color: #6E6B63; margin-top: 2px;">
                  Software Engineer &bull; Full-Stack &amp; AI Systems Architecture
                </span>
                <span style="display: block; font-size: 11px; color: #6E6B63; margin-top: 2px; font-family: 'JetBrains Mono', monospace, ui-monospace;">
                  Addis Ababa, Ethiopia (UTC+3)
                </span>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 16px 32px; border-top: 1px solid #292825; background-color: #141412;">
              <span style="font-family: 'JetBrains Mono', monospace, ui-monospace; font-size: 10px; color: #6E6B63; display: block;">
                This is an automated confirmation of your dispatch from bereketkinfe.com
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
