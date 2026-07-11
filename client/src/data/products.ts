export interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  category: 'fruits' | 'vegetables' | 'dates' | 'eggs';
  price: number;
  imageUrl: string;
  descriptionAr: string;
  descriptionEn: string;
}

export const products: Product[] = [
  // Fruits - الفواكه
  { id: 1, nameAr: 'تفاح سكري', nameEn: 'Sweet Apple', category: 'fruits', price: 45, imageUrl: '/products/apple-sweet.jpg', descriptionAr: 'تفاح سكري طازج وعالي الجودة', descriptionEn: 'Fresh sweet apples of high quality' },
  { id: 2, nameAr: 'تفاح أخضر', nameEn: 'Green Apple', category: 'fruits', price: 40, imageUrl: '/products/apple-green.jpg', descriptionAr: 'تفاح أخضر طازج', descriptionEn: 'Fresh green apples' },
  { id: 3, nameAr: 'تفاح أحمر', nameEn: 'Red Apple', category: 'fruits', price: 42, imageUrl: '/products/apple-red.jpg', descriptionAr: 'تفاح أحمر لذيذ', descriptionEn: 'Delicious red apples' },
  { id: 4, nameAr: 'تفاح أصفر', nameEn: 'Yellow Apple', category: 'fruits', price: 43, imageUrl: '/products/apple-yellow.jpg', descriptionAr: 'تفاح أصفر حلو', descriptionEn: 'Sweet yellow apples' },
  { id: 5, nameAr: 'مشمش', nameEn: 'Apricot', category: 'fruits', price: 50, imageUrl: '/products/apricot.jpg', descriptionAr: 'مشمش طازج ولذيذ', descriptionEn: 'Fresh and delicious apricots' },
  { id: 6, nameAr: 'موز', nameEn: 'Banana', category: 'fruits', price: 35, imageUrl: '/products/banana.jpg', descriptionAr: 'موز طازج عالي الجودة', descriptionEn: 'Fresh high-quality bananas' },
  { id: 7, nameAr: 'جريب فروت', nameEn: 'Grapefruit', category: 'fruits', price: 55, imageUrl: '/products/grapefruit.jpg', descriptionAr: 'جريب فروت طازج', descriptionEn: 'Fresh grapefruit' },
  { id: 8, nameAr: 'عنب أسود', nameEn: 'Black Grapes', category: 'fruits', price: 65, imageUrl: '/products/grapes-black.jpg', descriptionAr: 'عنب أسود حلو', descriptionEn: 'Sweet black grapes' },
  { id: 9, nameAr: 'عنب أخضر', nameEn: 'Green Grapes', category: 'fruits', price: 60, imageUrl: '/products/grapes-green.jpg', descriptionAr: 'عنب أخضر طازج', descriptionEn: 'Fresh green grapes' },
  { id: 10, nameAr: 'عنب أحمر', nameEn: 'Red Grapes', category: 'fruits', price: 62, imageUrl: '/products/grapes-red.jpg', descriptionAr: 'عنب أحمر لذيذ', descriptionEn: 'Delicious red grapes' },
  { id: 11, nameAr: 'عنب أبيض', nameEn: 'White Grapes', category: 'fruits', price: 58, imageUrl: '/products/grapes-white.jpg', descriptionAr: 'عنب أبيض طازج', descriptionEn: 'Fresh white grapes' },
  { id: 12, nameAr: 'جوافة', nameEn: 'Guava', category: 'fruits', price: 48, imageUrl: '/products/guava.jpg', descriptionAr: 'جوافة طازجة وحلوة', descriptionEn: 'Fresh and sweet guava' },
  { id: 13, nameAr: 'كاكا', nameEn: 'Persimmon', category: 'fruits', price: 52, imageUrl: '/products/kaka.jpg', descriptionAr: 'كاكا طازجة', descriptionEn: 'Fresh persimmons' },
  { id: 14, nameAr: 'كيوي', nameEn: 'Kiwi', category: 'fruits', price: 55, imageUrl: '/products/kiwi.jpg', descriptionAr: 'كيوي طازج وحامض', descriptionEn: 'Fresh and tangy kiwi' },
  { id: 15, nameAr: 'ليمون', nameEn: 'Lemon', category: 'fruits', price: 30, imageUrl: '/products/lemon.jpg', descriptionAr: 'ليمون طازج', descriptionEn: 'Fresh lemons' },
  { id: 16, nameAr: 'ليمون صغير', nameEn: 'Small Lemon', category: 'fruits', price: 28, imageUrl: '/products/lemon-small.jpg', descriptionAr: 'ليمون صغير طازج', descriptionEn: 'Fresh small lemons' },
  { id: 17, nameAr: 'ليم أخضر', nameEn: 'Lime', category: 'fruits', price: 32, imageUrl: '/products/lime.jpg', descriptionAr: 'ليم أخضر طازج', descriptionEn: 'Fresh green limes' },
  { id: 18, nameAr: 'أفندي', nameEn: 'Mandarin', category: 'fruits', price: 38, imageUrl: '/products/mandarin.jpg', descriptionAr: 'أفندي حلو وطازج', descriptionEn: 'Sweet and fresh mandarins' },
  { id: 19, nameAr: 'مانجو تيمور', nameEn: 'Mango Timor', category: 'fruits', price: 70, imageUrl: '/products/mango-timor.jpg', descriptionAr: 'مانجو تيمور عالية الجودة', descriptionEn: 'High-quality Timor mangoes' },
  { id: 20, nameAr: 'نكتارين', nameEn: 'Nectarine', category: 'fruits', price: 58, imageUrl: '/products/nectarine.jpg', descriptionAr: 'نكتارين طازج', descriptionEn: 'Fresh nectarines' },
  { id: 21, nameAr: 'برتقال عصير', nameEn: 'Orange Juice', category: 'fruits', price: 35, imageUrl: '/products/orange-juice.jpg', descriptionAr: 'برتقال عصير طازج', descriptionEn: 'Fresh juice oranges' },
  { id: 22, nameAr: 'برتقال أبو صورة', nameEn: 'Orange Abu Soura', category: 'fruits', price: 37, imageUrl: '/products/orange-abu-soura.jpg', descriptionAr: 'برتقال أبو صورة حلو', descriptionEn: 'Sweet Abu Soura oranges' },
  { id: 23, nameAr: 'بابايا', nameEn: 'Papaya', category: 'fruits', price: 60, imageUrl: '/products/papaya.jpg', descriptionAr: 'بابايا طازجة وحلوة', descriptionEn: 'Fresh and sweet papaya' },
  { id: 24, nameAr: 'خوخ', nameEn: 'Peach', category: 'fruits', price: 55, imageUrl: '/products/peach.jpg', descriptionAr: 'خوخ طازج لذيذ', descriptionEn: 'Fresh delicious peaches' },
  { id: 25, nameAr: 'كمثرى', nameEn: 'Pear', category: 'fruits', price: 50, imageUrl: '/products/pear.jpg', descriptionAr: 'كمثرى طازجة', descriptionEn: 'Fresh pears' },
  { id: 26, nameAr: 'أناناس بيبي', nameEn: 'Baby Pineapple', category: 'fruits', price: 45, imageUrl: '/products/pineapple-baby.jpg', descriptionAr: 'أناناس بيبي حلو', descriptionEn: 'Sweet baby pineapple' },
  { id: 27, nameAr: 'أناناس', nameEn: 'Pineapple', category: 'fruits', price: 50, imageUrl: '/products/pineapple.jpg', descriptionAr: 'أناناس طازج', descriptionEn: 'Fresh pineapple' },
  { id: 28, nameAr: 'بخارة أسود', nameEn: 'Black Passion Fruit', category: 'fruits', price: 65, imageUrl: '/products/passion-fruit-black.jpg', descriptionAr: 'بخارة أسود', descriptionEn: 'Black passion fruit' },
  { id: 29, nameAr: 'بخارة أحمر', nameEn: 'Red Passion Fruit', category: 'fruits', price: 63, imageUrl: '/products/passion-fruit-red.jpg', descriptionAr: 'بخارة أحمر', descriptionEn: 'Red passion fruit' },
  { id: 30, nameAr: 'رمان', nameEn: 'Pomegranate', category: 'fruits', price: 55, imageUrl: '/products/pomegranate.jpg', descriptionAr: 'رمان طازج', descriptionEn: 'Fresh pomegranate' },
  { id: 31, nameAr: 'فراولة مصري', nameEn: 'Egyptian Strawberry', category: 'fruits', price: 75, imageUrl: '/products/strawberry-egyptian.jpg', descriptionAr: 'فراولة مصري طازجة', descriptionEn: 'Fresh Egyptian strawberries' },
  { id: 32, nameAr: 'بطيخ طويل', nameEn: 'Long Watermelon', category: 'fruits', price: 40, imageUrl: '/products/watermelon-long.jpg', descriptionAr: 'بطيخ طويل طازج', descriptionEn: 'Fresh long watermelon' },
  { id: 33, nameAr: 'بطيخ مدور', nameEn: 'Round Watermelon', category: 'fruits', price: 42, imageUrl: '/products/watermelon-round.jpg', descriptionAr: 'بطيخ مدور حلو', descriptionEn: 'Sweet round watermelon' },

  // Vegetables - الخضروات
  { id: 34, nameAr: 'فاصوليا خضراء', nameEn: 'Green Beans', category: 'vegetables', price: 48, imageUrl: '/products/green-beans.jpg', descriptionAr: 'فاصوليا خضراء طازجة', descriptionEn: 'Fresh green beans' },
  { id: 35, nameAr: 'بنجر', nameEn: 'Beets', category: 'vegetables', price: 35, imageUrl: '/products/beets.jpg', descriptionAr: 'بنجر طازج', descriptionEn: 'Fresh beets' },
  { id: 36, nameAr: 'رومي أخضر', nameEn: 'Green Tomato', category: 'vegetables', price: 32, imageUrl: '/products/tomato-green.jpg', descriptionAr: 'رومي أخضر', descriptionEn: 'Green tomatoes' },
  { id: 37, nameAr: 'رومي أحمر', nameEn: 'Red Tomato', category: 'vegetables', price: 34, imageUrl: '/products/tomato-red.jpg', descriptionAr: 'رومي أحمر طازج', descriptionEn: 'Fresh red tomatoes' },
  { id: 38, nameAr: 'رومي أصفر', nameEn: 'Yellow Tomato', category: 'vegetables', price: 36, imageUrl: '/products/tomato-yellow.jpg', descriptionAr: 'رومي أصفر', descriptionEn: 'Yellow tomatoes' },
  { id: 39, nameAr: 'كرلا', nameEn: 'Bitter Melon', category: 'vegetables', price: 40, imageUrl: '/products/bitter-melon.jpg', descriptionAr: 'كرلا طازجة', descriptionEn: 'Fresh bitter melon' },
  { id: 40, nameAr: 'بروكلي', nameEn: 'Broccoli', category: 'vegetables', price: 55, imageUrl: '/products/broccoli.jpg', descriptionAr: 'بروكلي طازج', descriptionEn: 'Fresh broccoli' },
  { id: 41, nameAr: 'ملفوف أحمر', nameEn: 'Red Cabbage', category: 'vegetables', price: 30, imageUrl: '/products/cabbage-red.jpg', descriptionAr: 'ملفوف أحمر', descriptionEn: 'Red cabbage' },
  { id: 42, nameAr: 'ملفوف أبيض', nameEn: 'White Cabbage', category: 'vegetables', price: 28, imageUrl: '/products/cabbage-white.jpg', descriptionAr: 'ملفوف أبيض طازج', descriptionEn: 'Fresh white cabbage' },
  { id: 43, nameAr: 'جزر محلي', nameEn: 'Local Carrot', category: 'vegetables', price: 25, imageUrl: '/products/carrot-local.jpg', descriptionAr: 'جزر محلي طازج', descriptionEn: 'Fresh local carrots' },
  { id: 44, nameAr: 'زهرة', nameEn: 'Cauliflower', category: 'vegetables', price: 50, imageUrl: '/products/cauliflower.jpg', descriptionAr: 'زهرة طازجة', descriptionEn: 'Fresh cauliflower' },
  { id: 45, nameAr: 'كرفس محلي', nameEn: 'Local Celery', category: 'vegetables', price: 35, imageUrl: '/products/celery-local.jpg', descriptionAr: 'كرفس محلي', descriptionEn: 'Local celery' },
  { id: 46, nameAr: 'فلفل حار أخضر', nameEn: 'Green Chili', category: 'vegetables', price: 38, imageUrl: '/products/chili-green.jpg', descriptionAr: 'فلفل حار أخضر', descriptionEn: 'Green chili peppers' },
  { id: 47, nameAr: 'فلفل حار أحمر', nameEn: 'Red Chili', category: 'vegetables', price: 40, imageUrl: '/products/chili-red.jpg', descriptionAr: 'فلفل حار أحمر', descriptionEn: 'Red chili peppers' },
  { id: 48, nameAr: 'جوز الهند', nameEn: 'Coconut', category: 'vegetables', price: 45, imageUrl: '/products/coconut.jpg', descriptionAr: 'جوز هند طازج', descriptionEn: 'Fresh coconut' },
  { id: 49, nameAr: 'كزبرة', nameEn: 'Cilantro', category: 'vegetables', price: 20, imageUrl: '/products/cilantro.jpg', descriptionAr: 'كزبرة طازجة', descriptionEn: 'Fresh cilantro' },
  { id: 50, nameAr: 'خيار', nameEn: 'Cucumber', category: 'vegetables', price: 28, imageUrl: '/products/cucumber.jpg', descriptionAr: 'خيار طازج', descriptionEn: 'Fresh cucumber' },
  { id: 51, nameAr: 'أوراق الكاري', nameEn: 'Curry Leaves', category: 'vegetables', price: 25, imageUrl: '/products/curry-leaves.jpg', descriptionAr: 'أوراق الكاري', descriptionEn: 'Curry leaves' },
  { id: 52, nameAr: 'قشطة', nameEn: 'Custard Apple', category: 'vegetables', price: 60, imageUrl: '/products/custard-apple.jpg', descriptionAr: 'قشطة طازجة', descriptionEn: 'Fresh custard apple' },
  { id: 53, nameAr: 'شبت', nameEn: 'Dill', category: 'vegetables', price: 22, imageUrl: '/products/dill.jpg', descriptionAr: 'شبت طازج', descriptionEn: 'Fresh dill' },
  { id: 54, nameAr: 'درام ستك', nameEn: 'Drumstick', category: 'vegetables', price: 42, imageUrl: '/products/drumstick.jpg', descriptionAr: 'درام ستك', descriptionEn: 'Drumstick' },
  { id: 55, nameAr: 'باذنجان أسود مدور صغير', nameEn: 'Small Round Black Eggplant', category: 'vegetables', price: 35, imageUrl: '/products/eggplant-black-small.jpg', descriptionAr: 'باذنجان أسود صغير', descriptionEn: 'Small black eggplant' },
  { id: 56, nameAr: 'باذنجان طويل', nameEn: 'Long Eggplant', category: 'vegetables', price: 38, imageUrl: '/products/eggplant-long.jpg', descriptionAr: 'باذنجان طويل', descriptionEn: 'Long eggplant' },
  { id: 57, nameAr: 'باذنجان أبيض', nameEn: 'White Eggplant', category: 'vegetables', price: 40, imageUrl: '/products/eggplant-white.jpg', descriptionAr: 'باذنجان أبيض', descriptionEn: 'White eggplant' },
  { id: 58, nameAr: 'ثوم مقشر', nameEn: 'Peeled Garlic', category: 'vegetables', price: 85, imageUrl: '/products/garlic-peeled.jpg', descriptionAr: 'ثوم مقشر', descriptionEn: 'Peeled garlic' },
  { id: 59, nameAr: 'ثوم', nameEn: 'Garlic', category: 'vegetables', price: 75, imageUrl: '/products/garlic.jpg', descriptionAr: 'ثوم طازج', descriptionEn: 'Fresh garlic' },
  { id: 60, nameAr: 'زنجبيل', nameEn: 'Ginger', category: 'vegetables', price: 65, imageUrl: '/products/ginger.jpg', descriptionAr: 'زنجبيل طازج', descriptionEn: 'Fresh ginger' },
  { id: 61, nameAr: 'خس مدور مستورد إسباني', nameEn: 'Spanish Imported Round Lettuce', category: 'vegetables', price: 50, imageUrl: '/products/lettuce-spanish.jpg', descriptionAr: 'خس مدور إسباني', descriptionEn: 'Spanish round lettuce' },
  { id: 62, nameAr: 'خس مدور', nameEn: 'Round Lettuce', category: 'vegetables', price: 45, imageUrl: '/products/lettuce-round.jpg', descriptionAr: 'خس مدور', descriptionEn: 'Round lettuce' },
  { id: 63, nameAr: 'خس طويل', nameEn: 'Long Lettuce', category: 'vegetables', price: 48, imageUrl: '/products/lettuce-long.jpg', descriptionAr: 'خس طويل', descriptionEn: 'Long lettuce' },
  { id: 64, nameAr: 'كوسة', nameEn: 'Zucchini', category: 'vegetables', price: 32, imageUrl: '/products/zucchini.jpg', descriptionAr: 'كوسة طازجة', descriptionEn: 'Fresh zucchini' },
  { id: 65, nameAr: 'شمام', nameEn: 'Melon', category: 'vegetables', price: 45, imageUrl: '/products/melon.jpg', descriptionAr: 'شمام طازج', descriptionEn: 'Fresh melon' },
  { id: 66, nameAr: 'نعناع', nameEn: 'Mint', category: 'vegetables', price: 18, imageUrl: '/products/mint.jpg', descriptionAr: 'نعناع طازج', descriptionEn: 'Fresh mint' },
  { id: 67, nameAr: 'ملوخية', nameEn: 'Molokhia', category: 'vegetables', price: 38, imageUrl: '/products/molokhia.jpg', descriptionAr: 'ملوخية طازجة', descriptionEn: 'Fresh molokhia' },
  { id: 68, nameAr: 'بامية حجم الحبة صغير', nameEn: 'Small Okra', category: 'vegetables', price: 42, imageUrl: '/products/okra-small.jpg', descriptionAr: 'بامية صغيرة', descriptionEn: 'Small okra' },
  { id: 69, nameAr: 'بامية', nameEn: 'Okra', category: 'vegetables', price: 45, imageUrl: '/products/okra.jpg', descriptionAr: 'بامية طازجة', descriptionEn: 'Fresh okra' },
  { id: 70, nameAr: 'بصل أحمر', nameEn: 'Red Onion', category: 'vegetables', price: 28, imageUrl: '/products/onion-red.jpg', descriptionAr: 'بصل أحمر', descriptionEn: 'Red onions' },
  { id: 71, nameAr: 'بصل أخضر', nameEn: 'Green Onion', category: 'vegetables', price: 25, imageUrl: '/products/onion-green.jpg', descriptionAr: 'بصل أخضر', descriptionEn: 'Green onions' },
  { id: 72, nameAr: 'بصل أبيض', nameEn: 'White Onion', category: 'vegetables', price: 26, imageUrl: '/products/onion-white.jpg', descriptionAr: 'بصل أبيض', descriptionEn: 'White onions' },
  { id: 73, nameAr: 'بقدونس', nameEn: 'Parsley', category: 'vegetables', price: 20, imageUrl: '/products/parsley.jpg', descriptionAr: 'بقدونس طازج', descriptionEn: 'Fresh parsley' },
  { id: 74, nameAr: 'بطاطس حلوة', nameEn: 'Sweet Potato', category: 'vegetables', price: 35, imageUrl: '/products/potato-sweet.jpg', descriptionAr: 'بطاطس حلوة', descriptionEn: 'Sweet potatoes' },
  { id: 75, nameAr: 'بطاطس', nameEn: 'Potato', category: 'vegetables', price: 30, imageUrl: '/products/potato.jpg', descriptionAr: 'بطاطس طازجة', descriptionEn: 'Fresh potatoes' },
  { id: 76, nameAr: 'قرع أخضر (دبة)', nameEn: 'Green Squash', category: 'vegetables', price: 38, imageUrl: '/products/squash-green.jpg', descriptionAr: 'قرع أخضر', descriptionEn: 'Green squash' },
  { id: 77, nameAr: 'قرع أصفر (عسلي)', nameEn: 'Yellow Squash', category: 'vegetables', price: 40, imageUrl: '/products/squash-yellow.jpg', descriptionAr: 'قرع أصفر', descriptionEn: 'Yellow squash' },
  { id: 78, nameAr: 'رجلة', nameEn: 'Purslane', category: 'vegetables', price: 32, imageUrl: '/products/purslane.jpg', descriptionAr: 'رجلة طازجة', descriptionEn: 'Fresh purslane' },
  { id: 79, nameAr: 'فجل أحمر', nameEn: 'Red Radish', category: 'vegetables', price: 28, imageUrl: '/products/radish-red.jpg', descriptionAr: 'فجل أحمر', descriptionEn: 'Red radishes' },
  { id: 80, nameAr: 'فجل أبيض', nameEn: 'White Radish', category: 'vegetables', price: 30, imageUrl: '/products/radish-white.jpg', descriptionAr: 'فجل أبيض', descriptionEn: 'White radishes' },
  { id: 81, nameAr: 'سبانخ', nameEn: 'Spinach', category: 'vegetables', price: 35, imageUrl: '/products/spinach.jpg', descriptionAr: 'سبانخ طازجة', descriptionEn: 'Fresh spinach' },
  { id: 82, nameAr: 'قلقاس', nameEn: 'Taro', category: 'vegetables', price: 40, imageUrl: '/products/taro.jpg', descriptionAr: 'قلقاس طازج', descriptionEn: 'Fresh taro' },
  { id: 83, nameAr: 'طماطم شيري أحمر', nameEn: 'Red Cherry Tomato', category: 'vegetables', price: 42, imageUrl: '/products/tomato-cherry-red.jpg', descriptionAr: 'طماطم شيري أحمر', descriptionEn: 'Red cherry tomatoes' },
  { id: 84, nameAr: 'طماطم مدور', nameEn: 'Round Tomato', category: 'vegetables', price: 36, imageUrl: '/products/tomato-round.jpg', descriptionAr: 'طماطم مدور', descriptionEn: 'Round tomatoes' },
  { id: 85, nameAr: 'لفت', nameEn: 'Turnip', category: 'vegetables', price: 32, imageUrl: '/products/turnip.jpg', descriptionAr: 'لفت طازج', descriptionEn: 'Fresh turnips' },
  { id: 86, nameAr: 'جرجير', nameEn: 'Arugula', category: 'vegetables', price: 40, imageUrl: '/products/arugula.jpg', descriptionAr: 'جرجير طازج', descriptionEn: 'Fresh arugula' },
  { id: 87, nameAr: 'تين شوكي', nameEn: 'Prickly Pear', category: 'vegetables', price: 50, imageUrl: '/products/prickly-pear.jpg', descriptionAr: 'تين شوكي', descriptionEn: 'Prickly pear' },
  { id: 88, nameAr: 'تين محلي', nameEn: 'Local Fig', category: 'vegetables', price: 55, imageUrl: '/products/fig-local.jpg', descriptionAr: 'تين محلي', descriptionEn: 'Local figs' },
  { id: 89, nameAr: 'ليك محلي', nameEn: 'Local Leek', category: 'vegetables', price: 38, imageUrl: '/products/leek-local.jpg', descriptionAr: 'ليك محلي', descriptionEn: 'Local leeks' },

  // Dates - التمور
  { id: 90, nameAr: 'تمر فاخر', nameEn: 'Premium Dates', category: 'dates', price: 120, imageUrl: '/products/dates-premium.jpg', descriptionAr: 'تمر فاخر عالي الجودة', descriptionEn: 'Premium high-quality dates' },

  // Eggs - البيض
  { id: 91, nameAr: 'بيض', nameEn: 'Eggs', category: 'eggs', price: 15, imageUrl: '/products/eggs.jpg', descriptionAr: 'بيض طازج عالي الجودة', descriptionEn: 'Fresh high-quality eggs' },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductById(id: number): Product | undefined {
  return products.find(p => p.id === id);
}
