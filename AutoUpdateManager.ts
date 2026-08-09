/**═══════════════════════════════════════════════════════════════════
 * DeltaStars | نجوم دلتا — مدير التحديث التلقائي والإصلاح الذاتي
 * المالك: علي الدحان (Ali Aldahan)
 *
 * ▸ يفرض على المتصفح تحميل النسخة الجديدة تلقائياً (لا كاش قديم).
 * ▸ يكتشف الملفات المعطوبة (chunk 404) ويصلحها ذاتياً.
 * ▸ يحدّث Service Worker ويمسح الكاش التالف بلا تدخل المستخدم.
 * ▸ يعمل بلا إنترنت ولا يعلّق التطبيق أبداً.
 *══════════════════════════════════════════════════════════════════*/

export interface UpdateConfig {
  appVersion: string;
  buildTime: string;
  checkIntervalSec?: number;
  onUpdateReady?: (v: string) => void;
  silent?: boolean;
}

const VERSION_KEY = 'ds_app_version';
const RECOVER_KEY = 'ds_self_heal_count';
const LAST_CHECK = 'ds_last_update_check';
const MAX_HEALS = 2;

export class AutoUpdateManager {
  private cfg: Required<Omit<UpdateConfig, 'onUpdateReady'>> & Pick<UpdateConfig, 'onUpdateReady'>;
  private timer?: number;
  private started = false;

  constructor(cfg: UpdateConfig) {
    this.cfg = {
      appVersion: cfg.appVersion,
      buildTime: cfg.buildTime,
      checkIntervalSec: cfg.checkIntervalSec ?? 300,
      silent: cfg.silent ?? true,
      onUpdateReady: cfg.onUpdateReady
    };
  }

  /*═══════════ التشغيل ═══════════*/
  start(): () => void {
    if (this.started || typeof window === 'undefined') return () => {};
    this.started = true;

    this.checkVersionChange();
    this.installSelfHealing();
    this.registerServiceWorker();

    // فحص دوري + عند عودة التبويب للمقدمة
    this.timer = window.setInterval(() => this.checkForUpdate(), this.cfg.checkIntervalSec * 1000);
    document.addEventListener('visibilitychange', this.onVisible);
    window.addEventListener('online', this.onOnline);

    return () => this.stop();
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    document.removeEventListener('visibilitychange', this.onVisible);
    window.removeEventListener('online', this.onOnline);
    this.started = false;
  }

  private onVisible = () => {
    if (document.visibilityState !== 'visible') return;
    const last = Number(sessionStorage.getItem(LAST_CHECK) || 0);
    if (Date.now() - last > 60000) this.checkForUpdate();
  };

  private onOnline = () => this.checkForUpdate();

  /*═══════════ 1) كشف تغيّر النسخة ⇒ مسح الكاش القديم ═══════════*/
  private checkVersionChange() {
    try {
      const prev = localStorage.getItem(VERSION_KEY);
      if (prev && prev !== this.cfg.appVersion) {
        console.info(`🔄 تحديث: ${prev} → ${this.cfg.appVersion}`);
        this.purgeCaches(false);
        sessionStorage.removeItem(RECOVER_KEY);
      }
      localStorage.setItem(VERSION_KEY, this.cfg.appVersion);
    } catch {}
  }

  /*═══════════ 2) الإصلاح الذاتي عند تلف الملفات ═══════════*/
  private installSelfHealing() {
    const isChunkError = (msg: string, src: string) => {
      const m = (msg || '').toLowerCase();
      return src.includes('/assets/')
        || m.includes('failed to fetch dynamically imported module')
        || m.includes('loading chunk')
        || m.includes('importing a module script failed')
        || m.includes('unexpected token \'<\'');   // HTML بدل JS = ملف معطوب
    };

    const heal = async (reason: string) => {
      const n = Number(sessionStorage.getItem(RECOVER_KEY) || 0);
      if (n >= MAX_HEALS) {
        console.error('⛔ تعذر الإصلاح الذاتي بعد محاولتين:', reason);
        return;
      }
      sessionStorage.setItem(RECOVER_KEY, String(n + 1));
      console.warn(`🩹 إصلاح ذاتي (${n + 1}/${MAX_HEALS}): ${reason}`);
      await this.purgeCaches(true);
      window.location.reload();
    };

    window.addEventListener('error', (e) => {
      const src = (e as any)?.filename || (e.target as any)?.src || '';
      if (isChunkError(e.message || '', String(src))) heal('ملف تالف: ' + src);
    }, true);

    window.addEventListener('unhandledrejection', (e) => {
      const msg = String((e.reason && (e.reason.message || e.reason)) || '');
      if (isChunkError(msg, '')) heal('وحدة فشل تحميلها');
    });
  }

  /*═══════════ 3) Service Worker: تحديث فوري بلا تدخل ═══════════*/
  private async registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/', updateViaCache: 'none'
      });

      // نسخة جديدة بانتظار التفعيل ⇒ فعّلها فوراً
      const activateWaiting = () => {
        if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      };
      activateWaiting();

      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) {
            this.cfg.onUpdateReady?.(this.cfg.appVersion);
            if (this.cfg.silent) { activateWaiting(); }
          }
        });
      });

      // عند تبديل الـ SW ⇒ أعد التحميل مرة واحدة فقط
      let reloaded = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloaded) return;
        reloaded = true;
        window.location.reload();
      });

      setInterval(() => reg.update().catch(() => {}), 15 * 60 * 1000);
    } catch (e) {
      console.warn('⚠️ تعذر تسجيل Service Worker:', e);
    }
  }

  /*═══════════ 4) فحص وجود نسخة أحدث على الخادوم ═══════════*/
  async checkForUpdate(): Promise<boolean> {
    if (!navigator.onLine) return false;
    sessionStorage.setItem(LAST_CHECK, String(Date.now()));
    try {
      const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return false;
      const remote = await res.json();
      if (remote?.version && remote.version !== this.cfg.appVersion) {
        console.info(`🆕 نسخة جديدة متاحة: ${remote.version}`);
        this.cfg.onUpdateReady?.(remote.version);
        if (this.cfg.silent) await this.applyUpdate();
        return true;
      }
    } catch {}
    return false;
  }

  /*═══════════ 5) تطبيق التحديث: مسح كامل + إعادة تحميل ═══════════*/
  async applyUpdate() {
    await this.purgeCaches(true);
    window.location.reload();
  }

  /** مسح الكاش (و SW عند الحاجة) — يُجبر المتصفح على النسخة الجديدة */
  async purgeCaches(unregisterSW = false) {
    const jobs: Promise<any>[] = [];

    if ('caches' in window) {
      jobs.push(caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))));
    }
    if (unregisterSW && 'serviceWorker' in navigator) {
      jobs.push(
        navigator.serviceWorker.getRegistrations()
          .then((rs) => Promise.all(rs.map((r) => r.unregister())))
      );
    }
    try {
      // احتفظ بالبيانات المهمة، امسح الكاش المؤقت فقط
      ['ds_route_cache_v1', 'ds_products_cache', 'ds_page_cache'].forEach((k) => localStorage.removeItem(k));
    } catch {}

    await Promise.allSettled(jobs);
  }

  get version() { return this.cfg.appVersion; }
}

export function createAutoUpdateManager(cfg: UpdateConfig) {
  return new AutoUpdateManager(cfg);
}

export default AutoUpdateManager;
