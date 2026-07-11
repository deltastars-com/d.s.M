import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Showroom from '@/components/Showroom';
import { ArrowRight, Leaf, Truck, Shield, Award } from 'lucide-react';
import { Link } from 'wouter';

export default function Home() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-accent/20 via-accent/10 to-background py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {language === 'ar'
                  ? '🌟 متجر نجوم دلتا للتجارة - لتجارة الفواكه والخضروات الطازجة'
                  : '🌟 Delta Stars Trading Store - Fresh Fruits & Vegetables Trading'}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {language === 'ar'
                  ? 'شركة الأولى بين شركات الفواكه والخضروات عالية الجودة في المملكة العربية السعودية. اكتشف التميز مع دلتا ستارز، الموزع الأول للفواكه والخضروات في السوق السعودي.'
                  : 'The first company among high-quality fruit and vegetable companies in Saudi Arabia. Discover excellence with Delta Stars, the leading distributor of fruits and vegetables in the Saudi market.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                    {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                    <ArrowRight size={20} />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent/10"
                  >
                    {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Leaf className="w-8 h-8" />,
                  titleAr: 'منتجات طازة',
                  titleEn: 'Fresh Products',
                  descAr: 'أفضل المنتجات الطازة يومياً',
                  descEn: 'Best fresh products daily',
                },
                {
                  icon: <Truck className="w-8 h-8" />,
                  titleAr: 'توصيل سريع',
                  titleEn: 'Fast Delivery',
                  descAr: 'توصيل آمن وسريع لباب منزلك',
                  descEn: 'Safe and fast delivery to your door',
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  titleAr: 'جودة مضمونة',
                  titleEn: 'Quality Guaranteed',
                  descAr: 'ضمان الجودة العالية لكل منتج',
                  descEn: 'High quality guarantee for every product',
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  titleAr: 'أسعار تنافسية',
                  titleEn: 'Competitive Prices',
                  descAr: 'أفضل الأسعار في السوق',
                  descEn: 'Best prices in the market',
                },
              ].map((feature, i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-card border border-border hover:border-accent/50 transition">
                  <div className="flex justify-center mb-4 text-accent">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {language === 'ar' ? feature.titleAr : feature.titleEn}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'ar' ? feature.descAr : feature.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showroom Section */}
        <Showroom />

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-accent/10 to-accent/5">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {language === 'ar'
                ? 'هل أنت مستعد للتسوق؟'
                : 'Ready to Shop?'}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {language === 'ar'
                ? 'اكتشف مجموعتنا الواسعة من الفواكه والخضروات الطازة والمنتجات الأخرى'
                : 'Discover our wide range of fresh fruits, vegetables, and other products'}
            </p>
            <Link href="/products">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                {language === 'ar' ? 'استكشف المنتجات' : 'Explore Products'}
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
