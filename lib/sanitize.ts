export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

export function isValidIndianPhone(phone: string): boolean {
  if (!phone) return false;
  // Strip non-digit characters
  const digits = phone.replace(/\D/g, '');
  // Must be exactly 10 digits and start with 6-9
  return /^[6-9]\d{9}$/.test(digits);
}
