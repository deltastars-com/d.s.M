/**
 * نظام الإدارة المتكامل
 * يربط:
 * - حسابات العملاء المميزين (VIP)
 * - المبيعات والمشتريات
 * - المخازن والموردين
 * - النظام المحاسبي
 */

interface AdminDashboardData {
  totalSales: number;
  totalPurchases: number;
  totalRevenue: number;
  totalExpenses: number;
  vipCustomers: number;
  activeOrders: number;
  inventoryStatus: InventoryStatus;
  supplierMetrics: SupplierMetrics;
  accountingStatus: AccountingStatus;
}

interface InventoryStatus {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalValue: number;
}

interface SupplierMetrics {
  totalSuppliers: number;
  activeSuppliers: number;
  pendingPayments: number;
  totalPaymentsDue: number;
}

interface AccountingStatus {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  accountsPayable: number;
  accountsReceivable: number;
}

interface SalesReport {
  date: Date;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  vipSales: number;
  regularSales: number;
}

interface PurchaseOrder {
  id: string;
  supplierId: string;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: Date;
  deliveryDate?: Date;
}

interface InventoryTransaction {
  id: string;
  productId: string;
  type: 'in' | 'out';
  quantity: number;
  reason: string;
  timestamp: Date;
  reference?: string;
}

// قاموس لتخزين البيانات (في الإنتاج، يتم حفظها في قاعدة البيانات)
const adminData = {
  sales: new Map<string, SalesReport>(),
  purchases: new Map<string, PurchaseOrder>(),
  inventory: new Map<string, InventoryTransaction>(),
  suppliers: new Map<string, any>(),
};

/**
 * الحصول على لوحة المعلومات الإدارية الشاملة
 */
export function getAdminDashboard(): AdminDashboardData {
  try {
    // حساب إجمالي المبيعات
    let totalSales = 0;
    let totalRevenue = 0;
    let vipSalesCount = 0;

    adminData.sales.forEach((report) => {
      totalSales += report.totalOrders;
      totalRevenue += report.totalSales;
      vipSalesCount += report.vipSales;
    });

    // حساب إجمالي المشتريات
    let totalPurchases = 0;
    let totalExpenses = 0;

    adminData.purchases.forEach((order) => {
      totalPurchases += order.items.length;
      totalExpenses += order.totalAmount;
    });

    // حالة المخزن
    const inventoryStatus = getInventoryStatus();

    // مقاييس الموردين
    const supplierMetrics = getSupplierMetrics();

    // حالة المحاسبة
    const accountingStatus = getAccountingStatus();

    return {
      totalSales,
      totalPurchases,
      totalRevenue,
      totalExpenses,
      vipCustomers: vipSalesCount,
      activeOrders: totalSales,
      inventoryStatus,
      supplierMetrics,
      accountingStatus,
    };
  } catch (error) {
    console.error('خطأ في الحصول على لوحة المعلومات:', error);
    return {
      totalSales: 0,
      totalPurchases: 0,
      totalRevenue: 0,
      totalExpenses: 0,
      vipCustomers: 0,
      activeOrders: 0,
      inventoryStatus: { totalProducts: 0, lowStockProducts: 0, outOfStockProducts: 0, totalValue: 0 },
      supplierMetrics: { totalSuppliers: 0, activeSuppliers: 0, pendingPayments: 0, totalPaymentsDue: 0 },
      accountingStatus: { totalIncome: 0, totalExpenses: 0, netProfit: 0, accountsPayable: 0, accountsReceivable: 0 },
    };
  }
}

/**
 * إضافة طلب شراء جديد
 */
export function createPurchaseOrder(
  supplierId: string,
  items: Array<{ productId: string; quantity: number; unitPrice: number }>
) {
  try {
    const orderId = `PO-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

    const order: PurchaseOrder = {
      id: orderId,
      supplierId,
      items,
      totalAmount,
      status: 'pending',
      createdAt: new Date(),
    };

    adminData.purchases.set(orderId, order);

    // تسجيل المعاملة المحاسبية
    recordAccountingTransaction('purchase', totalAmount, `طلب شراء: ${orderId}`);

    return {
      success: true,
      message: 'تم إنشاء طلب الشراء بنجاح',
      orderId,
      totalAmount,
    };
  } catch (error) {
    console.error('خطأ في إنشاء طلب الشراء:', error);
    return {
      success: false,
      message: 'حدث خطأ في إنشاء الطلب',
    };
  }
}

/**
 * تحديث حالة طلب الشراء
 */
export function updatePurchaseOrderStatus(orderId: string, status: 'pending' | 'confirmed' | 'delivered') {
  try {
    const order = adminData.purchases.get(orderId);

    if (!order) {
      return {
        success: false,
        message: 'طلب الشراء غير موجود',
      };
    }

    order.status = status;

    if (status === 'delivered') {
      order.deliveryDate = new Date();
      // تحديث المخزن
      order.items.forEach((item) => {
        recordInventoryTransaction(item.productId, 'in', item.quantity, `استقبال من طلب: ${orderId}`);
      });
    }

    adminData.purchases.set(orderId, order);

    return {
      success: true,
      message: 'تم تحديث حالة الطلب بنجاح',
      orderId,
      status,
    };
  } catch (error) {
    console.error('خطأ في تحديث حالة الطلب:', error);
    return {
      success: false,
      message: 'حدث خطأ في التحديث',
    };
  }
}

/**
 * تسجيل معاملة مخزن
 */
export function recordInventoryTransaction(
  productId: string,
  type: 'in' | 'out',
  quantity: number,
  reason: string,
  reference?: string
) {
  try {
    const transactionId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const transaction: InventoryTransaction = {
      id: transactionId,
      productId,
      type,
      quantity,
      reason,
      timestamp: new Date(),
      reference,
    };

    adminData.inventory.set(transactionId, transaction);

    return {
      success: true,
      message: 'تم تسجيل معاملة المخزن بنجاح',
      transactionId,
    };
  } catch (error) {
    console.error('خطأ في تسجيل معاملة المخزن:', error);
    return {
      success: false,
      message: 'حدث خطأ في التسجيل',
    };
  }
}

/**
 * الحصول على حالة المخزن
 */
function getInventoryStatus(): InventoryStatus {
  let totalProducts = 0;
  let lowStockProducts = 0;
  let outOfStockProducts = 0;
  let totalValue = 0;

  // في الإنتاج، يتم الحصول على هذه البيانات من قاعدة البيانات
  adminData.inventory.forEach((transaction) => {
    if (transaction.type === 'in') {
      totalProducts += transaction.quantity;
    } else {
      totalProducts -= transaction.quantity;
    }
  });

  return {
    totalProducts: Math.max(0, totalProducts),
    lowStockProducts: Math.floor(totalProducts * 0.1),
    outOfStockProducts: 0,
    totalValue: totalProducts * 10, // قيمة تقريبية
  };
}

/**
 * الحصول على مقاييس الموردين
 */
function getSupplierMetrics(): SupplierMetrics {
  const totalSuppliers = adminData.suppliers.size;
  const activeSuppliers = Math.floor(totalSuppliers * 0.8);
  const pendingPayments = adminData.purchases.size;
  let totalPaymentsDue = 0;

  adminData.purchases.forEach((order) => {
    if (order.status !== 'delivered') {
      totalPaymentsDue += order.totalAmount;
    }
  });

  return {
    totalSuppliers,
    activeSuppliers,
    pendingPayments,
    totalPaymentsDue,
  };
}

/**
 * الحصول على حالة المحاسبة
 */
function getAccountingStatus(): AccountingStatus {
  let totalIncome = 0;
  let totalExpenses = 0;

  adminData.sales.forEach((report) => {
    totalIncome += report.totalSales;
  });

  adminData.purchases.forEach((order) => {
    totalExpenses += order.totalAmount;
  });

  return {
    totalIncome,
    totalExpenses,
    netProfit: totalIncome - totalExpenses,
    accountsPayable: totalExpenses * 0.3, // 30% من المشتريات
    accountsReceivable: totalIncome * 0.2, // 20% من المبيعات
  };
}

/**
 * تسجيل معاملة محاسبية
 */
function recordAccountingTransaction(type: 'sale' | 'purchase', amount: number, description: string) {
  // في الإنتاج، يتم تسجيل هذه المعاملات في نظام المحاسبة
  console.log(`معاملة محاسبية: ${type} - ${amount} - ${description}`);
}

/**
 * الحصول على تقرير المبيعات اليومي
 */
export function getDailySalesReport(date: Date): SalesReport {
  const dateKey = date.toISOString().split('T')[0];
  const report = adminData.sales.get(dateKey);

  if (report) {
    return report;
  }

  return {
    date,
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    vipSales: 0,
    regularSales: 0,
  };
}

/**
 * تسجيل عملية بيع
 */
export function recordSale(
  orderId: string,
  totalAmount: number,
  isVIP: boolean,
  items: Array<{ productId: string; quantity: number }>
) {
  try {
    const dateKey = new Date().toISOString().split('T')[0];
    const report = adminData.sales.get(dateKey) || {
      date: new Date(),
      totalSales: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      vipSales: 0,
      regularSales: 0,
    };

    report.totalSales += totalAmount;
    report.totalOrders += 1;
    report.averageOrderValue = report.totalSales / report.totalOrders;

    if (isVIP) {
      report.vipSales += totalAmount;
    } else {
      report.regularSales += totalAmount;
    }

    adminData.sales.set(dateKey, report);

    // تحديث المخزن
    items.forEach((item) => {
      recordInventoryTransaction(item.productId, 'out', item.quantity, `بيع: ${orderId}`);
    });

    // تسجيل المعاملة المحاسبية
    recordAccountingTransaction('sale', totalAmount, `طلب بيع: ${orderId}`);

    return {
      success: true,
      message: 'تم تسجيل البيع بنجاح',
      orderId,
    };
  } catch (error) {
    console.error('خطأ في تسجيل البيع:', error);
    return {
      success: false,
      message: 'حدث خطأ في التسجيل',
    };
  }
}

export { AdminDashboardData, InventoryStatus, SupplierMetrics, AccountingStatus, SalesReport, PurchaseOrder };
