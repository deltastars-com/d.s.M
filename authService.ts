/**
 * Delta Stars — Auth Service
 * OTP via Netlify Functions → Authentica.sa
 * Keys live only in Netlify environment vars, never in this file.
 *
 * ⚠️ إصلاح مسارات: كانت هذي الدوال تستدعي /api/otp/send و /api/otp/verify،
 * بينما قاعدة التوجيه في netlify.toml تفترض أسماء ملفات مسطّحة (otp-send.mjs،
 * otp-verify.mjs) لا مجلد فرعي (otp/send.mjs) — فكانت كل طلبات OTP تفشل
 * فعلياً في الوصول للدالة الصحيحة. تم تصحيح المسارات لتطابق أسماء الملفات
 * الحقيقية في netlify/functions/.
 */

const API = '/api';

function normalizePhone(raw: string): string {
  const d = raw.replace(/\D/g, '');
  if (d.startsWith('966')) return '+' + d;
  if (d.startsWith('05'))  return '+966' + d.slice(1);
  if (d.startsWith('5') && d.length === 9) return '+966' + d;
  return raw;
}

export const authService = {
  async sendOTP(phone: string): Promise<{ success: boolean; message?: string }> {
    const res = await fetch(`${API}/otp-send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: normalizePhone(phone) }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'فشل إرسال رمز التحقق');
    return data;
  },

  /**
   * يتحقق من الرمز عبر الخادم (Authentica) ويستلم Firebase Custom Token
   * موقّعاً رقمياً من الخادم يتضمن الصلاحية الحقيقية للمستخدم — بدل بناء
   * كائن مستخدم وهمي محلياً كما كان سابقاً.
   */
  async verifyOTPAndSignIn(phone: string, code: string): Promise<{
    success: boolean; customToken: string; role: string; isNewUser: boolean; phone: string;
  }> {
    const res = await fetch(`${API}/otp-verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: normalizePhone(phone), otp: code }),
    });
    const data = await res.json();
    if (!data.success || !data.customToken) throw new Error(data.error || 'رمز التحقق غير صحيح');
    return data;
  },

  async sendOrderNotification(
    phone: string, orderId: string, status: string
  ): Promise<void> {
    await fetch(`${API}/otp-notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: normalizePhone(phone), orderId, status }),
    }).catch(() => {});
  },
};
