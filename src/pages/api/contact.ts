import type { APIRoute } from 'astro';
import { sendEmail } from '../../lib/sendEmail';
import dotenv from 'dotenv';

// Load .env file
dotenv.config();

export const prerender = false; // Enable SSR for this route

// Validate environment variables at module load time
const validateEnv = () => {
  const { TO_EMAIL, FROM_EMAIL, RESEND_API_KEY } = process.env;
  
  if (!TO_EMAIL || !FROM_EMAIL || !RESEND_API_KEY) {
    console.error('Missing required environment variables:');
    if (!TO_EMAIL) console.error('  - TO_EMAIL');
    if (!FROM_EMAIL) console.error('  - FROM_EMAIL');
    if (!RESEND_API_KEY) console.error('  - RESEND_API_KEY');
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    return false;
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(TO_EMAIL) || !emailRegex.test(FROM_EMAIL)) {
    console.error('Invalid email format in environment variables');
    return false;
  }
  
  return true;
};

// Validate on module load
const envValid = validateEnv();
if (!envValid) {
  console.error('Contact form will not work until environment variables are properly configured.');
}

export const POST: APIRoute = async ({ request }) => {
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

    // Check environment configuration
    if (!envValid) {
      return new Response(JSON.stringify({ 
        error: 'Contact form is not configured. Please check server environment variables.' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { TO_EMAIL, FROM_EMAIL, RESEND_API_KEY } = process.env;

    if (!TO_EMAIL || !FROM_EMAIL || !RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email
    await sendEmail({
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

