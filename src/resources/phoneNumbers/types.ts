import type { z } from "zod";
import type {
  phoneNumberQualityRatingSchema,
  phoneNumberStatusSchema,
  codeMethodSchema,
  verticalSchema,
  phoneNumberResponseSchema,
  phoneNumberListResponseSchema,
  phoneNumberAddSchema,
  phoneNumberAddResponseSchema,
  phoneNumberRegisterSchema,
  phoneNumberDeregisterSchema,
  phoneNumberRegisterResponseSchema,
  requestVerificationCodeSchema,
  verifyCodeSchema,
  verificationResponseSchema,
  businessProfileSchema,
  businessProfileResponseSchema,
  businessProfileUpdateSchema,
  businessProfileUpdateResponseSchema,
  phoneNumberListOptionsSchema,
} from "./schema";

// =============================================================================
// Enums
// =============================================================================

export type PhoneNumberQualityRating = z.infer<typeof phoneNumberQualityRatingSchema>;
export type PhoneNumberStatus = z.infer<typeof phoneNumberStatusSchema>;
export type CodeMethod = z.infer<typeof codeMethodSchema>;
export type Vertical = z.infer<typeof verticalSchema>;

// =============================================================================
// Phone Number
// =============================================================================

export type PhoneNumber = z.infer<typeof phoneNumberResponseSchema>;
export type PhoneNumberListResponse = z.infer<typeof phoneNumberListResponseSchema>;
export type PhoneNumberListOptions = z.infer<typeof phoneNumberListOptionsSchema>;

// =============================================================================
// Add Phone Number
// =============================================================================

export type PhoneNumberAdd = z.infer<typeof phoneNumberAddSchema>;
export type PhoneNumberAddResponse = z.infer<typeof phoneNumberAddResponseSchema>;

// =============================================================================
// Register / Deregister
// =============================================================================

export type PhoneNumberRegister = z.infer<typeof phoneNumberRegisterSchema>;
export type PhoneNumberDeregister = z.infer<typeof phoneNumberDeregisterSchema>;
export type PhoneNumberRegisterResponse = z.infer<typeof phoneNumberRegisterResponseSchema>;

// =============================================================================
// Verification
// =============================================================================

export type RequestVerificationCode = z.infer<typeof requestVerificationCodeSchema>;
export type VerifyCode = z.infer<typeof verifyCodeSchema>;
export type VerificationResponse = z.infer<typeof verificationResponseSchema>;

// =============================================================================
// Business Profile
// =============================================================================

export type BusinessProfile = z.infer<typeof businessProfileSchema>;
export type BusinessProfileResponse = z.infer<typeof businessProfileResponseSchema>;
export type BusinessProfileUpdate = z.infer<typeof businessProfileUpdateSchema>;
export type BusinessProfileUpdateResponse = z.infer<typeof businessProfileUpdateResponseSchema>;
