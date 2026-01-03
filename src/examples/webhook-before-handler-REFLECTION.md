# Reflection on beforeHandler Implementation

## ✅ What Works Well

### 1. **Clear Separation of Concerns**

- `WebhookContext`: WhatsApp domain data (from Meta's webhook)
- `before`: Application domain data (resolved by your app)
- Third argument pattern makes it explicit what's from where

### 2. **Type Safety Implementation**

The type inference works through:

```typescript
// 1. ExtractBeforeType extracts return type from beforeHandler
type ExtractBeforeType<THandlers> = THandlers extends {
  beforeHandler: (...args: any[]) => infer R;
} ? Awaited<R> : Record<string, never>;

// 2. handle() method uses generic constraint
handle<THandlers extends MessageHandlers<any>>(
  payload: unknown,
  handlers: THandlers,
  ...
)

// 3. ExtractBeforeType<THandlers> gets the inferred type
type BeforeType = ExtractBeforeType<THandlers>;
```

### 3. **Execution Flow**

1. `beforeHandler` runs FIRST (if defined)
2. Result is merged into `before` context
3. Message handlers receive enriched context
4. Graceful degradation if `beforeHandler` fails

## 🔍 How Type Inference Works

When you write:

```typescript
client.webhooks.handle(payload, {
  beforeHandler: async () => ({ customerId: "123" }),
  text: async (msg, webhook, before) => {
    // TypeScript knows before.customerId is string
  },
});
```

TypeScript's inference:

1. Infers the object literal type
2. Matches it against `MessageHandlers<any>` constraint
3. `ExtractBeforeType` extracts return type from `beforeHandler`
4. Uses that type for the `before` parameter in handlers

## ⚠️ Potential Limitations

### 1. **Type Inference Edge Cases**

- If `beforeHandler` is async and returns `Promise<T>`, `Awaited<T>` correctly unwraps it ✅
- If `beforeHandler` returns different types conditionally, TypeScript will union them
- If `beforeHandler` is not defined, `before` is `Record<string, never>` (empty object)

### 2. **Runtime vs Compile-time**

- Type safety is compile-time only
- Runtime: if `beforeHandler` returns `{}`, handlers should check for properties
- Consider: Should we validate the shape at runtime? (Probably not needed - trust the developer)

### 3. **Error Handling**

- If `beforeHandler` throws, we catch and continue with empty `before`
- This is graceful degradation, but handlers need to check if data exists
- Alternative: Could fail fast, but current approach is more resilient

## 🧪 Testing Type Safety

To verify type inference works:

1. **Hover over `before` in your IDE** - should show the exact type
2. **Try accessing non-existent property** - should show TypeScript error
3. **Check autocomplete** - should suggest properties from `beforeHandler` return type

Example test:

```typescript
client.webhooks.handle(payload, {
  beforeHandler: async () => ({ customerId: "123", tags: ["a"] }),
  text: async (msg, webhook, before) => {
    console.log(before.customerId); // ✅ string
    console.log(before.tags); // ✅ string[]
    console.log(before.missing); // ❌ TypeScript error!
  },
});
```

## 💡 Potential Improvements

### 1. **Explicit Type Annotation (Optional)**

Users could explicitly type if needed:

```typescript
type MyBeforeContext = { customerId: string; conversationId: string };

client.webhooks.handle<MessageHandlers<MyBeforeContext>>(payload, {
  beforeHandler: async () => ({ customerId: "123", conversationId: "456" }),
  // ...
});
```

But this is optional - inference should work automatically.

### 2. **Runtime Validation (Optional)**

Could add Zod schema validation:

```typescript
beforeHandler?: (
  message: IncomingMessage,
  webhook: WebhookContext
) => Promise<TBefore> | TBefore;
// + schema?: z.ZodSchema<TBefore>
```

But adds complexity - probably not needed.

### 3. **Multiple beforeHandlers (Future)**

Could support middleware chain:

```typescript
beforeHandlers?: Array<(message, webhook, prev) => Promise<Partial<TBefore>>>
```

But single `beforeHandler` is probably sufficient for most use cases.

## ✅ Conclusion

The implementation is:

- **Type-safe**: Full TypeScript inference ✅
- **Clean**: Clear separation of WhatsApp vs App domain ✅
- **Flexible**: Works with or without `beforeHandler` ✅
- **Resilient**: Graceful error handling ✅

The type inference should work automatically in most cases. If you encounter issues, you can always explicitly type the handlers object.
