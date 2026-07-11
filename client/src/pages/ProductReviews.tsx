import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ThumbsUp, MessageSquare } from "lucide-react";

interface Review {
  id: number;
  productName: string;
  rating: number;
  title: string;
  review: string;
  author: string;
  date: string;
  helpful: number;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: 1,
    productName: "تفاح أحمر طازج",
    rating: 5,
    title: "منتج ممتاز جداً",
    review: "التفاح طازج جداً وذو جودة عالية. التوصيل كان سريع والتغليف ممتاز.",
    author: "أحمد محمد",
    date: "2025-01-15",
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    productName: "جزر برتقالي",
    rating: 4,
    title: "جيد جداً",
    review: "الجزر طازج وحلو الطعم. السعر مناسب جداً.",
    author: "فاطمة علي",
    date: "2025-01-14",
    helpful: 18,
    verified: true,
  },
  {
    id: 3,
    productName: "طماطم حمراء",
    rating: 5,
    title: "أفضل طماطم اشتريتها",
    review: "الطماطم حمراء وطازجة جداً. رائحتها جميلة وطعمها لذيذ.",
    author: "سارة محمود",
    date: "2025-01-13",
    helpful: 32,
    verified: true,
  },
];

export default function ProductReviews() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("recent");

  const filteredReviews = selectedRating
    ? mockReviews.filter((r) => r.rating === selectedRating)
    : mockReviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const averageRating =
    (mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length).toFixed(1);

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? "rtl" : "ltr"}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {isArabic ? "تقييمات العملاء" : "Customer Reviews"}
          </h1>
          <p className="text-muted-foreground">
            {isArabic
              ? "اقرأ آراء العملاء حول منتجاتنا"
              : "Read customer opinions about our products"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {isArabic ? "التقييم العام" : "Overall Rating"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Rating Summary */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-500 mb-2">
                    {averageRating}
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.round(parseFloat(averageRating))
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isArabic ? "بناءً على" : "Based on"} {mockReviews.length}{" "}
                    {isArabic ? "تقييم" : "reviews"}
                  </p>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold mb-3">
                    {isArabic ? "تصفية حسب التقييم" : "Filter by Rating"}
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedRating(null)}
                      className={`w-full text-left py-2 px-3 rounded transition ${
                        selectedRating === null
                          ? "bg-primary text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      {isArabic ? "الكل" : "All"}
                    </button>
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating)}
                        className={`w-full text-left py-2 px-3 rounded transition flex items-center gap-2 ${
                          selectedRating === rating
                            ? "bg-primary text-white"
                            : "hover:bg-muted"
                        }`}
                      >
                        <span>{rating}</span>
                        <Star size={16} className="fill-yellow-500 text-yellow-500" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="font-semibold mb-3">
                    {isArabic ? "ترتيب حسب" : "Sort by"}
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-border rounded bg-background"
                  >
                    <option value="recent">
                      {isArabic ? "الأحدث" : "Most Recent"}
                    </option>
                    <option value="helpful">
                      {isArabic ? "الأكثر مساعدة" : "Most Helpful"}
                    </option>
                    <option value="highest">
                      {isArabic ? "التقييم الأعلى" : "Highest Rating"}
                    </option>
                    <option value="lowest">
                      {isArabic ? "التقييم الأقل" : "Lowest Rating"}
                    </option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3 space-y-4">
            {sortedReviews.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    {isArabic ? "لا توجد تقييمات" : "No reviews found"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              sortedReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="pt-6">
                    {/* Review Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{review.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {isArabic ? "المنتج:" : "Product:"} {review.productName}
                        </p>
                      </div>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {isArabic ? "تم التحقق" : "Verified"}
                        </span>
                      )}
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < review.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-foreground mb-4">{review.review}</p>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground">
                        <p className="font-semibold">{review.author}</p>
                        <p>{review.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <ThumbsUp size={16} />
                          {review.helpful}
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare size={16} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
