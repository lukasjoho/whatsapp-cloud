import { z } from "zod";

// =============================================================================
// Enums (aligned with official docs)
// =============================================================================

/**
 * Quality rating for the phone number based on message delivery and user feedback
 * @see GET /{WABA-ID}/phone_numbers
 */
export const phoneNumberQualityRatingSchema = z.enum([
  "GREEN",
  "YELLOW",
  "RED",
  "UNKNOWN",
  "NA",
]);

/**
 * Current status of the phone number in the WhatsApp Business Account
 * @see GET /{WABA-ID}/phone_numbers
 */
export const phoneNumberStatusSchema = z.enum([
  "PENDING",
  "LINKED",
  "UNLINKED",
  "DELETED",
  "MIGRATED",
  "BANNED",
  "RESTRICTED",
  "CONNECTED",
  "DISCONNECTED",
  "FLAGGED",
  "RATE_LIMITED",
]);

/**
 * Two-step verification status for the phone number
 */
export const codeVerificationStatusSchema = z.enum([
  "VERIFIED",
  "NOT_VERIFIED",
  "EXPIRED",
]);

/**
 * Unified certification status combining business and name verification
 */
export const unifiedCertStatusSchema = z.enum([
  "APPROVED",
  "NAME_PENDING_REVIEW",
  "NAME_NOT_APPROVED",
  "ACCOUNT_REVIEW_NOT_STARTED",
  "LIMITED_ACCESS",
]);

/**
 * Account mode indicating sandbox or live environment
 */
export const accountModeSchema = z.enum(["LIVE", "SANDBOX"]);

/**
 * Platform hosting the WhatsApp Business Account
 */
export const hostPlatformSchema = z.enum([
  "CLOUD_API",
  "ON_PREMISE",
  "NOT_APPLICABLE",
]);

/**
 * Display name status for the phone number
 */
export const nameStatusSchema = z.enum([
  "APPROVED",
  "AVAILABLE_WITHOUT_REVIEW",
  "DECLINED",
  "EXPIRED",
  "PENDING_REVIEW",
  "NONE",
]);

/**
 * Messaging limit tier
 */
export const messagingLimitTierSchema = z.enum([
  "TIER_50",
  "TIER_250",
  "TIER_1K",
  "TIER_10K",
  "TIER_100K",
  "TIER_UNLIMITED",
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
// Phone Number Response (from GET /{WABA-ID}/phone_numbers)
// =============================================================================

/**
 * Phone number details as returned from WABA-level list endpoint
 * @see GET /{WABA-ID}/phone_numbers
 */
export const phoneNumberResponseSchema = z.object({
  id: z.string(),
  display_phone_number: z.string(),
  verified_name: z.string().optional(),
  status: phoneNumberStatusSchema.optional(),
  quality_rating: phoneNumberQualityRatingSchema.optional(),
  country_code: z.string().optional(),
  country_dial_code: z.string().optional(),
  code_verification_status: codeVerificationStatusSchema.optional(),
  unified_cert_status: unifiedCertStatusSchema.optional(),
  account_mode: accountModeSchema.optional(),
  host_platform: hostPlatformSchema.optional(),
  messaging_limit_tier: messagingLimitTierSchema.optional(),
  is_official_business_account: z.boolean().optional(),
  username: z.string().optional(),
  name_status: nameStatusSchema.optional(),
  certificate: z.string().optional(),
  is_pin_enabled: z.boolean().optional(),
  search_visibility: z.string().optional(),
});

// =============================================================================
// List Phone Numbers (GET /{WABA-ID}/phone_numbers)
// =============================================================================

export const cursorPagingSchema = z.object({
  cursors: z
    .object({
      before: z.string().optional(),
      after: z.string().optional(),
    })
    .optional(),
  previous: z.string().optional(),
  next: z.string().optional(),
});

export const phoneNumberListResponseSchema = z.object({
  data: z.array(phoneNumberResponseSchema),
  paging: cursorPagingSchema.optional(),
});

export const phoneNumberListOptionsSchema = z.object({
  fields: z.string().optional(),
  filtering: z.string().optional(),
  sort: z
    .enum([
      "creation_time.asc",
      "creation_time.desc",
      "last_onboarded_time.asc",
      "last_onboarded_time.desc",
    ])
    .optional(),
  limit: z.number().min(1).max(100).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
});

// =============================================================================
// Add Preverified Phone Number (POST /{Business-ID}/add_phone_numbers)
// Partner flow - adds to business portfolio pool
// =============================================================================

/**
 * Request to add a preverified phone number to the business portfolio
 * @see POST /{Business-ID}/add_phone_numbers
 */
export const addPreverifiedRequestSchema = z.object({
  phone_number: z.string(),
});

/**
 * Response containing the preverified phone number entity ID
 */
export const addPreverifiedResponseSchema = z.object({
  id: z.string(),
});

// =============================================================================
// Create Phone Number in WABA (POST /{WABA-ID}/phone_numbers)
// Standard flow - creates phone number in a specific WABA
// =============================================================================

/**
 * Request to create a phone number in a WABA
 * @see POST /{WABA-ID}/phone_numbers
 */
export const phoneNumberCreateRequestSchema = z.object({
  /** Phone number in E.164 format without the + prefix */
  phone_number: z.string(),
  /** Business name to be verified for this phone number */
  verified_name: z.string(),
  /** Country code for the phone number */
  cc: z.string().optional(),
  /** Whether this is a phone number migration from on-premises */
  migrate_phone_number: z.boolean().optional(),
  /** Pre-verified phone number ID for BSP scenarios (from addPreverified) */
  preverified_id: z.string().optional(),
});

/**
 * Response containing the created phone number ID
 */
export const phoneNumberCreateResponseSchema = z.object({
  id: z.string(),
});

// =============================================================================
// Register / Deregister
// =============================================================================

export const phoneNumberRegisterSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  pin: z.string().min(6).max(6),
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
