import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/contexts/CartContext';
import { SYSTEM_CONFIG } from '@/constants';
import type { Page } from '@/types';

interface CartPageProps {
  onNavigate: (page: Page) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart();
  const ar = language === 'ar';

  const vat = subtotal * SYSTEM_CONFIG.VAT_RATE;
  const deliveryFee = subtotal >= SYSTEM_CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : SYSTEM_CONFIG.DELIVERY_FEE;
  const total = subtotal + vat + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container py-16 px-4 text-center">
        <span className="text-6xl block mb-4">🛒</span>
        <h2 className="text-xl font-bold text-emerald-900 mb-2">{t('cart.title')}</h2>
        <p className="text-slate-500 mb-6">{t('cart.empty')}</p>
        <button
          onClick={() => onNavigate('products')}
          className="px-8 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition"
        >
          {t('cart.continueShopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-emerald-900">{t('cart.title')} ({items.length})</h1>
        <button onClick={clearCart} className="text-red-500 hover:text-red-600 text-sm font-semibold transition">
          🗑️ {t('cart.clear')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-100 p-4 flex gap-4">
              <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                {item.category === 'fruits' ? '🍎' : item.category === 'vegetables' ? '🥬' : item.category === 'dates' ? '🌴' : '📦'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-emerald-900 line-clamp-1">
                  {ar ? item.name_ar : item.name_en}
                </h3>
                <p className="text-xs text-slate-500 mb-2">{ar ? item.unit_ar : item.unit_en}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-emerald-700">{item.price * item.quantity} ر.س</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-slate-200 transition"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-emerald-200 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center text-sm hover:bg-red-100 transition ml-2"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 h-fit">
          <h3 className="font-bold text-emerald-900 mb-4">{t('cart.summary')}</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">{t('cart.items_value')}</span>
              <span className="font-semibold">{subtotal.toFixed(2)} ر.س</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t('cart.vat')}</span>
              <span className="font-semibold">{vat.toFixed(2)} ر.س</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t('cart.deliveryFeeLabel')}</span>
              <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : ''}`}>
                {deliveryFee === 0 ? t('cart.freeLabel') : `${deliveryFee} ر.س`}
              </span>
            </div>
            <div className="border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span className="font-bold text-emerald-900">{t('cart.grandTotalLabel')}</span>
                <span className="font-black text-lg text-emerald-700">{total.toFixed(2)} ر.س</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('checkout')}
            className="w-full mt-6 px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition text-sm"
          >
            {t('cart.finalizeCheckout')} 🛒
          </button>

          <button
            onClick={() => onNavigate('products')}
            className="w-full mt-3 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition text-sm"
          >
            {t('cart.continueShopping')}
          </button>
        </div>
      </div>
    </div>
  );
}
