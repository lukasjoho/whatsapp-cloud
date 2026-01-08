import { z } from "zod";
import { templateComponentInputSchema } from "./component-input";
import { templateLanguageSchema } from "./language";

/**
 * Template category schema
 */
export const templateCategorySchema = z.enum([
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY",
]);

/**
 * Helper type for component array refinements
 */
type ComponentArray = z.infer<typeof templateComponentInputSchema>[];

/**
 * Validation helpers for component arrays
 */
const hasBody = (components: ComponentArray) =>
  components.some((c) => c.type === "BODY");

const hasMaxOneHeader = (components: ComponentArray) =>
  components.filter((c) => c.type === "HEADER").length <= 1;

const hasMaxOneFooter = (components: ComponentArray) =>
  components.filter((c) => c.type === "FOOTER").length <= 1;

const hasMaxOneButtons = (components: ComponentArray) =>
  components.filter((c) => c.type === "BUTTONS").length <= 1;

/**
 * Base components schema with common refinements
 */
const baseComponentsSchema = z
  .array(templateComponentInputSchema)
  .min(1, "At least one component is required")
  .refine(hasBody, { message: "BODY component is required" })
  .refine(hasMaxOneHeader, { message: "Only one HEADER component is allowed" })
  .refine(hasMaxOneFooter, { message: "Only one FOOTER component is allowed" })
  .refine(hasMaxOneButtons, {
    message: "Only one BUTTONS component is allowed",
  });

/**
 * Template name schema
 * Note: WhatsApp requires lowercase letters, numbers, and underscores only.
 * Use the `toTemplateName()` utility to convert arbitrary strings.
 */
const templateNameSchema = z
  .string()
  .min(1, "Template name is required")
  .max(512, "Template name must be 512 characters or less");

/**
 * Schema for creating a MARKETING template
 */
export const templateCreateMarketingSchema = z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z.literal("MARKETING"),
  components: baseComponentsSchema,
});

/**
 * Schema for creating a UTILITY template
 */
export const templateCreateUtilitySchema = z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z.literal("UTILITY"),
  components: baseComponentsSchema,
});

/**
 * Schema for creating an AUTHENTICATION template
 * Note: Simplified validation - full auth template rules may be added later
 */
export const templateCreateAuthenticationSchema = z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z.literal("AUTHENTICATION"),
  components: z
    .array(templateComponentInputSchema)
    .min(1, "At least one component is required")
    .refine(hasBody, { message: "BODY component is required" }),
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
  after: z.string().optional(),
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
