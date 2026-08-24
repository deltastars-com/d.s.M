import { useLanguage } from '@/contexts/LanguageContext';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function NotificationsPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const notifications = [
    { id: 1, icon: '🎉', title: ar ? 'مرحباً بك في نجوم دلتا' : 'Welcome to Delta Stars', desc: ar ? 'اكتشف أكثر من 237 منتج طازج بأسعار تنافسية' : 'Discover 237+ fresh products at competitive prices', time: ar ? 'الآن' : 'Now', read: false },
    { id: 2, icon: '🔥', title: ar ? 'عروض حصرية' : 'Exclusive Offers', desc: ar ? 'خصم 20% على جميع المنتجات هذا الأسبوع' : '20% off all products this week', time: ar ? 'منذ ساعة' : '1h ago', read: false },
    { id: 3, icon: '🚚', title: ar ? 'توصيل مجاني' : 'Free Delivery', desc: ar ? 'توصيل مجاني للطلبات فوق 200 ريال' : 'Free delivery for orders above 200 SAR', time: ar ? 'منذ يوم' : '1d ago', read: true },
  ];

  return (
    <div className="container py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-emerald-900">{ar ? '🔔 الإشعارات' : '🔔 Notifications'}</h1>
        <button className="text-sm text-emerald-600 font-bold hover:underline">{ar ? 'تحديد الكل كمقروء' : 'Mark all read'}</button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">🔔</span>
          <p className="text-slate-500 font-semibold">{ar ? 'لا توجد إشعارات جديدة' : 'No new notifications'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id}
              className={`bg-white rounded-2xl border p-5 flex gap-4 transition hover:shadow-md ${n.read ? 'border-slate-100' : 'border-emerald-200 bg-emerald-50/30'}`}>
              <span className="text-3xl">{n.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-emerald-900">{n.title}</h3>
                  {!n.read && <span className="w-2 h-2 bg-emerald-500 rounded-full" />}
                </div>
                <p className="text-xs text-slate-500 mt-1">{n.desc}</p>
                <p className="text-[10px] text-slate-400 mt-2">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
