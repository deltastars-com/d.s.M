/**
 * Delta Stars — Gemini AI Service (عدي المساعد الذكي)
 * API key from VITE_GEMINI_KEY env var only.
 */

const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
const KEY = import.meta.env.VITE_GEMINI_KEY || import.meta.env.VITE_GEMINI_API_KEY || '';

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

export async function chatWithOday(
  messages: GeminiMessage[],
  systemContext: string
): Promise<string> {
  // 1. Try server-side secure API first
  try {
    const res = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, systemContext }),
    });
    if (res.ok) {
      const data = await res.json();
      return data.reply;
    }
    console.warn("Server-side Gemini proxy returned non-OK, trying client fallback...");
  } catch (e) {
    console.warn("Server-side Gemini proxy call failed, trying client fallback...", e);
  }

  // 2. Client-side Fallback
  try {
    if (KEY) {
      let contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }],
      }));

      contents = contents.filter(c => c.role === 'user' || c.role === 'model');
      const firstUserIndex = contents.findIndex(c => c.role === 'user');
      if (firstUserIndex !== -1) {
        contents = contents.slice(firstUserIndex);
      }

      if (contents.length > 0) {
        const body = {
          system_instruction: { parts: [{ text: systemContext }] },
          contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        };

        const res = await fetch(`${GEMINI_API}?key=${KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) return reply;
        }
      }
    }
  } catch (err) {
    console.warn("Client side Gemini API call error:", err);
  }

  // 3. Smart local contextual response engine
  const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
  return generateSmartStoreReply(lastUserMsg);
}

function generateSmartStoreReply(userText: string): string {
  const query = userText.trim().toLowerCase();

  if (query.includes('سعر') || query.includes('منتج') || query.includes('تمر') || query.includes('فاكهة') || query.includes('خضار') || query.includes('تفاح') || query.includes('موز') || query.includes('عنب')) {
    return `أهلاً بك! لدينا أكثر من 235 صنفاً طازجاً وممتازاً من الخضار والفواكه وتمور القصيم الفاخرة 🌟.\nيمكنك البحث المباشر في صالة العروض بـ "اسم المنتج" لمعرفة السعر والخيارات، أو تصفح الأقسام فوراً!`;
  }

  if (query.includes('فرع') || query.includes('عنوان') || query.includes('موقع')) {
    return `فروع نجوم دلتا الستة بالمملكة 📍:\n• الفرع الرئيسي: جدة - حي الصفا\n• فرع الرياض - العزيزية\n• فرع الدمام - حي الشاطئ\n• فرع مكة المكرمة - الشوقية\n• فرع المدينة المنورة - حي البحر\n• فرع القصيم - بريدة`;
  }

  if (query.includes('دفع') || query.includes('بطاقة') || query.includes('تمارا') || query.includes('تابي') || query.includes('مدى')) {
    return `طرق الدفع المعتمدة 💳:\n• مدى (Mada)، فيزا (Visa)، ماستركارد، Apple Pay\n• تقسيط تمارا وتابي بدون فوائد\n• تحويل بنكي مباشر لحساب الشركة (البنك العربي الوطني)\nجميع العمليات آمنة 100% ومشفّرة.`;
  }

  if (query.includes('شحن') || query.includes('توصيل') || query.includes('مجاني')) {
    return `خدمة التوصيل الشاحن 🚚:\n• التوصيل مجاني تماماً للطلبات بقيمة 200 ريال أو أكثر 🎉\n• للطلبات الأقل من 200 ريال، تُحسب الرسوم آلياً عبر نظام GPS لأقرب فرع من موقعك!`;
  }

  return `أهلاً بك في متجر نجوم دلتا! 🌟 أنا "عدي" مساعدك الذكي.\nيسعدني إجابة أي سؤال حول المنتجات والأسعار، الفروع، حالة الطلب، أو سياسات الشحن والدفع!`;
}
