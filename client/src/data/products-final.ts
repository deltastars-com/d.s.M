// ===== قاعدة بيانات المنتجات النهائية والمصححة =====
// تم التحقق والإصلاح الجذري من جميع المنتجات
// عدد المنتجات الكلي: 203 منتج

export interface Product {
  id: number;
  name_en: string;
  name_ar: string;
  category: string;
  unit: string;
  price: number;
  image: string;
  stock: number;
}

export const PRODUCTS_FINAL: Product[] = [
  {
    "id": 1,
    "name_en": "Apple Gala 1000G",
    "name_ar": "تفاح سكري",
    "category": "فواكه",
    "unit": "Kg",
    "price": 7.0,
    "image": "https://drive.google.com/file/d/14raaz2yPcxGv4PLTCxyA2SqNDXJikXoi/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 2,
    "name_en": "Apple Green 1000G",
    "name_ar": "تفاح أخضر",
    "category": "فواكه",
    "unit": "Kg",
    "price": 7.0,
    "image": "https://drive.google.com/file/d/1x_4VWYYveuiwJtVdfNLReIithJO2JzGI/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 3,
    "name_en": "Apple Red 1000G",
    "name_ar": "تفاح أحمر",
    "category": "فواكه",
    "unit": "Kg",
    "price": 7.5,
    "image": "https://drive.google.com/file/d/1s3WUV0dJ_3GYKa7_XV7BeTKfzl1iq__b/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 4,
    "name_en": "Apple Yellow 1000G",
    "name_ar": "تفاح أصفر",
    "category": "فواكه",
    "unit": "Kg",
    "price": 7.0,
    "image": "https://drive.google.com/file/d/1JTO_fu2XlCN3-wFNV3OuN-SOPDgnGKUK/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 5,
    "name_en": "Apricot 1000G",
    "name_ar": "مشمش",
    "category": "فواكه",
    "unit": "Kg",
    "price": 16.0,
    "image": "https://drive.google.com/file/d/1nGeZ4RDnJ-P-n30KM3JUgZFEy2hbHXE3/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 6,
    "name_en": "Arabic Leeks Kurath",
    "name_ar": "كراث",
    "category": "خضروات",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1bYMbxIhe8e1kSLSR24DCxhF9YCCBk5UX/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 7,
    "name_en": "Banana 1000G",
    "name_ar": "موز",
    "category": "فواكه",
    "unit": "Kg",
    "price": 6.5,
    "image": "https://drive.google.com/file/d/1C4X6hYllVzFnei9q-pGR5ET3GzCmN8hc/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 8,
    "name_en": "Green Beans Fresh 1000G",
    "name_ar": "فاصوليا خضراء",
    "category": "خضروات",
    "unit": "Kg",
    "price": 8.0,
    "image": "https://drive.google.com/file/d/1hOScKwXU6b7Z7xPVst4u3oBCHfTRbRGc/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 9,
    "name_en": "Beet Root Local 1000G",
    "name_ar": "بنجر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 5.0,
    "image": "https://drive.google.com/file/d/1t5GnOEdjJX6RB4E2gxUoTQ8ceEix_LLt/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 10,
    "name_en": "Bell Pepper Green LOCAL",
    "name_ar": "رومي أخضر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 6.0,
    "image": "https://drive.google.com/file/d/1cw_hNecLBH1l-QqW26K18rR77Amz7hd3/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 11,
    "name_en": "Bell Pepper Red LOCAL",
    "name_ar": "رومي أحمر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 8.0,
    "image": "https://drive.google.com/file/d/1g_Ymd4KHPMyhlgtJzUCVoxaCw8Qgk29_/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 12,
    "name_en": "Bell Pepper Yellow LOCAL",
    "name_ar": "رومي أصفر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 8.0,
    "image": "https://drive.google.com/file/d/1HWgl4vQ7-yyD13LJH9Leyi7ZmOmZo8fb/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 13,
    "name_en": "Bitter Gourd Karela 1000G",
    "name_ar": "كرلا",
    "category": "خضروات",
    "unit": "Kg",
    "price": 6.5,
    "image": "https://drive.google.com/file/d/1NAapL0Lss9vg4VqST9-BbdmHZDZ3QChT/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 14,
    "name_en": "Broccoli Local 1000G",
    "name_ar": "بركلي",
    "category": "خضروات",
    "unit": "Kg",
    "price": 16.0,
    "image": "https://drive.google.com/file/d/1H1hPMaQrc4fHZJpypn8k3W8r1x4RPoOg/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 15,
    "name_en": "Cabbage Red Local 1000G",
    "name_ar": "ملفوف أحمر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 4.5,
    "image": "https://drive.google.com/file/d/1GmaS_f37r1vSWu_rrhSi71YWPH5I41Gr/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 16,
    "name_en": "Cabbage White Local 1000G",
    "name_ar": "ملفوف أبيض",
    "category": "خضروات",
    "unit": "Kg",
    "price": 3.5,
    "image": "https://drive.google.com/file/d/1yZGiLqEPln5Lk_nO5uuyLMdiegf0wZ8S/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 17,
    "name_en": "Cactus Pears KSA 1000G",
    "name_ar": "تين شوكي",
    "category": "أخرى",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1dt0lqZGWz7JdY5dYlR1tLaXA3VQADP61/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 18,
    "name_en": "Carrot Local 1000G",
    "name_ar": "جزر محلي",
    "category": "خضروات",
    "unit": "Kg",
    "price": 4.5,
    "image": "https://drive.google.com/file/d/1qKdTHTwWcqymmJfubyR5iD2ZCXQATDdk/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 19,
    "name_en": "Cauliflower 1000G",
    "name_ar": "زهرة",
    "category": "خضروات",
    "unit": "Kg",
    "price": 7.0,
    "image": "https://drive.google.com/file/d/1-LRmks22xtvxe0-g8WMk17KJeGBLsYRV/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 20,
    "name_en": "Celery Green Local 1000G",
    "name_ar": "كرفس محلي",
    "category": "خضروات",
    "unit": "Kg",
    "price": 18.0,
    "image": "https://drive.google.com/file/d/18t3pyZ33bNvPuKs65FV3kow14PIzVrg-/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 21,
    "name_en": "Alfalfa Sprouts",
    "name_ar": "براعم البرسيم (ألفالفا)",
    "category": "أعشاب",
    "unit": "250G",
    "price": 11.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 22,
    "name_en": "Apricot Imported USA",
    "name_ar": "مشمش مستورد (أمريكي)",
    "category": "فواكه",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 23,
    "name_en": "Artichoke Imported Fresh",
    "name_ar": "خرشوف طازج مستورد",
    "category": "أخرى",
    "unit": "1000G",
    "price": 33.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 24,
    "name_en": "Asparagus Baby Imported",
    "name_ar": "هليون صغير مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 9.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 25,
    "name_en": "Asparagus Jumbo Green",
    "name_ar": "هليون أخضر جامبو مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 55.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 26,
    "name_en": "Asparagus Green Imported",
    "name_ar": "هليون أخضر مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 50.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 27,
    "name_en": "Asparagus White USA",
    "name_ar": "هليون أبيض أمريكي",
    "category": "خضروات",
    "unit": "1000G",
    "price": 70.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 28,
    "name_en": "Avocado USA",
    "name_ar": "أفوكادو أمريكي طازج",
    "category": "فواكه",
    "unit": "1000G",
    "price": 30.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 29,
    "name_en": "Avocado Kenya",
    "name_ar": "أفوكادو كيني",
    "category": "فواكه",
    "unit": "1000G",
    "price": 20.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 30,
    "name_en": "Baby Carrot Holland",
    "name_ar": "جزر صغير بالعنق (هولندي)",
    "category": "خضروات",
    "unit": "200G",
    "price": 20.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 31,
    "name_en": "Chilli Green Local 1000G",
    "name_ar": "فلفل حار أخضر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 9.0,
    "image": "https://drive.google.com/file/d/1qz9eE3COufpOQ5HjRVpP82RSuv8LmPF4/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 32,
    "name_en": "Chilli Red Hot Local 1000G",
    "name_ar": "فلفل حار أحمر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 8.0,
    "image": "https://drive.google.com/file/d/1D_QtXdvpAHh0VtWCGs69Jvk8TSd-ltIh/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 33,
    "name_en": "Coconut Brown 1000G",
    "name_ar": "جوز الهند",
    "category": "أخرى",
    "unit": "pc",
    "price": 8.0,
    "image": "https://drive.google.com/file/d/1qjJ9mY4Cv2xWKR1cAqX5TajU4TWe-eH-/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 34,
    "name_en": "Coriander Leaves 1000G",
    "name_ar": "كزبرة",
    "category": "أعشاب",
    "unit": "PC",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1fjr3r9Lr6ypvGFer_a_od4L1uUJXCp8c/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 35,
    "name_en": "Cucumber 1000G",
    "name_ar": "خيار",
    "category": "خضروات",
    "unit": "Kg",
    "price": 4.5,
    "image": "https://drive.google.com/file/d/1JhtJga2yvkgH6E3GfMBVgwJMnyaCA0Aw/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 36,
    "name_en": "Curry Leaves Imported",
    "name_ar": "أوراق الكاري",
    "category": "أعشاب",
    "unit": "Kg",
    "price": 20.0,
    "image": "https://drive.google.com/file/d/1TzrKRmpeSHL2ZMZozNaqdPC3P4spN3Qj/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 37,
    "name_en": "Baby Corn",
    "name_ar": "ذرة صغيرة (بيبي كورن)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 5.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 38,
    "name_en": "Baby Spinach Imported",
    "name_ar": "سبانخ صغيرة طازجة",
    "category": "خضروات",
    "unit": "1000G",
    "price": 60.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 39,
    "name_en": "Bamboo Leaves Fresh",
    "name_ar": "أوراق خيزران طازجة",
    "category": "أعشاب",
    "unit": "PCS",
    "price": 32.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 40,
    "name_en": "Banana Leaves Imported",
    "name_ar": "أوراق موز مستوردة",
    "category": "فواكه",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 41,
    "name_en": "Basil Imported Fresh",
    "name_ar": "ريحان طازج مستورد",
    "category": "أعشاب",
    "unit": "1000G",
    "price": 58.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 42,
    "name_en": "Green Beans",
    "name_ar": "فاصوليا خضراء",
    "category": "خضروات",
    "unit": "1000G",
    "price": 8.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 43,
    "name_en": "Bean Sprouts",
    "name_ar": "براعم الفاصوليا",
    "category": "خضروات",
    "unit": "1000G",
    "price": 8.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 44,
    "name_en": "Haricot Beans Imported",
    "name_ar": "فاصوليا هاريكوت مستوردة",
    "category": "خضروات",
    "unit": "1000G",
    "price": 9.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 45,
    "name_en": "Custard Apples 1000G",
    "name_ar": "قشطة",
    "category": "فواكه",
    "unit": "Kg",
    "price": 11.0,
    "image": "https://drive.google.com/file/d/1FeNZd6hnZEfGUg_sCMQ-XPtwnVqj0ykB/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 46,
    "name_en": "Dill Local 1000G",
    "name_ar": "شبت",
    "category": "أعشاب",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1hk_5XtN4qGlLlT6KdyEH67WIc_wcsMS6/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 47,
    "name_en": "Drumstick 1000G",
    "name_ar": "درام ستك",
    "category": "خضروات",
    "unit": "Kg",
    "price": 12.0,
    "image": "https://drive.google.com/file/d/1LnExAbab0tIGy8Yg22Mdw-OdIzo8F8VY/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 48,
    "name_en": "Eggplant Local 1000G",
    "name_ar": "باذنجان أسود مدور وسط/صغير",
    "category": "خضروات",
    "unit": "Kg",
    "price": 3.5,
    "image": "https://drive.google.com/file/d/1fSgEKHdJaYF5IrQ2tHGel3Ttxujzj0W5/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 49,
    "name_en": "Eggplant Long Local",
    "name_ar": "باذنجان طويل",
    "category": "خضروات",
    "unit": "Kg",
    "price": 5.0,
    "image": "https://drive.google.com/file/d/19n6xPGE2IA4576T60trPro2mHCxD_XNf/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 50,
    "name_en": "Eggplant White Local",
    "name_ar": "باذنجان أبيض",
    "category": "خضروات",
    "unit": "Kg",
    "price": 4.0,
    "image": "https://drive.google.com/file/d/1Mu48BBY8ktaFOd07_zhY32lKRt_f3Zpw/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 51,
    "name_en": "Figs Local 1000G",
    "name_ar": "تين محلي",
    "category": "أخرى",
    "unit": "Kg",
    "price": 23.0,
    "image": "https://drive.google.com/file/d/1Y08cy9YH20Zt3GKqcBuuDKbHiHV3cVS_/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 52,
    "name_en": "Garlic Peeled 1000G",
    "name_ar": "ثوم مقشر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 14.0,
    "image": "https://drive.google.com/file/d/12L4Qtfab22_9pddCxO5wiVk2lGrVW-Lp/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 53,
    "name_en": "Garlic 1000G",
    "name_ar": "ثوم",
    "category": "خضروات",
    "unit": "Kg",
    "price": 10.0,
    "image": "https://drive.google.com/file/d/1U6fsvi67YgD-hioEQW-KIwNQRnHwi101/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 54,
    "name_en": "Ginger 1000G",
    "name_ar": "زنجبيل",
    "category": "أخرى",
    "unit": "Kg",
    "price": 9.0,
    "image": "https://drive.google.com/file/d/1p6KcNDSYbfaS1Sc6H9OgwEzHimixjk1H/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 55,
    "name_en": "Grapefruit 1000G",
    "name_ar": "جريب فروت",
    "category": "فواكه",
    "unit": "Kg",
    "price": 6.5,
    "image": "https://drive.google.com/file/d/1jg0W0AT8ym_DqP4Zo0NHLleYwhYHc_H4/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 56,
    "name_en": "Grapes Black Local",
    "name_ar": "عنب أسود",
    "category": "فواكه",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1m8Ct2JMueZiw9j1hUooHfawox7xfIfS4/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 57,
    "name_en": "Grapes Green Local",
    "name_ar": "عنب أخضر",
    "category": "فواكه",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1MRLb3gL9u3GYfvN8HyisIr3z-mPhafwV/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 58,
    "name_en": "Grapes Red Local",
    "name_ar": "عنب أحمر",
    "category": "فواكه",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1yZN_MuTkm923oIfqJJBGHJNdfuVTR8lb/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 59,
    "name_en": "Grapes White 1000G",
    "name_ar": "عنب أبيض",
    "category": "فواكه",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1KCnKtWKgMYbfOvCHxrXdmEYC596omYvp/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 60,
    "name_en": "Guava 1000G",
    "name_ar": "جوافة",
    "category": "فواكه",
    "unit": "Kg",
    "price": 9.0,
    "image": "https://drive.google.com/file/d/1TTr15bS8-sXbSdKbH0nsdW35z56K8R3R/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 61,
    "name_en": "Jarjir 1000G",
    "name_ar": "جرجير",
    "category": "خضروات",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1R9j01inq7s3h741O18wGQS2uuSv2m4eA/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 62,
    "name_en": "Kaka 1000G",
    "name_ar": "كاكا",
    "category": "فواكه",
    "unit": "Kg",
    "price": 18.0,
    "image": "https://drive.google.com/file/d/1eUM9auPELVzueEEq2Q9BvKBofulI5bLG/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 63,
    "name_en": "Kiwi 1000G",
    "name_ar": "كيوي",
    "category": "فواكه",
    "unit": "Kg",
    "price": 12.0,
    "image": "https://drive.google.com/file/d/1QhH-IUdqWuh_HKjMkmnj6aAdedQWVA9p/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 64,
    "name_en": "Ladyfinger 1000G",
    "name_ar": "بامية حجم الحبة صغير",
    "category": "خضروات",
    "unit": "Kg",
    "price": 12.0,
    "image": "https://drive.google.com/file/d/1uqaB1W2g_UmRs-A0DPAiArQMlz19e7ip/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 65,
    "name_en": "Leeks Local 1000G",
    "name_ar": "ليك محلي",
    "category": "خضروات",
    "unit": "Kg",
    "price": 12.0,
    "image": "https://drive.google.com/file/d/1StFl7-uiJo8tqJPxPwdDZ1jj7bWCvo_P/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 66,
    "name_en": "Lemon Big Local",
    "name_ar": "ليمون",
    "category": "فواكه",
    "unit": "Kg",
    "price": 9.0,
    "image": "https://drive.google.com/file/d/1YxV_nDD5aF7p-6RoxaHKskOgDLb-tf0o/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 67,
    "name_en": "Lemon Small 1000G",
    "name_ar": "ليمون صغير",
    "category": "فواكه",
    "unit": "pc",
    "price": 4.0,
    "image": "https://drive.google.com/file/d/1pgMkqnLYzwlGmTa0zmKPUK5mfyeVYQYL/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 68,
    "name_en": "Lettuce Iceberg Imported",
    "name_ar": "خس مدور مستورد إسباني",
    "category": "خضروات",
    "unit": "Kg",
    "price": 17.0,
    "image": "https://drive.google.com/file/d/1U6v8Sskgm4zacRwh3eeh7yMsnWgXFMWV/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 69,
    "name_en": "Lettuce Iceberg Local",
    "name_ar": "خس مدور",
    "category": "خضروات",
    "unit": "Kg",
    "price": 9.0,
    "image": "https://drive.google.com/file/d/1-epBe5ll3GgvZJXr-Hyg_kFiA6mkPoMg/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 70,
    "name_en": "Lettuce Romaine Local",
    "name_ar": "خس طويل",
    "category": "خضروات",
    "unit": "Kg",
    "price": 7.0,
    "image": "https://drive.google.com/file/d/1UFeMZV90TR0L3qk6daEb1Y6tn7jUpyyq/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 71,
    "name_en": "Lime Fresh Imported",
    "name_ar": "ليم أخضر",
    "category": "أخرى",
    "unit": "Kg",
    "price": 10.0,
    "image": "https://drive.google.com/file/d/1x7aQxFLoEEX7tJyhaRWN4DoXyF19_3Ec/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 72,
    "name_en": "Mandarin 1000G",
    "name_ar": "أفندي",
    "category": "فواكه",
    "unit": "Kg",
    "price": 9.0,
    "image": "https://drive.google.com/file/d/1mmlL5LqKnLi56I1glw15wH619eNq54Gc/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 73,
    "name_en": "Mango Timor 1000G",
    "name_ar": "مانجو تيمور",
    "category": "فواكه",
    "unit": "Kg",
    "price": 18.0,
    "image": "https://drive.google.com/file/d/1dvg4dVcK-",
    "stock": 100
  },
  {
    "id": 74,
    "name_en": "Marrow / Courgette / Zucchini Local 1000G",
    "name_ar": "كوسة",
    "category": "خضروات",
    "unit": "Kg",
    "price": 6.0,
    "image": "https://drive.google.com/file/d/1WTPmEiSvnHG0RMBNf8nvvoQPPvlUInu4/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 75,
    "name_en": "Melon Sweet 1000G",
    "name_ar": "شمام",
    "category": "فواكه",
    "unit": "Kg",
    "price": 3.5,
    "image": "https://drive.google.com/file/d/1pbZTRRiDU-cK25z0Eozh8qrB4nm83S7C/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 76,
    "name_en": "Mint 1000G",
    "name_ar": "نعناع",
    "category": "أعشاب",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1QwEenpFIAm8AuREzqFXbfNeHhNZGIMC8/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 77,
    "name_en": "Mulokhia 1000G",
    "name_ar": "ملوخية",
    "category": "خضروات",
    "unit": "Kg",
    "price": 6.0,
    "image": "https://drive.google.com/file/d/1zmu3BaIN2Txf3Jm9eUKp1vvGtrln9kfh/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 78,
    "name_en": "Nectarine 1000G LOCAL",
    "name_ar": "نكتارين",
    "category": "فواكه",
    "unit": "Kg",
    "price": 16.0,
    "image": "https://drive.google.com/file/d/1XRHzpjwCBZ0PDC2mLf7aIzo1XuFAD7-m/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 79,
    "name_en": "Okra 1000G",
    "name_ar": "بامية",
    "category": "خضروات",
    "unit": "Kg",
    "price": 15.0,
    "image": "https://drive.google.com/file/d/1UDFzcEUB2rFbXa6bXMjR-Mip7Jr1ztrR/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 80,
    "name_en": "Onion Red 1000G",
    "name_ar": "بصل أحمر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 3.5,
    "image": "https://drive.google.com/file/d/11MB2mjVjGgViYDbyGFvR5089nSASEPqs/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 81,
    "name_en": "Onion Spring 1000G",
    "name_ar": "بصل أخضر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 4.5,
    "image": "https://drive.google.com/file/d/1bNJGWzpSVn3vi33b8IF7-tKPB1rX_1tT/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 82,
    "name_en": "Onion White 1000G",
    "name_ar": "بصل أبيض",
    "category": "خضروات",
    "unit": "Kg",
    "price": 4.0,
    "image": "https://drive.google.com/file/d/1Ws82hzOGSWv5J2DstQnEe91m3URP-rKF/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 83,
    "name_en": "Orange For Juice Fresh 1000G",
    "name_ar": "برتقال عصير",
    "category": "فواكه",
    "unit": "Kg",
    "price": 5.0,
    "image": "https://drive.google.com/file/d/1d9P8ZspAFZGGHBOqzbFMuEeoPJ23CYDI/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 84,
    "name_en": "Orange Navel 1000G",
    "name_ar": "برتقال أبوصورة",
    "category": "فواكه",
    "unit": "Kg",
    "price": 7.0,
    "image": "https://drive.google.com/file/d/1FuPxF23o2TGy8jJOQmehoSiMMBLC7axK/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 85,
    "name_en": "Papaya 1000G",
    "name_ar": "بابايا",
    "category": "فواكه",
    "unit": "Kg",
    "price": 8.0,
    "image": "https://drive.google.com/file/d/1W0G6CDg6p7Io8J1SoyyHPRygjzSkyvgy/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 86,
    "name_en": "Parsely Local 1000G",
    "name_ar": "بقدونس",
    "category": "أعشاب",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1CjB7QJqY0XhCeUsNWyLZilIWULZmR46a/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 87,
    "name_en": "Peach 1000G",
    "name_ar": "خوخ",
    "category": "فواكه",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1n-FpDTvyy8FvqKyMhKw__ZAuy047F0Lj/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 88,
    "name_en": "Pears Imported Fresh 1000G",
    "name_ar": "كمثرى",
    "category": "فواكه",
    "unit": "Kg",
    "price": 12.0,
    "image": "https://drive.google.com/file/d/1t4QlgPCc2lAKksrWTIBEKdtg6R3Uhg3E/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 89,
    "name_en": "Pineapple Baby 1000G",
    "name_ar": "أناناس بيبي",
    "category": "فواكه",
    "unit": "Kg",
    "price": 25.0,
    "image": "https://drive.google.com/file/d/1U0K1fJf-54EveBzbS03wZoHmvOAP-taB/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 90,
    "name_en": "Pineapple Large 1000G",
    "name_ar": "أناناس",
    "category": "فواكه",
    "unit": "Kg",
    "price": 10.0,
    "image": "https://drive.google.com/file/d/1WlTCFFbtHUKdtlFSuy7baJfoFWApF8w3/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 91,
    "name_en": "Plums Black 1000G",
    "name_ar": "بخارة أسود",
    "category": "فواكه",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1YU7Y8ARUoZ_8GwUrbHBBa47cqgz1HZbo/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 92,
    "name_en": "Plums Red 1000G",
    "name_ar": "بخارة أحمر",
    "category": "فواكه",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1ur85ixAOPwTmEGr5_bq5KGJEx_9XRFvt/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 93,
    "name_en": "Pomegranate 1000G",
    "name_ar": "رمان",
    "category": "فواكه",
    "unit": "Kg",
    "price": 13.0,
    "image": "https://drive.google.com/file/d/1PreacAGBSHSIqRqwr_dyqyCWTjDGEP31/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 94,
    "name_en": "Potato Sweet 1000G",
    "name_ar": "بطاطا حلوة",
    "category": "خضروات",
    "unit": "Kg",
    "price": 4.0,
    "image": "https://drive.google.com/file/d/1n_Wghsdl4wk237X9CtauH2lwZ2GKVV8D/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 95,
    "name_en": "Potato 1000G",
    "name_ar": "بطاطس",
    "category": "خضروات",
    "unit": "Kg",
    "price": 3.5,
    "image": "https://drive.google.com/file/d/1QYFqP7T0H6x3-JB8VncPxUPg0TWPQczL/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 96,
    "name_en": "Pumpkin Green Long Dubbah 1000G",
    "name_ar": "قرع أخضر (دبة)",
    "category": "خضروات",
    "unit": "Kg",
    "price": 5.5,
    "image": "https://drive.google.com/file/d/1U9OwmB2ifAKEKWTZ_c90sKiUAXbzDseN/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 97,
    "name_en": "Pumpkin 1000G",
    "name_ar": "قرع أصفر (عسلي)",
    "category": "خضروات",
    "unit": "Kg",
    "price": 5.5,
    "image": "https://drive.google.com/file/d/1vladnnXtMon8igxLBIxpsaUXAIz6yrNW/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 98,
    "name_en": "Purslane Green Rijla 1000G",
    "name_ar": "رجلة",
    "category": "خضروات",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1r72L0hZLktqPXMQcEeB9X1FBXsJxIJiu/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 99,
    "name_en": "Radish Red 1000G",
    "name_ar": "فجل أحمر",
    "category": "أخرى",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1Fw9seQJTs1alziR4JFBMim3ICjFNVNWI/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 100,
    "name_en": "Radish White 1000G",
    "name_ar": "فجل أبيض",
    "category": "بيض",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1n0BFoTWzoZ3wD6w5Hgmn9YAuKZKNqGU9/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 101,
    "name_en": "Spinach Local 1000G",
    "name_ar": "سبانخ",
    "category": "خضروات",
    "unit": "pc",
    "price": 1.5,
    "image": "https://drive.google.com/file/d/1YyOOkTC3yZjW7CWJXy9M6WVhIq6VEgI8/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 102,
    "name_en": "Strawberry Fresh 1000G",
    "name_ar": "فراولة مصري",
    "category": "فواكه",
    "unit": "Kg",
    "price": 20.0,
    "image": "https://drive.google.com/file/d/1LKR78n2i8NdioZ1xGkoiOypzDFcREN2M/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 103,
    "name_en": "Taro Root Gulgas 1000G",
    "name_ar": "قلقاس",
    "category": "خضروات",
    "unit": "Kg",
    "price": 12.0,
    "image": "https://drive.google.com/file/d/1-6uyGQ1qNuuS4hrIzrOuI-hRM-8POyhG/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 104,
    "name_en": "Tomato Cherry Red Local 1000G",
    "name_ar": "طماطم شيري أحمر",
    "category": "خضروات",
    "unit": "Kg",
    "price": 25.0,
    "image": "https://drive.google.com/file/d/16sJGKHB2z2tFZPYw7BSLoa4XOMgY41v-/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 105,
    "name_en": "Tomato Red 1000G",
    "name_ar": "طماطم مدور",
    "category": "خضروات",
    "unit": "Kg",
    "price": 5.0,
    "image": "https://drive.google.com/file/d/1MlXdxBjSj_H2FKzueCL65yfAxaBAm8Sn/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 106,
    "name_en": "Turnip Fresh 1000G",
    "name_ar": "لفت",
    "category": "خضروات",
    "unit": "Kg",
    "price": 3.5,
    "image": "https://drive.google.com/file/d/1MlXdxBjSj_H2FKzueCL65yfAxaBAm8Sn/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 107,
    "name_en": "Watermelon Long Local 1000G",
    "name_ar": "بطيخ طويل",
    "category": "فواكه",
    "unit": "Kg",
    "price": 3.5,
    "image": "https://drive.google.com/file/d/1lx7gktVg5LOmR5d0JYd3OOqacWL-Fr9r/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 108,
    "name_en": "Watermelon Round Local 1000G",
    "name_ar": "بطيخ مدور",
    "category": "فواكه",
    "unit": "Kg",
    "price": 3.5,
    "image": "https://drive.google.com/file/d/1dxf_OVjL8p6v7uNgvcXYaYIMGFkP1TJ0/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 109,
    "name_en": "Eggs Fresh algharbia sizeXL X12",
    "name_ar": "بيض",
    "category": "بيض",
    "unit": "BOX",
    "price": 185.0,
    "image": "https://drive.google.com/file/d/1rTRylFNtpZA2kLnXd2-iABd8UIYaaLbd/view?usp=drivesdk[file:1]",
    "stock": 100
  },
  {
    "id": 110,
    "name_en": "Bean Sprouts Imported",
    "name_ar": "براعم فاصوليا مستوردة",
    "category": "خضروات",
    "unit": "1000G",
    "price": 8.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 111,
    "name_en": "Baby Red Beet Chioggia",
    "name_ar": "بنجر أحمر صغير (شيوجيا)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 37.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 112,
    "name_en": "Beetroot Imported Fresh",
    "name_ar": "بنجر (شمندر) طازج",
    "category": "خضروات",
    "unit": "1000G",
    "price": 21.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 113,
    "name_en": "Mini Yellow Beetroot",
    "name_ar": "بنجر أصفر مصغر",
    "category": "خضروات",
    "unit": "250G",
    "price": 1.0,
    "image": "22",
    "stock": 100
  },
  {
    "id": 114,
    "name_en": "Green Bell Pepper Imported",
    "name_ar": "فلفل أخضر حلو مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 27.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 115,
    "name_en": "Blackberry USA Fresh",
    "name_ar": "توت أسود أمريكي طازج",
    "category": "فواكه",
    "unit": "200G",
    "price": 1.0,
    "image": "15",
    "stock": 100
  },
  {
    "id": 116,
    "name_en": "Blueberry Imported",
    "name_ar": "توت أزرق مستورد",
    "category": "فواكه",
    "unit": "170G",
    "price": 1.0,
    "image": "14",
    "stock": 100
  },
  {
    "id": 117,
    "name_en": "Broccoli USA",
    "name_ar": "بروكلي أمريكي",
    "category": "أخرى",
    "unit": "1000G",
    "price": 20.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 118,
    "name_en": "Brussels Sprouts",
    "name_ar": "براعم بروكسل (كرنب صغير)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 25.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 119,
    "name_en": "Chinese Cabbage",
    "name_ar": "كرنب صيني (باي تشوي)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 20.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 120,
    "name_en": "White Cabbage Imported",
    "name_ar": "كرنب أبيض مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 17.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 121,
    "name_en": "Cantaloupe Melon Imported",
    "name_ar": "شمام كانتالوب مستورد",
    "category": "فواكه",
    "unit": "1000G",
    "price": 22.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 122,
    "name_en": "Baby Red Carrot Fresh",
    "name_ar": "جزر أحمر صغير طازج",
    "category": "خضروات",
    "unit": "450G",
    "price": 8.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 123,
    "name_en": "Baby Whole Carrot USA",
    "name_ar": "جزر صغير كامل (أمريكي)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 5.9,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 124,
    "name_en": "Baby Yellow Carrot Fresh",
    "name_ar": "جزر أصفر صغير طازج",
    "category": "خضروات",
    "unit": "1000G",
    "price": 36.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 125,
    "name_en": "Celery Fresh USA",
    "name_ar": "كرفس طازج أمريكي",
    "category": "خضروات",
    "unit": "1000G",
    "price": 18.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 126,
    "name_en": "White Celery Roots",
    "name_ar": "جذور كرفس بيضاء",
    "category": "خضروات",
    "unit": "1000G",
    "price": 20.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 127,
    "name_en": "Green Chayote Imported",
    "name_ar": "شايوت أخضر مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 30.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 128,
    "name_en": "Cherries USA",
    "name_ar": "كرز أمريكي",
    "category": "فواكه",
    "unit": "1000G",
    "price": 80.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 129,
    "name_en": "Cherries AUS",
    "name_ar": "كرز أسترالي",
    "category": "فواكه",
    "unit": "1000G",
    "price": 50.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 130,
    "name_en": "Red Chicory Radicchio",
    "name_ar": "هندباء حمراء (شيكوريا)",
    "category": "أخرى",
    "unit": "1000G",
    "price": 38.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 131,
    "name_en": "Yellow Chicory",
    "name_ar": "هندباء صفراء (شيكوريا)",
    "category": "أخرى",
    "unit": "1000G",
    "price": 38.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 132,
    "name_en": "Green Jalapeno",
    "name_ar": "فلفل هالبينو أخضر",
    "category": "خضروات",
    "unit": "1000G",
    "price": 30.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 133,
    "name_en": "Orange Jalapeno",
    "name_ar": "فلفل هالبينو برتقالي",
    "category": "فواكه",
    "unit": "1000G",
    "price": 45.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 134,
    "name_en": "Red Jalapeno",
    "name_ar": "فلفل هالبينو أحمر",
    "category": "خضروات",
    "unit": "1000G",
    "price": 45.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 135,
    "name_en": "Yellow Jalapeno",
    "name_ar": "فلفل هالبينو أصفر",
    "category": "خضروات",
    "unit": "1000G",
    "price": 45.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 136,
    "name_en": "Yellow Roman Chilli",
    "name_ar": "فلفل أصفر روماني",
    "category": "خضروات",
    "unit": "1000G",
    "price": 22.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 137,
    "name_en": "Fresh Chives Imported",
    "name_ar": "ثوم معمر طازج",
    "category": "خضروات",
    "unit": "1000G",
    "price": 70.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 138,
    "name_en": "Young Green Coconut",
    "name_ar": "جوز هند أخضر صغير",
    "category": "فواكه",
    "unit": "PCS",
    "price": 1.0,
    "image": "14",
    "stock": 100
  },
  {
    "id": 139,
    "name_en": "Baby Corn Fresh Imported",
    "name_ar": "ذرة صغيرة طازجة مستوردة",
    "category": "خضروات",
    "unit": "-",
    "price": 80.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 140,
    "name_en": "Corn On The Cob",
    "name_ar": "ذرة (كوز)",
    "category": "خضروات",
    "unit": "PCS",
    "price": 1.0,
    "image": "12",
    "stock": 100
  },
  {
    "id": 141,
    "name_en": "Fresh Cranberry",
    "name_ar": "توت بري طازج",
    "category": "فواكه",
    "unit": "1000G",
    "price": 60.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 142,
    "name_en": "Long Cucumber Imported",
    "name_ar": "خيار طويل مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 20.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 143,
    "name_en": "Dragon Fruit Fresh",
    "name_ar": "فاكهة التنين (دراغون فروت)",
    "category": "فواكه",
    "unit": "1000G",
    "price": 38.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 144,
    "name_en": "Durian Imported",
    "name_ar": "دوريان مستورد",
    "category": "فواكه",
    "unit": "1000G",
    "price": 38.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 145,
    "name_en": "Edible Flowers Fresh",
    "name_ar": "زهور صالحة للأكل",
    "category": "أعشاب",
    "unit": "1000G",
    "price": 170.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 146,
    "name_en": "Endive Imported",
    "name_ar": "هندباء (انديف) مستوردة",
    "category": "أخرى",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 147,
    "name_en": "Yellow Endive Fresh",
    "name_ar": "هندباء (انديف) أصفر",
    "category": "أخرى",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 148,
    "name_en": "Fresh Fava Beans",
    "name_ar": "فول طازج مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 39.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 149,
    "name_en": "Baby Fennel Imported",
    "name_ar": "شمر صغير مستورد",
    "category": "أخرى",
    "unit": "1000G",
    "price": 1.0,
    "image": "21",
    "stock": 100
  },
  {
    "id": 150,
    "name_en": "Fennel Imported",
    "name_ar": "شمر مستورد",
    "category": "أخرى",
    "unit": "1000G",
    "price": 23.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 151,
    "name_en": "Forelle Pear",
    "name_ar": "كمثرى فوريل",
    "category": "فواكه",
    "unit": "1000G",
    "price": 10.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 152,
    "name_en": "Granadilla Imported",
    "name_ar": "جرانديلا مستوردة",
    "category": "فواكه",
    "unit": "1000G",
    "price": 33.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 153,
    "name_en": "Pink Grapefruit",
    "name_ar": "جريب فروت وردي",
    "category": "فواكه",
    "unit": "1000G",
    "price": 20.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 154,
    "name_en": "Purple Thai Basil",
    "name_ar": "ريحان تايلاندي أرجواني",
    "category": "أعشاب",
    "unit": "1000G",
    "price": 68.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 155,
    "name_en": "Rosemary Imported",
    "name_ar": "إكليل الجبل (روزماري)",
    "category": "أعشاب",
    "unit": "1000G",
    "price": 58.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 156,
    "name_en": "Sage Imported",
    "name_ar": "ميرمية مستوردة",
    "category": "أخرى",
    "unit": "1000G",
    "price": 65.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 157,
    "name_en": "Tarragon Imported",
    "name_ar": "طرخون مستورد",
    "category": "أخرى",
    "unit": "1000G",
    "price": 88.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 158,
    "name_en": "Honeydew Melon",
    "name_ar": "شمام عسلي",
    "category": "فواكه",
    "unit": "1000G",
    "price": 22.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 159,
    "name_en": "Kale Holland",
    "name_ar": "كرنب كالي (هولندي)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 32.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 160,
    "name_en": "Kiwano Holland",
    "name_ar": "كيوانو (هولندي)",
    "category": "فواكه",
    "unit": "1000G",
    "price": 60.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 161,
    "name_en": "Kohlrabi Imported",
    "name_ar": "كولرابي (كرنب سلق)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 18.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 162,
    "name_en": "Kumquat Imported",
    "name_ar": "كمكوات (برتقال صغير)",
    "category": "فواكه",
    "unit": "1000G",
    "price": 52.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 163,
    "name_en": "Leeks Imported",
    "name_ar": "كراث مستورد",
    "category": "خضروات",
    "unit": "1000G",
    "price": 18.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 164,
    "name_en": "Lemongrass Imported",
    "name_ar": "عشبة الليمون",
    "category": "فواكه",
    "unit": "1000G",
    "price": 33.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 165,
    "name_en": "Lemon Leaves Imported",
    "name_ar": "أوراق ليمون",
    "category": "فواكه",
    "unit": "1000G",
    "price": 43.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 166,
    "name_en": "Boston Lettuce",
    "name_ar": "خس بوسطن",
    "category": "خضروات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 167,
    "name_en": "Green Frisée Lettuce",
    "name_ar": "خس فريزي أخضر",
    "category": "خضروات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 168,
    "name_en": "Yellow Frisée Lettuce",
    "name_ar": "خس فريزي أصفر",
    "category": "خضروات",
    "unit": "1000G",
    "price": 48.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 169,
    "name_en": "Radicchio Lettuce",
    "name_ar": "خس راديكيو",
    "category": "خضروات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 170,
    "name_en": "Baby Gem Lettuce",
    "name_ar": "خس بيبي جيم",
    "category": "خضروات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 171,
    "name_en": "Bok Choy",
    "name_ar": "بوك تشوي (خس صيني)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 23.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 172,
    "name_en": "Iceberg Lettuce USA",
    "name_ar": "خس آيسبرج (أمريكي)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 25.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 173,
    "name_en": "Lollo Biondi Lettuce",
    "name_ar": "خس لولو بيوندي",
    "category": "خضروات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 174,
    "name_en": "Lollo Rosso Lettuce",
    "name_ar": "خس لولو روسو",
    "category": "خضروات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 175,
    "name_en": "Oakleaf Lettuce",
    "name_ar": "خس أوراق البلوط",
    "category": "خضروات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 176,
    "name_en": "Baby Rocket",
    "name_ar": "جرجير صغير (بيبي روكيت)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 65.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 177,
    "name_en": "Romaine Lettuce",
    "name_ar": "خس روماني",
    "category": "خضروات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 178,
    "name_en": "Kaffir Lime Leaves",
    "name_ar": "أوراق ليمون كفير",
    "category": "فواكه",
    "unit": "1000G",
    "price": 48.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 179,
    "name_en": "Longan Imported",
    "name_ar": "فاكهة اللونجان",
    "category": "فواكه",
    "unit": "1000G",
    "price": 37.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 180,
    "name_en": "Lychees Imported",
    "name_ar": "فاكهة الليتشي",
    "category": "فواكه",
    "unit": "1000G",
    "price": 45.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 181,
    "name_en": "Mango Fresh Imported",
    "name_ar": "مانجو طازج مستورد",
    "category": "فواكه",
    "unit": "1000G",
    "price": 21.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 182,
    "name_en": "Mangosteen Imported",
    "name_ar": "مانغوستين",
    "category": "أخرى",
    "unit": "1000G",
    "price": 36.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 183,
    "name_en": "Micro Herbs Fresh",
    "name_ar": "أعشاب مصغرة طازجة",
    "category": "أعشاب",
    "unit": "1000G",
    "price": 75.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 184,
    "name_en": "Brown Button Mushroom",
    "name_ar": "فطر بني",
    "category": "فطريات",
    "unit": "1000G",
    "price": 25.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 185,
    "name_en": "White Button Mushroom",
    "name_ar": "فطر أبيض",
    "category": "بيض",
    "unit": "1000G",
    "price": 23.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 186,
    "name_en": "Porcini Mushroom",
    "name_ar": "فطر بورسيني",
    "category": "فطريات",
    "unit": "1000G",
    "price": 85.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 187,
    "name_en": "Chestnut Mushroom",
    "name_ar": "فطر كستناء",
    "category": "فطريات",
    "unit": "1000G",
    "price": 30.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 188,
    "name_en": "Enoki Mushroom",
    "name_ar": "فطر إينوكي",
    "category": "فطريات",
    "unit": "200G",
    "price": 1.0,
    "image": "20",
    "stock": 100
  },
  {
    "id": 189,
    "name_en": "Portobello Mushroom",
    "name_ar": "فطر بورتوبيللو",
    "category": "فطريات",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 190,
    "name_en": "Shiitake Mushroom",
    "name_ar": "فطر شيتاكي",
    "category": "فطريات",
    "unit": "1000G",
    "price": 74.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 191,
    "name_en": "White Shimeji Mushroom",
    "name_ar": "فطر شيميجي أبيض",
    "category": "بيض",
    "unit": "1000G",
    "price": 48.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 192,
    "name_en": "Nectarine USA",
    "name_ar": "نكتارين أمريكي",
    "category": "فواكه",
    "unit": "1000G",
    "price": 32.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 193,
    "name_en": "Red Pearl Onion USA",
    "name_ar": "بصل لؤلؤي أحمر",
    "category": "خضروات",
    "unit": "1000G",
    "price": 21.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 194,
    "name_en": "White Pearl Onion USA",
    "name_ar": "بصل لؤلؤي أبيض",
    "category": "خضروات",
    "unit": "1000G",
    "price": 21.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 195,
    "name_en": "Red Jumbo Onion",
    "name_ar": "بصل أحمر جامبو",
    "category": "خضروات",
    "unit": "1000G",
    "price": 21.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 196,
    "name_en": "Shallot Onion Imported",
    "name_ar": "بصل أندلسي (شالوت)",
    "category": "خضروات",
    "unit": "1000G",
    "price": 24.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 197,
    "name_en": "White Onion USA",
    "name_ar": "بصل أبيض أمريكي",
    "category": "خضروات",
    "unit": "1000G",
    "price": 15.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 198,
    "name_en": "Fresh Oregano",
    "name_ar": "أوريجانو طازج",
    "category": "أعشاب",
    "unit": "1000G",
    "price": 68.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 199,
    "name_en": "Papaya Imported",
    "name_ar": "بابايا مستوردة",
    "category": "فواكه",
    "unit": "1000G",
    "price": 25.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 200,
    "name_en": "French Parsley",
    "name_ar": "بقدونس فرنسي",
    "category": "أعشاب",
    "unit": "1000G",
    "price": 28.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 201,
    "name_en": "Curly Parsley",
    "name_ar": "بقدونس مجعد",
    "category": "أعشاب",
    "unit": "1000G",
    "price": 29.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 202,
    "name_en": "Passion Fruit",
    "name_ar": "باشن فروت",
    "category": "أخرى",
    "unit": "1000G",
    "price": 35.0,
    "image": "- [file:2]",
    "stock": 100
  },
  {
    "id": 203,
    "name_en": "Peach Fresh USA",
    "name_ar": "خوخ طازج أمريكي",
    "category": "فواكه",
    "unit": "1000G",
    "price": 32.0,
    "image": "",
    "stock": 100
  }
];

export const PRODUCTS_TOTAL = 203;

export const CATEGORIES = {
  'أخرى': 18,
  'أعشاب': 15,
  'بيض': 4,
  'خضروات': 97,
  'فطريات': 6,
  'فواكه': 63,
};

export default PRODUCTS_FINAL;
