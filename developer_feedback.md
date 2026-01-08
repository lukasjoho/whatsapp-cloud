# Developer Feedback: whatsapp-cloud Library Improvements

## Overview

This document outlines issues and improvement suggestions encountered while integrating the `whatsapp-cloud` library for WhatsApp template creation with image headers. The feedback is based on real-world usage and error scenarios.

---

## 1. Error Handling - Insufficient Error Detail Exposure

### Problem

The library's error handling strips away valuable error information from Meta's API responses, making debugging extremely difficult.

### Current Behavior

When an API error occurs, the library throws a generic error like:

```
API Error: Invalid parameter (100)
```

### Expected Behavior

Meta's API returns detailed error information that should be exposed:

- `error_user_msg` - User-friendly error messages
- `error_user_title` - Error title
- `error_data.parameter` - Which parameter is invalid
- `error_data.details` - Additional error details
- `error_subcode` - More specific error codes
- `fbtrace_id` - Trace ID for debugging with Meta support

### Example: Real Meta API Error Response

```json
{
  "error": {
    "message": "Invalid parameter",
    "type": "OAuthException",
    "code": 100,
    "error_subcode": 2388273,
    "is_transient": false,
    "error_user_title": "Sample-Parameter für Titelart fehlt",
    "error_user_msg": "Für Vorlagen mit dem Kopfzeilentyp IMAGE ist ein Beispiel/Sample erforderlich, das aber nicht angegeben wurde. Bitte ändere die Titelart oder gib einen gültigen Beispielparameter an.",
    "fbtrace_id": "A8-UEQkzpgr5Tkk6JH5RoVM"
  }
}
```

### Current Library Output

```
Error: API Error: Invalid parameter (100)
```

### Suggested Solution

1. Create a custom error class that extends `Error` and includes all Meta error fields
2. Preserve the full error response structure
3. Provide helper methods to access error details

### Example Implementation

```typescript
class WhatsAppAPIError extends Error {
  constructor(
    public message: string,
    public code: number,
    public subcode?: number,
    public userMessage?: string,
    public userTitle?: string,
    public parameter?: string,
    public traceId?: string,
    public fullError?: unknown
  ) {
    super(message);
    this.name = "WhatsAppAPIError";
  }

  getDetailedMessage(): string {
    const parts = [this.message];
    if (this.userMessage) parts.push(this.userMessage);
    if (this.parameter) parts.push(`Parameter: ${this.parameter}`);
    if (this.code)
      parts.push(
        `Code: ${this.code}${this.subcode ? ` (Subcode: ${this.subcode})` : ""}`
      );
    if (this.traceId) parts.push(`Trace ID: ${this.traceId}`);
    return parts.join("\n");
  }
}
```

### Impact

**High** - This is a critical issue that significantly impacts developer experience. Without detailed error messages, developers cannot:

- Understand what went wrong
- Fix issues quickly
- Provide good error messages to end users
- Debug with Meta support (no trace ID)

---

## 2. Missing Media Upload Functionality

### Problem

The library's `MediaService` only provides a `download()` method but lacks an `upload()` method. This forces developers to manually implement media uploads, which is error-prone and inconsistent.

### Current State

```typescript
class MediaService {
  download(mediaId: string): Promise<ArrayBuffer>;
  // ❌ No upload method
}
```

### Use Case

When creating WhatsApp message templates with image headers, you must:

1. Upload the image to WhatsApp's media API
2. Get the media ID
3. Use that media ID in the template's `header_handle`

### Current Workaround

Developers must manually implement multipart/form-data uploads:

```typescript
// Manual implementation required
const formData = new FormData();
formData.append("file", blob, "image.jpg");
formData.append("type", "image");
formData.append("messaging_product", "whatsapp");

const response = await fetch(
  `https://graph.facebook.com/v24.0/${phoneNumberId}/media`,
  {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  }
);
```

### Suggested Solution

Add `upload()` method to `MediaService`:

```typescript
class MediaService {
  download(mediaId: string): Promise<ArrayBuffer>;

  /**
   * Upload media to WhatsApp and get media ID
   * @param file - File buffer or Blob
   * @param mimeType - MIME type (e.g., "image/jpeg")
   * @param type - Media type: "image" | "video" | "audio" | "document"
   * @returns Media ID to use in messages/templates
   */
  upload(
    file: Buffer | Blob | ArrayBuffer,
    mimeType: string,
    type?: "image" | "video" | "audio" | "document"
  ): Promise<string>;
}
```

### Implementation Notes

1. **Auto-detect media type** from MIME type if not provided
2. **Handle multipart/form-data** correctly (this is tricky in Node.js)
3. **Return media ID** as a string
4. **Include proper error handling** (see issue #1)

### Example Usage

```typescript
// Upload image for template header
const imageBuffer = Buffer.from(base64Image, "base64");
const mediaId = await whatsapp.media.upload(imageBuffer, "image/jpeg", "image");

// Use in template
const template = {
  name: "my_template",
  language: "en",
  category: "MARKETING",
  components: [
    {
      type: "HEADER",
      format: "IMAGE",
      example: {
        header_handle: [mediaId], // ✅ Use uploaded media ID
      },
    },
    // ... other components
  ],
};
```

### Impact

**High** - This is a common use case (templates with images) and the lack of this functionality forces developers to:

- Implement complex multipart/form-data handling
- Deal with Node.js vs Browser differences
- Maintain their own upload code
- Risk errors due to incorrect implementation

---

## 3. Template Creation Parameter Validation

### Problem

The library doesn't validate template parameters before sending to the API, leading to cryptic errors from Meta.

### Example Issue

When creating a template with an IMAGE header, Meta requires:

- `example.header_handle` array with at least one media ID
- The media ID must be valid (uploaded via media API)

### Current Behavior

If you forget to include `example.header_handle`, you get:

```
Error: API Error: Invalid parameter (100)
```

### Suggested Solution

Add client-side validation using Zod schemas (which the library already uses):

```typescript
// In template creation, validate before API call
const result = templateCreateSchema.safeParse(template);
if (!result.success) {
  throw new WhatsAppValidationError("Template validation failed", result.error);
}
```

### Specific Validation Needed

1. **IMAGE headers** must have `example.header_handle` with valid media IDs
2. **VIDEO headers** must have `example.header_handle` with valid media IDs
3. **TEXT headers** must have `text` field
4. **BODY component** is required
5. **Template name** must match WhatsApp requirements (lowercase, alphanumeric, underscores only, max 512 chars)

### Example Validation Error

```typescript
class WhatsAppValidationError extends Error {
  constructor(message: string, public validationErrors: z.ZodError) {
    super(message);
    this.name = "WhatsAppValidationError";
  }

  getFieldErrors(): Record<string, string[]> {
    // Return field-specific errors for form validation
  }
}
```

### Impact

**Medium** - Would improve developer experience by catching errors early, but not critical since Meta API will reject invalid requests anyway.

---

## 4. Type Safety for Template Components

### Problem

The `TemplateComponent` type is a discriminated union, but when building components programmatically, TypeScript doesn't always narrow types correctly.

### Example

```typescript
const component: TemplateComponent = {
  type: "HEADER",
  format: "IMAGE",
  example: {
    header_handle: [mediaId],
  },
};

// TypeScript might not recognize that example is required for IMAGE format
```

### Suggested Solution

Provide helper functions or builder pattern:

```typescript
// Helper functions
function createImageHeader(mediaId: string): TemplateHeaderComponent {
  return {
    type: "HEADER",
    format: "IMAGE",
    example: {
      header_handle: [mediaId],
    },
  };
}

function createTextHeader(text: string): TemplateHeaderComponent {
  return {
    type: "HEADER",
    format: "TEXT",
    text,
  };
}
```

### Impact

**Low** - Nice to have, but not critical. The types work, just need better ergonomics.

---

## 5. Documentation Gaps

### Missing Documentation

1. **Media Upload Flow** - No documentation on how to upload media for template headers
2. **Error Handling** - No examples of handling different error types
3. **Template Examples** - Limited examples of complex templates (with images, buttons, etc.)
4. **Common Pitfalls** - No section on common mistakes (like forgetting `example` for IMAGE headers)

### Suggested Additions

1. **Complete Template Example** with image header:

   ```typescript
   // Upload image first
   const mediaId = await whatsapp.media.upload(imageBuffer, "image/jpeg");

   // Create template
   await whatsapp.templates.create({
     name: "welcome_template",
     language: "en",
     category: "MARKETING",
     components: [
       {
         type: "HEADER",
         format: "IMAGE",
         example: { header_handle: [mediaId] }, // ⚠️ Don't forget this!
       },
       { type: "BODY", text: "Welcome!" },
       { type: "FOOTER", text: "Thanks for joining" },
       {
         type: "BUTTONS",
         buttons: [
           { type: "URL", text: "Visit Site", url: "https://example.com" },
         ],
       },
     ],
   });
   ```

2. **Error Handling Guide**:
   ```typescript
   try {
     await whatsapp.templates.create(template);
   } catch (error) {
     if (error instanceof WhatsAppAPIError) {
       console.error("API Error:", error.getDetailedMessage());
       console.error("Parameter:", error.parameter);
       console.error("Trace ID:", error.traceId);
     }
   }
   ```

### Impact

**Medium** - Good documentation would reduce support requests and improve adoption.

---

## 6. Request/Response Logging

### Problem

No built-in way to log requests/responses for debugging.

### Suggested Solution

Add optional logging configuration:

```typescript
const whatsapp = new WhatsAppClient({
  accessToken: "...",
  businessAccountId: "...",
  phoneNumberId: "...",
  // Optional logging
  logger: {
    logRequest: (url, method, body) =>
      console.log("Request:", { url, method, body }),
    logResponse: (url, status, body) =>
      console.log("Response:", { url, status, body }),
    logError: (error) => console.error("Error:", error),
  },
});
```

### Impact

**Low** - Nice to have for debugging, but developers can add their own logging.

---

## Summary of Priority

1. **High Priority**:

   - Error handling improvements (#1)
   - Media upload functionality (#2)

2. **Medium Priority**:

   - Template parameter validation (#3)
   - Documentation improvements (#5)

3. **Low Priority**:
   - Type safety helpers (#4)
   - Request/response logging (#6)

---

## Additional Notes

### Multipart Form Data in Node.js

When implementing media upload, be aware that `FormData` and `Blob` work differently in Node.js vs Browser environments. The library should handle this abstraction.

**Node.js Implementation** (server actions):

```typescript
// Manual multipart construction works better
const boundary = `----WebKitFormBoundary${Date.now()}`;
const parts: Buffer[] = [];
// ... construct multipart body manually
```

**Browser Implementation**:

```typescript
// FormData API works well
const formData = new FormData();
formData.append("file", blob);
```

### Template Name Validation

WhatsApp has strict requirements for template names:

- Lowercase alphanumeric and underscores only
- Max 512 characters
- Pattern: `/^[a-z0-9_]+$/`

The library could provide a helper:

```typescript
function normalizeTemplateName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}
```

---

## Conclusion

The `whatsapp-cloud` library is a solid foundation, but these improvements would significantly enhance the developer experience, especially for:

- Error debugging
- Template creation with media
- Production reliability

Thank you for building and maintaining this library! These suggestions come from real-world usage and are meant to help make the library even better.
