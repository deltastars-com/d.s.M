import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2, Share2 } from "lucide-react";

interface WishlistItem {
  id: number;
  name: string;
  nameAr: string;
  price: number;
  image: string;
  category: string;
  addedAt: string;
  inStock: boolean;
}

const mockWishlist: WishlistItem[] = [
  {
    id: 1,
    name: "Red Apple",
    nameAr: "تفاح أحمر طازج",
    price: 25,
    image: "https://via.placeholder.com/200x200?text=Apple",
    category: "Fruits",
    addedAt: "2025-01-15",
    inStock: true,
  },
  {
    id: 2,
    name: "Fresh Carrot",
    nameAr: "جزر برتقالي طازج",
    price: 15,
    image: "https://via.placeholder.com/200x200?text=Carrot",
    category: "Vegetables",
    addedAt: "2025-01-14",
    inStock: true,
  },
  {
    id: 3,
    name: "Organic Tomato",
    nameAr: "طماطم عضوية",
    price: 35,
    image: "https://via.placeholder.com/200x200?text=Tomato",
    category: "Vegetables",
    addedAt: "2025-01-13",
    inStock: false,
  },
];

export default function Wishlist() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [items, setItems] = React.useState(mockWishlist);

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: number) => {
    console.log("Added to cart:", id);
  };

  const handleShare = (id: number) => {
    console.log("Shared:", id);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? "rtl" : "ltr"}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {isArabic ? "قائمة الرغبات" : "Wishlist"}
          </h1>
          <p className="text-muted-foreground">
            {isArabic
              ? `لديك ${items.length} منتج في قائمة الرغبات`
              : `You have ${items.length} items in your wishlist`}
          </p>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-4">
                {isArabic
                  ? "قائمة الرغبات الخاصة بك فارغة"
                  : "Your wishlist is empty"}
              </p>
              <Button className="gap-2">
                {isArabic ? "تصفح المنتجات" : "Browse Products"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Wishlist Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={isArabic ? item.nameAr : item.name}
                          className="w-32 h-32 object-cover rounded"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">
                              {isArabic ? item.nameAr : item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.category}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-700 transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>

                        <p className="text-xs text-muted-foreground mb-3">
                          {isArabic ? "أضيف في:" : "Added on:"} {item.addedAt}
                        </p>

                        {/* Stock Status */}
                        {!item.inStock && (
                          <p className="text-red-500 text-sm mb-3">
                            {isArabic ? "غير متوفر حالياً" : "Out of Stock"}
                          </p>
                        )}

                        {/* Price and Actions */}
                        <div className="flex justify-between items-center">
                          <p className="text-2xl font-bold text-primary">
                            {item.price} {isArabic ? "ر.س" : "SAR"}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShare(item.id)}
                              className="gap-2"
                            >
                              <Share2 size={16} />
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(item.id)}
                              disabled={!item.inStock}
                              className="gap-2"
                            >
                              <ShoppingCart size={16} />
                              {isArabic ? "أضف" : "Add"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    {isArabic ? "ملخص" : "Summary"}
                  </h3>

                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {isArabic ? "عدد المنتجات" : "Items"}
                      </span>
                      <span className="font-semibold">{items.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {isArabic ? "المتوفرة" : "In Stock"}
                      </span>
                      <span className="font-semibold">
                        {items.filter((i) => i.inStock).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {isArabic ? "غير المتوفرة" : "Out of Stock"}
                      </span>
                      <span className="font-semibold">
                        {items.filter((i) => !i.inStock).length}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>{isArabic ? "الإجمالي" : "Total"}</span>
                      <span className="text-primary">
                        {totalPrice} {isArabic ? "ر.س" : "SAR"}
                      </span>
                    </div>
                    <Button className="w-full gap-2">
                      <ShoppingCart size={16} />
                      {isArabic ? "أضف الكل للسلة" : "Add All to Cart"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      {isArabic ? "مشاركة القائمة" : "Share Wishlist"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
