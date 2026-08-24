# 🚀 Delta Stars — دليل النشر الكامل

## 📋 ملخص الحزمة

### 🌐 نشر الويب (PWA)
| المنصة | الحالة | الأمر |
|--------|--------|-------|
| Netlify | ✅ جاهز | `netlify.toml` موجود |
| Vercel | ✅ جاهز | `vercel.json` موجود |
| EdgeOne | ✅ جاهز | `edgeone.json` موجود |

### 📱 التطبيقات الأصلية
| المنصة | الحالة | الملفات |
|--------|--------|---------|
| Android APK | ✅ جاهز | `android/` + `capacitor.config.ts` |
| Android AAB | ✅ جاهز | `android/` + signing config |
| iOS | ✅ جاهز | `ios/` + Info.plist |

---

## 🌐 1. نشر الويب على Netlify

### الخطوات:
1. ادخل على [app.netlify.com](https://app.netlify.com)
2. اضغط "Add new site" → "Import an existing project"
3. اختر GitHub → اختر مستودع `delta-stars`
4. الإعدادات التلقائية:
   - Build command: `bun run build`
   - Publish directory: `dist`
5. اضغط "Deploy site"

### إعدادات DNS:
```
CNAME → your-site.netlify.app
```

---

## 🌐 2. نشر على Vercel

### الخطوات:
1. ادخل على [vercel.com](https://vercel.com)
2. اضغط "New Project" → "Import Git Repository"
3. اختر مستودع `delta-stars`
4. الإعدادات التلقائية (vercel.json):
   - Framework: Vite
   - Build command: `bun run build`
   - Output directory: `dist`
5. اضغط "Deploy"

### إعدادات DNS:
```
A Record → 76.76.21.21
CNAME → cname.vercel-dns.com
```

---

## 🌐 3. نشر على EdgeOne

### الخطوات:
1. ادخل على [pages.edgeone.com](https://pages.edgeone.com)
2. اضغط "Connect Repository"
3. اختر مستودع `delta-stars`
4. الإعدادات:
   - Build command: `bun run build`
   - Output directory: `dist`
5. اضغط "Deploy"

---

## 📱 4. بناء تطبيق Android (APK + AAB)

### المتطلبات:
- Android Studio
- JDK 17
- Android SDK

### بناء APK (للتجربة):
```bash
# 1. بناء الويب
bun run build

# 2. مزامنة Capacitor
npx cap sync android

# 3. فتح Android Studio
npx cap open android

# 4. من Android Studio:
#    Build → Build Bundle(s) / APK(s) → Build APK(s)
```

### بناء AAB (لمتجر Google Play):
```bash
# من Android Studio:
# Build → Generate Signed Bundle / APK
# اختر Android App Bundle
# أدخل معلومات التوقيع
```

### التوقيع الرقمي:
```bash
# إنشاء keystore
keytool -genkey -v -keystore deltastars-release.keystore \
  -alias deltastars -keyalg RSA -keysize 2048 -validity 10000

#🅅 القيم:
# Key store password: [اختر كلمة مرور]
# Key alias: deltastars
# Key password: [اختر كلمة مرور]
# First/Last name: Ali Aldahan
# Organization: Delta Stars Trading
# City: Jeddah
# State: Riyadh
# Country: SA
```

---

## 🍎 5. بناء تطبيق iOS

### المتطلبات:
- macOS مع Xcode 15+
- Apple Developer Account
- CocoaPods

### خطوات البناء:
```bash
# 1. بناء الويب
bun run build

# 2. مزامنة Capacitor
npx cap sync ios

# 3. فتح Xcode
npx cap open ios

# 4. من Xcode:
#    - اختر "App" من Project Navigator
#    - Bundle Identifier: com.deltastars.app
#    - Signing: اختر Team
#    - اضغط Run (▶) للتجربة على جهاز
```

### رفع على App Store:
```bash
# من Xcode:
# Product → Archive
# اضغط "Distribute App" → "App Store Connect"
# اتبع الخطوات
```

---

## 📦 6. إعدادات Google Play Store

### المتطلبات:
- حساب مطور Google Play ($25 سنوياً)
- لogo 512x512
- لogo 1024x500 (Feature Graphic)
- لقطات شاشة (2-8 صور)
- وصف التطبيق

### لقطات الشاشة المطلوبة:
```
 phone_4.7.png    (1080x1920)
 phone_5.5.png    (1080x1920)
 phone_6.7.png    (1080x1920)
 tablet_7.png     (1200x1920)
 tablet_10.png    (1200x1920)
```

### وصف التطبيق (5000 حرف):
```
🌟 نجوم دلتا — متجر الخضروات والفواكه والتمور

أجود المنتجات الطازجة في المملكة العربية السعودية
توصيل مبرّد سريع لجميع المناطق

✅ مميزات التطبيق:
• أكثر من 237 منتج طازج
• 6 فروع في جميع أنحاء المملكة
• توصيل مبرّد مجاني فوق 200 ريال
• دفع آمن (مدى، فيزا، ماستركارد)
• تتبع الطلب مباشرة
• عروض وخصومات حصرية

📱 تجربة متجر احترافية:
• واجهة عربية متكاملة
• بحث وفلترة متقدمة
• سلة مشتريات ذكية
• حساب تلقائي للضريبة
• إشعارات فورية

🔒 الأمان والخصوصية:
• حماية بيانات مشتريين
• تشفير كامل للبيانات
• نظام بصمة و Face ID
• سياسة خصوصية واضحة

📞 تواصل معنا:
• هاتف: 0558828009
• واتساب: 0558828009
• بريد: info@deltastars-ksa.com
• موقع: https://deltastars.store

🏢 فروعنا:
جدة | الرياض | الدمام | أبها | خميس مشيط | القصيم

© 2026 شركة نجوم دلتا للتجارة — جميع الحقوق محفوظة
```

---

## 🔄 7. التحديثات التلقائية

### Android (In-App Updates):
التطبيق يستخدم Capacitor App plugin للتحقق من التحديثات تلقائياً.

### iOS:
يتم التحديث عبر App Store بشكل طبيعي.

---

## 📋 8. قائمة الملفات المطلوبة للمتجر

### Google Play:
- [x] APK أو AAB موقّع
- [x] لogo 512x512 PNG
- [x] Feature Graphic 1024x500
- [x] لقطات شاشة (5-8)
- [x] وصف التطبيق
- [x] سياسة الخصوصية URL
- [x] شروط الخدمة URL

### Apple App Store:
- [x] IPA موقّع
- [x] لogo 1024x1024 PNG
- [x] لقطات شاشة
- [x] وصف التطبيق
- [x] سياسة الخصوصية URL
- [x] Privacy Nutrition Labels

---

## ⚡ أوامر مختصرة

```bash
# بناء الويب
bun run build

# بناء Android
bun run build:android

# بناء iOS
bun run build:ios

# مزامنة Capacitor
npx cap sync

# فتح Android Studio
npx cap open android

# فتح Xcode
npx cap open ios
```
