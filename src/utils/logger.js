/**
 * A customizable logger class for logging messages with different log levels and colors.
 */
class Logger {
  /**
   * Creates a Logger instance with the specified options.
   *
   * @param {Object} options - Logger options.
   * @param {string} [options.logLevel="info"] - The default log level.
   * @param {string} [options.customColor] - Custom color for messages (ANSI escape code).
   */
  constructor(options = {}) {
    /**
     * The current log level.
     * @type {string}
     */
    this.logLevel = options.logLevel || "info";

    /**
     * Color codes for log levels and custom messages.
     * @type {Object}
     */
    this.colors = {
      logging: "\x1b[32m", // Green
      info: "\x1b[36m", // Cyan
      warn: "\x1b[33m", // Yellow
      error: "\x1b[31m", // Red
      custom: options.customColor || "\x1b[0m", // Default color
    };
  }

  /**
   * Logs a message with the "logging" log level.
   *
   * @param {string} message - The message to log.
   */
  log(message) {
    this.print("logging", "[INFO]", message);
  }

  /**
   * Logs an informational message with the "info" log level.
   *
   * @param {string} message - The message to log.
   */
  info(message) {
    this.print("info", "[INFO]", message);
  }

  /**
   * Logs a warning message with the "warn" log level.
   *
   * @param {string} message - The message to log.
   */
  warn(message) {
    this.print("warn", "[WARN]", message);
  }

  /**
   * Logs an error message with the "error" log level.
   *
   * @param {string} message - The message to log.
   */
  error(message) {
    this.print("error", "[ERROR]", message);
  }

  /**
   * Logs memory usage information with the "memory" log level.
   *
   * @param {string} message - A message to include with the memory usage information.
   */
  memory(message) {
    const usage = process.memoryUsage();
    this.print(
      "memory",
      "[MEMORY]",
      `${message} - RSS: ${usage.rss} | Heap: ${usage.heapUsed}/${usage.heapTotal}`,
    );
  }

  /**
   * Logs a custom message with the specified color.
   *
   * @param {string} message - The custom message to log.
   * @param {string} colorCode - The custom color code (ANSI escape code).
   */
  customLog(message, colorCode) {
    this.print("custom", "[CUSTOM]", message, colorCode);
  }

  /**
   * Prints a log message with the specified level, label, and message.
   *
   * @param {string} level - The log level.
   * @param {string} label - The label to prepend to the message.
   * @param {string} message - The message to log.
   * @param {string} [colorCode] - The color code for the message (ANSI escape code).
   */
  print(level, label, message, colorCode = this.colors[level]) {
    if (this.shouldLog(level)) {
      console.log(`${colorCode}${label}\x1b[0m ${message}`);
    }
  }

  /**
   * Checks if a log message with the given level should be logged based on the current log level setting.
   *
   * @param {string} level - The log level to check.
   * @return {boolean} True if the message should be logged, otherwise false.
   */
  shouldLog(level) {
    const logLevels = ["info", "warn", "error"];
    return logLevels.indexOf(level) >= logLevels.indexOf(this.logLevel);
  }
}

module.exports = new Logger({ logLevel: "memory" });
