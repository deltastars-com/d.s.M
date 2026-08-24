import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { BRANCHES, SYSTEM_CONFIG } from '@/constants';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page, params?: any) => void;
}

export default function ProfilePage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { user, updateUser, logout } = useAuth();
  const { addToast } = useToast();
  const ar = language === 'ar';
  const [activeTab, setActiveTab] = useState('profile');
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');

  if (!user) {
    onNavigate('login');
    return null;
  }

  const handleSave = () => {
    updateUser({ name: editName, phone: editPhone, email: editEmail });
    addToast(ar ? 'تم تحديث الملف الشخصي' : 'Profile updated', 'success');
  };

  const menuItems = [
    { key: 'profile', icon: '👤', label: ar ? 'الملف الشخصي' : 'Profile' },
    { key: 'orders', icon: '📦', label: ar ? 'طلباتي' : 'My Orders' },
    { key: 'wishlist', icon: '❤️', label: ar ? 'المفضلة' : 'Wishlist' },
    { key: 'addresses', icon: '📍', label: ar ? 'عناويني' : 'My Addresses' },
    { key: 'settings', icon: '⚙️', label: ar ? 'الإعدادات' : 'Settings' },
  ];

  return (
    <div className="container py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 h-fit">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl text-white font-black">{(user.name || 'U')[0]}</span>
            </div>
            <h3 className="font-bold text-emerald-900">{user.name || (ar ? 'مستخدم' : 'User')}</h3>
            <p className="text-xs text-slate-500">{user.phone || user.email || ''}</p>
          </div>
          <nav className="space-y-1">
            {menuItems.map(item => (
              <button key={item.key} onClick={() => setActiveTab(item.key)}
                className={`w-full text-right flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${activeTab === item.key ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}>
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <hr className="my-2 border-slate-100" />
            <button onClick={() => { logout(); onNavigate('home'); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition">
              <span>🚪</span>{ar ? 'تسجيل الخروج' : 'Logout'}
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-black text-emerald-900 mb-6">{ar ? 'الملف الشخصي' : 'Profile'}</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'الاسم' : 'Name'}</label>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'الجوال' : 'Phone'}</label>
                  <input type="tel" value={editPhone} onChange={e => setEditPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                </div>
                <button onClick={handleSave}
                  className="px-8 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition">
                  {ar ? 'حفظ التغييرات' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-black text-emerald-900 mb-6">{ar ? '📦 طلباتي' : '📦 My Orders'}</h2>
              <div className="text-center py-12">
                <span className="text-5xl block mb-4">📋</span>
                <p className="text-slate-500 font-semibold">{ar ? 'لم تقم بأي طلبات بعد' : 'No orders yet'}</p>
                <button onClick={() => onNavigate('products')}
                  className="mt-4 px-6 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition">
                  {ar ? 'ابدأ التسوق' : 'Start Shopping'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-black text-emerald-900 mb-6">{ar ? '❤️ المفضلة' : '❤️ Wishlist'}</h2>
              <div className="text-center py-12">
                <span className="text-5xl block mb-4">💝</span>
                <p className="text-slate-500 font-semibold">{ar ? 'قائمة المفضلة فارغة' : 'Wishlist is empty'}</p>
                <button onClick={() => onNavigate('products')}
                  className="mt-4 px-6 py-2 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition">
                  {ar ? 'استكشف المنتجات' : 'Browse Products'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-black text-emerald-900 mb-6">{ar ? '📍 عناويني' : '📍 My Addresses'}</h2>
              <div className="text-center py-12">
                <span className="text-5xl block mb-4">🏠</span>
                <p className="text-slate-500 font-semibold">{ar ? 'لم تضف عناوين بعد' : 'No addresses saved'}</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xl font-black text-emerald-900 mb-6">{ar ? '⚙️ الإعدادات' : '⚙️ Settings'}</h2>
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-700">{ar ? 'الإشعارات' : 'Notifications'}</span>
                  <div className="w-12 h-6 bg-emerald-600 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow transition" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-700">{ar ? 'الوضع الليلي' : 'Dark Mode'}</span>
                  <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer">
                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow transition" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-700">{ar ? 'اللغة' : 'Language'}</span>
                  <span className="text-sm text-slate-500">{ar ? 'العربية' : 'English'}</span>
                </div>
                <button onClick={() => { logout(); onNavigate('home'); }}
                  className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition mt-4">
                  🚪 {ar ? 'تسجيل الخروج من الحساب' : 'Sign Out'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
