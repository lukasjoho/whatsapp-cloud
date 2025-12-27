# Incoming Messages & Webhooks - Brainstorming Document

## 🎯 Goal

Add incoming message handling to the WhatsApp Cloud SDK. Since this is a **client SDK** (not a server framework), we need to provide:
1. **Webhook verification utilities** - Help verify GET requests from Meta
2. **Signature validation utilities** - Validate POST request signatures
3. **Webhook payload parsing** - Parse and validate incoming webhook payloads
4. **Message handlers** - Type-safe handler system for processing incoming messages
5. **Type definitions** - Complete type safety for incoming messages

## 📋 Key Requirements from Meta Docs

### Webhook Verification (GET)
- Meta sends: `GET /webhook?hub.mode=subscribe&hub.challenge=<CHALLENGE>&hub.verify_token=<TOKEN>`
- We must: Compare `hub.verify_token` with our stored token
- Response: Return `hub.challenge` as plain text with 200 status if valid

### Webhook Signature Validation (POST)
- Meta sends: `X-Hub-Signature-256: sha256=<HASH>` header
- We must: Generate HMAC-SHA256 hash using `app_secret` as key
- Validation: Compare our hash with the header value

### Webhook Payload Structure
```json
{
  "object": "whatsapp_business_account",
  "entry": [{
    "id": "102290129340398",
    "changes": [{
      "value": {
        "messaging_product": "whatsapp",
        "metadata": {
          "display_phone_number": "15550783881",
          "phone_number_id": "106540352242922"
        },
        "contacts": [{ "profile": { "name": "Sheena Nelson" }, "wa_id": "16505551234" }],
        "messages": [{ "from": "16505551234", "id": "wamid...", "timestamp": "1749416383", "type": "text", "text": { "body": "Hello!" } }],
        "statuses": [{ ... }] // For outgoing message status updates
      },
      "field": "messages"
    }]
  }]
}
```

## 🏗️ Architecture Proposal

### 1. Webhooks Service Namespace

Similar to `messages`, `accounts`, `business`, we add a `webhooks` namespace:

```typescript
const client = new WhatsAppClient({
  accessToken: "...",
  appSecret: "...", // Required for signature validation
});

// Webhook utilities
client.webhooks.verify(request) // Verify GET request
client.webhooks.validateSignature(request, body) // Validate POST signature
client.webhooks.parse(payload) // Parse webhook payload
```

### 2. Incoming Message Types & Schemas

Create schemas for incoming messages (mirroring outgoing structure):

```
src/
├── schemas/
│   └── webhooks/
│       ├── index.ts
│       ├── payload.ts          # WebhookPayloadSchema
│       ├── incoming-message.ts # IncomingMessage schemas (text, image, audio, etc.)
│       └── status.ts           # Message status update schemas
├── types/
│   └── webhooks/
│       ├── index.ts
│       ├── payload.ts
│       ├── incoming-message.ts
│       └── status.ts
```

### 3. Handler System

Provide a handler system that users can implement:

```typescript
// User's handler implementation
const handlers = {
  text: async (message: IncomingTextMessage, context: MessageContext) => {
    // Process text message
    return { messages: [{ type: "text", text: { body: "Hello back!" } }] };
  },
  image: async (message: IncomingImageMessage, context: MessageContext) => {
    // Process image message
    return { messages: [] };
  },
};

// SDK provides the router/dispatcher
const result = await client.webhooks.handle(payload, handlers);
```

## 🔧 Implementation Details

### Option A: Framework-Agnostic Utilities (Recommended)

**Pros:**
- Works with any framework (Express, Hono, Next.js, etc.)
- Users implement their own endpoints
- SDK provides validation/parsing utilities

**Cons:**
- Users need to wire up routes themselves
- More boilerplate for users

**Structure:**
```typescript
// src/services/webhooks/WebhooksService.ts
export class WebhooksService {
  /**
   * Verify webhook GET request from Meta
   */
  verify(request: { query: { hub_mode?: string; hub_verify_token?: string; hub_challenge?: string } }, verifyToken: string): string | null {
    if (request.query.hub_mode === "subscribe" && request.query.hub_verify_token === verifyToken) {
      return request.query.hub_challenge || null;
    }
    return null;
  }

  /**
   * Validate webhook POST signature
   */
  validateSignature(body: string, signature: string, appSecret: string): boolean {
    // HMAC-SHA256 validation
  }

  /**
   * Parse webhook payload
   */
  parse(payload: unknown): WebhookPayload {
    // Validate and parse using Zod schema
  }

  /**
   * Extract incoming messages from payload
   */
  extractMessages(payload: WebhookPayload): IncomingMessage[] {
    // Flatten messages from nested structure
  }

  /**
   * Extract status updates from payload
   */
  extractStatuses(payload: WebhookPayload): MessageStatus[] {
    // Extract status updates
  }
}
```

### Option B: Framework Adapters

**Pros:**
- Easier to use for specific frameworks
- Less boilerplate

**Cons:**
- Need to maintain multiple adapters
- Framework-specific dependencies

**Structure:**
```typescript
// src/adapters/express.ts
export function createExpressWebhookHandler(client: WhatsAppClient, handlers: MessageHandlers) {
  return async (req: Request, res: Response) => {
    // Handle GET verification
    if (req.method === "GET") {
      const challenge = client.webhooks.verify(req.query, process.env.VERIFY_TOKEN);
      if (challenge) return res.send(challenge);
      return res.status(403).send("Forbidden");
    }

    // Handle POST messages
    const isValid = client.webhooks.validateSignature(req.body, req.headers["x-hub-signature-256"], process.env.APP_SECRET);
    if (!isValid) return res.status(401).send("Invalid signature");

    const payload = client.webhooks.parse(req.body);
    await client.webhooks.handle(payload, handlers);
    return res.json({ success: true });
  };
}
```

### Option C: Hybrid Approach (Best of Both)

Provide utilities + optional framework helpers:

```typescript
// Core utilities (always available)
client.webhooks.verify(...)
client.webhooks.validateSignature(...)
client.webhooks.parse(...)

// Optional framework helpers (separate exports)
import { createExpressHandler } from "@whatsapp-cloud/express";
import { createHonoHandler } from "@whatsapp-cloud/hono";
```

## 📦 Proposed File Structure

```
src/
├── services/
│   └── webhooks/
│       ├── index.ts
│       ├── WebhooksService.ts        # Core service class
│       ├── WebhooksClient.ts         # (if needed, similar to MessagesClient)
│       ├── utils/
│       │   ├── verify.ts             # GET verification logic
│       │   ├── validate-signature.ts # POST signature validation
│       │   ├── parse-payload.ts      # Payload parsing
│       │   └── extract-messages.ts   # Extract messages from payload
│       └── handlers/
│           ├── index.ts
│           ├── types.ts              # Handler types
│           └── dispatcher.ts        # Message type dispatcher
├── schemas/
│   └── webhooks/
│       ├── index.ts
│       ├── payload.ts                # WebhookPayloadSchema
│       ├── incoming-message.ts       # Incoming message schemas
│       └── status.ts                 # Status update schemas
└── types/
    └── webhooks/
        ├── index.ts
        ├── payload.ts
        ├── incoming-message.ts
        └── status.ts
```

## 🎨 API Design Examples

### Basic Usage (Framework-Agnostic)

```typescript
import { WhatsAppClient } from "@whatsapp-cloud/sdk";
import express from "express";

const client = new WhatsAppClient({
  accessToken: process.env.ACCESS_TOKEN,
  appSecret: process.env.APP_SECRET, // For signature validation
});

const app = express();
app.use(express.json());

// GET /webhook - Verification
app.get("/webhook", (req, res) => {
  const challenge = client.webhooks.verify(req.query, process.env.VERIFY_TOKEN);
  if (challenge) {
    res.send(challenge);
  } else {
    res.status(403).send("Forbidden");
  }
});

// POST /webhook - Incoming messages
app.post("/webhook", async (req, res) => {
  const signature = req.headers["x-hub-signature-256"] as string;
  const bodyString = JSON.stringify(req.body);

  // Validate signature
  if (!client.webhooks.validateSignature(bodyString, signature, process.env.APP_SECRET)) {
    return res.status(401).send("Invalid signature");
  }

  // Parse payload
  const payload = client.webhooks.parse(req.body);

  // Extract messages
  const messages = client.webhooks.extractMessages(payload);
  const statuses = client.webhooks.extractStatuses(payload);

  // Process messages
  for (const message of messages) {
    if (message.type === "text") {
      // Handle text message
      await client.messages.sendText({
        to: message.from,
        text: { body: "Echo: " + message.text.body },
      });
    }
  }

  res.json({ success: true });
});
```

### With Handler System

```typescript
// Define handlers
const handlers = {
  text: async (message: IncomingTextMessage, context: MessageContext) => {
    console.log(`Received: ${message.text.body}`);
    return {
      messages: [{
        type: "text" as const,
        text: { body: `You said: ${message.text.body}` },
      }],
    };
  },
  image: async (message: IncomingImageMessage, context: MessageContext) => {
    // Download and process image
    const imageData = await client.webhooks.downloadMedia(message.image.id);
    return { messages: [] };
  },
};

// Use dispatcher
app.post("/webhook", async (req, res) => {
  // ... validation ...
  const payload = client.webhooks.parse(req.body);
  await client.webhooks.handle(payload, handlers);
  res.json({ success: true });
});
```

## 💾 Database Storage Considerations

### When to Store Messages?

**Option 1: Store on Send (Outgoing)**
```typescript
// User sends message
const response = await client.messages.sendText({ to: "+1234567890", text: { body: "Hello" } });

// Store immediately
await db.messages.create({
  id: response.messages[0].id,
  to: "+1234567890",
  from: phoneNumberId,
  body: "Hello",
  status: "sent", // Initial status
  sentAt: new Date(),
});
```

**Pros:**
- Immediate record in database
- Can track messages even if webhook fails
- Good for UI showing "sending..." state

**Cons:**
- Status might be outdated (webhook updates it)
- Need to handle webhook updates separately

**Option 2: Store on Webhook (Status Update)**
```typescript
// User sends message
await client.messages.sendText({ to: "+1234567890", text: { body: "Hello" } });

// Don't store yet, wait for webhook

// In webhook handler
app.post("/webhook", async (req, res) => {
  const payload = client.webhooks.parse(req.body);
  const statuses = client.webhooks.extractStatuses(payload);

  for (const status of statuses) {
    if (status.status === "sent") {
      // Now store the message
      await db.messages.create({
        id: status.id,
        to: status.recipient_id,
        from: phoneNumberId,
        body: "...", // Problem: we don't have the body!
        status: status.status,
        sentAt: new Date(parseInt(status.timestamp) * 1000),
      });
    }
  }
});
```

**Pros:**
- Single source of truth (webhook)
- Always has accurate status

**Cons:**
- Status webhook doesn't include message body/content
- Can't show "sending..." state in UI
- If webhook fails, message is lost

**Option 3: Hybrid Approach (Recommended)**

```typescript
// 1. Store on send with "pending" status
const response = await client.messages.sendText({ to: "+1234567890", text: { body: "Hello" } });

await db.messages.create({
  id: response.messages[0].id,
  to: "+1234567890",
  from: phoneNumberId,
  body: "Hello",
  status: "pending", // Initial status
  sentAt: new Date(),
});

// 2. Update on webhook status
app.post("/webhook", async (req, res) => {
  const payload = client.webhooks.parse(req.body);
  const statuses = client.webhooks.extractStatuses(payload);

  for (const status of statuses) {
    await db.messages.update({
      where: { id: status.id },
      data: {
        status: status.status, // "sent", "delivered", "read", "failed"
        deliveredAt: status.status === "delivered" ? new Date(parseInt(status.timestamp) * 1000) : undefined,
        readAt: status.status === "read" ? new Date(parseInt(status.timestamp) * 1000) : undefined,
      },
    });
  }
});
```

**For Incoming Messages:**
```typescript
// Always store on webhook (only source of truth)
app.post("/webhook", async (req, res) => {
  const payload = client.webhooks.parse(req.body);
  const messages = client.webhooks.extractMessages(payload);

  for (const message of messages) {
    await db.messages.create({
      id: message.id,
      from: message.from,
      to: phoneNumberId,
      type: message.type,
      body: message.type === "text" ? message.text.body : null,
      receivedAt: new Date(parseInt(message.timestamp) * 1000),
      status: "received",
    });
  }
});
```

## 🎯 Recommended Approach

### Phase 1: Core Utilities (MVP)
1. ✅ Webhook verification utility
2. ✅ Signature validation utility
3. ✅ Payload parsing with Zod schemas
4. ✅ Type definitions for incoming messages
5. ✅ Extract messages/statuses from payload

### Phase 2: Handler System
1. ✅ Handler type definitions
2. ✅ Message dispatcher/router
3. ✅ Media download utility (for images/audio)

### Phase 3: Framework Helpers (Optional)
1. Express adapter
2. Hono adapter
3. Next.js API route helper

## 🤔 Open Questions

1. **Should we include media download utilities?**
   - Yes, it's a common need and requires auth token
   - Provide: `client.webhooks.downloadMedia(mediaId)`

2. **How to handle multiple phone numbers?**
   - Webhook payload includes `phone_number_id` in metadata
   - Users can filter/route based on this

3. **Should we provide a built-in handler dispatcher?**
   - Yes, but make it optional
   - Users can also manually iterate messages

4. **Error handling strategy?**
   - Validation errors throw (invalid signature, malformed payload)
   - Handler errors should be caught and logged (don't break webhook response)

5. **Status updates - separate handler?**
   - Yes, provide separate handler type for status updates
   - Many apps only care about messages, not statuses

## 📝 Next Steps

1. Create schemas for incoming messages (mirror outgoing structure)
2. Implement webhook verification utility
3. Implement signature validation utility
4. Create WebhooksService class
5. Add to WhatsAppClient namespace
6. Write examples and documentation

