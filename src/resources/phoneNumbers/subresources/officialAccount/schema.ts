import { z } from "zod";

// =============================================================================
// Enums
// =============================================================================

/**
 * Official Business Account appeal and verification status
 */
export const obaStatusSchema = z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
  "UNDER_REVIEW",
  "EXPIRED",
  "CANCELLED",
]);

// =============================================================================
// Status Response
// =============================================================================

/**
 * Official Business Account status information
 */
export const officialAccountStatusSchema = z.object({
  /** Unique identifier for the WhatsApp Business Account phone number */
  id: z.string(),
  /** Current OBA verification status */
  oba_status: obaStatusSchema,
  /** Human-readable message describing the current status */
  status_message: z.string(),
});

// =============================================================================
// Apply Request
// =============================================================================

/**
 * Request payload for applying for Official Business Account status
 */
export const officialAccountApplyRequestSchema = z.object({
  /** Official business website URL */
  business_website_url: z.string().url(),
  /** Primary country where the business operates */
  primary_country_of_operation: z.string(),
  /** Primary language used by the business */
  primary_language: z.string().optional(),
  /** Parent business or brand name */
  parent_business_or_brand: z.string().optional(),
  /** Supporting links that demonstrate business notability (min 5, max 10) */
  supporting_links: z.array(z.string().url()).min(5).max(10).optional(),
  /** Additional information to support the application */
  additional_supporting_information: z.string().optional(),
});

// =============================================================================
// Apply Response
// =============================================================================

/**
 * Response from applying for Official Business Account status
 */
export const officialAccountApplyResponseSchema = z.object({
  /** Indicates if the operation was successful */
  success: z.boolean(),
  /** Human-readable message describing the result */
  message: z.string(),
  /** Updated status after the operation */
  updated_status: officialAccountStatusSchema.optional(),
  /** Unique identifier for tracking the application request */
  tracking_id: z.string().optional(),
});
