const UIModule = (() => {
  let _currentView = null;
  let _state = { entries: [], searchQuery: '', sortBy: 'newest' };

  function _el(id) { return document.getElementById(id); }

  function _showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    const view = _el(viewId);
    if (view) view.classList.remove('hidden');
    _currentView = viewId;
  }

  function setEntries(entries) {
    _state.entries = entries || [];
  }

  function showHome() {
    _el('app-header').classList.remove('hidden');
    _showView('view-home');
  }

  function showUnlock() {
    _el('app-header').classList.add('hidden');
    _showView('view-unlock');
    _el('unlock-password').value = '';
    _el('unlock-error').classList.add('hidden');
  }

  function showAddForm() {
    _el('app-header').classList.remove('hidden');
    _showView('view-add-edit');
    _el('add-edit-title').textContent = 'Add New Password';
    _el('add-edit-save-btn').textContent = 'Save New Password';
    _el('add-edit-service').value = '';
    _el('add-edit-username').value = '';
    _el('add-edit-password').value = '';
    _el('add-edit-url').value = '';
    _el('add-edit-email').value = '';
    _el('add-edit-notes').value = '';
    _el('add-edit-custom-fields').innerHTML = '';
    _el('add-edit-error').classList.add('hidden');
    _el('add-edit-form').dataset.editId = '';
    _el('add-edit-password').type = 'password';
    _el('add-edit-toggle-pw').textContent = 'Show';
    _el('add-edit-extra').classList.add('hidden');
    _updateGenPreview();
  }

  function showEditForm(entry) {
    _el('app-header').classList.remove('hidden');
    _showView('view-add-edit');
    _el('add-edit-title').textContent = 'Edit Entry';
    _el('add-edit-save-btn').textContent = 'Save Changes';
    _el('add-edit-service').value = entry.serviceName || '';
    _el('add-edit-username').value = entry.username || '';
    _el('add-edit-password').value = entry.password || '';
    _el('add-edit-url').value = entry.url || '';
    _el('add-edit-email').value = entry.email || '';
    _el('add-edit-notes').value = entry.notes || '';
    _el('add-edit-custom-fields').innerHTML = '';
    if (entry.customFields) {
      entry.customFields.forEach(f => _addCustomField(f.name, f.value));
    }
    _el('add-edit-error').classList.add('hidden');
    _el('add-edit-form').dataset.editId = entry.id;
    _el('add-edit-password').type = 'password';
    _el('add-edit-toggle-pw').textContent = 'Show';
    if (entry.url || entry.email || entry.notes || (entry.customFields && entry.customFields.length)) {
      _el('add-edit-extra').classList.remove('hidden');
    } else {
      _el('add-edit-extra').classList.add('hidden');
    }
    _updateGenPreview();
  }

  function showVault(entries) {
    _state.entries = entries || [];
    _state.searchQuery = '';
    _state.sortBy = 'newest';
    _el('app-header').classList.remove('hidden');
    _showView('view-vault');
    _el('vault-search-input').value = '';
    _el('vault-sort').value = 'newest';
    _renderEntryList();
  }

  function _renderEntryList() {
    const list = _el('entry-list');
    const emptyState = _el('empty-entry-state');
    if (!list || !emptyState) return;

    const query = _state.searchQuery.toLowerCase();
    let filtered = _state.entries;
    if (query) {
      filtered = _state.entries.filter(e => {
        if ((e.serviceName || '').toLowerCase().includes(query)) return true;
        if ((e.username || '').toLowerCase().includes(query)) return true;
        if ((e.email || '').toLowerCase().includes(query)) return true;
        if ((e.notes || '').toLowerCase().includes(query)) return true;
        if (e.customFields) {
          for (const f of e.customFields) {
            if ((f.name || '').toLowerCase().includes(query)) return true;
            if ((f.value || '').toLowerCase().includes(query)) return true;
          }
        }
        return false;
      });
    }

    const sorted = [...filtered];
    const sortBy = _state.sortBy;
    if (sortBy === 'newest') {
      sorted.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
    } else if (sortBy === 'az') {
      sorted.sort((a, b) => (a.serviceName || '').localeCompare(b.serviceName || ''));
    } else if (sortBy === 'za') {
      sorted.sort((a, b) => (b.serviceName || '').localeCompare(a.serviceName || ''));
    }

    if (sorted.length === 0) {
      list.innerHTML = '';
      if (query) {
        emptyState.innerHTML = '<div class="empty-icon">&#x1F50D;</div><p>No matching entries found</p>';
      } else {
        emptyState.innerHTML = '<div class="empty-icon">&#x1F512;</div><p>No passwords saved yet</p>';
      }
      emptyState.classList.remove('hidden');
      return;
    }
    emptyState.classList.add('hidden');
    list.innerHTML = sorted.map((entry, idx) => {
      const date = entry.createdAt ? _formatDate(entry.createdAt) : '';
      return `
      <div class="entry-item" data-id="${_esc(entry.id)}">
        <div class="entry-number">${idx + 1}.</div>
        <div class="entry-name">${_esc(entry.serviceName)}</div>
        <div class="entry-date">${_esc(date)}</div>
        <span class="entry-chevron">&#x203A;</span>
      </div>
    `}).join('');
  }

  function _esc(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  function _formatDate(iso) {
    try {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return ''; }
  }

  function showViewScreen(entry) {
    _showView('view-view');
    _el('view-name').textContent = entry.serviceName;
    _el('view-username').textContent = entry.username;
    _el('view-password').textContent = '••••••••••';
    _el('view-password').dataset.plaintext = entry.password || '';
    _el('view-show-btn').classList.remove('hidden');
    _el('view-show-btn').innerHTML = '&#x1F441;&#x200D;&#x1F5E8;';
    _el('view-details').innerHTML = '';
    let detailsHtml = '';
    if (entry.url) detailsHtml += `<div class="detail-row"><span class="detail-label">Website</span><span class="detail-value">${_esc(entry.url)}</span></div>`;
    if (entry.email) detailsHtml += `<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${_esc(entry.email)}</span></div>`;
    if (entry.notes) detailsHtml += `<div class="detail-row"><span class="detail-label">Notes</span><span class="detail-value">${_esc(entry.notes)}</span></div>`;
    if (entry.customFields) {
      entry.customFields.forEach(f => {
        detailsHtml += `<div class="detail-row"><span class="detail-label">${_esc(f.name)}</span><span class="detail-value">${_esc(f.value)}</span></div>`;
      });
    }
    if (entry.createdAt) detailsHtml += `<div class="detail-row" style="margin-top:8px;"><span class="detail-label">Created</span><span class="detail-value">${_esc(_formatDate(entry.createdAt))}</span></div>`;
    if (entry.updatedAt && entry.updatedAt !== entry.createdAt) detailsHtml += `<div class="detail-row"><span class="detail-label">Updated</span><span class="detail-value">${_esc(_formatDate(entry.updatedAt))}</span></div>`;
    _el('view-details').innerHTML = detailsHtml;
    _el('view-edit-btn').dataset.id = entry.id;
    _el('view-delete-btn').dataset.id = entry.id;
  }

  function showSettings() {
    _showView('view-settings');
    _el('settings-biometric-status').textContent = 'Checking...';
    _el('settings-biometric-toggle').classList.add('hidden');
    _loadSettings();
  }

  async function _loadSettings() {
    const hasPw = await DatabaseModule.getSetting('hasMasterPassword');
    const autoLock = await DatabaseModule.getSetting('autoLock') || '5';
    _el('settings-autolock').value = autoLock;
    const theme = await DatabaseModule.getSetting('theme') || 'system';
    _el('settings-theme').value = theme;
    applyTheme(theme);
    const bioSupported = await AuthModule.isBiometricSupported();
    const hasBio = await AuthModule.hasBiometricCredential();
    if (bioSupported) {
      _el('settings-biometric-status').textContent = hasBio ? 'Enabled' : 'Not configured';
      _el('settings-biometric-toggle').classList.remove('hidden');
      _el('settings-biometric-toggle').textContent = hasBio ? 'Disable Biometric Unlock' : 'Enable Biometric Unlock';
    } else {
      _el('settings-biometric-status').textContent = 'Not available on this device/browser';
      _el('settings-biometric-toggle').classList.add('hidden');
    }
    if (hasPw) {
      _el('settings-pw-status').textContent = 'Set';
      _el('settings-set-pw-btn').classList.add('hidden');
      _el('settings-change-pw-btn').classList.remove('hidden');
      _el('settings-remove-pw-btn').classList.remove('hidden');
    } else {
      _el('settings-pw-status').textContent = 'Not set';
      _el('settings-set-pw-btn').classList.remove('hidden');
      _el('settings-change-pw-btn').classList.add('hidden');
      _el('settings-remove-pw-btn').classList.add('hidden');
    }
  }

  function showDeleteConfirm(entryId) {
    _showView('view-delete-confirm');
    _el('delete-confirm-btn').dataset.id = entryId;
  }

  function showImportConfirm() {
    _showView('view-import-confirm');
  }

  function showDeleteAllData() {
    _showView('view-delete-all-data');
  }

  function showChangePassword() {
    _showView('view-change-password');
    _el('cp-current').value = '';
    _el('cp-new').value = '';
    _el('cp-confirm').value = '';
    _el('cp-error').classList.add('hidden');
    _el('cp-success').classList.add('hidden');
  }

  function showSetPassword() {
    _showView('view-set-password');
    _el('sp-password').value = '';
    _el('sp-confirm').value = '';
    _el('sp-error').classList.add('hidden');
  }

  function showRemovePassword() {
    _showView('view-remove-password');
    _el('rp-password').value = '';
    _el('rp-error').classList.add('hidden');
  }

  function _updateGenPreview() {
    const len = parseInt(_el('gen-length').value) || 20;
    _el('gen-length-display').textContent = len;
    const opts = {
      uppercase: _el('gen-upper').checked,
      lowercase: _el('gen-lower').checked,
      numbers: _el('gen-numbers').checked,
      symbols: _el('gen-symbols').checked
    };
    const pw = PasswordGenerator.generate(len, opts);
    _el('gen-preview').value = pw;
    const strength = PasswordGenerator.calculateStrength(pw);
    _el('gen-strength').textContent = 'Strength: ' + strength;
    _el('gen-strength').className = 'strength-badge strength-' + strength;
  }

  function _addCustomField(name, value) {
    const container = _el('add-edit-custom-fields');
    const div = document.createElement('div');
    div.className = 'custom-field-row';

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.className = 'cf-name';
    nameInput.placeholder = 'Field Name';
    nameInput.value = name || '';

    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.className = 'cf-value';
    valueInput.placeholder = 'Field Value';
    valueInput.value = value || '';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn btn-sm btn-outline-danger cf-remove';
    removeBtn.textContent = '\u00D7';
    removeBtn.setAttribute('aria-label', 'Remove field');
    removeBtn.addEventListener('click', () => div.remove());

    div.appendChild(nameInput);
    div.appendChild(valueInput);
    div.appendChild(removeBtn);
    container.appendChild(div);
  }

  function collectCustomFields() {
    const fields = [];
    document.querySelectorAll('.custom-field-row').forEach(row => {
      const name = row.querySelector('.cf-name').value.trim();
      const value = row.querySelector('.cf-value').value.trim();
      if (name) fields.push({ name, value });
    });
    return fields;
  }

  function showNotification(msg, type) {
    const notif = _el('notification');
    notif.textContent = msg;
    notif.className = 'notification ' + (type || 'info');
    notif.classList.remove('hidden');
    setTimeout(() => notif.classList.add('hidden'), 3000);
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else if (theme === 'light') root.setAttribute('data-theme', 'light');
    else root.removeAttribute('data-theme');
  }

  function bindEvents(handlers) {
    _el('settings-btn').addEventListener('click', showSettings);
    _el('settings-back-btn').addEventListener('click', showHome);
    _el('settings-autolock').addEventListener('change', e => {
      DatabaseModule.saveSetting('autoLock', e.target.value);
      showNotification('Auto-lock setting saved');
    });
    _el('settings-theme').addEventListener('change', e => {
      DatabaseModule.saveSetting('theme', e.target.value);
      applyTheme(e.target.value);
      showNotification('Theme updated');
    });
    _el('settings-biometric-toggle').addEventListener('click', handlers.onToggleBiometric);
    _el('settings-set-pw-btn').addEventListener('click', showSetPassword);
    _el('settings-change-pw-btn').addEventListener('click', showChangePassword);
    _el('settings-remove-pw-btn').addEventListener('click', showRemovePassword);
    _el('settings-delete-all-btn').addEventListener('click', showDeleteAllData);
    _el('settings-export-btn').addEventListener('click', handlers.onExport);
    _el('settings-import-btn').addEventListener('click', () => _el('import-file-input').click());
    _el('import-file-input').addEventListener('change', handlers.onImport);
    _el('home-view-btn').addEventListener('click', () => showVault(_state.entries));
    _el('home-add-btn').addEventListener('click', showAddForm);

    _el('add-edit-save-btn').addEventListener('click', handlers.onSaveEntry);
    _el('add-edit-cancel-btn').addEventListener('click', showHome);
    _el('add-edit-service').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); _el('add-edit-username').focus(); } });
    _el('add-edit-username').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); _el('add-edit-password').focus(); } });
    _el('add-edit-password').addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const section = _el('add-edit-extra');
        if (section.classList.contains('hidden')) {
          handlers.onSaveEntry();
        } else {
          _el('add-edit-url').focus();
        }
      }
    });
    _el('add-edit-url').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); _el('add-edit-email').focus(); } });
    _el('add-edit-email').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); _el('add-edit-notes').focus(); } });
    _el('add-edit-notes').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); handlers.onSaveEntry(); } });
    _el('add-edit-toggle-pw').addEventListener('click', () => {
      const pw = _el('add-edit-password');
      const btn = _el('add-edit-toggle-pw');
      if (pw.type === 'password') { pw.type = 'text'; btn.textContent = 'Hide'; }
      else { pw.type = 'password'; btn.textContent = 'Show'; }
    });
    _el('add-edit-gen-btn').addEventListener('click', () => _el('password-generator-modal').classList.remove('hidden'));
    _el('add-more-details-btn').addEventListener('click', () => {
      const section = _el('add-edit-extra');
      section.classList.toggle('hidden');
    });
    _el('add-custom-field-btn').addEventListener('click', () => _addCustomField('', ''));

    _el('gen-close-btn').addEventListener('click', () => _el('password-generator-modal').classList.add('hidden'));
    _el('gen-length').addEventListener('input', _updateGenPreview);
    _el('gen-upper').addEventListener('change', _updateGenPreview);
    _el('gen-lower').addEventListener('change', _updateGenPreview);
    _el('gen-numbers').addEventListener('change', _updateGenPreview);
    _el('gen-symbols').addEventListener('change', _updateGenPreview);
    _el('gen-generate-btn').addEventListener('click', _updateGenPreview);
    _el('gen-copy-btn').addEventListener('click', () => {
      const pw = _el('gen-preview').value;
      navigator.clipboard.writeText(pw).then(() => {
        showNotification('Password copied to clipboard');
      }).catch(() => {
        _el('gen-preview').select();
        document.execCommand('copy');
        showNotification('Password copied to clipboard');
      });
    });
    _el('gen-use-btn').addEventListener('click', () => {
      _el('add-edit-password').value = _el('gen-preview').value;
      _el('password-generator-modal').classList.add('hidden');
      showNotification('Password inserted into form');
    });

    _el('vault-search-input').addEventListener('input', e => { _state.searchQuery = e.target.value; _renderEntryList(); });
    _el('vault-sort').addEventListener('change', e => { _state.sortBy = e.target.value; _renderEntryList(); });

    _el('entry-list').addEventListener('click', e => {
      const item = e.target.closest('.entry-item');
      if (item) {
        const entryId = item.dataset.id;
        const entry = _state.entries.find(en => en.id === entryId);
        if (entry) handlers.onView(entryId);
      }
    });

    _el('view-show-btn').addEventListener('click', handlers.onViewShow);
    _el('view-copy-username-btn').addEventListener('click', handlers.onViewCopyUsername);
    _el('view-copy-pw-btn').addEventListener('click', handlers.onViewCopy);
    _el('view-edit-btn').addEventListener('click', () => handlers.onEdit(_el('view-edit-btn').dataset.id));
    _el('view-delete-btn').addEventListener('click', () => handlers.onDelete(_el('view-delete-btn').dataset.id));
    _el('view-back-btn').addEventListener('click', () => showVault(_state.entries));

    _el('delete-cancel-btn').addEventListener('click', () => showVault(_state.entries));
    _el('delete-confirm-btn').addEventListener('click', handlers.onDeleteConfirm);

    _el('vault-back-btn').addEventListener('click', showHome);

    _el('cp-cancel-btn').addEventListener('click', showSettings);
    _el('cp-save-btn').addEventListener('click', handlers.onChangePassword);
    _el('cp-current').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); _el('cp-new').focus(); } });
    _el('cp-new').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); _el('cp-confirm').focus(); } });
    _el('cp-confirm').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); handlers.onChangePassword(); } });
    _el('sp-cancel-btn').addEventListener('click', showSettings);
    _el('sp-save-btn').addEventListener('click', handlers.onSetPassword);
    _el('sp-password').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); _el('sp-confirm').focus(); } });
    _el('sp-confirm').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); handlers.onSetPassword(); } });
    _el('rp-cancel-btn').addEventListener('click', showSettings);
    _el('rp-save-btn').addEventListener('click', handlers.onRemovePassword);

    _el('import-cancel-btn').addEventListener('click', () => showSettings());
    _el('import-confirm-btn').addEventListener('click', handlers.onImportConfirm);
    _el('delete-all-cancel-btn').addEventListener('click', showSettings);
    _el('delete-all-confirm-btn').addEventListener('click', handlers.onDeleteAllData);

    _el('unlock-btn').addEventListener('click', handlers.onUnlock);
    _el('unlock-password').addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); handlers.onUnlock(); }
    });
    _el('biometric-unlock-btn').addEventListener('click', handlers.onBiometricUnlock);

    _el('password-generator-modal').addEventListener('click', (e) => {
      if (e.target === _el('password-generator-modal')) {
        _el('password-generator-modal').classList.add('hidden');
      }
    });
  }

  return {
    showHome, showUnlock, showAddForm, showEditForm, showVault, showViewScreen, showSettings,
    showDeleteConfirm, showImportConfirm, showDeleteAllData, showChangePassword,
    showSetPassword, showRemovePassword, showNotification,
    bindEvents, applyTheme, collectCustomFields, _addCustomField, setEntries
  };
})();