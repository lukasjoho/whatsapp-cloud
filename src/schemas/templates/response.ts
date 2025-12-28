import { z } from "zod";
import { templateComponentSchema } from "./component";

/**
 * Schema for template (the base/select model - what you get from API)
 */
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string(),
  status: z.string(),
  category: z.string(),
  components: z.array(templateComponentSchema),
});

/**
 * Schema for create template response
 */
export const templateCreateResponseSchema = z.object({
  id: z.string(),
  status: z.string(),
  category: z.string(),
});

/**
 * Schema for list templates response
 */
export const templateListResponseSchema = z.object({
  data: z.array(templateSchema),
  paging: z
    .object({
      cursors: z
        .object({
          before: z.string().optional(),
          after: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
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
