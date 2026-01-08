import { z } from "zod";

/**
 * Response component schemas - what the API returns
 * These are more permissive than input schemas since we trust API responses
 */

// =============================================================================
// Button Response Schema
// =============================================================================

/**
 * Button schema for API responses
 * Permissive schema that accepts all button types from the API
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

// =============================================================================
// Component Response Schema
// =============================================================================

/**
 * Component schema for API responses
 * Permissive schema that accepts all component types from the API
 */
export const templateComponentSchema = z.object({
  type: z.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  format: z.string().optional(),
  text: z.string().optional(),
  buttons: z.array(templateButtonSchema).optional(),
  example: z
    .object({
      header_text: z.array(z.string()).optional(),
      header_handle: z.array(z.string()).optional(),
      body_text: z.array(z.array(z.string())).optional(),
    })
    .optional(),
});

// =============================================================================
// Legacy exports for backwards compatibility
// These are now aliases to the response schemas
// =============================================================================

/** @deprecated Use templateButtonInputSchema from component-input.ts for requests */
export const templateQuickReplyButtonSchema = z.object({
  type: z.literal("QUICK_REPLY"),
  text: z.string(),
});

/** @deprecated Use templateButtonInputSchema from component-input.ts for requests */
export const templateUrlButtonSchema = z.object({
  type: z.literal("URL"),
  text: z.string(),
  url: z.string(),
  example: z.array(z.string()).optional(),
});

/** @deprecated Use templateButtonInputSchema from component-input.ts for requests */
export const templatePhoneNumberButtonSchema = z.object({
  type: z.literal("PHONE_NUMBER"),
  text: z.string(),
  phone_number: z.string(),
});

/** @deprecated Use templateButtonInputSchema from component-input.ts for requests */
export const templateCopyCodeButtonSchema = z.object({
  type: z.literal("COPY_CODE"),
  example: z.string().optional(),
});

/** @deprecated Use templateButtonInputSchema from component-input.ts for requests */
export const templateFlowButtonSchema = z.object({
  type: z.literal("FLOW"),
  text: z.string(),
  flow_action: z.string().optional(),
  flow_id: z.string().optional(),
  navigate_screen: z.string().optional(),
});

/** @deprecated Use templateHeaderComponentInputSchema from component-input.ts for requests */
export const templateHeaderComponentSchema = templateComponentSchema;

/** @deprecated Use templateBodyComponentInputSchema from component-input.ts for requests */
export const templateBodyComponentSchema = templateComponentSchema;

/** @deprecated Use templateFooterComponentInputSchema from component-input.ts for requests */
export const templateFooterComponentSchema = templateComponentSchema;

/** @deprecated Use templateButtonsComponentInputSchema from component-input.ts for requests */
export const templateButtonsComponentSchema = templateComponentSchema;
