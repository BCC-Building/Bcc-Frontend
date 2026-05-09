export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^[+]?[\d\s-]{10,}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
      return 'Please enter a valid phone number (min 10 digits)';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (!value || value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be at most ${max} characters`;
    }
    return null;
  },

  otp: (value) => {
    if (!value || value.length !== 6 || !/^\d{6}$/.test(value)) {
      return 'OTP must be exactly 6 digits';
    }
    return null;
  },
};

export function validateField(value, rules = []) {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}

export function validateForm(values, validationRules) {
  const errors = {};
  for (const [field, rules] of Object.entries(validationRules)) {
    const error = validateField(values[field], rules);
    if (error) errors[field] = error;
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}