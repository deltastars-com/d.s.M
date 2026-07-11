// ===== قاعدة بيانات المنتجات الكاملة والشاملة =====
// تم دمج جميع المنتجات المحلية والمستوردة مع الأسعار الحقيقية
// عدد المنتجات الكلي: 254 منتج

export interface Product {
  id: number;
  name_en: string;
  name_ar: string;
  category: 'fruits' | 'vegetables' | 'herbs' | 'eggs' | 'other';
  price: number;
  unit: string;
  image: string;
  stock: number;
  description_ar?: string;
  description_en?: string;
}

export const PRODUCTS: Product[] = [
  {
    "id": 1,
    "name_en": "Apple Gala 1000G",
    "name_ar": "تفاح سكري",
    "category": "fruits",
    "price": 7.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/14raaz2yPcxGv4PLTCxyA2SqNDXJikXoi/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 2,
    "name_en": "Apple Green 1000G",
    "name_ar": "تفاح أخضر",
    "category": "fruits",
    "price": 7.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1x_4VWYYveuiwJtVdfNLReIithJO2JzGI/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 3,
    "name_en": "Apple Red 1000G",
    "name_ar": "تفاح أحمر",
    "category": "fruits",
    "price": 7.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1s3WUV0dJ_3GYKa7_XV7BeTKfzl1iq__b/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 4,
    "name_en": "Apple Yellow 1000G",
    "name_ar": "تفاح أصفر",
    "category": "fruits",
    "price": 7.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1JTO_fu2XlCN3-wFNV3OuN-SOPDgnGKUK/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 5,
    "name_en": "Apricot 1000G",
    "name_ar": "مشمش",
    "category": "fruits",
    "price": 16.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1nGeZ4RDnJ-P-n30KM3JUgZFEy2hbHXE3/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 6,
    "name_en": "Arabic Leeks Kurath",
    "name_ar": "كراث",
    "category": "vegetables",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1bYMbxIhe8e1kSLSR24DCxhF9YCCBk5UX/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 7,
    "name_en": "Banana 1000G",
    "name_ar": "موز",
    "category": "fruits",
    "price": 6.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1C4X6hYllVzFnei9q-pGR5ET3GzCmN8hc/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 8,
    "name_en": "Green Beans Fresh 1000G",
    "name_ar": "فاصوليا خضراء",
    "category": "vegetables",
    "price": 8.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1hOScKwXU6b7Z7xPVst4u3oBCHfTRbRGc/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 9,
    "name_en": "Beet Root Local 1000G",
    "name_ar": "بنجر",
    "category": "vegetables",
    "price": 5.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1t5GnOEdjJX6RB4E2gxUoTQ8ceEix_LLt/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 10,
    "name_en": "Bell Pepper Green LOCAL",
    "name_ar": "رومي أخضر",
    "category": "vegetables",
    "price": 6.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1cw_hNecLBH1l-QqW26K18rR77Amz7hd3/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 11,
    "name_en": "Bell Pepper Red LOCAL",
    "name_ar": "رومي أحمر",
    "category": "vegetables",
    "price": 8.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1g_Ymd4KHPMyhlgtJzUCVoxaCw8Qgk29_/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 12,
    "name_en": "Bell Pepper Yellow LOCAL",
    "name_ar": "رومي أصفر",
    "category": "vegetables",
    "price": 8.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1HWgl4vQ7-yyD13LJH9Leyi7ZmOmZo8fb/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 13,
    "name_en": "Bitter Gourd Karela 1000G",
    "name_ar": "كرلا",
    "category": "vegetables",
    "price": 6.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1NAapL0Lss9vg4VqST9-BbdmHZDZ3QChT/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 14,
    "name_en": "Broccoli Local 1000G",
    "name_ar": "بركلي",
    "category": "vegetables",
    "price": 16.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1H1hPMaQrc4fHZJpypn8k3W8r1x4RPoOg/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 15,
    "name_en": "Cabbage Red Local 1000G",
    "name_ar": "ملفوف أحمر",
    "category": "vegetables",
    "price": 4.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1GmaS_f37r1vSWu_rrhSi71YWPH5I41Gr/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 16,
    "name_en": "Cabbage White Local 1000G",
    "name_ar": "ملفوف أبيض",
    "category": "eggs",
    "price": 3.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1yZGiLqEPln5Lk_nO5uuyLMdiegf0wZ8S/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 17,
    "name_en": "Cactus Pears KSA 1000G",
    "name_ar": "تين شوكي",
    "category": "vegetables",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1dt0lqZGWz7JdY5dYlR1tLaXA3VQADP61/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 18,
    "name_en": "Carrot Local 1000G",
    "name_ar": "جزر محلي",
    "category": "vegetables",
    "price": 4.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1qKdTHTwWcqymmJfubyR5iD2ZCXQATDdk/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 19,
    "name_en": "Cauliflower 1000G",
    "name_ar": "زهرة",
    "category": "vegetables",
    "price": 7.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1-LRmks22xtvxe0-g8WMk17KJeGBLsYRV/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 20,
    "name_en": "Celery Green Local 1000G",
    "name_ar": "كرفس محلي",
    "category": "vegetables",
    "price": 18.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/18t3pyZ33bNvPuKs65FV3kow14PIzVrg-/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 21,
    "name_en": "Alfalfa Sprouts",
    "name_ar": "براعم البرسيم (ألفالفا)",
    "category": "herbs",
    "price": 11.0,
    "unit": "250G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 22,
    "name_en": "Apricot Imported USA",
    "name_ar": "مشمش مستورد (أمريكي)",
    "category": "fruits",
    "price": 35.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 23,
    "name_en": "Artichoke Imported Fresh",
    "name_ar": "خرشوف طازج مستورد",
    "category": "vegetables",
    "price": 33.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 24,
    "name_en": "Asparagus Baby Imported",
    "name_ar": "هليون صغير مستورد",
    "category": "vegetables",
    "price": 9.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 25,
    "name_en": "Asparagus Jumbo Green",
    "name_ar": "هليون أخضر جامبو مستورد",
    "category": "vegetables",
    "price": 55.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 26,
    "name_en": "Asparagus Green Imported",
    "name_ar": "هليون أخضر مستورد",
    "category": "vegetables",
    "price": 50.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 27,
    "name_en": "Asparagus White USA",
    "name_ar": "هليون أبيض أمريكي",
    "category": "eggs",
    "price": 70.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 28,
    "name_en": "Avocado USA",
    "name_ar": "أفوكادو أمريكي طازج",
    "category": "vegetables",
    "price": 30.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 29,
    "name_en": "Avocado Kenya",
    "name_ar": "أفوكادو كيني",
    "category": "vegetables",
    "price": 20.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 30,
    "name_en": "Baby Carrot Holland",
    "name_ar": "جزر صغير بالعنق (هولندي)",
    "category": "vegetables",
    "price": 20.0,
    "unit": "200G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 31,
    "name_en": "Chilli Green Local 1000G",
    "name_ar": "فلفل حار أخضر",
    "category": "vegetables",
    "price": 9.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1qz9eE3COufpOQ5HjRVpP82RSuv8LmPF4/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 32,
    "name_en": "Chilli Red Hot Local 1000G",
    "name_ar": "فلفل حار أحمر",
    "category": "vegetables",
    "price": 8.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1D_QtXdvpAHh0VtWCGs69Jvk8TSd-ltIh/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 33,
    "name_en": "Coconut Brown 1000G",
    "name_ar": "جوز الهند",
    "category": "vegetables",
    "price": 8.0,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1qjJ9mY4Cv2xWKR1cAqX5TajU4TWe-eH-/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 34,
    "name_en": "Coriander Leaves 1000G",
    "name_ar": "كزبرة",
    "category": "herbs",
    "price": 1.5,
    "unit": "PC",
    "image": "https://drive.google.com/file/d/1fjr3r9Lr6ypvGFer_a_od4L1uUJXCp8c/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 35,
    "name_en": "Cucumber 1000G",
    "name_ar": "خيار",
    "category": "vegetables",
    "price": 4.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1JhtJga2yvkgH6E3GfMBVgwJMnyaCA0Aw/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 36,
    "name_en": "Curry Leaves Imported",
    "name_ar": "أوراق الكاري",
    "category": "herbs",
    "price": 20.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1TzrKRmpeSHL2ZMZozNaqdPC3P4spN3Qj/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 37,
    "name_en": "Baby Corn",
    "name_ar": "ذرة صغيرة (بيبي كورن)",
    "category": "vegetables",
    "price": 5.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 38,
    "name_en": "Baby Spinach Imported",
    "name_ar": "سبانخ صغيرة طازجة",
    "category": "vegetables",
    "price": 60.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 39,
    "name_en": "Bamboo Leaves Fresh",
    "name_ar": "أوراق خيزران طازجة",
    "category": "herbs",
    "price": 32.0,
    "unit": "PCS",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 40,
    "name_en": "Banana Leaves Imported",
    "name_ar": "أوراق موز مستوردة",
    "category": "fruits",
    "price": 35.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 41,
    "name_en": "Basil Imported Fresh",
    "name_ar": "ريحان طازج مستورد",
    "category": "herbs",
    "price": 58.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 42,
    "name_en": "Green Beans",
    "name_ar": "فاصوليا خضراء",
    "category": "vegetables",
    "price": 8.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 43,
    "name_en": "Bean Sprouts",
    "name_ar": "براعم الفاصوليا",
    "category": "herbs",
    "price": 8.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 44,
    "name_en": "Haricot Beans Imported",
    "name_ar": "فاصوليا هاريكوت مستوردة",
    "category": "vegetables",
    "price": 9.0,
    "unit": "1000G",
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 45,
    "name_en": "Custard Apples 1000G",
    "name_ar": "قشطة",
    "category": "vegetables",
    "price": 11.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1FeNZd6hnZEfGUg_sCMQ-XPtwnVqj0ykB/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 46,
    "name_en": "Dill Local 1000G",
    "name_ar": "شبت",
    "category": "herbs",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1hk_5XtN4qGlLlT6KdyEH67WIc_wcsMS6/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 47,
    "name_en": "Drumstick 1000G",
    "name_ar": "درام ستك",
    "category": "vegetables",
    "price": 12.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1LnExAbab0tIGy8Yg22Mdw-OdIzo8F8VY/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 48,
    "name_en": "Eggplant Local 1000G",
    "name_ar": "باذنجان أسود مدور وسط/صغير",
    "category": "vegetables",
    "price": 3.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1fSgEKHdJaYF5IrQ2tHGel3Ttxujzj0W5/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 49,
    "name_en": "Eggplant Long Local",
    "name_ar": "باذنجان طويل",
    "category": "vegetables",
    "price": 5.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/19n6xPGE2IA4576T60trPro2mHCxD_XNf/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 50,
    "name_en": "Eggplant White Local",
    "name_ar": "باذنجان أبيض",
    "category": "eggs",
    "price": 4.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1Mu48BBY8ktaFOd07_zhY32lKRt_f3Zpw/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 51,
    "name_en": "Figs Local 1000G",
    "name_ar": "تين محلي",
    "category": "vegetables",
    "price": 23.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1Y08cy9YH20Zt3GKqcBuuDKbHiHV3cVS_/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 52,
    "name_en": "Garlic Peeled 1000G",
    "name_ar": "ثوم مقشر",
    "category": "vegetables",
    "price": 14.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/12L4Qtfab22_9pddCxO5wiVk2lGrVW-Lp/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 53,
    "name_en": "Garlic 1000G",
    "name_ar": "ثوم",
    "category": "vegetables",
    "price": 10.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1U6fsvi67YgD-hioEQW-KIwNQRnHwi101/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 54,
    "name_en": "Ginger 1000G",
    "name_ar": "زنجبيل",
    "category": "vegetables",
    "price": 9.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1p6KcNDSYbfaS1Sc6H9OgwEzHimixjk1H/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 55,
    "name_en": "Grapefruit 1000G",
    "name_ar": "جريب فروت",
    "category": "fruits",
    "price": 6.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1jg0W0AT8ym_DqP4Zo0NHLleYwhYHc_H4/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 56,
    "name_en": "Grapes Black Local",
    "name_ar": "عنب أسود",
    "category": "fruits",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1m8Ct2JMueZiw9j1hUooHfawox7xfIfS4/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 57,
    "name_en": "Grapes Green Local",
    "name_ar": "عنب أخضر",
    "category": "fruits",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1MRLb3gL9u3GYfvN8HyisIr3z-mPhafwV/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 58,
    "name_en": "Grapes Red Local",
    "name_ar": "عنب أحمر",
    "category": "fruits",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1yZN_MuTkm923oIfqJJBGHJNdfuVTR8lb/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 59,
    "name_en": "Grapes White 1000G",
    "name_ar": "عنب أبيض",
    "category": "fruits",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1KCnKtWKgMYbfOvCHxrXdmEYC596omYvp/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 60,
    "name_en": "Guava 1000G",
    "name_ar": "جوافة",
    "category": "fruits",
    "price": 9.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1TTr15bS8-sXbSdKbH0nsdW35z56K8R3R/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 61,
    "name_en": "Jarjir 1000G",
    "name_ar": "جرجير",
    "category": "herbs",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1R9j01inq7s3h741O18wGQS2uuSv2m4eA/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 62,
    "name_en": "Kaka 1000G",
    "name_ar": "كاكا",
    "category": "vegetables",
    "price": 18.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1eUM9auPELVzueEEq2Q9BvKBofulI5bLG/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 63,
    "name_en": "Kiwi 1000G",
    "name_ar": "كيوي",
    "category": "fruits",
    "price": 12.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1QhH-IUdqWuh_HKjMkmnj6aAdedQWVA9p/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 64,
    "name_en": "Ladyfinger 1000G",
    "name_ar": "بامية حجم الحبة صغير",
    "category": "vegetables",
    "price": 12.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1uqaB1W2g_UmRs-A0DPAiArQMlz19e7ip/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 65,
    "name_en": "Leeks Local 1000G",
    "name_ar": "ليك محلي",
    "category": "vegetables",
    "price": 12.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1StFl7-uiJo8tqJPxPwdDZ1jj7bWCvo_P/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 66,
    "name_en": "Lemon Big Local",
    "name_ar": "ليمون",
    "category": "fruits",
    "price": 9.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1YxV_nDD5aF7p-6RoxaHKskOgDLb-tf0o/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 67,
    "name_en": "Lemon Small 1000G",
    "name_ar": "ليمون صغير",
    "category": "fruits",
    "price": 4.0,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1pgMkqnLYzwlGmTa0zmKPUK5mfyeVYQYL/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 68,
    "name_en": "Lettuce Iceberg Imported",
    "name_ar": "خس مدور مستورد إسباني",
    "category": "vegetables",
    "price": 17.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1U6v8Sskgm4zacRwh3eeh7yMsnWgXFMWV/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 69,
    "name_en": "Lettuce Iceberg Local",
    "name_ar": "خس مدور",
    "category": "vegetables",
    "price": 9.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1-epBe5ll3GgvZJXr-Hyg_kFiA6mkPoMg/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 70,
    "name_en": "Lettuce Romaine Local",
    "name_ar": "خس طويل",
    "category": "vegetables",
    "price": 7.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1UFeMZV90TR0L3qk6daEb1Y6tn7jUpyyq/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 71,
    "name_en": "Lime Fresh Imported",
    "name_ar": "ليم أخضر",
    "category": "vegetables",
    "price": 10.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1x7aQxFLoEEX7tJyhaRWN4DoXyF19_3Ec/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 72,
    "name_en": "Mandarin 1000G",
    "name_ar": "أفندي",
    "category": "fruits",
    "price": 9.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1mmlL5LqKnLi56I1glw15wH619eNq54Gc/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 73,
    "name_en": "Mango Timor 1000G",
    "name_ar": "مانجو تيمور",
    "category": "fruits",
    "price": 18.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1dvg4dVcK-",
    "stock": 100
  },
  {
    "id": 75,
    "name_en": "Marrow / Courgette / Zucchini Local 1000G",
    "name_ar": "كوسة",
    "category": "vegetables",
    "price": 6.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1WTPmEiSvnHG0RMBNf8nvvoQPPvlUInu4/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 76,
    "name_en": "Melon Sweet 1000G",
    "name_ar": "شمام",
    "category": "fruits",
    "price": 3.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1pbZTRRiDU-cK25z0Eozh8qrB4nm83S7C/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 77,
    "name_en": "Mint 1000G",
    "name_ar": "نعناع",
    "category": "herbs",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1QwEenpFIAm8AuREzqFXbfNeHhNZGIMC8/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 78,
    "name_en": "Mulokhia 1000G",
    "name_ar": "ملوخية",
    "category": "herbs",
    "price": 6.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1zmu3BaIN2Txf3Jm9eUKp1vvGtrln9kfh/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 79,
    "name_en": "Nectarine 1000G LOCAL",
    "name_ar": "نكتارين",
    "category": "fruits",
    "price": 16.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1XRHzpjwCBZ0PDC2mLf7aIzo1XuFAD7-m/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 80,
    "name_en": "Okra 1000G",
    "name_ar": "بامية",
    "category": "vegetables",
    "price": 15.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1UDFzcEUB2rFbXa6bXMjR-Mip7Jr1ztrR/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 81,
    "name_en": "Onion Red 1000G",
    "name_ar": "بصل أحمر",
    "category": "vegetables",
    "price": 3.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/11MB2mjVjGgViYDbyGFvR5089nSASEPqs/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 82,
    "name_en": "Onion Spring 1000G",
    "name_ar": "بصل أخضر",
    "category": "vegetables",
    "price": 4.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1bNJGWzpSVn3vi33b8IF7-tKPB1rX_1tT/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 83,
    "name_en": "Onion White 1000G",
    "name_ar": "بصل أبيض",
    "category": "eggs",
    "price": 4.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1Ws82hzOGSWv5J2DstQnEe91m3URP-rKF/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 84,
    "name_en": "Orange For Juice Fresh 1000G",
    "name_ar": "برتقال عصير",
    "category": "fruits",
    "price": 5.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1d9P8ZspAFZGGHBOqzbFMuEeoPJ23CYDI/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 85,
    "name_en": "Orange Navel 1000G",
    "name_ar": "برتقال أبوصورة",
    "category": "fruits",
    "price": 7.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1FuPxF23o2TGy8jJOQmehoSiMMBLC7axK/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 86,
    "name_en": "Papaya 1000G",
    "name_ar": "بابايا",
    "category": "fruits",
    "price": 8.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1W0G6CDg6p7Io8J1SoyyHPRygjzSkyvgy/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 87,
    "name_en": "Parsely Local 1000G",
    "name_ar": "بقدونس",
    "category": "herbs",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1CjB7QJqY0XhCeUsNWyLZilIWULZmR46a/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 88,
    "name_en": "Peach 1000G",
    "name_ar": "خوخ",
    "category": "fruits",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1n-FpDTvyy8FvqKyMhKw__ZAuy047F0Lj/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 89,
    "name_en": "Pears Imported Fresh 1000G",
    "name_ar": "كمثرى",
    "category": "fruits",
    "price": 12.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1t4QlgPCc2lAKksrWTIBEKdtg6R3Uhg3E/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 90,
    "name_en": "Pineapple Baby 1000G",
    "name_ar": "أناناس بيبي",
    "category": "fruits",
    "price": 25.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1U0K1fJf-54EveBzbS03wZoHmvOAP-taB/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 91,
    "name_en": "Pineapple Large 1000G",
    "name_ar": "أناناس",
    "category": "fruits",
    "price": 10.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1WlTCFFbtHUKdtlFSuy7baJfoFWApF8w3/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 92,
    "name_en": "Plums Black 1000G",
    "name_ar": "بخارة أسود",
    "category": "fruits",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1YU7Y8ARUoZ_8GwUrbHBBa47cqgz1HZbo/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 93,
    "name_en": "Plums Red 1000G",
    "name_ar": "بخارة أحمر",
    "category": "fruits",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1ur85ixAOPwTmEGr5_bq5KGJEx_9XRFvt/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 94,
    "name_en": "Pomegranate 1000G",
    "name_ar": "رمان",
    "category": "fruits",
    "price": 13.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1PreacAGBSHSIqRqwr_dyqyCWTjDGEP31/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 95,
    "name_en": "Potato Sweet 1000G",
    "name_ar": "بطاطا حلوة",
    "category": "vegetables",
    "price": 4.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1n_Wghsdl4wk237X9CtauH2lwZ2GKVV8D/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 96,
    "name_en": "Potato 1000G",
    "name_ar": "بطاطس",
    "category": "vegetables",
    "price": 3.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1QYFqP7T0H6x3-JB8VncPxUPg0TWPQczL/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 97,
    "name_en": "Pumpkin Green Long Dubbah 1000G",
    "name_ar": "قرع أخضر (دبة)",
    "category": "vegetables",
    "price": 5.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1U9OwmB2ifAKEKWTZ_c90sKiUAXbzDseN/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 98,
    "name_en": "Pumpkin 1000G",
    "name_ar": "قرع أصفر (عسلي)",
    "category": "vegetables",
    "price": 5.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1vladnnXtMon8igxLBIxpsaUXAIz6yrNW/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 99,
    "name_en": "Purslane Green Rijla 1000G",
    "name_ar": "رجلة",
    "category": "vegetables",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1r72L0hZLktqPXMQcEeB9X1FBXsJxIJiu/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 100,
    "name_en": "Radish Red 1000G",
    "name_ar": "فجل أحمر",
    "category": "vegetables",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1Fw9seQJTs1alziR4JFBMim3ICjFNVNWI/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 101,
    "name_en": "Radish White 1000G",
    "name_ar": "فجل أبيض",
    "category": "eggs",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1n0BFoTWzoZ3wD6w5Hgmn9YAuKZKNqGU9/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 102,
    "name_en": "Spinach Local 1000G",
    "name_ar": "سبانخ",
    "category": "vegetables",
    "price": 1.5,
    "unit": "pc",
    "image": "https://drive.google.com/file/d/1YyOOkTC3yZjW7CWJXy9M6WVhIq6VEgI8/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 103,
    "name_en": "Strawberry Fresh 1000G",
    "name_ar": "فراولة مصري",
    "category": "fruits",
    "price": 20.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1LKR78n2i8NdioZ1xGkoiOypzDFcREN2M/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 104,
    "name_en": "Taro Root Gulgas 1000G",
    "name_ar": "قلقاس",
    "category": "vegetables",
    "price": 12.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1-6uyGQ1qNuuS4hrIzrOuI-hRM-8POyhG/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 105,
    "name_en": "Tomato Cherry Red Local 1000G",
    "name_ar": "طماطم شيري أحمر",
    "category": "vegetables",
    "price": 25.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/16sJGKHB2z2tFZPYw7BSLoa4XOMgY41v-/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 106,
    "name_en": "Tomato Red 1000G",
    "name_ar": "طماطم مدور",
    "category": "vegetables",
    "price": 5.0,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1MlXdxBjSj_H2FKzueCL65yfAxaBAm8Sn/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 107,
    "name_en": "Turnip Fresh 1000G",
    "name_ar": "لفت",
    "category": "vegetables",
    "price": 3.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1MlXdxBjSj_H2FKzueCL65yfAxaBAm8Sn/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 108,
    "name_en": "Watermelon Long Local 1000G",
    "name_ar": "بطيخ طويل",
    "category": "fruits",
    "price": 3.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1lx7gktVg5LOmR5d0JYd3OOqacWL-Fr9r/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 109,
    "name_en": "Watermelon Round Local 1000G",
    "name_ar": "بطيخ مدور",
    "category": "fruits",
    "price": 3.5,
    "unit": "Kg",
    "image": "https://drive.google.com/file/d/1dxf_OVjL8p6v7uNgvcXYaYIMGFkP1TJ0/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 110,
    "name_en": "Eggs Fresh algharbia sizeXL X12",
    "name_ar": "بيض",
    "category": "eggs",
    "price": 185.0,
    "unit": "BOX",
    "image": "https://drive.google.com/file/d/1rTRylFNtpZA2kLnXd2-iABd8UIYaaLbd/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 127,
    "name_en": "Bean Sprouts Imported",
    "name_ar": "براعم فاصوليا مستوردة",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "8",
    "stock": 0
  },
  {
    "id": 128,
    "name_en": "Baby Red Beet Chioggia",
    "name_ar": "بنجر أحمر صغير (شيوجيا)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "37",
    "stock": 0
  },
  {
    "id": 129,
    "name_en": "Beetroot Imported Fresh",
    "name_ar": "بنجر (شمندر) طازج",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 130,
    "name_en": "Mini Yellow Beetroot",
    "name_ar": "بنجر أصفر مصغر",
    "category": "vegetables",
    "price": 0,
    "unit": "250G",
    "image": "22",
    "stock": 0
  },
  {
    "id": 131,
    "name_en": "Green Bell Pepper Imported",
    "name_ar": "فلفل أخضر حلو مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "27",
    "stock": 0
  },
  {
    "id": 132,
    "name_en": "Blackberry Taif",
    "name_ar": "توت أسود (طائفي)",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "-",
    "stock": 0
  },
  {
    "id": 133,
    "name_en": "Blackberry USA Fresh",
    "name_ar": "توت أسود أمريكي طازج",
    "category": "fruits",
    "price": 0,
    "unit": "200G",
    "image": "15",
    "stock": 0
  },
  {
    "id": 134,
    "name_en": "Blueberry Imported",
    "name_ar": "توت أزرق مستورد",
    "category": "fruits",
    "price": 0,
    "unit": "170G",
    "image": "14",
    "stock": 0
  },
  {
    "id": 135,
    "name_en": "Broccoli USA",
    "name_ar": "بروكلي أمريكي",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 136,
    "name_en": "Brussels Sprouts",
    "name_ar": "براعم بروكسل (كرنب صغير)",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "25",
    "stock": 0
  },
  {
    "id": 137,
    "name_en": "Chinese Cabbage",
    "name_ar": "كرنب صيني (باي تشوي)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 138,
    "name_en": "White Cabbage Imported",
    "name_ar": "كرنب أبيض مستورد",
    "category": "eggs",
    "price": 0,
    "unit": "1000G",
    "image": "17",
    "stock": 0
  },
  {
    "id": 139,
    "name_en": "Cantaloupe Melon Imported",
    "name_ar": "شمام كانتالوب مستورد",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "22",
    "stock": 0
  },
  {
    "id": 140,
    "name_en": "Baby Red Carrot Fresh",
    "name_ar": "جزر أحمر صغير طازج",
    "category": "vegetables",
    "price": 0,
    "unit": "450G",
    "image": "8",
    "stock": 0
  },
  {
    "id": 141,
    "name_en": "Baby Whole Carrot USA",
    "name_ar": "جزر صغير كامل (أمريكي)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "5.9",
    "stock": 0
  },
  {
    "id": 142,
    "name_en": "Baby Yellow Carrot Fresh",
    "name_ar": "جزر أصفر صغير طازج",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "36",
    "stock": 0
  },
  {
    "id": 143,
    "name_en": "Celery Fresh USA",
    "name_ar": "كرفس طازج أمريكي",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "18",
    "stock": 0
  },
  {
    "id": 144,
    "name_en": "White Celery Roots",
    "name_ar": "جذور كرفس بيضاء",
    "category": "eggs",
    "price": 0,
    "unit": "1000G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 145,
    "name_en": "Green Chayote Imported",
    "name_ar": "شايوت أخضر مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "30",
    "stock": 0
  },
  {
    "id": 146,
    "name_en": "Cherries USA",
    "name_ar": "كرز أمريكي",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "80",
    "stock": 0
  },
  {
    "id": 147,
    "name_en": "Cherries AUS",
    "name_ar": "كرز أسترالي",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "50",
    "stock": 0
  },
  {
    "id": 148,
    "name_en": "Red Chicory Radicchio",
    "name_ar": "هندباء حمراء (شيكوريا)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "38",
    "stock": 0
  },
  {
    "id": 149,
    "name_en": "Yellow Chicory",
    "name_ar": "هندباء صفراء (شيكوريا)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "38",
    "stock": 0
  },
  {
    "id": 150,
    "name_en": "Green Jalapeno",
    "name_ar": "فلفل هالبينو أخضر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "30",
    "stock": 0
  },
  {
    "id": 151,
    "name_en": "Orange Jalapeno",
    "name_ar": "فلفل هالبينو برتقالي",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "45",
    "stock": 0
  },
  {
    "id": 152,
    "name_en": "Red Jalapeno",
    "name_ar": "فلفل هالبينو أحمر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "45",
    "stock": 0
  },
  {
    "id": 153,
    "name_en": "Yellow Jalapeno",
    "name_ar": "فلفل هالبينو أصفر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "45",
    "stock": 0
  },
  {
    "id": 154,
    "name_en": "Yellow Roman Chilli",
    "name_ar": "فلفل أصفر روماني",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "22",
    "stock": 0
  },
  {
    "id": 155,
    "name_en": "Fresh Chives Imported",
    "name_ar": "ثوم معمر طازج",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "70",
    "stock": 0
  },
  {
    "id": 156,
    "name_en": "Young Green Coconut",
    "name_ar": "جوز هند أخضر صغير",
    "category": "vegetables",
    "price": 0,
    "unit": "PCS",
    "image": "14",
    "stock": 0
  },
  {
    "id": 157,
    "name_en": "Baby Corn Fresh Imported",
    "name_ar": "ذرة صغيرة طازجة مستوردة",
    "category": "vegetables",
    "price": 0,
    "unit": "-",
    "image": "80",
    "stock": 0
  },
  {
    "id": 158,
    "name_en": "Corn On The Cob",
    "name_ar": "ذرة (كوز)",
    "category": "vegetables",
    "price": 0,
    "unit": "PCS",
    "image": "12",
    "stock": 0
  },
  {
    "id": 159,
    "name_en": "Fresh Cranberry",
    "name_ar": "توت بري طازج",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "60",
    "stock": 0
  },
  {
    "id": 160,
    "name_en": "Long Cucumber Imported",
    "name_ar": "خيار طويل مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 161,
    "name_en": "Dragon Fruit Fresh",
    "name_ar": "فاكهة التنين (دراغون فروت)",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "38",
    "stock": 0
  },
  {
    "id": 162,
    "name_en": "Durian Imported",
    "name_ar": "دوريان مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "38",
    "stock": 0
  },
  {
    "id": 163,
    "name_en": "Edible Flowers Fresh",
    "name_ar": "زهور صالحة للأكل",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "170",
    "stock": 0
  },
  {
    "id": 164,
    "name_en": "Endive Imported",
    "name_ar": "هندباء (انديف) مستوردة",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 165,
    "name_en": "Yellow Endive Fresh",
    "name_ar": "هندباء (انديف) أصفر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 166,
    "name_en": "Fresh Fava Beans",
    "name_ar": "فول طازج مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "39",
    "stock": 0
  },
  {
    "id": 167,
    "name_en": "Baby Fennel Imported",
    "name_ar": "شمر صغير مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 168,
    "name_en": "Fennel Imported",
    "name_ar": "شمر مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "23",
    "stock": 0
  },
  {
    "id": 169,
    "name_en": "Forelle Pear",
    "name_ar": "كمثرى فوريل",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "10",
    "stock": 0
  },
  {
    "id": 170,
    "name_en": "Granadilla Imported",
    "name_ar": "جرانديلا مستوردة",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "33",
    "stock": 0
  },
  {
    "id": 171,
    "name_en": "Pink Grapefruit",
    "name_ar": "جريب فروت وردي",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 172,
    "name_en": "Purple Thai Basil",
    "name_ar": "ريحان تايلاندي أرجواني",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "68",
    "stock": 0
  },
  {
    "id": 173,
    "name_en": "Rosemary Imported",
    "name_ar": "إكليل الجبل (روزماري)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "58",
    "stock": 0
  },
  {
    "id": 174,
    "name_en": "Sage Imported",
    "name_ar": "ميرمية مستوردة",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "65",
    "stock": 0
  },
  {
    "id": 175,
    "name_en": "Tarragon Imported",
    "name_ar": "طرخون مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "88",
    "stock": 0
  },
  {
    "id": 176,
    "name_en": "Honeydew Melon",
    "name_ar": "شمام عسلي",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "22",
    "stock": 0
  },
  {
    "id": 177,
    "name_en": "Kale Holland",
    "name_ar": "كرنب كالي (هولندي)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "32",
    "stock": 0
  },
  {
    "id": 178,
    "name_en": "Kiwano Holland",
    "name_ar": "كيوانو (هولندي)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "60",
    "stock": 0
  },
  {
    "id": 179,
    "name_en": "Kohlrabi Imported",
    "name_ar": "كولرابي (كرنب سلق)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "18",
    "stock": 0
  },
  {
    "id": 180,
    "name_en": "Kumquat Imported",
    "name_ar": "كمكوات (برتقال صغير)",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "52",
    "stock": 0
  },
  {
    "id": 181,
    "name_en": "Leeks Imported",
    "name_ar": "كراث مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "18",
    "stock": 0
  },
  {
    "id": 182,
    "name_en": "Lemongrass Imported",
    "name_ar": "عشبة الليمون",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "33",
    "stock": 0
  },
  {
    "id": 183,
    "name_en": "Lemon Leaves Imported",
    "name_ar": "أوراق ليمون",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "43",
    "stock": 0
  },
  {
    "id": 184,
    "name_en": "Boston Lettuce",
    "name_ar": "خس بوسطن",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 185,
    "name_en": "Green Frisée Lettuce",
    "name_ar": "خس فريزي أخضر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 186,
    "name_en": "Yellow Frisée Lettuce",
    "name_ar": "خس فريزي أصفر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "48",
    "stock": 0
  },
  {
    "id": 187,
    "name_en": "Radicchio Lettuce",
    "name_ar": "خس راديكيو",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 188,
    "name_en": "Baby Gem Lettuce",
    "name_ar": "خس بيبي جيم",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 189,
    "name_en": "Bok Choy",
    "name_ar": "بوك تشوي (خس صيني)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "23",
    "stock": 0
  },
  {
    "id": 190,
    "name_en": "Iceberg Lettuce USA",
    "name_ar": "خس آيسبرج (أمريكي)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "25",
    "stock": 0
  },
  {
    "id": 191,
    "name_en": "Lollo Biondi Lettuce",
    "name_ar": "خس لولو بيوندي",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 192,
    "name_en": "Lollo Rosso Lettuce",
    "name_ar": "خس لولو روسو",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 193,
    "name_en": "Oakleaf Lettuce",
    "name_ar": "خس أوراق البلوط",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 194,
    "name_en": "Baby Rocket",
    "name_ar": "جرجير صغير (بيبي روكيت)",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "65",
    "stock": 0
  },
  {
    "id": 195,
    "name_en": "Romaine Lettuce",
    "name_ar": "خس روماني",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 196,
    "name_en": "Kaffir Lime Leaves",
    "name_ar": "أوراق ليمون كفير",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "48",
    "stock": 0
  },
  {
    "id": 197,
    "name_en": "Longan Imported",
    "name_ar": "فاكهة اللونجان",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "37",
    "stock": 0
  },
  {
    "id": 198,
    "name_en": "Lychees Imported",
    "name_ar": "فاكهة الليتشي",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "45",
    "stock": 0
  },
  {
    "id": 199,
    "name_en": "Mango Fresh Imported",
    "name_ar": "مانجو طازج مستورد",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 200,
    "name_en": "Mangosteen Imported",
    "name_ar": "مانغوستين",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "36",
    "stock": 0
  },
  {
    "id": 201,
    "name_en": "Micro Herbs Fresh",
    "name_ar": "أعشاب مصغرة طازجة",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "75",
    "stock": 0
  },
  {
    "id": 202,
    "name_en": "Brown Button Mushroom",
    "name_ar": "فطر بني",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "25",
    "stock": 0
  },
  {
    "id": 203,
    "name_en": "White Button Mushroom",
    "name_ar": "فطر أبيض",
    "category": "eggs",
    "price": 0,
    "unit": "1000G",
    "image": "23",
    "stock": 0
  },
  {
    "id": 204,
    "name_en": "Porcini Mushroom",
    "name_ar": "فطر بورسيني",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "85",
    "stock": 0
  },
  {
    "id": 205,
    "name_en": "Chestnut Mushroom",
    "name_ar": "فطر كستناء",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "30",
    "stock": 0
  },
  {
    "id": 206,
    "name_en": "Enoki Mushroom",
    "name_ar": "فطر إينوكي",
    "category": "vegetables",
    "price": 0,
    "unit": "200G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 207,
    "name_en": "Portobello Mushroom",
    "name_ar": "فطر بورتوبيللو",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 208,
    "name_en": "Shiitake Mushroom",
    "name_ar": "فطر شيتاكي",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "74",
    "stock": 0
  },
  {
    "id": 209,
    "name_en": "White Shimeji Mushroom",
    "name_ar": "فطر شيميجي أبيض",
    "category": "eggs",
    "price": 0,
    "unit": "1000G",
    "image": "48",
    "stock": 0
  },
  {
    "id": 210,
    "name_en": "Nectarine USA",
    "name_ar": "نكتارين أمريكي",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "32",
    "stock": 0
  },
  {
    "id": 211,
    "name_en": "Red Pearl Onion USA",
    "name_ar": "بصل لؤلؤي أحمر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 212,
    "name_en": "White Pearl Onion USA",
    "name_ar": "بصل لؤلؤي أبيض",
    "category": "eggs",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 213,
    "name_en": "Red Jumbo Onion",
    "name_ar": "بصل أحمر جامبو",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 214,
    "name_en": "Shallot Onion Imported",
    "name_ar": "بصل أندلسي (شالوت)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "24",
    "stock": 0
  },
  {
    "id": 215,
    "name_en": "White Onion USA",
    "name_ar": "بصل أبيض أمريكي",
    "category": "eggs",
    "price": 0,
    "unit": "1000G",
    "image": "15",
    "stock": 0
  },
  {
    "id": 216,
    "name_en": "Fresh Oregano",
    "name_ar": "أوريجانو طازج",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "68",
    "stock": 0
  },
  {
    "id": 217,
    "name_en": "Papaya Imported",
    "name_ar": "بابايا مستوردة",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "25",
    "stock": 0
  },
  {
    "id": 218,
    "name_en": "French Parsley",
    "name_ar": "بقدونس فرنسي",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "28",
    "stock": 0
  },
  {
    "id": 219,
    "name_en": "Curly Parsley",
    "name_ar": "بقدونس مجعد",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "29",
    "stock": 0
  },
  {
    "id": 220,
    "name_en": "Passion Fruit",
    "name_ar": "باشن فروت",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 221,
    "name_en": "Peach Fresh USA",
    "name_ar": "خوخ طازج أمريكي",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "32",
    "stock": 0
  },
  {
    "id": 222,
    "name_en": "Green Peas",
    "name_ar": "بازلاء خضراء",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "29",
    "stock": 0
  },
  {
    "id": 223,
    "name_en": "Red Bell Pepper",
    "name_ar": "فلفل أحمر حلو",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "37",
    "stock": 0
  },
  {
    "id": 224,
    "name_en": "Orange Bell Pepper",
    "name_ar": "فلفل برتقالي حلو",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "37",
    "stock": 0
  },
  {
    "id": 225,
    "name_en": "Yellow Bell Pepper",
    "name_ar": "فلفل أصفر حلو",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "37",
    "stock": 0
  },
  {
    "id": 226,
    "name_en": "Physalis Golden Berry",
    "name_ar": "فيزاليس (توت ذهبي)",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "65",
    "stock": 0
  },
  {
    "id": 227,
    "name_en": "Baby Potatoes",
    "name_ar": "بطاطس صغيرة",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 228,
    "name_en": "Baby Red Potatoes",
    "name_ar": "بطاطس حمراء صغيرة",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 229,
    "name_en": "Baby White Potatoes",
    "name_ar": "بطاطس بيضاء صغيرة",
    "category": "eggs",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 230,
    "name_en": "Sweet Jewel Potato USA",
    "name_ar": "بطاطا حلوة (جوهرة)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 231,
    "name_en": "Red Radish Imported",
    "name_ar": "فجل أحمر مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "125G",
    "image": "5",
    "stock": 0
  },
  {
    "id": 232,
    "name_en": "White Radish",
    "name_ar": "فجل أبيض",
    "category": "eggs",
    "price": 0,
    "unit": "1000G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 233,
    "name_en": "Rambutan Imported",
    "name_ar": "رامبوتان",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 234,
    "name_en": "Red Raspberry",
    "name_ar": "توت العليق أحمر",
    "category": "fruits",
    "price": 0,
    "unit": "170G",
    "image": "15",
    "stock": 0
  },
  {
    "id": 235,
    "name_en": "Red Currant",
    "name_ar": "كشمش أحمر",
    "category": "vegetables",
    "price": 0,
    "unit": "125G",
    "image": "17",
    "stock": 0
  },
  {
    "id": 236,
    "name_en": "Rhubarb Imported",
    "name_ar": "راوند مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "26",
    "stock": 0
  },
  {
    "id": 237,
    "name_en": "Mini Romanesco Fresh",
    "name_ar": "رومانيسكو مصغر طازج",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "37",
    "stock": 0
  },
  {
    "id": 238,
    "name_en": "Fresh Rosemary",
    "name_ar": "إكليل الجبل طازج",
    "category": "vegetables",
    "price": 0,
    "unit": "100G",
    "image": "58",
    "stock": 0
  },
  {
    "id": 239,
    "name_en": "Sakura Mix Cress",
    "name_ar": "كريس ميكس ساكورا",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "80",
    "stock": 0
  },
  {
    "id": 240,
    "name_en": "Savoy Cabbage",
    "name_ar": "كرنب سافوي",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "22",
    "stock": 0
  },
  {
    "id": 241,
    "name_en": "Shiso Mix",
    "name_ar": "شيسو ميكس",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "80",
    "stock": 0
  },
  {
    "id": 242,
    "name_en": "Snow Peas",
    "name_ar": "بازلاء الثلج",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "37",
    "stock": 0
  },
  {
    "id": 243,
    "name_en": "Micro Sprout Mix",
    "name_ar": "براعم مصغرة مشكلة",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "80",
    "stock": 0
  },
  {
    "id": 244,
    "name_en": "Green Acorn Squash",
    "name_ar": "قرع بلوطي أخضر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "26",
    "stock": 0
  },
  {
    "id": 245,
    "name_en": "Butternut Squash USA",
    "name_ar": "قرع بتركوت (أمريكي)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "21",
    "stock": 0
  },
  {
    "id": 246,
    "name_en": "Star Fruit",
    "name_ar": "فاكهة النجمة",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "90",
    "stock": 0
  },
  {
    "id": 247,
    "name_en": "Fresh Strawberry USA",
    "name_ar": "فراولة طازجة أمريكية",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "47",
    "stock": 0
  },
  {
    "id": 248,
    "name_en": "Sugar Cane Juice",
    "name_ar": "قصب سكر للعصير",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 249,
    "name_en": "Tamarillo Imported",
    "name_ar": "طماريلو",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "53",
    "stock": 0
  },
  {
    "id": 250,
    "name_en": "Fresh Thyme Imported",
    "name_ar": "زعتر طازج مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "58",
    "stock": 0
  },
  {
    "id": 251,
    "name_en": "Thyme Leaves Fresh",
    "name_ar": "أوراق زعتر طازجة",
    "category": "herbs",
    "price": 0,
    "unit": "1000G",
    "image": "58",
    "stock": 0
  },
  {
    "id": 252,
    "name_en": "Orange Bunch Tomato",
    "name_ar": "طماطم برتقالية عنقودية",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "38",
    "stock": 0
  },
  {
    "id": 253,
    "name_en": "Red Bunch Tomato",
    "name_ar": "طماطم حمراء عنقودية",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 254,
    "name_en": "Yellow Bunch Tomato",
    "name_ar": "طماطم صفراء عنقودية",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "38",
    "stock": 0
  },
  {
    "id": 255,
    "name_en": "Red Cherry Tomato",
    "name_ar": "طماطم كرزية حمراء",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "25",
    "stock": 0
  },
  {
    "id": 256,
    "name_en": "Yellow Cherry Tomato",
    "name_ar": "طماطم كرزية صفراء",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "35",
    "stock": 0
  },
  {
    "id": 257,
    "name_en": "Heirloom Tomato",
    "name_ar": "طماطم تراثية (هيرلوم)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "37",
    "stock": 0
  },
  {
    "id": 258,
    "name_en": "Marmande Tomato",
    "name_ar": "طماطم مارماند",
    "category": "fruits",
    "price": 0,
    "unit": "1000G",
    "image": "40",
    "stock": 0
  },
  {
    "id": 259,
    "name_en": "Roma Plum Tomato",
    "name_ar": "طماطم روما (برقوقية)",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "20",
    "stock": 0
  },
  {
    "id": 260,
    "name_en": "Whole Fresh Turmeric",
    "name_ar": "كركم طازج كامل",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "23",
    "stock": 0
  },
  {
    "id": 261,
    "name_en": "Baby Turnip Mini",
    "name_ar": "لفت صغير مصغر",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "122",
    "stock": 0
  },
  {
    "id": 262,
    "name_en": "Fresh Zaatar",
    "name_ar": "زعتر طازج مستورد",
    "category": "vegetables",
    "price": 0,
    "unit": "-",
    "image": "58",
    "stock": 0
  },
  {
    "id": 263,
    "name_en": "Baby Zucchini With Flower",
    "name_ar": "كوسا خضراء صغيرة بالزهرة",
    "category": "vegetables",
    "price": 0,
    "unit": "1000G",
    "image": "27",
    "stock": 0
  },
  {
    "id": 264,
    "name_en": "Dates Sukari Muftal",
    "name_ar": "تمر سكري مفتل",
    "category": "vegetables",
    "price": 0,
    "unit": "3Kg",
    "image": "-",
    "stock": 0
  },
  {
    "id": 265,
    "name_en": "Dates Majdoul Qassim",
    "name_ar": "تمر مجدول القصيم",
    "category": "vegetables",
    "price": 0,
    "unit": "-",
    "image": "-",
    "stock": 0
  },
  {
    "id": 266,
    "name_en": "Dates Suqai Qassim",
    "name_ar": "تمر صقعي القصيم",
    "category": "vegetables",
    "price": 0,
    "unit": "-",
    "image": "-",
    "stock": 0
  },
  {
    "id": 267,
    "name_en": "Dates Mabr oom Madinah",
    "name_ar": "تمر مبروم المدينة",
    "category": "vegetables",
    "price": 0,
    "unit": "-",
    "image": "-",
    "stock": 0
  },
  {
    "id": 268,
    "name_en": "Dates Safawi Madinah",
    "name_ar": "تمر صفاوي المدينة",
    "category": "vegetables",
    "price": 0,
    "unit": "-",
    "image": "-",
    "stock": 0
  },
  {
    "id": 269,
    "name_en": "Dates Anbar Madinah",
    "name_ar": "تمر عنبر المدينة",
    "category": "fruits",
    "price": 0,
    "unit": "-",
    "image": "-",
    "stock": 0
  },
  {
    "id": 270,
    "name_en": "Dates Ajwa Madinah Royal",
    "name_ar": "تمر عجوة المدينة ملكي",
    "category": "vegetables",
    "price": 0,
    "unit": "-",
    "image": "-",
    "stock": 0
  },
  {
    "id": 271,
    "name_en": "Dates Rotab Sukari Qassim",
    "name_ar": "تمر رطب سكري القصيم",
    "category": "vegetables",
    "price": 0,
    "unit": "-",
    "image": "-",
    "stock": 0
  }
];

// تصنيفات المنتجات
export const CATEGORIES = {
  fruits: 'الفواكه',
  vegetables: 'الخضروات',
  herbs: 'الأعشاب والنباتات',
  eggs: 'البيض',
  other: 'أخرى'
};

export default PRODUCTS;
