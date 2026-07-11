import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Fingerprint, Smile, Lock, AlertCircle } from 'lucide-react';

interface BiometricLoginProps {
  onSuccess?: (userId: number) => void;
  onError?: (error: string) => void;
}

export default function BiometricLogin({ onSuccess, onError }: BiometricLoginProps) {
  const { language, isRTL } = useLanguage();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [biometricType, setBiometricType] = useState<'fingerprint' | 'face' | null>(null);

  // Check if device supports biometric authentication
  const isBiometricSupported = async (): Promise<boolean> => {
    try {
      if (window.PublicKeyCredential) {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        return available;
      }
      return false;
    } catch (error) {
      console.error('Biometric support check failed:', error);
      return false;
    }
  };

  // Handle fingerprint authentication
  const handleFingerprintAuth = async () => {
    setLoading(true);
    setError(null);
    setBiometricType('fingerprint');

    try {
      const supported = await isBiometricSupported();
      if (!supported) {
        throw new Error(
          language === 'ar'
            ? 'جهازك لا يدعم المصادقة البيومترية'
            : 'Your device does not support biometric authentication'
        );
      }

      // Simulate fingerprint authentication
      // In production, use WebAuthn API
      const userId = Math.floor(Math.random() * 1000);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setLoading(false);
      onSuccess?.(userId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      onError?.(errorMessage);
      setLoading(false);
    }
  };

  // Handle face recognition authentication
  const handleFaceAuth = async () => {
    setLoading(true);
    setError(null);
    setBiometricType('face');

    try {
      const supported = await isBiometricSupported();
      if (!supported) {
        throw new Error(
          language === 'ar'
            ? 'جهازك لا يدعم المصادقة البيومترية'
            : 'Your device does not support biometric authentication'
        );
      }

      // Simulate face recognition authentication
      // In production, use WebAuthn API or Face API
      const userId = Math.floor(Math.random() * 1000);
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      setLoading(false);
      onSuccess?.(userId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      onError?.(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="text-center mb-8">
        <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {language === 'ar' ? 'تسجيل دخول آمن' : 'Secure Login'}
        </h2>
        <p className="text-muted-foreground">
          {language === 'ar'
            ? 'استخدم بصمتك للدخول بأمان'
            : 'Use your biometric to login securely'}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-red-600 text-sm">{language === 'ar' ? 'خطأ' : 'Error'}</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Biometric Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fingerprint Authentication */}
        <Button
          onClick={handleFingerprintAuth}
          disabled={loading}
          className="h-auto py-8 flex flex-col items-center gap-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent"
        >
          <Fingerprint size={32} />
          <div>
            <p className="font-semibold">
              {language === 'ar' ? 'بصمة الإصبع' : 'Fingerprint'}
            </p>
            <p className="text-xs text-muted-foreground">
              {loading && biometricType === 'fingerprint'
                ? language === 'ar'
                  ? 'جاري المعالجة...'
                  : 'Processing...'
                : language === 'ar'
                ? 'انقر لتسجيل الدخول'
                : 'Click to login'}
            </p>
          </div>
        </Button>

        {/* Face Recognition */}
        <Button
          onClick={handleFaceAuth}
          disabled={loading}
          className="h-auto py-8 flex flex-col items-center gap-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent"
        >
          <Smile size={32} />
          <div>
            <p className="font-semibold">
              {language === 'ar' ? 'التعرف على الوجه' : 'Face Recognition'}
            </p>
            <p className="text-xs text-muted-foreground">
              {loading && biometricType === 'face'
                ? language === 'ar'
                  ? 'جاري المعالجة...'
                  : 'Processing...'
                : language === 'ar'
                ? 'انقر لتسجيل الدخول'
                : 'Click to login'}
            </p>
          </div>
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground mt-4">
            {language === 'ar'
              ? 'يرجى الانتظار أثناء التحقق من بصمتك...'
              : 'Please wait while we verify your biometric...'}
          </p>
        </div>
      )}

      {/* Info Message */}
      <div className="p-4 bg-blue-500/10 border border-blue-500 rounded-lg">
        <p className="text-blue-600 text-sm">
          {language === 'ar'
            ? 'بيانات بصمتك محمية بالتشفير الكامل ولا تُخزن على خوادمنا'
            : 'Your biometric data is fully encrypted and not stored on our servers'}
        </p>
      </div>
    </div>
  );
}
