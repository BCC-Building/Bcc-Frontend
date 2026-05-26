/**
 * Logger Service
 * 
 * Responsibility: Centralized logging
 * Principle: Single Responsibility - logging only
 */

const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

class LoggerService {
  static isDev = import.meta.env.DEV;

  /**
   * Format log message
   */
  static format(level, label, message, data = null) {
    const timestamp = new Date().toISOString();
    const logMsg = `[${timestamp}] [${level}] ${label}: ${message}`;

    if (data) {
      return { logMsg, data };
    }

    return logMsg;
  }

  /**
   * Log debug message
   */
  static debug(label, message, data = null) {
    if (!this.isDev) return;

    const formatted = this.format(LOG_LEVELS.DEBUG, label, message, data);
    if (data) {
      console.debug(formatted.logMsg, formatted.data);
    } else {
      console.debug(formatted);
    }
  }

  /**
   * Log info message
   */
  static info(label, message, data = null) {
    const formatted = this.format(LOG_LEVELS.INFO, label, message, data);
    if (data) {
      console.info(formatted.logMsg, formatted.data);
    } else {
      console.info(formatted);
    }
  }

  /**
   * Log warning message
   */
  static warn(label, message, data = null) {
    const formatted = this.format(LOG_LEVELS.WARN, label, message, data);
    if (data) {
      console.warn(formatted.logMsg, formatted.data);
    } else {
      console.warn(formatted);
    }
  }

  /**
   * Log error message
   */
  static error(label, message, error = null) {
    const formatted = this.format(LOG_LEVELS.ERROR, label, message, error);
    if (error) {
      console.error(formatted.logMsg, error);
    } else {
      console.error(formatted);
    }
  }

  /**
   * Log performance metrics
   */
  static performance(label, duration) {
    this.debug(label, `Completed in ${duration}ms`);
  }
}

export default LoggerService;
