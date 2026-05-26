/**
 * Shared Utilities - Validators
 */

/**
 * Validate email
 */
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate phone number
 */
export function validatePhone(phone) {
  const regex = /^[6-9]\d{9}$/; // Indian phone format
  return regex.test(phone);
}

/**
 * Validate URL
 */
export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const isLongEnough = password.length >= 8;

  return {
    isValid: hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough,
    strength:
      (hasUpperCase + hasLowerCase + hasNumbers + hasSpecialChar + (isLongEnough ? 1 : 0)) / 5,
    requirements: {
      uppercase: hasUpperCase,
      lowercase: hasLowerCase,
      numbers: hasNumbers,
      specialChar: hasSpecialChar,
      length: isLongEnough,
    },
  };
}

/**
 * Check if field is empty
 */
export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
}

export default {
  validateEmail,
  validatePhone,
  validateURL,
  validatePasswordStrength,
  isEmpty,
};
