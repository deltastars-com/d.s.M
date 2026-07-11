# 📱 دليل البناء الشامل - Complete Build Guide
## متجر نجوم دلتا - Delta Stars E-Commerce

---

## 📋 المحتويات

1. [المتطلبات](#المتطلبات)
2. [البناء المحلي](#البناء-المحلي)
3. [البناء عبر GitHub Actions](#البناء-عبر-github-actions)
4. [البناء عبر Dude Magic](#البناء-عبر-dude-magic)
5. [البناء عبر Docker](#البناء-عبر-docker)
6. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## ✅ المتطلبات

### المتطلبات الأساسية:

```bash
# Node.js 18+
node --version

# npm 9+
npm --version

# Java 11+
java -version

# Gradle 8+
gradle --version
```

### التثبيت على Windows:

```bash
# 1. تثبيت Node.js
# https://nodejs.org/

# 2. تثبيت Java
# https://www.oracle.com/java/technologies/downloads/

# 3. تثبيت Gradle
# https://gradle.org/install/

# 4. تثبيت Android Studio
# https://developer.android.com/studio
```

### التثبيت على Mac:

```bash
# استخدام Homebrew
brew install node
brew install java
brew install gradle
brew install android-studio
```

### التثبيت على Linux:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nodejs npm openjdk-11-jdk gradle

# Fedora
sudo dnf install nodejs npm java-11-openjdk gradle
```

---

## 🏗️ البناء المحلي

### الطريقة 1: باستخدام Expo CLI

```bash
# 1. تثبيت Expo CLI
npm install -g expo-cli

# 2. تسجيل الدخول
expo login

# 3. بناء APK
expo build:android

# 4. بناء IPA
expo build:ios
```

### الطريقة 2: باستخدام EAS CLI (الموصى به)

```bash
# 1. تثبيت EAS CLI
npm install -g eas-cli

# 2. تسجيل الدخول
eas login

# 3. بناء APK
eas build --platform android --type apk

# 4. بناء IPA
eas build --platform ios --type ipa

# 5. تحميل الملفات
eas build:list
eas build:download --id <BUILD_ID>
```

### الطريقة 3: باستخدام السكريبت المخصص

```bash
# جعل السكريبت قابل للتنفيذ
chmod +x build.sh

# تشغيل البناء
./build.sh
```

---

## 🤖 البناء عبر GitHub Actions

### الإعدادات المطلوبة:

1. **إضافة Secrets إلى GitHub:**

```bash
# اذهب إلى:
# Settings → Secrets and variables → Actions

# أضف:
EXPO_USERNAME=your_username
EXPO_PASSWORD=your_password
GITHUB_TOKEN=your_token
KEYSTORE_PASSWORD=your_password
KEY_PASSWORD=your_password
```

2. **البناء التلقائي:**

```bash
# البناء يحدث تلقائياً عند:
# - Push إلى main أو develop
# - Pull Request
# - يدوياً عبر workflow_dispatch
```

3. **تحميل الملفات:**

```bash
# الملفات متاحة في:
# Actions → Build APK & IPA → Artifacts
```

---

## 🪄 البناء عبر Dude Magic

### الإعدادات:

1. **ربط المستودع:**

```bash
# اذهب إلى Dude Magic
# اختر: Connect Repository
# اختر: deltastars-com/D.S.V3
```

2. **إعدادات البناء:**

```yaml
# في .dudemagic.yml
environments:
  production:
    build: eas build --platform android --type apk
```

3. **البناء التلقائي:**

```bash
# البناء يحدث عند:
# - Push إلى main
# - جدولة يومية
# - يدويا
```

---

## 🐳 البناء عبر Docker

### الطريقة 1: باستخدام docker-compose

```bash
# بناء APK
docker-compose run builder

# بناء IPA
docker-compose run builder npm run build:ipa

# تشغيل الاختبارات
docker-compose run tester

# بيئة التطوير
docker-compose up dev
```

### الطريقة 2: باستخدام Dockerfile مباشرة

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

---

## 📝 ملفات البناء المتوفرة

### 1. `.github/workflows/build-apk.yml`
- بناء تلقائي عبر GitHub Actions
- يدعم APK و IPA
- إنشاء Releases تلقائي

### 2. `.dudemagic.yml`
- إعدادات Dude Magic
- جدولة البناء
- التكامل مع الخدمات

### 3. `Dockerfile`
- بيئة البناء المعزولة
- جميع المكتبات المطلوبة
- سهل الاستخدام

### 4. `docker-compose.yml`
- خدمات متعددة
- البناء والاختبار والتطوير
- إدارة سهلة

### 5. `build.sh`
- سكريبت بناء محلي
- تقارير مفصلة
- معالجة الأخطاء

---

## 🔑 إدارة الشهادات

### Keystore للأندرويد:

```bash
# الملف موجود في:
# deltastars.keystore

# بيانات الاعتماد:
# - Alias: deltastars
# - Password: (موجود في KEYSTORE_CREDENTIALS.txt)
# - Validity: 10,000 days
```

### شهادات iOS:

```bash
# يجب إنشاء:
# 1. Apple Developer Account
# 2. Provisioning Profile
# 3. Distribution Certificate
# 4. App ID
```

---

## 📊 مراقبة البناء

### GitHub Actions:

```bash
# اذهب إلى:
# Repository → Actions → Build APK & IPA

# شاهد:
# - حالة البناء
# - السجلات
# - الملفات المُنتجة
```

### Dude Magic:

```bash
# اذهب إلى:
# Dashboard → Builds

# شاهد:
# - سجل البناء
# - الأخطاء
# - الملفات
```

---

## ⚠️ استكشاف الأخطاء

### خطأ: "npm packages not found"

```bash
# الحل:
npm install --legacy-peer-deps
```

### خطأ: "Java not found"

```bash
# التحقق:
java -version

# التثبيت:
# Windows: https://www.oracle.com/java/
# Mac: brew install java
# Linux: sudo apt-get install openjdk-11-jdk
```

### خطأ: "Gradle not found"

```bash
# التحقق:
gradle --version

# التثبيت:
# https://gradle.org/install/
```

### خطأ: "Expo login failed"

```bash
# التحقق من البيانات:
eas whoami

# إعادة تسجيل الدخول:
eas logout
eas login
```

### خطأ: "Build failed"

```bash
# عرض السجلات:
eas build:list
eas build:view --id <BUILD_ID>

# إعادة المحاولة:
eas build --platform android --type apk --non-interactive
```

---

## 📈 الأداء والتحسينات

### تسريع البناء:

```bash
# استخدام الذاكرة المؤقتة:
npm ci --prefer-offline --no-audit

# بناء متوازي:
export GRADLE_OPTS="-Dorg.gradle.parallel=true"
```

### تقليل حجم APK:

```bash
# تفعيل ProGuard:
# في app.json
"android": {
  "enableProguard": true
}

# تفعيل Minification:
"android": {
  "minifyEnabled": true
}
```

---

## 🚀 النشر على المتاجر

### جوجل بلاي:

```bash
# 1. إنشاء حساب جوجل بلاي
# 2. إنشاء تطبيق جديد
# 3. رفع APK/AAB
# 4. إضافة المعلومات والصور
# 5. النشر
```

### App Store:

```bash
# 1. إنشاء حساب Apple Developer
# 2. إنشاء App ID
# 3. رفع IPA
# 4. إضافة المعلومات والصور
# 5. النشر
```

---

## 📞 الدعم والمساعدة

- **البريد:** support@deltastars.store
- **الهاتف:** +966 92 002 3204
- **واتساب:** +966 92 002 3204

---

## 📚 المراجع

- [Expo Documentation](https://docs.expo.dev/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [React Native Documentation](https://reactnative.dev/)
- [Android Build Documentation](https://developer.android.com/build)
- [iOS Build Documentation](https://developer.apple.com/build/)

---

**آخر تحديث:** 7 يوليو 2026
