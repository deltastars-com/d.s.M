import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/contexts/ToastContext';
import type { Page } from '@/types';

const OFFICIAL_EMAIL = 'deltastars777@gmail.com';

interface Props {
  onNavigate: (page: Page, params?: any) => void;
}

export default function ForgotPasswordPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { addToast } = useToast();
  const ar = language === 'ar';

  const [step, setStep] = useState<'email' | 'sent' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const sendResetEmail = () => {
    if (!email || !email.includes('@')) {
      addToast(ar ? 'أدخل بريد إلكتروني صحيح' : 'Enter valid email', 'error');
      return;
    }
    setLoading(true);
    
    // Create mailto link for password reset
    const subject = encodeURIComponent(ar ? 'طلب إعادة تعيين كلمة المرور - نجوم دلتا' : 'Password Reset Request - Delta Stars');
    const body = encodeURIComponent(
      (ar ? `
مرحباً،

أطلب إعادة تعيين كلمة المرور للحساب التالي:

البريد الإلكتروني: ${email}

القسم: (حدد: العميل / الإدارة / السائق / الشركات)

الرجاء إرسال رابط إعادة تعيين كلمة المرور.

مع خالص التحية،
المهندس علي درهم الدحان
نجوم دلتا | Delta Stars
      `.trim() : `
Hello,

I request a password reset for the following account:

Email: ${email}

Department: (Choose: Customer / Admin / Driver / Corporate)

Please send the password reset link.

Best regards,
Ali Aldahan
Delta Stars
      `.trim())
    );
    
    setTimeout(() => {
      setLoading(false);
      setStep('sent');
      addToast(ar ? 'تم فتح البريد الإلكتروني' : 'Email client opened', 'success');
      
      // Open email client
      window.open(`mailto:${OFFICIAL_EMAIL}?subject=${subject}&body=${body}`, '_blank');
    }, 1000);
  };

  const resetPassword = () => {
    if (newPassword.length < 6) {
      addToast(ar ? 'كلمة المرور 6 أحرف على الأقل' : 'Min 6 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast(ar ? 'كلمتا المرور غير متطابقتين' : 'Passwords do not match', 'error');
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
          <p className="text-slate-500 text-sm mt-1">{ar ? 'أدخل بريدك الإلكتروني لإعادة التعيين' : 'Enter your email to reset'}</p>
        </div>

        {step === 'email' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'البريد الإلكتروني' : 'Email Address'}</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">📧</span>
                <div className="text-sm">
                  <p className="font-bold text-blue-800">{ar ? 'البريد الرسمي للدعم' : 'Official Support Email'}</p>
                  <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-blue-600 hover:underline font-mono text-xs">{OFFICIAL_EMAIL}</a>
                  <p className="text-blue-600 text-xs mt-1">{ar ? 'سيتم إرسال طلبك لهذا البريد' : 'Your request will be sent to this email'}</p>
                </div>
              </div>
            </div>
            
            <button onClick={sendResetEmail} disabled={loading || !email.includes('@')}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition">
              {loading ? (ar ? 'جاري الإرسال...' : 'Sending...') : (ar ? 'إرسال طلب إعادة التعيين' : 'Send Reset Request')}
            </button>
            
            <div className="text-center text-xs text-slate-500">
              <p>{ar ? 'أو تواصل معنا مباشرة على' : 'Or contact us directly at'}</p>
              <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-emerald-600 font-bold hover:underline">{OFFICIAL_EMAIL}</a>
            </div>
          </div>
        )}

        {step === 'sent' && (
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
            <div className="text-center">
              <span className="text-5xl block mb-3">✅</span>
              <h2 className="text-lg font-bold text-emerald-800">{ar ? 'تم الإرسال!' : 'Sent!'}</h2>
              <p className="text-sm text-slate-500 mt-2">
                {ar ? `تم إرسال طلب إعادة التعيين إلى:` : 'Reset request sent to:'}
              </p>
              <p className="font-bold text-emerald-700 mt-1">{OFFICIAL_EMAIL}</p>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="text-xl">📋</span>
                <div className="text-sm">
                  <p className="font-bold text-amber-800">{ar ? 'الخطوات التالية' : 'Next Steps'}</p>
                  <ol className="text-amber-700 text-xs mt-2 space-y-1 list-decimal list-inside">
                    <li>{ar ? 'تحقق من صندوق البريد الوارد' : 'Check your inbox'}</li>
                    <li>{ar ? 'ستتلقى رابط إعادة التعيين خلال دقائق' : 'You will receive a reset link shortly'}</li>
                    <li>{ar ? 'اتبع الخطوات في البريد الإلكتروني' : 'Follow the steps in the email'}</li>
                    <li>{ar ? 'إذا لم تجد البريد، تحقق من مجلد Spam' : 'If not found, check Spam folder'}</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <button onClick={() => { setStep('email'); setEmail(''); }}
              className="w-full py-2 text-slate-500 hover:text-emerald-600 text-sm font-semibold transition">
              ← {ar ? 'الرجوع' : 'Back'}
            </button>
          </div>
        )}

        <p className="text-center text-sm text-slate-500 mt-6">
          <button onClick={() => onNavigate('login')} className="text-emerald-600 font-bold hover:underline">
            ← {ar ? 'العودة لتسجيل الدخول' : 'Back to Sign In'}
          </button>
        </p>
        
        <div className="text-center mt-4">
          <p className="text-xs text-slate-400">
            {ar ? '© 2026 نجوم دلتا | المطور: المهندس علي درهم الدحان' : '© 2026 Delta Stars | Developer: Ali Aldahan'}
          </p>
        </div>
      </div>
    </div>
  );
}
