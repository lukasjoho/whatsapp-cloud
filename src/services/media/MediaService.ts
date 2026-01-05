import type { HttpClient } from "../../client/HttpClient";
import type { MediaMetadata } from "../../types/media";

/**
 * Media service for downloading WhatsApp media files
 *
 * This service handles downloading media files from WhatsApp servers.
 */
export class MediaService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Download media file by media ID
   *
   * Downloads media files (images, audio, video, documents) from WhatsApp servers.
   * Uses the access token from the client configuration automatically.
   *
   * According to WhatsApp API docs, you cannot download directly from the media ID endpoint.
   * The flow is:
   * 1. GET /MEDIA_ID → returns JSON metadata with a URL
   * 2. GET /MEDIA_URL → returns the actual binary data
   *
   * @param mediaId - Media ID from incoming message (e.g., message.image.id, message.audio.id)
   * @returns Promise resolving to ArrayBuffer containing the media file
   * @throws Error if download fails or media ID is invalid
   *
   * @example
   * ```typescript
   * const mediaData = await client.media.download(message.image.id);
   * // Upload to S3, save to disk, etc.
   * await s3.upload({ key: message.image.id, body: Buffer.from(mediaData) });
   * ```
   */
  async download(mediaId: string): Promise<ArrayBuffer> {
    if (!mediaId || mediaId.trim().length === 0) {
      throw new Error("Media ID is required");
    }

    // Step 1: Get the media URL and metadata
    // GET /MEDIA_ID returns JSON, not binary, so we use get() not getBinary()
    // phone_number_id query param is optional per WhatsApp docs - we omit it
    const metadata = await this.httpClient.get<MediaMetadata>(`/${mediaId}`);

    // Step 2: Download the actual binary data from the URL
    // The URL is a full URL (not a path), so we can't use httpClient.getBinary()
    // which expects a path. We need to fetch the full URL directly.
    const response = await fetch(metadata.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.httpClient.accessToken}`,
      },
    });

    if (!response.ok) {
      let errorMessage = `API Error: ${response.statusText}`;
      try {
        const error = (await response.json()) as {
          error?: { message?: string; code?: number };
        };
        errorMessage = `API Error: ${
          error.error?.message || response.statusText
        } (${error.error?.code || response.status})`;
      } catch {
        // If JSON parsing fails, use default message
      }
      throw new Error(errorMessage);
    }

    return response.arrayBuffer();
  }
}
