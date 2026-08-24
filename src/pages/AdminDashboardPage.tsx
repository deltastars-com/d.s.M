import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { SYSTEM_CONFIG, BRANCHES, CATEGORIES, ORDER_STATUSES } from '@/constants';
import { allProducts } from '@/data/products';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function AdminDashboardPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const ar = language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: ar ? 'إجمالي المبيعات' : 'Total Sales', value: '125,400', unit: 'ر.س', icon: '💰', change: '+12%', color: 'bg-green-50 text-green-700 border-green-200' },
    { label: ar ? 'الطلبات النشطة' : 'Active Orders', value: '48', unit: ar ? 'طلب' : 'orders', icon: '📦', change: '+5', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: ar ? 'العملاء النشطون' : 'Active Customers', value: '1,230', unit: '', icon: '👥', change: '+8%', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: ar ? 'المنتجات' : 'Products', value: allProducts.length.toString(), unit: ar ? 'صنف' : 'items', icon: '🍎', change: '', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: ar ? 'الفروع' : 'Branches', value: '6', unit: ar ? 'فرع' : 'branches', icon: '🏢', change: '', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: ar ? 'المخزون المنخفض' : 'Low Stock', value: '12', unit: ar ? 'صنف' : 'items', icon: '⚠️', change: '', color: 'bg-red-50 text-red-700 border-red-200' },
  ];

  const recentOrders = [
    { id: 'DS-2026-001', customer: 'أحمد محمد', branch: 'جدة', amount: '350', status: 'preparing', items: 5, phone: '0551234567' },
    { id: 'DS-2026-002', customer: 'سارة العلي', branch: 'الرياض', amount: '180', status: 'delivered', items: 3, phone: '0559876543' },
    { id: 'DS-2026-003', customer: 'خالد الشمري', branch: 'الدمام', amount: '520', status: 'pending', items: 8, phone: '0557654321' },
    { id: 'DS-2026-004', customer: 'نورة الحربي', branch: 'أبها', amount: '290', status: 'shipped', items: 4, phone: '0552345678' },
    { id: 'DS-2026-005', customer: 'عبدالله القحطاني', branch: 'خميس مشيط', amount: '410', status: 'preparing', items: 6, phone: '0558765432' },
  ];

  const lowStockProducts = allProducts.filter(p => (p.stock_quantity || 0) < 50);

  const tabs = [
    { key: 'overview', label: ar ? 'نظرة عامة' : 'Overview', icon: '📊' },
    { key: 'orders', label: ar ? 'الطلبات' : 'Orders', icon: '📦' },
    { key: 'products', label: ar ? 'المنتجات' : 'Products', icon: '🍎' },
    { key: 'customers', label: ar ? 'العملاء' : 'Customers', icon: '👥' },
    { key: 'inventory', label: ar ? 'المخزون' : 'Inventory', icon: '📋' },
    { key: 'branches', label: ar ? 'الفروع' : 'Branches', icon: '🏢' },
    { key: 'promotions', label: ar ? 'العروض' : 'Promos', icon: '🏷️' },
    { key: 'reports', label: ar ? 'التقارير' : 'Reports', icon: '📈' },
    { key: 'settings', label: ar ? 'الإعدادات' : 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block w-64 bg-emerald-900 text-white min-h-screen sticky top-0">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-emerald-900 font-black text-sm">DS</div>
            <div>
              <p className="font-bold text-sm">{ar ? 'لوحة التحكم' : 'Admin Panel'}</p>
              <p className="text-emerald-300 text-[10px]">v{SYSTEM_CONFIG.APP_VERSION}</p>
            </div>
          </div>
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                  activeTab === tab.key ? 'bg-amber-500/20 text-amber-400' : 'text-emerald-200 hover:bg-emerald-800'
                }`}>
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center text-xs font-bold">{(user?.name || 'A')[0]}</div>
            <div>
              <p className="text-xs font-semibold">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-emerald-300">{user?.email || 'admin@deltastars.com'}</p>
            </div>
          </div>
          <button onClick={() => { logout(); onNavigate('home'); }}
            className="w-full py-2 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-xs font-bold transition">
            🚪 {ar ? 'خروج' : 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar - Mobile */}
        <div className="bg-emerald-900 text-white py-3 px-4 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <span className="font-bold text-sm">{ar ? 'لوحة التحكم' : 'Admin'}</span>
          </div>
          <button onClick={() => { logout(); onNavigate('home'); }}
            className="text-xs bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition">
            🚪 {ar ? 'خروج' : 'Logout'}
          </button>
        </div>

        <div className="p-4 lg:p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <h2 className="text-xl font-black text-emerald-900 mb-6">{ar ? '📊 نظرة عامة' : '📊 Overview'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {stats.map((stat, i) => (
                  <div key={i} className={`bg-white rounded-xl border p-4 ${stat.color.split(' ')[2] || 'border-slate-100'} hover:shadow-md transition`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{stat.icon}</span>
                      {stat.change && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.color}`}>
                          {stat.change}
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-black text-emerald-900">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Orders Tab */}
          {(activeTab === 'overview' || activeTab === 'orders') && (
            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden mb-6">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-emerald-900">{ar ? '📦 آخر الطلبات' : '📦 Recent Orders'}</h3>
                {activeTab === 'orders' && (
                  <span className="text-xs text-slate-500">{recentOrders.length} {ar ? 'طلب' : 'orders'}</span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-600 text-xs font-semibold">
                    <tr>
                      <th className="text-right px-4 py-2">{ar ? 'رقم' : 'Order'}</th>
                      <th className="text-right px-4 py-2">{ar ? 'العميل' : 'Customer'}</th>
                      <th className="text-right px-4 py-2">{ar ? 'الفرع' : 'Branch'}</th>
                      <th className="text-right px-4 py-2">{ar ? 'المبلغ' : 'Amount'}</th>
                      <th className="text-right px-4 py-2">{ar ? 'الحالة' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id} className="border-t border-slate-50 hover:bg-slate-50 transition">
                        <td className="px-4 py-3 font-semibold text-emerald-700 font-mono text-xs">{order.id}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold">{order.customer}</p>
                          <p className="text-[10px] text-slate-400">{order.phone}</p>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">{order.branch}</td>
                        <td className="px-4 py-3 font-bold">{order.amount} ر.س</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'preparing' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]?.[ar ? 'label_ar' : 'label_en'] || order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-emerald-900 text-lg">{ar ? '🍎 إدارة المنتجات' : '🍎 Product Management'}</h3>
                <span className="text-sm text-slate-500">{allProducts.length} {ar ? 'منتج' : 'products'}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {allProducts.slice(0, 24).map(p => (
                  <div key={p.id} className="bg-slate-50 rounded-xl p-3 hover:bg-emerald-50 transition cursor-pointer border border-transparent hover:border-emerald-200">
                    <div className="text-2xl mb-2">
                      {p.category === 'fruits' ? '🍎' : p.category === 'vegetables' ? '🥬' : p.category === 'dates' ? '🌴' : p.category === 'herbs' ? '🌿' : p.category === 'nuts' ? '🥜' : '📦'}
                    </div>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{ar ? p.name_ar : p.name_en}</p>
                    <p className="text-xs text-emerald-700 font-bold">{p.price} ر.س</p>
                    <p className={`text-[10px] font-semibold ${(p.stock_quantity || 0) < 50 ? 'text-red-500' : 'text-green-600'}`}>
                      {ar ? 'المخزون:' : 'Stock:'} {p.stock_quantity || 0}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customers Tab */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-6">{ar ? '👥 إدارة العملاء' : '👥 Customer Management'}</h3>
              <div className="space-y-3">
                {[
                  { name: 'أحمد محمد', phone: '0551234567', orders: 12, total: '2,450', status: 'active' },
                  { name: 'سارة العلي', phone: '0559876543', orders: 8, total: '1,200', status: 'active' },
                  { name: 'خالد الشمري', phone: '0557654321', orders: 5, total: '890', status: 'active' },
                  { name: 'نورة الحربي', phone: '0552345678', orders: 3, total: '560', status: 'inactive' },
                ].map(c => (
                  <div key={c.phone} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">{c.name[0]}</div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">{c.orders} {ar ? 'طلب' : 'orders'}</p>
                      <p className="text-sm font-bold text-emerald-700">{c.total} ر.س</p>
                    </div>
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {c.status === 'active' ? (ar ? 'نشط' : 'Active') : (ar ? 'غير نشط' : 'Inactive')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-6">{ar ? '📋 إدارة المخزون' : '📋 Inventory Management'}</h3>
              {lowStockProducts.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-red-600 mb-3">⚠️ {ar ? 'منتجات بمخزون منخفض' : 'Low Stock Products'} ({lowStockProducts.length})</h4>
                  <div className="space-y-2">
                    {lowStockProducts.map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-red-50 rounded-xl">
                        <span className="text-lg">
                          {p.category === 'fruits' ? '🍎' : p.category === 'vegetables' ? '🥬' : p.category === 'dates' ? '🌴' : '📦'}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900">{ar ? p.name_ar : p.name_en}</p>
                          <p className="text-xs text-slate-500">{p.price} ر.س / {ar ? p.unit_ar : p.unit_en}</p>
                        </div>
                        <span className="text-sm font-bold text-red-600">{p.stock_quantity || 0}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="text-center py-8">
                <p className="text-slate-500">{ar ? 'umped with low stock items shown above' : 'Low stock items shown above'}</p>
              </div>
            </div>
          )}

          {/* Branches Tab */}
          {activeTab === 'branches' && (
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-6">{ar ? '🏢 إدارة الفروع' : '🏢 Branch Management'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BRANCHES.map(branch => (
                  <div key={branch.id} className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-emerald-300 transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-lg">📍</div>
                      <div>
                        <h4 className="font-bold text-sm text-emerald-900">{ar ? branch.name_ar : branch.name_en}</h4>
                        <p className="text-[10px] text-slate-500">{branch.city}</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-2">{ar ? branch.address_ar : branch.address_en}</p>
                    <p className="text-xs text-slate-500">📞 {branch.phone}</p>
                    {branch.location && (
                      <p className="text-[10px] text-slate-400 mt-1">
                        🌐 {branch.location.lat.toFixed(4)}, {branch.location.lng.toFixed(4)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Promotions Tab */}
          {activeTab === 'promotions' && (
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-emerald-900 text-lg">{ar ? '🏷️ إدارة العروض والخصومات' : '🏷️ Promotions & Discounts'}</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-amber-900">{ar ? 'عرض التخفيض الشامل' : 'Seasonal Sale'}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">{ar ? 'نشط' : 'Active'}</span>
                  </div>
                  <p className="text-sm text-amber-700">{ar ? 'خصم 15% على جميع المنتجات' : '15% off all products'}</p>
                  <p className="text-xs text-amber-600 mt-1">{ar ? 'صالح حتى: 2026/12/31' : 'Valid until: 2026/12/31'}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900">{ar ? 'كوبون الترحيب' : 'Welcome Coupon'}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">{ar ? 'نشط' : 'Active'}</span>
                  </div>
                  <p className="text-sm text-slate-700">{ar ? 'خصم 20 ريال للطلبات فوق 100 ريال' : '20 SAR off on orders above 100 SAR'}</p>
                  <p className="font-mono text-xs text-emerald-700 mt-1">WELCOME20</p>
                </div>
                <button className="w-full py-3 border-2 border-dashed border-emerald-300 rounded-xl text-emerald-600 font-bold text-sm hover:bg-emerald-50 transition">
                  + {ar ? 'إضافة عرض جديد' : 'Add New Promotion'}
                </button>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-6">{ar ? '📈 التقارير والإحصائيات' : '📈 Reports & Analytics'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-center">
                  <p className="text-3xl font-black text-emerald-900">125,400</p>
                  <p className="text-xs text-emerald-700 font-semibold">{ar ? 'إجمالي المبيعات (ر.س)' : 'Total Sales (SAR)'}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
                  <p className="text-3xl font-black text-blue-900">1,230</p>
                  <p className="text-xs text-blue-700 font-semibold">{ar ? 'إجمالي الطلبات' : 'Total Orders'}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 text-center">
                  <p className="text-3xl font-black text-purple-900">98%</p>
                  <p className="text-xs text-purple-700 font-semibold">{ar ? 'نسبة التوصيل' : 'Delivery Rate'}</p>
                </div>
              </div>
              <div className="text-center py-8">
                <span className="text-5xl block mb-4">📊</span>
                <p className="text-slate-500 text-sm">{ar ? 'التقارير الشهرية والسنوية والتحليلات المتقدمة' : 'Monthly, annual reports and advanced analytics'}</p>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl border border-slate-100 p-6">
              <h3 className="font-bold text-emerald-900 text-lg mb-6">{ar ? '⚙️ إعدادات النظام' : '⚙️ System Settings'}</h3>
              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold">{ar ? 'حد الطلب الأدنى' : 'Minimum Order'}</span>
                  <span className="text-sm text-emerald-700 font-bold">{SYSTEM_CONFIG.MIN_ORDER} ر.س</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold">{ar ? 'نسبة الضريبة' : 'VAT Rate'}</span>
                  <span className="text-sm text-emerald-700 font-bold">{SYSTEM_CONFIG.VAT_RATE * 100}%</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold">{ar ? 'التوصيل المجاني من' : 'Free Delivery From'}</span>
                  <span className="text-sm text-emerald-700 font-bold">{SYSTEM_CONFIG.FREE_DELIVERY_THRESHOLD} ر.س</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold">{ar ? 'رسوم التوصيل' : 'Delivery Fee'}</span>
                  <span className="text-sm text-emerald-700 font-bold">{SYSTEM_CONFIG.DELIVERY_FEE} ر.س</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold">{ar ? '-Version' : 'Version'}</span>
                  <span className="text-sm text-slate-500">v{SYSTEM_CONFIG.APP_VERSION}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
