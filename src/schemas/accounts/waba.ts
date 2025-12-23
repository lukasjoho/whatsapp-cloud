import { z } from "zod";

/**
 * Schema for WABA (WhatsApp Business Account) response
 */
export const wabaResponseSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  account_review_status: z.string().optional(),
  currency: z.string().optional(),
  country: z.string().optional(),
  timezone_id: z.string().optional(),
  business_verification_status: z.string().optional(),
  is_enabled_for_insights: z.boolean().optional(),
  message_template_namespace: z.string().optional(),
});

/**
 * Schema for WABA list response
 */
export const wabaListResponseSchema = z.object({
  data: z.array(wabaResponseSchema),
  paging: z
    .object({
      cursors: z
        .object({
          before: z.string().optional(),
          after: z.string().optional(),
        })
        .optional(),
      next: z.string().url().optional(),
      previous: z.string().url().optional(),
    })
    .optional(),
});

/**
 * Schema for creating a WABA
 */
export const createWabaRequestSchema = z.object({
  name: z.string().min(1),
  currency: z.string().length(3), // ISO 4217 currency code
  timezone_id: z.string().min(1),
});

/**
 * Schema for WABA creation response
 */
export const wabaCreationResponseSchema = z.object({
  id: z.string(),
  payment_account_id: z.string().optional(),
});
