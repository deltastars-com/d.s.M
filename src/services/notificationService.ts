/**
 * Delta Stars — Notification Service
 * Push notifications (Firebase/FCM), local alerts, in-app toasts
 */

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  url?: string;
  data?: Record<string, any>;
}

// Push notification registration
export async function registerPushNotifications(): Promise<string | null> {
  try {
    if (!('Notification' in window)) return null;
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY || '',
      });
      return JSON.stringify(subscription);
    }
    return null;
  } catch {
    return null;
  }
}

// Local notification (browser)
export function showLocalNotification(payload: NotificationPayload): void {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(payload.title, {
      body: payload.body,
      icon: payload.icon || '/icon-192.png',
      badge: '/icon-48.png',
      data: payload.data,
    });
  }
}

// Pre-built notification templates for Delta Stars
export const NOTIFICATION_TEMPLATES = {
  orderConfirmed: (orderId: string): NotificationPayload => ({
    title: '✅ تم تأكيد طلبك',
    body: `طلب رقم ${orderId} قيد التجهيز الآن`,
    data: { type: 'order', orderId },
  }),
  orderShipped: (orderId: string): NotificationPayload => ({
    title: '🚚 طلبك في الطريق',
    body: `طلب رقم ${orderId} مع المندوب şimdi في طريقه إليك`,
    data: { type: 'order', orderId },
  }),
  orderDelivered: (orderId: string): NotificationPayload => ({
    title: '📦 تم التوصيل',
    body: `طلبك ${orderId} تم توصيله بنجاح`,
    data: { type: 'order', orderId },
  }),
  promotion: (text: string): NotificationPayload => ({
    title: '🔥 عرض خاص',
    body: text,
    data: { type: 'promotion' },
  }),
  lowStock: (product: string, qty: number): NotificationPayload => ({
    title: '⚠️ تنبيه مخزون',
    body: `${product} — المخزون المتبقي: ${qty}`,
    data: { type: 'inventory', product },
  }),
};
