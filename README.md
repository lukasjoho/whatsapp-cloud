# WhatsApp Cloud

A TypeScript SDK for the WhatsApp Cloud API that doesn't make you gnash your teeth.

**Why this one?**

- ✅ **Complete coverage** — Messages, media, templates, WABAs, phone numbers, webhooks. All of it.
- ✅ **Zod-first** — Schemas are the source of truth. Types are inferred. No more guessing.
- ✅ **Flexible config** — Set `accessToken` once, set IDs on client or override per-request.
- ✅ **Logical structure** — `client.phoneNumbers.qrCodes.create()` reads like it should.
- ✅ **Powerful webhooks** — Filter by phone number ID, run `beforeHandler` for shared logic, then route to type-safe handlers.

## Quick Start

```typescript
import { WhatsAppClient } from "whatsapp-cloud";

// Instantiate the client
const client = new WhatsAppClient({
  accessToken: "WHATSAPP_ACCESS_TOKEN", //Bare minimum. Every namespace needs the system user access token.
  phoneNumberId: "PHONE_NUMBER_ID", // Optional: Can be provided per request
  businessAccountId: "BUSINESS_ACCOUNT_ID", //Optional: Can be provided per request
});

// Send a text message
const response = await client.messages.sendText({
  to: "+1234567890",
  text: {
    body: "Hello, World!",
  },
});
```

## Webhooks (Next.js Example)

Handle incoming WhatsApp messages in a Next.js API route:

```typescript
// app/api/webhook/route.ts
import { WhatsAppClient } from "whatsapp-cloud";
import { NextRequest, NextResponse } from "next/server";

const client = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN!,
  phoneNumberId: process.env.PHONE_NUMBER_ID,
});

// Webhook verification (GET request from Meta)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const challenge = client.webhooks.verify(
    {
      "hub.mode": searchParams.get("hub.mode") || undefined,
      "hub.verify_token": searchParams.get("hub.verify_token") || undefined,
      "hub.challenge": searchParams.get("hub.challenge") || undefined,
    },
    process.env.WEBHOOK_VERIFY_TOKEN!
  );

  if (challenge) {
    return new NextResponse(challenge);
  }

  return new NextResponse("Forbidden", { status: 403 });
}

// Handle incoming messages (POST request from Meta)
export async function POST(request: NextRequest) {
  const payload = await request.json();

  client.webhooks.handle(
    payload,
    {
      // Runs before every handler - fetch user, log, etc.
      beforeHandler: async (message, ctx) => {
        const user = await db.users.findByPhone(message.from);
        console.log(`[${ctx.metadata.displayPhoneNumber}] Message from ${message.from}`);
        return { user };
      },

      text: async (message, ctx, before) => {
        await client.messages.sendText({
          to: `+${message.from}`,
          text: { body: `Hey ${before?.user?.name || "there"}! You said: ${message.text.body}` },
        });
      },

      image: async (message, ctx, before) => {
        const imageData = await client.media.download(message.image.id);
        // Process image...
        await client.messages.sendText({
          to: `+${message.from}`,
          text: { body: "Image received!" },
        });
      },
    },
    {
      // Only handle messages for this phone number (useful for multi-tenant setups)
      filter: { phoneNumberIds: [process.env.PHONE_NUMBER_ID!] },
    }
  );

  return NextResponse.json({ success: true });
}
```

## API Support

| Resource           | Status | Description                                                  |
| ------------------ | ------ | ------------------------------------------------------------ |
| **Messages**       | ✅     | Send text, media, location, contacts, interactive, reactions |
| **Media**          | ✅     | Upload, download, get info, delete                           |
| **Templates**      | ✅     | CRUD operations for message templates                        |
| **Webhooks**       | ✅     | Verify, extract, handle incoming events                      |
| **WABAs**          | ✅     | Manage WhatsApp Business Accounts                            |
| **Phone Numbers**  | ✅     | Registration, verification, profiles                         |
| ↳ Block            | ✅     | Block/unblock users                                          |
| ↳ QR Codes         | ✅     | Create/manage QR codes                                       |
| ↳ Message History  | ✅     | Query delivery status history                                |
| ↳ Official Account | ✅     | OBA verification status                                      |
| Flows              | ❌     | Coming soon                                                  |
| Commerce           | ❌     | Coming soon                                                  |

## Method Reference

### Messages

```typescript
client.messages.send(message); // Generic send
client.messages.sendText(message); // Text message
client.messages.sendImage(message); // Image message
client.messages.sendLocation(message); // Location message
client.messages.sendReaction(message); // Reaction message
```

### Media

```typescript
client.media.upload(file, type); // Upload media
client.media.get(mediaId); // Get media info
client.media.download(mediaId); // Download binary
client.media.delete(mediaId); // Delete media
```

### Templates

```typescript
client.templates.create(data)              // Create template
client.templates.list(options?)            // List templates
client.templates.get(templateId)           // Get template
client.templates.update(templateId, data)  // Update template
client.templates.delete(templateName)      // Delete template
```

### Phone Numbers

```typescript
client.phoneNumbers.list(options?)                         // List numbers
client.phoneNumbers.get(phoneNumberId?)                    // Get number details
client.phoneNumbers.addPreverified(phoneNumber)            // Partner flow
client.phoneNumbers.create(data)                           // Standard flow
client.phoneNumbers.requestVerificationCode(data)          // Request code
client.phoneNumbers.verifyCode(data)                       // Verify code
client.phoneNumbers.register(data)                         // Register
client.phoneNumbers.deregister()                           // Deregister
client.phoneNumbers.getProfile()                           // Get business profile
client.phoneNumbers.updateProfile(data)                    // Update profile
```

### Phone Numbers → Block

```typescript
client.phoneNumbers.block.list(options?)   // List blocked users
client.phoneNumbers.block.add(users)       // Block users
client.phoneNumbers.block.remove(users)    // Unblock users
```

### Phone Numbers → QR Codes

```typescript
client.phoneNumbers.qrCodes.list(options?) // List QR codes
client.phoneNumbers.qrCodes.get(codeId)    // Get QR code
client.phoneNumbers.qrCodes.create(data)   // Create QR code
client.phoneNumbers.qrCodes.update(data)   // Update QR code
client.phoneNumbers.qrCodes.delete(codeId) // Delete QR code
```

### Phone Numbers → Message History

```typescript
client.phoneNumbers.messageHistory.list(options?)  // Query history
```

### Phone Numbers → Official Account

```typescript
client.phoneNumbers.officialAccount.get(); // Get OBA status
client.phoneNumbers.officialAccount.apply(data); // Apply for OBA
```

### WABAs (WhatsApp Business Accounts)

```typescript
client.wabas.list(options?)                    // List WABAs
client.wabas.listClient(options?)              // List client WABAs
client.wabas.get(wabaId?)                      // Get WABA
client.wabas.create(data)                      // Create WABA
client.wabas.update(data)                      // Update WABA
client.wabas.listSubscribedApps()              // List subscribed apps
client.wabas.subscribeApp()                    // Subscribe app
client.wabas.unsubscribeApp()                  // Unsubscribe app
client.wabas.listAssignedUsers(options?)       // List assigned users
client.wabas.addAssignedUser(userId, tasks)    // Add user
client.wabas.removeAssignedUser(userId)        // Remove user
client.wabas.listActivities(options?)          // List activities
```

### Webhooks

```typescript
client.webhooks.verify(params, token); // Verify webhook
client.webhooks.extractMessages(payload); // Extract messages
client.webhooks.extractStatuses(payload); // Extract statuses
client.webhooks.handle(payload, handlers); // Handle events
```
