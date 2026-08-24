import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { SYSTEM_CONFIG } from '@/constants';
import { calculateOrderSummary, applyCoupon } from '@/services/paymentService';
import { generateOrderId } from '@/utils/helpers';
import { validatePhone, generateOTP } from '@/services/authService';
import { createOrderLifecycle, advanceOrder } from '@/services/automationService';
import { logAudit } from '@/services/securityService';
import type { Page } from '@/types';

interface CheckoutPageProps {
  onNavigate: (page: Page, params?: any) => void;
}

type CheckoutStep = 'phone' | 'otp' | 'address' | 'payment' | 'success';

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { items, subtotal, clearCart } = useCart();
  const { addToast } = useToast();
  const ar = language === 'ar';

  const [step, setStep] = useState<CheckoutStep>('phone');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  // Address
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [locationType, setLocationType] = useState<'house' | 'mall' | 'market'>('house');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'cod'>('bank_transfer');
  const [orderId] = useState(() => generateOrderId());
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);

  const vat = subtotal * SYSTEM_CONFIG.VAT_RATE;
  const deliveryFee = subtotal >= SYSTEM_CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : SYSTEM_CONFIG.DELIVERY_FEE;
  const discount = couponDiscount;
  const total = subtotal + vat + deliveryFee - discount;

  // OTP timer
  useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const sendOtp = useCallback(() => {
    if (!phone || phone.length < 10) {
      addToast(ar ? 'أدخل رقم جوال صحيح' : 'Enter a valid phone number', 'error');
      return;
    }
    setLoading(true);
    // Generate OTP (in production, this would call Authentica API)
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(code);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setOtpTimer(120);
      addToast(`${ar ? 'تم إرسال الرمز' : 'OTP sent'}: ${code}`, 'success');
    }, 1500);
  }, [phone, ar, addToast]);

  const verifyOtp = useCallback(() => {
    if (otpCode.length !== 4) {
      addToast(ar ? 'أدخل الرمز المكون من 4 أرقام' : 'Enter 4-digit code', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (otpCode === generatedOtp || otpCode === '0000') { // 0000 = dev bypass
        addToast(ar ? 'تم التحقق بنجاح' : 'Verified successfully', 'success');
        setStep('address');
      } else {
        addToast(ar ? 'الرمز غير صحيح' : 'Invalid code', 'error');
      }
    }, 1000);
  }, [otpCode, generatedOtp, ar, addToast]);

  const confirmAddress = useCallback(() => {
    if (!city || !street) {
      addToast(ar ? 'أدخل المدينة والشارع' : 'Enter city and street', 'error');
      return;
    }
    setStep('payment');
  }, [city, street, ar, addToast]);

  const completeOrder = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const lifecycle = createOrderLifecycle(orderId, 'jeddah');
      const advanced = advanceOrder(lifecycle, 'customer', 'تم استلام الطلب');
      logAudit('order_placed', `Order ${orderId} - Total: ${total.toFixed(2)} SAR - Payment: ${paymentMethod}`);
      setLoading(false);
      clearCart();
      setStep('success');
      addToast(ar ? 'تم تأكيد طلبك بنجاح!' : 'Order confirmed!', 'success');
    }, 2000);
  }, [clearCart, ar, addToast, orderId, total, paymentMethod]);

  if (items.length === 0 && step !== 'success') {
    onNavigate('cart');
    return null;
  }

  const steps = [
    { key: 'phone', label: ar ? 'الجوال' : 'Phone', num: 1 },
    { key: 'otp', label: ar ? 'التحقق' : 'Verify', num: 2 },
    { key: 'address', label: ar ? 'العنوان' : 'Address', num: 3 },
    { key: 'payment', label: ar ? 'الدفع' : 'Payment', num: 4 },
  ];

  const currentStepIdx = steps.findIndex(s => s.key === step);

  return (
    <div className="container py-8 px-4 max-w-2xl mx-auto">
      {/* Progress Bar */}
      {step !== 'success' && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                i <= currentStepIdx ? 'bg-emerald-900 text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                {i < currentStepIdx ? '✓' : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${
                i <= currentStepIdx ? 'text-emerald-900' : 'text-slate-400'
              }`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`w-6 h-0.5 ${i < currentStepIdx ? 'bg-emerald-900' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Step: Phone */}
      {step === 'phone' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-black text-emerald-900 mb-2">
            {ar ? '📱 التحقق من رقم الجوال' : '📱 Phone Verification'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {ar ? 'أدخل رقم جوالك Saudi (+966) لتلقي رمز التحقق' : 'Enter your Saudi phone number to receive verification code'}
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-3 bg-slate-100 rounded-xl text-sm font-bold text-slate-600">+966</span>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="5XXXXXXXX"
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              maxLength={10}
            />
          </div>
          <button
            onClick={sendOtp}
            disabled={loading || phone.length < 10}
            className="w-full mt-4 py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition"
          >
            {loading ? (ar ? 'جاري الإرسال...' : 'Sending...') : (ar ? 'إرسال رمز التحقق' : 'Send Verification Code')}
          </button>
        </div>
      )}

      {/* Step: OTP */}
      {step === 'otp' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-black text-emerald-900 mb-2">
            {ar ? '🔐 تأكيد الهوية الرقمية' : '🔐 Identity Verification'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {ar ? `تم إرسال رمز مكون من 4 أرقام إلى +966${phone}` : `4-digit code sent to +966${phone}`}
          </p>
          <div className="flex justify-center gap-3 mb-4">
            {[0,1,2,3].map(i => (
              <input
                key={i}
                type="tel"
                maxLength={1}
                value={otpCode[i] || ''}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '');
                  const newCode = otpCode.split('');
                  newCode[i] = val;
                  setOtpCode(newCode.join(''));
                  if (val && e.target.nextElementSibling) {
                    (e.target.nextElementSibling as HTMLInputElement).focus?.();
                  }
                }}
                className="w-14 h-14 text-center text-2xl font-black border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition"
              />
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mb-4">
            {ar ? `إعادة الإرسال بعد ${otpTimer} ثانية` : `Resend in ${otpTimer}s`}
          </p>
          <button
            onClick={verifyOtp}
            disabled={loading || otpCode.length !== 4}
            className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold rounded-xl transition"
          >
            {loading ? (ar ? 'جاري التحقق...' : 'Verifying...') : (ar ? 'تأكيد والتحقق' : 'Verify & Confirm')}
          </button>
          <button
            onClick={() => { setStep('phone'); setOtpCode(''); }}
            className="w-full mt-3 py-2 text-slate-500 hover:text-emerald-600 text-sm font-semibold transition"
          >
            {ar ? 'تغيير رقم الجوال' : 'Change Phone Number'}
          </button>
        </div>
      )}

      {/* Step: Address */}
      {step === 'address' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h2 className="text-xl font-black text-emerald-900 mb-2">
            {ar ? '📍 بيانات العنوان والتسليم' : '📍 Delivery Address'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {ar ? 'أدخل بيانات موقع التوصيل بدقة' : 'Enter delivery location details accurately'}
          </p>

          <div className="space-y-4">
            {/* Location Type */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">{ar ? 'نوع المكان' : 'Location Type'}</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { val: 'house', icon: '🏠', label: ar ? 'منزل' : 'House' },
                  { val: 'mall', icon: '🏬', label: ar ? 'مول' : 'Mall' },
                  { val: 'market', icon: '🏪', label: ar ? 'محل' : 'Shop' },
                ] as const).map(opt => (
                  <button
                    key={opt.val}
                    onClick={() => setLocationType(opt.val)}
                    className={`p-3 rounded-xl text-center text-sm font-semibold transition border ${
                      locationType === opt.val
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xl block">{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'المدينة / المنطقة' : 'City / Region'}</label>
              <select value={city} onChange={e => setCity(e.target.value)} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none">
                <option value="">{ar ? 'اختر المدينة' : 'Select City'}</option>
                {['جدة', 'الرياض', 'الدمام', 'أبها', 'خميس مشيط', 'القصيم', 'مكة المكرمة', 'المدينة المنورة', 'نجران'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'الحي' : 'District'}</label>
              <input type="text" value={district} onChange={e => setDistrict(e.target.value)} placeholder={ar ? 'اسم الحي' : 'District name'} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>

            {/* Street */}
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'الشارع' : 'Street'}</label>
              <input type="text" value={street} onChange={e => setStreet(e.target.value)} placeholder={ar ? 'اسم الشارع الرئيسي' : 'Main street name'} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'المبنى' : 'Building'}</label>
                <input type="text" value={buildingName} onChange={e => setBuildingName(e.target.value)} placeholder={ar ? 'اسم المبنى' : 'Building'} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">{ar ? 'الشقة / المكتب' : 'Unit'}</label>
                <input type="text" value={unitNumber} onChange={e => setUnitNumber(e.target.value)} placeholder={ar ? 'رقم الشقة' : 'Unit No'} className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
            </div>
          </div>

          <button onClick={confirmAddress} className="w-full mt-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition">
            {ar ? 'تأكيد العنوان والانتقال للدفع 🚚' : 'Confirm & Proceed to Payment 🚚'}
          </button>
        </div>
      )}

      {/* Step: Payment */}
      {step === 'payment' && (
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-bold text-emerald-900 mb-4">{ar ? 'ملخص الطلب' : 'Order Summary'}</h3>
            <div className="space-y-2 text-sm">
              {items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-slate-600">{ar ? item.name_ar : item.name_en} × {item.quantity}</span>
                  <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} ر.س</span>
                </div>
              ))}
              <div className="border-t border-slate-100 pt-2 mt-2">
                <div className="flex justify-between"><span className="text-slate-500">{ar ? 'المجموع الفرعي' : 'Subtotal'}</span><span>{subtotal.toFixed(2)} ر.س</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{ar ? 'ضريبة القيمة المضافة 15%' : 'VAT 15%'}</span><span>{vat.toFixed(2)} ر.س</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{ar ? 'رسوم التوصيل' : 'Delivery'}</span><span>{deliveryFee === 0 ? (ar ? 'مجاني' : 'Free') : `${deliveryFee} ر.س`}</span></div>
              </div>

              {/* Coupon */}
              <div className="border-t border-slate-100 pt-3">
                <div className="flex gap-2">
                  <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())}
                    placeholder={ar ? 'كود الخصم' : 'Coupon Code'}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" />
                  <button onClick={() => {
                    if (couponCode === 'WELCOME20') {
                      setCouponDiscount(Math.min(20, subtotal * 0.2));
                      addToast(ar ? 'تم تطبيق كود WELCOME20 — خصم 20 ريال' : 'WELCOME20 applied — 20 SAR off', 'success');
                    } else if (couponCode === 'DELTA15') {
                      setCouponDiscount(subtotal * 0.15);
                      addToast(ar ? 'تم تطبيق كود DELTA15 — خصم 15%' : 'DELTA15 applied — 15% off', 'success');
                    } else {
                      addToast(ar ? 'كود غير صحيح' : 'Invalid coupon code', 'error');
                    }
                  }} className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg transition">
                    {ar ? 'تطبيق' : 'Apply'}
                  </button>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between mt-2 text-green-600">
                    <span className="text-xs font-semibold">🏷️ {ar ? 'الخصم' : 'Discount'}</span>
                    <span className="text-xs font-bold">-{discount.toFixed(2)} ر.س</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-lg text-emerald-900">
                <span>{ar ? 'الإجمالي' : 'Total'}</span>
                <span>{total.toFixed(2)} ر.س</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <h3 className="font-bold text-emerald-900 mb-4">{ar ? 'طريقة الدفع' : 'Payment Method'}</h3>
            <div className="space-y-3">
              {[
                { key: 'bank_transfer' as const, icon: '🏦', label: ar ? 'تحويل بنكي (البنك العربي الوطني)' : 'Bank Transfer (ANB)', desc: ar ? 'تحويل مباشر للحساب البنكي' : 'Direct bank transfer' },
                { key: 'card' as const, icon: '💳', label: ar ? 'بطاقة ائتمانية (مدى / فيزا / ماستركارد)' : 'Credit Card (Mada/Visa/MC)', desc: ar ? 'سداد آمن عبر بوابة ميسر' : 'Secure payment via Moyasar' },
                { key: 'cod' as const, icon: '💵', label: ar ? 'الدفع عند الاستلام' : 'Cash on Delivery', desc: ar ? 'ادفع نقداً عند وصول الطلب' : 'Pay cash upon delivery' },
              ].map(method => (
                <button
                  key={method.key}
                  onClick={() => setPaymentMethod(method.key)}
                  className={`w-full p-4 rounded-xl text-right flex items-center gap-3 transition border ${
                    paymentMethod === method.key
                      ? 'bg-emerald-50 border-emerald-500'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-emerald-900">{method.label}</p>
                    <p className="text-xs text-slate-500">{method.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === method.key ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                  }`}>
                    {paymentMethod === method.key && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bank Transfer Details */}
          {paymentMethod === 'bank_transfer' && (
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
              <h4 className="font-bold text-amber-900 mb-3">{ar ? '🏦 بيانات الحساب البنكي' : '🏦 Bank Account Details'}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-amber-700">{ar ? 'البنك' : 'Bank'}:</span><span className="font-bold">{SYSTEM_CONFIG.BANK.NAME}</span></div>
                <div className="flex justify-between"><span className="text-amber-700">{ar ? 'اسم الحساب' : 'Account'}:</span><span className="font-bold">{SYSTEM_CONFIG.BANK.ACCOUNT_NAME}</span></div>
                <div className="flex justify-between"><span className="text-amber-700">IBAN:</span><span className="font-bold font-mono" dir="ltr">{SYSTEM_CONFIG.BANK.IBAN}</span></div>
              </div>
              <p className="text-xs text-amber-700 mt-3">
                {ar ? '⚠️ يرجى تحويل المبلغ وإرسال صورة الإيصال عبر الواتساب لتأكيد الطلب' : '⚠️ Transfer the amount and send receipt via WhatsApp to confirm'}
              </p>
            </div>
          )}

          {/* Security Note */}
          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <p className="text-xs text-emerald-700 font-semibold">
              ✅ {ar ? 'نظام حماية المشتري مفعّل — طلب موثق رقمياً' : 'Buyer Protection Active — Digitally Verified Order'}
            </p>
          </div>

          <button
            onClick={completeOrder}
            disabled={loading}
            className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-black text-lg rounded-xl transition shadow-lg"
          >
            {loading ? (ar ? 'جاري معالجة الطلب...' : 'Processing...') : (ar ? `إتمام الطلب — ${total.toFixed(2)} ر.س` : `Complete Order — ${total.toFixed(2)} SAR`)}
          </button>

          <button onClick={() => setStep('address')} className="w-full py-2 text-slate-500 hover:text-emerald-600 text-sm font-semibold transition">
            ← {ar ? 'الرجوع للعنوان' : 'Back to Address'}
          </button>
        </div>
      )}

      {/* Step: Success */}
      {step === 'success' && (
        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-black text-emerald-900 mb-2">
            {ar ? '🎉 تم استلام طلبك بنجاح!' : '🎉 Order Confirmed!'}
          </h2>
          <p className="text-slate-500 mb-2">
            {ar ? 'فريقنا يقوم بتجهيز طلبك بأعلى معايير الجودة' : 'Our team is preparing your order with highest quality standards'}
          </p>
          <div className="bg-slate-50 rounded-xl p-4 my-6 inline-block">
            <p className="text-xs text-slate-500">{ar ? 'رقم الطلب المرجعي' : 'Order Reference'}</p>
            <p className="text-xl font-black text-emerald-900 font-mono">{orderId}</p>
          </div>

          <div className="space-y-3 mt-6">
            <a
              href={`https://wa.me/966${SYSTEM_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(ar ? `مرحباً نجوم دلتا، أريد تأكيد طلبي رقم ${orderId} بقيمة ${total.toFixed(2)} ريال` : `Hello Delta Stars, I want to confirm my order #${orderId} total ${total.toFixed(2)} SAR`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-[#25D366] hover:bg-[#20b757] text-white font-bold rounded-xl transition"
            >
              💬 {ar ? 'تأكيد عبر واتساب' : 'Confirm via WhatsApp'}
            </a>
            <button
              onClick={() => onNavigate('track_order')}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition"
            >
              📦 {ar ? 'تتبع الطلب' : 'Track Order'}
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
            >
              🏠 {ar ? 'العودة للمتجر' : 'Back to Store'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
