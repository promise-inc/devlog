# devlog

Simple logger with automatic context (file + line). Zero dependencies.

## Install

```bash
npm install devlog
```

## Usage

```ts
import { log } from "devlog";

log.info("User created", { userId: 42 });
log.warn("Deprecated method");
log.error("Failed to save", err);
log.success("Migration complete");
log.debug("Cache hit", { key: "users:1" });
```

## Custom instance

```ts
import { createLogger } from "devlog";

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

### Node.js

Colored output with ANSI escape codes:

```
14:30:00 [INFO] User created src/services/user.ts:42
```

### Browser

Uses `console.groupCollapsed` with `%c` styling for colored labels. Data is nested inside collapsible groups.

## Levels

- `debug` — Gray, only in development
- `info` — Blue
- `success` — Green
- `warn` — Yellow
- `error` — Red

---

Developed by [Promise Inc.](https://promise.codes)
