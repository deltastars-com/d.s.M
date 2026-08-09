/**═══════════════════════════════════════════════════════════════════
 * DeltaStars | نجوم دلتا — نظام البصمة والتعرف على الوجه (حقيقي)
 * المالك: علي الدحان (Ali Aldahan)
 *
 * ▸ WebAuthn / Passkeys: بصمة الإصبع + Face ID + التعرف على الوجه بأندرويد.
 * ▸ المفتاح الخاص لا يغادر شريحة الأمان في الجهاز (Secure Enclave / TEE).
 * ▸ لا يوجد "تجاوز افتراضي" — الفشل يعني فشل (خلافاً للنسخة السابقة
 *   التي كانت تُرجع true دائماً وهي ثغرة أمنية خطيرة).
 * ▸ يحمي: لوحة التحكم، المطور، بوابة الشركات، المناديب والسواقين،
 *          وحسابات العملاء وعمليات الشراء.
 *══════════════════════════════════════════════════════════════════*/

export type BioScope =
  | 'admin' | 'developer' | 'vip' | 'driver' | 'agent'
  | 'customer' | 'checkout' | 'quality' | 'finance';

export interface BioCredential {
  id: string;            // معرّف المفتاح (base64url)
  scope: BioScope;
  userId: string;
  label: string;
  createdAt: string;
  lastUsedAt?: string;
  deviceHint?: string;
  transports?: string[];
}

export interface BioResult {
  success: boolean;
  scope?: BioScope;
  credentialId?: string;
  method?: 'platform' | 'passkey' | 'password-fallback';
  error?: string;
  errorCode?: 'unsupported' | 'no-credential' | 'denied' | 'timeout' | 'failed' | 'locked';
}

const RP_NAME = 'Delta Stars | نجوم دلتا';
const STORE_KEY = 'ds_bio_credentials_v3';
const LOCK_KEY = 'ds_bio_lock_v3';
const MAX_FAILS = 5;
const LOCK_MINUTES = 15;

/*═══════════════ أدوات ترميز ═══════════════*/
const b64url = {
  encode(buf: ArrayBuffer): string {
    const bytes = new Uint8Array(buf);
    let s = '';
    bytes.forEach((b) => (s += String.fromCharCode(b)));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  },
  decode(str: string): Uint8Array {
    const pad = str.length % 4 ? '='.repeat(4 - (str.length % 4)) : '';
    const b = atob(str.replace(/-/g, '+').replace(/_/g, '/') + pad);
    return Uint8Array.from(b, (c) => c.charCodeAt(0));
  }
};

const randomBytes = (n = 32): Uint8Array => {
  const a = new Uint8Array(n);
  (globalThis.crypto || (window as any).msCrypto).getRandomValues(a);
  return a;
};

/*═══════════════ تخزين آمن محلي ═══════════════*/
function readStore(): BioCredential[] {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch { return []; }
}
function writeStore(list: BioCredential[]) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(list)); } catch {}
}

/*═══════════════ قفل بعد المحاولات الفاشلة ═══════════════*/
function isLocked(scope: BioScope): { locked: boolean; minutesLeft: number } {
  try {
    const all = JSON.parse(localStorage.getItem(LOCK_KEY) || '{}');
    const rec = all[scope];
    if (!rec || rec.fails < MAX_FAILS) return { locked: false, minutesLeft: 0 };
    const elapsed = Date.now() - rec.at;
    const left = LOCK_MINUTES * 60000 - elapsed;
    if (left <= 0) { delete all[scope]; localStorage.setItem(LOCK_KEY, JSON.stringify(all)); return { locked: false, minutesLeft: 0 }; }
    return { locked: true, minutesLeft: Math.ceil(left / 60000) };
  } catch { return { locked: false, minutesLeft: 0 }; }
}
function recordFail(scope: BioScope) {
  try {
    const all = JSON.parse(localStorage.getItem(LOCK_KEY) || '{}');
    const rec = all[scope] || { fails: 0, at: Date.now() };
    rec.fails += 1; rec.at = Date.now();
    all[scope] = rec;
    localStorage.setItem(LOCK_KEY, JSON.stringify(all));
  } catch {}
}
function clearFails(scope: BioScope) {
  try {
    const all = JSON.parse(localStorage.getItem(LOCK_KEY) || '{}');
    delete all[scope];
    localStorage.setItem(LOCK_KEY, JSON.stringify(all));
  } catch {}
}

/*═══════════════ فحص الدعم الحقيقي ═══════════════*/

/** هل يدعم الجهاز مصادقة بيومترية مدمجة فعلياً؟ (لا خداع) */
export async function isBiometricAvailable(): Promise<boolean> {
  try {
    if (typeof window === 'undefined') return false;
    if (!window.PublicKeyCredential) return false;
    if (!window.isSecureContext) return false;   // HTTPS إجباري
    const fn = (window.PublicKeyCredential as any).isUserVerifyingPlatformAuthenticatorAvailable;
    if (typeof fn !== 'function') return false;
    return await fn.call(window.PublicKeyCredential);
  } catch { return false; }
}

/** هل يدعم المتصفح الدخول التلقائي بالمفاتيح (Conditional UI)؟ */
export async function isConditionalUIAvailable(): Promise<boolean> {
  try {
    const fn = (window.PublicKeyCredential as any)?.isConditionalMediationAvailable;
    return typeof fn === 'function' ? await fn.call(window.PublicKeyCredential) : false;
  } catch { return false; }
}

/** وصف نوع البيومترية المتاحة لعرضه للمستخدم */
export async function biometricLabel(): Promise<string> {
  if (!(await isBiometricAvailable())) return 'غير متاح على هذا الجهاز';
  const ua = navigator.userAgent;
  if (/iPhone|iPad|Macintosh/.test(ua)) return 'Face ID / Touch ID';
  if (/Android/.test(ua)) return 'بصمة الإصبع / التعرف على الوجه';
  if (/Windows/.test(ua)) return 'Windows Hello (بصمة / وجه)';
  return 'المصادقة البيومترية';
}

/*═══════════════ التسجيل (إنشاء مفتاح بيومتري) ═══════════════*/

export async function registerBiometric(
  scope: BioScope,
  userId: string,
  displayName: string
): Promise<BioResult> {
  if (!(await isBiometricAvailable())) {
    return { success: false, errorCode: 'unsupported',
      error: 'الجهاز لا يدعم البصمة أو التعرف على الوجه. استخدم كلمة المرور.' };
  }

  try {
    const challenge = randomBytes(32);
    const userIdBytes = new TextEncoder().encode(`${scope}:${userId}`);

    const options: PublicKeyCredentialCreationOptions = {
      challenge,
      rp: { name: RP_NAME, id: window.location.hostname },
      user: { id: userIdBytes, name: `${userId}@deltastars-ksa.com`, displayName },
      pubKeyCredParams: [
        { type: 'public-key', alg: -7 },    // ES256
        { type: 'public-key', alg: -257 }   // RS256
      ],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',   // الجهاز نفسه لا مفتاح خارجي
        userVerification: 'required',          // ★ بصمة/وجه إجباري
        residentKey: 'preferred',
        requireResidentKey: false
      },
      timeout: 60000,
      attestation: 'none',
      excludeCredentials: readStore()
        .filter((c) => c.scope === scope && c.userId === userId)
        .map((c) => ({ type: 'public-key' as const, id: b64url.decode(c.id) }))
    };

    const cred = (await navigator.credentials.create({ publicKey: options })) as PublicKeyCredential | null;
    if (!cred) return { success: false, errorCode: 'failed', error: 'فشل إنشاء المفتاح البيومتري' };

    const record: BioCredential = {
      id: b64url.encode(cred.rawId),
      scope,
      userId,
      label: displayName,
      createdAt: new Date().toISOString(),
      deviceHint: await biometricLabel(),
      transports: (cred.response as any)?.getTransports?.() || ['internal']
    };

    const all = readStore().filter((c) => !(c.scope === scope && c.userId === userId));
    all.push(record);
    writeStore(all);
    clearFails(scope);

    return { success: true, scope, credentialId: record.id, method: 'platform' };
  } catch (e: any) {
    const name = e?.name || '';
    if (name === 'NotAllowedError') return { success: false, errorCode: 'denied', error: 'تم إلغاء التسجيل أو رُفض الإذن' };
    if (name === 'InvalidStateError') return { success: false, errorCode: 'failed', error: 'هذا الجهاز مسجّل مسبقاً لهذا الحساب' };
    if (name === 'AbortError') return { success: false, errorCode: 'timeout', error: 'انتهت مهلة التسجيل' };
    return { success: false, errorCode: 'failed', error: e?.message || 'تعذر تسجيل البصمة' };
  }
}

/*═══════════════ المصادقة (التحقق بالبصمة/الوجه) ═══════════════*/

export async function authenticateBiometric(
  scope: BioScope,
  userId?: string
): Promise<BioResult> {
  const lock = isLocked(scope);
  if (lock.locked) {
    return { success: false, errorCode: 'locked',
      error: `تم قفل الدخول البيومتري مؤقتاً. أعد المحاولة بعد ${lock.minutesLeft} دقيقة.` };
  }

  if (!(await isBiometricAvailable())) {
    return { success: false, errorCode: 'unsupported',
      error: 'الجهاز لا يدعم البصمة. استخدم كلمة المرور.' };
  }

  const creds = readStore().filter(
    (c) => c.scope === scope && (!userId || c.userId === userId)
  );
  if (!creds.length) {
    return { success: false, errorCode: 'no-credential',
      error: 'لا توجد بصمة مسجّلة لهذا القسم. سجّل بصمتك أولاً من الإعدادات.' };
  }

  try {
    const options: PublicKeyCredentialRequestOptions = {
      challenge: randomBytes(32),
      rpId: window.location.hostname,
      allowCredentials: creds.map((c) => ({
        type: 'public-key' as const,
        id: b64url.decode(c.id),
        transports: (c.transports as AuthenticatorTransport[]) || ['internal']
      })),
      userVerification: 'required',   // ★ لا يقبل PIN وحده — بصمة/وجه إجباري
      timeout: 60000
    };

    const assertion = (await navigator.credentials.get({ publicKey: options })) as PublicKeyCredential | null;
    if (!assertion) { recordFail(scope); return { success: false, errorCode: 'failed', error: 'فشل التحقق' }; }

    const usedId = b64url.encode(assertion.rawId);
    const match = creds.find((c) => c.id === usedId);
    if (!match) { recordFail(scope); return { success: false, errorCode: 'failed', error: 'المفتاح غير معروف' }; }

    /*── تحقق من علم User Verified داخل بيانات المصادقة ──*/
    const authData = new Uint8Array((assertion.response as AuthenticatorAssertionResponse).authenticatorData);
    const flags = authData[32];
    const userVerified = (flags & 0x04) !== 0;
    if (!userVerified) {
      recordFail(scope);
      return { success: false, errorCode: 'failed', error: 'لم يتم التحقق من هوية المستخدم بيومترياً' };
    }

    // تحديث آخر استخدام
    const all = readStore();
    const i = all.findIndex((c) => c.id === usedId);
    if (i >= 0) { all[i].lastUsedAt = new Date().toISOString(); writeStore(all); }
    clearFails(scope);

    return { success: true, scope, credentialId: usedId, method: 'platform' };
  } catch (e: any) {
    recordFail(scope);
    const name = e?.name || '';
    if (name === 'NotAllowedError') return { success: false, errorCode: 'denied', error: 'تم إلغاء التحقق أو فشلت البصمة' };
    if (name === 'AbortError') return { success: false, errorCode: 'timeout', error: 'انتهت مهلة التحقق' };
    return { success: false, errorCode: 'failed', error: e?.message || 'فشل التحقق البيومتري' };
  }
}

/*═══════════════ الإدارة ═══════════════*/

export function hasRegisteredBiometric(scope: BioScope, userId?: string): boolean {
  return readStore().some((c) => c.scope === scope && (!userId || c.userId === userId));
}

export function listBiometrics(scope?: BioScope): BioCredential[] {
  const all = readStore();
  return scope ? all.filter((c) => c.scope === scope) : all;
}

export function removeBiometric(credentialId: string): boolean {
  const all = readStore();
  const next = all.filter((c) => c.id !== credentialId);
  writeStore(next);
  return next.length !== all.length;
}

export function removeAllBiometrics(scope?: BioScope) {
  if (!scope) { writeStore([]); return; }
  writeStore(readStore().filter((c) => c.scope !== scope));
}

/**
 * بوابة حماية موحّدة: تُستخدم قبل فتح أي قسم حسّاس.
 * إن لم تتوفر البصمة، تُعيد التحكّم لكلمة المرور بدل الرفض التام.
 */
export async function guardScope(
  scope: BioScope,
  opts?: { userId?: string; allowPasswordFallback?: boolean }
): Promise<BioResult> {
  const allowFallback = opts?.allowPasswordFallback !== false;

  if (!(await isBiometricAvailable()) || !hasRegisteredBiometric(scope, opts?.userId)) {
    return allowFallback
      ? { success: false, method: 'password-fallback', errorCode: 'no-credential',
          error: 'المصادقة البيومترية غير مُهيأة — سيتم استخدام كلمة المرور.' }
      : { success: false, errorCode: 'no-credential', error: 'يجب تسجيل البصمة للدخول لهذا القسم.' };
  }
  return authenticateBiometric(scope, opts?.userId);
}

/** الأقسام التي تتطلب بصمة إجبارية (لا يُسمح بكلمة مرور وحدها) */
export const STRICT_SCOPES: BioScope[] = ['developer', 'finance', 'vip'];

export function isStrictScope(scope: BioScope): boolean {
  return STRICT_SCOPES.includes(scope);
}

export default {
  isBiometricAvailable, isConditionalUIAvailable, biometricLabel,
  registerBiometric, authenticateBiometric, guardScope,
  hasRegisteredBiometric, listBiometrics, removeBiometric, removeAllBiometrics,
  isStrictScope, STRICT_SCOPES
};
