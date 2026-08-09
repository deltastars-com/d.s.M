
import { Invoice, Payment, VipClient, VipTransaction, Product } from '../../types';

/**
 * Delta Accounting Engine v27.0
 * محرك محاسبي سيادي يدعم القيد المزدوج، الجرد المستمر، وإدارة VAT.
 */

export interface JournalEntry {
    id: string;
    date: string;
    description: string;
    reference: string;
    lines: JournalLine[];
}

export interface JournalLine {
    accountId: string;
    accountName: string;
    debit: number;
    credit: number;
}

export const CHART_OF_ACCOUNTS = {
    ASSETS: { id: '1000', name: 'الأصول المتداولة' },
    INVENTORY: { id: '1201', name: 'مخزون المنتجات الطازجة' },
    RECEIVABLES: { id: '1105', name: 'ذمم العملاء (VIP)' },
    CASH: { id: '1101', name: 'الصندوق / البنك العربي' },
    LIABILITIES: { id: '2000', name: 'الالتزامات' },
    PAYABLES: { id: '2001', name: 'ذمم الموردين' },
    VAT_OUT: { id: '2105', name: 'ضريبة القيمة المضافة (مخرجات 15%)' },
    VAT_IN: { id: '2106', name: 'ضريبة القيمة المضافة (مدخلات 15%)' },
    EQUITY: { id: '3000', name: 'رأس مال شركة نجوم دلتا' },
    REVENUE: { id: '4000', name: 'إيرادات المبيعات' },
    SALES_RETURNS: { id: '4001', name: 'مردودات ومسموحات المبيعات' },
    COGS: { id: '5001', name: 'تكلفة البضاعة المباعة' },
    EXPENSES: { id: '6000', name: 'مصاريف التشغيل واللوجستيات' }
};

/** الأصول: 1xxx | الالتزامات: 2xxx | حقوق الملكية: 3xxx | إيرادات: 4xxx | مصاريف/تكلفة: 5xxx-6xxx */
function accountCategory(accountId: string): 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' {
    switch (accountId.charAt(0)) {
        case '1': return 'asset';
        case '2': return 'liability';
        case '3': return 'equity';
        case '4': return 'revenue';
        default: return 'expense';
    }
}

/** أقصى فرق مسموح به بين المدين والدائن (لتفادي أخطاء الفاصلة العشرية في JS) */
const BALANCE_TOLERANCE = 0.01;

/** تقريب آمن لأي مبلغ مالي لمنزلتين عشريتين */
function round2(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export class AccountingEngine {
    private journals: JournalEntry[] = [];

    constructor(initialJournals: JournalEntry[] = []) {
        this.journals = initialJournals;
    }

    /**
     * يتحقق أن مجموع المدين = مجموع الدائن قبل قبول أي قيد.
     * هذا هو أساس نظام القيد المزدوج — قيد غير متوازن يعني خطأ حقيقي
     * في البيانات ويجب رفضه فوراً بدل تسجيله بصمت.
     */
    private assertBalanced(entry: JournalEntry) {
        const totalDebit = round2(entry.lines.reduce((s, l) => s + l.debit, 0));
        const totalCredit = round2(entry.lines.reduce((s, l) => s + l.credit, 0));
        if (Math.abs(totalDebit - totalCredit) > BALANCE_TOLERANCE) {
            throw new Error(
                `قيد غير متوازن (${entry.id}): مدين=${totalDebit} ≠ دائن=${totalCredit}. تم رفض القيد.`
            );
        }
    }

    /** يتحقق من توازن دفتر الأستاذ كاملاً — مفيد كفحص دوري/عند الإقفال */
    public verifyLedgerIntegrity(): { balanced: boolean; totalDebit: number; totalCredit: number } {
        const totalDebit = round2(this.journals.reduce((s, je) => s + je.lines.reduce((s2, l) => s2 + l.debit, 0), 0));
        const totalCredit = round2(this.journals.reduce((s, je) => s + je.lines.reduce((s2, l) => s2 + l.credit, 0), 0));
        return { balanced: Math.abs(totalDebit - totalCredit) <= BALANCE_TOLERANCE, totalDebit, totalCredit };
    }

    recordSalesInvoice(invoice: Invoice, cogsAmount: number) {
        // استخدام ?? بدل || لأن ضريبة = 0 قيمة صحيحة (فاتورة معفاة)، لا يجب
        // استبدالها بالحساب الافتراضي 15% كما كان يحدث سابقاً (كان يسبب
        // قيداً غير متوازن في حالة الإعفاء الضريبي).
        const tax = round2(invoice.tax ?? (invoice.subtotal * 0.15));
        const entry: JournalEntry = {
            id: `JE-SLS-${invoice.id}`,
            date: invoice.date,
            description: `إثبات مبيعات فاتورة #${invoice.id} - ${invoice.customerName}`,
            reference: invoice.id,
            lines: [
                { 
                    accountId: CHART_OF_ACCOUNTS.RECEIVABLES.id, 
                    accountName: CHART_OF_ACCOUNTS.RECEIVABLES.name,
                    debit: round2(invoice.total), 
                    credit: 0 
                },
                { 
                    accountId: CHART_OF_ACCOUNTS.REVENUE.id, 
                    accountName: CHART_OF_ACCOUNTS.REVENUE.name,
                    debit: 0, 
                    credit: round2(invoice.subtotal) 
                },
                { 
                    accountId: CHART_OF_ACCOUNTS.VAT_OUT.id, 
                    accountName: CHART_OF_ACCOUNTS.VAT_OUT.name,
                    debit: 0, 
                    credit: tax 
                },
                {
                    accountId: CHART_OF_ACCOUNTS.COGS.id,
                    accountName: CHART_OF_ACCOUNTS.COGS.name,
                    debit: round2(cogsAmount),
                    credit: 0
                },
                {
                    accountId: CHART_OF_ACCOUNTS.INVENTORY.id,
                    accountName: CHART_OF_ACCOUNTS.INVENTORY.name,
                    debit: 0,
                    credit: round2(cogsAmount)
                }
            ]
        };
        this.assertBalanced(entry);
        this.journals.push(entry);
        return entry;
    }

    /**
     * تحصيل نقدي من عميل VIP مقابل فاتورة آجلة سابقة.
     * مدين: الصندوق/البنك | دائن: ذمم العملاء
     */
    recordPaymentReceived(payment: Payment) {
        const amount = round2(payment.amount);
        const entry: JournalEntry = {
            id: `JE-PAY-${payment.id}`,
            date: payment.date,
            description: `تحصيل دفعة #${payment.id} على الفاتورة #${payment.invoiceId} (${payment.method_ar})`,
            reference: payment.invoiceId,
            lines: [
                { accountId: CHART_OF_ACCOUNTS.CASH.id, accountName: CHART_OF_ACCOUNTS.CASH.name, debit: amount, credit: 0 },
                { accountId: CHART_OF_ACCOUNTS.RECEIVABLES.id, accountName: CHART_OF_ACCOUNTS.RECEIVABLES.name, debit: 0, credit: amount }
            ]
        };
        this.assertBalanced(entry);
        this.journals.push(entry);
        return entry;
    }

    /**
     * فاتورة شراء من مورد (استلام بضاعة للمخزون).
     * مدين: المخزون + ضريبة مدخلات | دائن: ذمم الموردين (أو الصندوق لو دفع فوري)
     */
    recordPurchaseInvoice(invoice: Invoice, paidCash: boolean = false) {
        if (invoice.type !== 'Purchase') {
            throw new Error(`الفاتورة #${invoice.id} ليست فاتورة شراء (type=${invoice.type}).`);
        }
        const taxIn = round2(invoice.tax ?? (invoice.subtotal * 0.15));
        const creditAccount = paidCash ? CHART_OF_ACCOUNTS.CASH : CHART_OF_ACCOUNTS.PAYABLES;
        const entry: JournalEntry = {
            id: `JE-PUR-${invoice.id}`,
            date: invoice.date,
            description: `إثبات فاتورة شراء #${invoice.id} - ${invoice.customerName}`,
            reference: invoice.id,
            lines: [
                { accountId: CHART_OF_ACCOUNTS.INVENTORY.id, accountName: CHART_OF_ACCOUNTS.INVENTORY.name, debit: round2(invoice.subtotal), credit: 0 },
                { accountId: CHART_OF_ACCOUNTS.VAT_IN.id, accountName: CHART_OF_ACCOUNTS.VAT_IN.name, debit: taxIn, credit: 0 },
                { accountId: creditAccount.id, accountName: creditAccount.name, debit: 0, credit: round2(invoice.total) }
            ]
        };
        this.assertBalanced(entry);
        this.journals.push(entry);
        return entry;
    }

    /**
     * مرتجع مبيعات (إرجاع منتج من عميل). يعكس كلاً من قيد الإيراد وقيد تكلفة
     * البضاعة المباعة الأصليين، بنفس مبدأ القيد المزدوج.
     */
    recordSalesReturn(invoice: Invoice, cogsAmount: number) {
        const tax = round2(invoice.tax ?? (invoice.subtotal * 0.15));
        const entry: JournalEntry = {
            id: `JE-RET-${invoice.id}-${Date.now()}`,
            date: new Date().toISOString(),
            description: `إثبات مرتجع مبيعات على الفاتورة #${invoice.id} - ${invoice.customerName}`,
            reference: invoice.id,
            lines: [
                { accountId: CHART_OF_ACCOUNTS.SALES_RETURNS.id, accountName: CHART_OF_ACCOUNTS.SALES_RETURNS.name, debit: round2(invoice.subtotal), credit: 0 },
                { accountId: CHART_OF_ACCOUNTS.VAT_OUT.id, accountName: CHART_OF_ACCOUNTS.VAT_OUT.name, debit: tax, credit: 0 },
                { accountId: CHART_OF_ACCOUNTS.RECEIVABLES.id, accountName: CHART_OF_ACCOUNTS.RECEIVABLES.name, debit: 0, credit: round2(invoice.total) },
                { accountId: CHART_OF_ACCOUNTS.INVENTORY.id, accountName: CHART_OF_ACCOUNTS.INVENTORY.name, debit: round2(cogsAmount), credit: 0 },
                { accountId: CHART_OF_ACCOUNTS.COGS.id, accountName: CHART_OF_ACCOUNTS.COGS.name, debit: 0, credit: round2(cogsAmount) }
            ]
        };
        this.assertBalanced(entry);
        this.journals.push(entry);
        return entry;
    }

    /**
     * الميزانية العمومية: الأصول = الالتزامات + حقوق الملكية (بما فيها صافي
     * الربح المتراكم من قائمة الدخل، لضمان توازن الميزانية فعلياً).
     */
    getBalanceSheet() {
        const tb = this.getTrialBalance();
        const assets = tb.filter(a => accountCategory(a.id) === 'asset');
        const liabilities = tb.filter(a => accountCategory(a.id) === 'liability');
        const equity = tb.filter(a => accountCategory(a.id) === 'equity');

        const totalAssets = round2(assets.reduce((s, a) => s + a.netBalance, 0));
        const totalLiabilities = round2(liabilities.reduce((s, a) => s + (a.credit - a.debit), 0));
        const baseEquity = round2(equity.reduce((s, a) => s + (a.credit - a.debit), 0));
        const retainedEarnings = round2(this.getIncomeStatement().netProfit);
        const totalEquity = round2(baseEquity + retainedEarnings);

        return {
            assets: assets.map(a => ({ id: a.id, name: a.name, balance: a.netBalance })),
            liabilities: liabilities.map(a => ({ id: a.id, name: a.name, balance: round2(a.credit - a.debit) })),
            equity: equity.map(a => ({ id: a.id, name: a.name, balance: round2(a.credit - a.debit) })),
            retainedEarnings,
            totalAssets,
            totalLiabilities,
            totalEquity,
            /** يجب أن يكون هذا صفر دائماً في نظام قيد مزدوج سليم */
            balanceCheckDifference: round2(totalAssets - (totalLiabilities + totalEquity))
        };
    }

    /**
     * قائمة تدفقات نقدية مبسطة (طريقة مباشرة) مبنية على كل حركة فعلية
     * على حساب الصندوق/البنك داخل دفتر اليومية.
     */
    getCashFlowStatement() {
        let cashIn = 0;
        let cashOut = 0;
        const movements: { date: string; description: string; amount: number }[] = [];
        this.journals.forEach(je => {
            je.lines.forEach(line => {
                if (line.accountId === CHART_OF_ACCOUNTS.CASH.id) {
                    if (line.debit > 0) {
                        cashIn = round2(cashIn + line.debit);
                        movements.push({ date: je.date, description: je.description, amount: line.debit });
                    }
                    if (line.credit > 0) {
                        cashOut = round2(cashOut + line.credit);
                        movements.push({ date: je.date, description: je.description, amount: -line.credit });
                    }
                }
            });
        });
        return { cashIn, cashOut, netCashFlow: round2(cashIn - cashOut), movements };
    }

    getTrialBalance() {
        const balances: { [key: string]: { name: string, debit: number, credit: number } } = {};
        this.journals.forEach(je => {
            je.lines.forEach(line => {
                if (!balances[line.accountId]) {
                    balances[line.accountId] = { name: line.accountName, debit: 0, credit: 0 };
                }
                balances[line.accountId].debit += line.debit;
                balances[line.accountId].credit += line.credit;
            });
        });
        return Object.entries(balances).map(([id, data]) => ({
            id,
            ...data,
            netBalance: data.debit - data.credit
        }));
    }

    getIncomeStatement() {
        const tb = this.getTrialBalance();
        const revenue = tb.filter(a => a.id.startsWith('4')).reduce((s, a) => s + (a.credit - a.debit), 0);
        const cogs = tb.filter(a => a.id === CHART_OF_ACCOUNTS.COGS.id).reduce((s, a) => s + (a.debit - a.credit), 0);
        const expenses = tb.filter(a => a.id.startsWith('6')).reduce((s, a) => s + (a.debit - a.credit), 0);
        return {
            revenue,
            cogs,
            grossProfit: revenue - cogs,
            expenses,
            netProfit: (revenue - cogs) - expenses
        };
    }

    recordCashback(userId: string, amount: number, description: string) {
        const entry: JournalEntry = {
            id: `JE-CBK-${Date.now()}`,
            date: new Date().toISOString(),
            description: `إثبات كاش باك للعميل #${userId}: ${description}`,
            reference: userId,
            lines: [
                {
                    accountId: CHART_OF_ACCOUNTS.EXPENSES.id,
                    accountName: CHART_OF_ACCOUNTS.EXPENSES.name,
                    debit: amount,
                    credit: 0
                },
                {
                    accountId: CHART_OF_ACCOUNTS.LIABILITIES.id,
                    accountName: CHART_OF_ACCOUNTS.LIABILITIES.name,
                    debit: 0,
                    credit: amount
                }
            ]
        };
        this.assertBalanced(entry);
        this.journals.push(entry);
        return entry;
    }
}
