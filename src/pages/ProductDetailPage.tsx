import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { useToast } from '@/contexts/ToastContext';
import type { Page } from '@/types';

interface ProductDetailPageProps {
  productId: number;
  onNavigate: (page: Page) => void;
}

export default function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const ar = language === 'ar';
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="container py-16 px-4 text-center">
        <span className="text-5xl block mb-4">❌</span>
        <p className="text-slate-500 font-semibold">{ar ? 'المنتج غير موجود' : 'Product not found'}</p>
        <button onClick={() => onNavigate('products')} className="mt-4 text-emerald-600 font-semibold hover:underline">
          {ar ? 'العودة للمنتجات' : 'Back to Products'}
        </button>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4">
      <button onClick={() => onNavigate('products')} className="text-sm text-slate-500 hover:text-emerald-600 transition mb-4 block">
        ← {t('productDetail.back')}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl aspect-square flex items-center justify-center text-8xl">
          {product.category === 'fruits' ? '🍎' : product.category === 'vegetables' ? '🥬' : product.category === 'dates' ? '🌴' : product.category === 'herbs' ? '🌿' : product.category === 'nuts' ? '🥜' : '📦'}
        </div>

        {/* Info */}
        <div>
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-3">
            {ar ? (product.category_ar || product.category) : (product.category_en || product.category)}
          </span>
          <h1 className="text-3xl font-black text-emerald-900 mb-2">
            {ar ? product.name_ar : product.name_en}
          </h1>
          <p className="text-slate-500 text-sm mb-4">
            {ar ? product.description_ar : (product.description_en || product.description_ar || '')}
          </p>

          <div className="text-3xl font-black text-emerald-700 mb-6">
            {product.price} <span className="text-base font-semibold text-slate-400">{ar ? 'ر.س' : 'SAR'}</span>
            <span className="text-sm font-normal text-slate-500 ms-2">/ {ar ? product.unit_ar : product.unit_en}</span>
          </div>

          {product.origin_ar && (
            <p className="text-sm text-slate-600 mb-2">🌍 {ar ? 'بلد المنشأ:' : 'Origin:'} {ar ? product.origin_ar : product.origin_en}</p>
          )}
          {product.benefits_ar && (
            <p className="text-sm text-slate-600 mb-6">💚 {ar ? product.benefits_ar : product.benefits_en}</p>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => {
                addItem(product, 1);
                addToast(ar ? 'تمت الإضافة للسلة' : 'Added to cart', 'success');
              }}
              className="flex-1 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition"
            >
              🛒 {ar ? 'أضف للسلة' : 'Add to Cart'}
            </button>
            <button
              onClick={() => {
                addItem(product, 1);
                onNavigate('cart');
              }}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-900 font-bold rounded-xl transition"
            >
              {ar ? 'اشترِ الآن' : 'Buy Now'}
            </button>
          </div>

          {/* Quality Badge */}
          <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-sm text-emerald-700 font-semibold">
              ✅ {t('productDetail.qualityNotice')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
