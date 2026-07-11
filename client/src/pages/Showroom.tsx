import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Star, Tag, Zap, Gift } from "lucide-react";

interface ShowroomProduct {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: "new" | "sale" | "special" | "seasonal";
}

const mockShowroomProducts: ShowroomProduct[] = [
  {
    id: 1,
    name: "Fresh Red Apple",
    nameAr: "تفاح أحمر طازج",
    price: 25,
    originalPrice: 35,
    image: "https://via.placeholder.com/250x250?text=Apple",
    category: "Fruits",
    rating: 4.8,
    reviews: 156,
    badge: "sale",
  },
  {
    id: 2,
    name: "Organic Carrot",
    nameAr: "جزر عضوي",
    price: 15,
    image: "https://via.placeholder.com/250x250?text=Carrot",
    category: "Vegetables",
    rating: 4.6,
    reviews: 98,
    badge: "new",
  },
  {
    id: 3,
    name: "Premium Tomato",
    nameAr: "طماطم فاخرة",
    price: 30,
    originalPrice: 40,
    image: "https://via.placeholder.com/250x250?text=Tomato",
    category: "Vegetables",
    rating: 4.9,
    reviews: 203,
    badge: "special",
  },
  {
    id: 4,
    name: "Sweet Banana",
    nameAr: "موز حلو",
    price: 18,
    image: "https://via.placeholder.com/250x250?text=Banana",
    category: "Fruits",
    rating: 4.7,
    reviews: 142,
    badge: "seasonal",
  },
];

const badgeConfig = {
  new: { label: { ar: "جديد", en: "New" }, color: "bg-blue-500" },
  sale: { label: { ar: "عرض", en: "Sale" }, color: "bg-red-500" },
  special: { label: { ar: "خاص", en: "Special" }, color: "bg-purple-500" },
  seasonal: { label: { ar: "موسمي", en: "Seasonal" }, color: "bg-green-500" },
};

export default function Showroom() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");

  const categories = ["Fruits", "Vegetables"];
  const filteredProducts = selectedCategory
    ? mockShowroomProducts.filter((p) => p.category === selectedCategory)
    : mockShowroomProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Zap size={40} className="text-yellow-500" />
            {isArabic ? "صالة العروض" : "Showroom"}
          </h1>
          <p className="text-muted-foreground">
            {isArabic
              ? "اكتشف أفضل العروض والمنتجات الجديدة"
              : "Discover best offers and new products"}
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Category Filter */}
              <div className="flex-1">
                <h3 className="font-semibold mb-3">
                  {isArabic ? "الفئات" : "Categories"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    onClick={() => setSelectedCategory(null)}
                    size="sm"
                  >
                    {isArabic ? "الكل" : "All"}
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      onClick={() => setSelectedCategory(cat)}
                      size="sm"
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="flex-1">
                <h3 className="font-semibold mb-3">
                  {isArabic ? "ترتيب حسب" : "Sort by"}
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="featured">
                    {isArabic ? "مميز" : "Featured"}
                  </option>
                  <option value="price-low">
                    {isArabic ? "السعر: الأقل أولاً" : "Price: Low to High"}
                  </option>
                  <option value="price-high">
                    {isArabic ? "السعر: الأعلى أولاً" : "Price: High to Low"}
                  </option>
                  <option value="rating">
                    {isArabic ? "التقييم الأعلى" : "Highest Rating"}
                  </option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const badgeInfo = product.badge ? badgeConfig[product.badge] : null;
            const discount = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )
              : 0;

            return (
              <Card key={product.id} className="hover:shadow-lg transition overflow-hidden">
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={isArabic ? product.nameAr : product.name}
                    className="w-full h-48 object-cover"
                  />

                  {/* Badge */}
                  {badgeInfo && (
                    <div
                      className={`absolute top-3 right-3 ${badgeInfo.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                    >
                      {isArabic ? badgeInfo.label.ar : badgeInfo.label.en}
                    </div>
                  )}

                  {/* Discount */}
                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">
                    {isArabic ? product.nameAr : product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {product.category}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(product.rating)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-primary">
                        {product.price} {isArabic ? "ر.س" : "SAR"}
                      </p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {product.originalPrice} SAR
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full gap-2">
                    <ShoppingCart size={16} />
                    {isArabic ? "أضف للسلة" : "Add to Cart"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <Card>
            <CardContent className="py-16 text-center">
              <Gift size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {isArabic ? "لا توجد منتجات" : "No products found"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
