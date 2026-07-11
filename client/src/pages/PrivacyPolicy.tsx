import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const content = {
    ar: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: 1 يناير 2025",
      sections: [
        {
          title: "1. مقدمة",
          content:
            "نجوم دلتا للتجارة الإلكترونية تلتزم بحماية خصوصيتك. تشرح هذه السياسة كيفية جمع واستخدام وحماية بيانتك الشخصية.",
        },
        {
          title: "2. البيانات التي نجمعها",
          content:
            "نجمع البيانات التالية: الاسم، البريد الإلكتروني، رقم الهاتف، عنوان التوصيل، سجل المشتريات، وبيانات الدفع. كما نجمع بيانات الاستخدام مثل صفحات الويب التي تزورها وعدد مرات الزيارة.",
        },
        {
          title: "3. كيفية استخدام البيانات",
          content:
            "نستخدم بياناتك لمعالجة الطلبات، تحسين خدماتنا، إرسال التحديثات، وتقديم دعم العملاء. لن نبيع بياناتك لأطراف ثالثة دون موافقتك.",
        },
        {
          title: "4. حماية البيانات",
          content:
            "نستخدم تشفير HTTPS وتدابير أمان متقدمة لحماية بياناتك. جميع المعاملات محمية بمعايير الأمان الدولية.",
        },
        {
          title: "5. حقوقك",
          content:
            "لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها وحذفها. يمكنك الاتصال بنا في أي وقت للتحكم في بياناتك.",
        },
        {
          title: "6. الاتصال بنا",
          content:
            "إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى الاتصال بنا على: deltastars777@gmail.com أو الاتصال على: +966501234567",
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: January 1, 2025",
      sections: [
        {
          title: "1. Introduction",
          content:
            "Delta Stars E-Commerce is committed to protecting your privacy. This policy explains how we collect, use, and protect your personal data.",
        },
        {
          title: "2. Data We Collect",
          content:
            "We collect the following data: name, email, phone number, delivery address, purchase history, and payment information. We also collect usage data such as pages you visit and visit frequency.",
        },
        {
          title: "3. How We Use Your Data",
          content:
            "We use your data to process orders, improve our services, send updates, and provide customer support. We will not sell your data to third parties without your consent.",
        },
        {
          title: "4. Data Protection",
          content:
            "We use HTTPS encryption and advanced security measures to protect your data. All transactions are protected by international security standards.",
        },
        {
          title: "5. Your Rights",
          content:
            "You have the right to access, correct, and delete your personal data. You can contact us at any time to control your data.",
        },
        {
          title: "6. Contact Us",
          content:
            "If you have any questions about this privacy policy, please contact us at: deltastars777@gmail.com or call: +966501234567",
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
            <Shield size={40} className="text-primary" />
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
              ? "هذه السياسة تخضع للقوانين السعودية"
              : "This policy is subject to Saudi Arabian laws"}
          </p>
        </div>
      </div>
    </div>
  );
}
