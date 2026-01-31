export const LOG_LEVELS = {
  debug: 0,
  info: 1,
  success: 2,
  warn: 3,
  error: 4,
} as const;

export type LogLevel = keyof typeof LOG_LEVELS;

export interface CallerInfo {
  file: string;
  line: number;
  column: number;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: Date;
  caller: CallerInfo | null;
}

export interface LoggerConfig {
  enabled?: boolean;
  debugEnabled?: boolean;
}

export interface Logger {
  info: (message: string, data?: unknown) => void;
  warn: (message: string, data?: unknown) => void;
  error: (message: string, data?: unknown) => void;
  success: (message: string, data?: unknown) => void;
  debug: (message: string, data?: unknown) => void;
}
