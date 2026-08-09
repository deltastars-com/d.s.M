/**═══════════════════════════════════════════════════════════════════
 * DeltaStars | نجوم دلتا — نظام الخرائط والتتبع GPS
 * المالك: علي الدحان (Ali Aldahan)
 *
 * ▸ مجاني 100%: OpenStreetMap + Leaflet + OSRM — بلا مفتاح ولا فاتورة.
 * ▸ حقيقي: يستخدم Geolocation API الأصلي للجهاز (دقة عالية).
 * ▸ يعمل على الويب والتطبيق (Capacitor) بنفس الواجهة البرمجية.
 * ▸ يُغذّي: شاشة تتبع العميل + شاشة تتبع السائقين لدى الإدارة
 *           + شاشة متابعة مناديب المخازن.
 *══════════════════════════════════════════════════════════════════*/

/*───────────────────────── الأنواع ─────────────────────────*/
export interface GeoPoint {
  lat: number;
  lng: number;
  accuracy?: number;   // متر
  speed?: number;      // متر/ثانية
  heading?: number;    // درجة
  timestamp: number;
}

export interface TrackedEntity {
  id: string;
  name: string;
  role: 'driver' | 'agent' | 'warehouse' | 'customer' | 'branch';
  point: GeoPoint;
  status?: 'online' | 'offline' | 'busy' | 'delivering' | 'preparing';
  orderId?: string;
  phone?: string;
  vehicle?: string;
}

export interface RouteResult {
  distanceKm: number;
  durationMin: number;
  geometry: [number, number][];   // [lat, lng]
  eta: Date;
}

/*═══════════ مزوّدو الخرائط المجانيون (بلا مفتاح) ═══════════*/
export const FREE_TILES = {
  standard: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
    name_ar: 'الخريطة القياسية'
  },
  humanitarian: {
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap | HOT',
    maxZoom: 20,
    name_ar: 'خريطة عالية التفاصيل'
  },
  cyclosm: {
    url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    attribution: '&copy; CyclOSM | OpenStreetMap',
    maxZoom: 20,
    name_ar: 'خريطة الطرق'
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap | CARTO',
    maxZoom: 20,
    name_ar: 'الوضع الليلي'
  },
  satelliteFree: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri, Maxar, Earthstar Geographics',
    maxZoom: 19,
    name_ar: 'صور الأقمار الصناعية'
  }
} as const;

export const DEFAULT_TILE = FREE_TILES.standard;

/** مركز المملكة العربية السعودية (احتياطي عند رفض إذن الموقع) */
export const KSA_CENTER: GeoPoint = { lat: 24.7136, lng: 46.6753, timestamp: 0 };

/** إحداثيات فروع نجوم دلتا الحقيقية */
export const BRANCH_LOCATIONS: Record<string, { lat: number; lng: number; name_ar: string }> = {
  abha:     { lat: 18.2164, lng: 42.5053, name_ar: 'فرع أبها' },
  khamis:   { lat: 18.3060, lng: 42.7297, name_ar: 'فرع خميس مشيط' },
  riyadh:   { lat: 24.7136, lng: 46.6753, name_ar: 'فرع الرياض' },
  jeddah:   { lat: 21.4858, lng: 39.1925, name_ar: 'فرع جدة' },
  qassim:   { lat: 26.3260, lng: 43.9750, name_ar: 'فرع القصيم' },
  dammam:   { lat: 26.4207, lng: 50.0888, name_ar: 'فرع الدمام' }
};

/*═══════════════ حسابات جغرافية دقيقة ═══════════════*/

/** المسافة بين نقطتين بالكيلومتر (صيغة هافرساين) */
export function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** اتجاه البوصلة بين نقطتين (لتدوير أيقونة السائق) */
export function bearing(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const φ1 = (a.lat * Math.PI) / 180, φ2 = (b.lat * Math.PI) / 180;
  const Δλ = ((b.lng - a.lng) * Math.PI) / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return (((Math.atan2(y, x) * 180) / Math.PI) + 360) % 360;
}

/** أقرب فرع لنقطة معيّنة — يُستخدم لتوجيه الطلب آلياً */
export function nearestBranch(p: { lat: number; lng: number }) {
  let best = { key: 'riyadh', km: Infinity, ...BRANCH_LOCATIONS.riyadh };
  Object.entries(BRANCH_LOCATIONS).forEach(([key, b]) => {
    const km = distanceKm(p, b);
    if (km < best.km) best = { key, km, ...b };
  });
  return best;
}

/*═══════════════ تتبع الموقع الحيّ ═══════════════*/

const isNative = () =>
  typeof window !== 'undefined' && !!(window as any).Capacitor?.isNativePlatform?.();

/** طلب إذن الموقع (ويب + تطبيق) */
export async function requestLocationPermission(): Promise<boolean> {
  try {
    if (isNative()) {
      const Geo = (window as any).Capacitor?.Plugins?.Geolocation;
      if (Geo?.requestPermissions) {
        const r = await Geo.requestPermissions();
        return r?.location === 'granted' || r?.coarseLocation === 'granted';
      }
    }
    if (!('geolocation' in navigator)) return false;
    if ('permissions' in navigator) {
      const st = await (navigator as any).permissions.query({ name: 'geolocation' });
      if (st.state === 'denied') return false;
    }
    return true;
  } catch { return false; }
}

/** قراءة الموقع الحالي مرة واحدة (بدقة عالية) */
export function getCurrentPosition(timeoutMs = 10000): Promise<GeoPoint> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) { reject(new Error('الجهاز لا يدعم تحديد الموقع')); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        speed: pos.coords.speed ?? undefined,
        heading: pos.coords.heading ?? undefined,
        timestamp: pos.timestamp
      }),
      (err) => reject(new Error(
        err.code === 1 ? 'تم رفض إذن الوصول للموقع'
        : err.code === 2 ? 'تعذر تحديد الموقع حالياً'
        : 'انتهت مهلة تحديد الموقع'
      )),
      { enableHighAccuracy: true, timeout: timeoutMs, maximumAge: 0 }
    );
  });
}

/**
 * تتبع مستمر — يُستخدم في بوابة السائقين.
 * يعيد دالة إيقاف.
 */
export function watchPosition(
  onUpdate: (p: GeoPoint) => void,
  onError?: (msg: string) => void,
  opts?: { minIntervalMs?: number; minDistanceM?: number }
): () => void {
  if (!('geolocation' in navigator)) { onError?.('الجهاز لا يدعم تحديد الموقع'); return () => {}; }

  const minInterval = opts?.minIntervalMs ?? 5000;   // لا تُرسل أكثر من مرة كل 5 ثوانٍ
  const minDist = opts?.minDistanceM ?? 15;          // ولا إذا لم يتحرك 15 متراً
  let lastSent = 0;
  let lastPoint: GeoPoint | null = null;

  const id = navigator.geolocation.watchPosition(
    (pos) => {
      const p: GeoPoint = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        speed: pos.coords.speed ?? undefined,
        heading: pos.coords.heading ?? undefined,
        timestamp: pos.timestamp
      };
      const now = Date.now();
      const movedM = lastPoint ? distanceKm(lastPoint, p) * 1000 : Infinity;
      if (now - lastSent >= minInterval && movedM >= minDist) {
        lastSent = now; lastPoint = p;
        onUpdate(p);
      }
    },
    (err) => onError?.(err.code === 1 ? 'تم رفض إذن الموقع' : 'تعذر تتبع الموقع'),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 3000 }
  );

  return () => { try { navigator.geolocation.clearWatch(id); } catch {} };
}

/*═══════════════ حساب المسار الحقيقي (OSRM المجاني) ═══════════════*/

const OSRM = 'https://router.project-osrm.org/route/v1/driving';

/**
 * مسار قيادة حقيقي عبر الطرق (لا خط مستقيم).
 * مجاني تماماً عبر خادوم OSRM العام.
 */
export async function getRoute(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): Promise<RouteResult> {
  const url = `${OSRM}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    const data = await res.json();
    const r = data?.routes?.[0];
    if (!r) throw new Error('no route');

    const distanceKmVal = r.distance / 1000;
    const durationMin = Math.max(1, Math.round(r.duration / 60));
    return {
      distanceKm: Math.round(distanceKmVal * 10) / 10,
      durationMin,
      geometry: (r.geometry?.coordinates || []).map((c: number[]) => [c[1], c[0]] as [number, number]),
      eta: new Date(Date.now() + durationMin * 60000)
    };
  } catch {
    /*── احتياطي بدون إنترنت: تقدير بمسافة هافرساين + متوسط سرعة مدينة ──*/
    const km = distanceKm(from, to);
    const durationMin = Math.max(5, Math.round((km / 35) * 60));   // 35 كم/س داخل المدن
    return {
      distanceKm: Math.round(km * 10) / 10,
      durationMin,
      geometry: [[from.lat, from.lng], [to.lat, to.lng]],
      eta: new Date(Date.now() + durationMin * 60000)
    };
  }
}

/*═══════════════ البحث عن عنوان (Nominatim المجاني) ═══════════════*/

/** تحويل إحداثيات إلى عنوان مقروء بالعربية */
export async function reverseGeocode(p: { lat: number; lng: number }): Promise<string> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${p.lat}&lon=${p.lng}&accept-language=ar&zoom=18`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'ar' } });
    const d = await res.json();
    return d?.display_name || `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
  } catch {
    return `${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}`;
  }
}

/** البحث عن عنوان وتحويله لإحداثيات (لعنوان التوصيل) */
export async function geocodeAddress(query: string): Promise<GeoPoint | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=sa&limit=1&accept-language=ar`;
    const res = await fetch(url, { headers: { 'Accept-Language': 'ar' } });
    const d = await res.json();
    if (!d?.[0]) return null;
    return { lat: parseFloat(d[0].lat), lng: parseFloat(d[0].lon), timestamp: Date.now() };
  } catch { return null; }
}

/*═══════════════ التخزين المؤقت للمسارات (عمل بدون إنترنت) ═══════════════*/
const ROUTE_CACHE = 'ds_route_cache_v1';

export function cacheRoute(key: string, r: RouteResult) {
  try {
    const all = JSON.parse(localStorage.getItem(ROUTE_CACHE) || '{}');
    all[key] = { ...r, eta: r.eta.toISOString(), _at: Date.now() };
    const keys = Object.keys(all);
    if (keys.length > 40) delete all[keys[0]];
    localStorage.setItem(ROUTE_CACHE, JSON.stringify(all));
  } catch {}
}

export function readCachedRoute(key: string): RouteResult | null {
  try {
    const all = JSON.parse(localStorage.getItem(ROUTE_CACHE) || '{}');
    const r = all[key];
    if (!r || Date.now() - r._at > 3600_000) return null;
    return { ...r, eta: new Date(r.eta) };
  } catch { return null; }
}

/*═══════════════ أدوات العرض ═══════════════*/

export const fmtDistance = (km: number) =>
  km < 1 ? `${Math.round(km * 1000)} متر` : `${km.toFixed(1)} كم`;

export const fmtDuration = (min: number) =>
  min < 60 ? `${min} دقيقة` : `${Math.floor(min / 60)} ساعة${min % 60 ? ` و${min % 60} دقيقة` : ''}`;

export const fmtEta = (d: Date) =>
  d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', hour12: true });

/** أيقونة SVG ملوّنة لكل دور على الخريطة */
export function markerIcon(role: TrackedEntity['role'], heading = 0): string {
  const colors: Record<string, string> = {
    driver: '#f4b942', agent: '#2d5a27', warehouse: '#1e40af',
    customer: '#dc2626', branch: '#0b1d0b'
  };
  const c = colors[role] || '#2d5a27';
  const rotate = role === 'driver' ? `transform="rotate(${heading} 16 16)"` : '';
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="${c}" stroke="#fff" stroke-width="3"/>
      <g ${rotate} fill="#fff">
        ${role === 'driver'
          ? '<path d="M16 7l6 14-6-3-6 3z"/>'
          : role === 'branch'
          ? '<path d="M10 14h12v9H10z"/><path d="M9 14l7-6 7 6z"/>'
          : '<circle cx="16" cy="16" r="5"/>'}
      </g>
    </svg>`
  )}`;
}

export default {
  FREE_TILES, DEFAULT_TILE, KSA_CENTER, BRANCH_LOCATIONS,
  distanceKm, bearing, nearestBranch,
  requestLocationPermission, getCurrentPosition, watchPosition,
  getRoute, reverseGeocode, geocodeAddress,
  cacheRoute, readCachedRoute,
  fmtDistance, fmtDuration, fmtEta, markerIcon
};
