/**═══════════════════════════════════════════════════════════
 * Delta Stars — التحقق من رمز SMS عبر Authentica + إصدار جلسة حقيقية
 * حماية ضد التخمين: 5 محاولات كحد أقصى لكل رقم.
 *
 * ⚠️ تعديل أمني جوهري: كان التحقق السابق يُعيد فقط "success: true" ويترك
 * الواجهة الأمامية تبني حساب مستخدم وهمي محلياً بالكامل (بما في ذلك
 * الصلاحية role) دون أي توقيع رقمي حقيقي. هذا كان يسمح لأي شخص يعدّل
 * localStorage من متصفحه بانتحال أي صلاحية بدون أي اختراق حقيقي.
 *
 * الآن: بعد نجاح التحقق من الرمز فعلياً عبر Authentica، تُصدر هذه الدالة
 * "Firebase Custom Token" موقّعاً رقمياً من الخادم (بمفتاح حساب الخدمة
 * السري الذي لا يُشارك أبداً مع العميل)، تتضمن الصلاحية الحقيقية المخزَّنة
 * في قاعدة البيانات لهذا المستخدم. العميل يستخدم هذا التوكن حصراً عبر
 * signInWithCustomToken، وبعدها Firebase نفسه (لا localStorage) هو من
 * يتحقق من الجلسة في كل طلب. هذا يغلق ثغرة انتحال الصلاحيات بالكامل.
 *══════════════════════════════════════════════════════════*/

import admin from 'firebase-admin';

const AUTHENTICA_VERIFY = 'https://api.authentica.sa/api/v1/verify-otp';
const attempts = new Map();
const MAX_ATTEMPTS = 5;
const LOCK_MS = 10 * 60_000;

const cors = (o) => ({
  'Access-Control-Allow-Origin': o || '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
});

function normalizeKsaPhone(raw) {
  let p = String(raw || '').replace(/[^\d+]/g, '').replace(/^\+/, '');
  if (p.startsWith('00')) p = p.slice(2);
  if (p.startsWith('05')) p = '966' + p.slice(1);
  else if (p.startsWith('5') && p.length === 9) p = '966' + p;
  return /^9665\d{8}$/.test(p) ? p : null;
}

/** تهيئة Firebase Admin مرة واحدة فقط (يُعاد استخدامها بين الاستدعاءات). */
function getFirebaseAdmin() {
  if (admin.apps.length) return admin;
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) return null;
  try {
    const serviceAccount = JSON.parse(raw);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    return admin;
  } catch (e) {
    console.error('Failed to init firebase-admin:', e);
    return null;
  }
}

export const handler = async (event) => {
  const origin = event.headers?.origin;
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors(origin), body: '' };
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, headers: cors(origin), body: JSON.stringify({ error: 'Method not allowed' }) };

  const KEY = process.env.AUTHENTICA_API_KEY;
  if (!KEY) return { statusCode: 500, headers: cors(origin), body: JSON.stringify({ error: 'خدمة الرسائل غير مُهيأة' }) };

  const fbAdmin = getFirebaseAdmin();
  if (!fbAdmin) {
    return { statusCode: 500, headers: cors(origin),
      body: JSON.stringify({ error: 'خدمة الجلسات غير مُهيأة (FIREBASE_SERVICE_ACCOUNT_KEY مفقود من إعدادات الخادم)' }) };
  }

  let body; try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }
  const phone = normalizeKsaPhone(body.phone);
  const otp = String(body.otp || '').replace(/\D/g, '');

  if (!phone) return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: 'رقم الجوال غير صحيح' }) };
  if (otp.length < 4) return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: 'رمز التحقق غير مكتمل' }) };

  /*── حماية ضد التخمين ──*/
  const rec = attempts.get(phone) || { n: 0, at: Date.now() };
  if (Date.now() - rec.at > LOCK_MS) { rec.n = 0; rec.at = Date.now(); }
  if (rec.n >= MAX_ATTEMPTS) {
    return { statusCode: 429, headers: cors(origin),
      body: JSON.stringify({ error: 'تجاوزت عدد المحاولات. حاول بعد 10 دقائق.' }) };
  }

  try {
    const res = await fetch(AUTHENTICA_VERIFY, {
      method: 'POST',
      headers: { 'X-Authorization': KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ phone: '+' + phone, otp })
    });
    const data = await res.json().catch(() => ({}));
    const ok = res.ok && (data?.success === true || data?.status === true || data?.verified === true);

    if (!ok) {
      rec.n += 1; attempts.set(phone, rec);
      return { statusCode: 401, headers: cors(origin),
        body: JSON.stringify({ success: false, error: 'رمز التحقق غير صحيح', remaining: MAX_ATTEMPTS - rec.n }) };
    }

    attempts.delete(phone);

    // ── إصدار جلسة Firebase حقيقية وموقّعة رقمياً ──
    const uid = 'phone_' + phone; // معرّف ثابت وحتمي لكل رقم جوال
    let isNewUser = false;
    let role = 'customer';
    let fullName = '';

    const db = fbAdmin.firestore();
    const userDocRef = db.collection('users').doc(uid);
    const userSnap = await userDocRef.get();

    if (userSnap.exists) {
      const d = userSnap.data();
      role = d.role || 'customer';
      fullName = d.name || d.full_name || '';
    } else {
      isNewUser = true;
      await userDocRef.set({
        phone: '+' + phone,
        role: 'customer',
        createdAt: new Date().toISOString(),
        phone_verified: true
      });
    }

    // Firebase Auth: أنشئ المستخدم إن لم يكن موجوداً (لازم لإصدار Custom Token)
    try {
      await fbAdmin.auth().getUser(uid);
    } catch {
      await fbAdmin.auth().createUser({ uid, phoneNumber: '+' + phone });
    }

    // الصلاحية (role) تُضمَّن كـ custom claim داخل التوكن الموقّع رقمياً —
    // لا يمكن لأي طرف عميل تعديلها، بعكس القيمة السابقة في localStorage.
    const customToken = await fbAdmin.auth().createCustomToken(uid, { role, phone: '+' + phone });

    return { statusCode: 200, headers: cors(origin),
      body: JSON.stringify({
        success: true,
        customToken,
        phone: '+' + phone,
        role,
        fullName,
        isNewUser
      })
    };
  } catch (e) {
    console.error('OTP verify failed:', e);
    return { statusCode: 502, headers: cors(origin), body: JSON.stringify({ error: 'تعذر التحقق من الرمز' }) };
  }
};
