import type { HttpClient } from "../../../../client/HttpClient";
import type {
  MessageHistoryResponse,
  MessageHistoryListOptions,
} from "./types";

/**
 * Message History subresource for Phone Numbers
 *
 * Retrieve message delivery history and status events for a WhatsApp Business phone number.
 *
 * @example
 * ```typescript
 * // List message history
 * const history = await client.phoneNumbers.messageHistory.list();
 *
 * // Filter by specific message ID
 * const history = await client.phoneNumbers.messageHistory.list({
 *   message_id: "wamid.ABC123..."
 * });
 *
 * // With detailed event fields
 * const history = await client.phoneNumbers.messageHistory.list({
 *   fields: "id,message_id,events{delivery_status,timestamp,webhook_update_state}"
 * });
 * ```
 */
export class MessageHistoryResource {
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
  private buildQueryString(options?: MessageHistoryListOptions): string {
    if (!options) return "";

    const params = new URLSearchParams();

    if (options.message_id) params.set("message_id", options.message_id);
    if (options.fields) params.set("fields", options.fields);
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }

  /**
   * List message history for a phone number
   *
   * Retrieve paginated message history including delivery status events,
   * timestamps, and webhook update information.
   *
   * @see GET /{Phone-Number-ID}/message_history
   *
   * @param options - Query options (message_id filter, fields, pagination)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Paginated message history
   *
   * @example
   * ```typescript
   * // List all message history
   * const history = await client.phoneNumbers.messageHistory.list();
   *
   * // Filter by specific message
   * const history = await client.phoneNumbers.messageHistory.list({
   *   message_id: "wamid.HBgLMTIzNDU2Nzg5MAA="
   * });
   *
   * // With pagination
   * const history = await client.phoneNumbers.messageHistory.list({
   *   limit: 50
   * });
   *
   * // With detailed event fields
   * const history = await client.phoneNumbers.messageHistory.list({
   *   fields: "id,message_id,events{delivery_status,timestamp,error_description}"
   * });
   * ```
   */
  async list(
    options?: MessageHistoryListOptions,
    phoneNumberId?: string
  ): Promise<MessageHistoryResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = this.buildQueryString(options);
    return this.httpClient.get<MessageHistoryResponse>(
      `/${id}/message_history${query}`
    );
  }
}
