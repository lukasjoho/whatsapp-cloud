# WhatsApp Cloud API SDK - Patterns Guide

## Key Learnings

### 1. Zod Schema Gotchas

**`z.record()` requires explicit key type:**
```typescript
// ❌ Error: Expected 2-3 arguments
z.record(z.unknown())

// ✅ Correct
z.record(z.string(), z.unknown())
```

### 2. Method Signature Pattern

**Required params first, optional ID overrides last.**

```typescript
// ✅ Good - common case needs no undefined
async create(data: CreateRequest, phoneNumberId?: string)
async delete(qrCodeId: string, phoneNumberId?: string)
async list(options?: ListOptions, phoneNumberId?: string)

// ❌ Bad - forces undefined for common case
async create(phoneNumberId?: string, data?: CreateRequest)
```

### 3. Subresources Pattern

Use when a resource has many related endpoints:
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

### 4. HttpClient Methods

| Method | Content-Type | Use Case |
|--------|-------------|----------|
| `get<T>` | - | Standard GET |
| `post<T>` | application/json | JSON POST |
| `delete<T>` | - | Standard DELETE |
| `postForm<T>` | x-www-form-urlencoded | Form POST (assigned_users) |
| `deleteForm<T>` | x-www-form-urlencoded | Form DELETE |
| `deleteWithBody<T>` | application/json | DELETE with JSON body (block_users) |
| `getBinary` | - | Binary response (media download) |

### 5. No Backward Compatibility Hacks

Do NOT:
- Rename unused params to `_var`
- Re-export removed types
- Add `// removed` comments
- Create compatibility shims

Instead: Just delete and update.

### 6. Meta API Patterns

**Edge Pattern (most common):**
```
GET /{parent-id}/{edge-name}
POST /{parent-id}/{edge-name}
```

**Node Pattern:**
```
GET /{node-id}
DELETE /{node-id}
```

### 7. File Organization

```
src/resources/{domain}/
├── schema.ts      # Zod schemas (source of truth)
├── types.ts       # z.infer<> types only
├── resource.ts    # API methods
├── index.ts       # Exports
└── subresources/  # Nested when needed
    └── {sub}/
        ├── schema.ts
        ├── types.ts
        ├── resource.ts
        └── index.ts
```

## Common Tasks

### Adding a New Subresource

1. Create folder: `src/resources/{parent}/subresources/{name}/`
2. Create `schema.ts` with Zod schemas
3. Create `types.ts` with `z.infer<>` types
4. Create `resource.ts` with methods
5. Create `index.ts` exporting all
6. Wire in parent's `resource.ts` constructor
7. Re-export from parent's `index.ts`

### Adding a New Method

1. Add request/response schemas to `schema.ts`
2. Add types to `types.ts`
3. Add method to `resource.ts`
4. Export types/schemas from `index.ts`
