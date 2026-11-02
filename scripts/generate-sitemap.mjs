import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllProducts, toProductSlug } from '../src/utils/productSlug.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = (process.env.SITE_URL || 'https://velora-bridal.vercel.app').replace(/\/+$/, '');
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/dresses', priority: '0.9', changefreq: 'daily' },
  { path: '/new-dresses', priority: '0.8', changefreq: 'weekly' },
  { path: '/signature-styles', priority: '0.8', changefreq: 'weekly' },
  { path: '/quick-ship', priority: '0.8', changefreq: 'weekly' },
  { path: '/lookbook', priority: '0.7', changefreq: 'weekly' },
  { path: '/collections', priority: '0.8', changefreq: 'weekly' },
  { path: '/accessories', priority: '0.8', changefreq: 'weekly' },
  { path: '/belts-and-sashes', priority: '0.7', changefreq: 'weekly' },
  { path: '/our-story', priority: '0.6', changefreq: 'monthly' },
  { path: '/compare', priority: '0.5', changefreq: 'monthly' }
];

const escapeXml = (unsafe) => {
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
};

const generateSitemap = () => {
  const products = getAllProducts();
  const seenPaths = new Set();
  const urls = [];

  // Add static routes
  for (const route of STATIC_ROUTES) {
    if (!seenPaths.has(route.path)) {
      seenPaths.add(route.path);
      urls.push({
        loc: `${BASE_URL}${route.path}`,
        lastmod: TODAY,
        changefreq: route.changefreq,
        priority: route.priority
      });
    }
  }

  // Add product routes
  for (const product of products) {
    const slug = toProductSlug(product);
    if (!slug) continue;
    const productPath = `/dresses/${slug}`;
    if (!seenPaths.has(productPath)) {
      seenPaths.add(productPath);
      urls.push({
        loc: `${BASE_URL}${productPath}`,
        lastmod: TODAY,
        changefreq: 'weekly',
        priority: '0.8'
      });
    }
  }

  const xmlEntries = urls.map(u => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${escapeXml(u.lastmod)}</lastmod>
    <changefreq>${escapeXml(u.changefreq)}</changefreq>
    <priority>${escapeXml(u.priority)}</priority>
  </url>`).join('\n');

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;

  const targetPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(targetPath, xmlContent, 'utf-8');

  console.log(`✅ Sitemap generated successfully with ${urls.length} URLs (${STATIC_ROUTES.length} static routes, ${products.length} products).`);
  console.log(`📍 Output written to: ${targetPath}`);
};

generateSitemap();
