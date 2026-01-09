import { z } from "zod";
import {
  mediaTypeSchema,
  mediaUploadSchema,
  mediaUploadResponseSchema,
  mediaMetadataSchema,
  mediaDeleteResponseSchema,
} from "./schema";

// =============================================================================
// Media Types
// =============================================================================

/**
 * Media type (image, video, audio, document, sticker)
 */
export type MediaType = z.infer<typeof mediaTypeSchema>;

// =============================================================================
// Upload Types
// =============================================================================

/**
 * Input for uploading media
 */
export type MediaUpload = z.infer<typeof mediaUploadSchema>;

/**
 * Response from uploading media
 */
export type MediaUploadResponse = z.infer<typeof mediaUploadResponseSchema>;

// =============================================================================
// Get/Retrieve Types
// =============================================================================

/**
 * Media metadata (from GET /MEDIA_ID)
 *
 * Contains the download URL (valid for 5 minutes), MIME type, file size, and hash.
 */
export type MediaMetadata = z.infer<typeof mediaMetadataSchema>;

// =============================================================================
// Delete Types
// =============================================================================

/**
 * Response from deleting media
 */
export type MediaDeleteResponse = z.infer<typeof mediaDeleteResponseSchema>;
