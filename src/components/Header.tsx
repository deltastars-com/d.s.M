import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { companyData } from '@/data/company';
import type { Page } from '@/types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: string;
}

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navLinks = [
    { page: 'home' as Page, label: t('header.navLinks.home'), icon: '🏠' },
    { page: 'products' as Page, label: t('header.navLinks.products'), icon: '🛍️' },
    { page: 'showroom' as Page, label: t('header.navLinks.showroom'), icon: '🌟' },
    { page: 'track_order' as Page, label: t('header.navLinks.trackOrder'), icon: '📦' },
    { page: 'contact' as Page, label: t('header.navLinks.contact'), icon: '📞' },
  ];

  return (
    <header className={`bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Top Contact Bar */}
      <div className="bg-emerald-900 text-white text-xs py-1.5 hidden md:block">
        <div className="container flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          <a href={`tel:${companyData.contact.phone}`} className="hover:text-amber-400 transition flex items-center gap-1">
            📞 {companyData.contact.phone}
          </a>
          <a href={companyData.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition flex items-center gap-1">
            💬 WhatsApp
          </a>
          <a href={`mailto:${companyData.contact.email}`} className="hover:text-amber-400 transition flex items-center gap-1">
            ✉️ {companyData.contact.email}
          </a>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <button onClick={() => onNavigate('home')} className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-10 h-10 bg-emerald-900 rounded-xl flex items-center justify-center text-amber-400 font-black text-lg shadow-md">
            DS
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-emerald-900 leading-tight">
              {language === 'ar' ? 'نجوم دلتا' : 'Delta Stars'}
            </h1>
            <p className="text-[10px] text-slate-500 leading-tight">
              {language === 'ar' ? 'للتجارة' : 'Trading'}
            </p>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`text-sm font-semibold transition px-3 py-2 rounded-lg hover:bg-slate-50 ${
                currentPage === link.page ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 rounded-lg bg-emerald-900 text-white text-xs font-bold hover:bg-emerald-800 transition"
          >
            {language === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Notifications */}
          {isAuthenticated && (
            <button
              onClick={() => onNavigate('notifications')}
              className="relative p-2 rounded-lg hover:bg-slate-100 transition"
              title={language === 'ar' ? 'الإشعارات' : 'Notifications'}
            >
              <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">2</span>
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-emerald-900 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black">
                {itemCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 rounded-lg hover:bg-slate-100 transition"
            >
              {isAuthenticated ? (
                <div className="w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {(user?.name || 'U')[0]}
                </div>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} w-56 bg-white rounded-xl border border-slate-200 shadow-xl z-50 py-2`}>
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-bold text-sm text-emerald-900">{user?.name}</p>
                        <p className="text-xs text-slate-500">{user?.phone || user?.email}</p>
                      </div>
                      <button onClick={() => { onNavigate('profile'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>👤</span>{language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                      </button>
                      <button onClick={() => { onNavigate('orders'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>📦</span>{language === 'ar' ? 'طلباتي' : 'My Orders'}
                      </button>
                      <button onClick={() => { onNavigate('wishlist'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>❤️</span>{language === 'ar' ? 'المفضلة' : 'Wishlist'}
                      </button>
                      <button onClick={() => { onNavigate('notifications'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>🔔</span>{language === 'ar' ? 'الإشعارات' : 'Notifications'}
                      </button>
                      <hr className="my-2 border-slate-100" />
                      <button onClick={() => { logout(); setShowUserMenu(false); onNavigate('home'); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition flex items-center gap-3">
                        <span>🚪</span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { onNavigate('login'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>🔐</span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                      </button>
                      <button onClick={() => { onNavigate('register'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>📝</span>{language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
                      </button>
                      <hr className="my-2 border-slate-100" />
                      <button onClick={() => { onNavigate('admin_login'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>🏢</span>{language === 'ar' ? 'لوحة الإدارة' : 'Admin'}
                      </button>
                      <button onClick={() => { onNavigate('driver_login'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>🚗</span>{language === 'ar' ? 'بوابة السائقين' : 'Driver Portal'}
                      </button>
                      <button onClick={() => { onNavigate('vip_login'); setShowUserMenu(false); }}
                        className="w-full text-right px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-3">
                        <span>🤝</span>{language === 'ar' ? 'بوابة الشركات' : 'B2B Portal'}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t border-slate-200 bg-white max-h-[80vh] overflow-y-auto">
          <nav className="container py-4 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => { onNavigate(link.page); setShowMobileMenu(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                  currentPage === link.page ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.icon}</span>{link.label}
              </button>
            ))}
            <hr className="my-2 border-slate-100" />
            {isAuthenticated ? (
              <>
                <button onClick={() => { onNavigate('profile'); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <span>👤</span>{language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                </button>
                <button onClick={() => { onNavigate('order_history'); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <span>📋</span>{language === 'ar' ? 'سجل الطلبات' : 'Order History'}
                </button>
                <button onClick={() => { onNavigate('wishlist'); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <span>❤️</span>{language === 'ar' ? 'المفضلة' : 'Wishlist'}
                </button>
                <button onClick={() => { onNavigate('notifications'); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <span>🔔</span>{language === 'ar' ? 'الإشعارات' : 'Notifications'}
                </button>
                <button onClick={() => { logout(); setShowMobileMenu(false); onNavigate('home'); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-50">
                  <span>🚪</span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { onNavigate('login'); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <span>🔐</span>{language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </button>
                <button onClick={() => { onNavigate('register'); setShowMobileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <span>📝</span>{language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
