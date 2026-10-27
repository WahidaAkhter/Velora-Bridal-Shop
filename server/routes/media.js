import express from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache folder in server/cache/media
const CACHE_DIR = path.join(__dirname, '../cache/media');
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Public images folder in project public/images
const LOCAL_IMAGES_DIR = path.join(__dirname, '../../public/images');

// Luxury placeholder SVG if image cannot be loaded
const PLACEHOLDER_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" fill="none">
  <rect width="600" height="800" fill="#F8F6F2"/>
  <rect x="20" y="20" width="560" height="760" stroke="#E3DAC9" stroke-width="1.5" stroke-dasharray="4 4"/>
  <circle cx="300" cy="380" r="50" stroke="#B69D74" stroke-width="1.5" fill="#FFFFFF"/>
  <path d="M290 380h20M300 370v20" stroke="#B69D74" stroke-width="1.5" stroke-linecap="round"/>
  <text x="300" y="460" font-family="'Cinzel', serif" font-size="16" fill="#66594C" text-anchor="middle" letter-spacing="2">VELORA ATELIER</text>
  <text x="300" y="485" font-family="'Montserrat', sans-serif" font-size="11" fill="#9C8E84" text-anchor="middle" letter-spacing="1">CURATED BRIDAL COUTURE</text>
</svg>`;

// Helper to determine file extension
function getExtension(targetUrl, contentType) {
  if (contentType) {
    if (contentType.includes('png')) return '.png';
    if (contentType.includes('webp')) return '.webp';
    if (contentType.includes('svg')) return '.svg';
    if (contentType.includes('gif')) return '.gif';
    if (contentType.includes('avif')) return '.avif';
    if (contentType.includes('jpeg') || contentType.includes('jpg')) return '.jpg';
  }
  try {
    const pathname = new URL(targetUrl).pathname;
    const ext = path.extname(pathname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.avif'].includes(ext)) {
      return ext;
    }
  } catch {
    // ignore
  }
  return '.jpg';
}

// GET /api/media?url=...
router.get('/', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing "url" query parameter');
  }

  // Handle local /images/ paths
  if (targetUrl.startsWith('/images/')) {
    const localRelPath = targetUrl.replace(/^\/images\//, '');
    const localFullPath = path.join(LOCAL_IMAGES_DIR, localRelPath);
    if (fs.existsSync(localFullPath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return res.sendFile(localFullPath);
    }
  }

  // For external remote images
  try {
    const parsed = new URL(targetUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return res.status(400).send('Invalid URL protocol');
    }

    // Cache file based on URL hash
    const hash = crypto.createHash('sha256').update(targetUrl).digest('hex');
    
    // Look for existing cached file with any image extension
    const existingFiles = fs.readdirSync(CACHE_DIR).filter(f => f.startsWith(hash));
    if (existingFiles.length > 0) {
      const cachedFilePath = path.join(CACHE_DIR, existingFiles[0]);
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      res.setHeader('X-Cache', 'HIT');
      return res.sendFile(cachedFilePath);
    }

    // Fetch from remote
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    const remoteRes = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Referer': parsed.origin
      }
    });
    clearTimeout(timeout);

    if (!remoteRes.ok) {
      console.warn(`[Media Proxy] Remote image 404/error (${remoteRes.status}) for ${targetUrl}`);
      res.setHeader('Content-Type', 'image/svg+xml');
      res.setHeader('Cache-Control', 'public, max-age=3600');
      return res.send(PLACEHOLDER_SVG);
    }

    const contentType = remoteRes.headers.get('content-type') || 'image/jpeg';
    const ext = getExtension(targetUrl, contentType);
    const cachedFilePath = path.join(CACHE_DIR, `${hash}${ext}`);

    const buffer = Buffer.from(await remoteRes.arrayBuffer());
    fs.writeFileSync(cachedFilePath, buffer);

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Cache', 'MISS');
    return res.send(buffer);
  } catch (error) {
    console.warn(`[Media Proxy] Error fetching ${targetUrl}:`, error.message);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(PLACEHOLDER_SVG);
  }
});

export default router;
