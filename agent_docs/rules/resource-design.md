# Resource Design Rules

Guidelines for designing resources in the WhatsApp Cloud SDK.

## Folder Structure

Each resource lives in `src/resources/{name}/` with these files:

```
src/resources/{name}/
├── schema.ts    # All Zod schemas (single file)
├── types.ts     # All types inferred from schemas
├── resource.ts  # The resource class with methods
└── index.ts     # Barrel export
```

## Naming Conventions

### Types

| Type | Pattern | Example |
|------|---------|---------|
| Response (entity) | `{Resource}` | `Template`, `Message` |
| Response (action) | `{Resource}{Action}Response` | `TemplateCreateResponse` |
| Input | `{Resource}{Action}` | `TemplateCreate`, `TemplateUpdate` |
| Component input | `{Resource}{Component}Input` | `TemplateBodyComponentInput` |

### Schemas

| Schema | Pattern | Example |
|--------|---------|---------|
| Response | `{resource}Schema` | `templateSchema` |
| Input | `{resource}{Action}Schema` | `templateCreateSchema` |
| Enum | `{resource}{Field}Schema` | `templateStatusSchema` |

### Resource Class

- Class: `{Resource}Resource` (e.g., `TemplatesResource`)
- Methods: CRUD verbs (`create`, `list`, `get`, `update`, `delete`)

## Validation

Use `.parse()` directly - let Zod errors flow through:

```typescript
async create(input: TemplateCreate): Promise<TemplateCreateResponse> {
  const body = templateCreateSchema.parse(input);  // Throws ZodError if invalid
  return this.httpClient.post(..., body);
}
```

Do NOT use `.safeParse()` with custom error transformation.

## Schema as Source of Truth

Types are always inferred from schemas:

```typescript
// schema.ts
export const templateCreateSchema = z.object({...});

// types.ts
export type TemplateCreate = z.infer<typeof templateCreateSchema>;
```

## Input vs Response Schemas

- **Input schemas**: Strict validation with refinements, used for create/update
- **Response schemas**: Permissive, trust the API response

```typescript
// Input - strict
export const templateBodyComponentInputSchema = z.object({
  type: z.literal("BODY"),
  text: z.string().min(1).max(1024),
});

// Response - permissive
export const templateComponentSchema = z.object({
  type: z.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  text: z.string().optional(),
});
```

## Scoped Resources

Resources that require a business account ID:

```typescript
private getBusinessAccountId(overrideId?: string): string {
  const id = overrideId || this.httpClient.businessAccountId;
  if (!id) {
    throw new WhatsAppValidationError(
      "businessAccountId is required",
      "businessAccountId"
    );
  }
  return id;
}
```

## Index Exports

```typescript
// index.ts
export { TemplatesResource } from "./resource";
export type * from "./types";
export * from "./schema";
```

## JSDoc

Document methods with:
- `@param` for each parameter
- `@returns` description
- `@throws {ZodError}` if validation can fail
- `@example` with realistic usage

```typescript
/**
 * Create a message template
 *
 * @param input - Template creation input
 * @param businessAccountId - Optional WABA ID override
 * @returns Created template info
 * @throws {ZodError} If input validation fails
 *
 * @example
 * ```typescript
 * await client.templates.create({
 *   name: "hello",
 *   category: "UTILITY",
 *   language: "en",
 *   components: [{ type: "BODY", text: "Hello!" }]
 * });
 * ```
 */
```
