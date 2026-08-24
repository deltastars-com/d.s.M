import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import type { Page } from '@/types';

interface Props { onNavigate: (page: Page) => void; }

export default function VIPLoginPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { login } = useAuth();
  const ar = language === 'ar';
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!companyName || !phone || !password) { setError(ar ? 'أدخل جميع البيانات' : 'Fill all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ id: `vip-${Date.now()}`, type: 'vip', role: 'vip', name: companyName, phone });
      onNavigate('vip_dashboard');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-emerald-900 font-black text-2xl mx-auto mb-4 shadow-lg">🤝</div>
          <h1 className="text-2xl font-black text-emerald-900">{ar ? 'بوابة الشركات وكبار العملاء' : 'VIP Enterprise Portal'}</h1>
          <p className="text-slate-500 text-sm mt-1">{ar ? 'نظام حسابات معزول ومتكامل' : 'Isolated enterprise billing system'}</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 font-semibold">⚠️ {error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{ar ? 'اسم الشركة' : 'Company Name'}</label>
            <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} placeholder={ar ? 'اسم مؤسستكم' : 'Your company name'} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{ar ? 'رقم الجوال' : 'Phone'}</label>
            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="05XXXXXXXX" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{ar ? 'كلمة المرور' : 'Password'}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-300 text-emerald-900 font-bold rounded-xl transition">
            {loading ? (ar ? 'جاري الدخول...' : 'Logging in...') : (ar ? 'دخول بوابة الشركات' : 'Enter Enterprise Portal')}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={() => onNavigate('home')} className="text-sm text-slate-400 hover:text-slate-600 transition">← {ar ? 'العودة للمتجر' : 'Back to Store'}</button>
        </div>
      </div>
    </div>
  );
}
