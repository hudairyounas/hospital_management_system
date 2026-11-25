/**
 * Formats an integer amount into Pakistani Rupees (PKR / Rs.)
 * Example: 3500 -> "Rs. 3,500"
 */
export function formatPKR(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}

/**
 * Validates Pakistani mobile and landline phone numbers.
 * Accepts:
 *  - 0300-1234567 / 0300 1234567 / 03001234567
 *  - +92 300 1234567 / +92-321-7654321 / +923001234567
 *  - 0092 333 1234567
 *  - Landlines e.g. 042-35550199 / +92 42 35550199
 */
export function isValidPakistaniPhone(input: string): boolean {
  const cleaned = input.trim().replace(/[\s()-]/g, '');
  if (!cleaned) return false;

  // Pakistani mobile pattern: (+92 | 0092 | 92 | 0) + 3XX + 7 digits
  const mobileRegex = /^(?:\+92|0092|92|0)3[0-9]{9}$/;
  // Major Pakistani city landline pattern: (+92 | 0092 | 92 | 0) + (21|42|51|41|61|71|81|91) + 7 to 8 digits
  const landlineRegex = /^(?:\+92|0092|92|0)(?:21|42|51|41|61|71|81|91)[0-9]{7,8}$/;

  return mobileRegex.test(cleaned) || landlineRegex.test(cleaned);
}

/**
 * Formats a clean display string for a Pakistani phone number
 */
export function normalizePakistaniPhone(input: string): string {
  const cleaned = input.trim().replace(/[\s()-]/g, '');
  const match = cleaned.match(/^(?:\+92|0092|92|0)(3[0-9]{2})([0-9]{7})$/);
  if (match) {
    return `+92 ${match[1]} ${match[2]}`;
  }
  return input.trim();
}

/**
 * Returns today's date string in YYYY-MM-DD (local time)
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Returns tomorrow's date string in YYYY-MM-DD
 */
export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Validates that a YYYY-MM-DD date string is today or in the future (not in the past)
 */
export function isFutureOrTodayDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const todayStr = getTodayDateString();
  return dateStr >= todayStr;
}

/**
 * Checks whether a date string falls on a Sunday (when standard OPD is closed)
 */
export function isSundayDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  return dateObj.getDay() === 0;
}

/**
 * Validates optional email format
 */
export function isValidEmail(email: string): boolean {
  if (!email.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Generates a clearly marked fictional demo reference number
 * Example: NMC-2026-4829
 */
export function generateDemoReferenceNumber(): string {
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `NMC-2026-${randomDigits}`;
}
