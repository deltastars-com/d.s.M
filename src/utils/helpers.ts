/**
 * Delta Stars — Utility Helpers
 * Formatting, calculations, date utilities, common operations
 */

// ========== Currency Formatting ==========
export function formatCurrency(amount: number, lang: 'ar' | 'en' = 'ar'): string {
  const formatted = amount.toFixed(2);
  return lang === 'ar' ? `${formatted} ر.س` : `${formatted} SAR`;
}

// ========== Date Formatting ==========
export function formatDate(dateStr: string, lang: 'ar' | 'en' = 'ar'): string {
  const date = new Date(dateStr);
  if (lang === 'ar') {
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatDateTime(dateStr: string, lang: 'ar' | 'en' = 'ar'): string {
  const date = new Date(dateStr);
  if (lang === 'ar') {
    return date.toLocaleString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function timeAgo(dateStr: string, lang: 'ar' | 'en' = 'ar'): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return lang === 'ar' ? 'الآن' : 'Just now';
  if (seconds < 3600) return lang === 'ar' ? `منذ ${Math.floor(seconds / 60)} دقيقة` : `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return lang === 'ar' ? `منذ ${Math.floor(seconds / 3600)} ساعة` : `${Math.floor(seconds / 3600)}h ago`;
  return lang === 'ar' ? `منذ ${Math.floor(seconds / 86400)} يوم` : `${Math.floor(seconds / 86400)}d ago`;
}

// ========== Order ID Generation ==========
export function generateOrderId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  return `DS-${y}${m}${d}-${seq}`;
}

export function generateInvoiceId(): string {
  return `INV-${Date.now().toString(36).toUpperCase()}`;
}

// ========== Phone Formatting ==========
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('966')) return `+${cleaned}`;
  if (cleaned.startsWith('05')) return `+966${cleaned.slice(1)}`;
  return `+966${cleaned}`;
}

export function maskPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 10) {
    return cleaned.slice(0, 3) + '***' + cleaned.slice(-4);
  }
  return phone;
}

// ========== Number Formatting ==========
export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// ========== Debounce ==========
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

// ========== Deep Clone ==========
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// ========== WhatsApp Link ==========
export function getWhatsAppLink(phone: string, message: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const num = cleaned.startsWith('966') ? cleaned : `966${cleaned.startsWith('0') ? cleaned.slice(1) : cleaned}`;
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

// ========== Status Colors ==========
export function getStatusColor(status: string): { bg: string; text: string; border: string } {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
    preparing: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    ready: { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
    shipped: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
    delivered: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
    paid: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    refunded: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  };
  return colors[status] || colors.pending;
}
