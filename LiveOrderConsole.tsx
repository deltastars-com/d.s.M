import React, { useState, useEffect, useRef } from 'react';
import { Order, Branch } from '../types';
import { useI18n, useToast, ShoppingBagIcon, CheckCircleIcon, ClockIcon, MapPinIcon, UserIcon, PhoneIcon } from './lib/contexts';
import { motion, AnimatePresence } from 'framer-motion';
import { db, collection, query, onSnapshot, orderBy, updateDoc, doc, handleFirestoreError, OperationType, where, limit, addDoc } from '@/firebase';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AnyMapContainer = MapContainer as any;
const AnyTileLayer = TileLayer as any;
const AnyMarker = Marker as any;
const AnyPopup = Popup as any;
const AnyPolyline = Polyline as any;

import { RefreshCw, Play, Pause, TrendingUp, Layers, Volume2, Compass, Activity, Server, Users, Shield, Map, Eye, CreditCard, Check, AlertCircle, ChevronDown, ChevronUp, Truck, Percent, Tag, ExternalLink, ShieldCheck } from 'lucide-react';

// Fix for default marker icons in React Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Delta Stars 6 Sovereign Branches across Saudi Arabia
const deltaBranches = [
  { id: 'jeddah_hq', nameAr: 'جدة (المركز الرئيسي)', nameEn: 'Jeddah HQ', coords: [21.5433, 39.1728] as [number, number], load: 'High', color: '#059669', activeDrivers: 14, capacity: '92%', phone: '+966 50 123 4567' },
  { id: 'riyadh_branch', nameAr: 'فرع الرياض', nameEn: 'Riyadh Branch', coords: [24.7136, 46.6753] as [number, number], load: 'Balanced', color: '#eab308', activeDrivers: 11, capacity: '81%', phone: '+966 50 234 5678' },
  { id: 'dammam_branch', nameAr: 'فرع الدمام', nameEn: 'Dammam Branch', coords: [26.4207, 50.0888] as [number, number], load: 'Balanced', color: '#3b82f6', activeDrivers: 8, capacity: '75%', phone: '+966 50 345 6789' },
  { id: 'mecca_branch', nameAr: 'فرع مكة المكرمة', nameEn: 'Mecca Branch', coords: [21.4267, 39.8261] as [number, number], load: 'Normal', color: '#8b5cf6', activeDrivers: 7, capacity: '68%', phone: '+966 50 456 7890' },
  { id: 'medina_branch', nameAr: 'فرع المدينة المنورة', nameEn: 'Medina Branch', coords: [24.4672, 39.6111] as [number, number], load: 'High', color: '#ec4899', activeDrivers: 9, capacity: '88%', phone: '+966 50 567 8901' },
  { id: 'taif_branch', nameAr: 'فرع الطائف', nameEn: 'Taif Branch', coords: [21.2639, 40.4072] as [number, number], load: 'Normal', color: '#14b8a6', activeDrivers: 5, capacity: '52%', phone: '+966 50 678 9012' }
];

// Helper component to center map on selection
const MapCenterController = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
};

// Polyfill distance calculation
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Synthesized audio engine using native browser AudioContext
const playSovereignChime = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // First Chime (Warm Gold Tone)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    gain1.gain.setValueAtTime(0.12, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start();
    osc1.stop(audioCtx.currentTime + 0.5);

    // Second Chime (Higher Emerald Tone) after 140ms
    setTimeout(() => {
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
      gain2.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.7);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start();
      osc2.stop(audioCtx.currentTime + 0.7);
    }, 140);
  } catch (e) {
    console.log('Audio Context bypassed.');
  }
};

interface LiveOrderConsoleProps {
  branchId?: string;
}

export const LiveOrderConsole: React.FC<LiveOrderConsoleProps> = ({ branchId }) => {
  const { language, formatCurrency, t } = useI18n();
  const { addToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('all');
  const [mapCenter, setMapCenter] = useState<[number, number]>([23.8859, 45.0792]); // Central KSA
  const [mapZoom, setMapZoom] = useState<number>(5);
  const [autopilot, setAutopilot] = useState<boolean>(false);
  const [autopilotSpeed, setAutopilotSpeed] = useState<'fast' | 'normal' | 'slow'>('normal');
  const [autoDriverDispatch, setAutoDriverDispatch] = useState<boolean>(true);
  const [logs, setLogs] = useState<{ id: string, msg: string, time: Date, type: 'info' | 'success' | 'warn' }[]>([]);
  const [integrationLogs, setIntegrationLogs] = useState<{ id: string; service: string; status: number; text: string; time: string }[]>([]);
  const [driverLocations, setDriverLocations] = useState<Record<string, { lat: number; lng: number; driverName: string; progress: number }>>({});

  const addLog = (msg: string, type: 'info' | 'success' | 'warn' = 'info') => {
    setLogs(prev => [
      { id: Math.random().toString(), msg, time: new Date(), type },
      ...prev.slice(0, 49)
    ]);
  };

  const addIntegrationLog = (service: string, status: number, text: string) => {
    setIntegrationLogs(prev => [
      {
        id: Math.random().toString(),
        service,
        status,
        text,
        time: new Date().toLocaleTimeString()
      },
      ...prev.slice(0, 19)
    ]);
  };

  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  const toggleOrderExpanded = (id: string) => {
    setExpandedOrders(prev => ({ ...prev, [id]: !prev[id] }));
  };


  useEffect(() => {
    // ⚠️ كانت هذه السجلات تُعرض تلقائياً عند فتح الشاشة وكأن كل الأنظمة
    // (ميسر، تويليو، واتساب، أونكس، زاتكا) متصلة ومُصادَق عليها فعلياً،
    // بينما هذا مجرد نص ثابت لا يعكس أي اتصال أو مصادقة حقيقية. تمت إزالتها
    // لتفادي إيهام المستخدم بحالة تكامل غير موجودة فعلياً.
  }, []);

  useEffect(() => {
    const ordersRef = collection(db, 'orders');
    const q = branchId 
      ? query(ordersRef, where('branchId', '==', branchId), orderBy('createdAt', 'desc'), limit(100))
      : query(ordersRef, orderBy('createdAt', 'desc'), limit(100));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Order));
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      if (error.code === 'permission-denied') {
        console.warn('Live Console restricted: Permission denied.');
      } else {
        handleFirestoreError(error, OperationType.GET, 'orders_live');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [branchId]);

  // Autopilot Intelligent Router Loop
  useEffect(() => {
    if (!autopilot) return;

    addLog(
      language === 'ar' 
        ? `تم تنشيط خوارزمية التوزيع والتوجيه التلقائي بوضع: ${autopilotSpeed === 'fast' ? 'الأقصى' : autopilotSpeed === 'normal' ? 'الاعتيادي' : 'المتأني'}` 
        : `Autopilot intelligent routing activated in ${autopilotSpeed} mode`, 
      'success'
    );

    const speedMs = autopilotSpeed === 'fast' ? 4000 : autopilotSpeed === 'normal' ? 10000 : 25000;

    const interval = setInterval(async () => {
      // 1. Look for oldest pending order
      const pending = orders.find(o => o.status === 'pending');
      
      if (pending) {
        addLog(
          language === 'ar' 
            ? `جاري معالجة الطلب رقم #${pending.id.slice(-6)} جغرافياً لتحديد أقرب فرع ومندوب...` 
            : `Geolocating order #${pending.id.slice(-6)} to calculate optimal branch...`, 
          'info'
        );

        // Approximate coordinates or default to Riyadh/Jeddah
        const customerLat = pending.latitude || (24.7136 + (Math.random() - 0.5) * 0.5);
        const customerLng = pending.longitude || (46.6753 + (Math.random() - 0.5) * 0.5);

        // Calculate closest branch
        let closestBranch = deltaBranches[0];
        let minDistance = Infinity;

        deltaBranches.forEach(br => {
          const dist = calculateDistance(customerLat, customerLng, br.coords[0], br.coords[1]);
          if (dist < minDistance) {
            minDistance = dist;
            closestBranch = br;
          }
        });

        // Auto-assign and start prep
        try {
          // Select mock driver if auto dispatch is enabled
          let driverDetails: any = {};
          if (autoDriverDispatch) {
            const mockDrivers = [
              { name: 'مشعل العتيبي', phone: '+966 54 883 9102' },
              { name: 'فهد القحطاني', phone: '+966 56 124 9382' },
              { name: 'خالد الحربي', phone: '+966 55 920 4821' },
              { name: 'ريان الغامدي', phone: '+966 53 741 8392' }
            ];
            const assignedDriver = mockDrivers[Math.floor(Math.random() * mockDrivers.length)];
            driverDetails = {
              driverId: 'drv_auto_' + Math.floor(1000 + Math.random() * 9000),
              driverName: assignedDriver.name,
              driverPhone: assignedDriver.phone,
              assignedDriverId: 'driver-default'
            };
          }

          const targetStatus = autoDriverDispatch ? 'shipped' : 'preparing';

          await updateDoc(doc(db, 'orders', pending.id), {
            status: targetStatus,
            branchId: closestBranch.id,
            updatedAt: new Date().toISOString(),
            ...driverDetails
          });

          // Create notification for branch
          await addDoc(collection(db, 'notifications'), {
            title_ar: `توجيه تلقائي ذكي 🤖 - فرع ${closestBranch.nameAr}`,
            title_en: `Autopilot Smart Route 🤖 - Branch ${closestBranch.nameEn}`,
            message_ar: `تم توجيه الطلب رقم #${pending.id.slice(-6)} تلقائياً لفرعكم كونه الأقرب مسافة (${minDistance.toFixed(1)} كم)`,
            message_en: `Order #${pending.id.slice(-6)} auto-routed to your branch (Closest: ${minDistance.toFixed(1)} km)`,
            type: 'order',
            orderId: pending.id,
            status: 'unread',
            createdAt: new Date().toISOString(),
            branchId: closestBranch.id,
            metadata: { sound: 'autopilot_routing', priority: 'high' }
          });

          // ⚠️ ملاحظة أمانة: الأسطر التالية كانت تعرض رسائل "نجاح" ثابتة بالكود
          // (تحقق ميسر، ختم زاتكا وتوقيع رقمي، إرسال SMS/واتساب) دون أي اتصال
          // API حقيقي فعلياً. هذا كان يخدع لوحة التحكم لتوحي بتكامل تام غير
          // موجود. تم استبدالها بسجلّ داخلي صريح لا يدّعي تأكيد أي طرف خارجي:
          addIntegrationLog('نظام التوجيه الداخلي', 200, `تم تحديث حالة الطلب #${pending.id.slice(-6)} داخلياً إلى "${targetStatus === 'shipped' ? 'تم الشحن' : 'قيد التجهيز'}". لم يتم التحقق من أي بوابة دفع أو ضريبة خارجية بعد.`);

          playSovereignChime();
          addLog(
            language === 'ar'
              ? `تم ربط الطلب #${pending.id.slice(-6)} بـ ${closestBranch.nameAr} مسافة: ${minDistance.toFixed(1)} كم`
              : `Order #${pending.id.slice(-6)} mapped to ${closestBranch.nameEn} (Distance: ${minDistance.toFixed(1)} km)`,
            'success'
          );

          addToast(
            language === 'ar'
              ? `الطيار الآلي: تم توجيه طلب ${pending.customerName} إلى فرع ${closestBranch.nameAr}`
              : `Autopilot: Routed order to ${closestBranch.nameEn}`,
            'success'
          );

        } catch (err) {
          console.error('Autopilot route failed', err);
        }
      } else {
        // لا يوجد طلبات معلقة حقيقية - لا نولّد بيانات وهمية.
        // (تمت إزالة مولّد الطلبات التجريبية الذي كان يكتب مستندات مزيفة
        // مباشرة في مجموعة orders الحقيقية على Firestore، ما يلوّث بيانات
        // المتجر الفعلية بطلبات وهمية دائمة.)
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, [autopilot, autopilotSpeed, autoDriverDispatch, orders, language]);

  // تقدير بصري تقريبي لموقع المندوب على الخريطة (استيفاء خطي بين الفرع
  // والعميل حسب الوقت المنقضي) — لأغراض العرض المرئي فقط، وليس تتبع GPS
  // حقيقي بعد. لربط موقع فعلي حقيقي، هذا الجزء يحتاج الاشتراك ببث الموقع
  // الحقيقي من تطبيق المندوب عبر gpsTrackingService.ts + قناة realtime
  // (نفس نمط FleetRadar.tsx)، بدل هذا الاستيفاء الزمني الافتراضي.
  useEffect(() => {
    const interval = setInterval(() => {
      const activeOrders = orders.filter(o => (o.status === 'preparing' || o.status === 'shipped') && o.latitude && o.longitude && o.branchId);
      if (activeOrders.length === 0) return;

      setDriverLocations(prev => {
        const next = { ...prev };
        activeOrders.forEach(async (order) => {
          const branchObj = deltaBranches.find(b => b.id === order.branchId);
          if (!branchObj) return;

          const branchCoords = branchObj.coords;
          const customerCoords = [order.latitude!, order.longitude!];

          let progress = 0;
          let driverName = order.driverName || (language === 'ar' ? 'سائق دلتا ستارز' : 'Delta Captain');

          if (next[order.id]) {
            progress = next[order.id].progress + 0.1;
          } else {
            progress = 0.1;
          }

          if (progress >= 1) {
            progress = 1;
            // ⚠️ تم حذف التحديث التلقائي لحالة الطلب إلى "تم التسليم" هنا،
            // لأنه كان يعتمد فقط على عداد توقيت وهمي (10 دقات) وليس تأكيداً
            // حقيقياً من السائق أو GPS فعلي أو توقيع العميل. تحديث حالة
            // "تم التسليم" يجب أن يتم فقط من تأكيد صريح من المندوب نفسه
            // (زر تسليم في تطبيق المندوب) أو تأكيد العميل.
          }

          const currentLat = branchCoords[0] + (customerCoords[0] - branchCoords[0]) * progress;
          const currentLng = branchCoords[1] + (customerCoords[1] - branchCoords[1]) * progress;

          next[order.id] = {
            lat: currentLat,
            lng: currentLng,
            driverName,
            progress
          };
        });
        return next;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [orders, language]);

  const handleUpdateStatus = async (orderId: string, status: Order['status'], customBranchId?: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { 
        status,
        ...(customBranchId ? { branchId: customBranchId } : {}),
        updatedAt: new Date().toISOString()
      });

      addLog(`Order #${orderId.slice(-6)} state updated to: ${status}`, 'info');
      playSovereignChime();

      if (status === 'preparing') {
        const order = orders.find(o => o.id === orderId);
        const branchName = customBranchId 
          ? (deltaBranches.find(b => b.id === customBranchId)?.nameAr || 'الرئيسي')
          : (order?.branchId || 'الرئيسي');
        
        await addDoc(collection(db, 'notifications'), {
          title_ar: `طلب جديد لتجهيزه - فرع ${branchName}`,
          title_en: `New Order for Prep - Branch ${branchName}`,
          message_ar: `الرجاء البدء في تجهيز الطلب رقم #${orderId.slice(-6)} فوراً في فرع ${branchName}`,
          message_en: `Please start preparing order #${orderId.slice(-6)} immediately at ${branchName}`,
          type: 'order',
          orderId,
          status: 'unread',
          createdAt: new Date().toISOString(),
          branchId: customBranchId || order?.branchId || 'all',
          metadata: { sound: 'alert_new_order', priority: 'high' }
        });

        addToast(
          language === 'ar' 
            ? `تم تأكيد التوجيه وتوزيع الطلب لفرع ${branchName}` 
            : `Order dispatched to branch ${branchName} successfully`, 
          'success'
        );
      }
    } catch (err) {
      addToast(t('admin.userManagement.updateFailed'), 'error');
    }
  };

  // Filter orders by chosen branch
  const filteredOrders = selectedBranchId === 'all'
    ? orders
    : orders.filter(o => o.branchId === selectedBranchId);

  const pendingOrders = filteredOrders.filter(o => o.status === 'pending');
  const processingOrders = filteredOrders.filter(o => o.status === 'preparing');
  const completedOrders = filteredOrders.filter(o => o.status === 'delivered');

  const customBranchIcon = (color: string) => L.divIcon({
    html: `<div style="background:${color}; border: 3px solid #ffffff; box-shadow: 0 0 15px ${color}88;" class="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-black animate-pulse">🏢</div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  return (
    <div className="space-y-8 animate-fade-in text-right" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Upper Control Bar */}
      <div className="bg-gradient-to-l from-slate-950 via-slate-900 to-slate-950 text-white p-8 md:p-12 rounded-[4rem] shadow-sovereign border-b-4 border-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(5,150,105,0.08),transparent_50%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20 text-xs font-bold">
              <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
              <span>{language === 'ar' ? 'الشبكة السيادية الموحدة' : 'Sovereign Unified Network'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black">
              {language === 'ar' ? 'كنترول استقبال وإدارة الطلبات المباشرة' : 'Direct Orders Control & Dispatch Hub'} 📡
            </h2>
            <p className="text-gray-400 font-bold text-sm">
              {language === 'ar' 
                ? 'توزيع وتتبع فوري للطلبات بين فروع الشركة الستة (جدة، الرياض، الدمام، مكة، المدينة، الطائف) مع خوارزمية التوجيه الذكي ومراقبة جغرافية حية.'
                : 'Real-time multi-branch dispatching with Leaflet GPS tracking & intelligent routing.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            {/* Autopilot Button */}
            <button
              onClick={() => {
                setAutopilot(!autopilot);
                playSovereignChime();
              }}
              className={`px-8 py-4 rounded-3xl font-black text-sm transition-all shadow-lg flex items-center gap-3 border ${
                autopilot
                  ? 'bg-primary text-white border-primary/40 hover:brightness-110'
                  : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
              }`}
            >
              <Compass className={`w-5 h-5 ${autopilot ? 'animate-spin' : ''}`} />
              <span>{autopilot ? (language === 'ar' ? 'إيقاف التوجيه الآلي' : 'Disable Autopilot') : (language === 'ar' ? 'تفعيل التوجيه الآلي الذكي' : 'Enable Autopilot Router')}</span>
            </button>

            {/* Quick Refresh */}
            <button
              onClick={() => {
                playSovereignChime();
                addToast(language === 'ar' ? 'تم تحديث الاتصال الشبكي' : 'Live state refreshed', 'success');
              }}
              className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-Branch Metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10 pt-8 border-t border-white/5 text-right">
          {deltaBranches.map(br => {
            const isSelected = selectedBranchId === br.id;
            return (
              <button
                key={br.id}
                onClick={() => {
                  setSelectedBranchId(br.id);
                  setMapCenter(br.coords);
                  setMapZoom(11);
                  playSovereignChime();
                }}
                className={`p-4 rounded-3xl text-right transition-all border ${
                  isSelected 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.03]' 
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-black truncate">{language === 'ar' ? br.nameAr : br.nameEn}</span>
                  <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: br.color }} />
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-white/50">{language === 'ar' ? 'مندوبين:' : 'Drivers:'} {br.activeDrivers}</span>
                  <span className="text-sm font-black">{br.capacity}</span>
                </div>
              </button>
            );
          })}
            <button
              onClick={() => {
                setSelectedBranchId('all');
                setMapCenter([23.8859, 45.0792]);
                setMapZoom(5);
                playSovereignChime();
              }}
              className={`p-4 rounded-3xl text-center transition-all border ${
                selectedBranchId === 'all' 
                  ? 'bg-secondary text-slate-900 border-secondary shadow-lg shadow-secondary/20 scale-[1.03]' 
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              }`}
            >
              <span className="text-xs font-black block mb-1">{language === 'ar' ? 'عرض كافة الفروع' : 'Show All Branches'}</span>
              <span className="text-sm font-black block">6 {language === 'ar' ? 'فروع نشطة' : 'Active Branches'}</span>
            </button>
        </div>
      </div>

      {/* Main Grid: Map & Order Queue */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: Map & Live Systems Logs */}
        <div className="xl:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-[3.5rem] border-2 border-slate-100 shadow-xl overflow-hidden relative group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                <Map className="w-5 h-5 text-primary" />
                <span>{language === 'ar' ? 'رادار تتبع العمليات الجغرافي' : 'GPS Operations Radar'}</span>
              </h3>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black">
                {language === 'ar' ? 'بث حي ومباشر' : 'Live Stream'}
              </span>
            </div>

            {/* Live Leaflet Map Container */}
            <div className="h-[300px] w-full rounded-[2rem] overflow-hidden shadow-inner border border-slate-200 relative z-10">
              <AnyMapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <AnyTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapCenterController center={mapCenter} zoom={mapZoom} />
                
                {/* Branches Markers */}
                {deltaBranches.map(br => (
                  <AnyMarker 
                    key={br.id} 
                    position={br.coords} 
                    icon={customBranchIcon(br.color)}
                  >
                    <AnyPopup className="font-tajawal text-right">
                      <div className="p-2 space-y-1">
                        <p className="font-black text-primary text-sm">{language === 'ar' ? br.nameAr : br.nameEn}</p>
                        <p className="text-xs font-bold text-gray-500">حالة الحمل: {br.load}</p>
                        <p className="text-xs font-bold text-gray-500">طاقة الفرع: {br.capacity}</p>
                        <p className="text-xs font-bold text-gray-500">هاتف الفرع: {br.phone}</p>
                      </div>
                    </AnyPopup>
                  </AnyMarker>
                ))}

                {/* Draw Route Polyline from Branch to Customer for active/shipped orders */}
                {filteredOrders.filter(o => o.latitude && o.longitude && o.branchId).map(order => {
                  const branchObj = deltaBranches.find(b => b.id === order.branchId);
                  if (!branchObj) return null;
                  return (
                    <AnyPolyline
                      key={`route-${order.id}`}
                      positions={[branchObj.coords, [order.latitude!, order.longitude!]]}
                      pathOptions={{
                        color: branchObj.color,
                        weight: 3.5,
                        dashArray: '10, 10',
                        opacity: 0.75
                      }}
                    />
                  );
                })}

                {/* Simulated Order Markers in active filtered queue */}
                {filteredOrders.filter(o => o.latitude && o.longitude).map(order => (
                  <AnyMarker
                    key={order.id}
                    position={[order.latitude!, order.longitude!]}
                    icon={L.divIcon({
                      html: `<div class="relative w-8 h-8 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center text-xs animate-bounce shadow-lg">📦</div>`,
                      className: '',
                      iconSize: [32, 32],
                      iconAnchor: [16, 16]
                    })}
                  >
                    <AnyPopup className="font-tajawal text-right">
                      <div className="p-2">
                        <p className="font-black text-slate-800 text-xs">{order.customerName}</p>
                        <p className="text-[10px] text-gray-500 font-bold">الحالة: {order.status}</p>
                        <p className="text-[10px] text-primary font-black">القيمة: {formatCurrency(order.total)}</p>
                      </div>
                    </AnyPopup>
                  </AnyMarker>
                ))}

                {/* Simulated Live Moving Drivers / Delivery Captains */}
                {Object.entries(driverLocations).map(([orderId, loc]) => {
                  const orderObj = orders.find(o => o.id === orderId);
                  if (!orderObj || orderObj.status === 'delivered') return null;
                  return (
                    <AnyMarker
                      key={`driver-${orderId}`}
                      position={[loc.lat, loc.lng]}
                      icon={L.divIcon({
                        html: `<div style="background: #059669; border: 2px solid #ffffff; box-shadow: 0 0 10px rgba(5,150,105,0.6);" class="w-9 h-9 rounded-full flex items-center justify-center text-white text-base animate-pulse">🚛</div>`,
                        className: '',
                        iconSize: [36, 36],
                        iconAnchor: [18, 18]
                      })}
                    >
                      <AnyPopup className="font-tajawal text-right">
                        <div className="p-2">
                          <p className="font-black text-slate-800 text-xs">{loc.driverName}</p>
                          <p className="text-[10px] text-emerald-600 font-bold">التوصيل جاري: {Math.round(loc.progress * 100)}%</p>
                          <p className="text-[10px] text-gray-500">للعميل: {orderObj.customerName}</p>
                        </div>
                      </AnyPopup>
                    </AnyMarker>
                  );
                })}
              </AnyMapContainer>
            </div>
          </div>

          {/* Advanced Systems Integration & Automation Panel */}
          <div className="bg-white p-6 rounded-[3.5rem] border-2 border-slate-100 shadow-xl overflow-hidden relative">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>{language === 'ar' ? 'التحكم المتقدم ومحاكاة الأنظمة' : 'Advanced Automation Panel'}</span>
                </h3>
                <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-1 rounded-full font-black">
                  {language === 'ar' ? 'بروتوكول دلتا' : 'Sovereign V2'}
                </span>
              </div>

              {/* Automation Speed Controls */}
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-700">⚙️ {language === 'ar' ? 'سرعة توجيه الطيار الآلي:' : 'Autopilot Router Speed:'}</p>
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                  {(['fast', 'normal', 'slow'] as const).map((speed) => (
                    <button
                      key={speed}
                      onClick={() => {
                        setAutopilotSpeed(speed);
                        playSovereignChime();
                        addToast(
                          language === 'ar' 
                            ? `تم تغيير سرعة الطيار الآلي إلى: ${speed === 'fast' ? 'فوري (4ث)' : speed === 'normal' ? 'معتدل (10ث)' : 'متأني (25ث)'}`
                            : `Autopilot speed set to ${speed}`, 
                          'info'
                        );
                      }}
                      className={`py-1.5 rounded-xl text-xs font-black transition-all ${
                        autopilotSpeed === speed
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {speed === 'fast' ? (language === 'ar' ? 'فوري' : 'Fast') :
                       speed === 'normal' ? (language === 'ar' ? 'اعتيادي' : 'Normal') :
                       (language === 'ar' ? 'متأني' : 'Slow')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Dispatch Switches */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-black text-slate-700">{language === 'ar' ? 'التوجيه المباشر للمناديب' : 'Auto Driver'}</span>
                  <button
                    onClick={() => {
                      setAutoDriverDispatch(!autoDriverDispatch);
                      playSovereignChime();
                    }}
                    className={`w-10 h-6 rounded-full p-1 transition-all ${
                      autoDriverDispatch ? 'bg-primary' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-all ${
                      autoDriverDispatch ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[11px] font-black text-slate-700">{language === 'ar' ? 'إقرار الزكاة والضريبة' : 'ZATCA Stamping'}</span>
                  <div className="w-10 h-6 rounded-full bg-primary p-1">
                    <div className="w-4 h-4 bg-white rounded-full translate-x-4" />
                  </div>
                </div>
              </div>

              {/* Integrated Gateways Telemetry Stream */}
              <div className="space-y-2 mt-2">
                <div className="flex justify-between items-center text-xs font-black text-slate-700">
                  <span>📡 {language === 'ar' ? 'تيليمتري ربط بوابات الـ API:' : 'API Gateway Streams:'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl font-mono text-[10px] text-emerald-400 h-[150px] overflow-y-auto space-y-2 border border-slate-800 scrollbar-thin scrollbar-thumb-slate-800">
                  {integrationLogs.map((item) => (
                    <div key={item.id} className="border-b border-slate-900 pb-1.5 last:border-0">
                      <div className="flex justify-between text-[9px] text-slate-500 font-bold mb-0.5">
                        <span>{item.service}</span>
                        <span className="text-emerald-500">[{item.status} OK] - {item.time}</span>
                      </div>
                      <p className="text-white font-medium break-all leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Real-time System Audit log */}
          <div className="bg-slate-950 text-slate-300 p-8 rounded-[3rem] shadow-2xl border-t-4 border-secondary overflow-hidden relative">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
              <h4 className="font-black text-white text-base flex items-center gap-2">
                <Server className="w-5 h-5 text-secondary" />
                <span>{language === 'ar' ? 'سجل العمليات والشبكة' : 'Operations Logs'}</span>
              </h4>
              <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            </div>

            <div className="h-[250px] overflow-y-auto space-y-3 font-mono text-[11px] text-right scrollbar-thin scrollbar-thumb-white/10">
              {logs.length === 0 ? (
                <p className="text-slate-600 font-bold py-10 text-center">{language === 'ar' ? 'لا يوجد سجلات حتى الآن...' : 'Listening for telemetry logs...'}</p>
              ) : (
                logs.map(log => (
                  <div key={log.id} className="border-b border-white/5 pb-2">
                    <div className="flex justify-between text-white/40 mb-1">
                      <span>[{log.time.toLocaleTimeString()}]</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        log.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                        log.type === 'warn' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {log.type.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white font-bold leading-relaxed">{log.msg}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Center/Right: Order queues (Pending & Preparing) */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pending Queue */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-primary flex items-center gap-3 px-4">
              <ClockIcon className="w-6 h-6 text-secondary animate-pulse" />
              <span>{t('admin.liveConsole.awaiting')}</span>
              <span className="px-3 py-1 bg-secondary/15 text-secondary text-xs rounded-full font-black">
                {pendingOrders.length}
              </span>
            </h3>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {pendingOrders.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200"
                  >
                    <ShoppingBagIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-black">{t('admin.liveConsole.noNew')}</p>
                  </motion.div>
                ) : (
                  pendingOrders.map(order => {
                    const branchObj = deltaBranches.find(b => b.id === order.branchId);
                    const isExpanded = expandedOrders[order.id] || false;
                    
                    const statusSteps = [
                      { id: 'pending', labelAr: 'بانتظار القبول', labelEn: 'Awaiting' },
                      { id: 'preparing', labelAr: 'تحت التجهيز', labelEn: 'Preparing' },
                      { id: 'shipped', labelAr: 'قيد التوصيل', labelEn: 'Dispatched' },
                      { id: 'delivered', labelAr: 'تم التسليم', labelEn: 'Delivered' }
                    ];
                    const currentStepIndex = statusSteps.findIndex(s => s.id === order.status);
                    
                    const payMethod = order.paymentMethod || 'cod';
                    const payStatus = order.paymentStatus || 'pending';
                    const txnId = order.trackingNumber || '';

                    return (
                      <motion.div
                        key={order.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -100 }}
                        className="bg-white p-6 rounded-[3rem] shadow-xl border-2 border-slate-100 hover:shadow-2xl hover:border-slate-200 transition-all relative overflow-hidden text-right"
                      >
                        <div className={`absolute top-0 right-0 w-2.5 h-full bg-amber-500`} />

                        <div className="flex justify-between items-start mb-4 pr-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1 rounded-full uppercase tracking-wider">
                                #{order.id.slice(-6).toUpperCase()}
                              </span>
                              
                              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                                payStatus === 'paid' 
                                  ? 'bg-emerald-50 text-emerald-600 border-emerald-500/20' 
                                  : 'bg-amber-50 text-amber-600 border-amber-500/20'
                              }`}>
                                <CreditCard className="w-3 h-3 shrink-0" />
                                <span>
                                  {payStatus === 'paid' 
                                    ? (language === 'ar' ? 'مسدد ومؤكد' : 'Paid & Confirmed') 
                                    : (language === 'ar' ? 'بانتظار الدفع' : 'Awaiting Auth')}
                                </span>
                              </span>
                            </div>
                            
                            <h4 className="text-xl font-black text-slate-800 leading-tight mb-1">{order.customerName}</h4>
                            <div className="flex items-center gap-2 text-slate-500 text-xs">
                              <PhoneIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                              <span className="font-mono">{order.customerPhone}</span>
                              <a 
                                href={`https://wa.me/${order.customerPhone.replace(/\s+/g, '')}`} 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-[10px] text-emerald-500 font-bold hover:underline"
                              >
                                (واتساب)
                              </a>
                            </div>
                          </div>

                          <div className="text-left">
                            <p className="text-2xl font-black text-primary font-tajawal">{formatCurrency(order.total)}</p>
                            <p className="text-[10px] text-gray-400 font-bold">{new Date(order.createdAt).toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 mb-4 text-xs font-bold text-slate-600 text-right">
                          <div className="flex items-start gap-2">
                            <MapPinIcon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{order.address || (language === 'ar' ? 'لم يتم تحديد العنوان بدقة' : 'No address specified')}</span>
                          </div>
                          {order.latitude && order.longitude && (
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono">
                              <span>GPS Coordinates: {order.latitude.toFixed(5)}, {order.longitude.toFixed(5)}</span>
                            </div>
                          )}
                        </div>

                        {/* Interactive progress steps tracker */}
                        <div className="my-6 px-2">
                          <div className="flex items-center justify-between relative mb-2">
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />
                            <div 
                              className="absolute top-1/2 right-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                              style={{ 
                                width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
                                right: language === 'ar' ? 0 : 'auto',
                                left: language === 'ar' ? 'auto' : 0
                              }}
                            />

                            {statusSteps.map((step, idx) => {
                              const isDone = idx <= currentStepIndex;
                              const isCurrent = idx === currentStepIndex;
                              return (
                                <div key={step.id} className="flex flex-col items-center relative z-10">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                    isDone 
                                      ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/25' 
                                      : 'bg-white text-slate-400 border-2 border-slate-200'
                                  } ${isCurrent ? 'ring-4 ring-primary/20 animate-pulse' : ''}`}>
                                    {isDone ? (
                                      <Check className="w-4 h-4" />
                                    ) : (
                                      <span className="text-[10px] font-black">{idx + 1}</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="flex justify-between text-[10px] font-black text-slate-500 px-1">
                            {statusSteps.map((step, idx) => {
                              const isDone = idx <= currentStepIndex;
                              return (
                                <span key={step.id} className={isDone ? 'text-primary font-black' : ''}>
                                  {language === 'ar' ? step.labelAr : step.labelEn}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Moyasar Bank Authorization / Gateway */}
                        <div className="border border-slate-100 bg-gradient-to-r from-slate-50 to-white p-4 rounded-2xl mb-4 text-right">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-5 h-5 text-emerald-600" />
                              <div className="text-right">
                                <p className="text-xs font-black text-slate-700">
                                  {language === 'ar' ? 'بوابة ميسر للمدفوعات السعودية' : 'Moyasar Saudi Payment Gateway'}
                                </p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">
                                  {payMethod === 'cod' ? (language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery') : `Gateway: ${payMethod}`}
                                </p>
                              </div>
                            </div>

                            {payStatus === 'paid' ? (
                              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-600 rounded-full text-[10px] font-black flex items-center gap-1 animate-pulse">
                                <Check className="w-3 h-3" />
                                {language === 'ar' ? 'معتمد ومقبول' : 'Authorized'}
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-amber-500/15 text-amber-600 rounded-full text-[10px] font-black flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {language === 'ar' ? 'بانتظار الدفع' : 'Pending Auth'}
                              </span>
                            )}
                          </div>

                          {txnId && (
                            <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[10px] font-mono text-gray-400">
                              <span>{language === 'ar' ? 'رقم التفويض البنكي:' : 'Bank Auth Ref:'}</span>
                              <span className="font-bold text-slate-600">{txnId}</span>
                            </div>
                          )}
                        </div>

                        {/* Collapsible Invoice details */}
                        <div className="border border-slate-100 rounded-2xl overflow-hidden mb-4">
                          <button
                            type="button"
                            onClick={() => toggleOrderExpanded(order.id)}
                            className="w-full flex justify-between items-center p-3 bg-slate-50 hover:bg-slate-100 transition-all text-xs font-black text-slate-700"
                          >
                            <div className="flex items-center gap-1.5">
                              <span>{language === 'ar' ? 'تفاصيل فاتورة العميل والتنزيلات' : 'Invoice Details & Deductions'}</span>
                              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded">
                                {order.items?.length || 0} {language === 'ar' ? 'منتجات' : 'items'}
                              </span>
                            </div>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                          </button>

                          {isExpanded && (
                            <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-xs text-right">
                              <div className="space-y-2 border-b border-slate-100 pb-3">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-slate-700 font-bold">
                                    <span>
                                      {language === 'ar' ? item.name_ar : item.name_en}
                                      <span className="text-gray-400 mx-1">x{item.quantity}</span>
                                    </span>
                                    <span className="font-mono text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="space-y-1.5 text-slate-500 font-bold">
                                <div className="flex justify-between">
                                  <span>{language === 'ar' ? 'المجموع الفرعي الفعلي:' : 'Calculated Subtotal:'}</span>
                                  <span className="font-mono text-slate-800">
                                    {formatCurrency(order.subtotal || order.total - (order.deliveryFee || 0) + (order.discount || 0))}
                                  </span>
                                </div>
                                
                                {order.discount && order.discount > 0 ? (
                                  <div className="flex justify-between text-red-500">
                                    <span className="flex items-center gap-1">
                                      <Tag className="w-3 h-3 shrink-0" />
                                      {language === 'ar' ? 'خصم الكوبون الشرائي:' : 'Applied Coupon Promo:'}
                                    </span>
                                    <span className="font-mono">- {formatCurrency(order.discount)}</span>
                                  </div>
                                ) : null}

                                {order.cashback && order.cashback > 0 ? (
                                  <div className="flex justify-between text-red-500">
                                    <span className="flex items-center gap-1">
                                      <Percent className="w-3 h-3 shrink-0" />
                                      {language === 'ar' ? 'خصم رصيد الكاش باك:' : 'Cashback Wallet Discount:'}
                                    </span>
                                    <span className="font-mono">- {formatCurrency(order.cashback)}</span>
                                  </div>
                                ) : null}

                                <div className="flex justify-between">
                                  <span>{language === 'ar' ? 'رسوم الشحن والتوصيل للفرع:' : 'Branch Delivery Charge:'}</span>
                                  <span className="font-mono text-slate-800">
                                    {order.deliveryFee && order.deliveryFee > 0 
                                      ? `+ ${formatCurrency(order.deliveryFee)}` 
                                      : (language === 'ar' ? 'مجاني (سلة فوق ٢٠٠ ريال)' : 'FREE')}
                                  </span>
                                </div>

                                <div className="flex justify-between pt-2 border-t border-dashed border-slate-200 text-sm font-black text-primary">
                                  <span>{language === 'ar' ? 'القيمة الإجمالية المخصومة والمسددة:' : 'Final Net Deducted Total:'}</span>
                                  <span className="font-mono">{formatCurrency(order.total)}</span>
                                </div>
                              </div>

                              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-gray-400">
                                <span>{language === 'ar' ? 'مستودع المعالجة السيادي للطلب:' : 'Sovereign Processing Depot:'}</span>
                                <span className="font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                                  {language === 'ar' ? branchObj?.nameAr || 'المركز الرئيسي - جدة' : branchObj?.nameEn || 'Jeddah HQ'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Routing Controls */}
                        <div className="space-y-3">
                          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-right">
                            <p className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-wider">
                              {language === 'ar' ? 'توجيه يدوي لمستودع محدد:' : 'Dispatch manually to warehouse:'}
                            </p>
                            <div className="grid grid-cols-3 gap-1.5">
                              {deltaBranches.map(br => (
                                <button
                                  key={br.id}
                                  type="button"
                                  onClick={() => handleUpdateStatus(order.id, 'preparing', br.id)}
                                  className={`px-1.5 py-1.5 rounded-xl text-[9px] font-black transition-all truncate border ${
                                    order.branchId === br.id
                                      ? 'bg-primary text-white border-primary'
                                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                                  }`}
                                >
                                  {language === 'ar' ? br.nameAr.replace('فرع ', '') : br.nameEn}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button 
                              type="button"
                              onClick={() => handleUpdateStatus(order.id, 'preparing')}
                              className="flex-1 bg-primary hover:bg-emerald-600 text-white py-3 rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-1 text-xs"
                            >
                              <CheckCircleIcon className="w-4 h-4" />
                              <span>{language === 'ar' ? 'قبول وبدء التجهيز' : 'Accept & Prepare'}</span>
                            </button>
                            
                            <button 
                              type="button"
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              className="px-4 py-3 bg-red-50 text-red-500 rounded-2xl font-black hover:bg-red-500 hover:text-white transition-all text-xs border border-red-100"
                            >
                              {language === 'ar' ? 'رفض' : 'Reject'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Preparing Queue */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-primary flex items-center gap-3 px-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
              <span>{t('admin.liveConsole.inPrep')}</span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-black">
                {processingOrders.length}
              </span>
            </h3>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {processingOrders.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200"
                  >
                    <p className="text-gray-400 font-black">{t('admin.liveConsole.noPrep')}</p>
                  </motion.div>
                ) : (
                  processingOrders.map(order => {
                    const branchObj = deltaBranches.find(b => b.id === order.branchId);
                    const isExpanded = expandedOrders[order.id] || false;
                    
                    const statusSteps = [
                      { id: 'pending', labelAr: 'بانتظار القبول', labelEn: 'Awaiting' },
                      { id: 'preparing', labelAr: 'تحت التجهيز', labelEn: 'Preparing' },
                      { id: 'shipped', labelAr: 'قيد التوصيل', labelEn: 'Dispatched' },
                      { id: 'delivered', labelAr: 'تم التسليم', labelEn: 'Delivered' }
                    ];
                    const currentStepIndex = statusSteps.findIndex(s => s.id === order.status);
                    
                    const payMethod = order.paymentMethod || 'cod';
                    const payStatus = order.paymentStatus || 'pending';
                    const txnId = order.trackingNumber || '';

                    return (
                      <motion.div
                        key={order.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-[3rem] shadow-xl border-2 border-slate-100 hover:shadow-2xl hover:border-slate-200 transition-all relative overflow-hidden text-right"
                      >
                        <div className={`absolute top-0 right-0 w-2.5 h-full bg-primary`} />

                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-primary/5 rounded-full flex items-center justify-center">
                              <UserIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-right">
                              <h4 className="font-black text-slate-800 text-base leading-tight">{order.customerName}</h4>
                              <p className="text-[10px] text-gray-400 font-bold">#{order.id.slice(-6).toUpperCase()}</p>
                            </div>
                          </div>
                          
                          <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black border border-emerald-500/10 animate-pulse">
                            {language === 'ar' ? `فرع: ${branchObj?.nameAr || 'الرئيسي'}` : `Branch: ${branchObj?.nameEn || 'HQ'}`}
                          </span>
                        </div>

                        {/* Interactive progress steps tracker */}
                        <div className="my-6 px-2">
                          <div className="flex items-center justify-between relative mb-2">
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0" />
                            <div 
                              className="absolute top-1/2 right-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                              style={{ 
                                width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
                                right: language === 'ar' ? 0 : 'auto',
                                left: language === 'ar' ? 'auto' : 0
                              }}
                            />

                            {statusSteps.map((step, idx) => {
                              const isDone = idx <= currentStepIndex;
                              const isCurrent = idx === currentStepIndex;
                              return (
                                <div key={step.id} className="flex flex-col items-center relative z-10">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                                    isDone 
                                      ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/25' 
                                      : 'bg-white text-slate-400 border-2 border-slate-200'
                                  } ${isCurrent ? 'ring-4 ring-primary/20 animate-pulse' : ''}`}>
                                    {isDone ? (
                                      <Check className="w-4 h-4" />
                                    ) : (
                                      <span className="text-[10px] font-black">{idx + 1}</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          <div className="flex justify-between text-[10px] font-black text-slate-500 px-1">
                            {statusSteps.map((step, idx) => {
                              const isDone = idx <= currentStepIndex;
                              return (
                                <span key={step.id} className={isDone ? 'text-primary font-black' : ''}>
                                  {language === 'ar' ? step.labelAr : step.labelEn}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        {/* Moyasar Bank Authorization / Gateway */}
                        <div className="border border-slate-100 bg-gradient-to-r from-slate-50 to-white p-4 rounded-2xl mb-4 text-right">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <ShieldCheck className="w-5 h-5 text-emerald-600" />
                              <div className="text-right">
                                <p className="text-xs font-black text-slate-700">
                                  {language === 'ar' ? 'بوابة ميسر للمدفوعات السعودية' : 'Moyasar Saudi Payment Gateway'}
                                </p>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">
                                  {payMethod === 'cod' ? (language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery') : `Gateway: ${payMethod}`}
                                </p>
                              </div>
                            </div>

                            {payStatus === 'paid' ? (
                              <span className="px-3 py-1 bg-emerald-500/15 text-emerald-600 rounded-full text-[10px] font-black flex items-center gap-1 animate-pulse">
                                <Check className="w-3 h-3" />
                                {language === 'ar' ? 'معتمد ومقبول' : 'Authorized'}
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-amber-500/15 text-amber-600 rounded-full text-[10px] font-black flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {language === 'ar' ? 'بانتظار الدفع' : 'Pending Auth'}
                              </span>
                            )}
                          </div>

                          {txnId && (
                            <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between text-[10px] font-mono text-gray-400">
                              <span>{language === 'ar' ? 'رقم التفويض البنكي:' : 'Bank Auth Ref:'}</span>
                              <span className="font-bold text-slate-600">{txnId}</span>
                            </div>
                          )}
                        </div>

                        {/* Collapsible Invoice details */}
                        <div className="border border-slate-100 rounded-2xl overflow-hidden mb-4">
                          <button
                            type="button"
                            onClick={() => toggleOrderExpanded(order.id)}
                            className="w-full flex justify-between items-center p-3 bg-slate-50 hover:bg-slate-100 transition-all text-xs font-black text-slate-700"
                          >
                            <div className="flex items-center gap-1.5">
                              <span>{language === 'ar' ? 'تفاصيل فاتورة العميل والتنزيلات' : 'Invoice Details & Deductions'}</span>
                              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] rounded">
                                {order.items?.length || 0} {language === 'ar' ? 'منتجات' : 'items'}
                              </span>
                            </div>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                          </button>

                          {isExpanded && (
                            <div className="p-4 bg-white border-t border-slate-100 space-y-3 text-xs text-right">
                              <div className="space-y-2 border-b border-slate-100 pb-3">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex justify-between items-center text-slate-700 font-bold">
                                    <span>
                                      {language === 'ar' ? item.name_ar : item.name_en}
                                      <span className="text-gray-400 mx-1">x{item.quantity}</span>
                                    </span>
                                    <span className="font-mono text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="space-y-1.5 text-slate-500 font-bold">
                                <div className="flex justify-between">
                                  <span>{language === 'ar' ? 'المجموع الفرعي الفعلي:' : 'Calculated Subtotal:'}</span>
                                  <span className="font-mono text-slate-800">
                                    {formatCurrency(order.subtotal || order.total - (order.deliveryFee || 0) + (order.discount || 0))}
                                  </span>
                                </div>
                                
                                {order.discount && order.discount > 0 ? (
                                  <div className="flex justify-between text-red-500">
                                    <span className="flex items-center gap-1">
                                      <Tag className="w-3 h-3 shrink-0" />
                                      {language === 'ar' ? 'خصم الكوبون الشرائي:' : 'Applied Coupon Promo:'}
                                    </span>
                                    <span className="font-mono">- {formatCurrency(order.discount)}</span>
                                  </div>
                                ) : null}

                                {order.cashback && order.cashback > 0 ? (
                                  <div className="flex justify-between text-red-500">
                                    <span className="flex items-center gap-1">
                                      <Percent className="w-3 h-3 shrink-0" />
                                      {language === 'ar' ? 'خصم رصيد الكاش باك:' : 'Cashback Wallet Discount:'}
                                    </span>
                                    <span className="font-mono">- {formatCurrency(order.cashback)}</span>
                                  </div>
                                ) : null}

                                <div className="flex justify-between">
                                  <span>{language === 'ar' ? 'رسوم الشحن والتوصيل للفرع:' : 'Branch Delivery Charge:'}</span>
                                  <span className="font-mono text-slate-800">
                                    {order.deliveryFee && order.deliveryFee > 0 
                                      ? `+ ${formatCurrency(order.deliveryFee)}` 
                                      : (language === 'ar' ? 'مجاني (سلة فوق ٢٠٠ ريال)' : 'FREE')}
                                  </span>
                                </div>

                                <div className="flex justify-between pt-2 border-t border-dashed border-slate-200 text-sm font-black text-primary">
                                  <span>{language === 'ar' ? 'القيمة الإجمالية المخصومة والمسددة:' : 'Final Net Deducted Total:'}</span>
                                  <span className="font-mono">{formatCurrency(order.total)}</span>
                                </div>
                              </div>

                              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-gray-400">
                                <span>{language === 'ar' ? 'مستودع المعالجة السيادي للطلب:' : 'Sovereign Processing Depot:'}</span>
                                <span className="font-black text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                                  {language === 'ar' ? branchObj?.nameAr || 'المركز الرئيسي - جدة' : branchObj?.nameEn || 'Jeddah HQ'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <button 
                          type="button"
                          onClick={() => handleUpdateStatus(order.id, 'shipped')}
                          className="w-full bg-slate-900 text-white py-3.5 rounded-2xl font-black hover:bg-primary transition-all flex items-center justify-center gap-2 text-sm shadow-lg border-b-4 border-slate-950"
                        >
                          <Truck className="w-5 h-5 text-secondary" />
                          <span>{language === 'ar' ? 'جاهز للتوصيل والشحن المباشر' : 'Mark Ready & Ship'}</span>
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
