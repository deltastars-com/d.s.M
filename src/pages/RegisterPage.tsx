import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page, params?: any) => void;
}

export default function RegisterPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { login } = useAuth();
  const { addToast } = useToast();
  const ar = language === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = () => {
    if (!name.trim()) { addToast(ar ? 'أدخل اسمك الكامل' : 'Enter your full name', 'error'); return; }
    if (!phone || phone.length < 10) { addToast(ar ? 'أدخل رقم جوال صحيح' : 'Enter valid phone', 'error'); return; }
    if (password.length < 6) { addToast(ar ? 'كلمة المرور 6 أحرف على الأقل' : 'Password must be 6+ characters', 'error'); return; }
    if (password !== confirmPassword) { addToast(ar ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match', 'error'); return; }

    setLoading(true);
    setTimeout(() => {
      login({
        id: `user-${Date.now()}`,
        type: 'customer',
        name,
        phone,
        email,
        is_verified: true,
      });
      setLoading(false);
      addToast(ar ? 'تم إنشاء الحساب بنجاح!' : 'Account created successfully!', 'success');
      onNavigate('home');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🌟</span>
          <h1 className="text-2xl font-black text-emerald-900">{ar ? 'إنشاء حساب جديد' : 'Create Account'}</h1>
          <p className="text-slate-500 text-sm mt-1">{ar ? 'انضم لمتجر نجوم دلتا' : 'Join Delta Stars store'}</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'الاسم الكامل' : 'Full Name'}</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder={ar ? 'محمد أحمد' : 'Mohammed Ahmed'}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'رقم الجوال' : 'Phone Number'}</label>
            <div className="flex gap-2">
              <span className="px-3 py-3 bg-slate-100 rounded-xl text-sm font-bold text-slate-600">+966</span>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="5XXXXXXXX" className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)'}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'كلمة المرور' : 'Password'}</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-sm">
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'تأكيد كلمة المرور' : 'Confirm Password'}</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
              placeholder="••••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>

          <button onClick={handleRegister} disabled={loading}
            className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition">
            {loading ? (ar ? 'جاري الإنشاء...' : 'Creating...') : (ar ? 'إنشاء الحساب 🚀' : 'Create Account 🚀')}
          </button>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          {ar ? 'لديك حساب بالفعل؟' : 'Already have an account?'}{' '}
          <button onClick={() => onNavigate('login')} className="text-emerald-600 font-bold hover:underline">
            {ar ? 'تسجيل الدخول' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
