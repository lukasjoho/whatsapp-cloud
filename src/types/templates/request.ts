import { z } from "zod";
import {
  templateCreateSchema,
  templateUpdateSchema,
  templateListSchema,
  templateDeleteSchema,
} from "../../schemas/templates/request";

/**
 * Type for creating a template
 */
export type TemplateCreate = z.infer<typeof templateCreateSchema>;

/**
 * Type for updating a template
 */
export type TemplateUpdate = z.infer<typeof templateUpdateSchema>;

/**
 * Type for listing templates
 */
export type TemplateList = z.infer<typeof templateListSchema>;

/**
 * Type for deleting a template
 */
export type TemplateDelete = z.infer<typeof templateDeleteSchema>;
