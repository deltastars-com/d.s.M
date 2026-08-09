/**═══════════════════════════════════════════════════════════
 * Delta Stars — إرسال رمز التحقق (SMS) عبر Authentica
 * المالك: علي الدحان (Ali Aldahan)
 * المفاتيح على الخادوم فقط + تحديد معدل الإرسال لمنع الإساءة.
 *══════════════════════════════════════════════════════════*/

const AUTHENTICA_SEND = 'https://api.authentica.sa/api/v1/send-otp';
const rate = new Map();                 // ذاكرة مؤقتة لتحديد المعدل
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

const cors = (o) => ({
  'Access-Control-Allow-Origin': o || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
});

/** توحيد رقم الجوال السعودي إلى صيغة 9665XXXXXXXX */
function normalizeKsaPhone(raw) {
  let p = String(raw || '').replace(/[^\d+]/g, '').replace(/^\+/, '');
  if (p.startsWith('00')) p = p.slice(2);
  if (p.startsWith('05')) p = '966' + p.slice(1);
  else if (p.startsWith('5') && p.length === 9) p = '966' + p;
  else if (p.startsWith('9665')) { /* صحيح */ }
  else return null;
  return /^9665\d{8}$/.test(p) ? p : null;
}

export const handler = async (event) => {
  const origin = event.headers?.origin;
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors(origin), body: '' };
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, headers: cors(origin), body: JSON.stringify({ error: 'Method not allowed' }) };

  const KEY = process.env.AUTHENTICA_API_KEY;
  if (!KEY) return { statusCode: 500, headers: cors(origin),
    body: JSON.stringify({ error: 'خدمة الرسائل غير مُهيأة (AUTHENTICA_API_KEY مفقود)' }) };

  let body; try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }
  const phone = normalizeKsaPhone(body.phone);
  if (!phone) return { statusCode: 400, headers: cors(origin),
    body: JSON.stringify({ error: 'رقم الجوال غير صحيح. استخدم صيغة 05XXXXXXXX' }) };

  /*── تحديد المعدل: 3 رسائل/دقيقة لكل رقم ──*/
  const now = Date.now();
  const hits = (rate.get(phone) || []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    return { statusCode: 429, headers: cors(origin),
      body: JSON.stringify({ error: 'تم إرسال عدة رموز. انتظر دقيقة ثم أعد المحاولة.' }) };
  }
  hits.push(now); rate.set(phone, hits);

  try {
    const res = await fetch(AUTHENTICA_SEND, {
      method: 'POST',
      headers: { 'X-Authorization': KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        phone: '+' + phone,
        method: 'sms',
        otp_format: 'numeric',
        number_of_digits: 4,
        template_id: body.template_id || undefined,
        fallback_phone: body.fallback_phone || undefined
      })
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.error('Authentica error:', data);
      return { statusCode: res.status, headers: cors(origin),
        body: JSON.stringify({ error: data?.message || 'تعذر إرسال رمز التحقق' }) };
    }

    // لا نُعيد الرمز نفسه إطلاقاً
    return { statusCode: 200, headers: cors(origin),
      body: JSON.stringify({ success: true, message: 'تم إرسال رمز التحقق إلى جوالك', expires_in: 300 }) };
  } catch (e) {
    console.error('OTP send failed:', e);
    return { statusCode: 502, headers: cors(origin),
      body: JSON.stringify({ error: 'تعذر الاتصال بخدمة الرسائل' }) };
  }
};
