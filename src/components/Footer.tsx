import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { companyData } from '@/data/company';
import type { Page } from '@/types';

const OFFICIAL_EMAIL = 'deltastars777@gmail.com';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const ar = language === 'ar';

  return (
    <footer className="bg-emerald-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-emerald-900 font-black text-lg">DS</div>
              <span className="font-bold text-lg">{ar ? 'نجوم دلتا' : 'Delta Stars'}</span>
            </div>
            <p className="text-emerald-200 text-sm leading-relaxed">
              {ar ? companyData.description : companyData.descriptionEn}
            </p>
            <div className="mt-4 p-3 bg-emerald-800/50 rounded-xl">
              <p className="text-xs text-emerald-300">{ar ? 'البريد الرسمي للدعم' : 'Official Support'}</p>
              <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-amber-400 hover:text-amber-300 text-sm font-bold font-mono">
                {OFFICIAL_EMAIL}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-amber-400 mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              {[
                { page: 'home' as Page, label: t('footer.links.home') },
                { page: 'products' as Page, label: t('footer.links.products') },
                { page: 'showroom' as Page, label: t('footer.links.showroom') },
                { page: 'track_order' as Page, label: t('footer.links.track') },
                { page: 'about' as Page, label: ar ? 'من نحن' : 'About Us' },
                { page: 'contact' as Page, label: t('footer.links.contact') },
              ].map(link => (
                <li key={link.page}>
                  <button onClick={() => onNavigate(link.page)} className="text-emerald-200 hover:text-amber-400 transition text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies & Legal */}
          <div>
            <h3 className="font-bold text-amber-400 mb-4">{t('footer.policies')}</h3>
            <ul className="space-y-2">
              {[
                { page: 'privacy' as Page, label: t('footer.links.privacy') },
                { page: 'terms' as Page, label: t('footer.links.terms') },
                { page: 'order_history' as Page, label: ar ? 'سجل الطلبات' : 'Order History' },
                { page: 'register' as Page, label: ar ? 'إنشاء حساب' : 'Create Account' },
              ].map(link => (
                <li key={link.page}>
                  <button onClick={() => onNavigate(link.page)} className="text-emerald-200 hover:text-amber-400 transition text-sm">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-amber-400 mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-2 text-sm text-emerald-200">
              <li>📞 {companyData.contact.phone}</li>
              <li>💬 {companyData.contact.whatsapp}</li>
              <li>✉️ <a href={`mailto:${OFFICIAL_EMAIL}`} className="hover:text-amber-400">{OFFICIAL_EMAIL}</a></li>
              <li>📍 {ar ? companyData.address : companyData.addressEn}</li>
            </ul>
            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              {Object.values(companyData.socialMedia).map(social => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-emerald-800 hover:bg-amber-500 flex items-center justify-center text-white transition text-sm"
                  title={social.name}
                >
                  {social.name[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Developer Info */}
      <div className="bg-emerald-950/50 border-t border-emerald-800">
        <div className="container py-4 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <span className="text-amber-500">👨‍💻</span>
              <span>{ar ? 'المطور:' : 'Developer:'}</span>
              <span className="font-bold text-white">{ar ? 'المهندس علي درهم الدحان' : 'Ali Aldahan'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📧</span>
              <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-amber-400 hover:text-amber-300 font-mono">{OFFICIAL_EMAIL}</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-emerald-800">
        <div className="container py-4 px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-emerald-300">
          <p>© 2026 {ar ? 'نجوم دلتا للتجارة' : 'Delta Stars Trading'}. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <span>{ar ? 'المالك والمطور:' : 'Owner & Developer:'}</span>
            <span className="font-bold text-white">{ar ? 'علي درهم الدحان' : 'Ali Aldahan'}</span>
            <span className="text-emerald-400">v3.0.2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
