import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/contexts/AuthContext';
import type { Page } from '@/types';

interface LoginPageProps {
  onNavigate: (page: Page) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { login } = useAuth();
  const ar = language === 'ar';
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!phone || !password) {
      setError(ar ? 'أدخل رقم الجوال وكلمة المرور' : 'Enter phone and password');
      return;
    }
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      login({
        id: `user-${Date.now()}`,
        type: 'customer',
        phone,
        name: ar ? 'عميل نجوم دلتا' : 'Delta Stars Customer',
      });
      setLoading(false);
      onNavigate('home');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-900 rounded-2xl flex items-center justify-center text-amber-400 font-black text-2xl mx-auto mb-4 shadow-lg">
            DS
          </div>
          <h1 className="text-2xl font-black text-emerald-900">
            {ar ? 'تسجيل الدخول' : 'Login'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {ar ? 'مرحباً بك في متجر نجوم دلتا' : 'Welcome to Delta Stars Store'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 font-semibold">
              ⚠️ {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {ar ? 'رقم الجوال' : 'Phone Number'}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="05XXXXXXXX"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {ar ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition"
          >
            {loading ? (ar ? 'جاري الدخول...' : 'Logging in...') : (ar ? 'دخول' : 'Login')}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 space-y-3 text-center">
          <button onClick={() => onNavigate('forgot_password')} className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold transition block mx-auto">
            🔑 {ar ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
          </button>
          <button onClick={() => onNavigate('admin_login')} className="text-sm text-slate-500 hover:text-emerald-600 transition block mx-auto">
            🔐 {ar ? 'بوابة الإدارة' : 'Admin Portal'}
          </button>
          <button onClick={() => onNavigate('driver_login')} className="text-sm text-slate-500 hover:text-emerald-600 transition block mx-auto">
            🚗 {ar ? 'بوابة السائقين' : 'Driver Portal'}
          </button>
        </div>
        <p className="text-center text-sm text-slate-500 mt-6">
          {ar ? 'ليس لديك حساب؟' : "Don't have an account?"}{' '}
          <button onClick={() => onNavigate('register')} className="text-emerald-600 font-bold hover:underline">
            {ar ? 'إنشاء حساب جديد' : 'Create Account'}
          </button>
        </p>
      </div>
    </div>
  );
}
