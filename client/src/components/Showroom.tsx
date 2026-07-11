import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Zap,
  Gift,
  TrendingUp,
  Sparkles,
  Star,
  ShoppingCart,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'wouter';

interface ShowroomSection {
  id: string;
  titleAr: string;
  titleEn: string;
  icon: React.ReactNode;
  backgroundColor: string;
  products: any[];
  link: string;
}

export default function Showroom() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();

  const sections: ShowroomSection[] = [
    {
      id: 'flash-sales',
      titleAr: 'عروض فلاش',
      titleEn: 'Flash Sales',
      icon: <Zap className="w-8 h-8" />,
      backgroundColor: 'from-red-500 to-red-600',
      products: [
        { id: 1, nameAr: 'طماطم طازة', nameEn: 'Fresh Tomatoes', price: 15, discount: 30 },
        { id: 2, nameAr: 'خيار بارد', nameEn: 'Cool Cucumber', price: 8, discount: 25 },
        { id: 3, nameAr: 'فلفل أحمر', nameEn: 'Red Pepper', price: 12, discount: 20 },
      ],
      link: '/products?filter=flash-sales',
    },
    {
      id: 'trending',
      titleAr: 'الأكثر مبيعاً',
      titleEn: 'Trending Now',
      icon: <TrendingUp className="w-8 h-8" />,
      backgroundColor: 'from-blue-500 to-blue-600',
      products: [
        { id: 4, nameAr: 'موز طازة', nameEn: 'Fresh Bananas', price: 10, discount: 0 },
        { id: 5, nameAr: 'تفاح أحمر', nameEn: 'Red Apples', price: 18, discount: 0 },
        { id: 6, nameAr: 'عنب أسود', nameEn: 'Black Grapes', price: 25, discount: 0 },
      ],
      link: '/products?filter=trending',
    },
    {
      id: 'new-arrivals',
      titleAr: 'الوصول الجديد',
      titleEn: 'New Arrivals',
      icon: <Sparkles className="w-8 h-8" />,
      backgroundColor: 'from-purple-500 to-purple-600',
      products: [
        { id: 7, nameAr: 'أفوكادو طازة', nameEn: 'Fresh Avocado', price: 20, discount: 0 },
        { id: 8, nameAr: 'جزر برتقالي', nameEn: 'Orange Carrots', price: 7, discount: 0 },
        { id: 9, nameAr: 'بروكلي أخضر', nameEn: 'Green Broccoli', price: 14, discount: 0 },
      ],
      link: '/products?filter=new-arrivals',
    },
    {
      id: 'rewards',
      titleAr: 'المكافآت والجوائز',
      titleEn: 'Rewards & Gifts',
      icon: <Gift className="w-8 h-8" />,
      backgroundColor: 'from-yellow-500 to-yellow-600',
      products: [
        { id: 10, nameAr: 'شراء 3 احصل على 1 مجاني', nameEn: 'Buy 3 Get 1 Free', price: 0, discount: 0 },
        { id: 11, nameAr: 'نقاط الولاء المضاعفة', nameEn: '2x Loyalty Points', price: 0, discount: 0 },
        { id: 12, nameAr: 'شحن مجاني على الطلبات', nameEn: 'Free Shipping', price: 0, discount: 0 },
      ],
      link: '/rewards',
    },
  ];

  return (
    <section className={`py-12 px-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto">
        {/* Showroom Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="w-8 h-8 text-accent" />
            <h2 className="text-4xl font-bold text-foreground">
              {language === 'ar' ? 'صالة العرض' : 'Showroom'}
            </h2>
            <Star className="w-8 h-8 text-accent" />
          </div>
          <p className="text-muted-foreground text-lg">
            {language === 'ar'
              ? 'اكتشف أفضل العروض والمنتجات المميزة'
              : 'Discover our best offers and featured products'}
          </p>
        </div>

        {/* Showroom Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section) => (
            <Card
              key={section.id}
              className="overflow-hidden border-2 border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              {/* Section Header with Background */}
              <div className={`bg-gradient-to-r ${section.backgroundColor} p-6 text-white`}>
                <div className="flex items-center gap-3 mb-2">
                  {section.icon}
                  <h3 className="text-2xl font-bold">
                    {language === 'ar' ? section.titleAr : section.titleEn}
                  </h3>
                </div>
              </div>

              {/* Products Preview */}
              <CardContent className="p-6">
                <div className="space-y-3 mb-6">
                  {section.products.slice(0, 3).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-background rounded-lg border border-border hover:border-accent/50 transition"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {language === 'ar' ? product.nameAr : product.nameEn}
                        </p>
                        {product.price > 0 && (
                          <p className="text-sm text-muted-foreground">
                            {language === 'ar' ? 'السعر: ' : 'Price: '}
                            <span className="font-bold text-accent">{product.price} ر.س</span>
                          </p>
                        )}
                      </div>
                      {product.discount > 0 && (
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          -{product.discount}%
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <Link href={section.link}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                    <ShoppingCart size={18} />
                    <span>
                      {language === 'ar' ? 'عرض الكل' : 'View All'}
                    </span>
                    <ChevronRight size={18} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Offers Banner */}
        <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/30 overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {language === 'ar' ? 'عروض خاصة محدودة الوقت' : 'Limited Time Special Offers'}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {language === 'ar'
                    ? 'احصل على خصومات تصل إلى 50% على المنتجات المختارة'
                    : 'Get discounts up to 50% on selected products'}
                </p>
              </div>
              <Link href="/products?filter=special-offers">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground whitespace-nowrap">
                  {language === 'ar' ? 'تسوق الآن' : 'Shop Now'}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Seasonal Offers */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            {language === 'ar' ? 'عروض موسمية' : 'Seasonal Offers'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { titleAr: 'عروض رمضان', titleEn: 'Ramadan Offers', color: 'from-green-500' },
              { titleAr: 'عروض العيد', titleEn: 'Eid Offers', color: 'from-blue-500' },
              { titleAr: 'عروض نهاية السنة', titleEn: 'Year End Offers', color: 'from-purple-500' },
            ].map((offer, i) => (
              <Card
                key={i}
                className={`bg-gradient-to-br ${offer.color} to-transparent border-0 text-white overflow-hidden hover:shadow-lg transition-all`}
              >
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-2">
                    {language === 'ar' ? offer.titleAr : offer.titleEn}
                  </h4>
                  <p className="text-white/80 mb-4">
                    {language === 'ar'
                      ? 'احصل على عروض حصرية خلال هذه الفترة'
                      : 'Get exclusive offers during this period'}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full bg-white/20 border-white/40 text-white hover:bg-white/30"
                  >
                    {language === 'ar' ? 'اكتشف' : 'Discover'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
