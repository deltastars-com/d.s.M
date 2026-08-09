/**═══════════════════════════════════════════════════════════
 * Delta Stars — إنشاء حساب دخول حقيقي لمندوب/سائق جديد
 *
 * هذه الدالة تحل فجوة معمارية حقيقية كانت موجودة: شاشة "إضافة مندوب" في
 * لوحة التحكم (OperationsView.tsx) كانت تنشئ فقط بطاقة بيانات للتتبع
 * (اسم/جوال/مركبة) بدون أي حساب مصادقة فعلي، فلا يقدر المندوب يسجّل دخول
 * فعلياً ببوابة الدخول (DriverLoginPage.tsx).
 *
 * مفتاح الخدمة (Service Role Key) يبقى على الخادم فقط ولا يصل أبداً لكود
 * المتصفح — لأنه يملك صلاحيات كاملة على قاعدة البيانات (تجاوز كل RLS)،
 * وأي تسريب له يعني اختراق كامل للنظام. لهذا هذه الدالة خادمية إلزامياً
 * ولا يمكن تنفيذ هذي العملية مباشرة من كود العميل (React) بأي شكل آمن.
 *
 * ⚠️ ملاحظة نشر: هذه الدالة (مثل بقية دوال netlify/functions) تعمل فقط
 * على منصات تدعم Serverless Functions (Netlify أو Vercel). لن تعمل إذا
 * كان المتجر مستضافاً على استضافة ثابتة بحتة (مثل Tencent Cloud COS
 * static hosting) بدون طبقة دوال خلفية موازية.
 *══════════════════════════════════════════════════════════*/

import { createClient } from '@supabase/supabase-js';

const cors = (o) => ({
  'Access-Control-Allow-Origin': o || '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
});

function normalizeKsaPhone(raw) {
  let p = String(raw || '').replace(/[^\d+]/g, '').replace(/^\+/, '');
  if (p.startsWith('00')) p = p.slice(2);
  if (p.startsWith('05')) p = '966' + p.slice(1);
  else if (p.startsWith('5') && p.length === 9) p = '966' + p;
  else if (p.startsWith('9665')) { /* صحيح */ }
  else return null;
  return /^9665\d{8}$/.test(p) ? p : null;
}

function generateTempPassword() {
  // كلمة مرور مؤقتة عشوائية قوية بما يكفي، يُطلب من المندوب تغييرها فور أول دخول
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < 10; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export const handler = async (event) => {
  const origin = event.headers?.origin;
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors(origin), body: '' };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors(origin), body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SERVICE_KEY) {
    return {
      statusCode: 500,
      headers: cors(origin),
      body: JSON.stringify({ error: 'الخدمة غير مُهيأة (SUPABASE_SERVICE_ROLE_KEY مفقود من إعدادات الخادم)' })
    };
  }

  // ── التحقق من أن طالب العملية أدمن فعلي، لا أي زائر ──
  // يُتوقع أن يمرر الطلب توكن جلسة المدير الذي سجّل دخوله فعلاً في
  // AdminDashboard، ويتم التحقق منه هنا قبل إنشاء أي حساب.
  const authHeader = event.headers?.authorization || event.headers?.Authorization;
  const callerToken = authHeader?.replace(/^Bearer\s+/i, '');
  if (!callerToken) {
    return { statusCode: 401, headers: cors(origin), body: JSON.stringify({ error: 'مطلوب تسجيل دخول كمدير لإنشاء حساب مندوب' }) };
  }

  const adminClient = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

  try {
    const { data: callerData, error: callerErr } = await adminClient.auth.getUser(callerToken);
    const callerRole = callerData?.user?.user_metadata?.role;
    if (callerErr || !callerData?.user || !['admin', 'developer', 'manager'].includes(callerRole)) {
      return { statusCode: 403, headers: cors(origin), body: JSON.stringify({ error: 'صلاحياتك لا تسمح بإنشاء حسابات مناديب' }) };
    }
  } catch (e) {
    return { statusCode: 401, headers: cors(origin), body: JSON.stringify({ error: 'جلسة الدخول غير صالحة' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch { body = {}; }

  const phone = normalizeKsaPhone(body.phone);
  const name = String(body.name || '').trim();
  if (!phone) {
    return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: 'رقم جوال المندوب غير صحيح. استخدم صيغة 05XXXXXXXX' }) };
  }
  if (!name) {
    return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: 'اسم المندوب مطلوب' }) };
  }

  const tempPassword = generateTempPassword();

  try {
    const { data, error } = await adminClient.auth.admin.createUser({
      phone: '+' + phone,
      password: tempPassword,
      phone_confirm: true,
      user_metadata: {
        role: 'driver',
        name,
        vehicle_type: body.vehicle_type || 'car',
        branch_id: body.branch_id || null,
        must_change_password: true,
        created_by_admin: true,
        created_at: new Date().toISOString()
      }
    });

    if (error) {
      console.error('Create driver account failed:', error);
      return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: error.message || 'تعذر إنشاء حساب المندوب' }) };
    }

    return {
      statusCode: 200,
      headers: cors(origin),
      body: JSON.stringify({
        success: true,
        driverId: data.user.id,
        phone: '+' + phone,
        tempPassword,
        note: 'سلّم كلمة المرور المؤقتة هذي للمندوب بطريقة آمنة (وجهاً لوجه أو SMS مباشر) — لن تظهر مرة أخرى، وسيُطلب منه تغييرها عند أول دخول.'
      })
    };
  } catch (e) {
    console.error('Create driver account exception:', e);
    return { statusCode: 502, headers: cors(origin), body: JSON.stringify({ error: 'فشل الاتصال بخدمة الحسابات' }) };
  }
};
