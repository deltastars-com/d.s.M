/**
 * Delta Stars — Payment Service (Moyasar Integration)
 * Supports: Credit Card, Apple Pay, mada, STC Pay, Bank Transfer, COD
 */

const MOYASAR_PUBLISHABLE_KEY = import.meta.env.VITE_MOYASAR_PUBLISHABLE_KEY || '';
const MOYASAR_API_URL = 'https://api.moyasar.com/v1';

export interface PaymentConfig {
  amount: number;
  currency: 'SAR';
  description: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  status?: string;
  amount?: number;
  error?: string;
  paymentUrl?: string;
}

export async function loadMoyasarSDK(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Moyasar) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.moyasar.com/mpf/1.x/moyasar.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export async function initMoyasarPayment(
  config: PaymentConfig,
  onSuccess?: (payment: any) => void,
  onError?: (error: any) => void
): Promise<boolean> {
  const loaded = await loadMoyasarSDK();
  if (!loaded || !MOYASAR_PUBLISHABLE_KEY) return false;

  try {
    (window as any).Moyasar.init({
      element: '.mysr-form',
      amount: Math.round(config.amount * 100),
      currency: config.currency || 'SAR',
      description: config.description,
      publishable_api_key: MOYASAR_PUBLISHABLE_KEY,
      callback_url: `${window.location.origin}/api/payment/verify`,
      metadata: {
        order_id: config.orderId,
        customer_name: config.customerName,
        customer_phone: config.customerPhone,
        source: 'deltastars_web',
      },
      methods: ['creditcard', 'applepay', 'stcpay'],
      on_completed: (payment: any) => onSuccess?.(payment),
      on_error: (error: any) => onError?.(error),
    });
    return true;
  } catch {
    return false;
  }
}

export function calculateOrderSummary(subtotal: number) {
  const VAT_RATE = 0.15;
  const FREE_DELIVERY_THRESHOLD = 200;
  const DELIVERY_FEE = 15;
  const EXPRESS_DELIVERY_FEE = 35;

  const vat = subtotal * VAT_RATE;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + vat + deliveryFee;

  return { subtotal, vat, deliveryFee, total, vatRate: VAT_RATE, freeThreshold: FREE_DELIVERY_THRESHOLD };
}

export function applyCoupon(subtotal: number, code: string): { discount: number; valid: boolean; message: string } {
  const coupons: Record<string, { type: 'fixed' | 'percent'; value: number; minOrder: number }> = {
    'WELCOME20': { type: 'fixed', value: 20, minOrder: 50 },
    'DELTA15': { type: 'percent', value: 15, minOrder: 100 },
    'HOTEL10': { type: 'percent', value: 10, minOrder: 200 },
    'BULK50': { type: 'fixed', value: 50, minOrder: 500 },
  };

  const coupon = coupons[code.toUpperCase()];
  if (!coupon) return { discount: 0, valid: false, message: 'كود غير صحيح' };
  if (subtotal < coupon.minOrder) return { discount: 0, valid: false, message: `الحد الأدنى ${coupon.minOrder} ر.س` };

  const discount = coupon.type === 'fixed' ? coupon.value : Math.min(subtotal * coupon.value / 100, 100);
  return { discount, valid: true, message: `تم تطبيق الخصم: -${discount.toFixed(2)} ر.س` };
}
