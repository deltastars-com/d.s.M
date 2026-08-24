import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { SYSTEM_CONFIG, BRANCHES } from '@/constants';
import { getFeaturedProducts } from '@/data/products';
import { companyData } from '@/data/company';
import type { Page } from '@/types';
import ProductCard from '@/components/ProductCard';

interface HomePageProps {
  onNavigate: (page: Page, params?: any) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const ar = language === 'ar';
  const featured = getFeaturedProducts();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { key: 'fruits', label: ar ? 'فواكه' : 'Fruits', icon: '🍎', color: 'from-red-500 to-orange-500' },
    { key: 'vegetables', label: ar ? 'خضروات' : 'Vegetables', icon: '🥬', color: 'from-green-500 to-emerald-500' },
    { key: 'herbs', label: ar ? 'ورقيات' : 'Herbs', icon: '🌿', color: 'from-emerald-400 to-teal-500' },
    { key: 'dates', label: ar ? 'تمور' : 'Dates', icon: '🌴', color: 'from-amber-600 to-yellow-600' },
    { key: 'nuts', label: ar ? 'مكسرات' : 'Nuts', icon: '🥜', color: 'from-amber-700 to-orange-700' },
    { key: 'packages', label: ar ? 'سلال' : 'Packages', icon: '📦', color: 'from-blue-500 to-indigo-500' },
  ];

  const stats = [
    { value: '237+', label: ar ? 'منتج طازج' : 'Fresh Products', icon: '🍎' },
    { value: '6', label: ar ? 'فروع متعددة' : 'Branches', icon: '🏢' },
    { value: '24/7', label: ar ? 'خدمة متواصلة' : 'Service', icon: '⏰' },
    { value: '100%', label: ar ? 'جودة مضمونة' : 'Quality', icon: '⭐' },
  ];

  const promoItems = [
    ar ? '🔥 خصم 20% على التمور' : '🔥 20% Off Dates',
    ar ? '🚚 توصيل مجاني فوق 200 ريال' : '🚚 Free Delivery Over 200 SAR',
    ar ? '🌿 فواكه طازجة يومياً' : '🌿 Fresh Fruits Daily',
    ar ? '⭐ جودة مضمونة 100%' : '⭐ 100% Quality Guaranteed',
    ar ? '💳 دفع آن ومتعدد' : '💳 Secure Payment',
    ar ? '📦 سلال عائلية بأسعار مميزة' : '📦 Family Bundles',
  ];

  return (
    <div className={isRTL ? 'rtl' : 'ltr'}>
      {/* Promo Marquee Banner */}
      <div className="bg-amber-500 text-emerald-900 py-2 overflow-hidden border-b border-amber-400">
        <div className="animate-marquee">
          {[...promoItems, ...promoItems].map((item, i) => (
            <span key={i} className="mx-8 text-xs font-bold whitespace-nowrap">{item}</span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container relative z-10 py-16 md:py-24 px-4">
          <div className="max-w-2xl">
            <span className={`inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-full mb-4 border border-amber-500/30 transition-all duration-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {t('home.hero.quality_label')}
            </span>
            <h1 className={`text-4xl md:text-6xl font-black mb-4 leading-tight transition-all duration-700 delay-100 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {ar ? '🌟 نجوم دلتا' : '🌟 Delta Stars'}
            </h1>
            <p className={`text-lg md:text-xl text-emerald-100 mb-8 leading-relaxed transition-all duration-700 delay-200 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t('home.hero.description')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                onClick={() => onNavigate('products')}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-900 font-bold rounded-xl transition transform hover:scale-105 shadow-lg"
              >
                {t('home.hero.button')}
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition border border-white/20"
              >
                {ar ? '🔐 دخول' : '🔐 Login'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="container py-6 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-xl">{stat.icon}</span>
                <div className="text-2xl md:text-3xl font-black text-emerald-800 mt-1">{stat.value}</div>
                <div className="text-xs text-slate-500 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-slate-50">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">{t('home.categories.title')}</h2>
          <p className="text-slate-500 text-sm mb-8">{t('home.categories.subtitle')}</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => onNavigate('products', { category: cat.key })}
                className={`bg-gradient-to-br ${cat.color} rounded-2xl p-4 text-white text-center hover:scale-105 transition transform shadow-lg hover:shadow-xl animate-slideUp`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-3xl block mb-2">{cat.icon}</span>
                <span className="text-xs font-bold">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-emerald-900">{ar ? '⭐ المنتجات المميزة' : '⭐ Featured Products'}</h2>
                <p className="text-slate-500 text-sm">{ar ? 'اكتشف أجود منتجاتنا الطازجة' : 'Discover our finest fresh products'}</p>
              </div>
              <button
                onClick={() => onNavigate('products')}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-bold transition"
              >
                {ar ? 'عرض الكل ←' : 'View All →'}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.slice(0, 8).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(p) => {
                    addItem(p, 1);
                    addToast(ar ? `تمت إضافة ${p.name_ar} للسلة` : `${p.name_en} added to cart`, 'success');
                  }}
                  onViewDetail={(id) => onNavigate('productDetail', id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-12 bg-slate-50">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: ar ? 'منتجات طازجة يومياً' : 'Fresh Daily', desc: ar ? 'نضمن طزاجة منتجاتنا يومياً من المزارع إلى بابك' : 'We guarantee daily freshness from farms to your door' },
              { icon: '🚚', title: ar ? 'توصيل سريع ومبرد' : 'Fast Cold Delivery', desc: ar ? 'أسطول مبرد يضمن وصول المنتجات بأفضل حالة' : 'Refrigerated fleet ensures products arrive in perfect condition' },
              { icon: '💳', title: ar ? 'دفع آمن ومتعدد' : 'Secure Payment', desc: ar ? 'مدى، فيزا، ماستركارد، Apple Pay' : 'Mada, Visa, Mastercard, Apple Pay' },
            ].map((feat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md animate-slideUp"
                style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-4xl block mb-3">{feat.icon}</span>
                <h3 className="font-bold text-emerald-900 mb-2">{feat.title}</h3>
                <p className="text-slate-500 text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branches Showcase */}
      <section className="py-12 bg-white">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2 text-center">{ar ? '🏢 فروعنا' : '🏢 Our Branches'}</h2>
          <p className="text-slate-500 text-sm mb-8 text-center">{ar ? 'نغطي جميع مناطق المملكة' : 'We cover all regions of the Kingdom'}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {BRANCHES.map(branch => (
              <div key={branch.id} className="bg-slate-50 rounded-xl p-4 text-center hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all duration-300 cursor-pointer">
                <span className="text-2xl block mb-2">📍</span>
                <h4 className="font-bold text-xs text-emerald-900">{ar ? branch.city : branch.name_en.split(' ')[0]}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{branch.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-slate-50">
        <div className="container px-4">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2 text-center">{ar ? '⭐ آراء عملائنا' : '⭐ Customer Reviews'}</h2>
          <p className="text-slate-500 text-sm mb-8 text-center">{ar ? 'ما يقوله عملاؤنا عنا' : 'What our customers say about us'}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: ar ? 'أحمد محمد' : 'Ahmed M.', text: ar ? 'فواكه طازجة جداً وتوصيل سريع. أفضل متجر في جدة!' : 'Very fresh fruits and fast delivery. Best store in Jeddah!', rating: 5 },
              { name: ar ? 'سارة العلي' : 'Sarah A.', text: ar ? 'أسعار ممتازة وجودة عالية. أنصح الجميع بالتعامل معهم.' : 'Excellent prices and high quality. Highly recommended.', rating: 5 },
              { name: ar ? 'خالد الشمري' : 'Khalid S.', text: ar ? 'سلال عائلية ممتازة وتمور طازجة. خدمة ممتازة!' : 'Excellent family bundles and fresh dates. Great service!', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-1 mb-3">
                  {'⭐'.repeat(review.rating)}
                </div>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs">{review.name[0]}</div>
                  <span className="text-sm font-bold text-emerald-900">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-800 to-emerald-900 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-black mb-4">{ar ? '🛒 ابدأ التسوق الآن' : '🛒 Start Shopping Now'}</h2>
          <p className="text-emerald-200 mb-8 max-w-xl mx-auto">
            {ar ? 'اكتشف أكثر من 237 منتج طازج بأسعار تنافسية' : 'Discover 237+ fresh products at competitive prices'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('products')}
              className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-emerald-900 font-black text-lg rounded-xl transition transform hover:scale-105 shadow-xl"
            >
              {ar ? 'تسوق الآن 🛒' : 'Shop Now 🛒'}
            </button>
            <a
              href={companyData.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#25D366] hover:bg-[#20b757] text-white font-black text-lg rounded-xl transition"
            >
              💬 {ar ? 'تواصل عبر واتساب' : 'WhatsApp Us'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
