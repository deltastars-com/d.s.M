export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    products: 'المنتجات',
    cart: 'السلة',
    account: 'حسابي',
    orders: 'طلباتي',
    admin: 'لوحة التحكم',
    logout: 'تسجيل الخروج',
    login: 'تسجيل الدخول',
    language: 'اللغة',

    // Company Info
    companyName: 'شركة نجوم دلتا للتجارة',
    companyTagline: 'شريكك الأول للفواكه والخضروات عالية الجودة',
    companyDescription: 'شريكك الأول بين الشركات للفواكه والخضروات عالية الجودة في المملكة العربية السعودية. اكتشف التميز مع دلتا ستارز، الموزع الأول للفواكه والخضروات في السوق السعودي.',

    // Contact Info
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    whatsapp: 'واتساب',
    address: 'العنوان',
    bankAccount: 'حساب بنكي',

    // Bank Details
    bankName: 'البنك العربي',
    branchName: 'فرع الرحاب',
    accountHolder: 'شركة نجوم دلتا للتجارة',
    accountNumber: '0108095516770029',
    iban: 'SA4730400108095516770029',

    // Products
    allProducts: 'جميع المنتجات',
    fruits: 'الفواكه',
    vegetables: 'الخضروات',
    dates: 'التمور',
    eggs: 'البيض',
    price: 'السعر',
    quantity: 'الكمية',
    addToCart: 'أضف إلى السلة',
    outOfStock: 'غير متوفر',
    inStock: 'متوفر',

    // Cart
    cartEmpty: 'السلة فارغة',
    cartTotal: 'الإجمالي',
    checkout: 'الدفع',
    continueShopping: 'متابعة التسوق',
    removeFromCart: 'إزالة من السلة',

    // Orders
    orderNumber: 'رقم الطلب',
    orderDate: 'تاريخ الطلب',
    orderStatus: 'حالة الطلب',
    pending: 'قيد الانتظار',
    processing: 'قيد المعالجة',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    cancelled: 'ملغى',

    // Payment
    paymentMethod: 'طريقة الدفع',
    bankTransfer: 'تحويل بنكي',
    cashOnDelivery: 'الدفع عند الاستلام',
    paymentInstructions: 'تعليمات الدفع',
    transferToAccount: 'قم بالتحويل إلى الحساب البنكي أعلاه',
    enterOrderNumber: 'أدخل رقم الطلب في خانة الوصف',
    keepReceipt: 'احتفظ بصورة إيصال التحويل',
    orderActivation: 'سيتم تفعيل الطلب خلال 24 ساعة من التحويل',

    // Common
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تم بنجاح',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
  },
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    cart: 'Cart',
    account: 'My Account',
    orders: 'My Orders',
    admin: 'Dashboard',
    logout: 'Logout',
    login: 'Login',
    language: 'Language',

    // Company Info
    companyName: 'Delta Stars Trading Company',
    companyTagline: 'Your First Partner for High-Quality Fruits and Vegetables',
    companyDescription: 'Your first partner among companies for high-quality fruits and vegetables in the Kingdom of Saudi Arabia. Discover excellence with Delta Stars, the leading distributor of fruits and vegetables in the Saudi market.',

    // Contact Info
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    address: 'Address',
    bankAccount: 'Bank Account',

    // Bank Details
    bankName: 'Arab Bank',
    branchName: 'Al-Rehab Branch',
    accountHolder: 'Delta Stars Trading Company',
    accountNumber: '0108095516770029',
    iban: 'SA4730400108095516770029',

    // Products
    allProducts: 'All Products',
    fruits: 'Fruits',
    vegetables: 'Vegetables',
    dates: 'Dates',
    eggs: 'Eggs',
    price: 'Price',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',

    // Cart
    cartEmpty: 'Your cart is empty',
    cartTotal: 'Total',
    checkout: 'Checkout',
    continueShopping: 'Continue Shopping',
    removeFromCart: 'Remove from Cart',

    // Orders
    orderNumber: 'Order Number',
    orderDate: 'Order Date',
    orderStatus: 'Order Status',
    pending: 'Pending',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',

    // Payment
    paymentMethod: 'Payment Method',
    bankTransfer: 'Bank Transfer',
    cashOnDelivery: 'Cash on Delivery',
    paymentInstructions: 'Payment Instructions',
    transferToAccount: 'Transfer to the bank account above',
    enterOrderNumber: 'Enter the order number in the description field',
    keepReceipt: 'Keep a copy of the transfer receipt',
    orderActivation: 'Your order will be activated within 24 hours of transfer',

    // Common
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
  },
};

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}
