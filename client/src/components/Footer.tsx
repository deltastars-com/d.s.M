import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { companyData, getSocialMediaLinks } from '@/data/company';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();

  const socialLinks = getSocialMediaLinks();

  return (
    <footer className={`bg-card border-t border-border py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {language === 'ar' ? companyData.name : companyData.nameEn}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'ar' ? companyData.description : companyData.descriptionEn}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              {t('email')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-accent transition">
                <Mail size={18} />
                <a href={`mailto:${companyData.contact.email}`}>
                  {companyData.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-accent transition">
                <Phone size={18} />
                <a href={`tel:${companyData.contact.phone}`}>
                  {companyData.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-accent transition">
                <MessageCircle size={18} />
                <a href={companyData.contact.whatsappLink} target="_blank" rel="noopener noreferrer">
                  {companyData.contact.whatsapp}
                </a>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              {t('address')}
            </h4>
            <div className="flex gap-2 mb-4">
              <MapPin size={18} className="text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {language === 'ar' ? companyData.address : companyData.addressEn}
                </p>
              </div>
            </div>
            <a
              href={companyData.googleMaps.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition text-sm font-medium"
            >
              {language === 'ar' ? 'عرض على الخريطة' : 'View on Map'}
            </a>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              {language === 'ar' ? 'تابعنا' : 'Follow Us'}
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="w-10 h-10 rounded-lg bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent flex items-center justify-center transition"
                >
                  <span className="text-xs font-bold">
                    {social.name.substring(0, 1)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="border-t border-border pt-8 mb-8">
          <h4 className="text-lg font-semibold text-foreground mb-4">
            {t('bankAccount')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">{t('bankName')}:</p>
              <p className="font-semibold text-foreground">{companyData.bank.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">{t('branchName')}:</p>
              <p className="font-semibold text-foreground">{companyData.bank.branch}</p>
            </div>
            <div>
              <p className="text-muted-foreground">{t('accountNumber')}:</p>
              <p className="font-semibold text-foreground">{companyData.bank.accountNumber}</p>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <p className="text-muted-foreground">IBAN:</p>
              <p className="font-semibold text-foreground">{companyData.bank.iban}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 {language === 'ar' ? companyData.name : companyData.nameEn}. {t('allProducts')}</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-accent transition">
              {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </a>
            <a href="#terms" className="hover:text-accent transition">
              {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
