# 🌟 Delta Stars — نجوم دلتا v2.1.0

منصة توصيل خضروات وفواكه متكاملة (متجر ويب + PWA + Android + iOS).

## 🚀 البدء السريع

```bash
# 1. تثبيت التبعيات
npm install --legacy-peer-deps

# 2. نسخ ملف البيئة
cp .env.example .env
# ثم عبّئ المفاتيح الحقيقية في .env

# 3. تشغيل التطوير
npm run dev

# 4. بناء الإنتاج
npm run build
```

## 📱 بناء تطبيقات Android/iOS

### الطريقة الموصى بها: GitHub Actions
1. ارفع المشروع على GitHub.
2. أضف الأسرار (راجع `DEPLOYMENT.md`).
3. اذهب لـ Actions → **Build Android APK & AAB** → Run.
4. حمّل APK/AAB من Artifacts.

### يدوياً (يتطلب Android Studio + Xcode)
```bash
npm run build:apk    # Android APK
npm run build:aab    # Android AAB (Google Play)
npm run build:ios    # iOS project (يفتح Xcode)
```

## 📚 الوثائق

| الملف | المحتوى |
|---|---|
| `DEPLOYMENT.md` | خطوات النشر الكاملة (GitHub, Netlify, Codemagic, Google Play, App Store) |
| `OPERATIONS.md` | دليل التشغيل، البوابات، الأقسام |
| `STORE_PUBLISHING_GUIDE.md` | إرشادات مفصّلة للنشر على المتاجر |
| `DELTA_STARS_SYSTEM_GUIDE.md` | الدليل الكامل للنظام والتقنيات |
| `OWNERSHIP.md` | ملكية الشيفرة |
| `LICENSE` | الترخيص |
| `android/keystore/README-keys.md` | إدارة مفاتيح التوقيع |

## 🔐 مفاتيح التوقيع (Android)

- الموقع: `android/keystore/deltastars-release.keystore`
- كلمة السر الافتراضية: `deltastars2026` ⚠️ **غيّرها قبل النشر**
- SHA-256: `09:F4:4A:95:BD:8A:9F:B4:FE:50:4A:BE:F8:F6:0D:0E:BC:85:E7:0A:2A:5E:20:D6:12:08:37:86:4E:33:B6:94`

## 🌐 سياسة الخصوصية

- HTML: `public/privacy-policy.html`
- PDF: `public/privacy-policy.pdf`
- الرابط بعد النشر: `https://YOUR-DOMAIN/privacy-policy.html`

## 🎯 التقنيات

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Supabase (PostgreSQL) + Netlify Functions
- **Native**: Capacitor 6 (Android + iOS)
- **Payment**: Moyasar (Saudi PCI-DSS)
- **Auth**: Supabase Auth + WebAuthn (بصمة/وجه)
- **Maps**: OpenStreetMap + Leaflet (مجاني)
- **AI**: Gemini + قاعدة معرفة محلية (237 منتج)
- **Notifications**: Firebase Cloud Messaging
- **SMS**: Authentica
- **PWA**: Service Worker + manifest.json

## 📞 الدعم

- 📧 support@deltastars.sa
- 🌐 https://deltastars.sa
- 👤 المالك: علي الدحان

---
© 2026 Delta Stars — All rights reserved
