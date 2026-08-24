import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page, params?: any) => void;
}

export default function ForgotPasswordPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { addToast } = useToast();
  const ar = language === 'ar';

  const [step, setStep] = useState<'phone' | 'otp' | 'reset'>('phone');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const sendResetCode = () => {
    if (!phone || phone.length < 10) {
      addToast(ar ? 'أدخل رقم جوال صحيح' : 'Enter valid phone', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      addToast(ar ? 'تم إرسال رمز التحقق' : 'Reset code sent', 'success');
    }, 1500);
  };

  const verifyCode = () => {
    if (otpCode.length !== 4) {
      addToast(ar ? 'أدخل الرمز المكون من 4 أرقام' : 'Enter 4-digit code', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otpCode === '0000' || otpCode.length === 4) {
        setStep('reset');
      } else {
        addToast(ar ? 'الرمز غير صحيح' : 'Invalid code', 'error');
      }
    }, 1000);
  };

  const resetPassword = () => {
    if (newPassword.length < 6) {
      addToast(ar ? 'كلمة المرور 6 أحرف على الأقل' : 'Min 6 characters', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast(ar ? 'تم إعادة تعيين كلمة المرور بنجاح!' : 'Password reset successful!', 'success');
      onNavigate('login');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🔑</span>
          <h1 className="text-2xl font-black text-emerald-900">{ar ? 'استعادة كلمة المرور' : 'Reset Password'}</h1>
          <p className="text-slate-500 text-sm mt-1">{ar ? 'أدخل رقم جوالك لإعادة التعيين' : 'Enter your phone to reset'}</p>
        </div>

        {step === 'phone' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'رقم الجوال' : 'Phone Number'}</label>
              <div className="flex gap-2">
                <span className="px-3 py-3 bg-slate-100 rounded-xl text-sm font-bold text-slate-600">+966</span>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="5XXXXXXXX" className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
            </div>
            <button onClick={sendResetCode} disabled={loading || phone.length < 10}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition">
              {loading ? (ar ? 'جاري الإرسال...' : 'Sending...') : (ar ? 'إرسال رمز التحقق' : 'Send Reset Code')}
            </button>
          </div>
        )}

        {step === 'otp' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <p className="text-sm text-slate-500 text-center">
              {ar ? `تم إرسال الرمز إلى +966${phone}` : `Code sent to +966${phone}`}
            </p>
            <div className="flex justify-center gap-3">
              {[0,1,2,3].map(i => (
                <input key={i} type="tel" maxLength={1} value={otpCode[i] || ''}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '');
                    const newCode = otpCode.split('');
                    newCode[i] = val;
                    setOtpCode(newCode.join(''));
                  }}
                  className="w-14 h-14 text-center text-2xl font-black border-2 border-slate-200 rounded-xl focus:border-emerald-500 outline-none transition" />
              ))}
            </div>
            <button onClick={verifyCode} disabled={loading || otpCode.length !== 4}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition">
              {loading ? (ar ? 'جاري التحقق...' : 'Verifying...') : (ar ? 'تأكيد الرمز' : 'Verify Code')}
            </button>
            <button onClick={() => { setStep('phone'); setOtpCode(''); }}
              className="w-full py-2 text-slate-500 hover:text-emerald-600 text-sm font-semibold transition">
              ← {ar ? 'الرجوع' : 'Back'}
            </button>
          </div>
        )}

        {step === 'reset' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'كلمة المرور الجديدة' : 'New Password'}</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                placeholder="••••••" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <button onClick={resetPassword} disabled={loading}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition">
              {loading ? (ar ? 'جاري الحفظ...' : 'Saving...') : (ar ? 'حفظ كلمة المرور الجديدة' : 'Save New Password')}
            </button>
          </div>
        )}

        <p className="text-center text-sm text-slate-500 mt-6">
          <button onClick={() => onNavigate('login')} className="text-emerald-600 font-bold hover:underline">
            ← {ar ? 'العودة لتسجيل الدخول' : 'Back to Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
