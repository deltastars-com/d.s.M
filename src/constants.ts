import type { Branch, CategoryConfig } from './types';

export const SYSTEM_CONFIG = {
  APP_NAME: 'نجوم دلتا | Delta Stars',
  APP_VERSION: '2.1.0',
  BANNER_URL: '/official_splash.jpg',
  CONTACT: {
    PHONE: '0558828009',
    WHATSAPP: '558828009',
    EMAIL: 'info@deltastars-ksa.com',
    WEBSITE: 'https://deltastars.store',
  },
  BANK: {
    NAME: 'البنك العربي الوطني (ANB)',
    ACCOUNT_NAME: 'شركة نجوم دلتا للتجارة',
    ACCOUNT_NUMBER: 'SA4730400108095516770029',
    IBAN: 'SA4730400108095516770029',
    BRANCH: 'فرع الرحاب',
  },
  SOCIAL: {
    FACEBOOK: 'https://www.facebook.com/profile.php?id=61578647072161',
    INSTAGRAM: 'https://instagram.com/deltastars_sa',
    TWITTER: 'https://twitter.com/deltastars_sa',
    TIKTOK: 'https://tiktok.com/@deltastars_sa',
    TELEGRAM: 'https://t.me/deltastars_sa',
  },
  WORKING_HOURS: {
    SAT_THU: '6:00 ص – 11:00 م',
    FRIDAY: '2:00 م – 11:00 م',
    ONLINE: '24 ساعة / 7 أيام',
  },
  MIN_ORDER: 50,
  VAT_RATE: 0.15,
  FREE_DELIVERY_THRESHOLD: 200,
  DELIVERY_FEE: 15,
  EXPRESS_DELIVERY_FEE: 35,
} as const;

export const BRANCHES: Branch[] = [
  { id: 'abha', name_ar: 'فرع أبها', name_en: 'Abha Branch', city: 'أبها', address_ar: 'أبها، المملكة العربية السعودية', address_en: 'Abha, Saudi Arabia', phone: '0558828009', location: { lat: 18.2164, lng: 42.5053 } },
  { id: 'khamis', name_ar: 'فرع خميس مشيط', name_en: 'Khamis Mushait Branch', city: 'خميس مشيط', address_ar: 'خميس مشيط، المملكة العربية السعودية', address_en: 'Khamis Mushait, Saudi Arabia', phone: '0558828009', location: { lat: 18.3061, lng: 42.7291 } },
  { id: 'riyadh', name_ar: 'فرع الرياض', name_en: 'Riyadh Branch', city: 'الرياض', address_ar: 'الرياض، المملكة العربية السعودية', address_en: 'Riyadh, Saudi Arabia', phone: '0558828009', location: { lat: 24.7136, lng: 46.6753 } },
  { id: 'jeddah', name_ar: 'فرع جدة', name_en: 'Jeddah Branch', city: 'جدة', address_ar: 'جدة، حي المنار، المملكة العربية السعودية', address_en: 'Jeddah, Al Manar District, Saudi Arabia', phone: '0558828009', location: { lat: 21.4858, lng: 39.1925 } },
  { id: 'qassim', name_ar: 'فرع القصيم', name_en: 'Qassim Branch', city: 'القصيم', address_ar: 'بريدة، القصيم، المملكة العربية السعودية', address_en: 'Buraidah, Qassim, Saudi Arabia', phone: '0558828009', location: { lat: 26.3294, lng: 43.9249 } },
  { id: 'dammam', name_ar: 'فرع الدمام', name_en: 'Dammam Branch', city: 'الدمام', address_ar: 'الدمام، المملكة العربية السعودية', address_en: 'Dammam, Saudi Arabia', phone: '0558828009', location: { lat: 26.3927, lng: 49.9777 } },
];

export const CATEGORIES: CategoryConfig[] = [
  { key: 'fruits', label_ar: 'فواكه', label_en: 'Fruits', icon: '🍎', order: 1, isVisible: true },
  { key: 'vegetables', label_ar: 'خضروات', label_en: 'Vegetables', icon: '🥬', order: 2, isVisible: true },
  { key: 'herbs', label_ar: 'ورقيات وأعشاب', label_en: 'Herbs & Greens', icon: '🌿', order: 3, isVisible: true },
  { key: 'qassim', label_ar: 'منتجات القصيم', label_en: 'Qassim Products', icon: '🏪', order: 4, isVisible: true },
  { key: 'dates', label_ar: 'تمور', label_en: 'Dates', icon: '🌴', order: 5, isVisible: true },
  { key: 'packages', label_ar: 'سلال عائلية', label_en: 'Family Packages', icon: '📦', order: 6, isVisible: true },
  { key: 'seasonal', label_ar: 'موسمي', label_en: 'Seasonal', icon: '🌸', order: 7, isVisible: true },
  { key: 'nuts', label_ar: 'مكسرات', label_en: 'Nuts', icon: '🥜', order: 8, isVisible: true },
  { key: 'imported', label_ar: 'مستورد', label_en: 'Imported', icon: '🌍', order: 9, isVisible: true },
];

export const ORDER_STATUSES = {
  pending: { label_ar: 'قيد المعالجة', label_en: 'Pending', color: 'amber' },
  preparing: { label_ar: 'جاري التجهيز', label_en: 'Preparing', color: 'blue' },
  shipped: { label_ar: 'جاري الشحن', label_en: 'Shipped', color: 'purple' },
  delivered: { label_ar: 'تم التوصيل', label_en: 'Delivered', color: 'green' },
  completed: { label_ar: 'مكتمل', label_en: 'Completed', color: 'emerald' },
  cancelled: { label_ar: 'ملغي', label_en: 'Cancelled', color: 'red' },
} as const;
