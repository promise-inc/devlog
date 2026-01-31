<img src="https://raw.githubusercontent.com/promise-inc/devlog/main/assets/logo.svg" alt="devlog" height="36" />

Simple logger with automatic context (file + line). Zero dependencies.

<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/devlog/main/assets/output.svg" alt="devlog output" width="680" />
</p>

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

---

Developed by [Promise Inc.](https://promise.codes)
