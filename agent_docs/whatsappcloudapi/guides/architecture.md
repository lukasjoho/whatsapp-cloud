# WhatsApp Cloud API SDK - Architecture Guide

## Overview

This SDK wraps the Meta WhatsApp Cloud API with a **Zod-first, domain-colocated** architecture.

## Core Principles

### 1. Zod-First Approach
```
schema.ts  →  types.ts  →  resource.ts
   ↓
z.object()  →  z.infer<>  →  methods use types
```

- Schemas are the **source of truth**
- Types are **always inferred** from schemas via `z.infer<typeof schema>`
- Never manually define types that duplicate schema structure

### 2. Domain-Colocated Structure
```
src/resources/{domain}/
├── schema.ts      # Zod schemas
├── types.ts       # Inferred types
├── resource.ts    # API methods
├── index.ts       # Exports
└── subresources/  # Nested resources (optional)
    └── {sub}/
        ├── schema.ts
        ├── types.ts
        ├── resource.ts
        └── index.ts
```

### 3. Method Signature Pattern

**Required params first, optional ID overrides last.**

```typescript
// Good - no undefined needed for common case
async create(data: CreateRequest, phoneNumberId?: string)
async delete(qrCodeId: string, phoneNumberId?: string)
async list(options?: ListOptions, phoneNumberId?: string)

// Bad - forces users to pass undefined
async create(phoneNumberId?: string, data?: CreateRequest)  // Don't do this
```

### 4. Subresources Pattern

When a resource has many related endpoints, use subresources:

```typescript
class PhoneNumbersResource {
  public readonly block: BlockResource;
  public readonly qrCodes: QrCodesResource;

  constructor(httpClient: HttpClient) {
    this.block = new BlockResource(httpClient);
    this.qrCodes = new QrCodesResource(httpClient);
  }
}

// Usage: client.phoneNumbers.qrCodes.create(...)
```

## API Hierarchy

```
WhatsApp Cloud API Structure:
├── Business Portfolio (businessId)
│   └── WABA - WhatsApp Business Account (businessAccountId)
│       └── Phone Numbers (phoneNumberId)
│           ├── Messages
│           ├── Media
│           ├── Business Profile
│           ├── QR Codes
│           ├── Block Users
│           └── ...
└── Templates (per WABA)
```

## HttpClient Methods

| Method | Use Case |
|--------|----------|
| `get<T>(path)` | Standard GET |
| `post<T>(path, body)` | JSON POST |
| `patch<T>(path, body)` | JSON PATCH |
| `delete<T>(path)` | Standard DELETE |
| `postForm<T>(path, body)` | Form-urlencoded POST (e.g., assigned_users) |
| `deleteForm<T>(path, body)` | Form-urlencoded DELETE |
| `deleteWithBody<T>(path, body)` | JSON DELETE with body (e.g., block_users) |
| `getBinary(path)` | Binary response (media download) |

## Common Patterns

### Query String Builder
```typescript
private buildQueryString(options?: ListOptions): string {
  if (!options) return "";
  const params = new URLSearchParams();
  if (options.limit) params.set("limit", options.limit.toString());
  if (options.after) params.set("after", options.after);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
```

### ID Resolution
```typescript
private getPhoneNumberId(overrideId?: string): string {
  const id = overrideId ?? this.httpClient.phoneNumberId;
  if (!id) {
    throw new Error("phoneNumberId is required...");
  }
  return id;
}
```

## Export Pattern

```typescript
// index.ts
export { ResourceClass } from "./resource";
export type * from "./types";      // Type-only exports
export * from "./schema";          // Schema exports
```
