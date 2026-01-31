<p align="center">
  <img src="https://raw.githubusercontent.com/promise-inc/devlog/main/assets/logo.svg" alt="devlog" height="36" />
  <br><br>
  Simple logger with automatic context (file + line). Zero dependencies.
</p>

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

## Other packages by Promise Inc.

| Package | Description |
|---------|-------------|
| [`@promise-inc/ui-states`](https://www.npmjs.com/package/@promise-inc/ui-states) | Auto-generated skeleton loading states from real DOM — zero config React component |
| [`@promise-inc/ai-guard`](https://www.npmjs.com/package/@promise-inc/ai-guard) | Detect AI-generated code patterns before commit/push. Not a linter — a guard |

---

Developed by [Promise Inc.](https://promise.codes)
