import type { HttpClient } from "../../../../client/HttpClient";
import type {
  ListBlockedUsersResponse,
  BlockUsersResponse,
  UnblockUsersResponse,
  ListBlockedUsersOptions,
} from "./types";

/**
 * Block Users subresource for Phone Numbers
 *
 * Manage blocked users for a WhatsApp Business phone number.
 *
 * @example
 * ```typescript
 * // List blocked users
 * const blocked = await client.phoneNumbers.block.list("phone-number-id");
 *
 * // Block users
 * await client.phoneNumbers.block.add("phone-number-id", ["+1234567890"]);
 *
 * // Unblock users
 * await client.phoneNumbers.block.remove("phone-number-id", ["+1234567890"]);
 * ```
 */
export class BlockResource {
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
  private buildQueryString(options?: ListBlockedUsersOptions): string {
    if (!options) return "";

    const params = new URLSearchParams();

    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }

  /**
   * List blocked users for a phone number
   *
   * @see GET /{Phone-Number-ID}/block_users
   *
   * @param options - Pagination options
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns List of blocked users
   *
   * @example
   * ```typescript
   * const blocked = await client.phoneNumbers.block.list();
   *
   * // With pagination
   * const blocked = await client.phoneNumbers.block.list({ limit: 10 });
   * ```
   */
  async list(
    options?: ListBlockedUsersOptions,
    phoneNumberId?: string
  ): Promise<ListBlockedUsersResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = this.buildQueryString(options);
    return this.httpClient.get<ListBlockedUsersResponse>(
      `/${id}/block_users${query}`
    );
  }

  /**
   * Block one or more users
   *
   * @see POST /{Phone-Number-ID}/block_users
   *
   * @param users - Array of phone numbers to block (with country code)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Block operation result
   *
   * @example
   * ```typescript
   * // Block a single user
   * await client.phoneNumbers.block.add(["+1234567890"]);
   *
   * // Block multiple users
   * await client.phoneNumbers.block.add(["+1234567890", "+0987654321"]);
   * ```
   */
  async add(
    users: string[],
    phoneNumberId?: string
  ): Promise<BlockUsersResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<BlockUsersResponse>(`/${id}/block_users`, {
      messaging_product: "whatsapp",
      block_users: users.map((user) => ({ user })),
    });
  }

  /**
   * Unblock one or more users
   *
   * @see DELETE /{Phone-Number-ID}/block_users
   *
   * @param users - Array of phone numbers to unblock (with country code)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Unblock operation result
   *
   * @example
   * ```typescript
   * // Unblock a single user
   * await client.phoneNumbers.block.remove(["+1234567890"]);
   *
   * // Unblock multiple users
   * await client.phoneNumbers.block.remove(["+1234567890", "+0987654321"]);
   * ```
   */
  async remove(
    users: string[],
    phoneNumberId?: string
  ): Promise<UnblockUsersResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.deleteWithBody<UnblockUsersResponse>(
      `/${id}/block_users`,
      {
        messaging_product: "whatsapp",
        block_users: users.map((user) => ({ user })),
      }
    );
  }
}
