import type { LogEntry, LogLevel } from "./types.js";
import { isBrowser } from "./env.js";

const ANSI = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
} as const;

const LEVEL_COLORS: Record<LogLevel, string> = {
  debug: ANSI.gray,
  info: ANSI.blue,
  success: ANSI.green,
  warn: ANSI.yellow,
  error: ANSI.red,
};

const LEVEL_LABELS: Record<LogLevel, string> = {
  debug: "DEBUG",
  info: "INFO",
  success: "OK",
  warn: "WARN",
  error: "ERROR",
};

const BROWSER_LEVEL_STYLES: Record<LogLevel, string> = {
  debug: "color: #6b7280; font-weight: normal;",
  info: "color: #3b82f6; font-weight: bold;",
  success: "color: #22c55e; font-weight: bold;",
  warn: "color: #eab308; font-weight: bold;",
  error: "color: #ef4444; font-weight: bold;",
};

const BROWSER_CONSOLE_METHOD: Record<LogLevel, "log" | "warn" | "error" | "debug"> = {
  debug: "debug",
  info: "log",
  success: "log",
  warn: "warn",
  error: "error",
};

function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour12: false });
}

function shortenPath(filePath: string): string {
  const parts = filePath.split("/");
  if (parts.length <= 3) return filePath;
  return parts.slice(-3).join("/");
}

function formatNode(entry: LogEntry): void {
  const color = LEVEL_COLORS[entry.level];
  const label = LEVEL_LABELS[entry.level];
  const time = formatTimestamp(entry.timestamp);

  const callerStr = entry.caller
    ? `${ANSI.dim}${shortenPath(entry.caller.file)}:${entry.caller.line}${ANSI.reset}`
    : "";

  const prefix = `${ANSI.dim}${time}${ANSI.reset} ${color}${ANSI.bold}[${label}]${ANSI.reset}`;
  const line = callerStr
    ? `${prefix} ${entry.message} ${callerStr}`
    : `${prefix} ${entry.message}`;

  const method = entry.level === "error" ? "error" : entry.level === "warn" ? "warn" : "log";

  if (entry.data !== undefined) {
    console[method](line);
    console[method](entry.data);
  } else {
    console[method](line);
  }
}

function formatBrowser(entry: LogEntry): void {
  const label = LEVEL_LABELS[entry.level];
  const style = BROWSER_LEVEL_STYLES[entry.level];
  const time = formatTimestamp(entry.timestamp);
  const method = BROWSER_CONSOLE_METHOD[entry.level];

  const callerStr = entry.caller
    ? `${shortenPath(entry.caller.file)}:${entry.caller.line}`
    : "";

  const hasData = entry.data !== undefined;
  const groupLabel = `%c[${label}]%c ${time} ${entry.message}${callerStr ? ` (${callerStr})` : ""}`;

  if (hasData) {
    console.groupCollapsed(groupLabel, style, "color: inherit;");
    console[method](entry.data);
    console.groupEnd();
  } else {
    console[method](groupLabel, style, "color: inherit;");
  }
}

export function formatEntry(entry: LogEntry): void {
  if (isBrowser()) {
    formatBrowser(entry);
  } else {
    formatNode(entry);
  }
}
