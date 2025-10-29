import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import siteConfig from '../config/site.config';

export const GET: APIRoute = async ({ url }) => {
  const baseUrl = url.origin;
  const now = new Date().toISOString();

  // Get all blog posts
  const blogPosts = await getCollection('blog');
  const sortedPosts = blogPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  // Get all services
  const services = await getCollection('services');

  // Build sitemap URLs
  const urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }> = [
    {
      loc: `${baseUrl}/`,
      lastmod: now,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.8',
    },
  ];

  // Add blog index if blog is enabled
  if (siteConfig.showBlog) {
    urls.push({
      loc: `${baseUrl}/blog`,
      lastmod: sortedPosts.length > 0 ? sortedPosts[0].data.date.toISOString() : now,
      changefreq: 'weekly',
      priority: '0.9',
    });

    // Add individual blog posts
    sortedPosts.forEach((post) => {
      urls.push({
        loc: `${baseUrl}/blog/${post.slug}`,
        lastmod: post.data.date.toISOString(),
        changefreq: 'monthly',
        priority: '0.7',
      });
    });
  }

  // Add services if they exist
  if (services.length > 0) {
    services.forEach((service) => {
      urls.push({
        loc: `${baseUrl}/services/${service.slug}`,
        lastmod: now,
        changefreq: 'monthly',
        priority: '0.6',
      });
    });
  }

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};

