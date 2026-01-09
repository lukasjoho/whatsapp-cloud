import { z } from "zod";

// =============================================================================
// Enums
// =============================================================================

export const phoneNumberQualityRatingSchema = z.enum([
  "GREEN",
  "YELLOW",
  "RED",
  "UNKNOWN",
]);

export const phoneNumberStatusSchema = z.enum([
  "PENDING",
  "DELETED",
  "MIGRATED",
  "BANNED",
  "RESTRICTED",
  "RATE_LIMITED",
  "FLAGGED",
  "CONNECTED",
  "DISCONNECTED",
  "UNKNOWN",
]);

export const codeMethodSchema = z.enum(["SMS", "VOICE"]);

export const verticalSchema = z.enum([
  "UNDEFINED",
  "OTHER",
  "AUTO",
  "BEAUTY",
  "APPAREL",
  "EDU",
  "ENTERTAIN",
  "EVENT_PLAN",
  "FINANCE",
  "GROCERY",
  "GOVT",
  "HOTEL",
  "HEALTH",
  "NONPROFIT",
  "PROF_SERVICES",
  "RETAIL",
  "TRAVEL",
  "RESTAURANT",
  "NOT_A_BIZ",
]);

// =============================================================================
// Phone Number Response
// =============================================================================

export const phoneNumberResponseSchema = z.object({
  id: z.string(),
  display_phone_number: z.string(),
  verified_name: z.string(),
  quality_rating: phoneNumberQualityRatingSchema.optional(),
  code_verification_status: z.string().optional(),
  is_official_business_account: z.boolean().optional(),
  account_mode: z.string().optional(),
  eligibility_for_api_business_global_search: z.string().optional(),
  is_pin_enabled: z.boolean().optional(),
  name_status: z.string().optional(),
  new_name_status: z.string().optional(),
  status: phoneNumberStatusSchema.optional(),
  search_visibility: z.string().optional(),
  messaging_limit_tier: z.string().optional(),
});

// =============================================================================
// List Phone Numbers Response
// =============================================================================

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
      next: z.string().optional(),
      previous: z.string().optional(),
    })
    .optional(),
});

// =============================================================================
// Add Phone Number
// =============================================================================

export const phoneNumberAddSchema = z.object({
  phone_number: z.string(),
  country_code: z.string().optional(),
  verified_name: z.string().optional(),
  waba_id: z.string(),
});

export const phoneNumberAddResponseSchema = z.object({
  id: z.string(),
});

// =============================================================================
// Register / Deregister
// =============================================================================

export const phoneNumberRegisterSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  pin: z.string().min(6).max(6),
});

export const phoneNumberDeregisterSchema = z.object({
  messaging_product: z.literal("whatsapp").optional(),
});

export const phoneNumberRegisterResponseSchema = z.object({
  success: z.boolean(),
});

// =============================================================================
// Verification Code
// =============================================================================

export const requestVerificationCodeSchema = z.object({
  code_method: codeMethodSchema,
  language: z.string().optional(),
});

export const verifyCodeSchema = z.object({
  code: z.string(),
});

export const verificationResponseSchema = z.object({
  success: z.boolean(),
});

// =============================================================================
// Business Profile
// =============================================================================

export const businessProfileSchema = z.object({
  messaging_product: z.literal("whatsapp").optional(),
  about: z.string().max(139).optional(),
  address: z.string().max(256).optional(),
  description: z.string().max(512).optional(),
  email: z.string().email().optional(),
  profile_picture_url: z.string().url().optional(),
  websites: z.array(z.string().url()).max(2).optional(),
  vertical: verticalSchema.optional(),
});

export const businessProfileResponseSchema = z.object({
  data: z.array(businessProfileSchema),
});

export const businessProfileUpdateSchema = businessProfileSchema.extend({
  messaging_product: z.literal("whatsapp"),
});

export const businessProfileUpdateResponseSchema = z.object({
  success: z.boolean(),
});

// =============================================================================
// List Options
// =============================================================================

export const phoneNumberListOptionsSchema = z.object({
  fields: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
});
