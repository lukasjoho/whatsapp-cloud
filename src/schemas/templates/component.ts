import { z } from "zod";

/**
 * Button schemas for template components
 * Simplified version without variables for now
 */

/**
 * Quick reply button schema
 */
export const templateQuickReplyButtonSchema = z.object({
  type: z.literal("QUICK_REPLY"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
});

/**
 * URL button schema
 * Note: example field will be added later when we support variables
 */
export const templateUrlButtonSchema = z.object({
  type: z.literal("URL"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: z.string().url().max(2000, "URL must be 2000 characters or less"),
  // example: z.array(z.string()).optional(), // For later: when URL contains variables
});

/**
 * Phone number button schema
 */
export const templatePhoneNumberButtonSchema = z.object({
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
export const templateCopyCodeButtonSchema = z.object({
  type: z.literal("COPY_CODE"),
  // example: z.string().max(15).optional(), // For later: example value to copy
});

/**
 * Flow button schema (for authentication templates)
 * Note: Will be expanded later when we support flow templates
 */
export const templateFlowButtonSchema = z.object({
  type: z.literal("FLOW"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_action: z.string().optional(),
  flow_id: z.string().optional(),
  navigate_screen: z.string().optional(),
});

/**
 * Union of all button types
 */
export const templateButtonSchema = z.discriminatedUnion("type", [
  templateQuickReplyButtonSchema,
  templateUrlButtonSchema,
  templatePhoneNumberButtonSchema,
  templateCopyCodeButtonSchema,
  templateFlowButtonSchema,
]);

/**
 * Header component schema
 *
 * Note:
 * - TEXT format requires text field
 * - IMAGE/VIDEO/DOCUMENT formats require example.header_handle (asset handle from Resumable Upload API)
 * - LOCATION format requires neither text nor example
 */
export const templateHeaderComponentSchema = z
  .object({
    type: z.literal("HEADER"),
    format: z.enum(["TEXT", "IMAGE", "VIDEO", "DOCUMENT", "LOCATION"]),
    text: z
      .string()
      .max(60, "Header text must be 60 characters or less")
      .optional(),
    example: z
      .object({
        header_handle: z
          .array(z.string())
          .min(1, "At least one header_handle is required"),
      })
      .optional(),
  })
  .refine(
    (data) => {
      // TEXT format requires text
      if (data.format === "TEXT" && !data.text) {
        return false;
      }
      // LOCATION format doesn't need text or example
      if (data.format === "LOCATION") {
        return true;
      }
      // IMAGE/VIDEO/DOCUMENT formats require example.header_handle
      if (["IMAGE", "VIDEO", "DOCUMENT"].includes(data.format)) {
        if (
          !data.example ||
          !data.example.header_handle ||
          data.example.header_handle.length === 0
        ) {
          return false;
        }
      }
      return true;
    },
    {
      message:
        "TEXT format requires text field; IMAGE/VIDEO/DOCUMENT formats require example.header_handle",
    }
  )
  .refine(
    (data) => {
      // TEXT format validation
      if (data.format === "TEXT") {
        return !!data.text;
      }
      return true;
    },
    {
      message: "TEXT format header requires text field",
    }
  )
  .refine(
    (data) => {
      // IMAGE/VIDEO/DOCUMENT format validation
      if (["IMAGE", "VIDEO", "DOCUMENT"].includes(data.format)) {
        return !!(
          data.example?.header_handle && data.example.header_handle.length > 0
        );
      }
      return true;
    },
    {
      message:
        "IMAGE/VIDEO/DOCUMENT format header requires example.header_handle (asset handle from Resumable Upload API)",
    }
  );

/**
 * Body component schema
 * Required component - no variables for now
 */
export const templateBodyComponentSchema = z.object({
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
export const templateFooterComponentSchema = z.object({
  type: z.literal("FOOTER"),
  text: z.string().min(1).max(60, "Footer text must be 60 characters or less"),
});

/**
 * Buttons component schema
 */
export const templateButtonsComponentSchema = z.object({
  type: z.literal("BUTTONS"),
  buttons: z
    .array(templateButtonSchema)
    .min(1)
    .max(10, "Maximum 10 buttons allowed"),
});

/**
 * Union of all component types
 */
export const templateComponentSchema = z.discriminatedUnion("type", [
  templateHeaderComponentSchema,
  templateBodyComponentSchema,
  templateFooterComponentSchema,
  templateButtonsComponentSchema,
]);
