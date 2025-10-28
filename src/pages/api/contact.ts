import type { APIRoute } from 'astro';
import { sendEmail } from '../../lib/sendEmail';

export const prerender = false; // Enable SSR for this route

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    // Validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get environment variables from Cloudflare runtime or fallback to env
    const runtimeEnv = (locals as any).runtime?.env;
    const TO_EMAIL = runtimeEnv?.TO_EMAIL || import.meta.env.TO_EMAIL;
    const FROM_EMAIL = runtimeEnv?.FROM_EMAIL || import.meta.env.FROM_EMAIL;
    const RESEND_API_KEY = runtimeEnv?.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

    // Check environment configuration
    if (!TO_EMAIL || !FROM_EMAIL || !RESEND_API_KEY) {
      console.error('Missing environment variables:', { TO_EMAIL: !!TO_EMAIL, FROM_EMAIL: !!FROM_EMAIL, RESEND_API_KEY: !!RESEND_API_KEY });
      return new Response(JSON.stringify({ 
        error: 'Contact form is not configured. Please check server environment variables.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email
    await sendEmail({
      apiKey: RESEND_API_KEY,
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: subject || `Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `
        New Contact Form Submission
        Name: ${name}
        Email: ${email}
        ${subject ? `Subject: ${subject}` : ''}
        Message: ${message}
      `,
    });

    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({ error: 'Failed to send message. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
