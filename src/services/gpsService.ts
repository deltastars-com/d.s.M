/**
 * Delta Stars — GPS Tracking Service
 * Real-time delivery tracking with Leaflet maps, geofencing, route calculation
 */

export interface LatLng {
  lat: number;
  lng: number;
}

export interface DeliveryLocation {
  position: LatLng;
  timestamp: number;
  speed?: number;
  heading?: number;
}

// Branch coordinates for nearest-warehouse calculation
const BRANCHES: { id: string; name: string; nameEn: string; location: LatLng }[] = [
  { id: 'jeddah', name: 'جدة', nameEn: 'Jeddah', location: { lat: 21.4858, lng: 39.1925 } },
  { id: 'riyadh', name: 'الرياض', nameEn: 'Riyadh', location: { lat: 24.7136, lng: 46.6753 } },
  { id: 'dammam', name: 'الدمام', nameEn: 'Dammam', location: { lat: 26.4207, lng: 50.0888 } },
  { id: 'abha', name: 'أبها', nameEn: 'Abha', location: { lat: 18.2164, lng: 42.5053 } },
  { id: 'khamis', name: 'خميس مشيط', nameEn: 'Khamis Mushait', location: { lat: 18.3061, lng: 42.7291 } },
  { id: 'qassim', name: 'القصيم', nameEn: 'Qassim', location: { lat: 26.3294, lng: 43.9249 } },
];

// Haversine formula for distance
function haversineDistance(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

export function findNearestBranch(userLocation: LatLng) {
  let nearest = BRANCHES[0];
  let minDist = Infinity;
  for (const branch of BRANCHES) {
    const dist = haversineDistance(userLocation, branch.location);
    if (dist < minDist) {
      minDist = dist;
      nearest = branch;
    }
  }
  return { ...nearest, distanceKm: Math.round(minDist * 10) / 10 };
}

export function calculateDeliveryFee(distanceKm: number, subtotal: number): number {
  if (subtotal >= 200) return 0;
  if (distanceKm <= 10) return 15;
  if (distanceKm <= 30) return 25;
  if (distanceKm <= 70) return 40;
  if (distanceKm <= 150) return 60;
  return 90;
}

export function estimateDeliveryTime(distanceKm: number): number {
  if (distanceKm <= 5) return 20;
  if (distanceKm <= 15) return 35;
  if (distanceKm <= 30) return 50;
  if (distanceKm <= 70) return 80;
  return 120;
}

// Geolocation wrapper
export function getCurrentPosition(): Promise<LatLng> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  });
}

// City coordinates for Saudi Arabia
export const SAUDI_CITIES: { name: string; nameEn: string; location: LatLng }[] = [
  { name: 'جدة', nameEn: 'Jeddah', location: { lat: 21.4858, lng: 39.1925 } },
  { name: 'الرياض', nameEn: 'Riyadh', location: { lat: 24.7136, lng: 46.6753 } },
  { name: 'الدمام', nameEn: 'Dammam', location: { lat: 26.4207, lng: 50.0888 } },
  { name: 'مكة المكرمة', nameEn: 'Makkah', location: { lat: 21.3891, lng: 39.8579 } },
  { name: 'المدينة المنورة', nameEn: 'Madinah', location: { lat: 24.5247, lng: 39.5692 } },
  { name: 'أبها', nameEn: 'Abha', location: { lat: 18.2164, lng: 42.5053 } },
  { name: 'خميس مشيط', nameEn: 'Khamis Mushait', location: { lat: 18.3061, lng: 42.7291 } },
  { name: 'القصيم', nameEn: 'Qassim', location: { lat: 26.3294, lng: 43.9249 } },
  { name: 'نجران', nameEn: 'Najran', location: { lat: 17.4933, lng: 44.1277 } },
  { name: 'الخبر', nameEn: 'Khobar', location: { lat: 26.2172, lng: 50.1971 } },
];
