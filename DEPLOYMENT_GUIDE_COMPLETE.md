# 📱 دليل النشر الشامل - Complete Deployment Guide
## متجر نجوم دلتا - Delta Stars E-Commerce

---

## 📋 المحتويات

1. [البناء التلقائي](#البناء-التلقائي)
2. [النشر على Google Play](#النشر-على-google-play)
3. [النشر على App Store](#النشر-على-app-store)
4. [إدارة الإصدارات](#إدارة-الإصدارات)
5. [المراقبة والتحديثات](#المراقبة-والتحديثات)

---

## 🤖 البناء التلقائي

### GitHub Actions

#### الخطوة 1: إضافة Secrets

```
Settings → Secrets and variables → Actions

أضف:
- EXPO_USERNAME: your_expo_username
- EXPO_PASSWORD: your_expo_password
- KEYSTORE_PASSWORD: your_keystore_password
- KEY_PASSWORD: your_key_password
- GOOGLE_PLAY_SERVICE_ACCOUNT: (JSON file content)
- APPLE_ID: your_apple_id
- APPLE_PASSWORD: your_apple_password
- APPLE_TEAM_ID: your_team_id
```

#### الخطوة 2: تشغيل البناء

```bash
# البناء يحدث تلقائياً عند:
# 1. Push إلى main
# 2. فتح Pull Request
# 3. يدويا عبر workflow_dispatch

# شاهد الحالة في:
# Actions → Build APK & IPA
```

### Dude Magic

#### الخطوة 1: الإعدادات

```bash
# 1. اذهب إلى Dude Magic
# 2. اختر: Connect Repository
# 3. اختر: deltastars-com/D.S.V3
# 4. اختر: main branch
```

#### الخطوة 2: البناء التلقائي

```yaml
# البناء يحدث:
# - يومياً الساعة 2 صباحاً
# - أسبوعياً يوم الأحد
# - عند كل push
```

### Docker

#### الطريقة 1: Docker Compose

```bash
# بناء APK
docker-compose run builder

# بناء IPA
docker-compose run builder npm run build:ipa

# بيئة التطوير
docker-compose up dev
```

#### الطريقة 2: Dockerfile

```bash
# بناء الصورة
docker build -t deltastars:latest .

# تشغيل البناء
docker run -it \
  -e EXPO_USERNAME=your_username \
  -e EXPO_PASSWORD=your_password \
  -v $(pwd):/app \
  deltastars:latest
```

### Local Build

```bash
# جعل السكريبت قابل للتنفيذ
chmod +x build.sh

# تشغيل البناء
./build.sh

# النتائج في:
# ./dist/deltastars-YYYYMMDD_HHMMSS.apk
# ./dist/deltastars-YYYYMMDD_HHMMSS.ipa
```

---

## 🚀 النشر على Google Play

### المتطلبات

1. **حساب Google Play Developer**
   - https://play.google.com/console
   - رسم التسجيل: $25 (مرة واحدة)

2. **Service Account**
   - اذهب إلى Google Cloud Console
   - أنشئ Service Account
   - حمّل JSON Key

3. **التطبيق**
   - أنشئ تطبيق جديد
   - أضف التفاصيل الأساسية

### خطوات النشر

#### الخطوة 1: إعداد التطبيق

```bash
# 1. اذهب إلى Google Play Console
# 2. اختر: Create app
# 3. أدخل اسم التطبيق: "Delta Stars"
# 4. اختر الفئة: Shopping
# 5. اختر: Create
```

#### الخطوة 2: إضافة المعلومات

```bash
# اذهب إلى: App information

# أضف:
- App name: Delta Stars
- Short description: Shop 235+ products
- Full description: (من google-play-config.json)
- Category: Shopping
- Content rating: PEGI 3
- Privacy policy: https://deltastars.store/privacy-policy
```

#### الخطوة 3: إضافة الصور

```bash
# اذهب إلى: Store listing

# أضف:
- Icon: 512x512 PNG
- Feature graphic: 1024x500 PNG
- Screenshots: 5 صور (1080x1920)
- Video: (اختياري)
```

#### الخطوة 4: رفع APK

```bash
# الطريقة 1: يدويا
# 1. اذهب إلى: Testing → Internal testing
# 2. اختر: Create new release
# 3. رفع APK
# 4. أضف Release notes

# الطريقة 2: تلقائياً
# استخدم GitHub Actions أو Dude Magic
```

#### الخطوة 5: الاختبار

```bash
# 1. اختر: Testing → Internal testing
# 2. أضف المختبرين
# 3. شارك رابط الاختبار
# 4. اختبر على الأجهزة الفعلية
```

#### الخطوة 6: النشر

```bash
# 1. اذهب إلى: Release → Production
# 2. اختر: Create new release
# 3. رفع APK
# 4. أضف Release notes
# 5. اختر: Review release
# 6. اختر: Start rollout to Production
```

### ملف الإعدادات

```json
{
  "package_name": "com.deltastars.app",
  "app_name": "Delta Stars",
  "version": "1.0.0",
  "category": "SHOPPING",
  "content_rating": "PEGI_3"
}
```

---

## 🍎 النشر على App Store

### المتطلبات

1. **حساب Apple Developer**
   - https://developer.apple.com
   - رسم الاشتراك السنوي: $99

2. **شهادات التوقيع**
   - Distribution Certificate
   - Provisioning Profile
   - App ID

3. **App Store Connect**
   - https://appstoreconnect.apple.com
   - أنشئ تطبيق جديد

### خطوات النشر

#### الخطوة 1: إعداد App ID

```bash
# 1. اذهب إلى: Certificates, Identifiers & Profiles
# 2. اختر: Identifiers
# 3. اختر: App IDs
# 4. اختر: Create new identifier
# 5. اختر: App IDs
# 6. أدخل:
#    - Description: Delta Stars
#    - Bundle ID: com.deltastars.app
#    - Capabilities: Push Notifications, Biometric
```

#### الخطوة 2: إنشاء Provisioning Profile

```bash
# 1. اذهب إلى: Profiles
# 2. اختر: Create new profile
# 3. اختر: App Store
# 4. اختر: App ID: com.deltastars.app
# 5. اختر: Certificate
# 6. أدخل: Profile Name: Delta Stars Distribution
# 7. حمّل الملف
```

#### الخطوة 3: إعداد التطبيق

```bash
# 1. اذهب إلى: App Store Connect
# 2. اختر: My Apps
# 3. اختر: Create new app
# 4. أدخل:
#    - Platform: iOS
#    - Name: Delta Stars
#    - Bundle ID: com.deltastars.app
#    - SKU: DELTASTARS001
```

#### الخطوة 4: إضافة المعلومات

```bash
# اذهب إلى: App Information

# أضف:
- App name: Delta Stars
- Subtitle: E-commerce Shopping Platform
- Description: (من app-store-config.json)
- Category: Shopping
- Privacy Policy: https://deltastars.store/privacy-policy
- Support URL: https://deltastars.store/support
```

#### الخطوة 5: إضافة الصور

```bash
# اذهب إلى: App Preview

# أضف:
- App Icon: 1024x1024 PNG
- Screenshots: 5 صور (1242x2208 أو 1125x2436)
- Preview Video: (اختياري)
- Promotional Artwork: 1200x628 PNG
```

#### الخطوة 6: رفع IPA

```bash
# الطريقة 1: Xcode
# 1. فتح Xcode
# 2. اختر: Product → Archive
# 3. اختر: Distribute App
# 4. اختر: App Store Connect
# 5. اختر: Upload

# الطريقة 2: Transporter
# 1. حمّل Transporter من App Store
# 2. اختر: Select app
# 3. اختر: IPA file
# 4. اختر: Deliver
```

#### الخطوة 7: الاختبار

```bash
# 1. اذهب إلى: TestFlight
# 2. اختر: Create new build
# 3. رفع IPA
# 4. أضف المختبرين
# 5. شارك رابط الاختبار
```

#### الخطوة 8: النشر

```bash
# 1. اذهب إلى: App Store
# 2. اختر: Version Release
# 3. أضف Release notes
# 4. اختر: Save
# 5. اختر: Submit for Review
# 6. اختر: Submit
```

### ملف الإعدادات

```json
{
  "bundle_id": "com.deltastars.app",
  "app_name": "Delta Stars",
  "version": "1.0.0",
  "minimum_os_version": "14.0"
}
```

---

## 📦 إدارة الإصدارات

### إنشاء إصدار جديد

```bash
# 1. تحديث الإصدار
# في app.json و package.json
# version: "1.0.1"

# 2. إنشاء tag
git tag -a v1.0.1 -m "Release version 1.0.1"

# 3. رفع التغييرات
git push origin main
git push origin v1.0.1

# 4. إنشاء Release على GitHub
# GitHub سيُنشئ Release تلقائياً
```

### ملف Release Notes

```markdown
## Delta Stars v1.0.1

### ✨ الميزات الجديدة
- إضافة ميزة البحث المتقدم
- تحسين أداء التطبيق

### 🐛 إصلاح الأخطاء
- إصلاح مشكلة الدفع
- إصلاح مشكلة تسجيل الدخول

### 📱 التوافق
- Android 8.0+
- iOS 14.0+

### 🙏 شكراً
شكراً لاستخدامك Delta Stars!
```

---

## 📊 المراقبة والتحديثات

### مراقبة الأداء

```bash
# Google Play Console
# 1. اذهب إلى: Metrics
# 2. شاهد:
#    - Downloads
#    - Active installs
#    - Crashes
#    - ANRs

# App Store Connect
# 1. اذهب إلى: Analytics
# 2. شاهد:
#    - Downloads
#    - Active devices
#    - Crashes
```

### التحديثات

```bash
# إصدار تحديث جديد

# 1. تحديث الكود
# 2. تحديث الإصدار
# 3. بناء APK و IPA
# 4. رفع على المتاجر
# 5. مراقبة الأداء
```

---

## ⚠️ ملاحظات مهمة

1. **الشهادات:**
   - احفظ جميع الشهادات بأمان
   - لا تشارك Keystore أو Certificates

2. **الأمان:**
   - استخدم Secrets لجميع البيانات الحساسة
   - فعّل المصادقة الثنائية

3. **الاختبار:**
   - اختبر على أجهزة فعلية
   - اختبر جميع الميزات
   - اختبر الأداء

4. **الامتثال:**
   - اتبع سياسات Google و Apple
   - احرص على الخصوصية
   - احرص على الأمان

---

## 📞 الدعم

- **البريد:** support@deltastars.store
- **الهاتف:** +966 92 002 3204
- **الموقع:** https://deltastars.store

---

## 📚 المراجع

- [Google Play Console](https://play.google.com/console)
- [App Store Connect](https://appstoreconnect.apple.com)
- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)

---

**آخر تحديث:** 8 يوليو 2026

✅ **جاهز للنشر على المتاجر!**
