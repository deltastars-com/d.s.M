import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, MessageCircle, Loader } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "مرحباً! أنا Delta Stars AI، كيف يمكنني مساعدتك اليوم؟",
    sender: "ai",
    timestamp: new Date(),
  },
];

export default function DeltaStarsAI() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        isArabic
          ? "شكراً لسؤالك! يمكنني مساعدتك بمعلومات عن المنتجات والطلبات والتوصيل."
          : "Thank you for your question! I can help you with product information, orders, and delivery.",
        isArabic
          ? "هل تريد معرفة المزيد عن منتجاتنا الطازجة والعروض الحالية؟"
          : "Would you like to know more about our fresh products and current offers?",
        isArabic
          ? "يمكنني مساعدتك في تتبع طلبك أو الإجابة على أي أسئلة حول الشحن."
          : "I can help you track your order or answer any questions about shipping.",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const quickActions = isArabic
    ? [
        "معلومات عن المنتجات",
        "تتبع الطلب",
        "العروض الحالية",
        "سياسة الشحن",
        "الدفع والفواتير",
        "خدمة العملاء",
      ]
    : [
        "Product Information",
        "Track Order",
        "Current Offers",
        "Shipping Policy",
        "Payment & Invoices",
        "Customer Service",
      ];

  return (
    <div className={`min-h-screen bg-background py-8 ${isArabic ? "rtl" : "ltr"}`}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle size={40} className="text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              {isArabic ? "Delta Stars AI" : "Delta Stars AI"}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isArabic
              ? "مساعدك الذكي لجميع احتياجاتك"
              : "Your intelligent assistant for all your needs"}
          </p>
        </div>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString(isArabic ? "ar" : "en", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader size={16} className="animate-spin" />
                  <p className="text-sm">
                    {isArabic ? "جاري الكتابة..." : "Typing..."}
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-6 py-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">
                {isArabic ? "اختر موضوعاً:" : "Choose a topic:"}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(action)}
                    className="text-xs"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !isLoading) {
                    handleSendMessage();
                  }
                }}
                placeholder={
                  isArabic ? "اكتب رسالتك..." : "Type your message..."
                }
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="gap-2"
              >
                <Send size={16} />
                {isArabic ? "إرسال" : "Send"}
              </Button>
            </div>
          </div>
        </Card>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            {isArabic
              ? "Delta Stars AI متاح 24/7 للإجابة على أسئلتك"
              : "Delta Stars AI is available 24/7 to answer your questions"}
          </p>
        </div>
      </div>
    </div>
  );
}
