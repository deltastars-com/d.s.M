import type { Product } from '../types';

export const allProducts: Product[] = [
  { id: 1, name_ar: 'تفاح سكري', name_en: 'Sweet Apple', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 35, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 200, description_ar: 'تفاح سكري طازج مستورد من أجود المزارع', origin_ar: 'أمريكا', benefits_ar: 'غني بالألياف وفيتامين C' },
  { id: 2, name_ar: 'تفاح أخضر', name_en: 'Green Apple', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 32, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 180, description_ar: 'تفاح أخضر حامض منعش', origin_ar: 'أمريكا' },
  { id: 3, name_ar: 'تفاح أحمر', name_en: 'Red Apple', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 38, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 150 },
  { id: 4, name_ar: 'موز', name_en: 'Banana', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 25, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 300 },
  { id: 5, name_ar: 'مانجو', name_en: 'Mango', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 70, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 100, origin_ar: 'الهند' },
  { id: 6, name_ar: 'برتقال', name_en: 'Orange', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 25, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 250 },
  { id: 7, name_ar: 'عنب أحمر', name_en: 'Red Grapes', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 50, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 80, origin_ar: 'إيران' },
  { id: 8, name_ar: 'عنب أخضر', name_en: 'Green Grapes', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 52, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 75 },
  { id: 9, name_ar: 'كيوي', name_en: 'Kiwi', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 65, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 60, origin_ar: 'نيوزيلندا' },
  { id: 10, name_ar: 'فراولة', name_en: 'Strawberry', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 55, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 120 },
  { id: 11, name_ar: 'أناناس', name_en: 'Pineapple', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 50, image: '/placeholder.jpg', unit_ar: 'حبة', unit_en: 'piece', stock_quantity: 50 },
  { id: 12, name_ar: 'رمان', name_en: 'Pomegranate', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 65, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 90 },
  { id: 13, name_ar: 'خوخ', name_en: 'Peach', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 40, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 100 },
  { id: 14, name_ar: 'كمثرى', name_en: 'Pear', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 45, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 85 },
  { id: 15, name_ar: 'ليمون', name_en: 'Lemon', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 20, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 400 },
  { id: 16, name_ar: 'طماطم', name_en: 'Tomato', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 18, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 500 },
  { id: 17, name_ar: 'خيار', name_en: 'Cucumber', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 16, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 450 },
  { id: 18, name_ar: 'بطاطس', name_en: 'Potato', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 7, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 800 },
  { id: 19, name_ar: 'جزر', name_en: 'Carrot', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 12, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 350 },
  { id: 20, name_ar: 'بصل أحمر', name_en: 'Red Onion', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 10, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 600 },
  { id: 21, name_ar: 'ثوم', name_en: 'Garlic', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 90, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 150 },
  { id: 22, name_ar: 'زنجبيل', name_en: 'Ginger', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 85, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 120 },
  { id: 23, name_ar: 'فلفل رومي أخضر', name_en: 'Green Pepper', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 22, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 200 },
  { id: 24, name_ar: 'فلفل رومي أحمر', name_en: 'Red Pepper', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 25, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 180 },
  { id: 25, name_ar: 'باذنجان', name_en: 'Eggplant', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 20, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 250 },
  { id: 26, name_ar: 'كوسا', name_en: 'Zucchini', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 16, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 300 },
  { id: 27, name_ar: 'بروكلي', name_en: 'Broccoli', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 32, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 100, origin_ar: 'أمريكا' },
  { id: 28, name_ar: 'خس', name_en: 'Lettuce', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 15, image: '/placeholder.jpg', unit_ar: 'حبة', unit_en: 'piece', stock_quantity: 200 },
  { id: 29, name_ar: 'سبانخ', name_en: 'Spinach', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 20, image: '/placeholder.jpg', unit_ar: 'حزمة', unit_en: 'bundle', stock_quantity: 150 },
  { id: 30, name_ar: 'فطر', name_en: 'Mushroom', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 45, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 80 },
  { id: 31, name_ar: 'كركم', name_en: 'Turmeric', category: 'herbs', category_ar: 'ورقيات', category_en: 'Herbs', price: 100, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 60 },
  { id: 32, name_ar: 'كزبرة', name_en: 'Cilantro', category: 'herbs', category_ar: 'ورقيات', category_en: 'Herbs', price: 15, image: '/placeholder.jpg', unit_ar: 'حزمة', unit_en: 'bundle', stock_quantity: 300 },
  { id: 33, name_ar: 'نعناع', name_en: 'Mint', category: 'herbs', category_ar: 'ورقيات', category_en: 'Herbs', price: 15, image: '/placeholder.jpg', unit_ar: 'حزمة', unit_en: 'bundle', stock_quantity: 250 },
  { id: 34, name_ar: 'شبت', name_en: 'Dill', category: 'herbs', category_ar: 'ورقيات', category_en: 'Herbs', price: 12, image: '/placeholder.jpg', unit_ar: 'حزمة', unit_en: 'bundle', stock_quantity: 200 },
  { id: 35, name_ar: 'بقدونس', name_en: 'Parsley', category: 'herbs', category_ar: 'ورقيات', category_en: 'Herbs', price: 12, image: '/placeholder.jpg', unit_ar: 'حزمة', unit_en: 'bundle', stock_quantity: 280 },
  { id: 36, name_ar: 'جرجير', name_en: 'Arugula', category: 'herbs', category_ar: 'ورقيات', category_en: 'Herbs', price: 22, image: '/placeholder.jpg', unit_ar: 'حزمة', unit_en: 'bundle', stock_quantity: 150 },
  { id: 37, name_ar: 'كرفس', name_en: 'Celery', category: 'herbs', category_ar: 'ورقيات', category_en: 'Herbs', price: 18, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 120 },
  { id: 38, name_ar: 'ملفوف', name_en: 'Cabbage', category: 'herbs', category_ar: 'ورقيات', category_en: 'Herbs', price: 14, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 200 },
  { id: 39, name_ar: 'تمر عجوة', name_en: 'Ajwa Dates', category: 'dates', category_ar: 'تمور', category_en: 'Dates', price: 180, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 100, origin_ar: 'المدينة المنورة' },
  { id: 40, name_ar: 'تمر سكري', name_en: 'Sukari Dates', category: 'dates', category_ar: 'تمور', category_en: 'Dates', price: 160, image: '/placeholder.jpg', is_featured: true, unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 120, origin_ar: 'القصيم' },
  { id: 41, name_ar: 'تمر مجدول', name_en: 'Medjool Dates', category: 'dates', category_ar: 'تمور', category_en: 'Dates', price: 140, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 80, origin_ar: 'القصيم' },
  { id: 42, name_ar: 'تمر صفاوي', name_en: 'Safawi Dates', category: 'dates', category_ar: 'تمور', category_en: 'Dates', price: 150, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 90, origin_ar: 'المدينة المنورة' },
  { id: 43, name_ar: 'تمر برني', name_en: 'Barni Dates', category: 'dates', category_ar: 'تمور', category_en: 'Dates', price: 130, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 110, origin_ar: 'القصيم' },
  { id: 44, name_ar: 'تمر خلاص', name_en: 'Khalas Dates', category: 'dates', category_ar: 'تمور', category_en: 'Dates', price: 120, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 130, origin_ar: 'الأحساء' },
  { id: 45, name_ar: 'سلة تمور مختلطة', name_en: 'Mixed Dates Box', category: 'packages', category_ar: 'سلال', category_en: 'Packages', price: 185, image: '/placeholder.jpg', is_featured: true, unit_ar: 'سلة', unit_en: 'box', stock_quantity: 50 },
  { id: 46, name_ar: 'سلة فواكه عائلية', name_en: 'Family Fruit Box', category: 'packages', category_ar: 'سلال', category_en: 'Packages', price: 95, image: '/placeholder.jpg', unit_ar: 'سلة', unit_en: 'box', stock_quantity: 40 },
  { id: 47, name_ar: 'سلة خضروات عائلية', name_en: 'Family Veg Box', category: 'packages', category_ar: 'سلال', category_en: 'Packages', price: 75, image: '/placeholder.jpg', unit_ar: 'سلة', unit_en: 'box', stock_quantity: 45 },
  { id: 48, name_ar: 'بيض بلدي', name_en: 'Local Eggs', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 35, image: '/placeholder.jpg', unit_ar: 'دزينة', unit_en: 'dozen', stock_quantity: 500 },
  { id: 49, name_ar: 'لوز', name_en: 'Almonds', category: 'nuts', category_ar: 'مكسرات', category_en: 'Nuts', price: 250, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 30 },
  { id: 50, name_ar: 'فستق حلبي', name_en: 'Pistachios', category: 'nuts', category_ar: 'مكسرات', category_en: 'Nuts', price: 280, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 25 },
  { id: 51, name_ar: 'كاجو', name_en: 'Cashew Nuts', category: 'nuts', category_ar: 'مكسرات', category_en: 'Nuts', price: 320, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 20 },
  { id: 52, name_ar: 'جوز', name_en: 'Walnuts', category: 'nuts', category_ar: 'مكسرات', category_en: 'Nuts', price: 200, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 35 },
  { id: 53, name_ar: 'بندق', name_en: 'Hazelnuts', category: 'nuts', category_ar: 'مكسرات', category_en: 'Nuts', price: 240, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 28 },
  { id: 54, name_ar: 'تين طازج', name_en: 'Fresh Fig', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 60, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 40 },
  { id: 55, name_ar: 'بابايا', name_en: 'Papaya', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 55, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 60 },
  { id: 56, name_ar: 'جوافة', name_en: 'Guava', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 28, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 80 },
  { id: 57, name_ar: 'مانجو مصري', name_en: 'Egyptian Mango', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 65, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 70, origin_ar: 'مصر' },
  { id: 58, name_ar: 'موز فيليبيني', name_en: 'Philippine Banana', category: 'fruits', category_ar: 'فواكه', category_en: 'Fruits', price: 22, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 400, origin_ar: 'الفلبين' },
  { id: 59, name_ar: 'بطاطا حلوة', name_en: 'Sweet Potato', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 12, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 200 },
  { id: 60, name_ar: 'قرنبيط', name_en: 'Cauliflower', category: 'vegetables', category_ar: 'خضروات', category_en: 'Vegetables', price: 28, image: '/placeholder.jpg', unit_ar: 'كيلو', unit_en: 'kg', stock_quantity: 120 },
];

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(p => p.category === category);
}

export function getProductById(id: number): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return allProducts.filter(p =>
    p.name_ar.includes(query) || p.name_en.toLowerCase().includes(q)
  );
}

export function getCategories(): string[] {
  return Array.from(new Set(allProducts.map(p => p.category)));
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter(p => p.is_featured);
}
