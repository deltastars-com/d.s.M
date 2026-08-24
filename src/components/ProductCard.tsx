import { useLanguage } from '@/contexts/LanguageContext';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetail: (id: number) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetail }: ProductCardProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition group">
      {/* Image */}
      <div
        onClick={() => onViewDetail(product.id)}
        className="relative aspect-square bg-gradient-to-br from-emerald-50 to-emerald-100 cursor-pointer overflow-hidden"
      >
        {product.image ? (
          <img
            src={product.image}
            alt={language === 'ar' ? product.name_ar : product.name_en}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">
            {product.category === 'fruits' ? '🍎' : product.category === 'vegetables' ? '🥬' : product.category === 'dates' ? '🌴' : product.category === 'herbs' ? '🌿' : product.category === 'nuts' ? '🥜' : '📦'}
          </div>
        )}
        {product.is_featured && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            ⭐
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3
          onClick={() => onViewDetail(product.id)}
          className="font-bold text-sm text-emerald-900 line-clamp-2 cursor-pointer hover:text-emerald-600 transition mb-1"
        >
          {language === 'ar' ? product.name_ar : product.name_en}
        </h3>
        <p className="text-xs text-slate-500 mb-2">
          {language === 'ar' ? (product.category_ar || product.category) : (product.category_en || product.category)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-black text-emerald-700">
            {product.price} <span className="text-xs font-semibold text-slate-400">{language === 'ar' ? 'ر.س' : 'SAR'}</span>
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl flex items-center justify-center transition transform hover:scale-110 active:scale-95 shadow-md"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
