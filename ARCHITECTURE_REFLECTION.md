# Architecture Reflection: Messages Namespace & Base Layer

## 🎯 Current State Analysis

### What We've Achieved

#### 1. **Clean Separation of Concerns** ✅
- **Base Layer (`HttpClient`)**: Handles HTTP communication, authentication, URL construction
- **Service Layer (`MessagesService`)**: Provides domain-specific methods
- **Schema Layer**: Runtime validation with Zod
- **Type Layer**: TypeScript types inferred from schemas

This follows the **Stripe SDK pattern** where:
- `HttpClient` = Stripe's internal `HttpClient` (handles requests)
- `MessagesService` = Stripe's resource classes (e.g., `Stripe.charges`, `Stripe.customers`)
- Schema validation = Stripe's request validation

#### 2. **Type Safety Architecture** ✅
- **Schema-first approach**: Zod schemas defined first, types inferred
- **Single source of truth**: Schemas validate at runtime, types provide compile-time safety
- **AI-ready**: Zod schemas enable LLM function calling (like AI SDK)

**Strengths:**
- Types are always in sync with validation logic
- No duplication between runtime and compile-time checks
- Enables AI tool calling (major differentiator)

#### 3. **Service Pattern** ✅
- Each namespace is a service class (`MessagesService`)
- Methods delegate to separate function modules
- Clean, testable, maintainable structure

**Comparison to ElevenLabs SDK:**
```typescript
// ElevenLabs pattern (similar to yours)
client.textToSpeech.convert({ text: "..." })

// Your pattern
client.messages.sendText({ to: "...", body: "..." })
```

Both follow the same namespace → method pattern.

#### 4. **Request/Response Transformation** ✅
- User-friendly request types (camelCase, clear names)
- Automatic transformation to WhatsApp API format (snake_case)
- Response types match API structure

**Example from `send-contacts.ts`:**
- User provides: `{ name: { formattedName: "..." } }`
- Transforms to: `{ name: { formatted_name: "..." } }`

This is **exactly** what Stripe does - they transform user-friendly types to API format.

---

## 🔍 Deep Dive: Base Layer (`HttpClient`)

### Current Implementation

```typescript
class HttpClient {
  // ✅ Good: Configuration stored
  private readonly baseURL: string;
  private readonly accessToken: string;
  public readonly phoneNumberId?: string;
  public readonly businessAccountId?: string;
  public readonly apiVersion: string;

  // ✅ Good: Generic methods (post, get, patch)
  async post<T>(path: string, body: unknown): Promise<T>
  async get<T>(path: string): Promise<T>
  async patch<T>(path: string, body: unknown): Promise<T>
}
```

### What's Working Well

1. **Generic Type Parameters**: `<T>` allows type-safe responses
2. **Centralized URL Construction**: `baseURL + apiVersion + path`
3. **Consistent Auth**: Bearer token in all requests
4. **Public Readonly Properties**: Services can access `phoneNumberId`

### Areas for Improvement (Based on Stripe/ElevenLabs Patterns)

#### 1. **Error Handling** ⚠️

**Current:**
```typescript
throw new Error(`API Error: ${error.error?.message || response.statusText}`)
```

**Problem:**
- Generic `Error` type - users can't distinguish error types
- No structured error information (code, type, details)
- Can't handle rate limits, retries, etc.

**Stripe Pattern:**
```typescript
class StripeError extends Error {
  type: string;
  code?: string;
  statusCode?: number;
  // ... more fields
}

class StripeAPIError extends StripeError { }
class StripeRateLimitError extends StripeError { }
```

**Recommendation:**
```typescript
// src/errors.ts
export class WhatsAppAPIError extends Error {
  constructor(
    public readonly code: number,
    public readonly type: string,
    message: string,
    public readonly statusCode?: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'WhatsAppAPIError';
  }
}

export class WhatsAppRateLimitError extends WhatsAppAPIError {
  constructor(message: string, public readonly retryAfter?: number) {
    super(131056, 'rate_limit', message, 429, { retryAfter });
    this.name = 'WhatsAppRateLimitError';
  }
}
```

#### 2. **Request/Response Interceptors** ⚠️

**Current:** No hooks for logging, retries, or request modification

**Stripe Pattern:** Middleware/interceptor pattern
**AI SDK Pattern:** Request/response hooks

**Recommendation:**
```typescript
type RequestInterceptor = (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

class HttpClient {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  addRequestInterceptor(interceptor: RequestInterceptor) { }
  addResponseInterceptor(interceptor: ResponseInterceptor) { }
}
```

#### 3. **Retry Logic** ⚠️

**Current:** No automatic retries

**Stripe Pattern:** Automatic retries for transient errors (5xx, rate limits)

**Recommendation:**
```typescript
class HttpClient {
  private async post<T>(path: string, body: unknown, retries = 3): Promise<T> {
    try {
      // ... make request
    } catch (error) {
      if (this.shouldRetry(error) && retries > 0) {
        await this.delay(this.getRetryDelay(error));
        return this.post(path, body, retries - 1);
      }
      throw error;
    }
  }
}
```

#### 4. **Timeout Support** ⚠️

**Current:** Schema has `timeout` but it's not used

**Recommendation:**
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), config.timeout || 30000);

const response = await fetch(url, {
  // ...
  signal: controller.signal,
});
```

#### 5. **Request ID Tracking** ⚠️

**Stripe Pattern:** Every request includes `X-Request-Id` header for debugging

**Recommendation:**
```typescript
const requestId = crypto.randomUUID();
headers['X-Request-Id'] = requestId;
```

---

## 🔍 Deep Dive: Messages Service

### Current Implementation

```typescript
class MessagesService {
  constructor(private httpClient: HttpClient) {}

  async sendText(request: SendTextRequest): Promise<MessageResponse> {
    return sendTextMethod.sendText(this.httpClient, request);
  }
  // ... 7 more methods
}
```

### What's Working Well

1. **Clean API**: `client.messages.sendText({ ... })` is intuitive
2. **Method Separation**: Each method in its own file (maintainable)
3. **Type Safety**: Request/response types are well-defined
4. **Validation**: Zod schemas validate before API calls

### Areas for Improvement

#### 1. **Error Context** ⚠️

**Current:** Errors thrown from `HttpClient` don't include method context

**Recommendation:**
```typescript
// In send-text.ts
try {
  return await client.post<MessageResponse>(...);
} catch (error) {
  if (error instanceof WhatsAppAPIError) {
    error.message = `Failed to send text message: ${error.message}`;
  }
  throw error;
}
```

#### 2. **Request Validation Feedback** ⚠️

**Current:** Zod throws generic validation errors

**Recommendation:**
```typescript
try {
  const validated = sendTextRequestSchema.parse(request);
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new WhatsAppValidationError(
      'Invalid sendText request',
      error.errors
    );
  }
  throw error;
}
```

#### 3. **Phone Number ID Resolution** ✅

**Current:** Good pattern - request override or client default
```typescript
const phoneNumberId = validated.phoneNumberId || client.phoneNumberId;
if (!phoneNumberId) {
  throw new Error("phoneNumberId is required");
}
```

**Suggestion:** Use custom error type
```typescript
throw new WhatsAppConfigurationError(
  'phoneNumberId is required. Provide it in client config or request.'
);
```

#### 4. **Response Validation** ⚠️

**Current:** Response types are defined but not validated

**Recommendation:**
```typescript
const response = await client.post<MessageResponse>(...);
return messageResponseSchema.parse(response); // Validate response too
```

---

## 📊 Comparison to Industry Standards

### Stripe SDK Pattern

**Similarities:**
- ✅ Namespace-based services (`client.messages`, `client.accounts`)
- ✅ Request/response transformation
- ✅ Type-safe generic HTTP methods
- ✅ Configuration stored in client

**Differences:**
- ⚠️ Stripe has custom error classes (we use generic `Error`)
- ⚠️ Stripe has retry logic (we don't)
- ⚠️ Stripe validates responses (we only validate requests)

### ElevenLabs SDK Pattern

**Similarities:**
- ✅ Service-based architecture
- ✅ Type-safe methods
- ✅ Clean API surface

**Differences:**
- ⚠️ ElevenLabs has streaming support (we might need this for media)
- ⚠️ ElevenLabs has better error messages

### AI SDK Pattern

**Similarities:**
- ✅ Schema-first approach (Zod schemas)
- ✅ Type inference from schemas
- ✅ AI-ready (function calling support)

**Differences:**
- ⚠️ AI SDK has request/response hooks (we don't)
- ⚠️ AI SDK has streaming (we might need for webhooks)

---

## 🎯 Recommendations for Excellence

### Priority 1: Error Handling (Critical)

**Why:** Users need to handle different error types (rate limits, validation, auth)

**Implementation:**
1. Create custom error classes
2. Parse WhatsApp API error responses
3. Throw typed errors with context
4. Add error codes/types for programmatic handling

### Priority 2: Response Validation (High)

**Why:** API might return unexpected data, catch issues early

**Implementation:**
1. Validate all responses with Zod schemas
2. Provide helpful error messages if validation fails
3. Log validation failures for debugging

### Priority 3: Request/Response Logging (Medium)

**Why:** Debugging API issues is hard without visibility

**Implementation:**
1. Optional request/response logging
2. Request ID tracking
3. Configurable log levels

### Priority 4: Retry Logic (Medium)

**Why:** Transient errors (rate limits, 5xx) should be retried automatically

**Implementation:**
1. Automatic retries for retryable errors
2. Exponential backoff
3. Configurable retry count/delay

### Priority 5: TypeScript Improvements (Low)

**Why:** Better DX with more specific types

**Implementation:**
1. Discriminated unions for error types
2. More specific response types (not just `MessageResponse`)
3. Better JSDoc comments

---

## 🏗️ Architecture Strengths

1. **Schema-First**: Zod schemas enable AI tool calling
2. **Type Safety**: Full TypeScript coverage
3. **Separation**: Clear boundaries between layers
4. **Extensibility**: Easy to add new methods/services
5. **Testability**: Each layer can be tested independently

---

## 🚀 Next Steps

1. **Implement custom error classes** (Priority 1)
2. **Add response validation** (Priority 2)
3. **Test with real API** to identify edge cases
4. **Gather user feedback** on API design
5. **Iterate based on feedback**

---

## 💡 Key Insights

### What Makes a Great SDK (Based on Stripe/ElevenLabs/AI SDK)

1. **Predictable Errors**: Users should know what errors to expect
2. **Helpful Messages**: Errors should guide users to solutions
3. **Type Safety**: Catch errors at compile time, not runtime
4. **Validation**: Validate both requests AND responses
5. **Observability**: Logging/debugging tools for developers
6. **Resilience**: Handle transient errors automatically
7. **Documentation**: Clear examples and API docs

### Your Package's Unique Value

1. **AI-Ready**: Zod schemas enable LLM function calling (unique!)
2. **Type-Safe**: Full TypeScript coverage
3. **Modern**: Uses latest patterns (schema-first, discriminated unions)
4. **Clean API**: Intuitive method names and structure

---

## 📝 Questions to Consider

1. **Should we support request/response hooks?** (For logging, monitoring)
2. **Should we validate responses?** (Yes - catches API changes early)
3. **Should we auto-retry?** (Yes - but make it configurable)
4. **Should we support streaming?** (For webhooks, media uploads)
5. **Should we provide TypeScript examples?** (Yes - in README/docs)

---

This reflection shows you've built a solid foundation. The architecture is clean, type-safe, and follows industry patterns. The main gaps are in error handling and observability - areas that separate good SDKs from great ones.

