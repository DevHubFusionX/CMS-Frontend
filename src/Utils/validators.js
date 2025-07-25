/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} Is valid URL
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Required field validation
 * @param {any} value - Value to check
 * @returns {boolean} Is field filled
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  return true;
};

/**
 * Min length validation
 * @param {string} value - String to check
 * @param {number} minLength - Minimum length
 * @returns {boolean} Is valid length
 */
export const minLength = (value, minLength) => {
  if (!value) return false;
  return value.length >= minLength;
};

/**
 * Max length validation
 * @param {string} value - String to check
 * @param {number} maxLength - Maximum length
 * @returns {boolean} Is valid length
 */
export const maxLength = (value, maxLength) => {
  if (!value) return true;
  return value.length <= maxLength;
};

/**
 * Form validator creator
 * @param {Object} rules - Validation rules
 * @returns {Function} Validator function
 */
export const createValidator = (rules) => {
  return (values) => {
    const errors = {};
    
    Object.keys(rules).forEach(field => {
      const fieldRules = rules[field];
      
      for (const rule of fieldRules) {
        const { test, message } = rule;
        const value = values[field];
        
        if (!test(value)) {
          errors[field] = message;
          break;
        }
      }
    });
    
    return errors;
  };
};