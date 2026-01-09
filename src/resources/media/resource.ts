import type { HttpClient } from "../../client/HttpClient";
import { GraphAPIError, type GraphAPIErrorResponse } from "../../errors";
import { mediaUploadSchema } from "./schema";
import type {
  MediaUpload,
  MediaUploadResponse,
  MediaMetadata,
  MediaDeleteResponse,
} from "./types";

/**
 * Media resource for managing WhatsApp media files
 *
 * Media files are encrypted and persist for 30 days unless deleted.
 * Media IDs from uploads expire after 30 days.
 * Media IDs from webhooks expire after 7 days.
 * Media URLs expire after 5 minutes.
 *
 * @example
 * ```typescript
 * // Upload media
 * const { id } = await client.media.upload({
 *   file: imageBuffer,
 *   mimeType: "image/jpeg"
 * });
 *
 * // Get media metadata (includes download URL)
 * const metadata = await client.media.get(mediaId);
 * console.log(metadata.url); // Valid for 5 minutes
 *
 * // Download media binary
 * const buffer = await client.media.download(mediaId);
 *
 * // Delete media
 * await client.media.delete(mediaId);
 * ```
 */
export class MediaResource {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get the phone number ID (with validation)
   */
  private getPhoneNumberId(overrideId?: string): string {
    const id = overrideId || this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }

  /**
   * Upload media to WhatsApp
   *
   * Uploaded media persists for 30 days unless deleted.
   * Returns a media ID that can be used in messages or templates.
   *
   * @param input - Upload input (file, mimeType, optional filename)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @returns Media ID
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * // Upload an image
   * const { id } = await client.media.upload({
   *   file: imageBuffer,
   *   mimeType: "image/jpeg",
   *   filename: "photo.jpg"
   * });
   *
   * // Use in a message
   * await client.messages.sendImage({
   *   to: "+1234567890",
   *   image: { id }
   * });
   * ```
   */
  async upload(
    input: MediaUpload,
    phoneNumberId?: string
  ): Promise<MediaUploadResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = mediaUploadSchema.parse(input);

    // Build FormData for multipart upload
    const formData = new FormData();
    formData.append("messaging_product", "whatsapp");

    // Handle file - convert ArrayBuffer to Blob if needed
    const blob =
      data.file instanceof Blob
        ? data.file
        : new Blob([data.file], { type: data.mimeType });

    formData.append("file", blob, data.filename || "file");
    formData.append("type", data.mimeType);

    // Make multipart request
    const url = `${this.httpClient.baseURL}/${this.httpClient.apiVersion}/${id}/media`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.httpClient.accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = (await response
        .json()
        .catch(() => ({
          error: { message: response.statusText, type: "HTTPError", code: response.status },
        }))) as GraphAPIErrorResponse;
      throw new GraphAPIError(errorResponse, response.status);
    }

    return response.json() as Promise<MediaUploadResponse>;
  }

  /**
   * Get media metadata including download URL
   *
   * The returned URL is only valid for 5 minutes.
   * If expired, call this method again to get a fresh URL.
   *
   * @param mediaId - Media ID from upload or webhook
   * @param phoneNumberId - Optional phone number ID (validates ownership)
   * @returns Media metadata including download URL
   *
   * @example
   * ```typescript
   * const metadata = await client.media.get(mediaId);
   * console.log(metadata.mime_type);  // "image/jpeg"
   * console.log(metadata.file_size);  // "12345"
   * console.log(metadata.url);        // Download URL (5 min expiry)
   * ```
   */
  async get(mediaId: string, phoneNumberId?: string): Promise<MediaMetadata> {
    if (!mediaId?.trim()) {
      throw new Error("Media ID is required");
    }

    const params = new URLSearchParams();
    if (phoneNumberId) {
      params.append("phone_number_id", phoneNumberId);
    }

    const query = params.toString();
    const path = query ? `/${mediaId}?${query}` : `/${mediaId}`;

    return this.httpClient.get<MediaMetadata>(path);
  }

  /**
   * Download media binary data
   *
   * This is a convenience method that:
   * 1. Gets the media URL (via `get()`)
   * 2. Downloads the binary content
   *
   * @param mediaId - Media ID from upload or webhook
   * @returns Binary data as ArrayBuffer
   *
   * @example
   * ```typescript
   * const buffer = await client.media.download(message.image.id);
   *
   * // Save to file (Node.js)
   * fs.writeFileSync("image.jpg", Buffer.from(buffer));
   *
   * // Upload to S3
   * await s3.upload({ Body: Buffer.from(buffer), Key: "image.jpg" });
   * ```
   */
  async download(mediaId: string): Promise<ArrayBuffer> {
    if (!mediaId?.trim()) {
      throw new Error("Media ID is required");
    }

    // Get the media URL
    const metadata = await this.get(mediaId);

    // Download from the URL
    const response = await fetch(metadata.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.httpClient.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorResponse = (await response
        .json()
        .catch(() => ({
          error: { message: response.statusText, type: "HTTPError", code: response.status },
        }))) as GraphAPIErrorResponse;
      throw new GraphAPIError(errorResponse, response.status);
    }

    return response.arrayBuffer();
  }

  /**
   * Delete media
   *
   * @param mediaId - Media ID to delete
   * @param phoneNumberId - Optional phone number ID (validates ownership)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.media.delete(mediaId);
   * ```
   */
  async delete(
    mediaId: string,
    phoneNumberId?: string
  ): Promise<MediaDeleteResponse> {
    if (!mediaId?.trim()) {
      throw new Error("Media ID is required");
    }

    const params = new URLSearchParams();
    if (phoneNumberId) {
      params.append("phone_number_id", phoneNumberId);
    }

    const query = params.toString();
    const path = query ? `/${mediaId}?${query}` : `/${mediaId}`;

    return this.httpClient.delete<MediaDeleteResponse>(path);
  }
}
