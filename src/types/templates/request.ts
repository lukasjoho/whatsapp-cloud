import { z } from "zod";
import {
  createTemplateRequestSchema,
  updateTemplateRequestSchema,
  listTemplatesRequestSchema,
  deleteTemplateRequestSchema,
} from "../../schemas/templates/request";

/**
 * Type for creating a template
 */
export type CreateTemplateRequest = z.infer<typeof createTemplateRequestSchema>;

/**
 * Type for updating a template
 */
export type UpdateTemplateRequest = z.infer<typeof updateTemplateRequestSchema>;

/**
 * Type for listing templates
 */
export type ListTemplatesRequest = z.infer<typeof listTemplatesRequestSchema>;

/**
 * Type for deleting a template
 */
export type DeleteTemplateRequest = z.infer<typeof deleteTemplateRequestSchema>;

