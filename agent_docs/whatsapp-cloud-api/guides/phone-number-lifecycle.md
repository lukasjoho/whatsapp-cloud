# Phone Number Lifecycle Guide

This guide explains how phone numbers work in the WhatsApp Cloud API, including the full lifecycle from adding to fully operational.

## Overview

A phone number goes through several stages before it can send and receive messages:

```
ADD → VERIFY → REGISTER → SUBSCRIBE APP → OPERATIONAL
```

Each step is required. Skipping any step results in a non-functional number.

## The Full Lifecycle

### 1. Add Phone Number

**Endpoint:** `POST /{Business-ID}/add_phone_numbers`

Adds a phone number to your Business Portfolio and assigns it to a specific WABA.

```typescript
const result = await client.phoneNumbers.add({
  phone_number: "+14155551234",
  waba_id: "WABA_ID",
  verified_name: "My Business"
}, businessId);
```

**Status after this step:** Added (Ausstehend/Pending)

### 2. Verify Phone Number

**Endpoints:**
- `POST /{Phone-Number-ID}/request_code` - Request verification code
- `POST /{Phone-Number-ID}/verify_code` - Submit the code

Meta sends a verification code via SMS or voice call. You must submit this code back.

```typescript
// Step 2a: Request verification code
await client.phoneNumbers.requestVerificationCode({
  code_method: "SMS",  // or "VOICE"
  language: "en"
}, phoneNumberId);

// Step 2b: Submit the code you received
await client.phoneNumbers.verifyCode({
  code: "123456"
}, phoneNumberId);
```

**Status after this step:** Still Pending (verification alone doesn't activate)

### 3. Register Phone Number

**Endpoint:** `POST /{Phone-Number-ID}/register`

This activates the phone number on WhatsApp's servers.

```typescript
await client.phoneNumbers.register({
  messaging_product: "whatsapp",
  pin: "123456"  // 6-digit PIN for two-factor authentication
}, phoneNumberId);
```

**Status after this step:** Connected (Verbunden) - Number is now GREEN

### 4. Subscribe App to WABA

**Endpoint:** `POST /{WABA-ID}/subscribed_apps`

This allows your app to receive webhooks for the WABA. Without this, you can send messages but won't receive:
- Incoming messages
- Message status updates (delivered, read, failed)
- Any other webhook events

```typescript
await client.wabas.subscribeApp(wabaId);
```

**Status after this step:** Fully operational

## Status Meanings

| Status | German | Meaning |
|--------|--------|---------|
| Pending | Ausstehend | Number added but not registered |
| Connected | Verbunden | Number registered and operational |
| Disconnected | Getrennt | Number was deregistered |
| Banned | Gesperrt | Number violated policies |

## Troubleshooting

### Number shows "Ausstehend" (Pending)

The number was added but registration wasn't completed. To fix:

1. Request verification code: `client.phoneNumbers.requestVerificationCode(...)`
2. Submit the code: `client.phoneNumbers.verifyCode(...)`
3. Register: `client.phoneNumbers.register(...)`

### Can send but not receive messages

Your app isn't subscribed to the WABA. To fix:

```typescript
await client.wabas.subscribeApp(wabaId);
```

### Messages not sending from expected number

When using a single access token with multiple phone numbers, ensure you're using the correct `phoneNumberId`:

```typescript
// Wrong: Using default from config
await client.messages.sendText({ to: "...", text: { body: "Hello" } });

// Right: Explicitly specify which phone number
await client.messages.sendText(
  { to: "...", text: { body: "Hello" } },
  "correct-phone-number-id"
);
```

## ID Hierarchy

Understanding the ID hierarchy is crucial:

```
Business Portfolio (businessId)
└── Contains multiple WABAs
    │
    └── WABA (businessAccountId / wabaId)
        ├── Contains templates
        ├── Has subscribed apps
        └── Contains phone numbers
            │
            └── Phone Number (phoneNumberId)
                ├── Sends/receives messages
                └── Has business profile
```

## SDK Configuration

```typescript
const client = new WhatsAppClient({
  accessToken: "your-access-token",
  businessId: "111222333",           // Business Portfolio ID
  businessAccountId: "444555666",    // WABA ID
  phoneNumberId: "777888999",        // Phone Number ID
});
```

Each method knows which ID it needs:
- `client.business.get()` → uses businessId
- `client.wabas.list()` → uses businessId
- `client.wabas.get()` → uses businessAccountId
- `client.wabas.subscribeApp()` → uses businessAccountId
- `client.phoneNumbers.list()` → uses businessAccountId (lists phones in WABA)
- `client.phoneNumbers.register()` → uses phoneNumberId
- `client.messages.sendText()` → uses phoneNumberId

## Complete Setup Example

```typescript
import { WhatsAppClient } from "whatsapp-cloud";

const client = new WhatsAppClient({
  accessToken: process.env.ACCESS_TOKEN,
  businessId: process.env.BUSINESS_ID,
  businessAccountId: process.env.WABA_ID,
  phoneNumberId: process.env.PHONE_NUMBER_ID,
});

async function setupPhoneNumber() {
  // Step 1: Add phone number (if not already added via Meta Business Suite)
  const added = await client.phoneNumbers.add({
    phone_number: "+14155551234",
    waba_id: process.env.WABA_ID!,
    verified_name: "My Business"
  });
  console.log("Added phone number:", added.id);

  // Step 2a: Request verification code
  await client.phoneNumbers.requestVerificationCode({
    code_method: "SMS"
  }, added.id);
  console.log("Verification code sent via SMS");

  // Step 2b: Wait for user to enter code, then verify
  const code = await promptUserForCode(); // Your implementation
  await client.phoneNumbers.verifyCode({ code }, added.id);
  console.log("Phone number verified");

  // Step 3: Register
  await client.phoneNumbers.register({
    messaging_product: "whatsapp",
    pin: "123456"  // Let user choose their PIN
  }, added.id);
  console.log("Phone number registered - now CONNECTED");

  // Step 4: Subscribe app for webhooks
  await client.wabas.subscribeApp();
  console.log("App subscribed - ready to receive messages");
}
```

## Deregistering a Phone Number

To deregister (disconnect) a phone number:

```typescript
await client.phoneNumbers.deregister(phoneNumberId);
```

The number can be re-registered later by going through steps 2-4 again.
