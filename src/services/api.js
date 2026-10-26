/**
 * VELORA API Service Layer
 * Connects frontend React components to the Express backend (http://localhost:5000/api)
 * Includes seamless fallback to local mock data & localStorage if backend is offline.
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Safe request wrapper with timeout & offline detection
async function safeFetch(endpoint, options = {}, timeoutMs = 3500) {
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

// 3. Orders API
export async function getOrders() {
  return await safeFetch('/orders', { method: 'GET' });
}

export async function createOrder(orderData) {
  return await safeFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

// 4. Appointments API
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

// 5. Promotional Vouchers API
export async function validateVoucher(code, subtotal) {
  return await safeFetch('/vouchers/validate', {
    method: 'POST',
    body: JSON.stringify({ code, subtotal })
  });
}

// 6. Auth API
export async function loginUser(email, password) {
  return await safeFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function getUserProfile() {
  return await safeFetch('/auth/profile', { method: 'GET' });
}
