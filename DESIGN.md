# WhatsApp Cloud API SDK - Design Document

## 🎯 Vision

Build the most well-designed, type-safe, and developer-friendly WhatsApp Cloud API SDK for TypeScript/JavaScript. The SDK should feel intuitive, provide excellent autocomplete, and handle all the complexity of the WhatsApp Business Platform APIs.

## 📚 API Overview

Based on the WhatsApp Business Platform documentation, we have three main API categories:

### 1. **WhatsApp Cloud API** (Messaging)

- Send messages (text, media, interactive, location, contacts, etc.)
- Make and receive calls
- Manage group conversations
- Base URL: `https://graph.facebook.com/v{version}/{phone-number-id}/messages`

### 2. **Business Management API** (Account Management)

- Manage WhatsApp Business Accounts (WABA)
- Manage business phone numbers
- Create and manage message templates
- Access analytics (messaging, pricing, templates)
- Base URL: `https://graph.facebook.com/v{version}/{waba-id}/...`

### 3. **Marketing Messages Lite API** (Optimized Marketing)

- Send optimized marketing messages
- Quality-based delivery
- Performance metrics and recommendations
- Conversion tracking

### 4. **Webhooks** (Event Handling)

- Receive incoming messages
- Message status updates
- Account updates
- Template status changes

## 🏗️ Architecture Design

### Core Principles

1. **Schemas First** - Zod schemas are the single source of truth, types are inferred
2. **AI-Ready** - Zod schemas enable LLM function calling and validation
3. **Type Safety** - TypeScript types inferred from schemas for full type safety
4. **Discriminated Unions** - Type-safe message/response variants using Zod
5. **Namespace-based organization** - Clear separation of concerns
6. **Best-Practice Structure** - Inspired by Vercel AI SDK & Stripe
7. **Error handling** - Comprehensive error types and messages
8. **Extensibility** - Easy to add new features without breaking changes
9. **Developer experience** - Excellent autocomplete and documentation

### Package Structure

**See [STRUCTURE.md](./STRUCTURE.md) for the complete, detailed package structure.**

The structure follows a **types-first, schema-driven** approach:

```
src/
├── types/          # TypeScript type definitions (lead with types)
├── schemas/        # Zod schemas (AI-ready, runtime validation)
├── services/       # Service implementations
├── client/         # Client classes
└── utils/          # Utilities
```

**Key Pattern**: Types → Schemas → Services

1. Define TypeScript types first
2. Create corresponding Zod schemas
3. Implement services using both types and schemas

## 🎨 API Design

### Client Initialization

```typescript
// Simple initialization
const client = new WhatsAppClient({
  accessToken: "your-access-token",
  phoneNumberId: "123456789", // Optional, can be set per request
  apiVersion: "v18.0", // Optional, defaults to latest
});

// With full configuration
const client = new WhatsAppClient({
  accessToken: "your-access-token",
  phoneNumberId: "123456789",
  businessAccountId: "987654321", // WABA ID
  apiVersion: "v18.0",
  baseURL: "https://graph.facebook.com", // Optional override
  timeout: 30000, // Request timeout in ms
  retry: {
    maxRetries: 3,
    retryDelay: 1000,
  },
});
```

### Namespace Structure

**Initial Release** (Phase 1):

- ✅ Messages Service
- ✅ Templates Service
- ✅ Accounts Service (including Phone Numbers)

**Future Releases**:

- ⏳ Groups Service (deferred)
- ⏳ Analytics Service (deferred)
- ⏳ Webhooks Service (deferred)
- ⏳ Calls Service (if needed)

```typescript
// Messages namespace
client.messages.sendText({ to: '+1234567890', body: 'Hello!' });
client.messages.sendImage({ to: '+1234567890', imageUrl: '...' });
client.messages.sendTemplate({ to: '+1234567890', templateName: 'welcome', language: 'en' });

// Templates namespace
client.templates.create({ name: 'welcome', category: 'MARKETING', components: [...] });
client.templates.list();
client.templates.get('template-id');
client.templates.delete('template-id');

// Accounts namespace
client.accounts.getProfile();
client.accounts.updateProfile({ about: 'New about text' });

// Phone numbers (sub-namespace of accounts)
client.accounts.phoneNumbers.list();
client.accounts.phoneNumbers.get('phone-number-id');
client.accounts.phoneNumbers.update('phone-number-id', { displayName: 'New Name' });
```

## 🔧 Detailed Design Decisions

### 1. Phone Number ID Handling

**Problem**: Most Cloud API endpoints require a `phone-number-id` in the URL path, but it's not always available at client initialization.

**Solution**:

- Accept `phoneNumberId` in constructor (for single-number use cases)
- Allow per-request override via method parameters
- Support multi-number scenarios with explicit phone number ID in each call

```typescript
// Option 1: Set at client level
const client = new WhatsAppClient({
  accessToken: "...",
  phoneNumberId: "123456789",
});
client.messages.sendText({ to: "+1234567890", body: "Hello!" });

// Option 2: Override per request
const client = new WhatsAppClient({ accessToken: "..." });
client.messages.sendText({
  to: "+1234567890",
  body: "Hello!",
  phoneNumberId: "123456789", // Override
});
```

### 2. Message Builders

For complex messages (interactive, template with parameters, media with captions), provide fluent builders:

```typescript
// Simple messages - direct API
client.messages.sendText({ to: "+1234567890", body: "Hello!" });

// Complex messages - builder pattern
const message = client.messages
  .builder()
  .to("+1234567890")
  .template("welcome")
  .language("en")
  .addParameter("1", "John")
  .addParameter("2", "Doe")
  .build();

await client.messages.send(message);
```

### 3. Schema-First Approach (AI-Ready)

**Schema-First Pattern**: Define Zod schemas → Infer TypeScript types → Implement services.

**Why Schema-First?**

- ✅ Single source of truth (schema)
- ✅ AI-ready (LLMs work with Zod schemas directly)
- ✅ Types automatically stay in sync
- ✅ Less duplication
- ✅ Modern best practice (tRPC, Next.js, etc.)

```typescript
// 1. Define Zod schema first (src/schemas/messages/request.ts)
import { z } from "zod";

export const sendTextRequestSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
  body: z.string().min(1).max(4096),
  previewUrl: z.boolean().optional(),
  phoneNumberId: z.string().optional(),
});

// 2. Infer type from schema
export type SendTextRequest = z.infer<typeof sendTextRequestSchema>;

// 3. Optional: Re-export in types/ for convenience (src/types/messages/request.ts)
export type { SendTextRequest } from "../../schemas/messages/request";

// 4. Use in service (src/services/messages/methods/send-text.ts)
import { sendTextRequestSchema } from "../../../schemas/messages/request";
import type { SendTextRequest } from "../../../schemas/messages/request";

export async function sendText(
  client: HttpClient,
  request: SendTextRequest
): Promise<MessageResponse> {
  // Runtime validation with Zod (AI-ready)
  const validated = sendTextRequestSchema.parse(request);
  // Implementation...
}
```

**Discriminated Unions for Message Types** (Schema-First):

```typescript
// 1. Define Zod schemas for each variant (src/schemas/messages/message.ts)
import { z } from "zod";

export const textMessageSchema = z.object({
  type: z.literal("text"),
  text: z.object({
    body: z.string().min(1).max(4096),
    previewUrl: z.boolean().optional(),
  }),
});

export const imageMessageSchema = z.object({
  type: z.literal("image"),
  image: z
    .object({
      link: z.string().url().optional(),
      id: z.string().optional(),
      caption: z.string().max(1024).optional(),
    })
    .refine((data) => data.link || data.id, "Either link or id required"),
});

// ... other message schemas

// 2. Discriminated union schema
export const messageContentSchema = z.discriminatedUnion("type", [
  textMessageSchema,
  imageMessageSchema,
  // ... etc
]);

// 3. Infer types from schemas
export type MessageContent = z.infer<typeof messageContentSchema>;
export type TextMessage = z.infer<typeof textMessageSchema>;
export type ImageMessage = z.infer<typeof imageMessageSchema>;
```

This enables:

- ✅ Full type safety with TypeScript
- ✅ Runtime validation with Zod
- ✅ AI/LLM tool calling (Zod schemas are perfect for function calling)
- ✅ Type narrowing with discriminated unions

### 4. Error Handling

```typescript
try {
  await client.messages.sendText({ to: "+1234567890", body: "Hello!" });
} catch (error) {
  if (error instanceof WhatsAppAPIError) {
    switch (error.code) {
      case 131056: // Rate limit
        // Handle rate limiting
        break;
      case 100: // Invalid parameter
        // Handle validation error
        break;
      default:
      // Handle other errors
    }
  }
}
```

### 5. Business Account vs Phone Number Context

**Problem**: Business Management API uses WABA ID, Cloud API uses phone number ID.

**Solution**:

- Store both IDs in client config
- Automatically use correct ID based on namespace
- Allow explicit override when needed

```typescript
const client = new WhatsAppClient({
  accessToken: "...",
  phoneNumberId: "123456789", // For Cloud API
  businessAccountId: "987654321", // For Business Management API
});

// Cloud API uses phoneNumberId automatically
client.messages.sendText({ to: "+1234567890", body: "Hello!" });

// Business Management API uses businessAccountId automatically
client.templates.list(); // Uses businessAccountId
```

### 6. API Versioning

```typescript
// Default to latest stable
const client = new WhatsAppClient({ accessToken: "..." });

// Explicit version
const client = new WhatsAppClient({
  accessToken: "...",
  apiVersion: "v18.0",
});

// Per-request override (if needed for migration)
client.messages.sendText({
  to: "+1234567890",
  body: "Hello!",
  apiVersion: "v17.0", // Override
});
```

## 📦 Service Details

### Messages Service

**Endpoints covered:**

- `POST /{phone-number-id}/messages` - Send messages
- `GET /{phone-number-id}/messages/{message-id}` - Get message status

**Methods:**

```typescript
class MessagesService {
  // Text messages
  sendText(request: SendTextRequest): Promise<MessageResponse>;

  // Media messages
  sendImage(request: SendImageRequest): Promise<MessageResponse>;
  sendVideo(request: SendVideoRequest): Promise<MessageResponse>;
  sendAudio(request: SendAudioRequest): Promise<MessageResponse>;
  sendDocument(request: SendDocumentRequest): Promise<MessageResponse>;
  sendSticker(request: SendStickerRequest): Promise<MessageResponse>;

  // Interactive messages
  sendInteractive(request: SendInteractiveRequest): Promise<MessageResponse>;
  sendButton(request: SendButtonRequest): Promise<MessageResponse>;
  sendList(request: SendListRequest): Promise<MessageResponse>;

  // Location & contacts
  sendLocation(request: SendLocationRequest): Promise<MessageResponse>;
  sendContacts(request: SendContactsRequest): Promise<MessageResponse>;

  // Template messages
  sendTemplate(request: SendTemplateRequest): Promise<MessageResponse>;

  // Reactions
  sendReaction(request: SendReactionRequest): Promise<MessageResponse>;

  // Read receipts
  markAsRead(messageId: string): Promise<void>;

  // Message status
  getStatus(messageId: string): Promise<MessageStatus>;

  // Builder for complex messages
  builder(): MessageBuilder;
}
```

### Templates Service

**Endpoints covered:**

- `POST /{waba-id}/message_templates` - Create template
- `GET /{waba-id}/message_templates` - List templates
- `GET /{template-id}` - Get template
- `DELETE /{template-id}` - Delete template

**Methods:**

```typescript
class TemplatesService {
  create(request: CreateTemplateRequest): Promise<TemplateResponse>;
  list(filters?: TemplateFilters): Promise<TemplateListResponse>;
  get(templateId: string): Promise<TemplateResponse>;
  update(
    templateId: string,
    request: UpdateTemplateRequest
  ): Promise<TemplateResponse>;
  delete(templateId: string): Promise<void>;
  getStatus(templateId: string): Promise<TemplateStatus>;
}
```

### Accounts Service

**Endpoints covered:**

- `GET /{phone-number-id}` - Get phone number info
- `PATCH /{phone-number-id}` - Update phone number
- `GET /{waba-id}` - Get WABA info
- `GET /{waba-id}/phone_numbers` - List phone numbers

**Methods:**

```typescript
class AccountsService {
  // WABA operations
  getBusinessAccount(wabaId?: string): Promise<BusinessAccountResponse>;

  // Phone number operations (sub-namespace)
  phoneNumbers: {
    list(wabaId?: string): Promise<PhoneNumberListResponse>;
    get(phoneNumberId: string): Promise<PhoneNumberResponse>;
    update(
      phoneNumberId: string,
      request: UpdatePhoneNumberRequest
    ): Promise<PhoneNumberResponse>;
    getMetrics(
      phoneNumberId: string,
      period: MetricsPeriod
    ): Promise<PhoneNumberMetrics>;
  };

  // Profile operations
  getProfile(phoneNumberId?: string): Promise<ProfileResponse>;
  updateProfile(
    phoneNumberId: string,
    request: UpdateProfileRequest
  ): Promise<ProfileResponse>;
}
```

### Services Not in Initial Release

The following services are planned for future releases:

- **Analytics Service** - Deferred to Phase 2
- **Groups Service** - Deferred to Phase 2
- **Webhooks Service** - Deferred to Phase 2
- **Calls Service** - Deferred (if needed)

## 🎯 Design Questions & Decisions

### Q1: Should we support both callback and promise-based APIs?

**Decision**: Promise-based only (async/await). Modern JavaScript/TypeScript standard.

### Q2: How to handle pagination?

**Decision**: Provide both manual and automatic pagination:

```typescript
// Manual pagination
const response = await client.templates.list({ limit: 50 });
if (response.paging?.next) {
  const nextPage = await client.templates.list({
    limit: 50,
    after: response.paging.cursors.after,
  });
}

// Automatic pagination (helper method)
const allTemplates = await client.templates.listAll(); // Fetches all pages
```

### Q3: Should we include request/response interceptors?

**Decision**: Yes, for logging, retry logic, and custom headers:

```typescript
const client = new WhatsAppClient({
  accessToken: "...",
  interceptors: {
    request: [
      (config) => {
        console.log("Request:", config);
        return config;
      },
    ],
    response: [
      (response) => {
        console.log("Response:", response);
        return response;
      },
    ],
    error: [
      (error) => {
        console.error("Error:", error);
        return Promise.reject(error);
      },
    ],
  },
});
```

### Q4: How to handle rate limiting?

**Decision**: Built-in retry with exponential backoff:

```typescript
const client = new WhatsAppClient({
  accessToken: "...",
  retry: {
    maxRetries: 3,
    retryDelay: 1000,
    retryableStatusCodes: [429, 503, 504],
    onRetry: (attempt, error) => {
      console.log(`Retry attempt ${attempt}:`, error);
    },
  },
});
```

### Q5: Should we validate inputs?

**Decision**: Yes, with helpful error messages:

```typescript
// Validate phone number format
client.messages.sendText({
  to: "invalid", // Throws ValidationError with helpful message
  body: "Hello!",
});
```

### Q6: How to handle webhook verification and parsing?

**Decision**: Deferred to Phase 2. Will provide utilities when webhooks service is implemented.

## 🧪 Testing Strategy

1. **Unit tests** - Test each service method with mocked HTTP client
2. **Integration tests** - Test against WhatsApp API (with test credentials)
3. **Type tests** - Ensure TypeScript types are correct
4. **Error handling tests** - Test all error scenarios

## 📝 Documentation Plan

1. **README.md** - Quick start, installation, basic examples
2. **API Reference** - Generated from TypeScript types
3. **Guides** - Common use cases, best practices
4. **Examples** - Real-world examples for each feature
5. **Migration guides** - When breaking changes occur

## 🚀 Implementation Phases

### Phase 1: Foundation (Schemas First)

- [ ] Core schemas: `common.ts`, `errors.ts` with Zod
- [ ] Core types: Infer from schemas (or explicit for complex cases like `client.ts`)
- [ ] `HttpClient` class with error handling
- [ ] `WhatsAppClient` base class (skeleton)
- [ ] Error schemas with discriminated unions

### Phase 2: Messages Service

- [ ] Schemas: `messages/request.ts`, `messages/response.ts`, `messages/message.ts` with discriminated unions
- [ ] Types: Infer from schemas (re-export in `types/` for convenience)
- [ ] Service: `MessagesService` class
- [ ] Methods: `sendText`, `sendImage`, `sendVideo`, `sendAudio`, `sendDocument`
- [ ] Methods: `sendLocation`, `sendContacts`, `sendTemplate`, `sendInteractive`, `sendReaction`
- [ ] Methods: `markAsRead`, `getStatus`

### Phase 3: Templates Service

- [ ] Schemas: `templates/request.ts`, `templates/response.ts`, `templates/template.ts` with discriminated unions
- [ ] Types: Infer from schemas (re-export in `types/` for convenience)
- [ ] Service: `TemplatesService` class
- [ ] Methods: `create`, `list`, `get`, `update`, `delete`, `getStatus`

### Phase 4: Accounts Service

- [ ] Schemas: `accounts/*` (WABA, phone numbers, profile) with Zod validation
- [ ] Types: Infer from schemas (re-export in `types/` for convenience)
- [ ] Service: `AccountsService` class
- [ ] Methods: `getProfile`, `updateProfile`
- [ ] Service: `PhoneNumbersService` class
- [ ] Methods: `list`, `get`, `update`

### Phase 5: Polish & Documentation

- [ ] Comprehensive error handling
- [ ] Input validation with helpful messages
- [ ] JSDoc documentation for all public APIs
- [ ] Usage examples
- [ ] Unit tests for schemas
- [ ] Integration tests for services

### Future Phases (Phase 2+)

- [ ] Analytics Service
- [ ] Groups Service
- [ ] Webhooks Service
- [ ] Calls Service (if needed)
- [ ] Marketing Messages Lite API

## 💭 Open Questions for Discussion

1. **Should we support both ESM and CJS?**

   - Current setup supports both via tsup ✅

2. **How to handle different API versions?**

   - Default to latest, allow override per client/request

3. **Should we provide a CLI tool?**

   - Maybe in future, focus on SDK first

4. **How to handle file uploads for media?**

   - Support both URL and file path/stream

5. **Should we cache template lists?**

   - Optional caching layer, configurable TTL

6. **How to handle webhook signature verification?**
   - Provide utility methods, but don't enforce

## 🎨 Code Style & Conventions

- **Naming**: camelCase for methods, PascalCase for types/classes
- **Async**: Always use async/await, never callbacks
- **Types**: Explicit types everywhere, no `any` unless absolutely necessary
- **Schemas**: Every type has a corresponding Zod schema
- **Discriminated Unions**: Use for all variant types (messages, errors, etc.)
- **Errors**: Custom error classes with discriminated union types
- **Documentation**: JSDoc comments for all public methods

## 🔑 Key Design Patterns

### Schemas → Types → Services

1. **Define Zod schemas first** (`src/schemas/`) - Single source of truth, AI-ready
2. **Infer TypeScript types** (`src/types/`) - Automatic type safety from schemas
3. **Implement services** (`src/services/`) - Use schemas for validation, types for safety

### Discriminated Unions

Use discriminated unions for:

- Message content types (`text`, `image`, `video`, etc.)
- Template component types (`header`, `body`, `button`)
- API error types (rate limit, invalid parameter, etc.)
- Response variants

### Schema Validation

Every service method:

1. Accepts typed request (inferred from schema)
2. Validates with Zod schema (runtime validation)
3. Returns typed response (inferred from schema)
4. Handles errors with typed error classes (inferred from schema)

**Key Benefit**: Types and schemas are always in sync because types are inferred from schemas.

---

## 📚 Related Documents

- **[STRUCTURE.md](./STRUCTURE.md)** - Complete package structure with file organization
- Detailed type definitions
- Schema patterns
- Service implementation patterns

---

## ✅ Design Decisions Made

1. **Schemas First** - Zod schemas are the single source of truth, types are inferred
2. **AI-Ready** - Zod schemas enable LLM function calling and validation
3. **Type Safety** - TypeScript types inferred from schemas (always in sync)
4. **Discriminated Unions** - Type-safe variants using Zod discriminated unions
5. **Initial Scope** - Messages, Templates, Accounts only
6. **Best-Practice Structure** - Inspired by Vercel AI SDK & Stripe
7. **Namespace Organization** - Clear separation of concerns

**See [SCHEMA_VS_TYPE_ANALYSIS.md](./SCHEMA_VS_TYPE_ANALYSIS.md) for detailed reasoning on schema-first approach.**

Ready to start implementation! 🚀
