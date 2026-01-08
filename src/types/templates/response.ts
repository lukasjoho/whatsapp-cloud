import { z } from "zod";
import {
  templateSchema,
  templateCreateResponseSchema,
  templateListResponseSchema,
  templateUpdateResponseSchema,
  templateDeleteResponseSchema,
  templateStatusSchema,
  templateQualityScoreSchema,
  templatePagingSchema,
  templatePagingCursorsSchema,
} from "../../schemas/templates/response";

/**
 * Template status type
 */
export type TemplateStatus = z.infer<typeof templateStatusSchema>;

/**
 * Template quality score type
 */
export type TemplateQualityScore = z.infer<typeof templateQualityScoreSchema>;

/**
 * Paging cursors type
 */
export type TemplatePagingCursors = z.infer<typeof templatePagingCursorsSchema>;

/**
 * Paging type for list responses
 */
export type TemplatePaging = z.infer<typeof templatePagingSchema>;

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
