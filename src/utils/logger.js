class Logger {
    constructor(options = {}) {
      this.logLevel = options.logLevel || "info";
      this.colors = {
        logging: "\x1b[32m", // Green
        info: "\x1b[36m",  // Cyan
        warn: "\x1b[33m",  // Yellow
        error: "\x1b[31m", // Red
        custom: options.customColor || "\x1b[0m", // Default color
      };
    }
  
    log(message) {
      this.print("logging", "[INFO]", message);
    }
  
    info(message) {
      this.print("info", "[INFO]", message);
    }
  
    warn(message) {
      this.print("warn", "[WARN]", message);
    }
  
    error(message) {
      this.print("error", "[ERROR]", message);
    }

    memory(message) {
        const usage = process.memoryUsage();
        this.print("memory", "[MEMORY]", `${message} - RSS: ${usage.rss} | Heap: ${usage.heapUsed}/${usage.heapTotal}`);
    }
  
    customLog(message, colorCode) {
      this.print("custom", "[CUSTOM]", message, colorCode);
    }
  
    print(level, label, message, colorCode = this.colors[level]) {
      if (this.shouldLog(level)) {
        console.log(`${colorCode}${label}\x1b[0m ${message}`);
      }
    }
  
    shouldLog(level) {
      const logLevels = ["info", "warn", "error"];
      return logLevels.indexOf(level) >= logLevels.indexOf(this.logLevel);
    }
  }
  
  module.exports = Logger;
  