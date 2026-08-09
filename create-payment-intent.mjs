/**═══════════════════════════════════════════════════════════
 * Delta Stars | نجوم دلتا — إنشاء عملية دفع (بوابة ميسر)
 * المالك: علي الدحان (Ali Aldahan)
 *
 * المفتاح السري MOYASAR_SECRET_KEY يبقى على الخادوم فقط.
 * تدفق المال: بطاقة العميل ← ميسر ← حساب الشركة لدى البنك العربي الوطني.
 *══════════════════════════════════════════════════════════*/

const MOYASAR_API = 'https://api.moyasar.com/v1/payments';
const ALLOWED = ['creditcard', 'applepay', 'stcpay', 'token'];

const cors = (origin) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
});

export const handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin;
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors(origin), body: '' };
  if (event.httpMethod !== 'POST')
    return { statusCode: 405, headers: cors(origin), body: JSON.stringify({ error: 'Method not allowed' }) };

  const SECRET = process.env.MOYASAR_SECRET_KEY;
  if (!SECRET) {
    return { statusCode: 500, headers: cors(origin),
      body: JSON.stringify({ error: 'بوابة الدفع غير مُهيأة. أضف MOYASAR_SECRET_KEY في متغيرات البيئة.' }) };
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); }
  catch { return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: 'صيغة الطلب غير صحيحة' }) }; }

  const { amount, currency = 'SAR', source, description, metadata = {}, callback_url } = body;

  /*── التحقق الصارم من المدخلات (يمنع التلاعب بالمبالغ) ──*/
  const amt = Number(amount);
  if (!Number.isInteger(amt) || amt < 100) {
    return { statusCode: 400, headers: cors(origin),
      body: JSON.stringify({ error: 'المبلغ غير صالح — يجب أن يكون بالهللة وبحد أدنى 1 ريال' }) };
  }
  if (amt > 50000000) { // 500,000 ريال سقف حماية
    return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: 'المبلغ يتجاوز الحد المسموح' }) };
  }
  if (currency !== 'SAR') {
    return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: 'العملة المدعومة هي الريال السعودي فقط' }) };
  }
  const srcType = source?.type || (typeof source === 'string' ? source : 'creditcard');
  if (!ALLOWED.includes(String(srcType).toLowerCase())) {
    return { statusCode: 400, headers: cors(origin), body: JSON.stringify({ error: 'وسيلة دفع غير مدعومة' }) };
  }

  try {
    const res = await fetch(MOYASAR_API, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(SECRET + ':').toString('base64'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: amt,
        currency,
        description: (description || 'طلب متجر نجوم دلتا').slice(0, 255),
        callback_url,
        source: typeof source === 'object' ? source : { type: srcType },
        metadata: {
          store: 'DeltaStars',
          owner: 'Ali Aldahan',
          bank: 'Arab National Bank (anb)',
          ...metadata
        }
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Moyasar rejected:', data);
      return { statusCode: res.status, headers: cors(origin),
        body: JSON.stringify({ error: data?.message || 'رفضت بوابة الدفع العملية', details: data?.errors }) };
    }

    /*── لا نُعيد أي بيانات حساسة للواجهة ──*/
    return {
      statusCode: 200, headers: cors(origin),
      body: JSON.stringify({
        id: data.id,
        status: data.status,
        amount: data.amount,
        currency: data.currency,
        transaction_url: data.source?.transaction_url || data.transaction_url || null,
        created_at: data.created_at
      })
    };
  } catch (e) {
    console.error('Payment error:', e);
    return { statusCode: 502, headers: cors(origin),
      body: JSON.stringify({ error: 'تعذر الاتصال ببوابة الدفع. حاول مجدداً.' }) };
  }
};
