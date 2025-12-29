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

## APIs

- `client.messages` - Send messages
- `client.webhooks` - Handle messages
- `client.accounts` - Manage WhatsApp Business Accounts
- `client.business` - Manage Business Portfolios
- `client.templates` - Create, retrieve and send WhatsApp templates
- ... more to come very soon. 🕒
