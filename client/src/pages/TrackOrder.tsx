import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'wouter';
import { ArrowLeft, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface TrackingStep {
  status: string;
  statusAr: string;
  timestamp: string;
  location: string;
  locationAr: string;
  completed: boolean;
  icon: React.ReactNode;
}

export default function TrackOrder() {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  // Mock tracking data
  const mockTracking: TrackingStep[] = [
    {
      status: 'Order Confirmed',
      statusAr: 'تم تأكيد الطلب',
      timestamp: '2024-01-15 10:00 AM',
      location: 'Jeddah, Saudi Arabia',
      locationAr: 'جدة، المملكة العربية السعودية',
      completed: true,
      icon: <CheckCircle className="text-accent" size={24} />,
    },
    {
      status: 'Processing',
      statusAr: 'قيد المعالجة',
      timestamp: '2024-01-15 02:30 PM',
      location: 'Warehouse',
      locationAr: 'المستودع',
      completed: true,
      icon: <Package className="text-accent" size={24} />,
    },
    {
      status: 'Shipped',
      statusAr: 'تم الشحن',
      timestamp: '2024-01-16 08:00 AM',
      location: 'In Transit',
      locationAr: 'في الطريق',
      completed: true,
      icon: <Truck className="text-accent" size={24} />,
    },
    {
      status: 'Out for Delivery',
      statusAr: 'في الطريق للتسليم',
      timestamp: '2024-01-17 03:00 PM',
      location: 'Your Area',
      locationAr: 'منطقتك',
      completed: false,
      icon: <MapPin className="text-muted-foreground" size={24} />,
    },
    {
      status: 'Delivered',
      statusAr: 'تم التسليم',
      timestamp: 'Expected: 2024-01-17 06:00 PM',
      location: 'Your Address',
      locationAr: 'عنوانك',
      completed: false,
      icon: <CheckCircle className="text-muted-foreground" size={24} />,
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />

      <main className="flex-1 container py-12">
        <Link href="/products">
          <div className="flex items-center gap-2 text-accent hover:opacity-80 transition mb-8 cursor-pointer">
            <ArrowLeft size={20} />
            <span>{t('back')}</span>
          </div>
        </Link>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            {language === 'ar' ? 'تتبع الطلب' : 'Track Order'}
          </h1>

          {/* Search Section */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder={language === 'ar' ? 'أدخل رقم الطلب' : 'Enter Order Number'}
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
              />
              <Button
                onClick={() => setShowTracking(!!trackingNumber)}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {language === 'ar' ? 'بحث' : 'Search'}
              </Button>
            </div>

            {/* GPS Map Placeholder */}
            <div className="w-full h-64 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin size={48} className="text-accent/50 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {language === 'ar' ? 'خريطة تتبع الشحنة' : 'Live Tracking Map'}
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          {showTracking && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {language === 'ar' ? 'حالة الطلب' : 'Order Status'}
              </h2>

              <div className="space-y-6">
                {mockTracking.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    {/* Timeline Icon */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-card border-2 border-accent flex items-center justify-center flex-shrink-0">
                        {step.icon}
                      </div>
                      {index < mockTracking.length - 1 && (
                        <div
                          className={`w-1 h-12 ${
                            step.completed ? 'bg-accent' : 'bg-border'
                          } my-2`}
                        />
                      )}
                    </div>

                    {/* Timeline Content */}
                    <div className="flex-1 pb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {language === 'ar' ? step.statusAr : step.status}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {step.timestamp}
                      </p>
                      <div className="flex items-center gap-2 text-accent">
                        <MapPin size={16} />
                        <span className="text-sm">
                          {language === 'ar' ? step.locationAr : step.location}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-start">
                      {step.completed ? (
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                          {language === 'ar' ? 'مكتمل' : 'Completed'}
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-medium flex items-center gap-1">
                          <Clock size={12} />
                          {language === 'ar' ? 'قريباً' : 'Pending'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {language === 'ar' ? 'تفاصيل التسليم' : 'Delivery Details'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === 'ar' ? 'رقم الطلب' : 'Order Number'}
                    </p>
                    <p className="font-semibold text-foreground">{trackingNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === 'ar' ? 'تاريخ التسليم المتوقع' : 'Expected Delivery'}
                    </p>
                    <p className="font-semibold text-foreground">2024-01-17</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === 'ar' ? 'السائق' : 'Driver'}
                    </p>
                    <p className="font-semibold text-foreground">Ahmed Al-Mansouri</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {language === 'ar' ? 'رقم الهاتف' : 'Phone'}
                    </p>
                    <p className="font-semibold text-foreground">+966 50 123 4567</p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-muted-foreground mb-4">
                  {language === 'ar'
                    ? 'هل لديك أي أسئلة؟ تواصل معنا'
                    : 'Have any questions? Contact us'}
                </p>
                <div className="flex gap-4">
                  <a
                    href="tel:+966920023204"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition font-medium"
                  >
                    {language === 'ar' ? 'اتصل بنا' : 'Call Us'}
                  </a>
                  <a
                    href="https://wa.me/966558828009"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition font-medium"
                  >
                    {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!showTracking && (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Package size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {language === 'ar'
                  ? 'أدخل رقم الطلب لمتابعة شحنتك'
                  : 'Enter your order number to track your shipment'}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
