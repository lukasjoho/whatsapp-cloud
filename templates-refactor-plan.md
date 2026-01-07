# Templates Namespace Refactor Plan

## Objective

Refactor the templates namespace to:
1. **Separate request (input) and response schemas** - Input schemas for what developers send, response schemas for what API returns
2. **Add full variable/example support** - Enable dynamic content with `{{1}}`, `{{2}}` placeholders
3. **Enforce category-specific validation** - Different rules for MARKETING vs UTILITY (auth excluded for now)
4. **Follow repository naming conventions** - `Input` suffix only for component types

---

## File Changes Overview

### Files to Create
- `src/schemas/templates/component-input.ts` - Components for requests
- `src/types/templates/component-input.ts` - Input component types

### Files to Modify
- `src/schemas/templates/component.ts` - Rename to response-only schema
- `src/schemas/templates/request.ts` - Use input component schemas
- `src/schemas/templates/response.ts` - Add quality_score, rejected_reason
- `src/types/templates/component.ts` - Response-only types
- `src/types/templates/index.ts` - Export new types
- `src/schemas/templates/index.ts` - Export new schemas

### Files Unchanged
- `src/schemas/templates/language.ts`
- `src/types/templates/language.ts`
- `src/services/templates/*` - Service layer unchanged (types handle the difference)

---

## Detailed Implementation

### Step 1: Create Input Component Schemas

**File: `src/schemas/templates/component-input.ts`**

```typescript
import { z } from "zod";

// =============================================================================
// Button Input Schemas
// =============================================================================

export const templateQuickReplyButtonInputSchema = z.object({
  type: z.literal("QUICK_REPLY"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
});

export const templateUrlButtonInputSchema = z.object({
  type: z.literal("URL"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: z.string().url().max(2000, "URL must be 2000 characters or less"),
  // For URLs with variables like https://example.com/{{1}}
  example: z.array(z.string()).optional(),
});

export const templatePhoneNumberButtonInputSchema = z.object({
  type: z.literal("PHONE_NUMBER"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: z.string().min(1).max(20, "Phone number must be 20 characters or less"),
});

export const templateCopyCodeButtonInputSchema = z.object({
  type: z.literal("COPY_CODE"),
  // Example value to show in template preview
  example: z.string().max(15).optional(),
});

export const templateFlowButtonInputSchema = z.object({
  type: z.literal("FLOW"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_id: z.string().optional(),
  flow_action: z.enum(["navigate", "data_exchange"]).optional(),
  navigate_screen: z.string().optional(),
});

export const templateButtonInputSchema = z.discriminatedUnion("type", [
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema,
]);

// =============================================================================
// Header Component Input Schemas (discriminated by format)
// =============================================================================

export const templateHeaderTextInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.literal("TEXT"),
  text: z.string().min(1).max(60, "Header text must be 60 characters or less"),
  // For text with variables like "Order {{1}}"
  example: z.object({
    header_text: z.array(z.string()),
  }).optional(),
});

export const templateHeaderMediaInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  // Requires asset handle from Resumable Upload API
  example: z.object({
    header_handle: z.array(z.string()).min(1, "At least one header_handle is required"),
  }),
});

export const templateHeaderLocationInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.literal("LOCATION"),
  // Location headers don't need text or example
});

// Union of all header formats
export const templateHeaderComponentInputSchema = z.discriminatedUnion("format", [
  templateHeaderTextInputSchema,
  templateHeaderMediaInputSchema,
  templateHeaderLocationInputSchema,
]);

// =============================================================================
// Body Component Input Schema
// =============================================================================

export const templateBodyComponentInputSchema = z.object({
  type: z.literal("BODY"),
  text: z.string().min(1).max(1024, "Body text must be 1024 characters or less"),
  // For text with variables like "Hello {{1}}, your code is {{2}}"
  // Array of arrays to support multiple example sets
  example: z.object({
    body_text: z.array(z.array(z.string())),
  }).optional(),
});

// =============================================================================
// Footer Component Input Schema
// =============================================================================

export const templateFooterComponentInputSchema = z.object({
  type: z.literal("FOOTER"),
  text: z.string().min(1).max(60, "Footer text must be 60 characters or less"),
});

// =============================================================================
// Buttons Component Input Schema
// =============================================================================

export const templateButtonsComponentInputSchema = z.object({
  type: z.literal("BUTTONS"),
  buttons: z.array(templateButtonInputSchema).min(1).max(10, "Maximum 10 buttons allowed"),
});

// =============================================================================
// Union of All Component Input Types
// =============================================================================

export const templateComponentInputSchema = z.discriminatedUnion("type", [
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema,
]);
```

### Step 2: Create Input Component Types

**File: `src/types/templates/component-input.ts`**

```typescript
import { z } from "zod";
import {
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema,
  templateButtonInputSchema,
  templateHeaderTextInputSchema,
  templateHeaderMediaInputSchema,
  templateHeaderLocationInputSchema,
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema,
  templateComponentInputSchema,
} from "../../schemas/templates/component-input";

// Button input types
export type TemplateQuickReplyButtonInput = z.infer<typeof templateQuickReplyButtonInputSchema>;
export type TemplateUrlButtonInput = z.infer<typeof templateUrlButtonInputSchema>;
export type TemplatePhoneNumberButtonInput = z.infer<typeof templatePhoneNumberButtonInputSchema>;
export type TemplateCopyCodeButtonInput = z.infer<typeof templateCopyCodeButtonInputSchema>;
export type TemplateFlowButtonInput = z.infer<typeof templateFlowButtonInputSchema>;
export type TemplateButtonInput = z.infer<typeof templateButtonInputSchema>;

// Header input types (by format)
export type TemplateHeaderTextInput = z.infer<typeof templateHeaderTextInputSchema>;
export type TemplateHeaderMediaInput = z.infer<typeof templateHeaderMediaInputSchema>;
export type TemplateHeaderLocationInput = z.infer<typeof templateHeaderLocationInputSchema>;
export type TemplateHeaderComponentInput = z.infer<typeof templateHeaderComponentInputSchema>;

// Other component input types
export type TemplateBodyComponentInput = z.infer<typeof templateBodyComponentInputSchema>;
export type TemplateFooterComponentInput = z.infer<typeof templateFooterComponentInputSchema>;
export type TemplateButtonsComponentInput = z.infer<typeof templateButtonsComponentInputSchema>;

// Union type
export type TemplateComponentInput = z.infer<typeof templateComponentInputSchema>;
```

### Step 3: Update Request Schemas

**File: `src/schemas/templates/request.ts`**

```typescript
import { z } from "zod";
import { templateComponentInputSchema } from "./component-input";
import { templateLanguageSchema } from "./language";

/**
 * Category schema
 */
export const templateCategorySchema = z.enum(["AUTHENTICATION", "MARKETING", "UTILITY"]);

/**
 * Base components validation refinements
 */
const componentsRefinements = (components: z.infer<typeof templateComponentInputSchema>[]) => ({
  hasBody: components.some((c) => c.type === "BODY"),
  hasMaxOneHeader: components.filter((c) => c.type === "HEADER").length <= 1,
  hasMaxOneFooter: components.filter((c) => c.type === "FOOTER").length <= 1,
  hasMaxOneButtons: components.filter((c) => c.type === "BUTTONS").length <= 1,
});

/**
 * Schema for creating a MARKETING template
 */
export const templateCreateMarketingSchema = z.object({
  name: z.string().min(1).max(512, "Template name must be 512 characters or less")
    .regex(/^[a-z0-9_]+$/, "Template name must only contain lowercase letters, numbers, and underscores"),
  language: templateLanguageSchema,
  category: z.literal("MARKETING"),
  components: z.array(templateComponentInputSchema)
    .min(1, "At least one component is required")
    .refine((c) => componentsRefinements(c).hasBody, { message: "BODY component is required" })
    .refine((c) => componentsRefinements(c).hasMaxOneHeader, { message: "Only one HEADER component is allowed" })
    .refine((c) => componentsRefinements(c).hasMaxOneFooter, { message: "Only one FOOTER component is allowed" })
    .refine((c) => componentsRefinements(c).hasMaxOneButtons, { message: "Only one BUTTONS component is allowed" }),
});

/**
 * Schema for creating a UTILITY template
 */
export const templateCreateUtilitySchema = z.object({
  name: z.string().min(1).max(512, "Template name must be 512 characters or less")
    .regex(/^[a-z0-9_]+$/, "Template name must only contain lowercase letters, numbers, and underscores"),
  language: templateLanguageSchema,
  category: z.literal("UTILITY"),
  components: z.array(templateComponentInputSchema)
    .min(1, "At least one component is required")
    .refine((c) => componentsRefinements(c).hasBody, { message: "BODY component is required" })
    .refine((c) => componentsRefinements(c).hasMaxOneHeader, { message: "Only one HEADER component is allowed" })
    .refine((c) => componentsRefinements(c).hasMaxOneFooter, { message: "Only one FOOTER component is allowed" })
    .refine((c) => componentsRefinements(c).hasMaxOneButtons, { message: "Only one BUTTONS component is allowed" }),
});

/**
 * Schema for creating an AUTHENTICATION template (simplified - no special rules for now)
 */
export const templateCreateAuthenticationSchema = z.object({
  name: z.string().min(1).max(512, "Template name must be 512 characters or less")
    .regex(/^[a-z0-9_]+$/, "Template name must only contain lowercase letters, numbers, and underscores"),
  language: templateLanguageSchema,
  category: z.literal("AUTHENTICATION"),
  components: z.array(templateComponentInputSchema)
    .min(1, "At least one component is required")
    .refine((c) => componentsRefinements(c).hasBody, { message: "BODY component is required" }),
});

/**
 * Union of all template create schemas (discriminated by category)
 */
export const templateCreateSchema = z.discriminatedUnion("category", [
  templateCreateMarketingSchema,
  templateCreateUtilitySchema,
  templateCreateAuthenticationSchema,
]);

/**
 * Schema for updating a template
 * All fields optional - only update what's provided
 */
export const templateUpdateSchema = z.object({
  category: templateCategorySchema.optional(),
  components: z.array(templateComponentInputSchema).optional(),
  language: templateLanguageSchema.optional(),
  name: z.string().min(1).max(512).optional(),
});

/**
 * Schema for listing templates
 */
export const templateListSchema = z.object({
  name: z.string().optional(),
  limit: z.number().min(1).max(1000).optional(),
  after: z.string().optional(), // Cursor for pagination
  before: z.string().optional(),
});

/**
 * Schema for deleting a template
 * Either name or hsm_id must be provided
 */
export const templateDeleteSchema = z
  .object({
    name: z.string().optional(),
    hsm_id: z.string().optional(),
  })
  .refine((data) => data.name || data.hsm_id, {
    message: "Either name or hsm_id must be provided",
  });
```

### Step 4: Update Response Schemas

**File: `src/schemas/templates/component.ts`** (Response-only - simplified)

```typescript
import { z } from "zod";

/**
 * Response component schemas - what the API returns
 * These are more permissive than input schemas since we trust the API response
 */

export const templateButtonSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
  url: z.string().optional(),
  phone_number: z.string().optional(),
  example: z.union([z.array(z.string()), z.string()]).optional(),
  flow_id: z.string().optional(),
  flow_action: z.string().optional(),
  navigate_screen: z.string().optional(),
});

export const templateComponentSchema = z.object({
  type: z.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  format: z.string().optional(),
  text: z.string().optional(),
  buttons: z.array(templateButtonSchema).optional(),
  example: z.object({
    header_text: z.array(z.string()).optional(),
    header_handle: z.array(z.string()).optional(),
    body_text: z.array(z.array(z.string())).optional(),
  }).optional(),
});
```

**File: `src/schemas/templates/response.ts`** (Enhanced)

```typescript
import { z } from "zod";
import { templateComponentSchema } from "./component";
import { templateCategorySchema } from "./request";

/**
 * Template status enum
 */
export const templateStatusSchema = z.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "PAUSED",
  "DISABLED",
  "IN_APPEAL",
  "PENDING_DELETION",
  "DELETED",
  "LIMIT_EXCEEDED",
]);

/**
 * Quality score schema
 */
export const templateQualityScoreSchema = z.object({
  score: z.enum(["GREEN", "YELLOW", "RED", "UNKNOWN"]).optional(),
  date: z.number().optional(),
});

/**
 * Schema for template (what API returns)
 */
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
  components: z.array(templateComponentSchema),
  // Additional response fields
  quality_score: templateQualityScoreSchema.optional(),
  rejected_reason: z.string().optional(),
  previous_category: z.string().optional(),
});

/**
 * Schema for create template response
 */
export const templateCreateResponseSchema = z.object({
  id: z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
});

/**
 * Schema for list templates response
 */
export const templateListResponseSchema = z.object({
  data: z.array(templateSchema),
  paging: z.object({
    cursors: z.object({
      before: z.string().optional(),
      after: z.string().optional(),
    }).optional(),
    next: z.string().optional(),
    previous: z.string().optional(),
  }).optional(),
});

/**
 * Schema for update template response
 */
export const templateUpdateResponseSchema = z.object({
  success: z.boolean(),
});

/**
 * Schema for delete template response
 */
export const templateDeleteResponseSchema = z.object({
  success: z.boolean(),
});
```

### Step 5: Update Type Files

**File: `src/types/templates/component.ts`** (Response types)

```typescript
import { z } from "zod";
import {
  templateButtonSchema,
  templateComponentSchema,
} from "../../schemas/templates/component";

/**
 * Response types - what API returns
 */
export type TemplateButton = z.infer<typeof templateButtonSchema>;
export type TemplateComponent = z.infer<typeof templateComponentSchema>;
```

**File: `src/types/templates/response.ts`** (Enhanced)

```typescript
import { z } from "zod";
import {
  templateSchema,
  templateCreateResponseSchema,
  templateListResponseSchema,
  templateUpdateResponseSchema,
  templateDeleteResponseSchema,
  templateStatusSchema,
  templateQualityScoreSchema,
} from "../../schemas/templates/response";

export type TemplateStatus = z.infer<typeof templateStatusSchema>;
export type TemplateQualityScore = z.infer<typeof templateQualityScoreSchema>;
export type Template = z.infer<typeof templateSchema>;
export type TemplateCreateResponse = z.infer<typeof templateCreateResponseSchema>;
export type TemplateListResponse = z.infer<typeof templateListResponseSchema>;
export type TemplateUpdateResponse = z.infer<typeof templateUpdateResponseSchema>;
export type TemplateDeleteResponse = z.infer<typeof templateDeleteResponseSchema>;
```

### Step 6: Update Index Exports

**File: `src/schemas/templates/index.ts`**

```typescript
export * from "./language";
export * from "./component";        // Response schemas
export * from "./component-input";  // Input schemas
export * from "./request";
export * from "./response";
```

**File: `src/types/templates/index.ts`**

```typescript
export type * from "./language";
export type * from "./component";        // Response types
export type * from "./component-input";  // Input types
export type * from "./request";
export type * from "./response";
```

---

## Breaking Changes

### Types Renamed (Breaking)

| Old Name | New Name | Notes |
|----------|----------|-------|
| `TemplateQuickReplyButton` | `TemplateQuickReplyButtonInput` | For requests |
| `TemplateUrlButton` | `TemplateUrlButtonInput` | For requests |
| `TemplatePhoneNumberButton` | `TemplatePhoneNumberButtonInput` | For requests |
| `TemplateCopyCodeButton` | `TemplateCopyCodeButtonInput` | For requests |
| `TemplateFlowButton` | `TemplateFlowButtonInput` | For requests |
| `TemplateHeaderComponent` | `TemplateHeaderComponentInput` | For requests |
| `TemplateBodyComponent` | `TemplateBodyComponentInput` | For requests |
| `TemplateFooterComponent` | `TemplateFooterComponentInput` | For requests |
| `TemplateButtonsComponent` | `TemplateButtonsComponentInput` | For requests |

### Schema Changes (Non-Breaking)

- Added `example` fields to input schemas (optional)
- Added `quality_score`, `rejected_reason` to response schema (optional)
- Added pagination params to list schema (optional)
- Template name now validates lowercase + underscores only

---

## Migration Guide (for CHANGELOG)

```markdown
## Breaking Changes

### Templates Namespace Refactor

Component types have been split into input (request) and response types:

**Before:**
```typescript
import { TemplateBodyComponent } from "whatsapp-cloud";
const body: TemplateBodyComponent = { type: "BODY", text: "Hello" };
```

**After:**
```typescript
import { TemplateBodyComponentInput } from "whatsapp-cloud";
const body: TemplateBodyComponentInput = {
  type: "BODY",
  text: "Hello {{1}}",
  example: { body_text: [["World"]] }  // NEW: variable support
};
```

Response types keep their original names:
```typescript
import { Template, TemplateComponent } from "whatsapp-cloud";
// These are what the API returns, unchanged
```
```

---

## Implementation Order

1. Create `src/schemas/templates/component-input.ts`
2. Create `src/types/templates/component-input.ts`
3. Update `src/schemas/templates/component.ts` (simplify for responses)
4. Update `src/schemas/templates/request.ts` (use input schemas)
5. Update `src/schemas/templates/response.ts` (add new fields)
6. Update `src/types/templates/component.ts` (response only)
7. Update `src/types/templates/response.ts` (add new types)
8. Update `src/schemas/templates/index.ts`
9. Update `src/types/templates/index.ts`
10. Run type checks and tests
11. Update any examples in docs/examples folder

---

## Testing Checklist

- [ ] `pnpm build` passes
- [ ] `pnpm typecheck` passes
- [ ] Existing tests pass
- [ ] New schema validates variables correctly
- [ ] Category-specific validation works
- [ ] Response parsing handles all optional fields
- [ ] Types are properly exported from package
