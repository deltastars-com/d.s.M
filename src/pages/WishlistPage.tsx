import { useLanguage } from '@/contexts/LanguageContext';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function WishlistPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const ar = language === 'ar';

  return (
    <div className="container py-12 px-4 text-center">
      <span className="text-6xl block mb-4">💝</span>
      <h1 className="text-3xl font-black text-emerald-900 mb-2">{ar ? 'المفضلة' : 'Wishlist'}</h1>
      <p className="text-slate-500 mb-8">{ar ? 'منتجاتك المفضلة ستظهر هنا' : 'Your favorite products will appear here'}</p>
      <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-100 p-8">
        <span className="text-5xl block mb-4">💫</span>
        <p className="text-slate-500 mb-6">{ar ? 'أضف منتجاتك المفضلة بالضغط على أيقونة القلب' : 'Add favorites by tapping the heart icon on products'}</p>
        <button onClick={() => onNavigate('products')}
          className="px-8 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-xl transition">
          {ar ? 'استكشف المنتجات' : 'Browse Products'}
        </button>
      </div>
    </div>
  );
}
