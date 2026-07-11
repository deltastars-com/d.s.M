/**
 * نظام تفعيل حسابات العملاء المميزين (VIP)
 * يتضمن:
 * - التحقق برقم الهاتف
 * - إرسال كود التحقق (OTP)
 * - تعيين كلمة مرور افتراضية
 * - حفظ البصمة والتعرف على الوجه
 */

interface VIPAccount {
  id: string;
  phone: string;
  email?: string;
  status: 'pending' | 'verified' | 'active';
  otp?: string;
  otpExpiry?: number;
  password?: string;
  biometricData?: {
    fingerprint?: string;
    faceId?: string;
  };
  createdAt: Date;
  verifiedAt?: Date;
  activatedAt?: Date;
}

interface OTPRequest {
  phone: string;
  timestamp: number;
  attempts: number;
}

// قاموس لتخزين حسابات VIP (في الإنتاج، يتم حفظها في قاعدة البيانات)
const vipAccounts = new Map<string, VIPAccount>();
const otpRequests = new Map<string, OTPRequest>();

/**
 * إنشاء كود التحقق (OTP) عشوائي
 */
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * إنشاء كلمة مرور افتراضية
 */
function generateDefaultPassword(): string {
  return `VIP${Date.now().toString().slice(-6)}`;
}

/**
 * طلب تفعيل حساب VIP برقم الهاتف
 */
export function requestVIPActivation(phone: string, email?: string) {
  try {
    // التحقق من صيغة رقم الهاتف
    if (!phone || phone.length < 9) {
      return {
        success: false,
        message: 'رقم الهاتف غير صحيح',
      };
    }

    // التحقق من عدم وجود حساب مسبقاً
    const existingAccount = Array.from(vipAccounts.values()).find(
      (acc) => acc.phone === phone
    );

    if (existingAccount && existingAccount.status === 'active') {
      return {
        success: false,
        message: 'هذا الرقم مسجل بالفعل',
      };
    }

    // إنشاء حساب جديد
    const accountId = `VIP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const otp = generateOTP();

    const account: VIPAccount = {
      id: accountId,
      phone,
      email,
      status: 'pending',
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000, // صلاحية 10 دقائق
      createdAt: new Date(),
    };

    vipAccounts.set(accountId, account);

    // تسجيل محاولة الطلب
    otpRequests.set(phone, {
      phone,
      timestamp: Date.now(),
      attempts: 1,
    });

    // في الإنتاج، يتم إرسال الكود عبر SMS
    console.log(`OTP للهاتف ${phone}: ${otp}`);

    return {
      success: true,
      message: 'تم إرسال كود التحقق إلى هاتفك',
      accountId,
      phone: phone.slice(-4), // إظهار آخر 4 أرقام فقط
      expiresIn: 600, // 10 دقائق
    };
  } catch (error) {
    console.error('خطأ في طلب التفعيل:', error);
    return {
      success: false,
      message: 'حدث خطأ في الطلب',
    };
  }
}

/**
 * التحقق من كود OTP وتفعيل الحساب
 */
export function verifyOTPAndActivate(accountId: string, otp: string) {
  try {
    const account = vipAccounts.get(accountId);

    if (!account) {
      return {
        success: false,
        message: 'الحساب غير موجود',
      };
    }

    // التحقق من انتهاء صلاحية الكود
    if (!account.otpExpiry || Date.now() > account.otpExpiry) {
      return {
        success: false,
        message: 'انتهت صلاحية الكود',
      };
    }

    // التحقق من صحة الكود
    if (account.otp !== otp) {
      return {
        success: false,
        message: 'الكود غير صحيح',
      };
    }

    // تعيين كلمة مرور افتراضية
    const defaultPassword = generateDefaultPassword();

    // تحديث الحساب
    account.status = 'verified';
    account.password = defaultPassword;
    account.verifiedAt = new Date();
    account.otp = undefined;
    account.otpExpiry = undefined;

    vipAccounts.set(accountId, account);

    return {
      success: true,
      message: 'تم التحقق بنجاح',
      accountId,
      phone: account.phone,
      defaultPassword, // يجب تغييرها عند أول دخول
      nextStep: 'تغيير كلمة المرور',
    };
  } catch (error) {
    console.error('خطأ في التحقق:', error);
    return {
      success: false,
      message: 'حدث خطأ في التحقق',
    };
  }
}

/**
 * تغيير كلمة المرور
 */
export function changePassword(accountId: string, oldPassword: string, newPassword: string) {
  try {
    const account = vipAccounts.get(accountId);

    if (!account) {
      return {
        success: false,
        message: 'الحساب غير موجود',
      };
    }

    if (account.password !== oldPassword) {
      return {
        success: false,
        message: 'كلمة المرور القديمة غير صحيحة',
      };
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
      };
    }

    account.password = newPassword;
    vipAccounts.set(accountId, account);

    return {
      success: true,
      message: 'تم تغيير كلمة المرور بنجاح',
    };
  } catch (error) {
    console.error('خطأ في تغيير كلمة المرور:', error);
    return {
      success: false,
      message: 'حدث خطأ في تغيير كلمة المرور',
    };
  }
}

/**
 * حفظ بيانات البصمة
 */
export function saveBiometricData(
  accountId: string,
  biometricType: 'fingerprint' | 'faceId',
  biometricData: string
) {
  try {
    const account = vipAccounts.get(accountId);

    if (!account) {
      return {
        success: false,
        message: 'الحساب غير موجود',
      };
    }

    if (!account.biometricData) {
      account.biometricData = {};
    }

    account.biometricData[biometricType] = biometricData;
    account.status = 'active';
    account.activatedAt = new Date();

    vipAccounts.set(accountId, account);

    return {
      success: true,
      message: `تم حفظ ${biometricType === 'fingerprint' ? 'البصمة' : 'التعرف على الوجه'} بنجاح`,
      accountId,
    };
  } catch (error) {
    console.error('خطأ في حفظ البيانات البيومترية:', error);
    return {
      success: false,
      message: 'حدث خطأ في حفظ البيانات',
    };
  }
}

/**
 * التحقق من البصمة للدخول
 */
export function verifyBiometric(accountId: string, biometricType: 'fingerprint' | 'faceId', biometricData: string) {
  try {
    const account = vipAccounts.get(accountId);

    if (!account) {
      return {
        success: false,
        message: 'الحساب غير موجود',
      };
    }

    if (!account.biometricData || !account.biometricData[biometricType]) {
      return {
        success: false,
        message: 'لم يتم حفظ بيانات بيومترية',
      };
    }

    // في الإنتاج، يتم استخدام مكتبة بيومترية حقيقية
    if (account.biometricData[biometricType] === biometricData) {
      return {
        success: true,
        message: 'تم التحقق بنجاح',
        accountId,
        phone: account.phone,
        loginToken: `TOKEN-${Date.now()}`,
      };
    }

    return {
      success: false,
      message: 'البيانات البيومترية غير صحيحة',
    };
  } catch (error) {
    console.error('خطأ في التحقق البيومتري:', error);
    return {
      success: false,
      message: 'حدث خطأ في التحقق',
    };
  }
}

/**
 * الحصول على معلومات الحساب
 */
export function getVIPAccountInfo(accountId: string) {
  try {
    const account = vipAccounts.get(accountId);

    if (!account) {
      return {
        success: false,
        message: 'الحساب غير موجود',
      };
    }

    return {
      success: true,
      accountId: account.id,
      phone: account.phone,
      email: account.email,
      status: account.status,
      hasBiometric: {
        fingerprint: !!account.biometricData?.fingerprint,
        faceId: !!account.biometricData?.faceId,
      },
      createdAt: account.createdAt,
      activatedAt: account.activatedAt,
    };
  } catch (error) {
    console.error('خطأ في الحصول على معلومات الحساب:', error);
    return {
      success: false,
      message: 'حدث خطأ',
    };
  }
}

/**
 * إعادة تعيين كلمة المرور
 */
export function resetPassword(phone: string) {
  try {
    const account = Array.from(vipAccounts.values()).find((acc) => acc.phone === phone);

    if (!account) {
      return {
        success: false,
        message: 'رقم الهاتف غير مسجل',
      };
    }

    const otp = generateOTP();
    account.otp = otp;
    account.otpExpiry = Date.now() + 10 * 60 * 1000;

    vipAccounts.set(account.id, account);

    return {
      success: true,
      message: 'تم إرسال كود التحقق',
      accountId: account.id,
      expiresIn: 600,
    };
  } catch (error) {
    console.error('خطأ في إعادة تعيين كلمة المرور:', error);
    return {
      success: false,
      message: 'حدث خطأ',
    };
  }
}

export { VIPAccount, OTPRequest };
