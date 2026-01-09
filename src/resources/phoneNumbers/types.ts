import type { z } from "zod";
import type {
  // Enums
  phoneNumberQualityRatingSchema,
  phoneNumberStatusSchema,
  codeVerificationStatusSchema,
  unifiedCertStatusSchema,
  accountModeSchema,
  hostPlatformSchema,
  nameStatusSchema,
  messagingLimitTierSchema,
  codeMethodSchema,
  verticalSchema,
  // Phone Number
  phoneNumberResponseSchema,
  phoneNumberListResponseSchema,
  phoneNumberListOptionsSchema,
  cursorPagingSchema,
  // Add Preverified (Partner flow)
  addPreverifiedRequestSchema,
  addPreverifiedResponseSchema,
  // Create in WABA (Standard flow)
  phoneNumberCreateRequestSchema,
  phoneNumberCreateResponseSchema,
  // Register
  phoneNumberRegisterSchema,
  phoneNumberRegisterResponseSchema,
  // Verification
  requestVerificationCodeSchema,
  verifyCodeSchema,
  verificationResponseSchema,
  // Business Profile
  businessProfileSchema,
  businessProfileResponseSchema,
  businessProfileUpdateSchema,
  businessProfileUpdateResponseSchema,
} from "./schema";

// =============================================================================
// Enums
// =============================================================================

export type PhoneNumberQualityRating = z.infer<
  typeof phoneNumberQualityRatingSchema
>;
export type PhoneNumberStatus = z.infer<typeof phoneNumberStatusSchema>;
export type CodeVerificationStatus = z.infer<
  typeof codeVerificationStatusSchema
>;
export type UnifiedCertStatus = z.infer<typeof unifiedCertStatusSchema>;
export type AccountMode = z.infer<typeof accountModeSchema>;
export type HostPlatform = z.infer<typeof hostPlatformSchema>;
export type NameStatus = z.infer<typeof nameStatusSchema>;
export type MessagingLimitTier = z.infer<typeof messagingLimitTierSchema>;
export type CodeMethod = z.infer<typeof codeMethodSchema>;
export type Vertical = z.infer<typeof verticalSchema>;

// =============================================================================
// Phone Number
// =============================================================================

export type PhoneNumber = z.infer<typeof phoneNumberResponseSchema>;
export type PhoneNumberListResponse = z.infer<
  typeof phoneNumberListResponseSchema
>;
export type PhoneNumberListOptions = z.infer<
  typeof phoneNumberListOptionsSchema
>;
export type CursorPaging = z.infer<typeof cursorPagingSchema>;

// =============================================================================
// Add Preverified (Partner flow)
// POST /{Business-ID}/add_phone_numbers
// =============================================================================

export type AddPreverifiedRequest = z.infer<typeof addPreverifiedRequestSchema>;
export type AddPreverifiedResponse = z.infer<
  typeof addPreverifiedResponseSchema
>;

// =============================================================================
// Create in WABA (Standard flow)
// POST /{WABA-ID}/phone_numbers
// =============================================================================

export type PhoneNumberCreateRequest = z.infer<
  typeof phoneNumberCreateRequestSchema
>;
export type PhoneNumberCreateResponse = z.infer<
  typeof phoneNumberCreateResponseSchema
>;

// =============================================================================
// Register / Deregister
// =============================================================================

export type PhoneNumberRegister = z.infer<typeof phoneNumberRegisterSchema>;
export type PhoneNumberRegisterResponse = z.infer<
  typeof phoneNumberRegisterResponseSchema
>;

// =============================================================================
// Verification
// =============================================================================

export type RequestVerificationCode = z.infer<
  typeof requestVerificationCodeSchema
>;
export type VerifyCode = z.infer<typeof verifyCodeSchema>;
export type VerificationResponse = z.infer<typeof verificationResponseSchema>;

// =============================================================================
// Business Profile
// =============================================================================

export type BusinessProfile = z.infer<typeof businessProfileSchema>;
export type BusinessProfileResponse = z.infer<
  typeof businessProfileResponseSchema
>;
export type BusinessProfileUpdate = z.infer<typeof businessProfileUpdateSchema>;
export type BusinessProfileUpdateResponse = z.infer<
  typeof businessProfileUpdateResponseSchema
>;
