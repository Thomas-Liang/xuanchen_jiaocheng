import type { APIRoute } from 'astro';
import { getPublishedTutorials } from '../lib/tutorial';

export const prerender = false;

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = 'https://xuanchen.pro/xuanchen_content';
  const tutorials = getPublishedTutorials();
  const { getAllProducts } = await import('../lib/auth');
  const products = getAllProducts();

  const staticPages: { url: string; changefreq: string; priority: string; lastmod?: string }[] = [
    { url: '', changefreq: 'weekly', priority: '1.0' },
    { url: '/tutorials', changefreq: 'daily', priority: '0.9' },
    { url: '/projects', changefreq: 'weekly', priority: '0.8' },
    { url: '/workflows', changefreq: 'weekly', priority: '0.8' },
    { url: '/products', changefreq: 'weekly', priority: '0.8' },
    { url: '/login', changefreq: 'monthly', priority: '0.3' },
    { url: '/register', changefreq: 'monthly', priority: '0.3' },
  ];

  const tutorialPages = tutorials.map(tutorial => ({
    url: `/tutorials/${tutorial.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: tutorial.lastModified || tutorial.publishDate
  }));

  const productPages = products.map(product => ({
    url: `/products/${product.slug}`,
    changefreq: 'monthly',
    priority: '0.6'
  }));

  const allPages: { url: string; changefreq: string; priority: string; lastmod?: string }[] = [...staticPages, ...tutorialPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
