export type Page = 'home' | 'products' | 'cart' | 'checkout' | 'login' | 'register' | 'forgot_password' | 'admin_login' | 'admin_dashboard' | 'dev_console' | 'vip_login' | 'vip_dashboard' | 'driver_login' | 'driver_dashboard' | 'drivers_portal' | 'warehouse' | 'showroom' | 'productDetail' | 'wishlist' | 'track_order' | 'live_tracking' | 'order_history' | 'orders' | 'contact' | 'terms' | 'privacy' | 'returns' | 'shipping' | 'profile' | 'about' | 'notifications';

export interface Product {
  id: number;
  sku?: string;
  name_ar: string;
  name_en: string;
  category: CategoryKey;
  category_ar?: string;
  category_en?: string;
  price: number;
  costPrice?: number;
  price_500g?: number;
  price_1kg?: number;
  price_currency?: string;
  image?: string;
  image_url?: string;
  unit_ar?: string;
  unit_en?: string;
  unit_type?: string;
  weight_grams?: number;
  description_ar?: string;
  description_en?: string;
  features_ar?: string;
  features_en?: string;
  nutritional_value_ar?: string;
  nutritional_value_en?: string;
  origin_ar?: string;
  origin_en?: string;
  benefits_ar?: string;
  benefits_en?: string;
  stock_quantity?: number;
  stock_available?: number;
  min_threshold?: number;
  gallery?: string[];
  extra_settings?: Record<string, any>;
  is_featured?: boolean;
}

export interface User {
  id: string;
  uid?: string;
  type: UserRole;
  role?: UserRole;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  name?: string;
  full_name?: string;
  displayName?: string;
  photo_url?: string;
  photoURL?: string;
  creditLimit?: number;
  currentBalance?: number;
  cashbackBalance?: number;
  clientStatus?: 'active' | 'inactive' | 'pending';
  assignedBranchId?: string;
  branches?: string[];
  permissions?: string[];
  fcm_token?: string;
  force_password_change?: boolean;
  is_verified?: boolean;
  credit_limit?: number;
  debt_balance?: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  expiryDate: string;
  isActive: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type UserRole = 'admin' | 'ops' | 'developer' | 'gm' | 'vip' | 'client' | 'marketing' | 'delegate' | 'accountant' | 'sales' | 'driver' | 'branch_agent' | 'quality_officer' | 'customer';

export type CategoryKey = 'fruits' | 'vegetables' | 'herbs' | 'qassim' | 'dates' | 'packages' | 'seasonal' | 'nuts' | 'flowers' | 'custom' | 'eggs' | 'imported';

export interface CategoryConfig {
  key: CategoryKey;
  id?: string;
  label_ar: string;
  label_en: string;
  icon?: string;
  order?: number;
  isVisible?: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  customerPhone?: string;
  address?: string;
  status: 'pending' | 'preparing' | 'setup' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
  updatedAt?: string;
  paymentMethod: string;
  branchId?: string;
  trackingNumber?: string;
  driverId?: string;
  driverName?: string;
}

export interface Branch {
  id: string;
  name_ar: string;
  name_en: string;
  city: string;
  address_ar: string;
  address_en: string;
  phone: string;
  location?: { lat: number; lng: number };
}

export interface Review {
  id: string;
  productId: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface HomeSectionType {
  type: 'hero' | 'categories' | 'partners' | 'customers' | 'trust' | 'channels' | 'featured_products' | 'map' | 'featured' | 'banner' | 'ads' | 'stats';
}

export interface HomeSection {
  id: string;
  type: HomeSectionType['type'];
  title_ar: string;
  title_en: string;
  isVisible: boolean;
  order: number;
  items?: any[];
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
