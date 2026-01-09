import { z } from "zod";

// =============================================================================
// Pagination
// =============================================================================

export const qrCodeCursorsSchema = z.object({
  before: z.string().optional(),
  after: z.string().optional(),
});

export const qrCodePagingSchema = z.object({
  cursors: qrCodeCursorsSchema.optional(),
  previous: z.string().optional(),
  next: z.string().optional(),
});

// =============================================================================
// QR Code
// =============================================================================

/**
 * QR Code image format
 */
export const qrImageFormatSchema = z.enum(["PNG", "SVG"]);

/**
 * QR Code details
 */
export const qrCodeSchema = z.object({
  /** Unique 14-character QR code identifier */
  code: z.string(),
  /** Pre-filled message text that appears in customer chat */
  prefilled_message: z.string(),
  /** WhatsApp deep link URL for direct conversation initiation */
  deep_link_url: z.string(),
  /** Unix timestamp when QR code was created (first-party apps only) */
  creation_time: z.number().optional(),
  /** QR code image download URL (when format specified in fields) */
  qr_image_url: z.string().optional(),
});

// =============================================================================
// List Response
// =============================================================================

export const qrCodeListResponseSchema = z.object({
  data: z.array(qrCodeSchema),
  paging: qrCodePagingSchema.optional(),
});

// =============================================================================
// Single QR Code Response (wrapped in data array for consistency)
// =============================================================================

export const qrCodeResponseSchema = z.object({
  data: z.array(qrCodeSchema),
});

// =============================================================================
// Create/Update Response
// =============================================================================

export const qrCodeMutationResponseSchema = z.object({
  /** Unique 14-character identifier for the QR code */
  code: z.string(),
  /** The pre-filled message text associated with this QR code */
  prefilled_message: z.string(),
  /** WhatsApp deep link URL */
  deep_link_url: z.string(),
  /** URL to download the QR code image (if generate_qr_image was specified) */
  qr_image_url: z.string().optional(),
});

// =============================================================================
// Delete Response
// =============================================================================

export const qrCodeDeleteResponseSchema = z.object({
  success: z.boolean(),
});

// =============================================================================
// Request Schemas
// =============================================================================

/**
 * Request payload for creating a new QR code
 */
export const createQrCodeRequestSchema = z.object({
  /** Pre-filled message text (max 140 characters) */
  prefilled_message: z.string().max(140),
  /** QR image format - when specified, response includes qr_image_url */
  generate_qr_image: qrImageFormatSchema.optional(),
});

/**
 * Request payload for updating an existing QR code
 */
export const updateQrCodeRequestSchema = z.object({
  /** 14-character QR code identifier to update */
  code: z.string(),
  /** New pre-filled message text (max 140 characters) */
  prefilled_message: z.string().max(140),
});

// =============================================================================
// List Options
// =============================================================================

export const qrCodeListOptionsSchema = z.object({
  /** Comma-separated list of fields to include */
  fields: z.string().optional(),
  /** Filter results to a specific QR code by its identifier */
  code: z.string().optional(),
  /** Maximum number of QR codes to return (1-25) */
  limit: z.number().min(1).max(25).optional(),
  /** Cursor for next page */
  after: z.string().optional(),
  /** Cursor for previous page */
  before: z.string().optional(),
});
