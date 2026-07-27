const DatabaseModule = (() => {
  const DB_NAME = 'PasswordManager';
  const DB_VERSION = 1;
  const VAULT_STORE = 'vault';
  const SETTINGS_STORE = 'settings';

  function _openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(VAULT_STORE)) {
          db.createObjectStore(VAULT_STORE, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
          db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveEncryptedVault(encryptedVault) {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(VAULT_STORE, 'readwrite');
      tx.objectStore(VAULT_STORE).put({ id: 'main', data: encryptedVault });
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  }

  async function getEncryptedVault() {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(VAULT_STORE, 'readonly');
      const req = tx.objectStore(VAULT_STORE).get('main');
      req.onsuccess = () => { db.close(); resolve(req.result ? req.result.data : null); };
      req.onerror = () => { db.close(); reject(req.error); };
    });
  }

  async function clearVault() {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(VAULT_STORE, 'readwrite');
      tx.objectStore(VAULT_STORE).delete('main');
      tx.objectStore(VAULT_STORE).delete('plain');
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  }

  async function clearAllData() {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([VAULT_STORE, SETTINGS_STORE], 'readwrite');
      tx.objectStore(VAULT_STORE).clear();
      tx.objectStore(SETTINGS_STORE).clear();
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  }

  async function saveSetting(key, value) {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SETTINGS_STORE, 'readwrite');
      tx.objectStore(SETTINGS_STORE).put({ key, value });
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  }

  async function getSetting(key) {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SETTINGS_STORE, 'readonly');
      const req = tx.objectStore(SETTINGS_STORE).get(key);
      req.onsuccess = () => { db.close(); resolve(req.result ? req.result.value : null); };
      req.onerror = () => { db.close(); reject(req.error); };
    });
  }

  async function getAllSettings() {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SETTINGS_STORE, 'readonly');
      const req = tx.objectStore(SETTINGS_STORE).getAll();
      req.onsuccess = () => { db.close(); resolve(req.result); };
      req.onerror = () => { db.close(); reject(req.error); };
    });
  }

  async function savePlainVault(entries) {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(VAULT_STORE, 'readwrite');
      tx.objectStore(VAULT_STORE).put({ id: 'plain', data: entries });
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  }

  async function getPlainVault() {
    const db = await _openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(VAULT_STORE, 'readonly');
      const req = tx.objectStore(VAULT_STORE).get('plain');
      req.onsuccess = () => { db.close(); resolve(req.result ? req.result.data : []); };
      req.onerror = () => { db.close(); reject(req.error); };
    });
  }

  return {
    saveEncryptedVault, getEncryptedVault, clearVault, clearAllData, saveSetting, getSetting, getAllSettings,
    savePlainVault, getPlainVault
  };
})();
