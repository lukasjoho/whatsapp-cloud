import { z } from "zod";

// =============================================================================
// Button Input Schemas
// =============================================================================

/**
 * Quick reply button input schema
 */
export const templateQuickReplyButtonInputSchema = z.object({
  type: z.literal("QUICK_REPLY"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
});

/**
 * URL button input schema
 * Supports variables in URL path (e.g., https://example.com/{{1}})
 */
export const templateUrlButtonInputSchema = z.object({
  type: z.literal("URL"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: z.string().url().max(2000, "URL must be 2000 characters or less"),
  // Example values for URL variables
  example: z.array(z.string()).optional(),
});

/**
 * Phone number button input schema
 */
export const templatePhoneNumberButtonInputSchema = z.object({
  type: z.literal("PHONE_NUMBER"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: z
    .string()
    .min(1)
    .max(20, "Phone number must be 20 characters or less"),
});

/**
 * Copy code button input schema (for OTP/authentication templates)
 */
export const templateCopyCodeButtonInputSchema = z.object({
  type: z.literal("COPY_CODE"),
  // Example value to show in template preview
  example: z.string().max(15).optional(),
});

/**
 * Flow button input schema
 */
export const templateFlowButtonInputSchema = z.object({
  type: z.literal("FLOW"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_id: z.string().optional(),
  flow_action: z.enum(["navigate", "data_exchange"]).optional(),
  navigate_screen: z.string().optional(),
});

/**
 * Union of all button input types
 */
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

/**
 * Text header input schema
 * Supports variables (e.g., "Order {{1}}")
 */
export const templateHeaderTextInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.literal("TEXT"),
  text: z.string().min(1).max(60, "Header text must be 60 characters or less"),
  // Example values for text variables
  example: z
    .object({
      header_text: z.array(z.string()),
    })
    .optional(),
});

/**
 * Media header input schema (IMAGE, VIDEO, DOCUMENT)
 * Requires asset handle from Resumable Upload API
 */
export const templateHeaderMediaInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  // Asset handle from Resumable Upload API
  example: z.object({
    header_handle: z
      .array(z.string())
      .min(1, "At least one header_handle is required"),
  }),
});

/**
 * Location header input schema
 */
export const templateHeaderLocationInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.literal("LOCATION"),
});

/**
 * Union of all header formats
 */
export const templateHeaderComponentInputSchema = z.discriminatedUnion(
  "format",
  [
    templateHeaderTextInputSchema,
    templateHeaderMediaInputSchema,
    templateHeaderLocationInputSchema,
  ]
);

// =============================================================================
// Body Component Input Schema
// =============================================================================

/**
 * Body component input schema
 * Required component - supports variables (e.g., "Hello {{1}}, your code is {{2}}")
 */
export const templateBodyComponentInputSchema = z.object({
  type: z.literal("BODY"),
  text: z
    .string()
    .min(1)
    .max(1024, "Body text must be 1024 characters or less"),
  // Example values for body variables
  // Array of arrays to support multiple example sets
  example: z
    .object({
      body_text: z.array(z.array(z.string())),
    })
    .optional(),
});

// =============================================================================
// Footer Component Input Schema
// =============================================================================

/**
 * Footer component input schema
 */
export const templateFooterComponentInputSchema = z.object({
  type: z.literal("FOOTER"),
  text: z.string().min(1).max(60, "Footer text must be 60 characters or less"),
});

// =============================================================================
// Buttons Component Input Schema
// =============================================================================

/**
 * Buttons component input schema (container for button array)
 */
export const templateButtonsComponentInputSchema = z.object({
  type: z.literal("BUTTONS"),
  buttons: z
    .array(templateButtonInputSchema)
    .min(1)
    .max(10, "Maximum 10 buttons allowed"),
});

// =============================================================================
// Union of All Component Input Types
// =============================================================================

/**
 * Union of all component input types
 * Used for template creation and update requests
 */
export const templateComponentInputSchema = z.union([
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema,
]);
