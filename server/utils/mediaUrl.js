/**
 * VELORA Media URL Transformer
 * Rewrites all image paths to originate from the backend server (http://localhost:5000)
 */

export function toBackendImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  // If already pointing to backend, return
  if (url.startsWith('http://localhost:5000')) return url;
  
  // Local paths like /images/bridal/...
  if (url.startsWith('/images/')) {
    return `http://localhost:5000${url}`;
  }

  // Remote CDN image URLs
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return `http://localhost:5000/api/media?url=${encodeURIComponent(url)}`;
  }

  return url;
}

/**
 * Deep object traversal to transform any image strings into backend URLs
 */
export function transformDataImageUrls(data) {
  if (!data) return data;
  if (typeof data === 'string') {
    // If it looks like an image URL
    if (
      (data.startsWith('/images/') || data.startsWith('http://') || data.startsWith('https://')) &&
      (data.match(/\.(jpg|jpeg|png|webp|svg|gif|avif)(\?.*)?$/i) || data.includes('/cdn/') || data.includes('/files/') || data.includes('/uploads/'))
    ) {
      return toBackendImageUrl(data);
    }
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => transformDataImageUrls(item));
  }

  if (typeof data === 'object') {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      if (['image', 'images', 'hoverImage', 'bannerImage', 'fallbackImage', 'avatar', 'coverImage', 'thumbnail'].includes(key)) {
        if (typeof value === 'string') {
          result[key] = toBackendImageUrl(value);
        } else if (Array.isArray(value)) {
          result[key] = value.map(v => typeof v === 'string' ? toBackendImageUrl(v) : transformDataImageUrls(v));
        } else {
          result[key] = transformDataImageUrls(value);
        }
      } else {
        result[key] = transformDataImageUrls(value);
      }
    }
    return result;
  }

  return data;
}
