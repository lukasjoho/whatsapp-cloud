import { z } from "zod";
import {
  templateSchema,
  createTemplateResponseSchema,
  listTemplatesResponseSchema,
  updateTemplateResponseSchema,
  deleteTemplateResponseSchema,
} from "../../schemas/templates/response";

/**
 * Type for a template (the base/select model - what you get from API)
 */
export type Template = z.infer<typeof templateSchema>;

/**
 * Type for create template response
 */
export type CreateTemplateResponse = z.infer<typeof createTemplateResponseSchema>;

/**
 * Type for list templates response
 */
export type ListTemplatesResponse = z.infer<typeof listTemplatesResponseSchema>;

/**
 * Type for update template response
 */
export type UpdateTemplateResponse = z.infer<typeof updateTemplateResponseSchema>;

/**
 * Type for delete template response
 */
export type DeleteTemplateResponse = z.infer<typeof deleteTemplateResponseSchema>;

