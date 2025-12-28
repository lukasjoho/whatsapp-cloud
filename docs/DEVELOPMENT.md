# Development Guide

## Local Development with npm/pnpm link

To test the SDK in your own project without publishing to npm:

### Step 1: Link the package (in whatsapp-cloud directory)

```bash
cd /Users/lukas/Developer/whatsapp-cloud
pnpm build  # Build the package first
pnpm link --global  # Creates a global symlink
```

Or with npm:

```bash
npm link
```

### Step 2: Link in your project

```bash
cd /path/to/your/project
pnpm link whatsapp-cloud
```

Or with npm:

```bash
npm link whatsapp-cloud
```

**What this does:** Creates a symlink in your project's `node_modules` pointing to your local package. You don't need to:

- Add it to `package.json` (link handles it)
- Run `pnpm install` (link is enough)
- Publish to npm

### Step 3: Use it in your project

```typescript
import { WhatsAppClient, type IncomingTextMessage } from "whatsapp-cloud";

const client = new WhatsAppClient({
  accessToken: "...",
});
```

### Important Notes

- **Rebuild after changes**: After making changes to whatsapp-cloud, run `pnpm build` in the whatsapp-cloud directory
- **Hot reload**: Some bundlers (like Next.js) may need a restart to pick up changes
- **Unlink**: When done, unlink with `pnpm unlink whatsapp-cloud` in your project

## Production / CI/CD

For production builds and CI/CD, you have a few options:

### Option 1: Publish to npm (Recommended)

Once ready, publish the package:

```bash
cd /Users/lukas/Developer/whatsapp-cloud
pnpm publish
```

Then in your project's `package.json`:

```json
{
  "dependencies": {
    "whatsapp-cloud": "^0.0.5"
  }
}
```

### Option 2: Git dependency (For private repos)

If your repo is private, use git dependency:

```json
{
  "dependencies": {
    "whatsapp-cloud": "git+https://github.com/your-username/whatsapp-cloud.git"
  }
}
```

### Option 3: Local file path (For monorepos)

If both projects are in the same repo/monorepo:

```json
{
  "dependencies": {
    "whatsapp-cloud": "file:../whatsapp-cloud"
  }
}
```

### Option 4: Conditional linking (Dev vs Prod)

Use environment detection:

```json
{
  "dependencies": {
    "whatsapp-cloud": process.env.NODE_ENV === "development"
      ? "link:../whatsapp-cloud"
      : "^0.0.5"
  }
}
```

**Note:** For CI/CD, you'll need Option 1 (npm publish) or Option 2 (git dependency). `pnpm link` only works locally.

## Type Exports

All types are properly exported and can be imported in React/Next.js projects:

```typescript
// Import client
import { WhatsAppClient } from "whatsapp-cloud";

// Import types
import type {
  IncomingTextMessage,
  IncomingMessage,
  WebhookPayload,
  MessageContext,
  CreateTemplateRequest,
  // ... all other types
} from "whatsapp-cloud";

// Import schemas (for validation)
import {
  incomingTextMessageSchema,
  webhookPayloadSchema,
  // ... all other schemas
} from "whatsapp-cloud";
```

## Verifying Exports

To verify all types are exported correctly:

```bash
# In your project
pnpm exec tsc --noEmit --skipLibCheck
```

This will check that all imported types are available.
