export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getEnv(key: string): string | undefined {
  if (isBrowser()) {
    return undefined;
  }

  try {
    return process.env[key];
  } catch {
    return undefined;
  }
}

export function isEnabled(): boolean {
  const value = getEnv("DEVLOG_ENABLED");

  if (value === "false") return false;
  if (value === "true") return true;

  return true;
}

export function isDebugEnabled(): boolean {
  const value = getEnv("DEVLOG_ENABLED");
  if (value === "true") return true;
  if (value === "false") return false;

  const nodeEnv = getEnv("NODE_ENV");
  return nodeEnv !== "production";
}
