import { describe, it, expect, beforeEach } from 'vitest';
import {
  createPaymentRequest,
  checkPaymentStatus,
  confirmPayment,
  calculateInvoice,
  convertCurrency,
  generateInvoice,
  getTransactionHistory,
  getPendingPayments,
  cancelPayment,
  COMPANY_BANK_ACCOUNT,
  CURRENCIES,
} from './payment';

describe('نظام الدفع البنكي', () => {
  let paymentId: string;
  const orderId = 1;
  const invoiceId = 1;
  const amount = 500;

  describe('إنشاء طلب دفع', () => {
    it('يجب إنشاء طلب دفع جديد بنجاح', () => {
      const result = createPaymentRequest(orderId, invoiceId, amount, 'bank_transfer');
      
      expect(result.success).toBe(true);
      expect(result.paymentId).toBeDefined();
      expect(result.amount).toBe(amount);
      expect(result.paymentMethod).toBe('bank_transfer');
      expect(result.bankDetails).toEqual(COMPANY_BANK_ACCOUNT);
      
      paymentId = result.paymentId;
    });

    it('يجب حفظ بيانات البنك الصحيحة', () => {
      const result = createPaymentRequest(orderId, invoiceId, amount);
      
      expect(result.bankDetails.bankName).toBe('البنك العربي');
      expect(result.bankDetails.accountHolder).toBe('نجوم دلتا للتجارة');
      expect(result.bankDetails.email).toBe('deltastars777@gmail.com');
    });

    it('يجب إنشاء رقم مرجع فريد', () => {
      const result1 = createPaymentRequest(orderId, invoiceId, amount);
      const result2 = createPaymentRequest(orderId, invoiceId, amount);
      
      expect(result1.reference).not.toBe(result2.reference);
    });
  });

  describe('التحقق من حالة الدفع', () => {
    beforeEach(() => {
      const result = createPaymentRequest(orderId, invoiceId, amount);
      paymentId = result.paymentId;
    });

    it('يجب إرجاع معلومات الدفع الصحيحة', () => {
      const result = checkPaymentStatus(paymentId);
      
      expect(result.success).toBe(true);
      expect(result.paymentId).toBe(paymentId);
      expect(result.status).toBe('pending');
      expect(result.amount).toBe(amount);
    });

    it('يجب إرجاع خطأ عند البحث عن دفع غير موجود', () => {
      const result = checkPaymentStatus('INVALID_ID');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('طلب الدفع غير موجود');
    });
  });

  describe('تأكيد الدفع', () => {
    beforeEach(() => {
      const result = createPaymentRequest(orderId, invoiceId, amount);
      paymentId = result.paymentId;
    });

    it('يجب تأكيد الدفع بنجاح', () => {
      const result = confirmPayment(paymentId, 'TRX123456');
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('تم تأكيد الدفع بنجاح');
      expect(result.paymentId).toBe(paymentId);
    });

    it('يجب تحديث حالة الدفع إلى مكتمل', () => {
      confirmPayment(paymentId, 'TRX123456');
      const status = checkPaymentStatus(paymentId);
      
      expect(status.status).toBe('completed');
    });

    it('يجب إرجاع خطأ عند تأكيد دفع غير موجود', () => {
      const result = confirmPayment('INVALID_ID', 'TRX123456');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('طلب الدفع غير موجود');
    });
  });

  describe('حساب الفاتورة', () => {
    it('يجب حساب الفاتورة بشكل صحيح', () => {
      const items = [
        { price: 100, quantity: 2 },
        { price: 50, quantity: 1 },
      ];
      
      const invoice = calculateInvoice(items);
      
      expect(invoice.subtotal).toBe(250);
      expect(invoice.tax).toBe(37.5); // 250 * 0.15
      expect(invoice.total).toBe(287.5);
      expect(invoice.taxRate).toBe(15);
    });

    it('يجب حساب الفاتورة مع معدل ضريبة مخصص', () => {
      const items = [{ price: 100, quantity: 1 }];
      const invoice = calculateInvoice(items, 0.10);
      
      expect(invoice.tax).toBe(10);
      expect(invoice.total).toBe(110);
    });

    it('يجب التعامل مع قائمة فارغة', () => {
      const invoice = calculateInvoice([]);
      
      expect(invoice.subtotal).toBe(0);
      expect(invoice.tax).toBe(0);
      expect(invoice.total).toBe(0);
    });
  });

  describe('تحويل العملات', () => {
    it('يجب تحويل من الريال إلى الدولار', () => {
      const result = convertCurrency(100, 'SAR', 'USD');
      
      expect(result).toBeCloseTo(27, 0);
    });

    it('يجب تحويل من الدولار إلى الريال', () => {
      const result = convertCurrency(27, 'USD', 'SAR');
      
      expect(result).toBeCloseTo(100, 0);
    });

    it('يجب التعامل مع عملات غير معروفة', () => {
      const result = convertCurrency(100, 'UNKNOWN', 'SAR');
      
      expect(result).toBe(100);
    });

    it('يجب تحويل من نفس العملة', () => {
      const result = convertCurrency(100, 'SAR', 'SAR');
      
      expect(result).toBe(100);
    });
  });

  describe('إنشاء الفاتورة', () => {
    it('يجب إنشاء فاتورة جديدة', () => {
      const result = generateInvoice(orderId, 500);
      
      expect(result.success).toBe(true);
      expect(result.invoiceId).toBeDefined();
      expect(result.orderId).toBe(orderId);
      expect(result.amount).toBe(500);
      expect(result.status).toBe('issued');
    });

    it('يجب تضمين بيانات البنك في الفاتورة', () => {
      const result = generateInvoice(orderId, 500);
      
      expect(result.bankDetails).toEqual(COMPANY_BANK_ACCOUNT);
    });
  });

  describe('سجل المعاملات', () => {
    beforeEach(() => {
      const result1 = createPaymentRequest(orderId, invoiceId, 100);
      const result2 = createPaymentRequest(orderId, invoiceId, 200);
      
      confirmPayment(result1.paymentId, 'TRX001');
      confirmPayment(result2.paymentId, 'TRX002');
    });

    it('يجب الحصول على سجل المعاملات', () => {
      const result = getTransactionHistory(orderId);
      
      expect(result.success).toBe(true);
      expect(result.transactions).toBeDefined();
      expect(result.transactions.length).toBeGreaterThan(0);
    });

    it('يجب إرجاع خطأ عند عدم وجود معاملات', () => {
      const result = getTransactionHistory(999);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('لا توجد معاملات لهذا الطلب');
    });
  });

  describe('طلبات الدفع المعلقة', () => {
    beforeEach(() => {
      createPaymentRequest(orderId, invoiceId, 100);
      createPaymentRequest(orderId, invoiceId, 200);
    });

    it('يجب الحصول على جميع طلبات الدفع المعلقة', () => {
      const result = getPendingPayments();
      
      expect(result.success).toBe(true);
      expect(result.count).toBeGreaterThan(0);
      expect(result.payments).toBeDefined();
    });
  });

  describe('إلغاء طلب دفع', () => {
    beforeEach(() => {
      const result = createPaymentRequest(orderId, invoiceId, amount);
      paymentId = result.paymentId;
    });

    it('يجب إلغاء طلب دفع معلق', () => {
      const result = cancelPayment(paymentId, 'تغيير الرأي');
      
      expect(result.success).toBe(true);
      expect(result.message).toBe('تم إلغاء طلب الدفع بنجاح');
    });

    it('يجب منع إلغاء دفع مكتمل', () => {
      confirmPayment(paymentId, 'TRX123');
      const result = cancelPayment(paymentId, 'تغيير الرأي');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('لا يمكن إلغاء طلب دفع مكتمل');
    });

    it('يجب إرجاع خطأ عند إلغاء دفع غير موجود', () => {
      const result = cancelPayment('INVALID_ID', 'تغيير الرأي');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('طلب الدفع غير موجود');
    });
  });

  describe('بيانات البنك والعملات', () => {
    it('يجب أن تكون بيانات البنك صحيحة', () => {
      expect(COMPANY_BANK_ACCOUNT.bankName).toBe('البنك العربي');
      expect(COMPANY_BANK_ACCOUNT.accountNumber).toBeDefined();
      expect(COMPANY_BANK_ACCOUNT.iban).toBeDefined();
      expect(COMPANY_BANK_ACCOUNT.swiftCode).toBeDefined();
    });

    it('يجب أن تكون معدلات العملات صحيحة', () => {
      expect(CURRENCIES.SAR.rate).toBe(1);
      expect(CURRENCIES.USD.rate).toBe(0.27);
      expect(CURRENCIES.AED.rate).toBe(0.99);
    });

    it('يجب أن تكون رموز العملات صحيحة', () => {
      expect(CURRENCIES.SAR.symbol).toBe('ر.س');
      expect(CURRENCIES.USD.symbol).toBe('$');
      expect(CURRENCIES.AED.symbol).toBe('د.إ');
    });
  });
});
