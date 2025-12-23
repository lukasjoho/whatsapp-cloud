import type { HttpClient } from "../../client/HttpClient";
import { AccountsClient } from "./AccountsClient";
import { listPhoneNumbers } from "./methods/list-phone-numbers";
import { WhatsAppValidationError } from "../../errors";
import type { PhoneNumberListResponse } from "../../types/accounts/phone-number";

/**
 * Accounts service for managing WhatsApp Business Accounts
 *
 * This service handles WABA operations like listing phone numbers.
 * It supports both a globally configured businessAccountId (in WhatsAppClient)
 * and per-request businessAccountId overrides.
 */
export class AccountsService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Helper to create a Scoped Client (prefer override, fallback to config)
   */
  private getClient(overrideId?: string): AccountsClient {
    const id = overrideId || this.httpClient.businessAccountId;
    if (!id) {
      throw new WhatsAppValidationError(
        "businessAccountId (WABA ID) is required. Provide it in WhatsAppClient config or as a parameter.",
        "businessAccountId"
      );
    }

    // Just wrap the existing httpClient
    return new AccountsClient(this.httpClient, id);
  }

  /**
   * List phone numbers for a WhatsApp Business Account
   *
   * @param businessAccountId - Optional WABA ID (overrides client config)
   * @returns List of phone numbers associated with the WABA
   */
  async listPhoneNumbers(
    businessAccountId?: string
  ): Promise<PhoneNumberListResponse> {
    const client = this.getClient(businessAccountId);
    return listPhoneNumbers(client);
  }
}
