import { z } from "zod";
import {
  templateSchema,
  templateCreateResponseSchema,
  templateListResponseSchema,
  templateUpdateResponseSchema,
  templateDeleteResponseSchema,
} from "../../schemas/templates/response";

/**
 * Type for a template (the base/select model - what you get from API)
 */
export type Template = z.infer<typeof templateSchema>;

/**
 * Type for create template response
 */
export type TemplateCreateResponse = z.infer<
  typeof templateCreateResponseSchema
>;

/**
 * Type for list templates response
 */
export type TemplateListResponse = z.infer<typeof templateListResponseSchema>;

/**
 * Type for update template response
 */
export type TemplateUpdateResponse = z.infer<
  typeof templateUpdateResponseSchema
>;

/**
 * Type for delete template response
 */
export type TemplateDeleteResponse = z.infer<
  typeof templateDeleteResponseSchema
>;
