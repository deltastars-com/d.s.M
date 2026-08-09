import type { CapacitorConfig } from '@capacitor/cli';

/**
 * DeltaStars | نجوم دلتا — Capacitor Native Config
 * Owner: Ali Aldahan (علي الدحان)
 */
const config: CapacitorConfig = {
  appId: 'com.deltastars.app',
  appName: 'DeltaStars',
  webDir: 'dist',
  bundledWebRuntime: false,
  loggingBehavior: 'none',

  android: {
    minWebViewVersion: 60,
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    backgroundColor: '#0b1d0b',
    buildOptions: {
      keystorePath: 'deltastars-release.keystore',
      keystoreAlias: 'deltastars',
      releaseType: 'AAB'
    }
  },

  ios: {
    contentInset: 'always',
    limitsNavigationsToAppBoundDomains: true,
    backgroundColor: '#0b1d0b',
    scrollEnabled: true,
    preferredContentMode: 'mobile'
  },

  server: {
    androidScheme: 'https',
    iosScheme: 'https',
    cleartext: false
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 1400,
      launchAutoHide: true,
      launchFadeOutDuration: 400,
      backgroundColor: '#0b1d0b',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_INSIDE',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#f4b942',
      splashFullScreen: true,
      splashImmersive: true,
      useDialog: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0b1d0b',
      overlaysWebView: false
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
      resizeOnFullScreen: true
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon',
      iconColor: '#f4b942',
      sound: 'beep.wav'
    },
    Geolocation: {
      permissions: ['location']
    },
    CapacitorHttp: {
      enabled: true
    },
    CapacitorCookies: {
      enabled: true
    },
    LiveUpdates: {
      appId: 'com.deltastars.app',
      channel: 'production',
      autoUpdateMethod: 'background',
      maxVersions: 2
    }
  }
};

export default config;
