import { z } from "zod";
import { templateComponentSchema } from "./component";
import { templateCategorySchema } from "./request";

/**
 * Template status schema
 * All possible status values returned by the API
 */
export const templateStatusSchema = z.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "PAUSED",
  "DISABLED",
  "IN_APPEAL",
  "PENDING_DELETION",
  "DELETED",
  "LIMIT_EXCEEDED",
]);

/**
 * Quality score schema
 * Returned for templates with quality tracking
 */
export const templateQualityScoreSchema = z.object({
  score: z.enum(["GREEN", "YELLOW", "RED", "UNKNOWN"]).optional(),
  date: z.number().optional(),
});

/**
 * Schema for template (the base/select model - what you get from API)
 */
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
  components: z.array(templateComponentSchema),
  // Additional response fields
  quality_score: templateQualityScoreSchema.optional(),
  rejected_reason: z.string().optional(),
  previous_category: z.string().optional(),
});

/**
 * Schema for create template response
 */
export const templateCreateResponseSchema = z.object({
  id: z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
});

/**
 * Paging cursors schema
 */
export const templatePagingCursorsSchema = z.object({
  before: z.string().optional(),
  after: z.string().optional(),
});

/**
 * Paging schema for list responses
 */
export const templatePagingSchema = z.object({
  cursors: templatePagingCursorsSchema.optional(),
  next: z.string().optional(),
  previous: z.string().optional(),
});

/**
 * Schema for list templates response
 */
export const templateListResponseSchema = z.object({
  data: z.array(templateSchema),
  paging: templatePagingSchema.optional(),
});

/**
 * Schema for update template response
 */
export const templateUpdateResponseSchema = z.object({
  success: z.boolean(),
});

/**
 * Schema for delete template response
 */
export const templateDeleteResponseSchema = z.object({
  success: z.boolean(),
});
