import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { allProducts, getCategories, searchProducts } from '@/data/allProducts';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ShoppingCart, Globe, ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';

export default function Products() {
  const { language, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getCategories();
  
  let filteredProducts = selectedCategory === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory);
  
  if (searchQuery) {
    filteredProducts = searchProducts(searchQuery).filter(p => 
      selectedCategory === 'all' || p.category === selectedCategory
    );
  }

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover:text-accent transition">
                <ArrowLeft size={20} />
                <h1 className="text-2xl font-bold text-accent">{t('companyName')}</h1>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground hover:opacity-90 transition"
            >
              <Globe size={20} />
              <span>{language === 'ar' ? 'EN' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث عن منتج...' : 'Search for a product...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-48">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {language === 'ar' ? 'الفئات' : 'Categories'}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === 'all'
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted text-foreground'
                  }`}
                >
                  {language === 'ar' ? 'جميع المنتجات' : 'All Products'}
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === cat
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {selectedCategory === 'all'
                ? (language === 'ar' ? 'جميع المنتجات' : 'All Products')
                : selectedCategory}
            </h2>
            <p className="text-muted-foreground mb-8">
              {language === 'ar' ? `عدد المنتجات: ${filteredProducts.length}` : `Products: ${filteredProducts.length}`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition hover:shadow-lg"
                >
                  {/* Product Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <ShoppingCart size={48} className="text-accent/50" />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {language === 'ar' ? product.name_ar : product.name_en}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {product.category} • {product.unit}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-accent">
                        {product.price} ر.س
                      </div>
                      <Button
                        size="sm"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {language === 'ar' ? 'أضف' : 'Add'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {language === 'ar' ? 'لا توجد منتجات' : 'No products found'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2024 {language === 'ar' ? 'شركة نجوم دلتا للتجارة' : 'Delta Stars Trading'}. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</p>
        </div>
      </footer>
    </div>
  );
}
