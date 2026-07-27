(function() {
  let _decryptedEntries = [];
  let _masterPassword = null;
  let _autoLockTimer = null;

  let _autoLockToken = 0;

  function _resetAutoLock() {
    if (_autoLockTimer) {
      clearTimeout(_autoLockTimer);
      _autoLockTimer = null;
    }
    if (!_masterPassword) return;
    const token = ++_autoLockToken;
    DatabaseModule.getSetting('autoLock').then(val => {
      if (token !== _autoLockToken) return;
      const minutes = parseInt(val, 10);
      if (!minutes || minutes <= 0) return;
      _autoLockTimer = setTimeout(_lockVault, minutes * 60 * 1000);
    });
  }

  function _lockVault() {
    _masterPassword = null;
    _decryptedEntries = [];
    _autoLockTimer = null;
    UIModule.setEntries([]);
    UIModule.showUnlock();
    UIModule.showNotification('Vault locked due to inactivity');
  }

  function _trackActivity() {
    if (!_masterPassword) return;
    _resetAutoLock();
  }

  async function init() {
    try {
      _applySavedTheme();
      UIModule.bindEvents({
        onView, onEdit, onDelete, onSaveEntry, onViewShow, onViewCopy, onViewCopyUsername,
        onDeleteConfirm, onToggleBiometric, onExport, onImport, onImportConfirm,
        onChangePassword, onSetPassword, onRemovePassword, onUnlock, onBiometricUnlock, onDeleteAllData
      });

      ['click', 'keydown', 'touchstart', 'mousemove'].forEach(evt =>
        document.addEventListener(evt, _trackActivity)
      );

      const hasPw = await DatabaseModule.getSetting('hasMasterPassword');
      if (hasPw) {
        UIModule.showUnlock();
        return;
      }

      _decryptedEntries = await DatabaseModule.getPlainVault() || [];
      UIModule.setEntries(_decryptedEntries);
      UIModule.showHome();
    } catch (e) {
      console.error('Init error:', e);
      UIModule.showHome();
    }
  }

  function onView(entryId) {
    const entry = _decryptedEntries.find(e => e.id === entryId);
    if (entry) UIModule.showViewScreen(entry);
  }

  function onEdit(entryId) {
    const entry = _decryptedEntries.find(e => e.id === entryId);
    if (entry) UIModule.showEditForm(entry);
  }

  function onDelete(entryId) {
    UIModule.showDeleteConfirm(entryId);
  }

  function onViewShow() {
    const pwEl = document.getElementById('view-password');
    const btn = document.getElementById('view-show-btn');
    if (pwEl.textContent === '••••••••••') {
      pwEl.textContent = pwEl.dataset.plaintext;
      btn.innerHTML = '&#x1F441;';
    } else {
      pwEl.textContent = '••••••••••';
      btn.innerHTML = '&#x1F441;&#x200D;&#x1F5E8;';
    }
  }

  function onViewCopy() {
    const pwEl = document.getElementById('view-password');
    const pw = pwEl.dataset.plaintext;
    navigator.clipboard.writeText(pw).then(() => {
      UIModule.showNotification('Password copied to clipboard');
    }).catch(() => {
      const wasHidden = pwEl.textContent === '••••••••••';
      pwEl.textContent = pw;
      const range = document.createRange();
      range.selectNodeContents(pwEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('copy');
      sel.removeAllRanges();
      if (wasHidden) pwEl.textContent = '••••••••••';
      UIModule.showNotification('Password copied to clipboard');
    });
  }

  function onViewCopyUsername() {
    const username = document.getElementById('view-username').textContent;
    navigator.clipboard.writeText(username).then(() => {
      UIModule.showNotification('Username copied to clipboard');
    }).catch(() => {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('view-username'));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('copy');
      sel.removeAllRanges();
      UIModule.showNotification('Username copied to clipboard');
    });
  }

  async function onUnlock() {
    const password = document.getElementById('unlock-password').value;
    const error = document.getElementById('unlock-error');
    if (!password) {
      error.textContent = 'Please enter your master password.';
      error.classList.remove('hidden');
      return;
    }
    try {
      const vault = await DatabaseModule.getEncryptedVault();
      if (!vault) {
        error.textContent = 'No encrypted vault found. Reset your password from settings.';
        error.classList.remove('hidden');
        return;
      }
      const entries = await CryptoModule.decryptVault(password, vault);
      _masterPassword = password;
      _decryptedEntries = entries;
      UIModule.setEntries(_decryptedEntries);
      UIModule.showHome();
      _resetAutoLock();
      document.getElementById('unlock-password').value = '';
      document.getElementById('unlock-error').classList.add('hidden');
    } catch (e) {
      error.textContent = 'Incorrect master password.';
      error.classList.remove('hidden');
    }
  }

  async function onSaveEntry() {
    const serviceName = document.getElementById('add-edit-service').value.trim();
    const username = document.getElementById('add-edit-username').value.trim();
    const password = document.getElementById('add-edit-password').value;
    const url = document.getElementById('add-edit-url').value.trim();
    const email = document.getElementById('add-edit-email').value.trim();
    const notes = document.getElementById('add-edit-notes').value.trim();
    const editId = document.getElementById('add-edit-form').dataset.editId;
    const error = document.getElementById('add-edit-error');

    if (!serviceName || !username || !password) {
      error.textContent = 'App/Website Name, Username, and Password are required.';
      error.classList.remove('hidden');
      return;
    }
    error.classList.add('hidden');

    const customFields = UIModule.collectCustomFields();

    const now = new Date().toISOString();
    if (editId) {
      const idx = _decryptedEntries.findIndex(e => e.id === editId);
      if (idx !== -1) {
        _decryptedEntries[idx] = { ..._decryptedEntries[idx], serviceName, username, password, url, email, notes, customFields, updatedAt: now };
      }
    } else {
      const newEntry = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        serviceName, username, password, url, email, notes, customFields,
        createdAt: now, updatedAt: now
      };
      _decryptedEntries.push(newEntry);
    }

    await _saveAndRefresh();
    UIModule.showNotification(editId ? 'Entry updated' : 'Entry saved', 'success');
  }

  async function _saveVault() {
    if (_masterPassword) {
      const vault = await CryptoModule.encryptVault(_masterPassword, _decryptedEntries);
      await DatabaseModule.clearVault();
      await DatabaseModule.saveEncryptedVault(vault);
    } else {
      await DatabaseModule.savePlainVault(_decryptedEntries);
    }
  }

  async function _saveAndRefresh() {
    await _saveVault();
    UIModule.setEntries(_decryptedEntries);
    UIModule.showHome();
  }

  async function onDeleteConfirm() {
    const id = document.getElementById('delete-confirm-btn').dataset.id;
    _decryptedEntries = _decryptedEntries.filter(e => e.id !== id);
    await _saveVault();
    UIModule.showVault(_decryptedEntries);
    UIModule.showNotification('Entry deleted', 'info');
  }

  async function onDeleteAllData() {
    try {
      await DatabaseModule.clearAllData();
      _masterPassword = null;
      if (_autoLockTimer) { clearTimeout(_autoLockTimer); _autoLockTimer = null; }
      _decryptedEntries = [];
      UIModule.setEntries([]);
      UIModule.showHome();
      UIModule.showNotification('All data has been deleted', 'info');
    } catch (e) {
      UIModule.showNotification('Error deleting data: ' + e.message, 'error');
    }
  }

  async function onBiometricUnlock() {
    try {
      const ok = await AuthModule.authenticateBiometric();
      if (!ok) {
        UIModule.showNotification('Biometric authentication failed', 'error');
        return;
      }
      const vault = await DatabaseModule.getEncryptedVault();
      if (!vault) {
        UIModule.showNotification('No encrypted vault found', 'error');
        return;
      }
      const storedPw = await DatabaseModule.getSetting('biometricVaultKey');
      if (!storedPw) {
        UIModule.showNotification('No stored vault key for biometric unlock. Re-register biometrics from Settings.', 'error');
        return;
      }
      const entries = await CryptoModule.decryptVault(storedPw, vault);
      _masterPassword = storedPw;
      _decryptedEntries = entries;
      UIModule.setEntries(_decryptedEntries);
      UIModule.showHome();
      _resetAutoLock();
      document.getElementById('unlock-password').value = '';
      document.getElementById('unlock-error').classList.add('hidden');
    } catch (e) {
      UIModule.showNotification('Biometric unlock error: ' + e.message, 'error');
    }
  }

  async function onToggleBiometric() {
    try {
      const hasBio = await AuthModule.hasBiometricCredential();
      if (hasBio) {
        await AuthModule.removeBiometricCredential();
        await DatabaseModule.saveSetting('biometricVaultKey', null);
        UIModule.showNotification('Biometric unlock disabled');
      } else {
        if (!_masterPassword) {
          UIModule.showNotification('Set a master password first before enabling biometric unlock', 'error');
          return;
        }
        const userId = 'password-manager-user-' + Date.now();
        await AuthModule.registerBiometric(userId);
        await DatabaseModule.saveSetting('biometricVaultKey', _masterPassword);
        UIModule.showNotification('Biometric unlock enabled');
      }
      UIModule.showSettings();
    } catch (e) {
      UIModule.showNotification('Biometric setup error: ' + e.message, 'error');
    }
  }

  async function onExport() {
    if (_masterPassword) {
      const vault = await DatabaseModule.getEncryptedVault();
      if (!vault) {
        UIModule.showNotification('No encrypted vault found to export', 'error');
        return;
      }
      const blob = new Blob([JSON.stringify(vault, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'password-manager-encrypted-backup.json';
      a.click();
      URL.revokeObjectURL(url);
      UIModule.showNotification('Encrypted backup exported');
      return;
    }
    if (!_decryptedEntries.length) {
      UIModule.showNotification('No entries to export', 'error');
      return;
    }
    const blob = new Blob([JSON.stringify(_decryptedEntries, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password-manager-plaintext-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    UIModule.showNotification('WARNING: Exported as plaintext (no master password set)', 'error');
  }

  function onImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        window._importData = data;
        UIModule.showImportConfirm();
      } catch {
        UIModule.showNotification('Invalid backup file format', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  async function onImportConfirm() {
    try {
      const data = window._importData;
      if (!data) return;
      if (data.version && data.ciphertext) {
        if (!_masterPassword) {
          UIModule.showNotification('Cannot import encrypted backup without a master password', 'error');
          window._importData = null;
          return;
        }
        _decryptedEntries = await CryptoModule.decryptVault(_masterPassword, data);
        await _saveVault();
      } else if (Array.isArray(data)) {
        _decryptedEntries = data;
        await _saveVault();
      } else {
        UIModule.showNotification('Invalid backup format', 'error');
        window._importData = null;
        return;
      }
      window._importData = null;
      UIModule.setEntries(_decryptedEntries);
      UIModule.showSettings();
      UIModule.showNotification('Backup imported successfully');
    } catch (e) {
      UIModule.showNotification('Import error: ' + e.message, 'error');
    }
  }

  async function onChangePassword() {
    const current = document.getElementById('cp-current').value;
    const newPw = document.getElementById('cp-new').value;
    const confirm = document.getElementById('cp-confirm').value;
    const error = document.getElementById('cp-error');
    const success = document.getElementById('cp-success');
    error.classList.add('hidden');
    success.classList.add('hidden');

    if (!current || !newPw || !confirm) {
      error.textContent = 'All fields are required.';
      error.classList.remove('hidden');
      return;
    }
    if (newPw.length < 4) {
      error.textContent = 'New password must be at least 4 characters.';
      error.classList.remove('hidden');
      return;
    }
    if (newPw !== confirm) {
      error.textContent = 'New passwords do not match.';
      error.classList.remove('hidden');
      return;
    }

    try {
      const vault = await DatabaseModule.getEncryptedVault();
      const valid = await CryptoModule.verifyMasterPassword(current, vault);
      if (!valid) {
        error.textContent = 'Current password is incorrect.';
        error.classList.remove('hidden');
        return;
      }
      const entries = await CryptoModule.decryptVault(current, vault);
      const newVault = await CryptoModule.encryptVault(newPw, entries);
      await DatabaseModule.saveEncryptedVault(newVault);
      _masterPassword = newPw;
      _decryptedEntries = entries;
      _resetAutoLock();
      if (await AuthModule.hasBiometricCredential()) {
        await DatabaseModule.saveSetting('biometricVaultKey', newPw);
      }
      success.classList.remove('hidden');
      UIModule.showNotification('Master password changed successfully', 'success');
      setTimeout(() => UIModule.showSettings(), 1500);
    } catch (e) {
      error.textContent = 'Error: ' + e.message;
      error.classList.remove('hidden');
    }
  }

  async function onSetPassword() {
    const password = document.getElementById('sp-password').value;
    const confirm = document.getElementById('sp-confirm').value;
    const error = document.getElementById('sp-error');

    if (!password || password.length < 4) {
      error.textContent = 'Master password must be at least 4 characters.';
      error.classList.remove('hidden');
      return;
    }
    if (password !== confirm) {
      error.textContent = 'Passwords do not match.';
      error.classList.remove('hidden');
      return;
    }

    try {
      const vault = await CryptoModule.encryptVault(password, _decryptedEntries);
      await DatabaseModule.clearVault();
      await DatabaseModule.saveEncryptedVault(vault);
      await DatabaseModule.saveSetting('hasMasterPassword', true);
      _masterPassword = password;
      _resetAutoLock();
      if (await AuthModule.hasBiometricCredential()) {
        await DatabaseModule.saveSetting('biometricVaultKey', password);
      }
      UIModule.showSettings();
      UIModule.showNotification('Master password set successfully!', 'success');
    } catch (e) {
      error.textContent = 'Encryption error: ' + e.message;
      error.classList.remove('hidden');
    }
  }

  async function onRemovePassword() {
    const current = document.getElementById('rp-password').value;
    const error = document.getElementById('rp-error');

    if (!current) {
      error.textContent = 'Please enter your current master password.';
      error.classList.remove('hidden');
      return;
    }

    try {
      const vault = await DatabaseModule.getEncryptedVault();
      const valid = await CryptoModule.verifyMasterPassword(current, vault);
      if (!valid) {
        error.textContent = 'Incorrect master password.';
        error.classList.remove('hidden');
        return;
      }
      const entries = await CryptoModule.decryptVault(current, vault);
      await DatabaseModule.clearVault();
      await DatabaseModule.savePlainVault(entries);
      await DatabaseModule.saveSetting('hasMasterPassword', false);
      await DatabaseModule.saveSetting('biometricVaultKey', null);
      _masterPassword = null;
      if (_autoLockTimer) { clearTimeout(_autoLockTimer); _autoLockTimer = null; }
      _decryptedEntries = entries;
      UIModule.showSettings();
      UIModule.showNotification('Master password removed. Vault is now unprotected.', 'info');
    } catch (e) {
      error.textContent = 'Error: ' + e.message;
      error.classList.remove('hidden');
    }
  }

  async function _applySavedTheme() {
    const theme = await DatabaseModule.getSetting('theme') || 'system';
    UIModule.applyTheme(theme);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();