import { z } from "zod";

/**
 * Button schemas for template components
 * Simplified version without variables for now
 */

/**
 * Quick reply button schema
 */
export const quickReplyButtonSchema = z.object({
  type: z.literal("QUICK_REPLY"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
});

/**
 * URL button schema
 * Note: example field will be added later when we support variables
 */
export const urlButtonSchema = z.object({
  type: z.literal("URL"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: z.string().url().max(2000, "URL must be 2000 characters or less"),
  // example: z.array(z.string()).optional(), // For later: when URL contains variables
});

/**
 * Phone number button schema
 */
export const phoneNumberButtonSchema = z.object({
  type: z.literal("PHONE_NUMBER"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: z
    .string()
    .min(1)
    .max(20, "Phone number must be 20 characters or less"),
});

/**
 * Copy code button schema
 * Note: example field will be added later
 */
export const copyCodeButtonSchema = z.object({
  type: z.literal("COPY_CODE"),
  // example: z.string().max(15).optional(), // For later: example value to copy
});

/**
 * Flow button schema (for authentication templates)
 * Note: Will be expanded later when we support flow templates
 */
export const flowButtonSchema = z.object({
  type: z.literal("FLOW"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_action: z.string().optional(),
  flow_id: z.string().optional(),
  navigate_screen: z.string().optional(),
});

/**
 * Union of all button types
 */
export const buttonSchema = z.discriminatedUnion("type", [
  quickReplyButtonSchema,
  urlButtonSchema,
  phoneNumberButtonSchema,
  copyCodeButtonSchema,
  flowButtonSchema,
]);

/**
 * Header component schema
 * Simplified - no variables/examples for now
 *
 * Note:
 * - TEXT format requires text field
 * - IMAGE/VIDEO/DOCUMENT formats require example.header_handle (for later)
 * - LOCATION format requires neither text nor example
 */
export const headerComponentSchema = z
  .object({
    type: z.literal("HEADER"),
    format: z.enum(["TEXT", "IMAGE", "VIDEO", "DOCUMENT", "LOCATION"]),
    text: z
      .string()
      .max(60, "Header text must be 60 characters or less")
      .optional(),
    // example: z.object({...}).optional(), // For later: when using variables or media
  })
  .refine(
    (data) => {
      // TEXT format requires text
      if (data.format === "TEXT" && !data.text) {
        return false;
      }
      // LOCATION format doesn't need text
      if (data.format === "LOCATION") {
        return true;
      }
      // IMAGE/VIDEO/DOCUMENT will need example.header_handle (for later)
      return true;
    },
    {
      message: "TEXT format header requires text field",
    }
  );

/**
 * Body component schema
 * Required component - no variables for now
 */
export const bodyComponentSchema = z.object({
  type: z.literal("BODY"),
  text: z
    .string()
    .min(1)
    .max(1024, "Body text must be 1024 characters or less"),
  // example: z.object({...}).optional(), // For later: when using variables
});

/**
 * Footer component schema
 */
export const footerComponentSchema = z.object({
  type: z.literal("FOOTER"),
  text: z.string().min(1).max(60, "Footer text must be 60 characters or less"),
});

/**
 * Buttons component schema
 */
export const buttonsComponentSchema = z.object({
  type: z.literal("BUTTONS"),
  buttons: z.array(buttonSchema).min(1).max(10, "Maximum 10 buttons allowed"),
});

/**
 * Union of all component types
 */
export const componentSchema = z.discriminatedUnion("type", [
  headerComponentSchema,
  bodyComponentSchema,
  footerComponentSchema,
  buttonsComponentSchema,
]);
