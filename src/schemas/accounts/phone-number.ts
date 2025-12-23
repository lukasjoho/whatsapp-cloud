import { z } from "zod";

/**
 * Schema for phone number response
 * Matches WhatsApp API structure for phone number objects
 */
export const phoneNumberResponseSchema = z.object({
  verified_name: z.string(),
  display_phone_number: z.string(),
  id: z.string(),
  quality_rating: z.string(),
});

/**
 * Schema for phone number list response
 * Matches WhatsApp API structure for GET /phone_numbers endpoint
 */
export const phoneNumberListResponseSchema = z.object({
  data: z.array(phoneNumberResponseSchema),
});
