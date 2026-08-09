/**═══════════════════════════════════════════════════════════════════
 * DeltaStars | نجوم دلتا — محرّك عدي المعرفي المحلي (Oday Brain)
 * المالك: علي الدحان (Ali Aldahan)
 *
 * الهدف: القضاء نهائياً على فشل المساعد الذكي.
 * ▸ يجيب على الأسعار / الدوام / الخدمات / الفروع / الدفع / التوصيل
 *   بدقة 100% اعتماداً على بيانات المتجر الحقيقية.
 * ▸ يعمل بدون إنترنت وبدون أي مفتاح API (استجابة فورية < 5ms).
 * ▸ Gemini يصبح طبقة تحسين اختيارية، لا شرطاً للعمل.
 *═══════════════════════════════════════════════════════════════════*/

import RAW from './knowledge/index.json';

/*───────────────────────── الأنواع ─────────────────────────*/
export interface OdayProduct {
  i: number; ar: string; en: string; c: string;
  p: number; u: string; o: string; d: string; f: string; img: string;
}

export interface OdayAnswer {
  text: string;
  intent: OdayIntent;
  confidence: number;              // 0..1
  products?: OdayProduct[];
  actions?: { label: string; route: string }[];
  source: 'local' | 'ai';
}

export type OdayIntent =
  | 'price' | 'product_info' | 'category_list' | 'cheapest' | 'expensive'
  | 'hours' | 'branches' | 'delivery' | 'payment' | 'contact'
  | 'order_status' | 'return_policy' | 'corporate' | 'services'
  | 'greeting' | 'thanks' | 'count' | 'origin' | 'unknown';

const PRODUCTS = RAW as unknown as OdayProduct[];

/*═══════════════ بيانات المتجر الرسمية الحقيقية ═══════════════*/
export const STORE = {
  name_ar: 'متجر نجوم دلتا للتجارة',
  name_en: 'Delta Stars Trading Store',
  email: 'info@deltastars-ksa.com',
  marketing_email: 'marketing@deltastars-ksa.com',
  website: 'https://deltastars-ksa.com',
  facebook: 'https://www.facebook.com/profile.php?id=61578647072161',
  vat_note: 'جميع الأسعار تشمل ضريبة القيمة المضافة 15%',
  currency_ar: 'ريال سعودي',
  hours: {
    weekdays_ar: 'السبت — الخميس: 6:00 صباحاً حتى 11:00 مساءً',
    friday_ar: 'الجمعة: 2:00 عصراً حتى 11:00 مساءً',
    online_ar: 'الطلب عبر التطبيق والمتجر الإلكتروني متاح 24 ساعة طوال أيام الأسبوع',
    prep_ar: 'التجهيز يبدأ فوراً بعد تأكيد الدفع خلال ساعات العمل'
  },
  delivery: {
    same_day_ar: 'التوصيل في نفس اليوم للطلبات المؤكدة قبل 4:00 عصراً',
    next_day_ar: 'الطلبات بعد 4:00 عصراً تُوصّل في اليوم التالي',
    fee_ar: 'رسوم التوصيل تُحسب حسب المنطقة، ومجاني للطلبات فوق 300 ريال',
    cities_ar: 'تغطية جميع مناطق المملكة عبر شبكة فروعنا ومناديبنا',
    cold_chain_ar: 'نقل مبرّد (Cold Chain) لضمان الطزاجة حتى باب العميل'
  },
  payment: {
    methods_ar: ['مدى (Mada)', 'فيزا Visa', 'ماستركارد MasterCard', 'Apple Pay', 'تحويل بنكي'],
    gateway_ar: 'بوابة ميسر السعودية (Moyasar) — دفع آمن ومشفّر بمعيار PCI-DSS',
    bank_ar: 'تُودع المبالغ في حساب الشركة لدى البنك العربي الوطني (anb)',
    corporate_ar: 'بوابة الشركات وكبار العملاء: تحويل بنكي مباشر مع توثيق آلي لإشعار الدفع',
    secure_ar: 'لا نحتفظ بأي بيانات بطاقة داخل المتجر — تُعالَج مباشرة لدى البوابة'
  },
  branches: [
    { ar: 'فرع أبها', region_ar: 'منطقة عسير' },
    { ar: 'فرع خميس مشيط', region_ar: 'منطقة عسير' },
    { ar: 'فرع الرياض', region_ar: 'منطقة الرياض' },
    { ar: 'فرع جدة', region_ar: 'منطقة مكة المكرمة' },
    { ar: 'فرع القصيم', region_ar: 'منطقة القصيم' },
    { ar: 'فرع الدمام', region_ar: 'المنطقة الشرقية' }
  ],
  services_ar: [
    'بيع الخضروات والفواكه والتمور بالتجزئة والجملة',
    'بوابة الشركات وكبار العملاء (نظام مستقل ومعزول)',
    'عقود توريد سنوية للمطاعم والفنادق والمستشفيات',
    'فواتير إلكترونية معتمدة ومتوافقة مع هيئة الزكاة والضريبة',
    'أرشفة إلكترونية للمستندات والعقود',
    'تتبع GPS مباشر للطلب والسائق حتى الاستلام',
    'توثيق جودة المنتجات بالصور قبل تسليمها للسائق',
    'نظام محاسبي ومالي وإداري متكامل',
    'إشعارات فورية لكل مرحلة من مراحل الطلب',
    'المساعد الذكي عدي للرد على استفسارات العملاء'
  ],
  return_policy_ar:
    'يمكن رفض أو إرجاع أي منتج عند الاستلام إذا لم يكن مطابقاً لمعايير الطزاجة والجودة، ' +
    'ويُستبدل أو تُرد قيمته كاملة. تُسجّل الملاحظة إلكترونياً في نظام الجودة ولا يمكن للمندوب أو السائق تعديلها أو حذفها.',
  order_flow_ar: [
    '1) إضافة المنتجات للسلة واختيار الكمية',
    '2) تعبئة بيانات العميل وعنوان التوصيل',
    '3) التحقق من رقم الجوال برسالة نصية (OTP)',
    '4) فتح بوابة ميسر وإدخال بيانات البطاقة بشكل مشفّر',
    '5) خصم قيمة الفاتورة وإيداعها في حساب الشركة لدى البنك العربي الوطني',
    '6) إصدار الفاتورة الإلكترونية وإشعار التأكيد فوراً',
    '7) تجهيز الطلب في المخزن + توثيق الجودة بالصور',
    '8) استلام السائق وبدء التتبع المباشر GPS',
    '9) التسليم وتأكيد الاستلام إلكترونياً',
    '10) فتح خانة الملاحظات والشكاوى للعميل (محفوظة ولا تُحذف)'
  ]
};

/*═══════════════ أدوات معالجة النص العربي ═══════════════*/
const AR_DIACRITICS = /[\u064B-\u0652\u0670\u0640]/g;

/** تطبيع عربي قوي: يوحّد الهمزات والتاء المربوطة والأرقام ويزيل التشكيل */
export function normalizeAr(s: string): string {
  if (!s) return '';
  return s
    .replace(AR_DIACRITICS, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
    .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * إزالة أدوات التعريف واللواصق العربية.
 * ضرورية: بدونها «الطماطم» لا تطابق «طماطم» فيفشل السؤال.
 */
export function stripArticle(t: string): string {
  let s = t;
  // ال / وال / بال / كال / فال / لل
  s = s.replace(/^(وال|بال|كال|فال|لل|ال)/, '');
  // حروف جر ملتصقة
  s = s.replace(/^(و|ف|ب|ك|ل)(?=[\u0600-\u06FF]{3,})/, '');
  return s.length >= 2 ? s : t;
}

/** كل صور الكلمة: الأصلية + بدون أداة تعريف */
function variants(t: string): string[] {
  const s = stripArticle(t);
  return s === t ? [t] : [t, s];
}

/** مسافة تشابه سريعة (Dice bigram) — تتحمّل الأخطاء الإملائية */
function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.92;
  const grams = (s: string) => {
    const g = new Set<string>();
    for (let i = 0; i < s.length - 1; i++) g.add(s.slice(i, i + 2));
    return g;
  };
  const A = grams(a), B = grams(b);
  if (!A.size || !B.size) return 0;
  let hit = 0;
  A.forEach((g) => { if (B.has(g)) hit++; });
  return (2 * hit) / (A.size + B.size);
}

/** كلمات وظيفية تُستبعد من البحث عن اسم منتج */
const STOPWORDS = new Set([
  'كم','سعر','السعر','اسعار','الاسعار','بكم','ريال','هو','هي','ما','ماهو','ماهي','هل',
  'من','في','على','عن','الى','مع','و','او','ايش','وش','كيف','متى','وين','اين','لدي',
  'عندكم','لديكم','يوجد','متوفر','ابحث','اريد','ابغى','ودي','بكام','قيمه','قيمة',
  'the','price','of','how','much','is','what','a','an','do','you','have'
].map((w) => w));

/*═══════════════ فهرس مُسبق البناء (سرعة فائقة) ═══════════════*/
interface Indexed extends OdayProduct { _ar: string; _en: string; _c: string }
const INDEX: Indexed[] = PRODUCTS.map((p) => ({
  ...p,
  _ar: normalizeAr(p.ar),
  _en: (p.en || '').toLowerCase(),
  _c: normalizeAr(p.c)
}));

/**
 * مصطلحات التصنيفات: عندما يسأل العميل «كم سعر التمور؟»
 * فهو يسأل عن فئة كاملة وليس منتجاً واحداً.
 */
const CATEGORY_TERMS: Record<string, string[]> = {
  'أصناف القصيم والتمور ومنوعة': ['تمور', 'تمر', 'قصيم', 'دبس'],
  'الفواكه': ['فواكه', 'فاكهه'],
  'الخضروات الأساسية والمحلية': ['خضار', 'خضروات'],
  'الخضروات المستوردة والخاصة': ['مستورد', 'اجنبي'],
  'الورقيات والأعشاب': ['ورقيات', 'اعشاب']
};

/** يعيد اسم التصنيف إن كان السؤال عن فئة كاملة */
export function matchCategory(query: string): string | null {
  const q = normalizeAr(query);
  const toks = q.split(' ').map(stripArticle);
  for (const [cat, terms] of Object.entries(CATEGORY_TERMS)) {
    for (const t of terms) {
      const nt = normalizeAr(t);
      if (toks.includes(nt) || (nt.length >= 5 && q.includes(nt))) return cat;
    }
  }
  return null;
}

/** منتجات تصنيف معين مرتّبة بالسعر */
export function productsOfCategory(cat: string, limit = 8): OdayProduct[] {
  return PRODUCTS.filter((p) => p.c === cat).sort((a, b) => a.p - b.p).slice(0, limit);
}

/** مرادفات شائعة يستخدمها العملاء */
const SYNONYMS: Record<string, string> = {
  'بندوره': 'طماطم', 'بندورة': 'طماطم', 'قوطه': 'طماطم', 'قوطة': 'طماطم',
  'خيارات': 'خيار', 'بطاط': 'بطاطس', 'بطاطا': 'بطاطس',
  'فلفل بارد': 'رومي', 'فليفله': 'رومي',
  'برتقان': 'برتقال', 'موزه': 'موز', 'تفاحه': 'تفاح',
  'تمر': 'تمور', 'رطب': 'تمور', 'عجوه': 'سكري',
  'كزبره': 'كزبرة', 'نعنع': 'نعناع',
  'فراوله': 'فراولة', 'فروالة': 'فراولة',
  'باميه': 'بامية', 'كوسا': 'كوسة', 'كوسه': 'كوسة',
  'ملفوف': 'كرنب', 'قرنبيط': 'زهرة', 'بروكلي': 'بروكولي',
  'بطيخ': 'حبحب', 'شمام': 'شمام', 'اناناس': 'أناناس'
};

function expandQuery(q: string): string {
  let out = q;
  Object.entries(SYNONYMS).forEach(([k, v]) => {
    if (out.includes(normalizeAr(k))) out += ' ' + normalizeAr(v);
  });
  return out;
}

/**
 * بحث المنتجات — منطق من مرحلتين يمنع الأخطاء الفادحة:
 *  المرحلة 1: تطابق حرفي/جزئي دقيق (بعد إزالة أداة التعريف).
 *  المرحلة 2: تشابه ضبابي — يُستخدم فقط إذا فشلت المرحلة 1 تماماً،
 *             فلا تُرجَع «كركم» لسؤال عن «الطماطم» بعد اليوم.
 */
export function searchProducts(query: string, limit = 6): OdayProduct[] {
  const q = expandQuery(normalizeAr(query));
  if (!q) return [];

  // كلمات دالّة فقط: نستبعد «كم / سعر / ما ...» ونزيل أداة التعريف
  const tokens = q
    .split(' ')
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t) && !STOPWORDS.has(stripArticle(t)))
    .flatMap(variants);

  const qBare = tokens.join(' ').trim();
  if (!tokens.length) return [];

  // الاسم الرئيسي = أول كلمة دالّة (يُرجّح «ليمون» فوق الصفة «أخضر»)
  const headNoun = tokens[0];

  /*──────── المرحلة 1: تطابق دقيق ────────*/
  const exact = INDEX.map((p) => {
    let score = 0;
    const nameWords = p._ar.split(' ').flatMap(variants);

    if (p._ar === qBare) score += 220;                       // اسم مطابق تماماً
    if (qBare.length >= 3 && p._ar.includes(qBare)) score += 120;
    if (p._en && qBare.length >= 3 && p._en.includes(qBare)) score += 90;

    // ترجيح الاسم الرئيسي: لا يجوز أن تفوز صفة على الاسم
    if (headNoun && nameWords.includes(headNoun)) score += 130;
    else if (headNoun && headNoun.length >= 3 && p._ar.includes(headNoun)) score += 70;

    tokens.forEach((t) => {
      if (t.length < 2) return;
      // كلمة كاملة في اسم المنتج = أقوى دليل
      if (nameWords.includes(t)) score += 90;
      else if (p._ar.includes(t) && t.length >= 3) score += 55;
      else if (p._en && p._en.includes(t) && t.length >= 3) score += 40;
      if (p._c.includes(t) && t.length >= 3) score += 10;
      if (normalizeAr(p.o).includes(t) && t.length >= 3) score += 6;
    });
    return { p, score };
  }).filter((x) => x.score >= 50).sort((a, b) => b.score - a.score);

  if (exact.length) return exact.slice(0, limit).map((x) => x.p);

  /*──────── المرحلة 2: ضبابي (احتياطي فقط) ────────*/
  const fuzzy = INDEX.map((p) => {
    let best = 0;
    const nameWords = p._ar.split(' ').flatMap(variants);
    tokens.forEach((t) => {
      if (t.length < 3) return;
      nameWords.forEach((w) => {
        if (w.length < 3) return;
        const s = similarity(w, t);
        // شرط صارم: تشابه عالٍ + أول حرف مطابق ⇒ يمنع «كركم» ضد «طماطم»
        if (s >= 0.72 && w[0] === t[0]) best = Math.max(best, s);
      });
    });
    return { p, score: best * 100 };
  }).filter((x) => x.score >= 72).sort((a, b) => b.score - a.score);

  return fuzzy.slice(0, limit).map((x) => x.p);
}

/*═══════════════ كشف النية (Intent Detection) ═══════════════*/
const KW: Record<OdayIntent, string[]> = {
  price:        ['سعر','بكم','كم سعر','السعر','اسعار','الاسعار','تسعير','ريال','كلفه','تكلفه','price','cost','how much'],
  product_info: ['ما هو','معلومات','تفاصيل','وصف','فوائد','مواصفات','منشا','مصدر','info','details'],
  category_list:['اصناف','انواع','قائمه','قائمة','عندكم','متوفر','لديكم','تشكيله','منتجات','كتالوج','categories','products'],
  cheapest:     ['ارخص','اقل سعر','رخيص','اوفر','cheapest'],
  expensive:    ['اغلى','اعلى سعر','افخم','expensive'],
  hours:        ['دوام','الدوام','اوقات','ساعات','متى تفتحون','متى تسكرون','مفتوح','مغلق','تفتح','تقفل','hours','open','close'],
  branches:     ['فرع','فروع','الفروع','عنوان','مكان','موقع','وين','اين','branch','location','address'],
  delivery:     ['توصيل','التوصيل','شحن','الشحن','يوصل','كم يستغرق','مده','توصلون','delivery','shipping'],
  payment:      ['دفع','الدفع','ادفع','مدى','فيزا','بطاقه','تحويل','بنك','ميسر','فاتوره','payment','pay','visa','mada'],
  contact:      ['تواصل','اتصال','رقم','جوال','ايميل','بريد','واتس','شكوى','خدمه العملاء','contact','support'],
  order_status: ['طلبي','حاله الطلب','تتبع','وين طلبي','رقم الطلب','track','order status'],
  return_policy:['ارجاع','استبدال','ارجع','مرتجع','ضمان','جوده','تالف','return','refund'],
  corporate:    ['شركات','كبار العملاء','جمله','مطاعم','فنادق','عقد','توريد','مؤسسه','corporate','wholesale','b2b'],
  services:     ['خدمات','الخدمات','ماذا تقدمون','تقدمون','ميزات','services'],
  greeting:     ['السلام','مرحبا','هلا','اهلا','صباح','مساء','hi','hello','hey'],
  thanks:       ['شكرا','مشكور','يعطيك','جزاك','thanks','thank you'],
  count:        ['كم منتج','كم صنف','عدد المنتجات','كم عندكم','how many'],
  origin:       ['منشا','بلد','مستورد','محلي','وطني','origin','imported','local'],
  unknown:      []
};

export function detectIntent(query: string): { intent: OdayIntent; score: number } {
  const q = normalizeAr(query);
  let best: OdayIntent = 'unknown';
  let bestScore = 0;
  (Object.keys(KW) as OdayIntent[]).forEach((intent) => {
    let s = 0;
    KW[intent].forEach((k) => {
      const nk = normalizeAr(k);
      if (!nk) return;
      if (q === nk) s += 40;
      else if (q.includes(nk)) s += nk.length >= 4 ? 25 : 15;
    });
    if (s > bestScore) { bestScore = s; best = intent; }
  });
  return { intent: best, score: Math.min(1, bestScore / 40) };
}

/*═══════════════ مُنسّقات الإجابة ═══════════════*/
const money = (n: number) => `${n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)} ريال`;

function fmtPriceLine(p: OdayProduct) {
  return `• **${p.ar}**${p.en ? ` (${p.en})` : ''} — **${money(p.p)}** ${p.u.replace('ريال', '').trim() || 'للكيلو'}${p.o ? ` | المنشأ: ${p.o}` : ''}`;
}

function categoriesSummary(): string {
  const map = new Map<string, { n: number; min: number; max: number }>();
  PRODUCTS.forEach((p) => {
    const e = map.get(p.c) || { n: 0, min: Infinity, max: 0 };
    e.n++; e.min = Math.min(e.min, p.p); e.max = Math.max(e.max, p.p);
    map.set(p.c, e);
  });
  return [...map.entries()]
    .sort((a, b) => b[1].n - a[1].n)
    .map(([c, e]) => `• **${c}** — ${e.n} صنف (من ${money(e.min)} إلى ${money(e.max)})`)
    .join('\n');
}

/*═══════════════ المحرّك الرئيسي: ask() ═══════════════*/
export function ask(query: string): OdayAnswer {
  const raw = (query || '').trim();
  if (!raw) {
    return {
      text: 'أهلاً بك! أنا **عدي** مساعد متجر نجوم دلتا 🌿\nاسألني عن سعر أي منتج، أوقات الدوام، الفروع، التوصيل، أو طرق الدفع.',
      intent: 'greeting', confidence: 1, source: 'local',
      actions: [{ label: 'تصفح المنتجات', route: '/?page=products' }]
    };
  }

  const { intent, score } = detectIntent(raw);
  const found = searchProducts(raw, 6);

  /*── سؤال عن فئة كاملة (مثلاً: «كم سعر التمور؟») ──*/
  const catHit = matchCategory(raw);
  if (catHit && (!found.length || intent === 'category_list')) {
    const all = PRODUCTS.filter((p) => p.c === catHit);
    const list = productsOfCategory(catHit, 8);
    if (list.length) {
      const min = Math.min(...all.map((p) => p.p));
      const max = Math.max(...all.map((p) => p.p));
      return {
        text:
          `🏷️ **أسعار ${catHit}**\n\n` +
          `يتوفر **${all.length} صنفاً** في هذا القسم، بأسعار من **${money(min)}** إلى **${money(max)}**.\n\n` +
          `**أبرز الأصناف:**\n${list.map(fmtPriceLine).join('\n')}\n\n_${STORE.vat_note}_`,
        intent: 'price', confidence: 0.94, products: list, source: 'local',
        actions: [{ label: `تصفح ${catHit}`, route: `/?page=products&cat=${encodeURIComponent(catHit)}` }]
      };
    }
  }

  /*── سعر منتج محدد (الأهم) ──*/
  if (found.length && (intent === 'price' || intent === 'unknown' || intent === 'product_info' || intent === 'origin')) {
    const top = found[0];

    if (intent === 'price' || intent === 'unknown') {
      const others = found.slice(1, 4);
      let t = `💰 **سعر ${top.ar}**\n\n${fmtPriceLine(top)}\n`;
      if (top.d) t += `\n${top.d}\n`;
      if (others.length) t += `\n**أصناف قريبة:**\n${others.map(fmtPriceLine).join('\n')}\n`;
      t += `\n_${STORE.vat_note}_`;
      return {
        text: t, intent: 'price', confidence: 0.97, products: found, source: 'local',
        actions: [
          { label: `أضف ${top.ar} للسلة`, route: `/?page=products&q=${encodeURIComponent(top.ar)}` },
          { label: 'تصفح كل المنتجات', route: '/?page=products' }
        ]
      };
    }

    // معلومات / منشأ
    let t = `🌿 **${top.ar}**${top.en ? ` — ${top.en}` : ''}\n\n`;
    if (top.d) t += `${top.d}\n\n`;
    if (top.f) t += `**الفوائد والمميزات:** ${top.f}\n\n`;
    t += `**السعر:** ${money(top.p)} ${top.u.replace('ريال', '').trim()}\n`;
    if (top.o) t += `**المنشأ:** ${top.o}\n`;
    t += `**التصنيف:** ${top.c}`;
    return {
      text: t, intent: 'product_info', confidence: 0.95, products: found, source: 'local',
      actions: [{ label: 'أضف للسلة', route: `/?page=products&q=${encodeURIComponent(top.ar)}` }]
    };
  }

  switch (intent) {
    /*── أوقات الدوام ──*/
    case 'hours':
      return {
        text:
          `🕐 **أوقات عمل متجر نجوم دلتا**\n\n` +
          `• ${STORE.hours.weekdays_ar}\n` +
          `• ${STORE.hours.friday_ar}\n\n` +
          `📱 ${STORE.hours.online_ar}\n` +
          `📦 ${STORE.hours.prep_ar}`,
        intent, confidence: 0.98, source: 'local',
        actions: [{ label: 'ابدأ الطلب الآن', route: '/?page=products' }]
      };

    /*── الفروع ──*/
    case 'branches':
      return {
        text:
          `📍 **فروع نجوم دلتا في المملكة**\n\n` +
          STORE.branches.map((b) => `• **${b.ar}** — ${b.region_ar}`).join('\n') +
          `\n\n🚚 ${STORE.delivery.cities_ar}`,
        intent, confidence: 0.96, source: 'local',
        actions: [{ label: 'تواصل معنا', route: '/?page=contact' }]
      };

    /*── التوصيل ──*/
    case 'delivery':
      return {
        text:
          `🚚 **الشحن والتوصيل**\n\n` +
          `• ${STORE.delivery.same_day_ar}\n` +
          `• ${STORE.delivery.next_day_ar}\n` +
          `• ${STORE.delivery.fee_ar}\n` +
          `• ❄️ ${STORE.delivery.cold_chain_ar}\n` +
          `• 📡 يمكنك تتبع السائق مباشرة على الخريطة حتى باب منزلك.`,
        intent, confidence: 0.97, source: 'local',
        actions: [{ label: 'تتبع طلبي', route: '/?page=track' }]
      };

    /*── الدفع ──*/
    case 'payment':
      return {
        text:
          `💳 **طرق الدفع المتاحة**\n\n` +
          STORE.payment.methods_ar.map((m) => `• ${m}`).join('\n') +
          `\n\n🔐 ${STORE.payment.gateway_ar}\n` +
          `🏦 ${STORE.payment.bank_ar}\n` +
          `🏢 ${STORE.payment.corporate_ar}\n` +
          `🛡️ ${STORE.payment.secure_ar}`,
        intent, confidence: 0.97, source: 'local',
        actions: [{ label: 'إتمام الطلب', route: '/?page=cart' }]
      };

    /*── الخدمات ──*/
    case 'services':
      return {
        text: `✨ **خدمات نجوم دلتا**\n\n` + STORE.services_ar.map((s) => `• ${s}`).join('\n'),
        intent, confidence: 0.95, source: 'local'
      };

    /*── التصنيفات ──*/
    case 'category_list':
      return {
        text:
          `🛒 **كتالوج نجوم دلتا — ${PRODUCTS.length} صنفاً حقيقياً**\n\n` +
          categoriesSummary() +
          `\n\n_اسألني عن سعر أي صنف بالاسم مباشرة._`,
        intent, confidence: 0.95, products: PRODUCTS.slice(0, 8), source: 'local',
        actions: [{ label: 'تصفح المنتجات', route: '/?page=products' }]
      };

    /*── الأرخص / الأغلى ──*/
    case 'cheapest': {
      const list = [...PRODUCTS].sort((a, b) => a.p - b.p).slice(0, 8);
      return {
        text: `🏷️ **أوفر 8 أصناف في المتجر**\n\n${list.map(fmtPriceLine).join('\n')}\n\n_${STORE.vat_note}_`,
        intent, confidence: 0.94, products: list, source: 'local',
        actions: [{ label: 'تصفح العروض', route: '/?page=products' }]
      };
    }
    case 'expensive': {
      const list = [...PRODUCTS].sort((a, b) => b.p - a.p).slice(0, 8);
      return {
        text: `💎 **أفخم 8 أصناف في المتجر**\n\n${list.map(fmtPriceLine).join('\n')}`,
        intent, confidence: 0.94, products: list, source: 'local'
      };
    }

    /*── العدد ──*/
    case 'count': {
      const cats = new Set(PRODUCTS.map((p) => p.c)).size;
      return {
        text:
          `📊 يتوفر في متجر نجوم دلتا **${PRODUCTS.length} صنفاً** موزعة على **${cats} تصنيفات**، ` +
          `بأسعار تبدأ من **${money(Math.min(...PRODUCTS.map((p) => p.p)))}** ` +
          `وحتى **${money(Math.max(...PRODUCTS.map((p) => p.p)))}**.\n\n${categoriesSummary()}`,
        intent, confidence: 0.96, source: 'local'
      };
    }

    /*── التواصل ──*/
    case 'contact':
      return {
        text:
          `📞 **تواصل مع نجوم دلتا**\n\n` +
          `• البريد الرسمي: **${STORE.email}**\n` +
          `• التسويق والعروض: **${STORE.marketing_email}**\n` +
          `• الموقع: ${STORE.website}\n` +
          `• فيسبوك: ${STORE.facebook}\n\n` +
          `يمكنك أيضاً تسجيل ملاحظة أو شكوى من صفحة "اتصل بنا" وسيتم حفظها إلكترونياً ومتابعتها من الإدارة.`,
        intent, confidence: 0.96, source: 'local',
        actions: [{ label: 'صفحة التواصل', route: '/?page=contact' }]
      };

    /*── حالة الطلب ──*/
    case 'order_status':
      return {
        text:
          `📦 **تتبع طلبك**\n\n` +
          `أدخل رقم الطلب في صفحة "تتبع الطلب" لتشاهد مباشرة:\n` +
          `• حالة التجهيز في المخزن (مع صور توثيق الجودة)\n` +
          `• لحظة استلام السائق\n` +
          `• موقع السائق على الخريطة في الوقت الحقيقي\n` +
          `• تأكيد التسليم الإلكتروني\n\n` +
          `**مراحل الطلب:** ${STORE.order_flow_ar.slice(5).join(' → ').replace(/\d\)\s?/g, '')}`,
        intent, confidence: 0.95, source: 'local',
        actions: [{ label: 'تتبع الطلب', route: '/?page=track' }]
      };

    /*── الإرجاع والجودة ──*/
    case 'return_policy':
      return {
        text: `🛡️ **سياسة الجودة والإرجاع**\n\n${STORE.return_policy_ar}`,
        intent, confidence: 0.95, source: 'local'
      };

    /*── الشركات وكبار العملاء ──*/
    case 'corporate':
      return {
        text:
          `🏢 **بوابة الشركات وكبار العملاء**\n\n` +
          `نظام مستقل ومعزول بصلاحيات خاصة يشمل:\n` +
          `• أسعار جملة وعقود توريد سنوية\n` +
          `• فواتير إلكترونية معتمدة ومتوافقة مع هيئة الزكاة والضريبة\n` +
          `• نظام محاسبي ومالي وإداري متكامل\n` +
          `• أرشفة إلكترونية للعقود والمستندات\n` +
          `• ${STORE.payment.corporate_ar}\n` +
          `• كشف حساب وتقارير دورية (يومي/أسبوعي/شهري/سنوي)\n\n` +
          `للتسجيل راسلنا على **${STORE.email}**`,
        intent, confidence: 0.95, source: 'local',
        actions: [{ label: 'بوابة الشركات', route: '/?page=vip_login' }]
      };

    /*── تحية / شكر ──*/
    case 'greeting':
      return {
        text:
          `وعليكم السلام ورحمة الله وبركاته 🌿\nأنا **عدي**، مساعدك في متجر نجوم دلتا.\n\n` +
          `يمكنني مساعدتك في:\n• أسعار ${PRODUCTS.length} صنف من الخضروات والفواكه والتمور\n` +
          `• أوقات الدوام والفروع\n• التوصيل وطرق الدفع\n• تتبع طلبك\n\nكيف أخدمك؟`,
        intent, confidence: 1, source: 'local',
        actions: [{ label: 'تصفح المنتجات', route: '/?page=products' }]
      };

    case 'thanks':
      return {
        text: `العفو، هذا واجبنا 🌿\nسعدنا بخدمتك — نجوم دلتا دائماً في خدمتك.`,
        intent, confidence: 1, source: 'local'
      };

    default:
      break;
  }

  /*── لم نجد تطابقاً: نقترح بدلاً من الفشل ──*/
  const suggestions = searchProducts(raw.split(' ').slice(0, 2).join(' '), 4);
  if (suggestions.length) {
    return {
      text:
        `لم أجد تطابقاً دقيقاً لـ "${raw}"، لكن ربما تقصد:\n\n${suggestions.map(fmtPriceLine).join('\n')}`,
      intent: 'unknown', confidence: 0.55, products: suggestions, source: 'local',
      actions: [{ label: 'تصفح المنتجات', route: '/?page=products' }]
    };
  }

  return {
    text:
      `لم أفهم سؤالك تماماً 🌿 يمكنك سؤالي مثلاً:\n\n` +
      `• «كم سعر الطماطم؟»\n• «ما أوقات الدوام؟»\n• «كيف يتم التوصيل؟»\n` +
      `• «ما طرق الدفع؟»\n• «وين فروعكم؟»\n• «أرخص الأصناف»\n\n` +
      `أو تواصل معنا على **${STORE.email}**`,
    intent: 'unknown', confidence: 0.3, source: 'local',
    actions: [
      { label: 'تصفح المنتجات', route: '/?page=products' },
      { label: 'تواصل معنا', route: '/?page=contact' }
    ]
  };
}

/*═══════════════ سياق مُختصر لـ Gemini (طبقة التحسين) ═══════════════*/
export function buildAiContext(userQuery: string): string {
  const rel = searchProducts(userQuery, 12);
  const list = (rel.length ? rel : PRODUCTS.slice(0, 25))
    .map((p) => `${p.ar} (${p.en}) = ${money(p.p)} ${p.u} | ${p.c} | ${p.o}`)
    .join('\n');

  return [
    `أنت "عدي"، المساعد الرسمي لمتجر نجوم دلتا للتجارة في السعودية.`,
    `أجب بالعربية بإيجاز واحترافية، ولا تخترع أي سعر أو معلومة غير مذكورة أدناه.`,
    ``,
    `[أوقات الدوام] ${STORE.hours.weekdays_ar} | ${STORE.hours.friday_ar} | ${STORE.hours.online_ar}`,
    `[الفروع] ${STORE.branches.map((b) => b.ar).join(' • ')}`,
    `[التوصيل] ${STORE.delivery.same_day_ar}. ${STORE.delivery.fee_ar}. ${STORE.delivery.cold_chain_ar}`,
    `[الدفع] ${STORE.payment.methods_ar.join('، ')} عبر ${STORE.payment.gateway_ar}. ${STORE.payment.bank_ar}`,
    `[الخدمات] ${STORE.services_ar.join(' • ')}`,
    `[الإرجاع] ${STORE.return_policy_ar}`,
    `[التواصل] ${STORE.email}`,
    `[ملاحظة] ${STORE.vat_note}. إجمالي الأصناف: ${PRODUCTS.length}.`,
    ``,
    `[أسعار الأصناف ذات الصلة]`,
    list
  ].join('\n');
}

/** إحصاءات للتحقق من صحة قاعدة المعرفة (يستخدمها فحص الجودة) */
export function knowledgeStats() {
  return {
    products: PRODUCTS.length,
    categories: new Set(PRODUCTS.map((p) => p.c)).size,
    minPrice: Math.min(...PRODUCTS.map((p) => p.p)),
    maxPrice: Math.max(...PRODUCTS.map((p) => p.p)),
    withImages: PRODUCTS.filter((p) => !!p.img).length,
    branches: STORE.branches.length,
    paymentMethods: STORE.payment.methods_ar.length,
    ready: PRODUCTS.length > 200
  };
}

export default { ask, searchProducts, detectIntent, buildAiContext, knowledgeStats, STORE, normalizeAr };
