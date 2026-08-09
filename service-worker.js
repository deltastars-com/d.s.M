/*═══════════════════════════════════════════════════════════
  DeltaStars | نجوم دلتا — Service Worker v3.0.0
  Owner: Ali Aldahan (علي الدحان)
  Strategy: Precache shell + Stale-While-Revalidate assets
            + Network-first API + Auto-update + Self-heal
═══════════════════════════════════════════════════════════*/

const SW_VERSION = 'ds-v3.0.0';
const SHELL_CACHE = `ds-shell-${SW_VERSION}`;
const ASSET_CACHE = `ds-assets-${SW_VERSION}`;
const IMAGE_CACHE = `ds-images-${SW_VERSION}`;
const DATA_CACHE  = `ds-data-${SW_VERSION}`;
const OWNED = [SHELL_CACHE, ASSET_CACHE, IMAGE_CACHE, DATA_CACHE];

const SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/splash-logo.png',
  '/official_logo.png',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-512-maskable.png',
  '/images/placeholder.jpg'
];

const MAX_IMAGES = 90;
const MAX_DATA = 60;

/*──────────── INSTALL ────────────*/
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(new Request(u, { cache: 'reload' })))))
      .then(() => self.skipWaiting())
  );
});

/*──────────── ACTIVATE ────────────*/
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('ds-') && !OWNED.includes(k)).map((k) => caches.delete(k)));
    if ('navigationPreload' in self.registration) {
      try { await self.registration.navigationPreload.enable(); } catch (_) {}
    }
    await self.clients.claim();
    const clientList = await self.clients.matchAll({ type: 'window' });
    clientList.forEach((c) => c.postMessage({ type: 'SW_ACTIVATED', version: SW_VERSION }));
  })());
});

/*──────────── HELPERS ────────────*/
async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > max) {
    await Promise.all(keys.slice(0, keys.length - max).map((k) => cache.delete(k)));
  }
}

function isAsset(url) {
  return url.pathname.startsWith('/assets/') ||
         /\.(js|css|woff2?|ttf|otf|eot)$/i.test(url.pathname);
}
function isImage(url) {
  return /\.(png|jpe?g|webp|gif|svg|avif|ico)$/i.test(url.pathname);
}
function isApiCall(url) {
  return url.pathname.startsWith('/api/') ||
         url.pathname.startsWith('/.netlify/functions/') ||
         url.hostname.includes('supabase.co') ||
         url.hostname.includes('moyasar.com') ||
         url.hostname.includes('googleapis.com') ||
         url.hostname.includes('firebaseio.com');
}
function isDataJson(url) {
  return /\/(products|store-info|quick-context|processed_products)\.json$/i.test(url.pathname) ||
         url.pathname.startsWith('/adi/');
}

/*──────────── FETCH ────────────*/
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (isApiCall(url)) return;                                // always live network
  if (url.origin !== self.location.origin && !isImage(url)) return;

  /* 1) Navigation → Network-first, fallback shell (offline-safe SPA) */
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preload = await event.preloadResponse;
        if (preload) return preload;
        const fresh = await fetch(req);
        const cache = await caches.open(SHELL_CACHE);
        cache.put('/index.html', fresh.clone());
        return fresh;
      } catch (_) {
        const cached = await caches.match('/index.html');
        return cached || new Response(
          '<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8">' +
          '<meta name="viewport" content="width=device-width,initial-scale=1">' +
          '<title>نجوم دلتا — غير متصل</title></head>' +
          '<body style="margin:0;background:#0b1d0b;color:#fff;font-family:Tajawal,sans-serif;' +
          'display:flex;align-items:center;justify-content:center;height:100vh;text-align:center">' +
          '<div><h1 style="color:#f4b942">نجوم دلتا</h1><p>لا يوجد اتصال بالإنترنت</p>' +
          '<button onclick="location.reload()" style="background:#2d5a27;color:#fff;border:0;' +
          'padding:12px 28px;border-radius:10px;font-size:16px;font-family:inherit">إعادة المحاولة</button>' +
          '</div></body></html>',
          { headers: { 'Content-Type': 'text/html; charset=utf-8' }, status: 200 }
        );
      }
    })());
    return;
  }

  /* 2) Hashed assets → Cache-first (immutable) */
  if (isAsset(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(ASSET_CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res && res.status === 200) cache.put(req, res.clone());
        return res;
      } catch (_) {
        return hit || Response.error();
      }
    })());
    return;
  }

  /* 3) Images → Stale-While-Revalidate */
  if (isImage(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(IMAGE_CACHE);
      const hit = await cache.match(req);
      const network = fetch(req).then((res) => {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          cache.put(req, res.clone());
          trim(IMAGE_CACHE, MAX_IMAGES);
        }
        return res;
      }).catch(() => null);
      return hit || (await network) || caches.match('/images/placeholder.jpg') || Response.error();
    })());
    return;
  }

  /* 4) Local JSON data (products / assistant knowledge) → SWR */
  if (isDataJson(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(DATA_CACHE);
      const hit = await cache.match(req);
      const network = fetch(req).then((res) => {
        if (res && res.status === 200) { cache.put(req, res.clone()); trim(DATA_CACHE, MAX_DATA); }
        return res;
      }).catch(() => null);
      return hit || (await network) || Response.error();
    })());
    return;
  }

  /* 5) Everything else same-origin → SWR into shell cache */
  event.respondWith((async () => {
    const cache = await caches.open(SHELL_CACHE);
    const hit = await cache.match(req);
    const network = fetch(req).then((res) => {
      if (res && res.status === 200) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    return hit || (await network) || Response.error();
  })());
});

/*──────────── MESSAGES (auto-update control) ────────────*/
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') self.skipWaiting();
  if (data.type === 'GET_VERSION') {
    event.ports[0] && event.ports[0].postMessage({ version: SW_VERSION });
  }
  if (data.type === 'CLEAR_CACHES') {
    event.waitUntil(caches.keys().then((ks) => Promise.all(ks.map((k) => caches.delete(k)))));
  }
});

/*──────────── PUSH NOTIFICATIONS ────────────*/
self.addEventListener('push', (event) => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch (_) { payload = { body: event.data && event.data.text() }; }
  const title = payload.title || 'نجوم دلتا';
  const options = {
    body: payload.body || 'لديك إشعار جديد من متجر نجوم دلتا',
    icon: '/icon-192.png',
    badge: '/icon-96.png',
    image: payload.image,
    dir: 'rtl',
    lang: 'ar',
    vibrate: [110, 60, 110],
    tag: payload.tag || 'ds-notify',
    renotify: true,
    requireInteraction: !!payload.important,
    data: { url: payload.url || '/', ...payload.data },
    actions: payload.actions || [
      { action: 'open', title: 'عرض' },
      { action: 'close', title: 'إغلاق' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;
  const target = (event.notification.data && event.notification.data.url) || '/';
  event.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if ('focus' in c) { c.navigate(target).catch(() => {}); return c.focus(); }
    }
    return clients.openWindow(target);
  })());
});

/*──────────── BACKGROUND SYNC (offline orders) ────────────*/
self.addEventListener('sync', (event) => {
  if (event.tag === 'ds-sync-orders') {
    event.waitUntil((async () => {
      const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
      all.forEach((c) => c.postMessage({ type: 'SYNC_PENDING_ORDERS' }));
    })());
  }
});

/*──────────── PERIODIC SYNC (fresh catalog) ────────────*/
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'ds-refresh-catalog') {
    event.waitUntil((async () => {
      const cache = await caches.open(DATA_CACHE);
      await Promise.allSettled(
        ['/adi/products.json', '/adi/store-info.json'].map(async (u) => {
          try { const r = await fetch(u, { cache: 'reload' }); if (r.ok) await cache.put(u, r); } catch (_) {}
        })
      );
    })());
  }
});
