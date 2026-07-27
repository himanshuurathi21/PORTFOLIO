const CryptoModule = (() => {
  const PBKDF2_ITERATIONS = 600000;
  const KEY_LENGTH = 256;
  const SALT_LENGTH = 32;
  const IV_LENGTH = 12;
  const ALGORITHM = 'AES-GCM';
  const KDF = 'PBKDF2';
  const HASH = 'SHA-256';
  const VERSION = 1;

  function _ab2b64(ab) {
    return btoa(String.fromCharCode(...new Uint8Array(ab)));
  }

  function _b642ab(str) {
    return Uint8Array.from(atob(str), c => c.charCodeAt(0));
  }

  async function _deriveKey(masterPassword, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(masterPassword),
      'PBKDF2',
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: HASH },
      keyMaterial,
      { name: ALGORITHM, length: KEY_LENGTH },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async function encryptVault(masterPassword, vaultPlaintext) {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const key = await _deriveKey(masterPassword, salt);
    const encoded = new TextEncoder().encode(JSON.stringify(vaultPlaintext));
    const ciphertext = await crypto.subtle.encrypt(
      { name: ALGORITHM, iv },
      key,
      encoded
    );
    return {
      version: VERSION,
      kdf: KDF,
      hash: HASH,
      iterations: PBKDF2_ITERATIONS,
      salt: _ab2b64(salt),
      iv: _ab2b64(iv),
      ciphertext: _ab2b64(ciphertext)
    };
  }

  async function decryptVault(masterPassword, encryptedVault) {
    const salt = _b642ab(encryptedVault.salt);
    const iv = _b642ab(encryptedVault.iv);
    const ciphertext = _b642ab(encryptedVault.ciphertext);
    const key = await _deriveKey(masterPassword, salt);
    const decrypted = await crypto.subtle.decrypt(
      { name: ALGORITHM, iv },
      key,
      ciphertext
    );
    return JSON.parse(new TextDecoder().decode(decrypted));
  }

  async function verifyMasterPassword(masterPassword, encryptedVault) {
    try {
      await decryptVault(masterPassword, encryptedVault);
      return true;
    } catch {
      return false;
    }
  }

  return { encryptVault, decryptVault, verifyMasterPassword };
})();
