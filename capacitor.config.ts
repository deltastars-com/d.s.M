import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.deltastars.app',
  appName: 'نجوم دلتا',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#0b1d0b',
      showSpinner: true,
      spinnerColor: '#f4b942',
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#0b1d0b',
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true,
    },
    App: {
      // Version info for auto-updates
    },
  },
  android: {
    buildOptions: {
      keystorePath: 'android/app/release.keystore',
      keystorePassword: '',
      keystoreAlias: 'deltastars',
      keystoreAliasPassword: '',
      releaseType: 'APK',
    },
  },
  ios: {
    // iOS specific config
  },
};

export default config;
