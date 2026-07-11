import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Eye, Trash2 } from "lucide-react";

interface ViewedProduct {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  category: string;
  viewedAt: string;
}

const mockViewedProducts: ViewedProduct[] = [
  {
    id: 1,
    name: "Red Apple",
    nameAr: "تفاح أحمر طازج",
    price: 25,
    image: "https://via.placeholder.com/200x200?text=Apple",
    category: "Fruits",
    viewedAt: "2025-01-15 10:30",
  },
  {
    id: 2,
    name: "Fresh Carrot",
    nameAr: "جزر برتقالي طازج",
    price: 15,
    image: "https://via.placeholder.com/200x200?text=Carrot",
    category: "Vegetables",
    viewedAt: "2025-01-15 09:15",
  },
  {
    id: 3,
    name: "Tomato",
    nameAr: "طماطم حمراء طازجة",
    price: 20,
    image: "https://via.placeholder.com/200x200?text=Tomato",
    category: "Vegetables",
    viewedAt: "2025-01-14 15:45",
  },
  {
    id: 4,
    name: "Banana",
    nameAr: "موز أصفر",
    price: 18,
    image: "https://via.placeholder.com/200x200?text=Banana",
    category: "Fruits",
    viewedAt: "2025-01-14 14:20",
  },
];

export default function RecentlyViewed() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [products, setProducts] = React.useState(mockViewedProducts);

  const handleRemove = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleClearAll = () => {
    setProducts([]);
  };

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? "rtl" : "ltr"}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {isArabic ? "المنتجات المشاهدة مؤخراً" : "Recently Viewed"}
            </h1>
            <p className="text-muted-foreground">
              {isArabic
                ? "المنتجات التي شاهدتها مؤخراً"
                : "Products you recently viewed"}
            </p>
          </div>
          {products.length > 0 && (
            <Button
              variant="destructive"
              onClick={handleClearAll}
            >
              {isArabic ? "مسح الكل" : "Clear All"}
            </Button>
          )}
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Eye size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                {isArabic
                  ? "لم تشاهد أي منتجات حتى الآن"
                  : "You haven't viewed any products yet"}
              </p>
              <Button className="gap-2">
                <ShoppingCart size={20} />
                {isArabic ? "تصفح المنتجات" : "Browse Products"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition">
                <CardContent className="p-4">
                  {/* Product Image */}
                  <div className="mb-4 relative">
                    <img
                      src={product.image}
                      alt={isArabic ? product.nameAr : product.name}
                      className="w-full h-48 object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 mb-4">
                    <h3 className="font-semibold text-foreground">
                      {isArabic ? product.nameAr : product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isArabic ? "شوهد في:" : "Viewed at:"} {product.viewedAt}
                    </p>
                  </div>

                  {/* Price and Actions */}
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-primary">
                      {product.price} {isArabic ? "ر.س" : "SAR"}
                    </p>
                    <Button className="w-full gap-2">
                      <ShoppingCart size={16} />
                      {isArabic ? "أضف إلى السلة" : "Add to Cart"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
