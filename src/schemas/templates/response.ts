import { z } from "zod";
import { componentSchema } from "./component";

/**
 * Schema for template (the base/select model - what you get from API)
 */
export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string(),
  status: z.string(),
  category: z.string(),
  components: z.array(componentSchema),
});

/**
 * Schema for create template response
 */
export const createTemplateResponseSchema = z.object({
  id: z.string(),
  status: z.string(),
  category: z.string(),
});

/**
 * Schema for list templates response
 */
export const templateListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string(),
  status: z.string(),
  category: z.string(),
  components: z.array(componentSchema),
});

export const listTemplatesResponseSchema = z.object({
  data: z.array(templateListItemSchema),
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
export const updateTemplateResponseSchema = z.object({
  success: z.boolean(),
});

/**
 * Schema for delete template response
 */
export const deleteTemplateResponseSchema = z.object({
  success: z.boolean(),
});

