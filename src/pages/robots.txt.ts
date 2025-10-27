import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ url }) => {
  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL('sitemap.xml', url.origin).href}
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

