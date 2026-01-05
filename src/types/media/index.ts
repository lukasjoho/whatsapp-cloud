/**
 * Media metadata response (from GET /MEDIA_ID)
 */
export type MediaMetadata = {
  messaging_product: "whatsapp";
  url: string;
  mime_type: string;
  sha256: string;
  file_size: string;
  id: string;
};

