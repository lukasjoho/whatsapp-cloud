import { z } from "zod";

/**
 * Schema for phone number response
 */
export const phoneNumberResponseSchema = z.object({
  verified_name: z.string(),
  code_verification_status: z.string(),
  display_phone_number: z.string(),
  quality_rating: z.string(),
  platform_type: z.string(),
  throughput: z
    .object({
      level: z.string(),
    })
    .optional(),
  id: z.string(),
});

/**
 * Schema for phone number list response
 */
export const phoneNumberListResponseSchema = z.object({
  data: z.array(phoneNumberResponseSchema),
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
 * Schema for updating phone number
 */
export const updatePhoneNumberRequestSchema = z.object({
  displayName: z.string().optional(),
  about: z.string().optional(),
  profilePictureUrl: z.string().url().optional(),
});
