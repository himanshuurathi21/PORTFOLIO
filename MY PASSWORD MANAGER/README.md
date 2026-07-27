# My Password Manager

A secure, local-first, offline-capable Progressive Web App (PWA) password manager.

## Features

- **Master Password Protection** — PBKDF2 + AES-256-GCM encryption
- **Biometric Unlock** — WebAuthn fingerprint/face unlock on supported devices
- **Password Generator** — Cryptographically secure random passwords
- **Search** — Search by service name, username, or email
- **Import/Export** — Encrypted backup & restore
- **Auto-Lock** — Configurable inactivity timeout
- **Dark/Light Mode** — System default, light, or dark
- **Offline-First** — Works without internet after first load
- **No Backend** — All data stays on your device

## How Encryption Works

```
Master Password
       ↓
PBKDF2 (600,000 iterations, SHA-256, unique random salt)
       ↓
256-bit AES-GCM Encryption Key
       ↓
AES-256-GCM (unique random IV per encryption)
       ↓
Encrypted Vault
       ↓
IndexedDB (browser storage)
```

- Your master password is **never stored** — only used to derive the encryption key
- A **unique random salt** (32 bytes) is generated for key derivation
- A **fresh random IV** (12 bytes) is generated for every encryption operation
- The encrypted vault stores: version, KDF parameters, salt, IV, and ciphertext
- Only the encrypted vault persists in IndexedDB
- Decrypted data exists only in memory while the vault is unlocked

## Biometric Support

On supported mobile devices (Android with fingerprint, iOS with Face ID/Touch ID, Windows Hello), you can unlock the app using biometrics via the WebAuthn API.

- **No biometric data is ever read or captured** by this application
- The browser/operating system handles all biometric verification
- If WebAuthn is unavailable, the app gracefully falls back to master password
- Feature detection is used — no false claims of support

## Running Locally

### Option 1: Basic (Limited PWA Features)

Open `index.html` directly in a browser. Basic UI works, but Service Workers and PWA installation may be blocked.

### Option 2: Local HTTP Server (Recommended)

```bash
# Python 3
python -m http.server 8000

# Then open:
# http://localhost:8000
```

This enables Service Workers, PWA installation, and full offline support.

### Option 3: VS Code Live Server

If using VS Code, install the Live Server extension and right-click `index.html` → "Open with Live Server".

## Installing as PWA on Mobile

1. Serve the app from a local HTTP server (or HTTPS for production)
2. On Android Chrome: tap the install banner or menu → "Add to Home screen"
3. On iOS Safari: tap Share → "Add to Home Screen"
4. The app will appear on your home screen as "My Password Manager"

**Note:** PWA installation requires a secure context (HTTPS or localhost). Simply copying files to a phone will not allow installation.

## Encrypted Backup & Restore

### Export
1. Go to Settings → Export Encrypted Backup
2. Save the `.json` file to a safe location
3. The file is encrypted — no plaintext passwords are exported

### Import
1. Go to Settings → Import Encrypted Backup
2. Select your backup file
3. Confirm the import (this replaces all existing data)
4. Unlock with your master password

## Project Structure

```
my-password-manager/
├── index.html              # Main HTML (all views)
├── manifest.json           # PWA manifest
├── service-worker.js       # Offline caching
├── css/
│   └── styles.css          # Responsive styles (dark/light)
├── js/
│   ├── crypto.js           # Web Crypto API (PBKDF2 + AES-256-GCM)
│   ├── database.js         # IndexedDB operations
│   ├── auth.js             # Master password + WebAuthn biometrics
│   ├── password-generator.js
│   ├── ui.js               # UI rendering & event binding
│   └── app.js              # Main application controller
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

## Security Notes

- Never store the master password as plaintext
- Never log passwords or sensitive data to console
- No analytics, tracking, or external network requests
- All data remains local to your device
- If you forget your master password, your vault **cannot** be recovered without an exported backup
- Change your master password periodically for best security
