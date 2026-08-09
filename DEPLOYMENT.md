# 🚀 دليل النشر الشامل - Delta Stars

## المحتويات
1. [النشر السريع على GitHub](#1-github)
2. [بناء APK/AAB تلقائياً](#2-apk-aab)
3. [رفع الويب على Netlify](#3-netlify)
4. [رفع iOS عبر Codemagic](#4-ios)
5. [النشر على Google Play](#5-google-play)
6. [النشر على App Store](#6-app-store)
7. [تحديث كلمات السر قبل الإطلاق](#7-security)

---

## 1. النشر السريع على GitHub {#1-github}

```bash
# 1. أنشئ repo على github.com/aliadhan/deltastars (private)
cd DeltaStars-FINAL-v2.0.0

git init
git add .
git commit -m "🚀 Initial commit - Delta Stars v2.1.0"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/deltastars.git
git push -u origin main
```

### أضف الأسرار إلى GitHub Actions
اذهب إلى: **Settings → Secrets and variables → Actions → New repository secret**

| Secret Name | القيمة |
|---|---|
| `VITE_SUPABASE_URL` | من ملف `.env` |
| `VITE_SUPABASE_ANON_KEY` | من ملف `.env` |
| `VITE_GEMINI_KEY` | من ملف `.env` |
| `VITE_MAPS_KEY` | من ملف `.env` |
| `VITE_FIREBASE_API_KEY` | من ملف `.env` |
| `VITE_FIREBASE_APP_ID` | من ملف `.env` |
| `VITE_MOYASAR_PUBLISHABLE_KEY` | من ملف `.env` |
| `MOYASAR_SECRET_KEY` | من ملف `.env` (للخادم فقط) |
| `SIGNING_KEYSTORE_BASE64` | `base64 android/keystore/deltastars-release.keystore` |
| `SIGNING_STORE_PASSWORD` | `deltastars2026` ⚠️ **غيّرها** |
| `SIGNING_KEY_ALIAS` | `deltastars` |
| `SIGNING_KEY_PASSWORD` | `deltastars2026` ⚠️ **غيّرها** |

---

## 2. بناء APK/AAB تلقائياً {#2-apk-aab}

بمجرد الرفع على GitHub:

### أ) بناء يدوي
1. اذهب إلى `Actions` في مستودعك.
2. اختر workflow: **🤖 Build Android APK & AAB**.
3. اضغط **Run workflow** → اختر `both` (APK + AAB).
4. انتظر 20-30 دقيقة.
5. حمّل الملفات من **Artifacts** في الأسفل.

### ب) بناء عند كل push
كل push إلى `main` أو `release` يُنتج APK/AAB جديد تلقائياً.

### ج) إصدار رسمي مع tag
```bash
git tag v2.1.0
git push origin v2.1.0
```
سيُنشئ GitHub Release تلقائياً مع الملفات المرفقة.

---

## 3. رفع الويب على Netlify {#3-netlify}

### الطريقة 1: عبر Netlify UI
1. اذهب إلى https://netlify.com → **Add new site → Import from Git**.
2. اربط مستودع GitHub.
3. **Build settings** (مُعدّة تلقائياً من `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
4. أضف متغيرات البيئة من `.env` في **Site settings → Environment variables**.
5. Deploy.

### الطريقة 2: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**سيصبح متاحاً على**: `https://deltastars.netlify.app` أو نطاقك الخاص.

---

## 4. رفع iOS عبر Codemagic {#4-ios}

1. اذهب إلى https://codemagic.io → **Add application** → اختر مستودعك.
2. Codemagic سيقرأ `codemagic.yaml` تلقائياً.
3. أضف الأسرار في **App settings → Environment variables**.
4. للتوقيع:
   - ارفع شهادة Apple Distribution (`.p12`).
   - ارفع Provisioning Profile.
   - أضف Apple Developer Account (Team ID).
5. **Start new build** → اختر `ios-workflow`.
6. النتيجة: ملف `.ipa` جاهز للرفع على App Store Connect.

---

## 5. النشر على Google Play {#5-google-play}

### أ) إنشاء حساب مطوّر
- **Google Play Console**: https://play.google.com/console (25$ لمرة واحدة).

### ب) إنشاء التطبيق
1. **All apps → Create app**.
2. اسم: `نجوم دلتا` أو `Delta Stars`.
3. App/Game: **App** | Free/Paid: **Free**.

### ج) إعداد صفحة المتجر
- **App icon** (512×512): `public/icon-512.png`
- **Feature graphic** (1024×500): `public/opengraph.jpg`
- **Screenshots** (على الأقل 2): التقطها من التطبيق.
- **Short description** (80 حرف): من `STORE_PUBLISHING_GUIDE.md`.
- **Full description**: من `STORE_PUBLISHING_GUIDE.md`.
- **Privacy Policy URL**: `https://deltastars.netlify.app/privacy-policy.html`
- **Category**: Food & Drink.

### د) Data Safety
- Location: ✅ (للتوصيل، اختياري، غير مباعة).
- Personal info: ✅ (الاسم، البريد، الهاتف، للحساب).
- Financial info: ✅ (تُعالج عبر Moyasar، لا نخزّن).
- Encryption in transit: ✅ Yes.

### هـ) رفع AAB
1. **Production → Create new release**.
2. ارفع `app-release.aab` من GitHub Artifacts.
3. **Release notes**: قائمة التحديثات.
4. **Review & Rollout** → 100%.

### و) وقت الموافقة
- Internal Testing: ساعات.
- Production: 3-7 أيام.

---

## 6. النشر على App Store {#6-app-store}

### أ) الحساب
- **Apple Developer Program**: https://developer.apple.com/programs/ (99$/سنة).

### ب) App Store Connect
1. **My Apps → +** → New App.
2. Platform: iOS | Name: `نجوم دلتا` | Bundle ID: `com.deltastars.app`.

### ج) رفع IPA
1. من Codemagic: حمّل `DeltaStars.ipa`.
2. استخدم **Transporter** (تطبيق Apple مجاني على macOS) لرفعه.
3. أو استخدم `xcrun altool --upload-app`.

### د) البيانات المطلوبة
- Icon: 1024×1024.
- Screenshots: 6.5" و 5.5" و iPad.
- Privacy Policy URL: `https://deltastars.netlify.app/privacy-policy.html`.
- App Review Info: اسم، بريد، رقم اختبار، حساب تجريبي.

### هـ) الموافقة
- المراجعة: 1-3 أيام عادةً.
- في حال الرفض: أصلح الملاحظات وأعِد التقديم.

---

## 7. تحديث كلمات السر قبل الإطلاق {#7-security}

### ⚠️ قبل النشر على المتاجر — إجباري:

```bash
cd android/keystore

# تغيير كلمة سر keystore
keytool -storepasswd -keystore deltastars-release.keystore
# أدخل الكلمة القديمة: deltastars2026
# أدخل الكلمة الجديدة: [كلمتك القوية]

# تغيير كلمة سر الـ alias
keytool -keypasswd -alias deltastars -keystore deltastars-release.keystore
```

ثم حدّث:
1. **`android/keystore.properties`** بالكلمات الجديدة.
2. **GitHub Secrets**: `SIGNING_STORE_PASSWORD`, `SIGNING_KEY_PASSWORD`.

### كذلك:
- ✅ فعّل **MFA** على حساب Google Play.
- ✅ فعّل **MFA** على Apple Developer.
- ✅ استبدل مفاتيح Moyasar التجريبية بمفاتيح الإنتاج.
- ✅ راجع Firestore Rules في `DRAFT_firestore.rules`.
- ✅ فعّل Firebase App Check.

---

## 📞 الدعم
- 📧 privacy@deltastars.sa
- 🌐 https://deltastars.sa
- 👤 المالك: علي الدحان

---

**© 2026 Delta Stars — Ali Aldahan**
