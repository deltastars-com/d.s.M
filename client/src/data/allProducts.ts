export interface Product {
  id: number;
  name_ar: string;
  name_en: string;
  category: string;
  price: number;
  unit: string;
  description_ar?: string;
  description_en?: string;
  image?: string;
  inStock?: boolean;
}

export const allProducts: Product[] = [
  // الفواكه
  { id: 1, name_ar: "تفاح سكري", name_en: "Sweet Apple", category: "فواكه", price: 35, unit: "كيلو", inStock: true },
  { id: 2, name_ar: "تفاح أخضر", name_en: "Green Apple", category: "فواكه", price: 32, unit: "كيلو", inStock: true },
  { id: 3, name_ar: "تفاح أحمر", name_en: "Red Apple", category: "فواكه", price: 38, unit: "كيلو", inStock: true },
  { id: 4, name_ar: "تفاح أصفر", name_en: "Yellow Apple", category: "فواكه", price: 30, unit: "كيلو", inStock: true },
  { id: 5, name_ar: "مشمش", name_en: "Apricot", category: "فواكه", price: 45, unit: "كيلو", inStock: true },
  { id: 7, name_ar: "موز", name_en: "Banana", category: "فواكه", price: 25, unit: "كيلو", inStock: true },
  { id: 17, name_ar: "تين شوكي", name_en: "Prickly Pear", category: "فواكه", price: 40, unit: "كيلو", inStock: true },
  { id: 23, name_ar: "جوز الهند", name_en: "Coconut", category: "فواكه", price: 50, unit: "حبة", inStock: true },
  { id: 27, name_ar: "قشطة", name_en: "Custard Apple", category: "فواكه", price: 55, unit: "كيلو", inStock: true },
  { id: 33, name_ar: "تين محلي", name_en: "Local Fig", category: "فواكه", price: 60, unit: "كيلو", inStock: true },
  { id: 37, name_ar: "جريب فروت", name_en: "Grapefruit", category: "فواكه", price: 42, unit: "كيلو", inStock: true },
  { id: 38, name_ar: "عنب أسود", name_en: "Black Grapes", category: "فواكه", price: 48, unit: "كيلو", inStock: true },
  { id: 39, name_ar: "عنب أحمر", name_en: "Red Grapes", category: "فواكه", price: 50, unit: "كيلو", inStock: true },
  { id: 40, name_ar: "عنب أخضر", name_en: "Green Grapes", category: "فواكه", price: 52, unit: "كيلو", inStock: true },
  { id: 41, name_ar: "جوافة", name_en: "Guava", category: "فواكه", price: 28, unit: "كيلو", inStock: true },
  { id: 42, name_ar: "كيوي", name_en: "Kiwi", category: "فواكه", price: 65, unit: "كيلو", inStock: true },
  { id: 43, name_ar: "ليمون", name_en: "Lemon", category: "فواكه", price: 20, unit: "كيلو", inStock: true },
  { id: 44, name_ar: "ليمون أخضر", name_en: "Lime", category: "فواكه", price: 22, unit: "كيلو", inStock: true },
  { id: 45, name_ar: "مانجو", name_en: "Mango", category: "فواكه", price: 70, unit: "كيلو", inStock: true },
  { id: 46, name_ar: "شمام", name_en: "Melon", category: "فواكه", price: 35, unit: "حبة", inStock: true },
  { id: 47, name_ar: "برتقال", name_en: "Orange", category: "فواكه", price: 25, unit: "كيلو", inStock: true },
  { id: 48, name_ar: "برتقال يوسفي", name_en: "Mandarin", category: "فواكه", price: 30, unit: "كيلو", inStock: true },
  { id: 49, name_ar: "بابايا", name_en: "Papaya", category: "فواكه", price: 55, unit: "كيلو", inStock: true },
  { id: 50, name_ar: "شمام كنتالوب", name_en: "Cantaloupe", category: "فواكه", price: 40, unit: "حبة", inStock: true },
  { id: 69, name_ar: "كمثرى", name_en: "Pear", category: "فواكه", price: 45, unit: "كيلو", inStock: true },
  { id: 70, name_ar: "أناناس بيبي", name_en: "Baby Pineapple", category: "فواكه", price: 60, unit: "حبة", inStock: true },
  { id: 71, name_ar: "أناناس", name_en: "Pineapple", category: "فواكه", price: 50, unit: "حبة", inStock: true },
  { id: 72, name_ar: "بخارة أسود", name_en: "Black Mulberry", category: "فواكه", price: 75, unit: "كيلو", inStock: true },
  { id: 73, name_ar: "بخارة أحمر", name_en: "Red Mulberry", category: "فواكه", price: 75, unit: "كيلو", inStock: true },
  { id: 74, name_ar: "رمان", name_en: "Pomegranate", category: "فواكه", price: 65, unit: "كيلو", inStock: true },

  // الخضروات
  { id: 6, name_ar: "كراث", name_en: "Leek", category: "خضروات", price: 15, unit: "كيلو", inStock: true },
  { id: 8, name_ar: "فاصوليا خضراء", name_en: "Green Beans", category: "خضروات", price: 28, unit: "كيلو", inStock: true },
  { id: 9, name_ar: "بنجر", name_en: "Beet", category: "خضروات", price: 18, unit: "كيلو", inStock: true },
  { id: 10, name_ar: "رومي أخضر", name_en: "Green Pepper", category: "خضروات", price: 22, unit: "كيلو", inStock: true },
  { id: 11, name_ar: "رومي أحمر", name_en: "Red Pepper", category: "خضروات", price: 25, unit: "كيلو", inStock: true },
  { id: 12, name_ar: "رومي أصفر", name_en: "Yellow Pepper", category: "خضروات", price: 25, unit: "كيلو", inStock: true },
  { id: 13, name_ar: "كرلا", name_en: "Bitter Melon", category: "خضروات", price: 20, unit: "كيلو", inStock: true },
  { id: 14, name_ar: "بروكلي", name_en: "Broccoli", category: "خضروات", price: 32, unit: "كيلو", inStock: true },
  { id: 15, name_ar: "ملفوف أحمر", name_en: "Red Cabbage", category: "خضروات", price: 16, unit: "كيلو", inStock: true },
  { id: 16, name_ar: "ملفوف أبيض", name_en: "White Cabbage", category: "خضروات", price: 14, unit: "كيلو", inStock: true },
  { id: 18, name_ar: "جزر محلي", name_en: "Local Carrot", category: "خضروات", price: 12, unit: "كيلو", inStock: true },
  { id: 19, name_ar: "زهرة", name_en: "Cauliflower", category: "خضروات", price: 28, unit: "كيلو", inStock: true },
  { id: 20, name_ar: "كرفس محلي", name_en: "Local Celery", category: "خضروات", price: 18, unit: "كيلو", inStock: true },
  { id: 21, name_ar: "فلفل حار أخضر", name_en: "Green Chili", category: "خضروات", price: 35, unit: "كيلو", inStock: true },
  { id: 22, name_ar: "فلفل حار أحمر", name_en: "Red Chili", category: "خضروات", price: 38, unit: "كيلو", inStock: true },
  { id: 24, name_ar: "كزبرة", name_en: "Cilantro", category: "خضروات", price: 15, unit: "حزمة", inStock: true },
  { id: 25, name_ar: "خيار", name_en: "Cucumber", category: "خضروات", price: 16, unit: "كيلو", inStock: true },
  { id: 28, name_ar: "شبت", name_en: "Dill", category: "خضروات", price: 12, unit: "حزمة", inStock: true },
  { id: 29, name_ar: "درام ستك", name_en: "Drumstick", category: "خضروات", price: 40, unit: "كيلو", inStock: true },
  { id: 30, name_ar: "باذنجان أسود مدور", name_en: "Black Eggplant", category: "خضروات", price: 20, unit: "كيلو", inStock: true },
  { id: 31, name_ar: "باذنجان طويل", name_en: "Long Eggplant", category: "خضروات", price: 22, unit: "كيلو", inStock: true },
  { id: 32, name_ar: "باذنجان أبيض", name_en: "White Eggplant", category: "خضروات", price: 24, unit: "كيلو", inStock: true },
  { id: 34, name_ar: "ثوم مقشر", name_en: "Peeled Garlic", category: "خضروات", price: 120, unit: "كيلو", inStock: true },
  { id: 35, name_ar: "ثوم", name_en: "Garlic", category: "خضروات", price: 90, unit: "كيلو", inStock: true },
  { id: 36, name_ar: "زنجبيل", name_en: "Ginger", category: "خضروات", price: 85, unit: "كيلو", inStock: true },
  { id: 51, name_ar: "بصل أحمر", name_en: "Red Onion", category: "خضروات", price: 10, unit: "كيلو", inStock: true },
  { id: 52, name_ar: "بصل أبيض", name_en: "White Onion", category: "خضروات", price: 8, unit: "كيلو", inStock: true },
  { id: 53, name_ar: "بصل أصفر", name_en: "Yellow Onion", category: "خضروات", price: 9, unit: "كيلو", inStock: true },
  { id: 54, name_ar: "بصل أخضر", name_en: "Green Onion", category: "خضروات", price: 18, unit: "حزمة", inStock: true },
  { id: 55, name_ar: "بطاطا", name_en: "Potato", category: "خضروات", price: 7, unit: "كيلو", inStock: true },
  { id: 56, name_ar: "بطاطا حلوة", name_en: "Sweet Potato", category: "خضروات", price: 12, unit: "كيلو", inStock: true },
  { id: 57, name_ar: "طماطم", name_en: "Tomato", category: "خضروات", price: 18, unit: "كيلو", inStock: true },
  { id: 58, name_ar: "طماطم كرزية", name_en: "Cherry Tomato", category: "خضروات", price: 28, unit: "كيلو", inStock: true },
  { id: 59, name_ar: "خس", name_en: "Lettuce", category: "خضروات", price: 15, unit: "حبة", inStock: true },
  { id: 60, name_ar: "سبانخ", name_en: "Spinach", category: "خضروات", price: 20, unit: "حزمة", inStock: true },
  { id: 61, name_ar: "جرجير", name_en: "Arugula", category: "خضروات", price: 22, unit: "حزمة", inStock: true },
  { id: 62, name_ar: "ملفوف صيني", name_en: "Chinese Cabbage", category: "خضروات", price: 18, unit: "كيلو", inStock: true },
  { id: 63, name_ar: "فطر", name_en: "Mushroom", category: "خضروات", price: 45, unit: "كيلو", inStock: true },
  { id: 64, name_ar: "كوسا", name_en: "Zucchini", category: "خضروات", price: 16, unit: "كيلو", inStock: true },
  { id: 65, name_ar: "قرع أخضر", name_en: "Green Squash", category: "خضروات", price: 14, unit: "كيلو", inStock: true },
  { id: 66, name_ar: "قرع أصفر", name_en: "Yellow Squash", category: "خضروات", price: 14, unit: "كيلو", inStock: true },
  { id: 67, name_ar: "قرع شتوي", name_en: "Winter Squash", category: "خضروات", price: 12, unit: "كيلو", inStock: true },
  { id: 68, name_ar: "خيار صيني", name_en: "Chinese Cucumber", category: "خضروات", price: 20, unit: "كيلو", inStock: true },

  // التمور
  { id: 75, name_ar: "تمر عجوة", name_en: "Ajwa Dates", category: "تمور", price: 180, unit: "كيلو", inStock: true },
  { id: 76, name_ar: "تمر سكري", name_en: "Sukari Dates", category: "تمور", price: 160, unit: "كيلو", inStock: true },
  { id: 77, name_ar: "تمر مجهول", name_en: "Medjool Dates", category: "تمور", price: 140, unit: "كيلو", inStock: true },
  { id: 78, name_ar: "تمر صفاوي", name_en: "Safawi Dates", category: "تمور", price: 150, unit: "كيلو", inStock: true },
  { id: 79, name_ar: "تمر برني", name_en: "Barni Dates", category: "تمور", price: 130, unit: "كيلو", inStock: true },

  // البيض والألبان
  { id: 80, name_ar: "بيض دجاج", name_en: "Chicken Eggs", category: "بيض", price: 35, unit: "دزينة", inStock: true },
  { id: 81, name_ar: "بيض وز", name_en: "Goose Eggs", category: "بيض", price: 60, unit: "دزينة", inStock: true },
  { id: 82, name_ar: "بيض بط", name_en: "Duck Eggs", category: "بيض", price: 50, unit: "دزينة", inStock: true },

  // المكسرات والحبوب
  { id: 83, name_ar: "لوز", name_en: "Almonds", category: "مكسرات", price: 250, unit: "كيلو", inStock: true },
  { id: 84, name_ar: "فستق", name_en: "Pistachios", category: "مكسرات", price: 280, unit: "كيلو", inStock: true },
  { id: 85, name_ar: "كاجو", name_en: "Cashew", category: "مكسرات", price: 320, unit: "كيلو", inStock: true },
  { id: 86, name_ar: "جوز", name_en: "Walnut", category: "مكسرات", price: 200, unit: "كيلو", inStock: true },
  { id: 87, name_ar: "بندق", name_en: "Hazelnut", category: "مكسرات", price: 240, unit: "كيلو", inStock: true },
  { id: 88, name_ar: "صنوبر", name_en: "Pine Nuts", category: "مكسرات", price: 400, unit: "كيلو", inStock: true },

  // التوابل والأعشاب
  { id: 26, name_ar: "أوراق الكاري", name_en: "Curry Leaves", category: "توابل", price: 40, unit: "حزمة", inStock: true },
  { id: 89, name_ar: "ملح", name_en: "Salt", category: "توابل", price: 5, unit: "كيلو", inStock: true },
  { id: 90, name_ar: "فلفل أسود", name_en: "Black Pepper", category: "توابل", price: 150, unit: "كيلو", inStock: true },
  { id: 91, name_ar: "كمون", name_en: "Cumin", category: "توابل", price: 120, unit: "كيلو", inStock: true },
];

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(p => p.category === category);
}

export function getProductById(id: number): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(p => 
    p.name_ar.includes(query) || 
    p.name_en.toLowerCase().includes(lowerQuery)
  );
}

export function getCategories(): string[] {
  return Array.from(new Set(allProducts.map(p => p.category)));
}
