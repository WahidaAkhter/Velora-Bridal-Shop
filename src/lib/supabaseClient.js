/**
 * VELORA Luxury Bridal Boutique
 * Supabase Client Initialization (Client-Side)
 * 
 * Uses client-safe environment variables:
 * - VITE_SUPABASE_URL
 * - VITE_SUPABASE_PUBLISHABLE_KEY (sb_publishable_...)
 * 
 * If environment variables are missing or undefined, exports null without throwing.
 * Never use the service role / secret key in client code.
 */

import { createClient } from '@supabase/supabase-js';

const rawUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : undefined;
const rawKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY : undefined;

// Normalize URL: strip trailing /rest/v1 and slashes
const supabaseUrl = rawUrl ? rawUrl.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '') : null;
const supabaseKey = rawKey ? rawKey.trim() : null;

export const supabase = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

export default supabase;

