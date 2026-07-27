const PasswordGenerator = (() => {
  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '0123456789';
  const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  function generate(length, options) {
    let charset = '';
    if (options.uppercase) charset += UPPERCASE;
    if (options.lowercase) charset += LOWERCASE;
    if (options.numbers) charset += NUMBERS;
    if (options.symbols) charset += SYMBOLS;

    if (!charset) charset = LOWERCASE + NUMBERS;

    const bytes = crypto.getRandomValues(new Uint32Array(length));
    const arr = Array.from(bytes).map(v => charset[v % charset.length]);

    if (options.uppercase && !arr.some(c => c >= 'A' && c <= 'Z')) {
      const r = crypto.getRandomValues(new Uint32Array(2));
      arr[r[0] % length] = UPPERCASE[r[1] % UPPERCASE.length];
    }
    if (options.lowercase && !arr.some(c => c >= 'a' && c <= 'z')) {
      const r = crypto.getRandomValues(new Uint32Array(2));
      arr[r[0] % length] = LOWERCASE[r[1] % LOWERCASE.length];
    }
    if (options.numbers && !arr.some(c => c >= '0' && c <= '9')) {
      const r = crypto.getRandomValues(new Uint32Array(2));
      arr[r[0] % length] = NUMBERS[r[1] % NUMBERS.length];
    }
    if (options.symbols && !arr.some(c => SYMBOLS.includes(c))) {
      const r = crypto.getRandomValues(new Uint32Array(2));
      arr[r[0] % length] = SYMBOLS[r[1] % SYMBOLS.length];
    }
    return arr.join('');
  }

  function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    if (password.length >= 20) score += 1;
    if (score <= 2) return 'weak';
    if (score <= 4) return 'fair';
    if (score <= 6) return 'strong';
    return 'very-strong';
  }

  return { generate, calculateStrength };
})();
