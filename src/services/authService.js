/**
 * VELORA Luxury Bridal Boutique
 * Supabase Authentication Service
 * 
 * Manages user lifecycle through Supabase Auth and public.profiles.
 * Strictly adheres to client-side privilege rules:
 * - Signup sends ONLY full_name and phone in options.data.
 * - Never transmits 'role' or privilege fields from the client.
 * - Formats all auth errors into polite, user-friendly atelier messages.
 */

import { supabase } from '../lib/supabaseClient.js';

export const isAuthAvailable = Boolean(supabase);

/**
 * Maps Supabase / PostgREST errors into elegant, customer-friendly messages.
 * Never exposes raw error objects, network traces, or database internals.
 */
export function formatAuthError(error) {
  if (!error) return 'An unexpected issue occurred. Please try again.';

  const message = typeof error === 'string' ? error : (error.message || '');
  const lower = message.toLowerCase();

  if (lower.includes('invalid login credentials') || lower.includes('invalid email or password')) {
    return 'Invalid email address or password. Please verify your details.';
  }
  if (lower.includes('user already registered') || lower.includes('email address already registered')) {
    return 'An account with this email address already exists. Please sign in instead.';
  }
  if (lower.includes('password should be at least') || lower.includes('weak password')) {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (lower.includes('rate limit') || lower.includes('too many requests')) {
    return 'Too many login attempts. Please wait a few moments before trying again.';
  }
  if (lower.includes('fetch') || lower.includes('network') || lower.includes('failed to fetch')) {
    return 'Unable to reach the boutique authentication service. Please check your internet connection.';
  }
  if (lower.includes('expired') || lower.includes('token has expired')) {
    return 'Your recovery link has expired or has already been used. Please request a new password reset.';
  }

  // Graceful fallback: clean up any technical jargon
  return message.replace(/^AuthApiError:\s*/i, '').replace(/^[A-Z_]+:\s*/, '') || 'Unable to complete request. Please try again.';
}

/**
 * Sign up a new customer.
 * Sends ONLY full_name and phone in options.data.
 */
export async function signUpUser({ email, password, fullName, phone }) {
  if (!supabase) {
    return { success: false, message: 'Authentication service is currently unavailable.' };
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = (fullName || '').trim();
    const cleanPhone = (phone || '').trim();

    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanName || 'VIP Bride',
          phone: cleanPhone || null
        }
      }
    });

    if (error) {
      return { success: false, message: formatAuthError(error) };
    }

    return {
      success: true,
      user: data.user,
      session: data.session
    };
  } catch (err) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Sign in existing customer with email & password.
 */
export async function signInUser({ email, password }) {
  if (!supabase) {
    return { success: false, message: 'Authentication service is currently unavailable.' };
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password
    });

    if (error) {
      return { success: false, message: formatAuthError(error) };
    }

    return {
      success: true,
      user: data.user,
      session: data.session
    };
  } catch (err) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Starts the Google OAuth flow.
 * The browser navigates away; the session arrives through onAuthStateChange.
 */
export async function signInWithGoogle(redirectTo) {
  if (!supabase) {
    return { success: false, message: 'Authentication service is currently unavailable.' };
  }

  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectTo || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'),
        queryParams: { prompt: 'select_account' }
      }
    });

    if (error) {
      return { success: false, message: formatAuthError(error) };
    }

    return { success: true };
  } catch (err) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Sign out current user.
 */
export async function signOutUser() {
  if (!supabase) return { success: true };

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, message: formatAuthError(error) };
    }
    return { success: true };
  } catch (err) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Sends a password reset email through Supabase.
 */
export async function requestPasswordReset(email) {
  if (!supabase) {
    return { success: false, message: 'Authentication service is currently unavailable.' };
  }

  try {
    const cleanEmail = email.trim().toLowerCase();
    const redirectUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/reset-password`
      : 'http://localhost:5173/reset-password';

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: redirectUrl
    });

    if (error) {
      return { success: false, message: formatAuthError(error) };
    }

    return { success: true };
  } catch (err) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Updates user password from recovery flow.
 */
export async function updatePassword(newPassword) {
  if (!supabase) {
    return { success: false, message: 'Authentication service is currently unavailable.' };
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return { success: false, message: formatAuthError(error) };
    }

    return { success: true, user: data.user };
  } catch (err) {
    return { success: false, message: formatAuthError(err) };
  }
}

/**
 * Fetches the user's profile row from public.profiles.
 */
export async function fetchUserProfile(userId) {
  if (!supabase || !userId) return null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, phone, role, created_at')
      .eq('id', userId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

/**
 * Merges localStorage wishlist into public.wishlists table upon login/signup.
 * - Reads user's local picks from 'velora_wishlist_picks'.
 * - Uploads only IDs that the user actually toggled (in picks) AND that currently exist in localWishlistIds.
 * - 'prod-1' and 'prod-2' are only uploaded if velora_wishlist_touched is 'true' AND they exist in picks.
 * - Clears 'velora_wishlist_picks' only after the upsert succeeds. If upsert fails, keeps picks for retry.
 * - Never deletes anything from the database in the merge.
 * - Queries and returns all database wishlist product IDs for the user (the single source of truth for the account).
 */
export async function mergeWishlistOnAuth(userId, localWishlistIds = []) {
  if (!supabase || !userId) return localWishlistIds;

  try {
    const isTouched = typeof window !== 'undefined'
      ? localStorage.getItem('velora_wishlist_touched') === 'true'
      : false;

    // Read toggled picks from localStorage
    let picks = [];
    if (typeof window !== 'undefined') {
      try {
        const rawPicks = localStorage.getItem('velora_wishlist_picks');
        if (rawPicks) {
          const parsed = JSON.parse(rawPicks);
          if (Array.isArray(parsed)) {
            picks = parsed;
          }
        }
      } catch {
        picks = [];
      }
    }

    // Only upload IDs that the user actually toggled (in picks) AND that exist in localWishlistIds
    let toUpload = [];
    if (isTouched && picks.length > 0) {
      const localSet = new Set(Array.isArray(localWishlistIds) ? localWishlistIds : []);
      toUpload = picks.filter(id => typeof id === 'string' && id.trim().length > 0 && localSet.has(id));
    }

    let upsertSucceeded = false;
    if (toUpload.length > 0) {
      const rows = toUpload.map((productId) => ({
        user_id: userId,
        product_id: productId
      }));

      // onConflict ignoreDuplicates prevents duplicate key errors
      const { error: upsertError } = await supabase
        .from('wishlists')
        .upsert(rows, { onConflict: 'user_id, product_id', ignoreDuplicates: true });

      if (!upsertError) {
        upsertSucceeded = true;
        // On successful merge, clear velora_wishlist_picks
        if (typeof window !== 'undefined') {
          try {
            localStorage.removeItem('velora_wishlist_picks');
          } catch {
            // ignore
          }
        }
      } else {
        console.warn('[VELORA Auth] Failed to upsert wishlist picks to Supabase:', upsertError.message);
        // If upsert fails, keep the picks so the next sign-in retries
      }
    } else {
      // If there were no picks to upload, ensure empty picks key is cleaned up
      if (typeof window !== 'undefined' && picks.length === 0) {
        try {
          localStorage.removeItem('velora_wishlist_picks');
        } catch {
          // ignore
        }
      }
    }

    // Query all wishlisted product_ids for this user from DB
    const { data, error } = await supabase
      .from('wishlists')
      .select('product_id')
      .eq('user_id', userId);

    if (!error && Array.isArray(data)) {
      const dbIds = data.map((r) => r.product_id).filter(Boolean);
      // If upsert failed, keep local picks in memory as well so user doesn't lose them temporarily
      if (!upsertSucceeded && toUpload.length > 0) {
        return Array.from(new Set([...toUpload, ...dbIds]));
      }
      return dbIds;
    }
  } catch (err) {
    console.warn('[VELORA Auth] Wishlist merge error:', err);
  }

  return isTouched && Array.isArray(localWishlistIds) ? localWishlistIds : [];
}

export default {
  isAuthAvailable,
  formatAuthError,
  signUpUser,
  signInUser,
  signOutUser,
  requestPasswordReset,
  updatePassword,
  fetchUserProfile,
  mergeWishlistOnAuth
};
