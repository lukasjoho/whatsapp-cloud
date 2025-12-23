# Messages Namespace Analysis & Recommendations

## 🎯 Current Implementation Review

### What We Have ✅

1. **Clean Service Structure**
   - `MessagesService` class with clear method names
   - Each method delegates to separate function modules
   - Type-safe request/response types

2. **Schema-First Validation**
   - Zod schemas validate requests before API calls
   - Types inferred from schemas
   - Detailed error messages in schemas

3. **Request Transformation**
   - User-friendly camelCase → API snake_case
   - Handles optional fields gracefully

4. **Phone Number ID Resolution**
   - Request override or client default
   - Clear error if missing

## 🔍 Comparison: Our Implementation vs ElevenLabs

### Similarities ✅

1. **Namespace Pattern**: Both use `client.messages.sendText()` style
2. **Service Classes**: Both organize methods in service classes
3. **Type Safety**: Both use TypeScript for type safety
4. **Error Handling**: Both have custom error classes

### Key Differences ⚠️

#### 1. **Error Handling in HTTP Client**

**ElevenLabs:**
```typescript
// Parses error response body properly
const errorBody = await getErrorResponseBody(response);
throw new ElevenLabsError({
  statusCode: response.status,
  body: errorBody,
  rawResponse: response
});

// Handles specific status codes
switch (statusCode) {
  case 422:
    throw new UnprocessableEntityError(...);
  case 429:
    throw new RateLimitError(...);
  default:
    throw new ElevenLabsError(...);
}
```

**Ours:**
```typescript
// Generic error, no structured parsing
const error = await response.json().catch(() => ({
  error: { message: response.statusText, code: response.status }
}));
throw new Error(`API Error: ${error.error?.message}`);
```

**Missing:**
- ❌ Proper error response parsing (handles non-JSON responses)
- ❌ Structured error types (rate limit, validation, etc.)
- ❌ Error body preservation for debugging
- ❌ Status code-specific error handling

#### 2. **Request Validation Error Handling**

**ElevenLabs:**
- Uses serializers (similar to our Zod schemas)
- Errors are typed and specific

**Ours:**
```typescript
// Current: Generic Zod error
const validated = sendTextRequestSchema.parse(request);
// If fails, throws ZodError (not our custom error)
```

**Missing:**
- ❌ Transform Zod errors to `WhatsAppValidationError`
- ❌ Consistent error handling across all methods

#### 3. **Response Validation**

**ElevenLabs:**
- Validates responses with serializers
- Throws typed errors if response doesn't match schema

**Ours:**
```typescript
// No response validation
return client.post<MessageResponse>(...);
// Type assertion only, no runtime validation
```

**Missing:**
- ❌ Response schema validation
- ❌ Catch API changes early
- ❌ Better error messages for unexpected responses

#### 4. **Request Options Pattern**

**ElevenLabs:**
```typescript
// Per-request options
client.textToSpeech.convert(voiceId, request, {
  timeoutInSeconds: 60,
  maxRetries: 3,
  abortSignal: controller.signal
});
```

**Ours:**
```typescript
// No per-request options
client.messages.sendText(request);
// Can't override timeout, retries, etc. per request
```

**Missing:**
- ❌ Per-request timeout override
- ❌ Per-request retry configuration
- ❌ Request cancellation (AbortSignal)

#### 5. **Retry Logic**

**ElevenLabs:**
- Built-in retry logic with exponential backoff
- Configurable per request or globally
- Handles transient errors automatically

**Ours:**
- ❌ No retry logic
- ❌ Users must implement retries themselves

#### 6. **Logging**

**ElevenLabs:**
- Configurable logging
- Request/response logging
- Sensitive data redaction

**Ours:**
- ❌ No logging
- ❌ Hard to debug API issues

#### 7. **Raw Response Access**

**ElevenLabs:**
```typescript
const response = await client.textToSpeech.convert(...);
// Access raw response if needed
response.rawResponse.headers
response.rawResponse.status
```

**Ours:**
```typescript
// No access to raw response
const response = await client.messages.sendText(...);
// Can't inspect headers, status, etc.
```

**Missing:**
- ❌ Raw response access for advanced use cases
- ❌ Response metadata (headers, status)

## 🚨 Critical Missing Pieces

### Priority 1: Error Handling (Critical)

**Current Issues:**
1. Generic `Error` thrown from HTTP client
2. No structured error parsing
3. Can't distinguish error types programmatically
4. No error body preservation

**What to Add:**
1. Parse WhatsApp API error responses properly
2. Create typed error classes (`WhatsAppAPIError`, `WhatsAppRateLimitError`, etc.)
3. Preserve error body and status code
4. Handle non-JSON error responses

### Priority 2: Request Validation Error Handling (High)

**Current Issues:**
1. Zod errors thrown directly (not our custom type)
2. Inconsistent error handling across methods

**What to Add:**
1. Use `transformZodError()` in all method functions
2. Consistent `WhatsAppValidationError` for all validation failures

### Priority 3: Response Validation (High)

**Current Issues:**
1. No runtime validation of API responses
2. Type assertions only (can fail silently)
3. API changes might break code without warning

**What to Add:**
1. Validate responses with Zod schemas
2. Throw `WhatsAppValidationError` if response doesn't match schema
3. Catch API changes early

### Priority 4: Better Error Messages (Medium)

**Current Issues:**
1. Generic error messages
2. No context about what failed

**What to Add:**
1. Include method name in errors
2. Include request details (sanitized)
3. Better error messages for common failures

## 📋 Recommended Implementation Plan

### Step 1: Improve HTTP Client Error Handling

```typescript
// src/client/HttpClient.ts
async post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(...);
  
  if (!response.ok) {
    const errorBody = await this.parseErrorResponse(response);
    throw this.createAPIError(response.status, errorBody, response);
  }
  
  return response.json();
}

private async parseErrorResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type")?.toLowerCase();
  
  if (contentType?.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return { message: response.statusText };
    }
  }
  
  return { message: await response.text() || response.statusText };
}

private createAPIError(statusCode: number, body: unknown, response: Response): WhatsAppAPIError {
  // Parse WhatsApp error structure
  const error = this.parseWhatsAppError(body);
  
  // Handle specific status codes
  if (statusCode === 429) {
    return new WhatsAppRateLimitError(
      error.message,
      error.retryAfter,
      statusCode,
      body,
      response
    );
  }
  
  return new WhatsAppAPIError(
    error.code || statusCode,
    error.type || "api_error",
    error.message || `API request failed with status ${statusCode}`,
    statusCode,
    body,
    response
  );
}
```

### Step 2: Add Request Validation Error Handling

```typescript
// src/services/messages/methods/send-text.ts
export async function sendText(...) {
  try {
    const validated = sendTextRequestSchema.parse(request);
  } catch (error) {
    if (error instanceof ZodError) {
      throw transformZodError(error);
    }
    throw error;
  }
  // ... rest of function
}
```

### Step 3: Add Response Validation

```typescript
// src/services/messages/methods/send-text.ts
export async function sendText(...) {
  // ... make request
  const response = await client.post<MessageResponse>(...);
  
  // Validate response
  try {
    return messageResponseSchema.parse(response);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new WhatsAppValidationError(
        "Invalid response from WhatsApp API",
        undefined,
        transformZodError(error).issues
      );
    }
    throw error;
  }
}
```

### Step 4: Improve Error Context

```typescript
// Wrap errors with context
try {
  return await client.post(...);
} catch (error) {
  if (error instanceof WhatsAppAPIError) {
    error.message = `Failed to send text message: ${error.message}`;
  }
  throw error;
}
```

## 🎯 What Makes a Great SDK (Based on ElevenLabs)

1. **Predictable Errors**: Users know what errors to expect
2. **Structured Error Data**: Error codes, types, details accessible
3. **Response Validation**: Catch API changes early
4. **Request Validation**: Clear errors for invalid input
5. **Error Context**: Know what operation failed
6. **Raw Response Access**: For advanced debugging
7. **Retry Logic**: Handle transient errors automatically
8. **Logging**: Debug issues easily

## ✅ What We're Doing Right

1. **Schema-First**: Zod schemas are excellent
2. **Type Safety**: Full TypeScript coverage
3. **Clean API**: Intuitive method names
4. **Separation of Concerns**: Well-organized code
5. **Request Transformation**: User-friendly API

## 🚀 Next Steps

1. **Implement proper error handling in HttpClient** (Priority 1)
2. **Add request validation error handling** (Priority 2)
3. **Add response validation** (Priority 2)
4. **Test with real API** to identify edge cases
5. **Add retry logic** (Priority 3)
6. **Add logging** (Priority 3)

---

**Summary**: Our foundation is solid, but we need to improve error handling to match industry standards. The main gaps are in HTTP client error parsing, response validation, and consistent error types throughout the codebase.

