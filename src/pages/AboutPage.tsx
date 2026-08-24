import { useLanguage } from '@/contexts/LanguageContext';
import { companyData } from '@/data/company';
import { BRANCHES, SYSTEM_CONFIG } from '@/constants';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function AboutPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const values = [
    { icon: '🌿', title: ar ? 'الطزاجة' : 'Freshness', desc: ar ? 'نضمن وصول المنتجات طازجة من المزارع مباشرة' : 'We guarantee farm-fresh products delivered directly' },
    { icon: '🤝', title: ar ? 'الثقة' : 'Trust', desc: ar ? 'بناء علاقات طويلة مع عملائنا وشركائنا' : 'Building lasting relationships with customers and partners' },
    { icon: '⭐', title: ar ? 'الجودة' : 'Quality', desc: ar ? 'معايير جودة صارمة في جميع مراحل التوريد' : 'Strict quality standards in all supply chain stages' },
    { icon: '🚚', title: ar ? 'التوصيل' : 'Delivery', desc: ar ? 'أسطول مبرد حديث لتوصيل آمن وسريع' : 'Modern refrigerated fleet for safe and fast delivery' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white py-16 md:py-24">
        <div className="container px-4 text-center">
          <span className="text-6xl block mb-4">🌟</span>
          <h1 className="text-4xl md:text-5xl font-black mb-4">{ar ? 'من نحن' : 'About Us'}</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">{companyData.tagline}</p>
        </div>
      </section>

      <div className="container py-12 px-4">
        {/* Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-emerald-900 mb-4">{ar ? 'قصتنا' : 'Our Story'}</h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-4">{companyData.description}</p>
          <p className="text-slate-600 leading-relaxed">
            {ar
              ? 'تأسست شركة نجوم دلتا للتجارة بهدف تقديم أجود المنتجات الزراعية الطازجة في المملكة العربية السعودية. نعمل مع أفضل المزارع والموردين المحليين والعالميين لنضمن وصول منتجات عالية الجودة لعملائنا.'
              : 'Delta Stars Trading was founded to deliver the finest fresh agricultural products in Saudi Arabia. We work with the best local and international farms to ensure premium quality products reach our customers.'}
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 text-center hover:shadow-lg transition">
              <span className="text-4xl block mb-3">{v.icon}</span>
              <h3 className="font-bold text-emerald-900 mb-2">{v.title}</h3>
              <p className="text-slate-500 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Branches */}
        <div className="mb-16">
          <h2 className="text-3xl font-black text-emerald-900 mb-8 text-center">{ar ? 'فروعنا' : 'Our Branches'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCHES.map(branch => (
              <div key={branch.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-lg">📍</span>
                  </div>
                  <h3 className="font-bold text-emerald-900">{ar ? branch.name_ar : branch.name_en}</h3>
                </div>
                <p className="text-sm text-slate-500 mb-2">{ar ? branch.address_ar : branch.address_en}</p>
                <p className="text-sm text-slate-600">📞 {branch.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Clients */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-emerald-900 mb-4">{ar ? 'عملاؤنا المميزون' : 'Our Featured Clients'}</h2>
          <p className="text-slate-500 mb-8">{ar ? 'نفخر بخدمة أكبر الفنادق والشركات في المملكة' : 'Proud to serve the largest hotels and companies in KSA'}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {companyData.featuredClients.map((client, i) => (
              <span key={i} className="px-6 py-3 bg-white rounded-xl border border-slate-100 text-sm font-bold text-slate-700 shadow-sm">
                {client}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-black mb-4">{ar ? 'تواصل معنا' : 'Contact Us'}</h2>
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
            <span>📞 {SYSTEM_CONFIG.CONTACT.PHONE}</span>
            <span>✉️ {SYSTEM_CONFIG.CONTACT.EMAIL}</span>
            <span>💬 WhatsApp: {SYSTEM_CONFIG.CONTACT.PHONE}</span>
          </div>
          <p className="text-emerald-200 text-sm">
            {ar ? 'ساعات العمل: السبت - الخميس 6 ص - 11 م | الجمعة 2 م - 11 م' : 'Hours: Sat-Thu 6AM-11PM | Friday 2PM-11PM'}
          </p>
        </div>
      </div>
    </div>
  );
}
