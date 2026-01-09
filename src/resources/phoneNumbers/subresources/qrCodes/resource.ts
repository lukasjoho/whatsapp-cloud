import type { HttpClient } from "../../../../client/HttpClient";
import type {
  QrCodeListResponse,
  QrCodeResponse,
  QrCodeMutationResponse,
  QrCodeDeleteResponse,
  CreateQrCodeRequest,
  UpdateQrCodeRequest,
  QrCodeListOptions,
} from "./types";

/**
 * QR Codes subresource for Phone Numbers
 *
 * Create and manage QR codes for WhatsApp Business conversations.
 * When scanned, QR codes open WhatsApp with a pre-filled message.
 *
 * @example
 * ```typescript
 * // List all QR codes
 * const codes = await client.phoneNumbers.qrCodes.list();
 *
 * // Create a QR code
 * const qr = await client.phoneNumbers.qrCodes.create({
 *   prefilled_message: "Hello! I'd like to learn more.",
 *   generate_qr_image: "PNG"
 * });
 *
 * // Get a specific QR code
 * const code = await client.phoneNumbers.qrCodes.get(undefined, "QRCODE123456");
 *
 * // Update a QR code
 * await client.phoneNumbers.qrCodes.update({
 *   code: "QRCODE123456",
 *   prefilled_message: "New message!"
 * });
 *
 * // Delete a QR code
 * await client.phoneNumbers.qrCodes.delete(undefined, "QRCODE123456");
 * ```
 */
export class QrCodesResource {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get the phone number ID (from parameter or config)
   */
  private getPhoneNumberId(overrideId?: string): string {
    const id = overrideId ?? this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }

  /**
   * Build query string for list options
   */
  private buildQueryString(options?: QrCodeListOptions): string {
    if (!options) return "";

    const params = new URLSearchParams();

    if (options.fields) params.set("fields", options.fields);
    if (options.code) params.set("code", options.code);
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }

  /**
   * List all QR codes for a phone number
   *
   * Returns QR codes sorted by creation time (newest first).
   *
   * @see GET /{Phone-Number-ID}/message_qrdls
   *
   * @param options - Query options (fields, code filter, pagination)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns List of QR codes
   *
   * @example
   * ```typescript
   * // List all QR codes
   * const codes = await client.phoneNumbers.qrCodes.list();
   *
   * // With image URLs
   * const codes = await client.phoneNumbers.qrCodes.list({
   *   fields: "code,prefilled_message,qr_image_url.format(PNG)"
   * });
   *
   * // Filter by specific code
   * const codes = await client.phoneNumbers.qrCodes.list({
   *   code: "QRCODE123456"
   * });
   * ```
   */
  async list(
    options?: QrCodeListOptions,
    phoneNumberId?: string
  ): Promise<QrCodeListResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = this.buildQueryString(options);
    return this.httpClient.get<QrCodeListResponse>(
      `/${id}/message_qrdls${query}`
    );
  }

  /**
   * Get a specific QR code by ID
   *
   * @see GET /{Phone-Number-ID}/message_qrdls/{QR-Code-ID}
   *
   * @param qrCodeId - The 14-character QR code identifier
   * @param fields - Optional fields to include (e.g., "code,prefilled_message,qr_image_url.format(SVG)")
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns QR code details (wrapped in data array)
   *
   * @example
   * ```typescript
   * const qr = await client.phoneNumbers.qrCodes.get("QRCODE123456");
   * console.log(qr.data[0].deep_link_url);
   *
   * // With QR image
   * const qr = await client.phoneNumbers.qrCodes.get(
   *   "QRCODE123456",
   *   "code,prefilled_message,qr_image_url.format(PNG)"
   * );
   * ```
   */
  async get(
    qrCodeId: string,
    fields?: string,
    phoneNumberId?: string
  ): Promise<QrCodeResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get<QrCodeResponse>(
      `/${id}/message_qrdls/${qrCodeId}${query}`
    );
  }

  /**
   * Create a new QR code
   *
   * Creates a QR code with a pre-filled message. When scanned,
   * it opens WhatsApp with the message ready to send.
   *
   * @see POST /{Phone-Number-ID}/message_qrdls
   *
   * @param data - QR code creation data
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Created QR code details
   *
   * @example
   * ```typescript
   * // Create with PNG image
   * const qr = await client.phoneNumbers.qrCodes.create({
   *   prefilled_message: "Hi! I saw your ad and want to learn more.",
   *   generate_qr_image: "PNG"
   * });
   * console.log(qr.code);           // "QRCODE123456"
   * console.log(qr.deep_link_url);  // "https://wa.me/..."
   * console.log(qr.qr_image_url);   // "https://..."
   *
   * // Create without image (use deep_link_url to generate your own)
   * const qr = await client.phoneNumbers.qrCodes.create({
   *   prefilled_message: "Hello!"
   * });
   * ```
   */
  async create(
    data: CreateQrCodeRequest,
    phoneNumberId?: string
  ): Promise<QrCodeMutationResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<QrCodeMutationResponse>(
      `/${id}/message_qrdls`,
      data
    );
  }

  /**
   * Update an existing QR code
   *
   * Updates the pre-filled message for an existing QR code.
   * The QR code identifier and deep link URL remain the same.
   *
   * @see POST /{Phone-Number-ID}/message_qrdls
   *
   * @param data - QR code update data (must include code)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Updated QR code details
   *
   * @example
   * ```typescript
   * const qr = await client.phoneNumbers.qrCodes.update({
   *   code: "QRCODE123456",
   *   prefilled_message: "New promotional message!"
   * });
   * ```
   */
  async update(
    data: UpdateQrCodeRequest,
    phoneNumberId?: string
  ): Promise<QrCodeMutationResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<QrCodeMutationResponse>(
      `/${id}/message_qrdls`,
      data
    );
  }

  /**
   * Delete a QR code
   *
   * Permanently deletes a QR code. Once deleted, the QR code and
   * deep link become invalid. This cannot be undone.
   *
   * @see DELETE /{Phone-Number-ID}/message_qrdls/{QR-Code-ID}
   *
   * @param qrCodeId - The 14-character QR code identifier
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.phoneNumbers.qrCodes.delete("QRCODE123456");
   * ```
   */
  async delete(
    qrCodeId: string,
    phoneNumberId?: string
  ): Promise<QrCodeDeleteResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.delete<QrCodeDeleteResponse>(
      `/${id}/message_qrdls/${qrCodeId}`
    );
  }
}
