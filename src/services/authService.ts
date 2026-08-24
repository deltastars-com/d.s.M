/**
 * Delta Stars — Authentication Service
 * Supabase-based auth with session persistence, input validation, rate limiting
 */

import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'customer' | 'admin' | 'driver' | 'vip' | 'developer';
  isVerified: boolean;
}

// Session management
const SESSION_KEY = 'ds_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function saveSession(user: AuthUser): void {
  const session = { user, expiresAt: Date.now() + SESSION_DURATION };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session.user;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Input validation
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 10) return { valid: false, error: 'رقم الجوال قصير جداً' };
  if (!cleaned.startsWith('05')) return { valid: false, error: 'رقم الجوال يجب أن يبدأ بـ 05' };
  return { valid: true };
}

export function validateEmail(email: string): { valid: boolean; error?: string } {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return { valid: false, error: 'البريد الإلكتروني غير صحيح' };
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string; strength: 'weak' | 'medium' | 'strong' } {
  if (password.length < 8) return { valid: false, error: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل', strength: 'weak' };
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const strength = score >= 3 ? 'strong' : score >= 2 ? 'medium' : 'weak';
  return { valid: true, strength };
}

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(action: string, maxAttempts = 5, windowMs = 60000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(action);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(action, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (record.count >= maxAttempts) return { allowed: false, remaining: 0 };
  record.count++;
  return { allowed: true, remaining: maxAttempts - record.count };
}

// OTP generation
export function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Password hashing (client-side for demo, use server-side in production)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'deltastars_salt_v2');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
