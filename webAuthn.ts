/**═══════════════════════════════════════════════════════════════════
 * DeltaStars — طبقة توافق webAuthn (النسخة الآمنة)
 * المالك: علي الدحان (Ali Aldahan)
 *
 * ⚠️ إصلاح ثغرة أمنية حرجة:
 * النسخة السابقة كانت تحتوي "بصمة افتراضية" تُرجع true دائماً حتى
 * بدون أي تحقق حقيقي — أي شخص كان يستطيع تجاوز الحماية بالكامل.
 *
 * هذا الملف الآن مجرد واجهة توافق تُفوّض كل شيء إلى
 * src/services/biometricAuth.ts الذي يستخدم WebAuthn حقيقياً
 * (بصمة الإصبع + Face ID + التعرف على الوجه) بلا أي تجاوز.
 *══════════════════════════════════════════════════════════════════*/

import bio, {
  type BioScope,
  type BioResult,
  isBiometricAvailable as _available,
  registerBiometric as _register,
  authenticateBiometric as _authenticate,
  hasRegisteredBiometric as _has,
  biometricLabel as _label,
  guardScope as _guard,
  removeBiometric as _remove,
  removeAllBiometrics as _removeAll,
  listBiometrics as _list
} from '../services/biometricAuth';

export type { BioScope, BioResult };

/** هل يدعم الجهاز البصمة/الوجه فعلياً؟ (لم يعد يُرجع true دائماً) */
export async function isBiometricAvailable(): Promise<boolean> {
  return _available();
}

/** تسجيل بصمة جديدة — يفشل فعلياً إن لم ينجح التسجيل */
export async function registerBiometric(
  scope: BioScope = 'customer',
  userId = 'default',
  label = 'مستخدم نجوم دلتا'
): Promise<boolean> {
  const r = await _register(scope, userId, label);
  if (!r.success) console.warn('⚠️ فشل تسجيل البصمة:', r.error);
  return r.success;
}

/** التحقق بالبصمة — يفشل فعلياً عند الفشل (لا تجاوز) */
export async function authenticateBiometric(
  scope: BioScope = 'customer',
  userId?: string
): Promise<boolean> {
  const r = await _authenticate(scope, userId);
  if (!r.success) console.warn('⚠️ فشل التحقق البيومتري:', r.error);
  return r.success;
}

/** نسخة تُعيد التفاصيل الكاملة (يُفضّل استخدامها في الواجهات) */
export async function authenticateBiometricDetailed(
  scope: BioScope = 'customer',
  userId?: string
): Promise<BioResult> {
  return _authenticate(scope, userId);
}

/** هل توجد بصمة مسجّلة؟ */
export function hasRegisteredKey(scope: BioScope = 'customer', userId?: string): boolean {
  return _has(scope, userId);
}

/** وصف نوع البيومترية المتاحة (Face ID / بصمة / Windows Hello) */
export async function getBiometricLabel(): Promise<string> {
  return _label();
}

/** بوابة حماية قسم حسّاس */
export async function guardScope(
  scope: BioScope,
  opts?: { userId?: string; allowPasswordFallback?: boolean }
): Promise<BioResult> {
  return _guard(scope, opts);
}

export const removeBiometric = _remove;
export const removeAllBiometrics = _removeAll;
export const listBiometrics = _list;

export default {
  isBiometricAvailable,
  registerBiometric,
  authenticateBiometric,
  authenticateBiometricDetailed,
  hasRegisteredKey,
  getBiometricLabel,
  guardScope,
  removeBiometric,
  removeAllBiometrics,
  listBiometrics,
  ...bio
};
