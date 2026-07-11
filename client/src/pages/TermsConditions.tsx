import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsConditions() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const content = {
    ar: {
      title: "الشروط والأحكام",
      lastUpdated: "آخر تحديث: 1 يناير 2025",
      sections: [
        {
          title: "1. قبول الشروط",
          content:
            "باستخدام موقعنا، فإنك توافق على هذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام الموقع.",
        },
        {
          title: "2. استخدام الموقع",
          content:
            "تتعهد باستخدام الموقع بطريقة قانونية وعادلة. لا يجوز استخدام الموقع لأي غرض غير قانوني أو مؤذ.",
        },
        {
          title: "3. المنتجات والأسعار",
          content:
            "نحتفظ بالحق في تغيير الأسعار والمنتجات في أي وقت. جميع الأسعار معروضة بالريال السعودي وتشمل الضريبة المضافة.",
        },
        {
          title: "4. الطلبات والدفع",
          content:
            "يجب أن تكون بيانات الدفع صحيحة وحالية. نحتفظ بالحق في رفض أي طلب يبدو غير قانوني أو مريب.",
        },
        {
          title: "5. الشحن والتوصيل",
          content:
            "نسعى لتوصيل الطلبات في الوقت المحدد. لا نتحمل مسؤولية التأخيرات الناجمة عن ظروف خارجة عن السيطرة.",
        },
        {
          title: "6. السياسة الاسترجاع",
          content:
            "يمكنك استرجاع المنتجات خلال 14 يوماً من الاستلام إذا كانت في حالة جيدة. المنتجات الغذائية الطازجة غير قابلة للاسترجاع.",
        },
        {
          title: "7. المسؤولية",
          content:
            "لا نتحمل مسؤولية أي أضرار مباشرة أو غير مباشرة ناجمة عن استخدام الموقع أو المنتجات.",
        },
        {
          title: "8. التعديلات",
          content:
            "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية.",
        },
      ],
    },
    en: {
      title: "Terms & Conditions",
      lastUpdated: "Last Updated: January 1, 2025",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content:
            "By using our website, you agree to these Terms and Conditions. If you do not agree to any part of them, please do not use the website.",
        },
        {
          title: "2. Website Usage",
          content:
            "You agree to use the website in a legal and fair manner. You may not use the website for any illegal or harmful purpose.",
        },
        {
          title: "3. Products and Prices",
          content:
            "We reserve the right to change prices and products at any time. All prices are displayed in Saudi Riyals and include VAT.",
        },
        {
          title: "4. Orders and Payment",
          content:
            "Payment information must be correct and current. We reserve the right to refuse any order that appears illegal or suspicious.",
        },
        {
          title: "5. Shipping and Delivery",
          content:
            "We strive to deliver orders on time. We are not responsible for delays caused by circumstances beyond our control.",
        },
        {
          title: "6. Return Policy",
          content:
            "You can return products within 14 days of receipt if they are in good condition. Fresh food products are non-returnable.",
        },
        {
          title: "7. Liability",
          content:
            "We are not responsible for any direct or indirect damages resulting from the use of the website or products.",
        },
        {
          title: "8. Amendments",
          content:
            "We reserve the right to modify these terms at any time. You will be notified of any material changes.",
        },
      ],
    },
  };

  const currentContent = isArabic ? content.ar : content.en;

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? "rtl" : "ltr"}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText size={40} className="text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              {currentContent.title}
            </h1>
          </div>
          <p className="text-muted-foreground">{currentContent.lastUpdated}</p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {currentContent.sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 p-6 bg-muted rounded-lg text-center">
          <p className="text-muted-foreground text-sm">
            {isArabic
              ? "هذه الشروط تخضع للقوانين السعودية"
              : "These terms are subject to Saudi Arabian laws"}
          </p>
        </div>
      </div>
    </div>
  );
}
