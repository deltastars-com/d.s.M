import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { companyData, getSocialMediaLinks } from '@/data/company';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { ArrowLeft, Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socialLinks = getSocialMediaLinks();

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />

      <main className="flex-1 container py-12">
        <Link href="/">
          <div className="flex items-center gap-2 text-accent hover:opacity-80 transition mb-8 cursor-pointer">
            <ArrowLeft size={20} />
            <span>{t('back')}</span>
          </div>
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-12 text-center">
          {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="text-accent" size={24} />
              <h3 className="text-lg font-semibold text-foreground">
                {t('phone')}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {language === 'ar'
                ? 'اتصل بنا مباشرة'
                : 'Call us directly'}
            </p>
            <a
              href={`tel:${companyData.contact.phone}`}
              className="text-accent hover:opacity-80 transition font-semibold block mb-2"
            >
              {companyData.contact.phone}
            </a>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} />
              <span>
                {language === 'ar'
                  ? 'السبت - الخميس: 8:00 - 18:00'
                  : 'Sat - Thu: 8:00 AM - 6:00 PM'}
              </span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="text-accent" size={24} />
              <h3 className="text-lg font-semibold text-foreground">
                {language === 'ar' ? 'واتساب' : 'WhatsApp'}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {language === 'ar'
                ? 'تحدث معنا عبر واتساب'
                : 'Chat with us on WhatsApp'}
            </p>
            <a
              href={companyData.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:opacity-80 transition font-semibold block"
            >
              {companyData.contact.whatsapp}
            </a>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="text-accent" size={24} />
              <h3 className="text-lg font-semibold text-foreground">
                {t('email')}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {language === 'ar'
                ? 'أرسل لنا بريد إلكتروني'
                : 'Send us an email'}
            </p>
            <a
              href={`mailto:${companyData.contact.email}`}
              className="text-accent hover:opacity-80 transition font-semibold block"
            >
              {companyData.contact.email}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {language === 'ar' ? 'أرسل رسالة' : 'Send a Message'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'ar' ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                  placeholder={language === 'ar' ? 'اسمك' : 'Your name'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                  placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('phone')}
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                  placeholder={language === 'ar' ? 'رقم هاتفك' : 'Your phone'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'ar' ? 'الموضوع' : 'Subject'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                  placeholder={language === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === 'ar' ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent resize-none"
                  placeholder={language === 'ar' ? 'رسالتك' : 'Your message'}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {language === 'ar' ? 'إرسال' : 'Send'}
              </Button>

              {submitted && (
                <div className="p-4 bg-accent/10 border border-accent rounded-lg text-accent text-sm">
                  {language === 'ar'
                    ? '✓ تم إرسال رسالتك بنجاح'
                    : '✓ Your message has been sent successfully'}
                </div>
              )}
            </form>
          </div>

          {/* Location and Social Media */}
          <div className="space-y-8">
            {/* Location */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="text-accent" size={24} />
                {t('address')}
              </h2>
              <p className="text-foreground mb-4 font-semibold">
                {language === 'ar' ? companyData.address : companyData.addressEn}
              </p>
              <a
                href={companyData.googleMaps.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition font-medium"
              >
                {language === 'ar' ? 'عرض على الخريطة' : 'View on Google Maps'}
              </a>

              {/* Map Placeholder */}
              <div className="mt-6 w-full h-48 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin size={40} className="text-accent/50 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">
                    {language === 'ar' ? 'خريطة جوجل' : 'Google Map'}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {language === 'ar' ? 'تابعنا' : 'Follow Us'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-accent/10 hover:bg-accent hover:text-accent-foreground text-accent rounded-lg transition text-center font-medium"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
