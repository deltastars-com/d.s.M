import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import CheckoutPage from '@/pages/CheckoutPage';
import DriverLoginPage from '@/pages/DriverLoginPage';
import DriverDashboardPage from '@/pages/DriverDashboardPage';
import VIPLoginPage from '@/pages/VIPLoginPage';
import VIPDashboardPage from '@/pages/VIPDashboardPage';
import LegalPage from '@/pages/LegalPage';
import ProfilePage from '@/pages/ProfilePage';
import AboutPage from '@/pages/AboutPage';
import WishlistPage from '@/pages/WishlistPage';
import OrderHistoryPage from '@/pages/OrderHistoryPage';
import NotificationsPage from '@/pages/NotificationsPage';
import { allProducts } from '@/data/products';
import type { Page } from '@/types';

function NotFoundPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const { language } = useLanguage();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="text-7xl block mb-4">404</span>
      <h1 className="text-3xl font-black text-emerald-900 mb-2">
        {language === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
      </h1>
      <p className="text-slate-500 mb-6">
        {language === 'ar' ? 'الصفحة التي تبحث عنها غير موجودة' : 'The page you are looking for does not exist'}
      </p>
      <button
        onClick={() => onNavigate('home')}
        className="px-8 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition"
      >
        {language === 'ar' ? 'العودة للمتجر' : 'Back to Store'}
      </button>
    </div>
  );
}

function ContactPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  return (
    <div className="container py-12 px-4">
      <h1 className="text-3xl font-black text-emerald-900 mb-8">{ar ? 'تواصل معنا' : 'Contact Us'}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-100 p-4"><span className="text-lg">📞</span> <strong>{ar ? 'الهاتف' : 'Phone'}:</strong> 0558828009</div>
          <div className="bg-white rounded-xl border border-slate-100 p-4"><span className="text-lg">💬</span> <strong>WhatsApp:</strong> 0558828009</div>
          <div className="bg-white rounded-xl border border-slate-100 p-4"><span className="text-lg">✉️</span> <strong>Email:</strong> info@deltastars-ksa.com</div>
          <div className="bg-white rounded-xl border border-slate-100 p-4"><span className="text-lg">📍</span> <strong>{ar ? 'الموقع' : 'Location'}:</strong> {ar ? 'جدة، حي المنار' : 'Jeddah, Al Manar'}</div>
          <div className="bg-white rounded-xl border border-slate-100 p-4">
            <span className="text-lg">🕐</span> <strong>{ar ? 'ساعات العمل' : 'Hours'}:</strong><br/>
            {ar ? 'السبت - الخميس: 6:00 ص - 11:00 م' : 'Sat - Thu: 6AM - 11PM'}<br/>
            {ar ? 'الجمعة: 2:00 م - 11:00 م' : 'Friday: 2PM - 11PM'}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <h2 className="font-bold text-emerald-900 mb-4">{ar ? 'أرسل لنا رسالة' : 'Send a Message'}</h2>
          <form onSubmit={e => { e.preventDefault(); alert(ar ? 'تم الإرسال بنجاح!' : 'Message sent!'); }} className="space-y-3">
            <input type="text" placeholder={ar ? 'الاسم' : 'Name'} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            <input type="email" placeholder={ar ? 'البريد الإلكتروني' : 'Email'} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            <textarea placeholder={ar ? 'الرسالة' : 'Message'} rows={4} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 resize-none" />
            <button type="submit" className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition">
              {ar ? 'إرسال' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function TrackOrderPage() {
  const { language } = useLanguage();
  const ar = language === 'ar';
  return (
    <div className="container py-12 px-4 text-center">
      <h1 className="text-3xl font-black text-emerald-900 mb-4">{ar ? 'تتبع طلبك' : 'Track Your Order'}</h1>
      <p className="text-slate-500 mb-8">{ar ? 'أدخل رقم الطلب لمعرفة حالتها' : 'Enter your order ID to check status'}</p>
      <div className="max-w-md mx-auto">
        <div className="flex gap-2">
          <input type="text" placeholder={ar ? 'رقم الطلب' : 'Order ID'} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
          <button className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition">
            {ar ? 'بحث' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ShowroomPage({ onNavigate }: { onNavigate: (page: Page, params?: any) => void }) {
  const { language } = useLanguage();
  return (
    <div className="container py-8 px-4">
      <h1 className="text-2xl font-black text-emerald-900 mb-2">{language === 'ar' ? '🌟 صالة العرض' : '🌟 Showroom'}</h1>
      <p className="text-slate-500 text-sm mb-6">{language === 'ar' ? 'اكتشف أفضل منتجاتنا المميزة' : 'Discover our finest featured products'}</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allProducts.filter(p => p.is_featured).slice(0, 12).map(product => (
          <div
            key={product.id}
            onClick={() => onNavigate('productDetail', product.id)}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            <div className="aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-5xl">
              {product.category === 'fruits' ? '🍎' : product.category === 'vegetables' ? '🥬' : product.category === 'dates' ? '🌴' : '📦'}
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm text-emerald-900 line-clamp-1">{language === 'ar' ? product.name_ar : product.name_en}</h3>
              <p className="font-black text-emerald-700 mt-1">{product.price} ر.س</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [currentPage, setCurrentPage] = useState<Page>(() => {
    try {
      return (localStorage.getItem('ds_current_page') as Page) || 'home';
    } catch { return 'home'; }
  });
  const [pageParams, setPageParams] = useState<any>(null);

  const handleNavigate = useCallback((page: Page, params?: any) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try { localStorage.setItem('ds_current_page', page); } catch {}
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'products': return <ProductsPage onNavigate={handleNavigate} initialCategory={pageParams?.category} />;
      case 'productDetail': return <ProductDetailPage productId={Number(pageParams)} onNavigate={handleNavigate} />;
      case 'cart': return <CartPage onNavigate={handleNavigate} />;
      case 'checkout': return <CheckoutPage onNavigate={handleNavigate} />;
      case 'login': return <LoginPage onNavigate={handleNavigate} />;
      case 'register': return <RegisterPage onNavigate={handleNavigate} />;
      case 'forgot_password': return <ForgotPasswordPage onNavigate={handleNavigate} />;
      case 'admin_login': return <AdminLoginPage onNavigate={handleNavigate} />;
      case 'admin_dashboard':
        if (!isAuthenticated) return <AdminLoginPage onNavigate={handleNavigate} />;
        return <AdminDashboardPage onNavigate={handleNavigate} />;
      case 'showroom': return <ShowroomPage onNavigate={handleNavigate} />;
      case 'contact': return <ContactPage />;
      case 'track_order': return <TrackOrderPage />;
      case 'privacy': return <LegalPage title={ar ? 'سياسة الخصوصية' : 'Privacy Policy'} />;
      case 'terms': return <LegalPage title={ar ? 'الشروط والأحكام' : 'Terms & Conditions'} />;
      case 'about': return <AboutPage onNavigate={handleNavigate} />;
      case 'driver_login': return <DriverLoginPage onNavigate={handleNavigate} />;
      case 'driver_dashboard': return <DriverDashboardPage onNavigate={handleNavigate} />;
      case 'vip_login': return <VIPLoginPage onNavigate={handleNavigate} />;
      case 'vip_dashboard': return <VIPDashboardPage onNavigate={handleNavigate} />;
      case 'profile': return <ProfilePage onNavigate={handleNavigate} />;
      case 'wishlist': return <WishlistPage onNavigate={handleNavigate} />;
      case 'order_history': return <OrderHistoryPage onNavigate={handleNavigate} />;
      case 'notifications': return <NotificationsPage onNavigate={handleNavigate} />;
      default: return <NotFoundPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 ${ar ? 'rtl font-sans' : 'ltr font-sans'}`} dir={ar ? 'rtl' : 'ltr'}>
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow pt-0 pb-24 md:pb-0">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
