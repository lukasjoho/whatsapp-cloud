# Messages Namespace Design

This document describes the design patterns and architectural decisions for the Messages namespace. This serves as a blueprint for implementing other namespaces in the WhatsApp Cloud API SDK.

## Core Design Principles

### 1. **Namespace Client Pattern**

Each namespace that requires a base path identifier (like `phoneNumberId` for messages) gets its own client wrapper that handles the base path automatically.

**Pattern:**
- Create a `{Namespace}Client` class that wraps `HttpClient`
- The client automatically prepends the namespace identifier to all paths
- Methods use simple relative paths (e.g., `/messages`) instead of full paths (e.g., `/${phoneNumberId}/messages`)

**Example:**
```typescript
// MessagesClient wraps HttpClient with phoneNumberId as base endpoint
export class MessagesClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly phoneNumberId: string
  ) {}

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.post<T>(`/${this.phoneNumberId}${path}`, body);
  }
}
```

**Why:** Treats the namespace identifier (phoneNumberId) as a "client" for that namespace. Different identifiers represent different endpoints, making the abstraction clean and intuitive.

### 2. **Request Structure Matches API**

Request schemas match the WhatsApp API structure exactly, minus fields that are handled internally.

**Pattern:**
- Request schemas mirror the API payload structure
- Exclude: `messaging_product`, `recipient_type`, `type` (added by `buildMessagePayload`)
- Exclude: `phoneNumberId` (handled at client level)
- Include: All user-provided fields matching API structure

**Example:**
```typescript
// API expects: { to, image: { id?, link?, caption? } }
// Schema matches: { to, image: { id?, link?, caption? } }
export const sendImageRequestSchema = baseMessageRequestSchema.extend({
  image: imageSchema, // Matches API structure
});
```

**Why:** 
- Reduces transformation logic
- Makes API documentation directly applicable
- Clear mapping between user input and API payload

### 3. **Client-Level Configuration**

Namespace-specific identifiers (like `phoneNumberId`) are handled at the service construction level, not in individual requests.

**Pattern:**
- Service validates required identifier exists in `HttpClient` at construction
- Service creates namespace client once with the identifier
- Methods receive the namespace client, not the raw `HttpClient`
- No per-request identifier resolution needed

**Example:**
```typescript
export class MessagesService {
  private readonly messagesClient: MessagesClient;

  constructor(httpClient: HttpClient) {
    // Validate identifier at construction
    if (!httpClient.phoneNumberId) {
      throw new WhatsAppValidationError(...);
    }
    
    // Create namespace client once
    this.messagesClient = new MessagesClient(httpClient, httpClient.phoneNumberId);
  }

  async sendImage(request: SendImageRequest) {
    // Method receives namespace client, not HttpClient
    return sendImage(this.messagesClient, request);
  }
}
```

**Why:**
- Identifier is required, so validate early (fail fast)
- Single source of truth for namespace identifier
- Methods don't need to handle optional overrides
- Cleaner method signatures

### 4. **Clean Method Pattern**

All methods follow a consistent pattern: validate → extract → build → request.

**Pattern:**
```typescript
export async function sendImage(
  messagesClient: MessagesClient,
  request: SendImageRequest
): Promise<MessageResponse> {
  // 1. Validate request with schema
  const result = sendImageRequestSchema.safeParse(request);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  
  // 2. Extract validated data
  const data = result.data;
  
  // 3. Build payload (request structure already matches API)
  const payload = buildMessagePayload(data.to, "image", {
    image: data.image,
  });
  
  // 4. Make API request (namespace client handles base path)
  return messagesClient.post<MessageResponse>("/messages", payload);
}
```

**Why:**
- Consistent, predictable flow
- Easy to understand and maintain
- Clear separation of concerns
- Request → result → data trajectory

### 5. **Request → Result → Data Trajectory**

The validation flow follows a clear trajectory: request → validation result → validated data.

**Pattern:**
```typescript
// Request comes in
const result = schema.safeParse(request);

// Extract validated data
const data = result.data;

// Use data directly (structure matches API)
const payload = buildMessagePayload(data.to, "image", {
  image: data.image,
});
```

**Why:**
- Clear path from user input to safe API request
- No intermediate transformations needed
- Type-safe throughout the flow

### 6. **No Manual Undefined Filtering**

Let `JSON.stringify` handle undefined values automatically.

**Pattern:**
```typescript
// Don't filter undefined manually
export function buildMessagePayload(to: string, type: string, content: T) {
  return {
    messaging_product: "whatsapp" as const,
    recipient_type: "individual" as const,
    to,
    type,
    ...content, // undefined values automatically omitted by JSON.stringify
  };
}
```

**Why:**
- `JSON.stringify` automatically omits undefined values
- Less code, simpler logic
- No need for `omitUndefined` utilities

## Architecture Layers

### Layer 1: Service (MessagesService)
- **Responsibility:** Validate namespace requirements, create namespace client
- **Input:** `HttpClient` (with namespace identifier)
- **Output:** Namespace client instance
- **Pattern:** Constructor validation + client creation

### Layer 2: Namespace Client (MessagesClient)
- **Responsibility:** Handle namespace-specific base path
- **Input:** `HttpClient` + namespace identifier
- **Output:** Wrapped client with base path handling
- **Pattern:** Proxy pattern - wraps HttpClient with path prefix

### Layer 3: Methods (sendImage, sendText, etc.)
- **Responsibility:** Validate request, build payload, make API call
- **Input:** Namespace client + request object
- **Output:** API response
- **Pattern:** Validate → extract → build → request

### Layer 4: Utilities (buildMessagePayload)
- **Responsibility:** Add common API fields
- **Input:** User data
- **Output:** Complete API payload
- **Pattern:** Simple object construction

## File Structure

```
services/messages/
├── MessagesService.ts      # Service layer - validates & creates client
├── MessagesClient.ts        # Namespace client - handles base path
├── methods/
│   ├── send-image.ts       # Method implementations
│   ├── send-text.ts
│   ├── send-location.ts
│   └── send-reaction.ts
├── utils/
│   └── build-message-payload.ts  # Common payload builder
└── index.ts                # Exports
```

## Schema Structure

```
schemas/messages/
├── request.ts              # Request schemas matching API structure
└── response.ts             # Response schemas
```

**Request Schema Pattern:**
```typescript
// Base schema (common fields)
const baseMessageRequestSchema = z.object({
  to: z.string().regex(...),
});

// Type-specific schema (matches API structure)
const imageSchema = z.object({
  id: z.string().optional(),
  link: z.string().url().optional(),
  caption: z.string().max(1024).optional(),
}).refine(...);

// Combined schema
export const sendImageRequestSchema = baseMessageRequestSchema.extend({
  image: imageSchema,
});
```

## Type Structure

```
types/messages/
├── request.ts              # Request types (inferred from schemas)
└── response.ts             # Response types
```

**Type Pattern:**
```typescript
// Types are inferred from schemas
export type SendImageRequest = z.infer<typeof sendImageRequestSchema>;
```

## Key Design Decisions

### ✅ Do's

1. **Match API structure in requests** - Makes documentation directly applicable
2. **Validate at service construction** - Fail fast, clear errors
3. **Use namespace clients** - Clean abstraction for namespace-specific paths
4. **Follow consistent method pattern** - Easy to understand and maintain
5. **Let JSON.stringify handle undefined** - Simpler code

### ❌ Don'ts

1. **Don't include namespace identifiers in requests** - Handle at client level
2. **Don't manually filter undefined** - Let JSON.stringify do it
3. **Don't transform request structure unnecessarily** - Match API directly
4. **Don't resolve identifiers in methods** - Do it at service level
5. **Don't create namespace client per request** - Create once in constructor

## Applying to Other Namespaces

When creating a new namespace (e.g., `BusinessAccounts`):

1. **Create namespace client** (`BusinessAccountsClient`)
   - Wrap `HttpClient` with namespace-specific base path
   - Handle namespace identifier (e.g., `businessAccountId`)

2. **Create service** (`BusinessAccountsService`)
   - Validate namespace identifier exists in constructor
   - Create namespace client once
   - Pass client to methods

3. **Create methods** (`getProfile`, `updateProfile`, etc.)
   - Follow validate → extract → build → request pattern
   - Use namespace client, not raw `HttpClient`
   - Match API structure in requests

4. **Create schemas** (`schemas/business-accounts/`)
   - Match API structure exactly
   - Exclude internal fields (handled by utilities)
   - Exclude namespace identifier (handled at client level)

5. **Create types** (`types/business-accounts/`)
   - Infer from schemas using `z.infer`

## Example: Applying Pattern to Business Accounts

```typescript
// 1. Namespace Client
export class BusinessAccountsClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly businessAccountId: string
  ) {}

  async get<T>(path: string): Promise<T> {
    return this.httpClient.get<T>(`/${this.businessAccountId}${path}`);
  }
}

// 2. Service
export class BusinessAccountsService {
  private readonly accountsClient: BusinessAccountsClient;

  constructor(httpClient: HttpClient) {
    if (!httpClient.businessAccountId) {
      throw new WhatsAppValidationError(...);
    }
    this.accountsClient = new BusinessAccountsClient(
      httpClient,
      httpClient.businessAccountId
    );
  }

  async getProfile() {
    return getProfile(this.accountsClient);
  }
}

// 3. Method
export async function getProfile(
  accountsClient: BusinessAccountsClient
): Promise<ProfileResponse> {
  return accountsClient.get<ProfileResponse>("/profile");
}
```

## Summary

The Messages namespace design provides a clean, consistent pattern for implementing API namespaces:

- **Namespace clients** handle base paths automatically
- **Request structures** match API directly
- **Service layer** validates and creates clients
- **Methods** follow a consistent pattern
- **No manual filtering** - let JSON.stringify handle it

This pattern ensures consistency, maintainability, and clarity across all namespaces in the SDK.

