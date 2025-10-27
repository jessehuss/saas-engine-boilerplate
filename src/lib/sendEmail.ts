import nodemailer from 'nodemailer';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const { RESEND_API_KEY, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL } = process.env;

  if (!FROM_EMAIL) {
    throw new Error('FROM_EMAIL is not configured');
  }

  // Use Resend with API key or SMTP configuration
  const transporter = nodemailer.createTransport(
    RESEND_API_KEY
      ? {
          host: 'smtp.resend.com',
          port: 465,
          secure: true,
          auth: {
            user: 'resend',
            pass: RESEND_API_KEY,
          },
        }
      : SMTP_HOST
      ? {
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || '587'),
          secure: parseInt(SMTP_PORT || '587') === 465,
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        }
      : {
          host: 'localhost',
          port: 1025,
        }
  );

  await transporter.sendMail({
    from: options.from || FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text || options.html.replace(/<[^>]*>/g, ''),
  });
}

