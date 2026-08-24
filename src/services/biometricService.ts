/**
 * Delta Stars — Biometric Authentication Service
 * Real WebAuthn API integration for fingerprint, Face ID, Windows Hello
 */

export type BioScope = 'customer' | 'admin' | 'driver' | 'checkout';
export interface BioResult {
  success: boolean;
  method?: string;
  error?: string;
}

// Check if biometrics are available
export async function isBiometricAvailable(): Promise<boolean> {
  if (!window.PublicKeyCredential) return false;
  try {
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return available;
  } catch {
    return false;
  }
}

// Get biometric type label
export function getBiometricLabel(): string {
  const ua = navigator.userAgent.toLowerCase();
  if (/iphone|ipad/.test(ua)) return 'Face ID / Touch ID';
  if (/android/.test(ua)) return 'البصمة / التعرف على الوجه';
  if (/windows/.test(ua)) return 'Windows Hello';
  if (/mac/.test(ua)) return 'Touch ID';
  return 'المصادقة البيومترية';
}

// Register biometric credential
export async function registerBiometric(
  scope: BioScope = 'customer',
  userId: string = 'user-' + Date.now()
): Promise<BioResult> {
  try {
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);

    const createOptions: CredentialCreationOptions = {
      publicKey: {
        challenge,
        rp: { name: 'Delta Stars - نجوم دلتا', id: window.location.hostname },
        user: {
          id: new TextEncoder().encode(userId),
          name: userId,
          displayName: `Delta Stars ${scope}`,
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' },
          { alg: -257, type: 'public-key' },
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required',
        },
        timeout: 60000,
      },
    };

    const credential = await navigator.credentials.create(createOptions) as PublicKeyCredential;
    if (credential) {
      localStorage.setItem(`bio_registered_${scope}`, JSON.stringify({
        id: credential.rawId ? btoa(String.fromCharCode(...new Uint8Array(credential.rawId))) : null,
        createdAt: new Date().toISOString(),
      }));
      return { success: true, method: getBiometricLabel() };
    }
    return { success: false, error: 'فشل التسجيل' };
  } catch (err: any) {
    return { success: false, error: err.message || 'فشل التسجيل البيومتري' };
  }
}

// Authenticate with biometric
export async function authenticateBiometric(scope: BioScope = 'customer'): Promise<BioResult> {
  try {
    const challenge = new Uint8Array(32);
    crypto.getRandomValues(challenge);

    const getOptions: CredentialRequestOptions = {
      publicKey: {
        challenge,
        timeout: 60000,
        userVerification: 'required',
        rpId: window.location.hostname,
      },
    };

    const assertion = await navigator.credentials.get(getOptions) as PublicKeyCredential;
    if (assertion) {
      localStorage.setItem(`bio_last_auth_${scope}`, new Date().toISOString());
      return { success: true, method: getBiometricLabel() };
    }
    return { success: false, error: 'فشل التحقق' };
  } catch (err: any) {
    return { success: false, error: err.message || 'فشل التحقق البيومتري' };
  }
}

// Check if biometric is registered for scope
export function hasRegisteredBiometric(scope: BioScope = 'customer'): boolean {
  return !!localStorage.getItem(`bio_registered_${scope}`);
}

// Remove biometric registration
export function removeBiometric(scope: BioScope = 'customer'): void {
  localStorage.removeItem(`bio_registered_${scope}`);
  localStorage.removeItem(`bio_last_auth_${scope}`);
}
