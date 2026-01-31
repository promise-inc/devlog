import type { Logger, LoggerConfig, LogLevel } from "./types.js";
import { isEnabled, isDebugEnabled } from "./env.js";
import { getCallerInfo } from "./context.js";
import { formatEntry } from "./formatter.js";

function shouldLog(level: LogLevel, config?: LoggerConfig): boolean {
  const enabled = config?.enabled ?? isEnabled();
  if (!enabled) return false;

  if (level === "debug") {
    return config?.debugEnabled ?? isDebugEnabled();
  }

  return true;
}

function logMethod(level: LogLevel, config?: LoggerConfig) {
  return (message: string, data?: unknown): void => {
    if (!shouldLog(level, config)) return;

    const caller = getCallerInfo();

    formatEntry({
      level,
      message,
      data,
      timestamp: new Date(),
      caller,
    });
  };
}

export function createLogger(config?: LoggerConfig): Logger {
  return {
    info: logMethod("info", config),
    warn: logMethod("warn", config),
    error: logMethod("error", config),
    success: logMethod("success", config),
    debug: logMethod("debug", config),
  };
}
