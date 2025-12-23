import { z } from "zod";

/**
 * Schema for WhatsApp Business Account (WABA) response
 * Matches WhatsApp API structure for WABA objects
 */
export const businessAccountResponseSchema = z.object({
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
 * Schema for WhatsApp Business Accounts list response
 * Matches WhatsApp API structure for GET /whatsapp_business_accounts endpoint
 *
 * Note: The API returns data as an object with numeric string keys (e.g., "0", "1")
 * or as an array, plus optional paging information
 */
export const businessAccountsListResponseSchema = z.object({
  data: z.record(z.string(), businessAccountResponseSchema).or(
    z.array(businessAccountResponseSchema)
  ),
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

