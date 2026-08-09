/**
 * Delta Stars Sovereign System - V2 Core
 * هذا الملف يحتوي على كافة الدوال المحدثة والمصححة للتكامل بين المتجر والتطبيق
 */
import { supabase } from './supabaseClient'; // تأكد من استيراد كائن Supabase الخاص بك
import { jsPDF } from "jspdf";

export const DeltaStarsCore = {
    /**
     * 1. نظام الدفع السيادي (ميسر + البنك العربي الوطني)
     *
     * ⚠️ إصلاح أمني حرج:
     * المفتاح السري (sk_live_) لا يُستخدم أبداً من المتصفح — فأي زائر
     * يستطيع قراءته وسحب الأموال. الطلب يمر عبر دالة الخادوم
     * netlify/functions/create-payment-intent.mjs التي تحمل MOYASAR_SECRET_KEY فقط.
     */
    async processMoyasarPayment(orderData: any) {
        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: Math.round(Number(orderData.total) * 100), // هللة
                    currency: 'SAR',
                    source: orderData.paymentSource,   // مدى / فيزا / ماستركارد / Apple Pay
                    description: `طلب نجوم دلتا رقم ${orderData.id ?? ''}`,
                    metadata: {
                        order_id: orderData.id,
                        customer_name: orderData.customerName,
                        customer_phone: orderData.customerPhone,
                        branch_id: orderData.branchId
                    },
                    callback_url: `${window.location.origin}/?page=track&order=${orderData.id ?? ''}`
                })
            });

            if (!response.ok) {
                const err = await response.text();
                throw new Error(`رفضت بوابة الدفع الطلب: ${err}`);
            }
            return await response.json();
        } catch (error) {
            console.error('❌ خطأ في الدفع:', error);
            throw new Error('تعذر إتمام عملية الدفع، يرجى المحاولة مجدداً أو التواصل مع خدمة العملاء.');
        }
    },

    /** التحقق من نجاح الدفع وتوثيق الإيداع في حساب البنك العربي الوطني */
    async verifyMoyasarPayment(paymentId: string, orderId?: string) {
        const res = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payment_id: paymentId, order_id: orderId })
        });
        if (!res.ok) throw new Error('تعذر التحقق من حالة الدفع');
        return res.json();
    },

    // 2. محرك الأتمتة السيادي (إشعارات + لوجستيات)
    async triggerOrderAutomation(order: any) {
        // إشعار المندوب والمخازن فوراً
        await supabase.from('notifications').insert({
            message: `طلب جديد رقم ${order.id}`,
            branch_id: order.branchId,
            type: 'NEW_ORDER'
        });
        
        // ربط آلي مع أقرب سائق عبر إحداثيات GPS
        await this.findAndAssignDriver(order);
    },

    // 3. أتمتة الفواتير (نظام PDF المحدث)
    async generateInvoice(order: any) {
        const doc = new jsPDF();
        doc.text("Delta Stars - Official Invoice", 10, 10);
        doc.text(`Order: ${order.id}`, 10, 20);
        doc.text(`Total: ${order.total} SAR`, 10, 30);
        // التوقيع الإلكتروني
        doc.save(`Invoice_${order.id}.pdf`);
    },

    // 4. دالة المساعد الذكي "عدي" (الربط الديناميكي)
    initOdayAssistant() {
        window.addEventListener('init-oday', () => {
            console.log("المساعد عدي: جاهز للمساعدة في طلبات التوريد...");
            // هنا يتم تفعيل واجهة الـ Chatbot
        });
    }
};

// تشغيل الأتمتة عند تحميل الصفحة
DeltaStarsCore.initOdayAssistant();
