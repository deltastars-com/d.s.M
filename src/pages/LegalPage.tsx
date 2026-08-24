import { useLanguage } from '@/contexts/LanguageContext';

interface Props { title: string; }

export default function LegalPage({ title }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <div className="container py-12 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-black text-emerald-900 mb-8">{title}</h1>
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm prose prose-sm max-w-none">
        {ar ? (
          <>
            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">1. المقدمة</h2>
            <p className="text-slate-600 leading-relaxed">
              مرحباً بك في متجر نجوم دلتا للتجارة. نحن شركة سعودية متخصصة في توريد أجود الخضروات والفواكه والتمور الطازجة.
              تُعد هذه السياسة الإطار القانوني لاستخدامك لمتجرنا الإلكتروني وخدماتنا.
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">2. جمع البيانات</h2>
            <p className="text-slate-600 leading-relaxed">
              نقوم بجمع البيانات التالية عند التسجيل أو إتمام طلب: الاسم الكامل، رقم الجوال، العنوان، البريد الإلكتروني، بيانات الدفع (تُعالج عبر بوابة ميسرPCI-DSS ولا تُخزّن في خوادمنا).
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">3. استخدام البيانات</h2>
            <p className="text-slate-600 leading-relaxed">
              نستخدم بياناتك فقط لأغراض: إتمام الطلبات والتوصيل، التواصل معك بخصوص طلباتك، تحسين خدماتنا، الإشعارات المتعلقة بالعروض والتحديثات.
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">4. حماية البيانات</h2>
            <p className="text-slate-600 leading-relaxed">
              نستخدم تشفير SSL/TLS لحماية جميع البيانات المنقولة. لا نخزّن بيانات البطاقات الائتمانية. نلتزم بمعايير أمن البيانات PCI-DSS والأنظمة السعودية المعتمدة.
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">5. مشاركة البيانات</h2>
            <p className="text-slate-600 leading-relaxed">
              لا نبيع بياناتك لأطراف ثالثة. نشارك البيانات فقط مع: شركات التوصيل لتمكين التوصيل، بوابة الدفع (ميسر) لمعالجة المعاملات، الجهات الرسمية عند الطلب القانوني.
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">6. حقوقك</h2>
            <p className="text-slate-600 leading-relaxed">
              لك الحق في: الاطلاع على بياناتك، تعديلها، حذفها، الاعتراض على معالجتها. للتواصل: info@deltastars-ksa.com
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">7. الاتصال</h2>
            <p className="text-slate-600 leading-relaxed">
              لأي استفسار: 📧 info@deltastars-ksa.com | 📞 0558828009 | 💬 WhatsApp: 0558828009
            </p>
            <p className="text-xs text-slate-400 mt-8">آخر تحديث: أغسطس 2026 — شركة نجوم دلتا للتجارة © 2026</p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              Welcome to Delta Stars Trading Store. We are a Saudi company specializing in supplying the finest fresh vegetables, fruits, and dates. This policy constitutes the legal framework for your use of our online store and services.
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">2. Data Collection</h2>
            <p className="text-slate-600 leading-relaxed">
              We collect the following data upon registration or order completion: full name, phone number, address, email, and payment data (processed via Moyasar PCI-DSS gateway and not stored on our servers).
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">3. Data Usage</h2>
            <p className="text-slate-600 leading-relaxed">
              We use your data only for: completing orders and delivery, communicating about your orders, improving our services, and notifications related to offers and updates.
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">4. Data Protection</h2>
            <p className="text-slate-600 leading-relaxed">
              We use SSL/TLS encryption for all transmitted data. We do not store credit card data. We comply with PCI-DSS data security standards and approved Saudi regulations.
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">5. Data Sharing</h2>
            <p className="text-slate-600 leading-relaxed">
              We do not sell your data to third parties. Data is shared only with: delivery companies for enabling delivery, payment gateway (Moyasar) for processing transactions, and official authorities upon legal request.
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">6. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed">
              You have the right to: access your data, modify it, delete it, and object to its processing. Contact: info@deltastars-ksa.com
            </p>

            <h2 className="text-xl font-bold text-emerald-800 mt-6 mb-3">7. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              For any inquiries: 📧 info@deltastars-ksa.com | 📞 0558828009 | 💬 WhatsApp: 0558828009
            </p>
            <p className="text-xs text-slate-400 mt-8">Last updated: August 2026 — Delta Stars Trading Co. © 2026</p>
          </>
        )}
      </div>
    </div>
  );
}
