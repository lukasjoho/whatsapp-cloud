# WhatsApp Cloud API SDK - Package Structure

## 🎯 Design Principles

1. **Schemas First** - Zod schemas are the single source of truth, types are inferred
2. **AI-Ready** - Zod schemas enable LLM function calling and validation
3. **Type Safety** - TypeScript types inferred from schemas for full type safety
4. **Discriminated Unions** - Type-safe message/response variants using Zod
5. **Best-Practice Structure** - Inspired by Vercel AI SDK & Stripe
6. **Namespace Organization** - Clear separation of concerns

## 📁 Complete Package Structure

```
whatsapp-cloud/
├── src/
│   ├── index.ts                          # Main entry point
│   │
│   ├── client/
│   │   ├── index.ts                      # Client exports
│   │   ├── WhatsAppClient.ts             # Main client class
│   │   └── HttpClient.ts                 # HTTP request abstraction
│   │
│   ├── schemas/                          # Zod schemas (PRIMARY - single source of truth)
│   │   ├── index.ts                      # Re-export all schemas
│   │   ├── common.ts                     # Shared schemas
│   │   │
│   │   ├── messages/                     # Message schemas
│   │   │   ├── index.ts
│   │   │   ├── request.ts                # Request validation schemas
│   │   │   ├── response.ts               # Response validation schemas
│   │   │   └── message.ts                # Message entity schemas
│   │   │
│   │   ├── templates/                    # Template schemas
│   │   │   ├── index.ts
│   │   │   ├── request.ts
│   │   │   ├── response.ts
│   │   │   └── template.ts
│   │   │
│   │   └── accounts/                     # Account schemas
│   │       ├── index.ts
│   │       ├── request.ts
│   │       ├── response.ts
│   │       ├── waba.ts
│   │       └── phone-number.ts
│   │
│   ├── types/                            # TypeScript types (inferred from schemas)
│   │   ├── index.ts                      # Re-export all types
│   │   ├── client.ts                     # Client config types (may need explicit types)
│   │   ├── common.ts                     # Shared/common types (re-exports from schemas)
│   │   ├── errors.ts                     # Error types (inferred from schemas)
│   │   │
│   │   ├── messages/                     # Message-related types (re-exports)
│   │   │   ├── index.ts
│   │   │   ├── request.ts                # Re-export from schemas
│   │   │   ├── response.ts               # Re-export from schemas
│   │   │   └── message.ts                # Re-export from schemas
│   │   │
│   │   ├── templates/                    # Template-related types (re-exports)
│   │   │   ├── index.ts
│   │   │   ├── request.ts
│   │   │   ├── response.ts
│   │   │   └── template.ts
│   │   │
│   │   └── accounts/                     # Account-related types (re-exports)
│   │       ├── index.ts
│   │       ├── request.ts
│   │       ├── response.ts
│   │       ├── waba.ts
│   │       └── phone-number.ts
│   │
│   ├── services/                         # Service implementations
│   │   ├── index.ts                      # Service exports
│   │   │
│   │   ├── messages/
│   │   │   ├── index.ts
│   │   │   ├── MessagesService.ts        # Main service class
│   │   │   └── methods/                  # Individual method implementations
│   │   │       ├── send-text.ts
│   │   │       ├── send-image.ts
│   │   │       ├── send-video.ts
│   │   │       ├── send-audio.ts
│   │   │       ├── send-document.ts
│   │   │       ├── send-location.ts
│   │   │       ├── send-contacts.ts
│   │   │       ├── send-template.ts
│   │   │       ├── send-interactive.ts
│   │   │       ├── send-reaction.ts
│   │   │       └── mark-as-read.ts
│   │   │
│   │   ├── templates/
│   │   │   ├── index.ts
│   │   │   ├── TemplatesService.ts
│   │   │   └── methods/
│   │   │       ├── create.ts
│   │   │       ├── list.ts
│   │   │       ├── get.ts
│   │   │       ├── update.ts
│   │   │       └── delete.ts
│   │   │
│   │   └── accounts/
│   │       ├── index.ts
│   │       ├── AccountsService.ts
│   │       ├── methods/
│   │       │   ├── get-profile.ts
│   │       │   └── update-profile.ts
│   │       └── phone-numbers/
│   │           ├── index.ts
│   │           ├── PhoneNumbersService.ts
│   │           └── methods/
│   │               ├── list.ts
│   │               ├── get.ts
│   │               └── update.ts
│   │
│   └── utils/
│       ├── index.ts
│       ├── errors.ts                     # Custom error classes
│       ├── validators.ts                 # Validation helpers
│       └── constants.ts                  # API constants
│
├── tests/                                # Test files
│   ├── unit/
│   │   ├── services/
│   │   ├── schemas/
│   │   └── utils/
│   └── integration/
│
├── examples/                              # Usage examples
│   ├── basic-messaging.ts
│   ├── templates.ts
│   └── accounts.ts
│
├── package.json
├── tsconfig.json
├── tsconfig.build.json                   # Build-specific config
└── README.md
```

## 🔑 Key Design Patterns

### 1. Schemas First, Then Types, Then Services

**Pattern**: Define Zod schemas → Infer TypeScript types → Implement services

**Why Schema-First?**

- ✅ Single source of truth (schema)
- ✅ AI-ready (LLMs work with Zod schemas)
- ✅ Types automatically stay in sync
- ✅ Less duplication
- ✅ Modern best practice (tRPC, Next.js, etc.)

```typescript
// src/schemas/messages/request.ts
import { z } from "zod";

// 1. Define schema first (single source of truth)
export const sendTextRequestSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
  body: z.string().min(1).max(4096),
  previewUrl: z.boolean().optional(),
  phoneNumberId: z.string().optional(),
});

// 2. Infer type from schema
export type SendTextRequest = z.infer<typeof sendTextRequestSchema>;

// src/types/messages/request.ts (optional convenience re-export)
export type { SendTextRequest } from "../../schemas/messages/request";

// src/services/messages/methods/send-text.ts
import { sendTextRequestSchema } from "../../../schemas/messages/request";
import type { SendTextRequest } from "../../../schemas/messages/request";

export async function sendText(client: HttpClient, request: SendTextRequest) {
  // Schema validates at runtime, type ensures compile-time safety
  const validated = sendTextRequestSchema.parse(request);
  // Implementation...
}
```

### 2. Discriminated Unions for Message Types

**Pattern**: Use discriminated unions for type-safe message variants

```typescript
// src/types/messages/message.ts
export type TextMessage = {
  type: "text";
  text: {
    body: string;
    previewUrl?: boolean;
  };
};

export type ImageMessage = {
  type: "image";
  image: {
    link?: string;
    id?: string;
    caption?: string;
  };
};

export type VideoMessage = {
  type: "video";
  video: {
    link?: string;
    id?: string;
    caption?: string;
  };
};

export type AudioMessage = {
  type: "audio";
  audio: {
    link?: string;
    id?: string;
  };
};

export type DocumentMessage = {
  type: "document";
  document: {
    link?: string;
    id?: string;
    caption?: string;
    filename?: string;
  };
};

export type LocationMessage = {
  type: "location";
  location: {
    longitude: number;
    latitude: number;
    name?: string;
    address?: string;
  };
};

export type ContactsMessage = {
  type: "contacts";
  contacts: Array<{
    name: {
      formatted_name: string;
      first_name?: string;
      last_name?: string;
    };
    phones?: Array<{ phone: string; type?: string }>;
    emails?: Array<{ email: string; type?: string }>;
  }>;
};

export type TemplateMessage = {
  type: "template";
  template: {
    name: string;
    language: {
      code: string;
      policy?: "deterministic";
    };
    components?: Array<TemplateComponent>;
  };
};

export type InteractiveMessage = {
  type: "interactive";
  interactive: InteractiveContent;
};

export type ReactionMessage = {
  type: "reaction";
  reaction: {
    message_id: string;
    emoji: string;
  };
};

// Discriminated union
export type MessageContent =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | DocumentMessage
  | LocationMessage
  | ContactsMessage
  | TemplateMessage
  | InteractiveMessage
  | ReactionMessage;
```

**Corresponding Zod Schema**:

```typescript
// src/schemas/messages/message.ts
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
    .refine(
      (data) => data.link || data.id,
      "Either link or id must be provided"
    ),
});

// ... other message schemas

export const messageContentSchema = z.discriminatedUnion("type", [
  textMessageSchema,
  imageMessageSchema,
  videoMessageSchema,
  audioMessageSchema,
  documentMessageSchema,
  locationMessageSchema,
  contactsMessageSchema,
  templateMessageSchema,
  interactiveMessageSchema,
  reactionMessageSchema,
]);

export type MessageContent = z.infer<typeof messageContentSchema>;
```

### 3. Service Structure Pattern

**Pattern**: Service class with typed methods, each method in separate file

```typescript
// src/services/messages/MessagesService.ts
import type { HttpClient } from "../../client/HttpClient";
import * as sendText from "./methods/send-text";
import * as sendImage from "./methods/send-image";
// ... other methods

export class MessagesService {
  constructor(private httpClient: HttpClient) {}

  async sendText(request: sendText.SendTextRequest) {
    return sendText.sendText(this.httpClient, request);
  }

  async sendImage(request: sendImage.SendImageRequest) {
    return sendImage.sendImage(this.httpClient, request);
  }

  // ... other methods
}
```

```typescript
// src/services/messages/methods/send-text.ts
import type { HttpClient } from "../../../client/HttpClient";
import { sendTextRequestSchema } from "../../../schemas/messages/request";
import type { SendTextRequest } from "../../../types/messages/request";
import type { MessageResponse } from "../../../types/messages/response";

export type { SendTextRequest };

export async function sendText(
  client: HttpClient,
  request: SendTextRequest
): Promise<MessageResponse> {
  const validated = sendTextRequestSchema.parse(request);

  return client.post<MessageResponse>(
    `/${validated.phoneNumberId || client.phoneNumberId}/messages`,
    {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: validated.to,
      type: "text",
      text: {
        body: validated.body,
        preview_url: validated.previewUrl,
      },
    }
  );
}
```

### 4. Client Structure

```typescript
// src/client/WhatsAppClient.ts
import type { ClientConfig } from "../types/client";
import { HttpClient } from "./HttpClient";
import { MessagesService } from "../services/messages";
import { TemplatesService } from "../services/templates";
import { AccountsService } from "../services/accounts";

export class WhatsAppClient {
  public readonly messages: MessagesService;
  public readonly templates: TemplatesService;
  public readonly accounts: AccountsService;

  private readonly httpClient: HttpClient;

  constructor(config: ClientConfig) {
    this.httpClient = new HttpClient(config);
    this.messages = new MessagesService(this.httpClient);
    this.templates = new TemplatesService(this.httpClient);
    this.accounts = new AccountsService(this.httpClient);
  }
}
```

### 5. HttpClient Pattern

```typescript
// src/client/HttpClient.ts
import type { ClientConfig } from "../types/client";
import type { APIError } from "../types/errors";

export class HttpClient {
  private readonly baseURL: string;
  private readonly accessToken: string;
  public readonly phoneNumberId?: string;
  public readonly businessAccountId?: string;
  public readonly apiVersion: string;

  constructor(config: ClientConfig) {
    this.accessToken = config.accessToken;
    this.phoneNumberId = config.phoneNumberId;
    this.businessAccountId = config.businessAccountId;
    this.apiVersion = config.apiVersion || "v18.0";
    this.baseURL = config.baseURL || "https://graph.facebook.com";
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    // Implementation with error handling
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    // Implementation with error handling
  }

  async patch<T>(path: string, body: unknown): Promise<T> {
    // Implementation with error handling
  }

  async delete<T>(path: string): Promise<T> {
    // Implementation with error handling
  }
}
```

## 📋 Type & Schema Organization

### Request/Response Pattern

For each API endpoint, we define:

1. **Request Type** (`types/*/request.ts`)
2. **Request Schema** (`schemas/*/request.ts`)
3. **Response Type** (`types/*/response.ts`)
4. **Response Schema** (`schemas/*/response.ts`)

### Example: Send Text Message

```typescript
// schemas/messages/request.ts (PRIMARY - single source of truth)
import { z } from "zod";

export const sendTextRequestSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
  body: z.string().min(1).max(4096),
  previewUrl: z.boolean().optional(),
  phoneNumberId: z.string().optional(),
});

// Infer type from schema
export type SendTextRequest = z.infer<typeof sendTextRequestSchema>;

// schemas/messages/response.ts
export const messageResponseSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  contacts: z.array(
    z.object({
      input: z.string(),
      wa_id: z.string(),
    })
  ),
  messages: z.array(
    z.object({
      id: z.string(),
    })
  ),
});

// Infer type from schema
export type MessageResponse = z.infer<typeof messageResponseSchema>;

// types/messages/request.ts (convenience re-export)
export type { SendTextRequest } from "../../schemas/messages/request";

// types/messages/response.ts (convenience re-export)
export type { MessageResponse } from "../../schemas/messages/response";
```

## 🎯 Index File Pattern

Each directory has an `index.ts` that re-exports:

```typescript
// src/types/messages/index.ts
export type * from "./request";
export type * from "./response";
export type * from "./message";

// src/schemas/messages/index.ts
export * from "./request";
export * from "./response";
export * from "./message";

// src/services/messages/index.ts
export { MessagesService } from "./MessagesService";
export type * from "./methods/send-text";
export type * from "./methods/send-image";
// ... etc

// src/index.ts
export { WhatsAppClient } from "./client";
export type { ClientConfig } from "./types/client";
export type * from "./types";
export * from "./schemas";
```

## 🔄 Discriminated Union Examples

### Message Types (Request)

```typescript
// types/messages/request.ts
export type SendMessageRequest =
  | { type: "text"; to: string; body: string; previewUrl?: boolean }
  | { type: "image"; to: string; imageUrl: string; caption?: string }
  | { type: "video"; to: string; videoUrl: string; caption?: string }
  | {
      type: "template";
      to: string;
      templateName: string;
      language: string;
      parameters?: unknown[];
    };
// ... etc
```

### Template Component Types

```typescript
// types/templates/template.ts
export type TemplateComponent =
  | {
      type: "header";
      format: "text" | "image" | "video" | "document";
      text?: string;
      example?: unknown;
    }
  | { type: "body"; text: string; example?: { body_text: unknown[][] } }
  | {
      type: "button";
      sub_type: "quick_reply" | "url" | "phone_number";
      text: string;
      url?: string;
      phone_number?: string;
    };
```

### API Error Types

```typescript
// types/errors.ts
export type APIError =
  | { code: 131056; type: "rate_limit"; message: string; retry_after?: number }
  | { code: 100; type: "invalid_parameter"; message: string; field?: string }
  | { code: 190; type: "invalid_token"; message: string }
  | {
      code: 80007;
      type: "template_rejected";
      message: string;
      reason?: string;
    };
// ... etc
```

## 🧪 Testing Structure

```
tests/
├── unit/
│   ├── schemas/
│   │   ├── messages.test.ts
│   │   ├── templates.test.ts
│   │   └── accounts.test.ts
│   ├── services/
│   │   ├── messages.test.ts
│   │   ├── templates.test.ts
│   │   └── accounts.test.ts
│   └── utils/
│       └── errors.test.ts
└── integration/
    ├── messages.test.ts
    ├── templates.test.ts
    └── accounts.test.ts
```

## 📦 Package.json Structure

```json
{
  "name": "whatsapp-cloud",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./schemas": {
      "types": "./dist/schemas/index.d.ts",
      "import": "./dist/schemas/index.mjs",
      "require": "./dist/schemas/index.js"
    }
  },
  "files": ["dist", "README.md"],
  "dependencies": {
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsup": "^8.5.1",
    "typescript": "^5.9.3"
  }
}
```

## 🚀 Implementation Order

1. **Foundation**

   - [ ] Types: `client.ts`, `common.ts`, `errors.ts`
   - [ ] Schemas: `common.ts`
   - [ ] `HttpClient` class
   - [ ] `WhatsAppClient` class (skeleton)

2. **Messages Service**

   - [ ] Types: `messages/request.ts`, `messages/response.ts`, `messages/message.ts`
   - [ ] Schemas: All message schemas with discriminated unions
   - [ ] Service: `MessagesService` + all send methods

3. **Templates Service**

   - [ ] Types: `templates/*`
   - [ ] Schemas: `templates/*`
   - [ ] Service: `TemplatesService` + CRUD methods

4. **Accounts Service**

   - [ ] Types: `accounts/*`
   - [ ] Schemas: `accounts/*`
   - [ ] Service: `AccountsService` + `PhoneNumbersService`

5. **Polish**
   - [ ] Error handling
   - [ ] Documentation
   - [ ] Examples
   - [ ] Tests

## 💡 Key Benefits

1. **Type Safety**: Full TypeScript coverage, no `any` types
2. **AI Ready**: Zod schemas enable LLM tool calling and validation
3. **Discriminated Unions**: Type narrowing for better DX
4. **Modular**: Easy to extend and maintain
5. **Best Practices**: Follows patterns from industry-leading SDKs
6. **Tree Shakeable**: Only import what you need
7. **Well Organized**: Clear separation of concerns

---

This structure ensures:

- ✅ **Schemas are the single source of truth** (defined first)
- ✅ **Types are inferred from schemas** (automatic sync)
- ✅ **Zod schemas for everything** (AI-ready, LLM function calling)
- ✅ **Discriminated unions** for type-safe variants
- ✅ **Clean namespace organization**
- ✅ **Best-practice package structure** (inspired by Vercel AI SDK & Stripe)
- ✅ **Easy to extend and maintain**
- ✅ **Less duplication** (define once, infer type)
