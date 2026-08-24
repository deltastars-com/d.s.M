import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { useCart } from '@/contexts/CartContext';
import { allProducts, getProductsByCategory, searchProducts } from '@/data/products';
import { CATEGORIES } from '@/constants';
import type { Product, Page } from '@/types';
import ProductCard from '@/components/ProductCard';

interface ProductsPageProps {
  onNavigate: (page: Page, params?: any) => void;
  initialCategory?: string;
}

export default function ProductsPage({ onNavigate, initialCategory }: ProductsPageProps) {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');

  const filteredProducts = useMemo(() => {
    let products = selectedCategory
      ? getProductsByCategory(selectedCategory)
      : search
        ? searchProducts(search)
        : allProducts;

    if (search && selectedCategory) {
      const q = search.toLowerCase();
      products = products.filter(p => p.name_ar.includes(search) || p.name_en.toLowerCase().includes(q));
    }

    if (sortBy === 'priceAsc') products = [...products].sort((a, b) => a.price - b.price);
    if (sortBy === 'priceDesc') products = [...products].sort((a, b) => b.price - a.price);

    return products;
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="container py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-black text-emerald-900 mb-2">{t('products.title')}</h1>
      <p className="text-slate-500 text-sm mb-6">{t('products.subtitle')}</p>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('products.searchPlaceholder')}
          className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as any)}
          className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none"
        >
          <option value="default">{t('products.sort.default')}</option>
          <option value="priceAsc">{t('products.sort.priceAsc')}</option>
          <option value="priceDesc">{t('products.sort.priceDesc')}</option>
        </select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <button
          onClick={() => { setSelectedCategory(''); setSearch(''); }}
          className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
            !selectedCategory ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {t('products.allCategories')}
        </button>
        {CATEGORIES.filter(c => c.isVisible).map(cat => (
          <button
            key={cat.key}
            onClick={() => { setSelectedCategory(cat.key); setSearch(''); }}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
              selectedCategory === cat.key ? 'bg-emerald-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.icon} {language === 'ar' ? cat.label_ar : cat.label_en}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => addItem(p, 1)}
              onViewDetail={(id) => onNavigate('productDetail', id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="text-slate-500 font-semibold">{t('products.noResults')}</p>
        </div>
      )}
    </div>
  );
}
