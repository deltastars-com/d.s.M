import React, { useState, useEffect } from 'react';
import { useToast, useI18n } from './lib/contexts';
import { useAuth } from '../contexts/AuthContext';
import { TruckIcon, UserIcon, LockIcon, FingerprintIcon, ShieldCheckIcon } from './lib/contexts/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { SaudiFlag } from './SaudiFlag';

interface DriverLoginPageProps {
  onLoginSuccess: () => void;
  onBack?: () => void;
}

type LoginStep = 'phone' | 'otp' | 'password' | 'set_password';

/**
 * بوابة دخول المناديب والسواقين.
 *
 * تستخدم نفس نظام المصادقة الحقيقي المستخدم في بوابة كبار العملاء ولوحة
 * الإدارة (OTP عبر الجوال + كلمة مرور مُشفّرة + بصمة/WebAuthn اختيارية) —
 * وليست بوابة منفصلة أو وهمية. بعد نجاح الدخول، يتم التحقق فعلياً من أن
 * الحساب مسجّل بصلاحية "مندوب/سائق" قبل السماح بالدخول للوحة المندوب،
 * لمنع أي حساب عميل أو VIP من الوصول لبيانات التوصيل الداخلية بالخطأ.
 */
export function DriverLoginPage({ onLoginSuccess, onBack }: DriverLoginPageProps) {
  const { language } = useI18n();
  const { addToast } = useToast();
  const {
    loginWithOtp,
    verifyOtpAndLogin,
    setPassword,
    loginWithPassword,
    loginWithBiometrics,
    logout,
    isRole,
    user,
  } = useAuth();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPasswordInput] = useState('');
  const [step, setStep] = useState<LoginStep>('phone');
  const [isLoading, setIsLoading] = useState(false);
  const [hasBiometrics, setHasBiometrics] = useState(false);

  useEffect(() => {
    if (window.PublicKeyCredential) {
      setHasBiometrics(true);
    } else if (localStorage.getItem('last_driver_user')) {
      setHasBiometrics(true);
    }
  }, []);

  /**
   * تحقّق إلزامي من صلاحية "مندوب/سائق" بعد أي نجاح دخول (OTP أو كلمة مرور
   * أو بصمة). إذا كان الحساب المسجَّل ليس له هذه الصلاحية، يتم تسجيل الخروج
   * فوراً ومنع الدخول للوحة المندوب — بدل الافتراض الضمني بأن كل من يسجّل
   * دخول ناجح هو مندوب فعلاً.
   */
  const finalizeLoginIfDriver = () => {
    if (isRole(['driver', 'delivery_agent'])) {
      localStorage.setItem('last_driver_user', phone);
      onLoginSuccess();
    } else {
      logout();
      addToast(
        language === 'ar'
          ? 'هذا الحساب غير مسجَّل كمندوب توصيل. تواصل مع الإدارة لتفعيل صلاحية المندوب.'
          : 'This account is not registered as a delivery driver. Contact management to enable driver access.',
        'error'
      );
      setStep('phone');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsLoading(true);
    try {
      await loginWithOtp(phone);
      setStep('otp');
      addToast(language === 'ar' ? 'تم إرسال رمز التحقق إلى هاتفك' : 'Verification code sent to your phone', 'success');
    } catch (error: any) {
      addToast(language === 'ar' ? 'فشل إرسال الرمز' : 'Failed to send code', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setIsLoading(true);
    try {
      const { isNewUser } = await verifyOtpAndLogin(phone, otp);
      if (isNewUser) {
        setStep('set_password');
        addToast(language === 'ar' ? 'رمز التحقق صحيح. يرجى تعيين كلمة مرور جديدة لحسابك' : 'Code verified. Please set a new password', 'success');
      } else {
        finalizeLoginIfDriver();
      }
    } catch (error: any) {
      addToast(language === 'ar' ? 'رمز التحقق غير صحيح' : 'Invalid verification code', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      addToast(language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters', 'error');
      return;
    }
    setIsLoading(true);
    try {
      await setPassword(password);
      addToast(language === 'ar' ? 'تم تعيين كلمة المرور بنجاح' : 'Password set successfully', 'success');
      finalizeLoginIfDriver();
    } catch (error: any) {
      addToast(language === 'ar' ? 'فشل تعيين كلمة المرور' : 'Failed to set password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginWithPassword(phone, password);
      finalizeLoginIfDriver();
    } catch (error: any) {
      addToast(language === 'ar' ? 'كلمة المرور غير صحيحة' : 'Invalid password', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithBiometrics();
      finalizeLoginIfDriver();
    } catch (error: any) {
      addToast(language === 'ar' ? 'فشل الدخول عبر البصمة' : 'Biometric login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-900 flex items-center justify-center p-6 md:p-10 font-tajawal animate-fade-in relative overflow-hidden"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-600/15 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-orange-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-xl">
        <div className="bg-slate-800/80 backdrop-blur-2xl p-10 md:p-14 rounded-[3rem] shadow-sovereign border-2 border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-emerald-500 rounded-full" />

          <header className="text-center mb-10">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sovereign border border-emerald-500/30">
              <TruckIcon className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tighter">
              {language === 'ar' ? 'بوابة المناديب والسواقين' : 'Drivers & Delegates Portal'}
            </h1>
            <p className="text-emerald-400 font-bold text-base italic">
              {language === 'ar' ? 'الدخول حصري لمناديب وسواقين شركة نجوم دلتا المعتمدين' : 'Exclusive access for verified Delta Stars delivery drivers'}
            </p>
          </header>

          <AnimatePresence mode="wait">
            {step === 'phone' ? (
              <motion.form
                key="phone"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSendOtp}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-gray-400 font-bold text-xs uppercase tracking-widest px-2">
                    {language === 'ar' ? 'رقم جوال المندوب المسجَّل' : 'Registered Driver Phone'}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XXXXXXXX"
                      className="w-full bg-slate-700/50 border-2 border-white/10 rounded-3xl p-5 pl-16 pr-28 text-xl font-black text-white outline-none focus:border-emerald-500 transition-all text-center tracking-widest"
                      required
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-white/10">
                      <SaudiFlag className="w-6 h-4 rounded shadow-sm" />
                      <span className="text-emerald-400 font-black text-sm">+966</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black text-xl shadow-sovereign hover:bg-emerald-500 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isLoading ? '...' : (language === 'ar' ? 'إرسال رمز الدخول 🔑' : 'Send Access Code 🔑')}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('password')}
                  className="w-full text-slate-400 hover:text-white text-sm font-bold transition-all"
                >
                  {language === 'ar' ? 'الدخول بكلمة المرور بدلاً من ذلك' : 'Login with password instead'}
                </button>

                {hasBiometrics && (
                  <button
                    type="button"
                    onClick={handleBiometricLogin}
                    disabled={isLoading}
                    className="w-full bg-white/5 text-white py-5 rounded-3xl font-black text-lg border-2 border-white/5 hover:border-emerald-500 transition-all flex items-center justify-center gap-3"
                  >
                    <FingerprintIcon className="w-7 h-7 text-emerald-400" />
                    {language === 'ar' ? 'الدخول بالبصمة' : 'Biometric Access'}
                  </button>
                )}

                {onBack && (
                  <button type="button" onClick={onBack} className="w-full text-slate-500 hover:text-slate-300 text-xs font-bold pt-2">
                    {language === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
                  </button>
                )}
              </motion.form>
            ) : step === 'otp' ? (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOtp}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <p className="text-gray-400 font-bold">{language === 'ar' ? 'أدخل الرمز المرسل إلى' : 'Enter code sent to'}</p>
                  <p className="text-emerald-400 font-black text-2xl mt-2 tracking-widest">{phone}</p>
                  <button type="button" onClick={() => setStep('phone')} className="text-blue-400 text-xs font-bold mt-3 hover:underline">
                    {language === 'ar' ? 'تعديل الرقم؟' : 'Edit number?'}
                  </button>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="------"
                    className="w-full bg-slate-700/50 border-2 border-white/10 rounded-3xl p-5 pl-16 text-3xl font-black text-white text-center tracking-[0.4em] focus:border-emerald-500 transition-all outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black text-xl shadow-sovereign hover:bg-emerald-500 transition-all disabled:opacity-50"
                >
                  {isLoading ? '...' : (language === 'ar' ? 'تأكيد الرمز 🛡️' : 'Confirm 🛡️')}
                </button>
              </motion.form>
            ) : step === 'set_password' ? (
              <motion.form
                key="set_password"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSetPassword}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-gray-400 font-bold text-xs uppercase tracking-widest px-2">
                    {language === 'ar' ? 'عيّن كلمة مرور لحسابك (٦ أحرف على الأقل)' : 'Set a password (min. 6 characters)'}
                  </label>
                  <div className="relative">
                    <LockIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-700/50 border-2 border-white/10 rounded-3xl p-5 pl-16 text-xl font-black text-white outline-none focus:border-emerald-500 transition-all"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black text-xl shadow-sovereign hover:bg-emerald-500 transition-all disabled:opacity-50"
                >
                  {isLoading ? '...' : (language === 'ar' ? 'حفظ والدخول' : 'Save & Continue')}
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="password"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handlePasswordLogin}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-gray-400 font-bold text-xs uppercase tracking-widest px-2">
                    {language === 'ar' ? 'رقم الجوال' : 'Phone number'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-slate-700/50 border-2 border-white/10 rounded-3xl p-5 text-lg font-black text-white text-center outline-none focus:border-emerald-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-gray-400 font-bold text-xs uppercase tracking-widest px-2">
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <LockIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-700/50 border-2 border-white/10 rounded-3xl p-5 pl-16 text-xl font-black text-white outline-none focus:border-emerald-500 transition-all"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black text-xl shadow-sovereign hover:bg-emerald-500 transition-all disabled:opacity-50"
                >
                  {isLoading ? '...' : (language === 'ar' ? 'دخول' : 'Login')}
                </button>
                <button type="button" onClick={() => setStep('phone')} className="w-full text-slate-400 hover:text-white text-sm font-bold">
                  {language === 'ar' ? 'الدخول برمز OTP بدلاً من ذلك' : 'Login with OTP instead'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-bold">
            <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
            {language === 'ar'
              ? 'وصول محمي بالتحقق الثنائي — الحسابات الجديدة يتم تفعيلها فقط من إدارة الفروع'
              : 'Two-factor protected — new accounts are activated only by branch management'}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default DriverLoginPage;
