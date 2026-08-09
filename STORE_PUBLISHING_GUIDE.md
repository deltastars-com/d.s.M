# 📱 دليل نشر تطبيق نجوم دلتا على المتاجر

> **المالك:** علي الدحان (Ali Aldahan) — **حزمة التطبيق:** `com.deltastars.app`

---

## 🔑 أولاً: إنشاء مفتاح التوقيع (مرة واحدة فقط — احتفظ به للأبد)

```bash
keytool -genkeypair -v \
  -keystore deltastars-release.keystore \
  -alias deltastars \
  -keyalg RSA -keysize 4096 -validity 10950 \
  -storepass "كلمة_مرور_قوية" \
  -keypass "كلمة_مرور_قوية" \
  -dname "CN=Ali Aldahan, OU=DeltaStars, O=DeltaStars Trading, L=Abha, S=Asir, C=SA"
```

> ⚠️ **تحذير حاسم:** فقدان هذا الملف = **استحالة تحديث التطبيق للأبد**.
> احفظ نسخة في: قرص خارجي + خزنة سحابية مشفّرة + نسخة ورقية لكلمة المرور.

### تحويله لـ Base64 (لوضعه في أسرار GitHub)
```bash
base64 -w 0 deltastars-release.keystore > keystore.base64.txt
```

### إعداد `android/keystore.properties`
```properties
storeFile=deltastars-release.keystore
storePassword=كلمة_المرور
keyAlias=deltastars
keyPassword=كلمة_المرور
```

### استخراج بصمة SHA-256 (لـ Firebase و Deep Links)
```bash
keytool -list -v -keystore deltastars-release.keystore -alias deltastars
```

---

## 🤖 ثانياً: النشر على Google Play

### 1) المتطلبات
| البند | القيمة |
|---|---|
| حساب مطوّر | $25 (مرة واحدة) — play.google.com/console |
| صيغة الرفع | **AAB** (إجباري) |
| targetSdk | 35 ✅ مُطبّق |
| minSdk | 23 (أندرويد 6+) ✅ |
| توقيع | V1+V2+V3+V4 ✅ |

### 2) بناء الحزمة
```bash
npm run build
npx cap sync android
cd android && ./gradlew bundleRelease
# الناتج: android/app/build/outputs/bundle/release/app-release.aab
```

### 3) الأصول المطلوبة في المتجر
| الأصل | المقاس | الحالة |
|---|---|---|
| أيقونة التطبيق | 512×512 PNG | ✅ `icon-512.png` |
| صورة الغلاف | 1024×500 | ⚠️ تُنشأ من `opengraph.jpg` |
| لقطات هاتف | 2–8 صور (min 320px) | ⚠️ التقطها من التطبيق |
| لقطات تابلت 7" | اختياري | — |
| لقطات تابلت 10" | اختياري | — |

### 4) نصوص المتجر (جاهزة للنسخ)

**اسم التطبيق (30 حرفاً):**
```
نجوم دلتا | خضروات وفواكه
```

**الوصف المختصر (80 حرفاً):**
```
أجود الخضروات والفواكه والتمور الطازجة مع توصيل مبرّد لكل مناطق المملكة
```

**الوصف الكامل:**
```
🌿 متجر نجوم دلتا — شريكك للطزاجة في المملكة العربية السعودية

اطلب أجود الخضروات والفواكه والتمور من مزارعنا ومورّدينا المعتمدين،
مع توصيل مبرّد يحافظ على الطزاجة حتى باب منزلك.

✨ لماذا نجوم دلتا؟

🥬 أكثر من 237 صنفاً طازجاً
   خضروات محلية ومستوردة • فواكه موسمية • ورقيات وأعشاب • تمور القصيم الفاخرة

🚚 توصيل سريع ومبرّد
   في نفس اليوم للطلبات قبل 4 عصراً • مجاني للطلبات فوق 300 ريال
   تغطية جميع مناطق المملكة عبر 6 فروع

📍 تتبع مباشر على الخريطة
   شاهد موقع السائق لحظياً حتى وصوله إليك

✅ ضمان الجودة الموثّق
   نصوّر منتجاتك قبل الشحن • يمكنك رفض أي صنف غير مطابق واسترداد قيمته كاملة

💳 دفع آمن ومشفّر
   مدى • فيزا • ماستركارد • Apple Pay
   عبر بوابة ميسر السعودية المعتمدة

🔐 حماية متقدمة
   دخول بالبصمة والتعرف على الوجه • تشفير كامل لبياناتك

🤖 المساعد الذكي «عدي»
   اسأله عن أي سعر أو منتج أو خدمة — يجيبك فوراً

🏢 بوابة الشركات وكبار العملاء
   أسعار جملة • عقود توريد • فواتير إلكترونية معتمدة • كشوف حساب

📞 info@deltastars-ksa.com
```

**التصنيف:** التسوق (Shopping)
**التقييم العمري:** 3+ (للجميع)

### 5) استبيان أمان البيانات (Data Safety)
| البيان | يُجمع؟ | يُشارك؟ | الغرض |
|---|---|---|---|
| الاسم | ✅ | ❌ | تنفيذ الطلب |
| رقم الجوال | ✅ | ❌ | التحقق والتوصيل |
| البريد | ✅ | ❌ | الفواتير |
| الموقع التقريبي | ✅ | ❌ | تحديد أقرب فرع |
| الموقع الدقيق | ✅ | ❌ | التوصيل والتتبع |
| معلومات الدفع | ❌ | ❌ | تُعالَج لدى ميسر مباشرة |
| بيانات بيومترية | ❌ | ❌ | لا تغادر الجهاز |

**كل البيانات مشفّرة أثناء النقل ✅ | يمكن للمستخدم طلب الحذف ✅**

### 6) الرفع
1. Play Console → إنشاء تطبيق
2. Internal Testing → رفع AAB → اختبار
3. Closed Testing (اختياري)
4. Production → مراجعة (1–7 أيام)

---

## 🍎 ثالثاً: النشر على App Store

### 1) المتطلبات
| البند | القيمة |
|---|---|
| حساب مطوّر | $99/سنة — developer.apple.com |
| جهاز | macOS + Xcode |
| Bundle ID | `com.deltastars.app` |

### 2) البناء
```bash
npm run build
npx cap sync ios
cd ios/App && pod install
npx cap open ios
```
في Xcode: Product → Archive → Distribute App → App Store Connect

### 3) الأصول المطلوبة
| الأصل | المقاس |
|---|---|
| أيقونة | 1024×1024 (بلا شفافية) ✅ |
| iPhone 6.7" | 1290×2796 |
| iPhone 6.5" | 1242×2688 |
| iPad 12.9" | 2048×2732 |

### 4) نصوص App Store

**الاسم:** `نجوم دلتا - خضروات وفواكه`
**العنوان الفرعي:** `توصيل مبرّد لأجود المنتجات`
**الكلمات المفتاحية:**
```
خضروات,فواكه,تمور,توصيل,طازج,السعودية,بقالة,مزرعة,عضوي,سلة
```

### 5) نصوص أذونات iOS (مطلوبة في Info.plist)
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>نحتاج موقعك لتحديد أقرب فرع وتتبع طلبك أثناء التوصيل.</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>يُستخدم موقعك أثناء التوصيل لتمكينك من تتبع السائق مباشرة.</string>

<key>NSCameraUsageDescription</key>
<string>نستخدم الكاميرا لتوثيق جودة المنتجات وتأكيد الاستلام.</string>

<key>NSFaceIDUsageDescription</key>
<string>يُستخدم Face ID لتأمين حسابك وتسريع تسجيل الدخول.</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>لإرفاق صور مع ملاحظاتك أو شكواك.</string>
```

### 6) معلومات المراجعة
```
حساب تجريبي:
  المستخدم: demo@deltastars-ksa.com
  كلمة المرور: [أنشئ حساباً تجريبياً]

ملاحظات للمراجع:
  - التطبيق متجر بقالة إلكتروني يعمل في السعودية.
  - الدفع عبر بوابة ميسر المرخّصة من البنك المركزي السعودي.
  - إذن الموقع يُستخدم لتحديد أقرب فرع وتتبع التوصيل.
  - Face ID/بصمة اختيارية لتأمين الحساب.
```

---

## 🔐 رابعاً: أسرار CI/CD

### GitHub Secrets
```
ANDROID_KEYSTORE_BASE64      = محتوى keystore.base64.txt
ANDROID_KEYSTORE_PASSWORD    = كلمة مرور المخزن
ANDROID_KEY_ALIAS            = deltastars
ANDROID_KEY_PASSWORD         = كلمة مرور المفتاح
GOOGLE_PLAY_SERVICE_ACCOUNT_JSON = من Play Console

VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
VITE_GEMINI_KEY
VITE_MAPS_KEY
VITE_MOYASAR_PUBLISHABLE_KEY
VITE_FIREBASE_API_KEY
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_VAPID_KEY

NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID
```

### Netlify Environment Variables
```
# الواجهة
VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
VITE_GEMINI_KEY / VITE_MAPS_KEY
VITE_MOYASAR_PUBLISHABLE_KEY
VITE_FIREBASE_*

# ⛔ خادوم فقط (لا تبدأ بـ VITE_)
MOYASAR_SECRET_KEY
AUTHENTICA_API_KEY
AUTHENTICA_API_SECRET
GEMINI_SERVER_KEY
```

---

## 🔄 خامساً: التحديثات المستقبلية

### قاعدة ذهبية
**استخدم دائماً نفس مفتاح التوقيع** — أي مفتاح آخر = تطبيق جديد منفصل.

### خطوات التحديث
```bash
# 1) ارفع رقم النسخة
npm version patch        # 2.0.0 → 2.0.1

# 2) android/app/build.gradle
#    versionCode 1 → 2   (يجب أن يزيد دائماً)
#    versionName "2.0.1"

# 3) ابنِ وارفع
npm run build && npx cap sync android
cd android && ./gradlew bundleRelease
```

أو ببساطة: **ادفع Git tag** وسيتولى CI/CD كل شيء:
```bash
git tag v2.0.1 && git push origin v2.0.1
```

---

## ✅ قائمة التحقق النهائية

### قبل الرفع
- [ ] مفتاح التوقيع مُنشأ ومحفوظ في 3 أماكن
- [ ] `versionCode` أعلى من السابق
- [ ] كل متغيرات البيئة مضبوطة
- [ ] `npm run build` ينجح بلا أخطاء
- [ ] اختبار APK على جهاز حقيقي
- [ ] الأيقونة تظهر بالشعار الرسمي كاملاً
- [ ] **لا توجد شاشة سوداء عند الفتح**
- [ ] التطبيق يفتح ويستقر بدون إنترنت
- [ ] الدفع يعمل (وضع الاختبار ثم الحقيقي)
- [ ] رسائل OTP تصل
- [ ] الخرائط والتتبع يعملان
- [ ] البصمة تعمل وتفشل عند البصمة الخاطئة
- [ ] المساعد «عدي» يجيب عن الأسعار
- [ ] سياسة الخصوصية منشورة على رابط عام

### روابط قانونية مطلوبة
```
سياسة الخصوصية: https://deltastars.store/privacy-policy.html
شروط الاستخدام:  https://deltastars.store/terms-of-service.html
حذف الحساب:      https://deltastars.store/?page=contact
```

---

**© 2026 نجوم دلتا — علي الدحان**
