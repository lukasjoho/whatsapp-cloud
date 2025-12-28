# Webhooks

Handle incoming WhatsApp messages and status updates via webhooks.

## Quick Start

```typescript
import { WhatsAppClient } from "@whatsapp-cloud/sdk";

const client = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
});

// In your webhook endpoint
app.post("/webhook", async (req, res) => {
  // handle() returns IMMEDIATELY - handlers run in background
  client.webhooks.handle(req.body, {
    text: async (message, context) => {
      // This can take as long as needed (20s, 1min, etc.)
      // Webhook already returned 200, so Meta is happy

      // Process text message
      console.log(`Received: ${message.text.body} from ${message.from}`);

      // Store in database
      await db.messages.create({
        id: message.id,
        from: message.from,
        body: message.text.body,
        phoneNumberId: context.metadata.phoneNumberId,
      });

      // Send response
      await client.messages.sendText({
        to: `+${message.from}`,
        text: { body: "Got it!" },
      });
    },
  });

  // Returns 200 IMMEDIATELY (handlers continue in background)
  res.json({ success: true });
});
```

## Webhook Verification

Meta sends GET requests to verify your webhook endpoint:

```typescript
app.get("/webhook", (req, res) => {
  const challenge = client.webhooks.verify(req.query, process.env.VERIFY_TOKEN);
  if (challenge) {
    return res.send(challenge);
  }
  return res.status(403).send("Forbidden");
});
```

## Low-Level API

For more control, extract messages manually:

```typescript
const messages = client.webhooks.extractMessages(payload);
for (const message of messages) {
  // Custom processing
}
```

## API Reference

- `client.webhooks.verify(query, token)` - Verify GET request, returns challenge or null
- `client.webhooks.extractMessages(payload)` - Extract messages from payload
- `client.webhooks.extractStatuses(payload)` - Extract status updates
- `client.webhooks.handle(payload, handlers, options?)` - Handle with type-safe callbacks
