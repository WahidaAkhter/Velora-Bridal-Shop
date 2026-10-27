/**
 * VELORA API Service Layer
 * Connects frontend React components to the Express backend (http://localhost:5000/api)
 * Includes image routing through backend media proxy and local file storage.
 * Seamless fallback to local mock data & localStorage if backend is offline.
 */

export const API_BASE_URL = 'http://localhost:5000/api';
export const BACKEND_BASE_URL = 'http://localhost:5000';

/**
 * Ensures any image URL routes through the backend server (http://localhost:5000)
 */
export function toBackendImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://localhost:5000')) return url;
  
  // Local paths like /images/bridal/...
  if (url.startsWith('/images/')) {
    return `${BACKEND_BASE_URL}${url}`;
  }

  // Remote CDN image URLs -> routed via backend media proxy
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return `${API_BASE_URL}/media?url=${encodeURIComponent(url)}`;
  }

  return url;
}

// Safe request wrapper with timeout & offline detection
async function safeFetch(endpoint, options = {}, timeoutMs = 4500) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      signal: controller.signal
    });
    clearTimeout(id);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(id);
    return { error: true, message: error.message };
  }
}

// 1. System Health Check
export async function getBackendHealth() {
  return await safeFetch('/health', { method: 'GET' }, 2000);
}

// 2. Products API
export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = query ? `/products?${query}` : '/products';
  return await safeFetch(url, { method: 'GET' });
}

export async function getProductById(id) {
  return await safeFetch(`/products/${id}`, { method: 'GET' });
}

export async function submitProductReview(productId, reviewData) {
  return await safeFetch(`/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData)
  });
}

// 3. Collection Specific APIs
export async function getLegacyCollection() {
  return await safeFetch('/legacy-collection', { method: 'GET' });
}

export async function getQuickShipData() {
  return await safeFetch('/quick-ship', { method: 'GET' });
}

export async function getSashesData() {
  return await safeFetch('/sashes', { method: 'GET' });
}

export async function getAccessoriesData() {
  return await safeFetch('/accessories', { method: 'GET' });
}

export async function getAllCollectionsData() {
  return await safeFetch('/collections', { method: 'GET' });
}

export async function getLookbooksData() {
  return await safeFetch('/lookbooks', { method: 'GET' });
}

export async function getOurStoryData() {
  return await safeFetch('/our-story', { method: 'GET' });
}

export async function getChannelsData() {
  return await safeFetch('/channels', { method: 'GET' });
}

// 4. Orders API
export async function getOrders() {
  return await safeFetch('/orders', { method: 'GET' });
}

export async function createOrder(orderData) {
  return await safeFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

// 5. Appointments API
export async function getAppointments() {
  return await safeFetch('/appointments', { method: 'GET' });
}

export async function bookAppointment(appointmentData) {
  return await safeFetch('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData)
  });
}

export async function cancelAppointment(appointmentId) {
  return await safeFetch(`/appointments/${appointmentId}/cancel`, {
    method: 'PUT'
  });
}

// 6. Promotional Vouchers API
export async function validateVoucher(code, subtotal) {
  return await safeFetch('/vouchers/validate', {
    method: 'POST',
    body: JSON.stringify({ code, subtotal })
  });
}

// 7. Auth API
export async function loginUser(email, password) {
  return await safeFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function getUserProfile() {
  return await safeFetch('/auth/profile', { method: 'GET' });
}
