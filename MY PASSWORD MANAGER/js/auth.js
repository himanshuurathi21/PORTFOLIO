const AuthModule = (() => {
  let _biometricCredentialId = null;

  async function isWebAuthnAvailable() {
    return typeof window.PublicKeyCredential !== 'undefined';
  }

  async function isBiometricSupported() {
    if (!await isWebAuthnAvailable()) return false;
    try {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      return available;
    } catch {
      return false;
    }
  }

  async function registerBiometric(userId) {
    if (!await isBiometricSupported()) {
      throw new Error('Biometric authentication is not available on this device.');
    }
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const userIdEnc = new TextEncoder().encode(userId);
    const cred = await navigator.credentials.create({
      publicKey: {
        challenge,
        rp: { name: 'My Password Manager' },
        user: {
          id: userIdEnc,
          name: userId,
          displayName: 'Password Manager User'
        },
        pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: 'platform',
          userVerification: 'required'
        },
        timeout: 60000
      }
    });
    _biometricCredentialId = cred.id;
    await DatabaseModule.saveSetting('biometricCredentialId', cred.id);
    await DatabaseModule.saveSetting('biometricUserId', userId);
    return cred.id;
  }

  async function authenticateBiometric() {
    if (!await isBiometricSupported()) {
      throw new Error('Biometric authentication is not available on this device.');
    }
    const credentialId = await DatabaseModule.getSetting('biometricCredentialId');
    if (!credentialId) {
      throw new Error('No biometric credential registered.');
    }
    const challenge = crypto.getRandomValues(new Uint8Array(32));
    const cred = await navigator.credentials.get({
      publicKey: {
        challenge,
        allowCredentials: [{
          id: _b64urlToBytes(credentialId),
          type: 'public-key'
        }],
        userVerification: 'required',
        timeout: 60000
      }
    });
    return cred !== null;
  }

  function _b64urlToBytes(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = str.length % 4;
    if (pad) str += '='.repeat(4 - pad);
    return Uint8Array.from(atob(str), c => c.charCodeAt(0));
  }

  function _bytesToB64url(bytes) {
    let binary = '';
    bytes.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  async function hasBiometricCredential() {
    const id = await DatabaseModule.getSetting('biometricCredentialId');
    return !!id;
  }

  async function removeBiometricCredential() {
    await DatabaseModule.saveSetting('biometricCredentialId', null);
    await DatabaseModule.saveSetting('biometricUserId', null);
    _biometricCredentialId = null;
  }

  return {
    isWebAuthnAvailable,
    isBiometricSupported,
    registerBiometric,
    authenticateBiometric,
    hasBiometricCredential,
    removeBiometricCredential
  };
})();
