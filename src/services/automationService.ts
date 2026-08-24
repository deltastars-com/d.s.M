/**
 * Delta Stars — Order Automation Service
 * End-to-end order lifecycle automation: placement → confirmation → preparation → shipping → delivery
 */

export interface OrderLifecycle {
  orderId: string;
  status: OrderStatus;
  timeline: TimelineEntry[];
  assignments: OrderAssignments;
  notifications: NotificationRecord[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'ready_for_pickup' | 'assigned_to_driver' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'completed' | 'cancelled' | 'returned';

export interface TimelineEntry {
  status: OrderStatus;
  timestamp: string;
  actor: string;
  notes?: string;
}

export interface OrderAssignments {
  branchId: string;
  warehouseWorker?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
}

export interface NotificationRecord {
  type: 'sms' | 'push' | 'email' | 'whatsapp';
  recipient: string;
  message: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
}

// Create order lifecycle
export function createOrderLifecycle(orderId: string, branchId: string): OrderLifecycle {
  return {
    orderId,
    status: 'placed',
    timeline: [{ status: 'placed', timestamp: new Date().toISOString(), actor: 'customer' }],
    assignments: { branchId },
    notifications: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Advance order through pipeline
export function advanceOrder(lifecycle: OrderLifecycle, actor: string, notes?: string): OrderLifecycle {
  const statusFlow: OrderStatus[] = ['placed', 'confirmed', 'preparing', 'ready_for_pickup', 'assigned_to_driver', 'in_transit', 'out_for_delivery', 'delivered', 'completed'];
  const currentIdx = statusFlow.indexOf(lifecycle.status);
  if (currentIdx === -1 || currentIdx >= statusFlow.length - 1) return lifecycle;

  const nextStatus = statusFlow[currentIdx + 1];
  return {
    ...lifecycle,
    status: nextStatus,
    timeline: [...lifecycle.timeline, { status: nextStatus, timestamp: new Date().toISOString(), actor, notes }],
    updatedAt: new Date().toISOString(),
  };
}

// Assign driver to order
export function assignDriver(lifecycle: OrderLifecycle, driverId: string, driverName: string, driverPhone: string): OrderLifecycle {
  return {
    ...lifecycle,
    assignments: { ...lifecycle.assignments, driverId, driverName, driverPhone },
    timeline: [...lifecycle.timeline, { status: 'assigned_to_driver', timestamp: new Date().toISOString(), actor: 'system', notes: `تم تعيين المندوب: ${driverName}` }],
    updatedAt: new Date().toISOString(),
  };
}

// Auto-select nearest branch based on customer location
export function autoSelectBranch(customerLat: number, customerLng: number): string {
  const branches = [
    { id: 'jeddah', lat: 21.4858, lng: 39.1925 },
    { id: 'riyadh', lat: 24.7136, lng: 46.6753 },
    { id: 'dammam', lat: 26.4207, lng: 50.0888 },
    { id: 'abha', lat: 18.2164, lng: 42.5053 },
    { id: 'khamis', lat: 18.3061, lng: 42.7291 },
    { id: 'qassim', lat: 26.3294, lng: 43.9249 },
  ];

  let nearest = branches[0];
  let minDist = Infinity;
  for (const b of branches) {
    const R = 6371;
    const dLat = (b.lat - customerLat) * Math.PI / 180;
    const dLng = (b.lng - customerLng) * Math.PI / 180;
    const x = Math.sin(dLat / 2) ** 2 + Math.cos(customerLat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    const dist = R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
    if (dist < minDist) { minDist = dist; nearest = b; }
  }
  return nearest.id;
}

// Generate order confirmation message
export function generateOrderConfirmation(orderId: string, total: number, items: number, lang: 'ar' | 'en' = 'ar'): string {
  if (lang === 'ar') {
    return `✅ تم تأكيد طلبك رقم ${orderId}\n📦 عدد المنتجات: ${items}\n💰 الإجمالي: ${total.toFixed(2)} ر.س\n\nفريق نجوم دلتا يقوم بتجهيز طلبك الآن!`;
  }
  return `✅ Your order ${orderId} is confirmed\n📦 Items: ${items}\n💰 Total: ${total.toFixed(2)} SAR\n\nDelta Stars team is preparing your order now!`;
}
