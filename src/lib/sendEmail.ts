import { Resend } from 'resend';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const { RESEND_API_KEY, FROM_EMAIL } = process.env;

  if (!FROM_EMAIL) {
    throw new Error('FROM_EMAIL is not configured');
  }

  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  // Use Resend API directly
  const resend = new Resend(RESEND_API_KEY);

  await resend.emails.send({
    from: options.from || FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text || options.html.replace(/<[^>]*>/g, ''),
  });
}

