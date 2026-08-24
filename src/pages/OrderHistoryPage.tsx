import { useLanguage } from '@/contexts/LanguageContext';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function OrderHistoryPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const orders: { id: string; date: string; items: string; total: string; status: string; statusColor: string }[] = [];

  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-black text-emerald-900 mb-6">{ar ? '📦 سجل الطلبات' : '📦 Order History'}</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">📋</span>
          <h2 className="text-xl font-bold text-slate-900 mb-2">{ar ? 'لا توجد طلبات سابقة' : 'No Previous Orders'}</h2>
          <p className="text-slate-500 mb-6">{ar ? 'ابدأ بالتسوق وسيظهر سجل طلباتك هنا' : 'Start shopping and your order history will appear here'}</p>
          <button onClick={() => onNavigate('products')}
            className="px-8 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition">
            🛒 {ar ? 'تسوق الآن' : 'Shop Now'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-emerald-900">#{order.id}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.statusColor}`}>{order.status}</span>
              </div>
              <p className="text-sm text-slate-500">{order.date}</p>
              <p className="text-sm text-slate-600 mt-1">{order.items}</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                <span className="font-black text-emerald-700">{order.total}</span>
                <button onClick={() => onNavigate('track_order')}
                  className="text-emerald-600 text-sm font-bold hover:underline">
                  {ar ? 'تتبع' : 'Track'} →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
