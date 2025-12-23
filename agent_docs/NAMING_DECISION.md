# Naming Decision: User-Friendly vs API Names

## Current Approach (User-Friendly Names)

**Request:**
```typescript
{
  imageUrl: "https://...",  // User-friendly
  imageId: "123",           // User-friendly
  caption: "..."
}
```

**API Payload:**
```typescript
{
  image: {
    link: "...",  // API name
    id: "...",    // API name
    caption: "..."
  }
}
```

**Mapping Required:** ✅ Yes (bloated code)

## Alternative: Use API Names Directly

**Request:**
```typescript
{
  link: "https://...",  // API name directly
  id: "123",            // API name directly
  caption: "..."
}
```

**API Payload:**
```typescript
{
  image: {
    link: "...",  // Same!
    id: "...",    // Same!
    caption: "..."
  }
}
```

**Mapping Required:** ❌ No (simpler code)

## Trade-offs

### User-Friendly Names (Current)
**Pros:**
- ✅ `imageUrl` is clearer than `link`
- ✅ `imageId` is clearer than `id`
- ✅ Better developer experience

**Cons:**
- ❌ Requires mapping code (bloated)
- ❌ Doesn't match API exactly
- ❌ More code to maintain

### API Names Directly
**Pros:**
- ✅ No mapping needed (simpler)
- ✅ Matches API exactly
- ✅ Less code
- ✅ Easier to maintain

**Cons:**
- ⚠️ `link` is generic (could be confusing)
- ⚠️ `id` is generic (could be confusing)

## Recommendation

**Use API names directly** - The simplicity and exact API matching outweigh the slight loss in clarity. Users can see the API docs and understand `link` and `id` in context.

