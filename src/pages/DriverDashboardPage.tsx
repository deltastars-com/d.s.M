import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import type { Page } from '@/types';

interface Props {
  onNavigate: (page: Page) => void;
}

export default function DriverDashboardPage({ onNavigate }: Props) {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const ar = language === 'ar';
  const [activeTab, setActiveTab] = useState('tasks');

  const driverStats = [
    { label: ar ? 'مهام اليوم' : "Today's Tasks", value: '5', icon: '📋', color: 'bg-blue-50 text-blue-700' },
    { label: ar ? 'تم التوصيل' : 'Delivered', value: '3', icon: '✅', color: 'bg-green-50 text-green-700' },
    { label: ar ? 'قيد التوصيل' : 'In Transit', value: '2', icon: '🚚', color: 'bg-amber-50 text-amber-700' },
    { label: ar ? 'الكمية' : 'Revenue', value: '1,450', icon: '💰', color: 'bg-purple-50 text-purple-700' },
  ];

  const tasks = [
    { id: 'DS-001', customer: 'أحمد محمد', address: 'جدة، حي المنار، شارع الأمير سلطان', phone: '0551234567', items: 5, total: '350 ر.س', status: 'pending', priority: 'high', eta: '15 دقيقة' },
    { id: 'DS-002', customer: 'سارة العلي', address: 'جدة، حي الروضة، شارع فلسطين', phone: '0559876543', items: 3, total: '180 ر.س', status: 'transit', priority: 'medium', eta: '30 دقيقة' },
    { id: 'DS-003', customer: 'خالد الشمري', address: 'جدة، حي النعيم، مجمع الواحة', phone: '0557654321', items: 8, total: '520 ر.س', status: 'pending', priority: 'high', eta: '45 دقيقة' },
    { id: 'DS-004', customer: 'نورة الحربي', address: 'جدة، حي ال讲堂، فيلا 12', phone: '0552345678', items: 4, total: '290 ر.س', status: 'delivered', priority: 'low', eta: '-' },
  ];

  const handleStatusChange = (taskId: string, newStatus: string) => {
    addToast(ar ? `تم تحديث حالة الطلب ${taskId}` : `Order ${taskId} status updated`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white py-3 px-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-emerald-900 font-black text-sm">🚗</div>
            <div>
              <span className="font-bold text-sm">{ar ? 'لوحة السائق' : 'Driver Dashboard'}</span>
              <p className="text-[10px] text-emerald-300">{user?.name || 'Driver'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-emerald-800 px-3 py-1 rounded-lg">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold">{ar ? 'متصل' : 'Online'}</span>
            </div>
            <button onClick={() => { logout(); onNavigate('home'); }}
              className="text-xs bg-emerald-800 hover:bg-emerald-700 px-3 py-1.5 rounded-lg transition">
              🚪 {ar ? 'خروج' : 'Logout'}
            </button>
          </div>
        </div>
      </div>

      <div className="container py-6 px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {driverStats.map((stat, i) => (
            <div key={i} className={`bg-white rounded-xl border border-slate-100 p-4 ${stat.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-2xl font-black">{stat.value}</div>
              <div className="text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'tasks', label: ar ? '📋 المهام' : '📋 Tasks' },
            { key: 'history', label: ar ? '📜 السجل' : '📜 History' },
            { key: 'map', label: ar ? '🗺️ الخريطة' : '🗺️ Map' },
          ].map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === tab.key ? 'bg-emerald-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tasks */}
        {activeTab === 'tasks' && (
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className={`bg-white rounded-2xl border p-5 transition hover:shadow-md ${
                task.status === 'delivered' ? 'border-green-200 bg-green-50/30' :
                task.priority === 'high' ? 'border-amber-200' : 'border-slate-100'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-700 font-mono text-sm">#{task.id}</span>
                      {task.priority === 'high' && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                          {ar ? 'عاجل' : 'URGENT'}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm mt-1">{task.customer}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    task.status === 'delivered' ? 'bg-green-100 text-green-700' :
                    task.status === 'transit' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {task.status === 'delivered' ? (ar ? 'تم التوصيل' : 'Delivered') :
                     task.status === 'transit' ? (ar ? 'جاري التوصيل' : 'In Transit') :
                     (ar ? 'قيد الانتظار' : 'Pending')}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <p className="text-slate-600">📍 {task.address}</p>
                  <p className="text-slate-500">📞 {task.phone}</p>
                  <p className="text-slate-500">📦 {task.items} {ar ? 'عناصر' : 'items'} — {task.total}</p>
                  {task.eta !== '-' && <p className="text-emerald-600 font-semibold">⏰ {ar ? 'الوصول المتوقع:' : 'ETA:'} {task.eta}</p>}
                </div>

                {task.status !== 'delivered' && (
                  <div className="flex gap-2">
                    {task.status === 'pending' && (
                      <button onClick={() => handleStatusChange(task.id, 'transit')}
                        className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition">
                        🚚 {ar ? 'بدء التوصيل' : 'Start Delivery'}
                      </button>
                    )}
                    {task.status === 'transit' && (
                      <button onClick={() => handleStatusChange(task.id, 'delivered')}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs transition">
                        ✅ {ar ? 'تم التوصيل' : 'Mark Delivered'}
                      </button>
                    )}
                    <a href={`tel:${task.phone}`}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition">
                      📞
                    </a>
                    <a href={`https://wa.me/966${task.phone.slice(1)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25D366] hover:bg-[#20b757] text-white font-bold rounded-xl text-xs transition">
                      💬
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <h3 className="font-bold text-emerald-900 mb-4">{ar ? 'سجل التوصيلات' : 'Delivery History'}</h3>
            <div className="space-y-3">
              {tasks.filter(t => t.status === 'delivered').map(task => (
                <div key={task.id} className="flex items-center gap-4 p-3 bg-green-50 rounded-xl">
                  <span className="text-2xl">✅</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm">#{task.id} — {task.customer}</p>
                    <p className="text-xs text-slate-500">{task.address}</p>
                  </div>
                  <span className="text-sm font-bold text-green-700">{task.total}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="bg-white rounded-xl border border-slate-100 p-6 text-center">
            <span className="text-5xl block mb-4">🗺️</span>
            <h3 className="font-bold text-emerald-900 mb-2">{ar ? 'خريطة التوصيل' : 'Delivery Map'}</h3>
            <p className="text-slate-500 text-sm mb-4">{ar ? 'تتبع مسار التوصيل المباشر' : 'Live delivery tracking map'}</p>
            <div className="bg-slate-100 rounded-xl h-64 flex items-center justify-center">
              <p className="text-slate-400">{ar ? 'تتطلب GPS' : 'GPS Required'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
