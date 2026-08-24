import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import type { Page } from '@/types';

interface Props { onNavigate: (page: Page) => void; }

export default function DriverLoginPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { login } = useAuth();
  const ar = language === 'ar';
  const [driverCode, setDriverCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!driverCode || !password) { setError(ar ? 'أدخل الكود وكلمة المرور' : 'Enter code and password'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ id: `driver-${driverCode}`, type: 'driver', role: 'driver', name: `${ar ? 'مندوب' : 'Driver'} ${driverCode}` });
      onNavigate('driver_dashboard');
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-900 rounded-2xl flex items-center justify-center text-amber-400 font-black text-2xl mx-auto mb-4 shadow-lg">🚗</div>
          <h1 className="text-2xl font-black text-emerald-900">{ar ? 'بوابة السائقين' : 'Driver Portal'}</h1>
          <p className="text-slate-500 text-sm mt-1">{ar ? 'تسجيل الدخول بكود المندوب' : 'Login with your driver code'}</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 font-semibold">⚠️ {error}</div>}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{ar ? 'كود المندوب' : 'Driver Code'}</label>
            <input type="text" value={driverCode} onChange={e => setDriverCode(e.target.value)} placeholder="DS-001" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">{ar ? 'كلمة المرور' : 'Password'}</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition">
            {loading ? (ar ? 'جاري الدخول...' : 'Logging in...') : (ar ? 'دخول' : 'Login')}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={() => onNavigate('home')} className="text-sm text-slate-400 hover:text-slate-600 transition">← {ar ? 'العودة للمتجر' : 'Back to Store'}</button>
        </div>
      </div>
    </div>
  );
}
