# WhatsApp Cloud

**This project is a work in progress 👷.**\\
A WhatsApp client tailored for LLMs - built to actually work.

## Usage

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

  // handle() returns immediately - handlers run asynchronously
  client.webhooks.handle(payload, {
    text: async (message, context) => {
      console.log(
        `Text from ${context.contact?.name || message.from}: ${
          message.text.body
        }`
      );

      // Send a reply
      await client.messages.sendText({
        to: `+${message.from}`,
        text: { body: `You said: ${message.text.body}` },
      });
    },

    image: async (message, context) => {
      console.log(`Image from ${context.contact?.name || message.from}`);

      // Download the image
      const imageData = await client.webhooks.downloadMedia(message.image.id);

      // Process the image (save to storage, analyze, etc.)
      // const buffer = Buffer.from(imageData);
      // await saveToStorage(buffer, message.image.id);

      // Send a reply
      await client.messages.sendText({
        to: `+${message.from}`,
        text: { body: "Image received! 📸" },
      });
    },
  });

  // Return 200 immediately (handlers continue in background)
  return NextResponse.json({ success: true });
}
```

## APIs

- `client.messages` - Send messages
- `client.webhooks` - Handle messages
- `client.accounts` - Manage WhatsApp Business Accounts
- `client.business` - Manage Business Portfolios
- `client.templates` - Create, retrieve and send WhatsApp templates
- ... more to come very soon. 🕒
