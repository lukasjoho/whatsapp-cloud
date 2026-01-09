import { z } from "zod";

// =============================================================================
// Media Type Schema
// =============================================================================

/**
 * Supported media types for upload
 */
export const mediaTypeSchema = z.enum([
  "image",
  "video",
  "audio",
  "document",
  "sticker",
]);

/**
 * Supported MIME types
 *
 * Audio: audio/aac, audio/amr, audio/mpeg, audio/mp4, audio/ogg
 * Image: image/jpeg, image/png
 * Video: video/3gpp, video/mp4
 * Document: text/plain, application/pdf, application/msword, etc.
 * Sticker: image/webp
 */
export const mediaMimeTypeSchema = z.string();

// =============================================================================
// Upload Schemas
// =============================================================================

/**
 * Input for uploading media
 */
export const mediaUploadSchema = z.object({
  /**
   * The file to upload - can be Buffer, Blob, or File
   */
  file: z.union([z.instanceof(Blob), z.instanceof(ArrayBuffer)]),

  /**
   * MIME type of the file (e.g., "image/jpeg", "video/mp4")
   */
  mimeType: z.string().min(1),

  /**
   * Optional filename
   */
  filename: z.string().optional(),
});

/**
 * Response from uploading media
 */
export const mediaUploadResponseSchema = z.object({
  id: z.string(),
});

// =============================================================================
// Get/Retrieve Schemas
// =============================================================================

/**
 * Media metadata response (from GET /MEDIA_ID)
 *
 * The URL is only valid for 5 minutes.
 */
export const mediaMetadataSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  url: z.string(),
  mime_type: z.string(),
  sha256: z.string(),
  file_size: z.string(),
  id: z.string(),
});

// =============================================================================
// Delete Schemas
// =============================================================================

/**
 * Response from deleting media
 */
export const mediaDeleteResponseSchema = z.object({
  success: z.boolean(),
});
