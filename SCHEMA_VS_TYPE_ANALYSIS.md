# Schema-First vs Type-First: Analysis & Recommendation

## 🤔 The Question

Should we:

1. **Define types first, then create schemas** (current design)
2. **Define schemas first, then infer types** (schema-first)
3. **Hybrid approach** (schemas for simple, types for complex)

## 📊 Comparison

### Option 1: Type-First (Current Design)

```typescript
// 1. Define type
export interface SendTextRequest {
  to: string;
  body: string;
  previewUrl?: boolean;
}

// 2. Create schema to match type
export const sendTextRequestSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/),
  body: z.string().min(1).max(4096),
  previewUrl: z.boolean().optional(),
}) satisfies z.ZodType<SendTextRequest>;

// 3. Use both
export type SendTextRequest = z.infer<typeof sendTextRequestSchema>; // Redundant!
```

**Pros:**

- ✅ More explicit type definitions
- ✅ Types are readable in isolation
- ✅ Can express complex type relationships

**Cons:**

- ❌ Two sources of truth (can drift)
- ❌ More duplication
- ❌ Need to ensure schemas match types
- ❌ Types aren't what LLMs use (schemas are)

### Option 2: Schema-First (Recommended for AI-Ready SDK)

```typescript
// 1. Define schema (single source of truth)
export const sendTextRequestSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
  body: z.string().min(1).max(4096),
  previewUrl: z.boolean().optional(),
  phoneNumberId: z.string().optional(),
});

// 2. Infer type from schema
export type SendTextRequest = z.infer<typeof sendTextRequestSchema>;

// 3. Use in service
export async function sendText(client: HttpClient, request: SendTextRequest) {
  const validated = sendTextRequestSchema.parse(request);
  // ...
}
```

**Pros:**

- ✅ **Single source of truth** (schema)
- ✅ **AI-ready** - Schemas are what LLMs use for function calling
- ✅ **Types automatically stay in sync** with schemas
- ✅ **Less duplication** - Define once, infer type
- ✅ **Runtime validation** is the source of truth
- ✅ **Common modern pattern** (used by tRPC, Next.js, etc.)

**Cons:**

- ⚠️ Some complex types might be harder to express in Zod first
- ⚠️ Type definitions less visible (need to look at schema)

### Option 3: Hybrid Approach

Use schema-first for most things, but define types first for complex cases.

**Pros:**

- ✅ Flexible
- ✅ Best of both worlds

**Cons:**

- ❌ Inconsistent pattern
- ❌ Harder to know which to use when

## 🎯 Recommendation: **Schema-First**

For an **AI-ready SDK**, schema-first is the clear winner because:

1. **LLMs work with Zod schemas** - When you expose schemas to AI tools, they can understand and use them directly
2. **Single source of truth** - The schema defines both validation rules AND types
3. **Less maintenance** - No risk of types and schemas drifting apart
4. **Modern best practice** - Used by tRPC, Next.js API routes, and many modern TypeScript projects

## 📝 Updated Pattern

### Schema-First Pattern

```typescript
// src/schemas/messages/request.ts
import { z } from "zod";

// Define schema first (single source of truth)
export const sendTextRequestSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
  body: z.string().min(1).max(4096),
  previewUrl: z.boolean().optional(),
  phoneNumberId: z.string().optional(),
});

// Infer type from schema
export type SendTextRequest = z.infer<typeof sendTextRequestSchema>;
```

### Discriminated Unions (Schema-First)

```typescript
// src/schemas/messages/message.ts
import { z } from "zod";

// Define schemas for each variant
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

// Discriminated union schema
export const messageContentSchema = z.discriminatedUnion("type", [
  textMessageSchema,
  imageMessageSchema,
  // ... other message types
]);

// Infer type from discriminated union
export type MessageContent = z.infer<typeof messageContentSchema>;

// Individual types can also be inferred
export type TextMessage = z.infer<typeof textMessageSchema>;
export type ImageMessage = z.infer<typeof imageMessageSchema>;
```

### Types Directory (Re-exports)

```typescript
// src/types/messages/request.ts
// Re-export types from schemas (for convenience)
export type { SendTextRequest } from "../../schemas/messages/request";

// src/types/messages/message.ts
// Re-export types from schemas
export type {
  MessageContent,
  TextMessage,
  ImageMessage,
} from "../../schemas/messages/message";
```

## 🏗️ Updated Structure

With schema-first, the structure becomes:

```
src/
├── schemas/              # Zod schemas (PRIMARY - single source of truth)
│   ├── messages/
│   │   ├── request.ts   # Schemas + inferred types
│   │   ├── response.ts
│   │   └── message.ts
│   └── ...
│
├── types/                # Re-exports of inferred types (for convenience)
│   ├── messages/
│   │   ├── request.ts   # Re-export types from schemas
│   │   ├── response.ts
│   │   └── message.ts
│   └── ...
│
└── services/            # Use both schemas and types
    └── messages/
        └── methods/
            └── send-text.ts
```

**Key Change**: `types/` becomes a convenience layer that re-exports types from schemas, rather than defining types separately.

## 💡 Benefits for AI Integration

When you expose schemas to LLMs:

```typescript
// LLM can understand and use Zod schemas directly
const tool = {
  name: "sendText",
  description: "Send a text message",
  parameters: sendTextRequestSchema, // LLM understands this!
};
```

vs

```typescript
// TypeScript types are opaque to LLMs
const tool = {
  name: "sendText",
  description: "Send a text message",
  parameters: SendTextRequest, // LLM can't use this directly
};
```

## 🎨 Implementation Example

### Before (Type-First)

```typescript
// types/messages/request.ts
export interface SendTextRequest {
  to: string;
  body: string;
}

// schemas/messages/request.ts
export const sendTextRequestSchema = z.object({
  to: z.string(),
  body: z.string(),
}) satisfies z.ZodType<SendTextRequest>; // Need to ensure match
```

### After (Schema-First)

```typescript
// schemas/messages/request.ts
export const sendTextRequestSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/),
  body: z.string().min(1).max(4096),
});

export type SendTextRequest = z.infer<typeof sendTextRequestSchema>;

// types/messages/request.ts (optional convenience re-export)
export type { SendTextRequest } from "../../schemas/messages/request";
```

## ✅ Final Recommendation

**Use Schema-First approach:**

1. **Define Zod schemas first** in `schemas/` directory
2. **Infer types from schemas** using `z.infer<typeof schema>`
3. **Re-export types** in `types/` directory for convenience (optional)
4. **Use schemas for validation** in services
5. **Export schemas** for AI/LLM integration

This gives you:

- ✅ Single source of truth
- ✅ AI-ready schemas
- ✅ Type safety
- ✅ Runtime validation
- ✅ Less duplication
- ✅ Modern best practices

## 🔄 Migration Path

If we've already started with type-first, we can:

1. Keep existing types temporarily
2. Create schemas that match
3. Gradually migrate to inferring types from schemas
4. Eventually remove explicit type definitions

But for a new project, **start with schemas from day one**.
