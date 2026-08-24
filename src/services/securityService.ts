/**
 * Delta Stars — Security Service
 * Advanced encryption, CSRF protection, XSS prevention, audit logging, session management
 */

// ========== Encryption ==========
export async function encryptData(data: string, key: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(key), 'AES-GCM', false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, keyMaterial, enc.encode(data));
  return btoa(String.fromCharCode(...iv, ...new Uint8Array(encrypted)));
}

export async function decryptData(encrypted: string, key: string): Promise<string> {
  const dec = new TextDecoder();
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(key), 'AES-GCM', false, ['decrypt']);
  const data = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
  const iv = data.slice(0, 12);
  const content = data.slice(12);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, keyMaterial, content);
  return dec.decode(decrypted);
}

// ========== Input Sanitization ==========
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export function validateInput(value: string, type: 'phone' | 'email' | 'name' | 'address' | 'price'): boolean {
  switch (type) {
    case 'phone': return /^05\d{8}$/.test(value.replace(/\D/g, ''));
    case 'email': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case 'name': return value.trim().length >= 2 && value.trim().length <= 100;
    case 'address': return value.trim().length >= 5 && value.trim().length <= 500;
    case 'price': return /^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) >= 0;
    default: return false;
  }
}

// ========== CSRF Protection ==========
let csrfToken: string | null = null;

export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  csrfToken = Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  sessionStorage.setItem('csrf_token', csrfToken);
  return csrfToken;
}

export function getCSRFToken(): string {
  if (csrfToken) return csrfToken;
  const stored = sessionStorage.getItem('csrf_token');
  if (stored) { csrfToken = stored; return stored; }
  return generateCSRFToken();
}

export function validateCSRFToken(token: string): boolean {
  const stored = sessionStorage.getItem('csrf_token');
  return stored === token;
}

// ========== Audit Logging ==========
export interface AuditEntry {
  timestamp: string;
  action: string;
  user?: string;
  details?: string;
  ip?: string;
}

const AUDIT_LOG_KEY = 'ds_audit_log';

export function logAudit(action: string, details?: string, user?: string): void {
  const entry: AuditEntry = {
    timestamp: new Date().toISOString(),
    action,
    user: user || localStorage.getItem('ds_user_id') || 'anonymous',
    details,
  };
  try {
    const logs = JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || '[]');
    logs.push(entry);
    if (logs.length > 500) logs.splice(0, logs.length - 500);
    localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(logs));
  } catch {}
}

export function getAuditLogs(limit = 50): AuditEntry[] {
  try {
    const logs = JSON.parse(localStorage.getItem(AUDIT_LOG_KEY) || '[]');
    return logs.slice(-limit).reverse();
  } catch { return []; }
}

// ========== Rate Limiting ==========
const requestCounts = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, maxPerMinute = 60): boolean {
  const now = Date.now();
  const record = requestCounts.get(key);
  if (!record || now > record.resetAt) {
    requestCounts.set(key, { count: 1, resetAt: now + 60000 });
    return true;
  }
  if (record.count >= maxPerMinute) return false;
  record.count++;
  return true;
}

// ========== Password Security ==========
export function generateSecurePassword(length = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, b => chars[b % chars.length]).join('');
}

// ========== XSS Prevention ==========
export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ========== Security Headers for API calls ==========
export function getSecureHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': getCSRFToken(),
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
  };
}
