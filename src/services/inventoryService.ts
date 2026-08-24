/**
 * Delta Stars — Inventory, Order Automation & Financial Service
 * Complete stock management, auto-order processing, invoicing, financial reports
 */

import { supabase } from '../lib/supabase';

export interface StockItem {
  productId: number;
  name: string;
  currentStock: number;
  minThreshold: number;
  maxStock: number;
  lastRestocked: string;
  costPrice: number;
  sellPrice: number;
}

export interface OrderAutomation {
  orderId: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  assignedDriver?: string;
  assignedBranch: string;
  warehouseActions: WarehouseAction[];
  createdAt: string;
  updatedAt: string;
}

export interface WarehouseAction {
  step: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo?: string;
  timestamp?: string;
  notes?: string;
}

// ========== Order Automation Pipeline ==========
export function createOrderPipeline(): WarehouseAction[] {
  return [
    { step: 'استلام الطلب', status: 'pending' },
    { step: 'مراجعة المخزون', status: 'pending' },
    { step: 'تجهيز المنتجات', status: 'pending' },
    { step: 'التحميل والتغليف', status: 'pending' },
    { step: 'التسليم للمندوب', status: 'pending' },
    { step: 'التوصيل', status: 'pending' },
    { step: 'تأكيد الاستلام', status: 'pending' },
  ];
}

export function advanceOrderStatus(order: OrderAutomation): OrderAutomation {
  const pipeline = createOrderPipeline();
  const currentIdx = order.warehouseActions.findIndex(a => a.status !== 'completed');
  if (currentIdx === -1) return { ...order, status: 'completed' };

  const actions = [...order.warehouseActions];
  actions[currentIdx] = { ...actions[currentIdx], status: 'completed', timestamp: new Date().toISOString() };

  const nextStatuses: Record<number, OrderAutomation['status']> = {
    0: 'confirmed',
    1: 'confirmed',
    2: 'preparing',
    3: 'ready',
    4: 'shipped',
    5: 'shipped',
    6: 'delivered',
  };

  return { ...order, warehouseActions: actions, status: nextStatuses[currentIdx] || order.status, updatedAt: new Date().toISOString() };
}

// ========== Financial / Accounting ==========
export interface Invoice {
  id: string;
  orderId: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  vat: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  issuedAt: string;
}

export function generateInvoice(order: {
  orderId: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  paymentMethod: string;
}): Invoice {
  const subtotal = order.items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  const vat = subtotal * 0.15;
  return {
    id: `INV-${Date.now().toString(36).toUpperCase()}`,
    orderId: order.orderId,
    customerName: order.customerName,
    items: order.items,
    subtotal,
    vat,
    total: subtotal + vat,
    paymentMethod: order.paymentMethod,
    paymentStatus: 'pending',
    issuedAt: new Date().toISOString(),
  };
}

// ========== Stock Alerts ==========
export function checkStockAlerts(products: StockItem[]): StockItem[] {
  return products.filter(p => p.currentStock <= p.minThreshold);
}

export function calculateRestockQuantity(item: StockItem): number {
  return item.maxStock - item.currentStock;
}

// ========== Branch Performance ==========
export interface BranchStats {
  branchId: string;
  branchName: string;
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  deliverySuccessRate: number;
  activeDrivers: number;
}

export function calculateBranchStats(orders: { branchId: string; total: number; status: string }[]): BranchStats[] {
  const branchMap = new Map<string, { orders: number; revenue: number; delivered: number; total: number }>();

  for (const order of orders) {
    const existing = branchMap.get(order.branchId) || { orders: 0, revenue: 0, delivered: 0, total: 0 };
    existing.orders++;
    existing.revenue += order.total;
    existing.total++;
    if (order.status === 'delivered' || order.status === 'completed') existing.delivered++;
    branchMap.set(order.branchId, existing);
  }

  return Array.from(branchMap.entries()).map(([id, data]) => ({
    branchId: id,
    branchName: id,
    totalOrders: data.orders,
    totalRevenue: data.revenue,
    avgOrderValue: data.orders > 0 ? Math.round(data.revenue / data.orders) : 0,
    deliverySuccessRate: data.total > 0 ? Math.round((data.delivered / data.total) * 100) : 0,
    activeDrivers: 0,
  }));
}
