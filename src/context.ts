import type { CallerInfo } from "./types.js";

const NODE_STACK_REGEX = /at\s+.*\((.+):(\d+):(\d+)\)/;
const NODE_STACK_REGEX_NO_PARENS = /at\s+(.+):(\d+):(\d+)/;
const BROWSER_STACK_REGEX = /(?:@)(.+):(\d+):(\d+)/;

function parseLine(line: string): CallerInfo | null {
  const nodeMatch = line.match(NODE_STACK_REGEX);
  if (nodeMatch) {
    return {
      file: nodeMatch[1],
      line: Number(nodeMatch[2]),
      column: Number(nodeMatch[3]),
    };
  }

  const nodeMatchNoParens = line.match(NODE_STACK_REGEX_NO_PARENS);
  if (nodeMatchNoParens) {
    return {
      file: nodeMatchNoParens[1],
      line: Number(nodeMatchNoParens[2]),
      column: Number(nodeMatchNoParens[3]),
    };
  }

  const browserMatch = line.match(BROWSER_STACK_REGEX);
  if (browserMatch) {
    return {
      file: browserMatch[1],
      line: Number(browserMatch[2]),
      column: Number(browserMatch[3]),
    };
  }

  return null;
}

export function getCallerInfo(): CallerInfo | null {
  const stack = new Error().stack;
  if (!stack) return null;

  const lines = stack.split("\n");

  // Skip: Error, getCallerInfo, logMethod, log.level → caller is at index 4+
  for (let i = 4; i < lines.length; i++) {
    const info = parseLine(lines[i]);
    if (info) return info;
  }

  return null;
}
