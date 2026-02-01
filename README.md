<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/devlog/main/assets/logo.svg" alt="devlog" height="36" />
  <br><br>
  Simple logger with automatic context (file + line). Zero dependencies.
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/devlog/main/assets/output.svg" alt="devlog output" width="680" />
</p>

## Why?

Standard `console.log` tells you nothing about where a log came from:

- No file name, no line number
- No visual distinction between info, warnings, and errors
- No way to disable debug logs in production
- Scattered `console.log("here")` everywhere

`devlog` adds **automatic context** to every log — file, line, and level — with zero configuration.

## Install

```bash
npm install @promise-inc/devlog
```

## Usage

```ts
import { log } from "@promise-inc/devlog";

log.info("User created", { userId: 42 });
log.warn("Deprecated method");
log.error("Failed to save", err);
log.success("Migration complete");
log.debug("Cache hit", { key: "users:1" });
```

## Custom instance

```ts
import { createLogger } from "@promise-inc/devlog";

const logger = createLogger({
  enabled: true,
  debugEnabled: false,
});

logger.info("Custom logger");
```

## Environment variables

| Variable | Effect |
|----------|--------|
| `DEVLOG_ENABLED=false` | Disables all logs |
| `DEVLOG_ENABLED=true` | Enables all logs including debug |
| `NODE_ENV=production` | Disables debug level (unless `DEVLOG_ENABLED=true`) |

## Output

- **Node.js** — Colored output with ANSI escape codes
- **Browser** — `console.groupCollapsed` with `%c` styling. Data nested inside collapsible groups

## How to report bugs

To report a bug, please first read our guide on [opening issues](https://github.com/promise-inc/devlog/issues).

## How to contribute code

To open a pull request, please first read our guide on [opening pull requests](https://github.com/promise-inc/devlog/pulls), which outlines our process for RFCs and pull requests.

## Also by Promise Inc.

| Package | Description |
|---------|-------------|
| [`@promise-inc/ai-guard`](https://github.com/promise-inc/ai-guard) | Detect AI-generated code patterns |
| [`@promise-inc/ps-guard`](https://github.com/promise-inc/ps-guard) | Lighthouse-based performance guard |
| [`@promise-inc/fs-guard`](https://github.com/promise-inc/fs-guard) | Validate project folder and file structure |
| [`@promise-inc/ui-states`](https://github.com/promise-inc/ui-states) | Auto-generated skeleton loading states |
| [`@promise-inc/dev-reel`](https://github.com/promise-inc/dev-reel) | Animated SVG previews for READMEs |

---

Developed by [Promise Inc.](https://promise.codes)

## License

MIT © [Promise Inc.](https://promise.codes)
