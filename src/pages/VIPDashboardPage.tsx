import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function VIPDashboardPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const ar = language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');

  const vipStats = [
    { label: ar ? 'الرصيد المتاح' : 'Available Credit', value: '50,000', unit: 'ر.س', icon: '💳', color: 'bg-green-50 text-green-700' },
    { label: ar ? 'الرصيد المستخدم' : 'Used Credit', value: '23,500', unit: 'ر.س', icon: '📊', color: 'bg-amber-50 text-amber-700' },
    { label: ar ? 'طلبات هذا الشهر' : 'Monthly Orders', value: '12', unit: ar ? 'طلب' : 'orders', icon: '📦', color: 'bg-blue-50 text-blue-700' },
    { label: ar ? 'نقاط الولاء' : 'Loyalty Points', value: '2,450', unit: 'نقطة', icon: '⭐', color: 'bg-purple-50 text-purple-700' },
  ];

  const companyOrders = [
    { id: 'VIP-001', date: '2026-08-20', items: 'تفاح، موز، طماطم، خيار', total: '4,200', status: 'delivered', branch: 'جدة' },
    { id: 'VIP-002', date: '2026-08-22', items: 'تمور عجوة، لوز، فستق', total: '8,500', status: 'preparing', branch: 'الرياض' },
    { id: 'VIP-003', date: '2026-08-23', items: 'سلة خضروات × 10', total: '750', status: 'shipped', branch: 'الدمام' },
    { id: 'VIP-004', date: '2026-08-24', items: 'مانجو، أناناس، فراولة', total: '2,300', status: 'pending', branch: 'جدة' },
  ];

  const invoices = [
    { id: 'INV-2026-001', date: '2026-08-20', amount: '4,200', status: 'paid', method: ar ? 'تحويل بنكي' : 'Bank Transfer' },
    { id: 'INV-2026-002', date: '2026-08-22', amount: '8,500', status: 'pending', method: ar ? 'آجل' : 'Credit' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900 font-black text-sm">🤝</div>
            <div>
              <span className="font-bold text-sm">{ar ? 'بوابة الشركات والعملاء الكبار' : 'B2B Portal'}</span>
              <p className="text-[10px] text-slate-400">{user?.name || 'Company'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-lg">
              ⭐ {ar ? 'عميل VIP' : 'VIP Client'}
            </span>
            <button onClick={() => { logout(); onNavigate('home'); }}
              className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition">
              🚪 {ar ? 'خروج' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      <div className="container py-6 px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {vipStats.map((stat, i) => (
            <div key={i} className={`bg-white rounded-xl border border-slate-100 p-4 ${stat.color}`}>
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-xl font-black mt-2">{stat.value}</div>
              <div className="text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'overview', label: ar ? '📊 نظرة عامة' : '📊 Overview' },
            { key: 'orders', label: ar ? '📦 الطلبات' : '📦 Orders' },
            { key: 'invoices', label: ar ? '🧾 الفواتير' : '🧾 Invoices' },
            { key: 'contracts', label: ar ? '📄 العقود' : '📄 Contracts' },
            { key: 'account', label: ar ? '👤 الحساب' : '👤 Account' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab.key ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <>
            {/* Credit Status */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
              <h3 className="font-bold text-slate-900 mb-4">{ar ? '💳 حالة الحساب' : '💳 Account Status'}</h3>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">{ar ? 'الحد الائتماني' : 'Credit Limit'}</span>
                  <span className="font-bold text-slate-900">73,500 ر.س</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
                  <div className="bg-emerald-500 rounded-full h-3" style={{ width: '32%' }} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{ar ? 'مستخدم: 23,500 ر.س' : 'Used: 23,500 SAR'}</span>
                  <span>{ar ? 'متاح: 50,000 ر.س' : 'Available: 50,000 SAR'}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '📦', label: ar ? 'طلب جديد' : 'New Order', action: () => onNavigate('products') },
                { icon: '📋', label: ar ? 'طلب جماعي' : 'Bulk Order', action: () => addToast(ar ? 'قريباً!' : 'Coming soon!', 'info') },
                { icon: '🧾', label: ar ? 'الفواتير' : 'Invoices', action: () => setActiveTab('invoices') },
                { icon: '📊', label: ar ? 'التقارير' : 'Reports', action: () => addToast(ar ? 'قريباً!' : 'Coming soon!', 'info') },
              ].map((action, i) => (
                <button key={i} onClick={action.action}
                  className="bg-white rounded-xl border border-slate-100 p-4 text-center hover:border-amber-300 hover:shadow-md transition">
                  <span className="text-3xl block mb-2">{action.icon}</span>
                  <span className="text-xs font-bold text-slate-700">{action.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">{ar ? '📦 طلبات الشركة' : '📦 Company Orders'}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs font-semibold">
                  <tr>
                    <th className="text-right px-4 py-2">{ar ? 'رقم' : 'Order'}</th>
                    <th className="text-right px-4 py-2">{ar ? 'التاريخ' : 'Date'}</th>
                    <th className="text-right px-4 py-2">{ar ? 'المنتجات' : 'Items'}</th>
                    <th className="text-right px-4 py-2">{ar ? 'المبلغ' : 'Amount'}</th>
                    <th className="text-right px-4 py-2">{ar ? 'الفرع' : 'Branch'}</th>
                    <th className="text-right px-4 py-2">{ar ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody>
                  {companyOrders.map(order => (
                    <tr key={order.id} className="border-t border-slate-50 hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-slate-900 font-mono text-xs">{order.id}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{order.date}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{order.items}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{order.total} ر.س</td>
                      <td className="px-4 py-3 text-xs text-slate-500">{order.branch}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Invoices */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-900 mb-6">{ar ? '🧾 الفواتير' : '🧾 Invoices'}</h3>
            <div className="space-y-3">
              {invoices.map(inv => (
                <div key={inv.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-200">
                    <span className="text-lg">🧾</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{inv.id}</p>
                    <p className="text-xs text-slate-500">{inv.date} — {inv.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900">{inv.amount} ر.س</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      inv.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {inv.status === 'paid' ? (ar ? 'مدفوعة' : 'Paid') : (ar ? 'معلقة' : 'Pending')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contracts */}
        {activeTab === 'contracts' && (
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-900 mb-6">{ar ? '📄 العقود والاتفاقيات' : '📄 Contracts & Agreements'}</h3>
            <div className="text-center py-12">
              <span className="text-5xl block mb-4">📄</span>
              <p className="text-slate-500 mb-4">{ar ? 'عقود التوريد والشراكة' : 'Supply & Partnership Agreements'}</p>
              <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition">
                {ar ? 'تحميل العقد الحالي' : 'Download Current Contract'}
              </button>
            </div>
          </div>
        )}

        {/* Account */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h3 className="font-bold text-slate-900 mb-6">{ar ? '👤 معلومات الشركة' : '👤 Company Info'}</h3>
            <div className="space-y-4 max-w-lg">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">{ar ? 'اسم الشركة' : 'Company Name'}</p>
                <p className="font-bold text-slate-900">{ar ? 'شركة ' + (user?.name || '...' ) : user?.name || 'Company'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">{ar ? 'الحد الائتماني' : 'Credit Limit'}</p>
                <p className="font-bold text-emerald-700">50,000 ر.س</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">{ar ? 'شروط الدفع' : 'Payment Terms'}</p>
                <p className="font-bold text-slate-900">{ar ? '30 يوم' : 'Net 30'}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500 mb-1">{ar ? 'نوع الحساب' : 'Account Type'}</p>
                <p className="font-bold text-amber-700">⭐ {ar ? 'عميل VIP' : 'VIP Client'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
