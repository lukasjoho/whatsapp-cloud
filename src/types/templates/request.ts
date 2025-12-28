import { z } from "zod";
import {
  templateCreateSchema,
  templateUpdateSchema,
  listTemplatesRequestSchema,
  deleteTemplateRequestSchema,
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
export type ListTemplatesRequest = z.infer<typeof listTemplatesRequestSchema>;

/**
 * Type for deleting a template
 */
export type DeleteTemplateRequest = z.infer<typeof deleteTemplateRequestSchema>;

