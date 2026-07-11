/**
 * نظام الدفع البنكي المتكامل
 * تكامل مع البنك العربي
 */

// بيانات حساب البنك للشركة
export const COMPANY_BANK_ACCOUNT = {
  bankName: 'البنك العربي',
  accountHolder: 'نجوم دلتا للتجارة',
  accountNumber: '1234567890',
  iban: 'SA1234567890123456789012',
  swiftCode: 'ARABSAUD',
  email: 'deltastars777@gmail.com',
};

// معدلات الصرف والعملات
export const CURRENCIES = {
  SAR: { symbol: 'ر.س', rate: 1 },
  USD: { symbol: '$', rate: 0.27 },
  AED: { symbol: 'د.إ', rate: 0.99 },
};

// قاموس لتخزين حالات الدفع (في الإنتاج، يتم حفظها في قاعدة البيانات)
const paymentStore = new Map<string, any>();

/**
 * إنشاء طلب دفع جديد
 */
export function createPaymentRequest(
  orderId: number,
  invoiceId: number,
  amount: number,
  paymentMethod: 'bank_transfer' | 'cash_on_delivery' | 'card' = 'bank_transfer'
) {
  try {
    const reference = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const paymentId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const payment = {
      id: paymentId,
      invoiceId,
      orderId,
      amount,
      paymentMethod,
      status: 'pending',
      reference,
      createdAt: new Date(),
    };

    paymentStore.set(paymentId, payment);

    return {
      success: true,
      paymentId,
      amount,
      paymentMethod,
      bankDetails: COMPANY_BANK_ACCOUNT,
      reference,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  } catch (error) {
    console.error('خطأ في إنشاء طلب الدفع:', error);
    throw error;
  }
}

/**
 * التحقق من حالة الدفع
 */
export function checkPaymentStatus(paymentId: string) {
  try {
    const payment = paymentStore.get(paymentId);

    if (!payment) {
      return { success: false, message: 'طلب الدفع غير موجود' };
    }

    return {
      success: true,
      paymentId: payment.id,
      status: payment.status,
      amount: payment.amount,
      paymentMethod: payment.paymentMethod,
      orderId: payment.orderId,
      createdAt: payment.createdAt,
    };
  } catch (error) {
    console.error('خطأ في التحقق من حالة الدفع:', error);
    throw error;
  }
}

/**
 * تأكيد الدفع
 */
export function confirmPayment(paymentId: string, reference: string) {
  try {
    const payment = paymentStore.get(paymentId);

    if (!payment) {
      return { success: false, message: 'طلب الدفع غير موجود' };
    }

    payment.status = 'completed';
    payment.reference = reference;
    payment.completedAt = new Date();

    paymentStore.set(paymentId, payment);

    return {
      success: true,
      message: 'تم تأكيد الدفع بنجاح',
      paymentId,
      reference,
      orderId: payment.orderId,
    };
  } catch (error) {
    console.error('خطأ في تأكيد الدفع:', error);
    throw error;
  }
}

/**
 * حساب إجمالي الفاتورة
 */
export function calculateInvoice(
  items: Array<{ price: number; quantity: number }>,
  taxRate: number = 0.15
) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
    taxRate: taxRate * 100,
  };
}

/**
 * تحويل العملات
 */
export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string
) {
  const fromRate = CURRENCIES[fromCurrency as keyof typeof CURRENCIES]?.rate || 1;
  const toRate = CURRENCIES[toCurrency as keyof typeof CURRENCIES]?.rate || 1;

  const amountInSAR = amount / fromRate;
  const convertedAmount = amountInSAR * toRate;

  return Math.round(convertedAmount * 100) / 100;
}

/**
 * إنشاء فاتورة
 */
export function generateInvoice(orderId: number, totalAmount: number) {
  try {
    const invoiceId = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return {
      success: true,
      invoiceId,
      orderId,
      date: new Date(),
      amount: totalAmount,
      status: 'issued',
      bankDetails: COMPANY_BANK_ACCOUNT,
    };
  } catch (error) {
    console.error('خطأ في إنشاء الفاتورة:', error);
    throw error;
  }
}

/**
 * الحصول على سجل المعاملات
 */
export function getTransactionHistory(orderId: number) {
  try {
    const payments = Array.from(paymentStore.values()).filter(
      (p) => p.orderId === orderId
    );

    if (payments.length === 0) {
      return { success: false, message: 'لا توجد معاملات لهذا الطلب' };
    }

    return {
      success: true,
      transactions: payments.map((p) => ({
        paymentId: p.id,
        orderId: p.orderId,
        amount: p.amount,
        paymentMethod: p.paymentMethod,
        status: p.status,
        reference: p.reference,
        createdAt: p.createdAt,
        completedAt: p.completedAt,
      })),
    };
  } catch (error) {
    console.error('خطأ في الحصول على سجل المعاملات:', error);
    throw error;
  }
}

/**
 * الحصول على جميع طلبات الدفع المعلقة
 */
export function getPendingPayments() {
  try {
    const pending = Array.from(paymentStore.values()).filter(
      (p) => p.status === 'pending'
    );

    return {
      success: true,
      count: pending.length,
      payments: pending,
    };
  } catch (error) {
    console.error('خطأ في الحصول على طلبات الدفع المعلقة:', error);
    throw error;
  }
}

/**
 * إلغاء طلب دفع
 */
export function cancelPayment(paymentId: string, reason: string) {
  try {
    const payment = paymentStore.get(paymentId);

    if (!payment) {
      return { success: false, message: 'طلب الدفع غير موجود' };
    }

    if (payment.status !== 'pending') {
      return { success: false, message: 'لا يمكن إلغاء طلب دفع مكتمل' };
    }

    payment.status = 'failed';
    payment.reason = reason;
    payment.cancelledAt = new Date();

    paymentStore.set(paymentId, payment);

    return {
      success: true,
      message: 'تم إلغاء طلب الدفع بنجاح',
      paymentId,
    };
  } catch (error) {
    console.error('خطأ في إلغاء طلب الدفع:', error);
    throw error;
  }
}
