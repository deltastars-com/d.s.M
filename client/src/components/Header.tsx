import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { companyData } from '@/data/company';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ShoppingCart, Globe, Phone, MessageCircle, MapPin } from 'lucide-react';
import { useState } from 'react';
import Clock from './Clock';

export default function Header() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();
  const [showContactMenu, setShowContactMenu] = useState(false);

  return (
    <>
      <Clock />
      <header className={`bg-card border-b border-border sticky top-12 z-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Top Bar - Contact Info */}
      <div className="bg-accent/5 border-b border-border py-2">
        <div className="container flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm">
          <a
            href={`tel:${companyData.contact.phone}`}
            className="flex items-center gap-2 text-foreground hover:text-accent transition"
          >
            <Phone size={16} />
            <span>{companyData.contact.phone}</span>
          </a>
          <a
            href={companyData.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground hover:text-accent transition"
          >
            <MessageCircle size={16} />
            <span>{companyData.contact.whatsapp}</span>
          </a>
          <a
            href={`mailto:${companyData.contact.email}`}
            className="flex items-center gap-2 text-foreground hover:text-accent transition"
          >
            <span>{companyData.contact.email}</span>
          </a>
          <a
            href={companyData.googleMaps.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground hover:text-accent transition"
          >
            <MapPin size={16} />
            <span>{language === 'ar' ? 'الموقع' : 'Location'}</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container flex items-center justify-between h-16">
        {/* Logo and Brand */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
            <img
              src="/logos/delta-stars-logo.jpg"
              alt="Delta Stars Logo"
              className="h-12 w-auto rounded-lg shadow-md"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-accent">
                {language === 'ar' ? 'متجر نجوم دلتا' : 'Delta Stars'}
              </h1>
              <p className="text-xs text-muted-foreground">
                {language === 'ar' ? 'لتجارة الفواكه والخضروات الطازجة' : 'Fruits & Vegetables'}
              </p>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-foreground hover:text-accent transition font-medium">
            {t('home')}
          </Link>
          <Link href="/products" className="text-foreground hover:text-accent transition font-medium">
            {t('products')}
          </Link>
          <Link href="/track" className="text-foreground hover:text-accent transition font-medium">
            {language === 'ar' ? 'تتبع الطلب' : 'Track'}
          </Link>
          <Link href="/reviews" className="text-foreground hover:text-accent transition font-medium">
            {language === 'ar' ? 'التقييمات' : 'Reviews'}
          </Link>
          <Link href="/wishlist" className="text-foreground hover:text-accent transition font-medium">
            {language === 'ar' ? 'الرغبات' : 'Wishlist'}
          </Link>
          <Link href="/ai" className="text-foreground hover:text-accent transition font-medium">
            {language === 'ar' ? 'Delta AI' : 'Delta AI'}
          </Link>
          <Link href="/contact" className="text-foreground hover:text-accent transition font-medium">
            {language === 'ar' ? 'اتصل بنا' : 'Contact'}
          </Link>
          <a
            href={companyData.googleMaps.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition font-medium flex items-center gap-2"
          >
            <MapPin size={18} />
            {language === 'ar' ? 'الموقع' : 'Location'}
          </a>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Contact Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowContactMenu(!showContactMenu)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/10 transition text-foreground"
              title={t('phone')}
            >
              <Phone size={20} />
            </button>
            {showContactMenu && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg p-4 space-y-3 z-50">
                <a
                  href={`tel:${companyData.contact.phone}`}
                  className="flex items-center gap-2 text-foreground hover:text-accent transition text-sm"
                >
                  <Phone size={16} />
                  <span>{companyData.contact.phone}</span>
                </a>
                <a
                  href={companyData.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground hover:text-accent transition text-sm"
                >
                  <MessageCircle size={16} />
                  <span>{companyData.contact.whatsapp}</span>
                </a>
                <a
                  href={`mailto:${companyData.contact.email}`}
                  className="flex items-center gap-2 text-foreground hover:text-accent transition text-sm"
                >
                  <span className="text-xs">{companyData.contact.email}</span>
                </a>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link href="/cart">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-accent text-accent hover:bg-accent/10"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">{t('cart')}</span>
            </Button>
          </Link>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition font-medium"
          >
            <Globe size={20} />
            <span className="hidden sm:inline">{language === 'ar' ? 'EN' : 'AR'}</span>
          </button>
        </div>
      </div>
    </header>
    </>
  );
}
