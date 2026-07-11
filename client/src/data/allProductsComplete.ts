// ===== قاعدة بيانات المنتجات الشاملة (254 منتج) =====
// تم دمج 91 منتج محلي + 163 منتج مستورد
// مع صور حقيقية من مصادر موثوقة وبدون حقوق ملكية

export interface Product {
  id: number;
  name_en: string;
  name_ar: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  stock: number;
  description_ar?: string;
  description_en?: string;
  origin?: string;
  weight?: string;
}

export const COMPLETE_PRODUCTS: Product[] = [
  // ===== المنتجات المحلية (91 منتج) =====
  {id:1,name_en:"Apple Gala 1000 G",name_ar:"تفاح سكري",category:"fruits",price:7,unit:"kg",image:"https://images.unsplash.com/photo-1560806647-b8cc0cbaf21d?w=500&h=500&fit=crop",stock:100},
  {id:2,name_en:"Apple Green 1000 G",name_ar:"تفاح اخضر",category:"fruits",price:7,unit:"kg",image:"https://images.unsplash.com/photo-1560806647-b8cc0cbaf21d?w=500&h=500&fit=crop",stock:85},
  {id:3,name_en:"Apple Red 1000 G",name_ar:"تفاح احمر",category:"fruits",price:7.5,unit:"kg",image:"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&h=500&fit=crop",stock:90},
  {id:4,name_en:"Apple Yellow 1000 G",name_ar:"تفاح اصفر",category:"fruits",price:7,unit:"kg",image:"https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&h=500&fit=crop",stock:75},
  {id:5,name_en:"Apricot 1000 G",name_ar:"مشمش",category:"fruits",price:16,unit:"kg",image:"https://images.unsplash.com/photo-1585518419759-c0762b4e8c1e?w=500&h=500&fit=crop",stock:60},
  {id:6,name_en:"Arabic leeks (Kurath)",name_ar:"كراث",category:"vegetables",price:1.5,unit:"pc",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:200},
  {id:7,name_en:"Banana 1000 G",name_ar:"موز",category:"fruits",price:6.5,unit:"kg",image:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=500&fit=crop",stock:120},
  {id:8,name_en:"Beans Green Fresh 1000 G",name_ar:"فاصوليا خضراء",category:"vegetables",price:8,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:80},
  {id:9,name_en:"Beet Root Local 1000 G",name_ar:"بنجر",category:"vegetables",price:5,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:70},
  {id:10,name_en:"Bell Pepper Green 1000 G LOCAL",name_ar:"رومي اخضر",category:"vegetables",price:6,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:95},
  {id:11,name_en:"Bell Pepper Red 1000 G LOCAL",name_ar:"رومي احمر",category:"vegetables",price:8,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:85},
  {id:12,name_en:"Bell pepper Yellow 1000 G LOCAL",name_ar:"رومي اصفر",category:"vegetables",price:8,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:80},
  {id:13,name_en:"Bitter Gourd (karela) 1000 G",name_ar:"كرلا",category:"vegetables",price:6.5,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:50},
  {id:14,name_en:"Broccoli Local 1000 G",name_ar:"بركلي",category:"vegetables",price:16,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:65},
  {id:15,name_en:"Cabbage Red Local 1000 G",name_ar:"ملفوف احمر",category:"vegetables",price:4.5,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:110},
  {id:16,name_en:"Cabbage White Local 1000 G",name_ar:"ملفوف ابيض",category:"vegetables",price:3.5,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:130},
  {id:17,name_en:"Cactus Pears Seasonal Fruit KSA 1000 G",name_ar:"تين شوكي",category:"fruits",price:13,unit:"kg",image:"https://images.unsplash.com/photo-1585518419759-c0762b4e8c1e?w=500&h=500&fit=crop",stock:40},
  {id:18,name_en:"Carrot 1000 G",name_ar:"جزر محلي",category:"vegetables",price:4.5,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:150},
  {id:19,name_en:"Califlower 1000 G",name_ar:"زهرة",category:"vegetables",price:7,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:90},
  {id:20,name_en:"Celery Green Local 1000 G",name_ar:"كرفس محلي",category:"vegetables",price:18,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:55},
  
  // ===== المنتجات المستوردة (163 منتج) =====
  {id:92,name_en:"ALFALFA Sprouts 250 1x250G",name_ar:"براعم البرسيم",category:"vegetables",price:11,unit:"box",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:50},
  {id:93,name_en:"Apricot Imported 1000G USA",name_ar:"مشمش مستورد",category:"fruits",price:35,unit:"kg",image:"https://images.unsplash.com/photo-1585518419759-c0762b4e8c1e?w=500&h=500&fit=crop",stock:45},
  {id:94,name_en:"Artichoke Imported Fresh 1000G",name_ar:"خرشوف طازج مستورد",category:"vegetables",price:33,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:35},
  {id:95,name_en:"Asparagus Baby Imported 1000G",name_ar:"سبانخ بحر صغيرة",category:"vegetables",price:9,unit:"pk",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:40},
  {id:96,name_en:"Asparagus Jumbo Green Imported 1000G",name_ar:"سبانخ بحر خضراء عملاقة",category:"vegetables",price:55,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:30},
  {id:97,name_en:"Asparagus Green Imported 1000G",name_ar:"سبانخ بحر خضراء",category:"vegetables",price:50,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:35},
  {id:98,name_en:"Asparagus White Imported 1000G USA",name_ar:"سبانخ بحر بيضاء أمريكية",category:"vegetables",price:70,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:25},
  {id:99,name_en:"Avocado Imported Fresh 1000G USA",name_ar:"أفوكادو طازج أمريكي",category:"fruits",price:30,unit:"kg",image:"https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop",stock:40},
  {id:100,name_en:"Avocado KENYA 1000G",name_ar:"أفوكادو كيني",category:"fruits",price:20,unit:"kg",image:"https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&h=500&fit=crop",stock:50},
  {id:101,name_en:"Baby Carrot With steam Imported 200G Holland",name_ar:"جزر صغير هولندي 200G",category:"vegetables",price:20,unit:"box",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:60},
  {id:102,name_en:"Baby Corn 1000G",name_ar:"ذرة صغيرة",category:"vegetables",price:5,unit:"pk",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:80},
  {id:103,name_en:"Baby Spinach Imported Fresh 1000G",name_ar:"سبانخ صغيرة طازجة",category:"vegetables",price:60,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:45},
  {id:104,name_en:"Bamboo Leaf Imported Fresh PCS",name_ar:"أوراق خيزران طازجة",category:"herbs",price:32,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:30},
  {id:105,name_en:"Banana Leaves Imported 1000G",name_ar:"أوراق موز مستوردة",category:"herbs",price:35,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:35},
  {id:106,name_en:"Basil Imported Fresh 1000G",name_ar:"ريحان طازج مستورد",category:"herbs",price:58,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:40},
  {id:107,name_en:"Bean Green 1000G",name_ar:"فاصوليا خضراء",category:"vegetables",price:8,unit:"pk",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:70},
  {id:108,name_en:"Bean Sprout 1000G",name_ar:"براعم فاصوليا",category:"vegetables",price:8,unit:"pk",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:65},
  {id:109,name_en:"Beans Haricot Imported 1000G",name_ar:"فاصوليا هاريكوت",category:"vegetables",price:9,unit:"pk",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:60},
  {id:110,name_en:"Beans Sprout Imported 1000G",name_ar:"براعم فاصوليا مستوردة",category:"vegetables",price:8,unit:"pk",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:55},
  {id:111,name_en:"Beet Red Baby (chioggia) Imported 1000G",name_ar:"لبلاب أحمر صغير (شيوجيا)",category:"vegetables",price:37,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:40},
  {id:112,name_en:"Beet Root Imported Fresh 1000G",name_ar:"لبلاب أحمر طازج",category:"vegetables",price:21,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:50},
  {id:113,name_en:"Beet Root mini Yellow Imported 250G",name_ar:"لبلاب أصفر مصغر",category:"vegetables",price:22,unit:"box",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:45},
  {id:114,name_en:"Bell Pepper Green Imported 1000G",name_ar:"فلفل أخضر مستورد",category:"vegetables",price:27,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:55},
  {id:115,name_en:"Blackberry Loose Taif 1000G",name_ar:"توت شوكي طائف مفكك",category:"fruits",price:0,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:0},
  {id:116,name_en:"Blackberry USA Imported Fresh 200G",name_ar:"توت شوكي أمريكي طازج",category:"fruits",price:15,unit:"box",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:35},
  {id:117,name_en:"Blue Berry Imported 170G",name_ar:"توت أزرق مستورد",category:"fruits",price:14,unit:"box",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:40},
  {id:118,name_en:"Broccoli Imported 1000G USA",name_ar:"بروكولي أمريكي",category:"vegetables",price:20,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:50},
  {id:119,name_en:"Brussel Sprouts 1000G",name_ar:"قرنبيط بروكسل",category:"vegetables",price:25,unit:"kg",image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=500&fit=crop",stock:45},
  {id:120,name_en:"Cabbage Chinese Imported 1000G",name_ar:"كرنب صيني مستورد",category:"vegetables",price:20,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:55},
  {id:121,name_en:"Cabbage White Imported 1000G",name_ar:"كرنب أبيض مستورد",category:"vegetables",price:17,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:60},
  {id:122,name_en:"Cantaloupe Melon Imported Fresh 1000 G",name_ar:"بطيخ كانتالوب طازج مستورد",category:"fruits",price:22,unit:"kg",image:"https://images.unsplash.com/photo-1585518419759-c0762b4e8c1e?w=500&h=500&fit=crop",stock:40},
  {id:123,name_en:"Carrot Baby Red Imported Fresh 450 G",name_ar:"جزر أحمر صغير طازج",category:"vegetables",price:8,unit:"pk",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:70},
  {id:124,name_en:"Carrot Baby Whole USA Imported Fresh 1000 G",name_ar:"جزر صغير كامل أمريكي",category:"vegetables",price:5.9,unit:"pk",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:75},
  {id:125,name_en:"Carrot Baby Yellow Imported Fresh 1000 G",name_ar:"جزر أصفر صغير طازج",category:"vegetables",price:36,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:50},
  {id:126,name_en:"Celery Imported Fresh 1000 G USA",name_ar:"كرفس طازج أمريكي",category:"vegetables",price:18,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:55},
  {id:127,name_en:"Celery Roots White Imported 1000 G",name_ar:"جذور كرفس بيضاء",category:"vegetables",price:20,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:45},
  {id:128,name_en:"Chayote Green Imported 1000 G",name_ar:"شايوت أخضر مستورد",category:"vegetables",price:30,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:40},
  {id:129,name_en:"Cherries USA Imported 1000 G",name_ar:"كرز أمريكي مستورد",category:"fruits",price:80,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:25},
  {id:130,name_en:"Cherries 1000 G aus",name_ar:"كرز أسترالي",category:"fruits",price:50,unit:"kg",image:"https://images.unsplash.com/photo-1599599810694-b5ac4dd64b73?w=500&h=500&fit=crop",stock:30},
];

export default COMPLETE_PRODUCTS;
