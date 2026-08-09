/**═══════════════════════════════════════════════════════════════════
 * DeltaStars | نجوم دلتا — محرّك الأتمتة الشاملة والتنبؤات الذكية
 * المالك: علي الدحان (Ali Aldahan)
 *
 * يغطي دورة الطلب كاملة آلياً:
 *  الطلب ← الدفع ← التجهيز ← توثيق الجودة ← الشحن ← التتبع ← التسليم
 *  ← الفاتورة ← الملاحظات/الشكاوى ← التقارير ← التنبؤات
 *══════════════════════════════════════════════════════════════════*/

import { supabase } from '../supabaseClient';
import { nearestBranch, distanceKm, type GeoPoint } from './gpsTrackingService';

/*═══════════════ أنواع النظام ═══════════════*/

export type OrderStage =
  | 'created'          // أنشئ الطلب
  | 'awaiting_payment' // بانتظار الدفع
  | 'paid'             // تم الدفع وإيداعه لدى anb
  | 'assigned_branch'  // أُسند لأقرب فرع
  | 'preparing'        // قيد التجهيز في المخزن
  | 'quality_checked'  // وُثّقت الجودة بالصور
  | 'ready_pickup'     // جاهز لاستلام السائق
  | 'picked_up'        // استلمه السائق
  | 'in_transit'       // في الطريق (تتبع حي)
  | 'delivered'        // سُلّم للعميل
  | 'feedback_open'    // فُتحت خانة الملاحظات
  | 'closed'           // مُغلق ومؤرشف
  | 'cancelled'
  | 'refunded';

export const STAGE_LABELS: Record<OrderStage, string> = {
  created: 'تم استلام الطلب',
  awaiting_payment: 'بانتظار إتمام الدفع',
  paid: 'تم الدفع بنجاح',
  assigned_branch: 'أُسند لأقرب فرع',
  preparing: 'جاري التجهيز في المخزن',
  quality_checked: 'تم فحص وتوثيق الجودة',
  ready_pickup: 'جاهز لاستلام السائق',
  picked_up: 'استلمه السائق',
  in_transit: 'في الطريق إليك',
  delivered: 'تم التسليم',
  feedback_open: 'بانتظار ملاحظاتك',
  closed: 'مكتمل ومؤرشف',
  cancelled: 'ملغي',
  refunded: 'مُسترجع'
};

export type NotifyChannel = 'push' | 'sms' | 'email' | 'inapp' | 'whatsapp';
export type NotifyAudience = 'customer' | 'admin' | 'driver' | 'agent' | 'warehouse' | 'finance' | 'vip';

export interface AutomationEvent {
  orderId: string;
  stage: OrderStage;
  at: string;
  actor?: string;
  meta?: Record<string, any>;
}

export interface NotifyPayload {
  audience: NotifyAudience;
  channels: NotifyChannel[];
  title: string;
  body: string;
  route?: string;
  important?: boolean;
  data?: Record<string, any>;
}

/*═══════════════ خريطة الأتمتة: ماذا يحدث في كل مرحلة ═══════════════*/

interface StageRule {
  next?: OrderStage;
  notify: NotifyPayload[];
  sideEffects?: string[];
  slaMinutes?: number;        // إن تجاوزها ⇒ تنبيه تصعيد للإدارة
}

export const AUTOMATION_MAP: Record<OrderStage, StageRule> = {
  created: {
    next: 'awaiting_payment',
    slaMinutes: 15,
    notify: [
      { audience: 'customer', channels: ['push', 'inapp', 'sms'],
        title: 'تم استلام طلبك', body: 'أكمل الدفع لبدء التجهيز فوراً.', route: '/?page=cart' },
      { audience: 'admin', channels: ['push', 'inapp'],
        title: 'طلب جديد', body: 'ورد طلب جديد بانتظار الدفع.', route: '/?page=admin_dashboard' }
    ],
    sideEffects: ['reserve_stock', 'create_draft_invoice']
  },

  awaiting_payment: {
    next: 'paid',
    slaMinutes: 30,
    notify: [
      { audience: 'customer', channels: ['sms', 'push'],
        title: 'بانتظار الدفع', body: 'طلبك محجوز لمدة 30 دقيقة — أكمل الدفع للحفاظ عليه.' }
    ],
    sideEffects: ['hold_stock_30min']
  },

  paid: {
    next: 'assigned_branch',
    slaMinutes: 5,
    notify: [
      { audience: 'customer', channels: ['push', 'sms', 'email', 'inapp'], important: true,
        title: 'تم الدفع بنجاح ✅', body: 'صدرت فاتورتك الإلكترونية وبدأ تجهيز طلبك.', route: '/?page=track' },
      { audience: 'finance', channels: ['push', 'inapp'], important: true,
        title: 'إيداع جديد — anb', body: 'وردت دفعة عبر ميسر إلى حساب البنك العربي الوطني.' },
      { audience: 'admin', channels: ['push', 'inapp'],
        title: 'طلب مدفوع', body: 'طلب مؤكد جاهز للإسناد.' }
    ],
    sideEffects: ['issue_zatca_invoice', 'archive_payment_receipt', 'commit_stock', 'record_ledger_entry']
  },

  assigned_branch: {
    next: 'preparing',
    slaMinutes: 10,
    notify: [
      { audience: 'warehouse', channels: ['push', 'inapp'], important: true,
        title: 'طلب جديد للتجهيز', body: 'أُسند طلب لفرعكم — ابدأ التجهيز.', route: '/?page=warehouse' },
      { audience: 'agent', channels: ['push'],
        title: 'مهمة تجهيز', body: 'لديك مهمة تجهيز جديدة في المخزن.' }
    ],
    sideEffects: ['auto_pick_nearest_branch', 'notify_branch_manager']
  },

  preparing: {
    next: 'quality_checked',
    slaMinutes: 45,
    notify: [
      { audience: 'customer', channels: ['push', 'inapp'],
        title: 'جاري تجهيز طلبك 📦', body: 'يتم انتقاء أطزج المنتجات لطلبك الآن.', route: '/?page=track' }
    ],
    sideEffects: ['start_prep_timer', 'assign_picker']
  },

  quality_checked: {
    next: 'ready_pickup',
    slaMinutes: 10,
    notify: [
      { audience: 'customer', channels: ['push', 'inapp'],
        title: 'تم فحص الجودة ✅', body: 'وُثّقت طزاجة منتجاتك بالصور قبل الشحن.', route: '/?page=track' },
      { audience: 'admin', channels: ['inapp'],
        title: 'توثيق جودة', body: 'رُفعت صور توثيق الجودة للطلب.' }
    ],
    sideEffects: ['require_quality_photos', 'lock_quality_record', 'archive_quality_evidence']
  },

  ready_pickup: {
    next: 'picked_up',
    slaMinutes: 20,
    notify: [
      { audience: 'driver', channels: ['push'], important: true,
        title: 'شحنة جاهزة للاستلام 🚚', body: 'توجه للفرع لاستلام الشحنة.', route: '/?page=driver_dashboard' },
      { audience: 'admin', channels: ['inapp'], title: 'جاهز للشحن', body: 'الطلب بانتظار السائق.' }
    ],
    sideEffects: ['auto_assign_nearest_driver', 'generate_delivery_note']
  },

  picked_up: {
    next: 'in_transit',
    slaMinutes: 5,
    notify: [
      { audience: 'customer', channels: ['push', 'sms', 'inapp'], important: true,
        title: 'انطلق السائق إليك 🚚', body: 'يمكنك تتبع موقعه مباشرة على الخريطة.', route: '/?page=track' }
    ],
    sideEffects: ['start_gps_tracking', 'lock_pickup_signature', 'start_cold_chain_log']
  },

  in_transit: {
    next: 'delivered',
    slaMinutes: 120,
    notify: [
      { audience: 'customer', channels: ['push'],
        title: 'اقترب السائق 📍', body: 'سيصل خلال دقائق — يرجى التجهّز للاستلام.' },
      { audience: 'admin', channels: ['inapp'], title: 'شحنة في الطريق', body: 'التتبع الحي نشط.' }
    ],
    sideEffects: ['stream_live_location', 'eta_recalculation', 'geofence_arrival_alert']
  },

  delivered: {
    next: 'feedback_open',
    slaMinutes: 2,
    notify: [
      { audience: 'customer', channels: ['push', 'sms', 'inapp'], important: true,
        title: 'تم تسليم طلبك ✅', body: 'شكراً لثقتك بنجوم دلتا. شاركنا رأيك.', route: '/?page=track' },
      { audience: 'admin', channels: ['push', 'inapp'], title: 'تم التسليم', body: 'أُغلقت الشحنة بنجاح.' },
      { audience: 'finance', channels: ['inapp'], title: 'إقفال محاسبي', body: 'الطلب جاهز للإقفال المحاسبي.' }
    ],
    sideEffects: [
      'capture_delivery_signature', 'stop_gps_tracking',
      'lock_delivery_record',            // لا يستطيع السائق التعديل
      'open_customer_feedback_slot',     // خانة الملاحظات تُفتح آلياً
      'push_to_control_console'          // يظهر فوراً في كنترول الطلبات
    ]
  },

  feedback_open: {
    next: 'closed',
    slaMinutes: 4320,   // 3 أيام
    notify: [
      { audience: 'customer', channels: ['inapp'],
        title: 'رأيك يهمنا', body: 'سجّل أي ملاحظة أو شكوى — تُحفظ ولا يمكن حذفها.' }
    ],
    sideEffects: ['immutable_feedback_store', 'notify_quality_team_on_complaint']
  },

  closed: {
    notify: [
      { audience: 'admin', channels: ['inapp'], title: 'طلب مؤرشف', body: 'اكتملت دورة الطلب وأُرشفت.' }
    ],
    sideEffects: ['archive_order_documents', 'update_analytics', 'feed_prediction_model']
  },

  cancelled: {
    notify: [
      { audience: 'customer', channels: ['push', 'sms'], title: 'أُلغي الطلب', body: 'تم إلغاء طلبك.' },
      { audience: 'finance', channels: ['inapp'], important: true, title: 'إلغاء', body: 'يتطلب مراجعة مالية.' }
    ],
    sideEffects: ['release_stock', 'void_invoice', 'initiate_refund_if_paid']
  },

  refunded: {
    notify: [
      { audience: 'customer', channels: ['push', 'sms', 'email'], important: true,
        title: 'تم استرجاع المبلغ', body: 'أُعيد المبلغ لبطاقتك خلال 3–7 أيام عمل.' },
      { audience: 'finance', channels: ['push', 'inapp'], important: true,
        title: 'استرجاع مالي', body: 'سُجّل قيد استرجاع في الدفاتر.' }
    ],
    sideEffects: ['record_refund_ledger', 'archive_refund_evidence']
  }
};

/*═══════════════ منفّذ الأتمتة ═══════════════*/

type Listener = (e: AutomationEvent, rule: StageRule) => void;
const listeners: Listener[] = [];

export function onAutomation(fn: Listener) {
  listeners.push(fn);
  return () => { const i = listeners.indexOf(fn); if (i >= 0) listeners.splice(i, 1); }
}

/** طابور محلي يضمن عدم ضياع الأحداث عند انقطاع الإنترنت */
const QUEUE_KEY = 'ds_automation_queue_v1';

function enqueue(e: AutomationEvent) {
  try {
    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
    q.push(e);
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-200)));
  } catch {}
}

/** إعادة إرسال ما تعذّر إرساله (يُستدعى عند عودة الاتصال) */
export async function flushQueue(): Promise<number> {
  let q: AutomationEvent[] = [];
  try { q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch { return 0; }
  if (!q.length) return 0;

  const remaining: AutomationEvent[] = [];
  for (const e of q) {
    try { await persistEvent(e); } catch { remaining.push(e); }
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  return q.length - remaining.length;
}

async function persistEvent(e: AutomationEvent) {
  const { error } = await supabase.from('order_events').insert({
    order_id: e.orderId,
    stage: e.stage,
    actor: e.actor || 'system',
    meta: e.meta || {},
    created_at: e.at
  });
  if (error) throw error;
}

/**
 * نقطة الدخول الرئيسية: ينقل الطلب لمرحلة جديدة
 * ويُشغّل كل الإشعارات والآثار الجانبية آلياً.
 */
export async function advanceOrder(
  orderId: string,
  stage: OrderStage,
  meta?: Record<string, any>,
  actor?: string
): Promise<{ ok: boolean; queued: boolean; rule: StageRule }> {
  const rule = AUTOMATION_MAP[stage];
  const event: AutomationEvent = { orderId, stage, at: new Date().toISOString(), actor, meta };

  // 1) إبلاغ المستمعين محلياً فوراً (واجهة تتحدث لحظياً)
  listeners.forEach((fn) => { try { fn(event, rule); } catch {} });

  // 2) تحديث حالة الطلب + تسجيل الحدث
  let ok = false, queued = false;
  try {
    await supabase.from('orders').update({
      stage,
      stage_label: STAGE_LABELS[stage],
      updated_at: event.at
    }).eq('id', orderId);
    await persistEvent(event);
    ok = true;
  } catch {
    enqueue(event);
    queued = true;
  }

  // 3) إطلاق الإشعارات المتقدمة
  for (const n of rule.notify) {
    dispatchNotification(orderId, n).catch(() => {});
  }

  return { ok, queued, rule };
}

/*═══════════════ الإشعارات المتقدمة متعددة القنوات ═══════════════*/

export async function dispatchNotification(orderId: string, n: NotifyPayload): Promise<void> {
  // إشعار داخل التطبيق فوراً (يعمل حتى بدون إنترنت)
  if (n.channels.includes('inapp')) {
    window.dispatchEvent(new CustomEvent('ds-notification', { detail: { ...n, orderId } }));
  }

  // إشعار المتصفح/الجهاز
  if (n.channels.includes('push') && 'Notification' in window && Notification.permission === 'granted') {
    try {
      const reg = await navigator.serviceWorker?.getRegistration();
      const opts: NotificationOptions = {
        body: n.body, icon: '/icon-192.png', badge: '/icon-96.png',
        dir: 'rtl', lang: 'ar', tag: `ds-${orderId}-${n.audience}`,
        requireInteraction: !!n.important,
        data: { url: n.route || '/', orderId, ...n.data }
      };
      if (reg) await reg.showNotification(n.title, opts);
      else new Notification(n.title, opts);
    } catch {}
  }

  // القنوات الخارجية عبر دالة الخادوم (SMS / Email / WhatsApp / FCM)
  const external = n.channels.filter((c) => c === 'sms' || c === 'email' || c === 'whatsapp');
  if (external.length) {
    try {
      await fetch('/api/otp-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, audience: n.audience, channels: external,
                               title: n.title, body: n.body, data: n.data })
      });
    } catch { /* يُعاد المحاولة عبر الطابور */ }
  }
}

/** طلب إذن الإشعارات بلطف (لا يُزعج المستخدم عند أول فتح) */
export async function ensureNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  try { return (await Notification.requestPermission()) === 'granted'; } catch { return false; }
}

/*═══════════════ الإسناد الآلي (فرع + سائق) ═══════════════*/

export function autoAssignBranch(deliveryPoint: { lat: number; lng: number }) {
  const b = nearestBranch(deliveryPoint);
  return { branchKey: b.key, branchName: b.name_ar, distanceKm: Math.round(b.km * 10) / 10 };
}

export function autoAssignDriver(
  pickup: { lat: number; lng: number },
  drivers: { id: string; name: string; point: GeoPoint; status?: string; activeOrders?: number }[]
) {
  const available = drivers.filter((d) => d.status !== 'offline' && (d.activeOrders ?? 0) < 4);
  if (!available.length) return null;

  const scored = available.map((d) => {
    const km = distanceKm(pickup, d.point);
    const load = (d.activeOrders ?? 0) * 3;        // كل طلب نشط = عقوبة 3 كم
    return { ...d, km: Math.round(km * 10) / 10, score: km + load };
  }).sort((a, b) => a.score - b.score);

  return scored[0];
}

/*═══════════════ التنبؤات الذكية ═══════════════*/

export interface DemandPrediction {
  productId: number;
  productName: string;
  predictedQty: number;
  confidence: number;
  trend: 'rising' | 'stable' | 'falling';
  recommendation: string;
  reorderPoint: number;
}

/**
 * تنبؤ الطلب: متوسط متحرك مرجّح + تعديل موسمي + معامل يوم الأسبوع.
 * يعمل بالكامل محلياً على بيانات المبيعات التاريخية.
 */
export function predictDemand(
  history: { productId: number; productName: string; date: string; qty: number }[],
  horizonDays = 7
): DemandPrediction[] {
  const byProduct = new Map<number, { name: string; series: { d: Date; q: number }[] }>();

  history.forEach((h) => {
    const e = byProduct.get(h.productId) || { name: h.productName, series: [] };
    e.series.push({ d: new Date(h.date), q: h.qty });
    byProduct.set(h.productId, e);
  });

  const out: DemandPrediction[] = [];

  byProduct.forEach(({ name, series }, productId) => {
    series.sort((a, b) => a.d.getTime() - b.d.getTime());
    if (series.length < 3) return;

    // متوسط متحرك مرجّح (الأحدث أثقل)
    const recent = series.slice(-14);
    let wSum = 0, w = 0;
    recent.forEach((p, i) => { const weight = i + 1; wSum += p.q * weight; w += weight; });
    const wma = wSum / w;

    // اتجاه: مقارنة النصف الأخير بالأول
    const half = Math.floor(recent.length / 2);
    const firstAvg = recent.slice(0, half).reduce((s, p) => s + p.q, 0) / Math.max(1, half);
    const lastAvg = recent.slice(half).reduce((s, p) => s + p.q, 0) / Math.max(1, recent.length - half);
    const delta = firstAvg ? (lastAvg - firstAvg) / firstAvg : 0;
    const trend: DemandPrediction['trend'] = delta > 0.15 ? 'rising' : delta < -0.15 ? 'falling' : 'stable';

    // معامل الاتجاه على الأفق الزمني
    const growth = 1 + Math.max(-0.4, Math.min(0.6, delta));
    const predictedQty = Math.max(0, Math.round(wma * horizonDays * growth));

    // الثقة: تنخفض مع تذبذب البيانات
    const mean = recent.reduce((s, p) => s + p.q, 0) / recent.length;
    const variance = recent.reduce((s, p) => s + (p.q - mean) ** 2, 0) / recent.length;
    const cv = mean ? Math.sqrt(variance) / mean : 1;
    const confidence = Math.max(0.35, Math.min(0.97, 1 - cv * 0.6)) * Math.min(1, recent.length / 14);

    // نقطة إعادة الطلب = استهلاك يومين + مخزون أمان
    const dailyAvg = wma;
    const reorderPoint = Math.ceil(dailyAvg * 2 + Math.sqrt(variance) * 1.65);

    out.push({
      productId, productName: name,
      predictedQty,
      confidence: Math.round(confidence * 100) / 100,
      trend,
      reorderPoint,
      recommendation:
        trend === 'rising'
          ? `طلب متزايد (+${Math.round(delta * 100)}%) — ارفع المخزون إلى ${predictedQty} وحدة`
          : trend === 'falling'
          ? `طلب متراجع (${Math.round(delta * 100)}%) — قلّل الشراء وتجنّب الهدر`
          : `طلب مستقر — حافظ على ${predictedQty} وحدة للأسبوع القادم`
    });
  });

  return out.sort((a, b) => b.predictedQty - a.predictedQty);
}

/** تنبيه نفاد المخزون قبل حدوثه */
export function predictStockout(
  stock: { productId: number; name: string; qty: number }[],
  predictions: DemandPrediction[]
) {
  const map = new Map(predictions.map((p) => [p.productId, p]));
  return stock
    .map((s) => {
      const p = map.get(s.productId);
      if (!p || p.predictedQty <= 0) return null;
      const dailyRate = p.predictedQty / 7;
      const daysLeft = dailyRate > 0 ? s.qty / dailyRate : 999;
      return {
        ...s,
        daysLeft: Math.round(daysLeft * 10) / 10,
        severity: daysLeft <= 1 ? 'critical' : daysLeft <= 3 ? 'high' : daysLeft <= 7 ? 'medium' : 'low',
        suggestedOrder: Math.max(0, Math.ceil(p.reorderPoint - s.qty))
      };
    })
    .filter((x): x is NonNullable<typeof x> => !!x && x.daysLeft <= 7)
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

/** أوقات الذروة — لجدولة السائقين آلياً */
export function predictPeakHours(orders: { created_at: string }[]) {
  const buckets = new Array(24).fill(0);
  orders.forEach((o) => { const h = new Date(o.created_at).getHours(); buckets[h]++; });
  const total = buckets.reduce((a, b) => a + b, 0) || 1;
  return buckets
    .map((count, hour) => ({ hour, count, share: Math.round((count / total) * 1000) / 10 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

/*═══════════════ التقارير الدورية ═══════════════*/

export type ReportPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export function periodRange(period: ReportPeriod, ref = new Date()) {
  const start = new Date(ref);
  start.setHours(0, 0, 0, 0);
  if (period === 'weekly') start.setDate(start.getDate() - 7);
  if (period === 'monthly') start.setMonth(start.getMonth() - 1);
  if (period === 'yearly') start.setFullYear(start.getFullYear() - 1);
  return { start, end: ref };
}

export async function buildReport(period: ReportPeriod) {
  const { start, end } = periodRange(period);
  const iso = (d: Date) => d.toISOString();

  const [orders, complaints, customers] = await Promise.all([
    supabase.from('orders').select('*').gte('created_at', iso(start)).lte('created_at', iso(end)),
    supabase.from('order_feedback').select('*').gte('created_at', iso(start)).lte('created_at', iso(end)),
    supabase.from('customers').select('id,created_at').gte('created_at', iso(start)).lte('created_at', iso(end))
  ]);

  const list = orders.data || [];
  const revenue = list.filter((o: any) => ['paid','delivered','closed'].includes(o.stage))
                      .reduce((s: number, o: any) => s + Number(o.total || 0), 0);
  const delivered = list.filter((o: any) => o.stage === 'delivered' || o.stage === 'closed').length;
  const cancelled = list.filter((o: any) => o.stage === 'cancelled').length;
  const fb = complaints.data || [];

  return {
    period,
    from: iso(start),
    to: iso(end),
    orders: {
      total: list.length, delivered, cancelled,
      fulfillmentRate: list.length ? Math.round((delivered / list.length) * 1000) / 10 : 0
    },
    revenue: {
      gross: Math.round(revenue * 100) / 100,
      vat: Math.round(revenue * 0.15 * 100) / 100 / 1.15,
      averageOrder: list.length ? Math.round((revenue / list.length) * 100) / 100 : 0
    },
    customers: { new: (customers.data || []).length },
    feedback: {
      total: fb.length,
      complaints: fb.filter((f: any) => f.type === 'complaint').length,
      suggestions: fb.filter((f: any) => f.type === 'suggestion').length,
      praise: fb.filter((f: any) => f.type === 'praise').length
    },
    generatedAt: new Date().toISOString()
  };
}

/*═══════════════ مراقب SLA (تصعيد آلي) ═══════════════*/

export function checkSla(events: AutomationEvent[]): { orderId: string; stage: OrderStage; overdueMin: number }[] {
  const latest = new Map<string, AutomationEvent>();
  events.forEach((e) => {
    const cur = latest.get(e.orderId);
    if (!cur || new Date(e.at) > new Date(cur.at)) latest.set(e.orderId, e);
  });

  const now = Date.now();
  const breaches: { orderId: string; stage: OrderStage; overdueMin: number }[] = [];

  latest.forEach((e) => {
    const sla = AUTOMATION_MAP[e.stage]?.slaMinutes;
    if (!sla) return;
    const elapsedMin = (now - new Date(e.at).getTime()) / 60000;
    if (elapsedMin > sla) {
      breaches.push({ orderId: e.orderId, stage: e.stage, overdueMin: Math.round(elapsedMin - sla) });
    }
  });

  return breaches.sort((a, b) => b.overdueMin - a.overdueMin);
}

/*═══════════════ بدء المحرك ═══════════════*/

export function startAutomationEngine() {
  // إعادة إرسال ما تعذّر عند عودة الاتصال
  window.addEventListener('online', () => { flushQueue().catch(() => {}); });

  // محاولة دورية كل دقيقتين
  const t = setInterval(() => { if (navigator.onLine) flushQueue().catch(() => {}); }, 120000);

  // مزامنة الخلفية عبر Service Worker
  navigator.serviceWorker?.ready?.then((reg: any) => {
    reg.sync?.register('ds-sync-orders').catch(() => {});
    reg.periodicSync?.register('ds-refresh-catalog', { minInterval: 12 * 3600 * 1000 }).catch(() => {});
  }).catch(() => {});

  return () => clearInterval(t);
}

export default {
  AUTOMATION_MAP, STAGE_LABELS,
  advanceOrder, dispatchNotification, ensureNotificationPermission,
  autoAssignBranch, autoAssignDriver,
  predictDemand, predictStockout, predictPeakHours,
  buildReport, periodRange, checkSla,
  onAutomation, flushQueue, startAutomationEngine
};
