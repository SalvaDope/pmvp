import type { APIRoute } from 'astro';
import { SITE_CONFIG } from '../config/site';

export const GET: APIRoute = async () => {
  const baseUrl = SITE_CONFIG.contact.siteUrl.replace(/\/$/, '');
  const staticRoutes = [
    '',
    '/raio-x',
    '/estudo-de-viabilidade',
    '/servicos',
    '/para-quem/comprar',
    '/para-quem/heranca',
    '/para-quem/vender',
    '/parceiros',
    '/como-funciona',
    '/sobre',
    '/recursos',
    '/submeter-terreno',
    '/privacidade',
    '/cookies',
    '/termos',
  ];

  const articleRoutes = SITE_CONFIG.articles.map((a) => `/recursos/${a.slug}`);
  const allRoutes = [...staticRoutes, ...articleRoutes];
  const lastmod = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route === '' || route === '/submeter-terreno' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '' ? '1.0' : route === '/raio-x' || route === '/submeter-terreno' ? '0.9' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
