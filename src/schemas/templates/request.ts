import { z } from "zod";
import { componentSchema } from "./component";

/**
 * Schema for creating a template
 * Simplified - no variables/examples for now
 */
export const templateCreateSchema = z.object({
  name: z.string().min(1).max(512, "Template name must be 512 characters or less"),
  language: z.string().min(2).max(5, "Language code must be 2-5 characters (e.g., 'en' or 'en_US')"),
  category: z.enum(["AUTHENTICATION", "MARKETING", "UTILITY"]),
  components: z
    .array(componentSchema)
    .min(1, "At least one component is required")
    .refine(
      (components) => {
        // Body component is required
        return components.some((c) => c.type === "BODY");
      },
      { message: "BODY component is required" }
    )
    .refine(
      (components) => {
        // Only one header allowed
        const headers = components.filter((c) => c.type === "HEADER");
        return headers.length <= 1;
      },
      { message: "Only one HEADER component is allowed" }
    )
    .refine(
      (components) => {
        // Only one footer allowed
        const footers = components.filter((c) => c.type === "FOOTER");
        return footers.length <= 1;
      },
      { message: "Only one FOOTER component is allowed" }
    )
    .refine(
      (components) => {
        // Only one buttons component allowed
        const buttons = components.filter((c) => c.type === "BUTTONS");
        return buttons.length <= 1;
      },
      { message: "Only one BUTTONS component is allowed" }
    ),
});

/**
 * Schema for updating a template
 * All fields optional - only update what's provided
 */
export const templateUpdateSchema = z.object({
  category: z.enum(["AUTHENTICATION", "MARKETING", "UTILITY"]).optional(),
  components: z.array(componentSchema).optional(),
  language: z.string().min(2).max(5).optional(),
  name: z.string().min(1).max(512).optional(),
});

/**
 * Schema for listing templates
 */
export const listTemplatesRequestSchema = z.object({
  name: z.string().optional(), // Filter by template name
});

/**
 * Schema for deleting a template
 * Either name or hsm_id must be provided
 */
export const deleteTemplateRequestSchema = z
  .object({
    name: z.string().optional(),
    hsm_id: z.string().optional(),
  })
  .refine((data) => data.name || data.hsm_id, {
    message: "Either name or hsm_id must be provided",
  });

