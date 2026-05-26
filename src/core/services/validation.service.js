/**
 * Validation Service
 * 
 * Responsibility: Centralized form validation
 * Principle: Single Responsibility - validation only
 */

const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]{10,}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

class ValidationService {
  /**
   * Validate email
   */
  static isValidEmail(email) {
    return REGEX.EMAIL.test(email);
  }

  /**
   * Validate phone
   */
  static isValidPhone(phone) {
    return REGEX.PHONE.test(phone);
  }

  /**
   * Validate URL
   */
  static isValidURL(url) {
    return REGEX.URL.test(url);
  }

  /**
   * Validate strong password
   */
  static isStrongPassword(password) {
    return REGEX.STRONG_PASSWORD.test(password);
  }

  /**
   * Validate required field
   */
  static isRequired(value) {
    return value !== null && value !== undefined && String(value).trim() !== '';
  }

  /**
   * Validate minimum length
   */
  static minLength(value, length) {
    return String(value).length >= length;
  }

  /**
   * Validate maximum length
   */
  static maxLength(value, length) {
    return String(value).length <= length;
  }

  /**
   * Validate number range
   */
  static inRange(value, min, max) {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  }

  /**
   * Validate file size (in MB)
   */
  static isFileSizeValid(file, maxSizeMB) {
    return file.size <= maxSizeMB * 1024 * 1024;
  }

  /**
   * Validate file type
   */
  static isFileTypeValid(file, allowedTypes) {
    return allowedTypes.includes(file.type);
  }

  /**
   * Validate form object
   */
  static validateForm(formData, rules) {
    const errors = {};

    Object.keys(rules).forEach((field) => {
      const value = formData[field];
      const fieldRules = rules[field];

      if (Array.isArray(fieldRules)) {
        for (const rule of fieldRules) {
          const error = this.validateRule(value, rule);
          if (error) {
            errors[field] = error;
            break;
          }
        }
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validate single rule
   */
  static validateRule(value, rule) {
    const { type, params, message } = rule;

    switch (type) {
      case 'required':
        return !this.isRequired(value) ? message : null;
      case 'email':
        return !this.isValidEmail(value) ? message : null;
      case 'phone':
        return !this.isValidPhone(value) ? message : null;
      case 'url':
        return !this.isValidURL(value) ? message : null;
      case 'minLength':
        return !this.minLength(value, params) ? message : null;
      case 'maxLength':
        return !this.maxLength(value, params) ? message : null;
      case 'pattern':
        return !params.test(value) ? message : null;
      default:
        return null;
    }
  }
}

export default ValidationService;
