import type { HttpClient } from "../../client/HttpClient";
import { AccountsClient } from "./AccountsClient";
import { listPhoneNumbers } from "./methods/list-phone-numbers";
import { WhatsAppValidationError } from "../../errors";
import type { PhoneNumberListResponse } from "../../types/accounts/phone-number";

/**
 * Accounts service for managing WhatsApp Business Accounts
 *
 * The service validates that businessAccountId (WABA ID - WhatsApp Business Account ID) is set
 * at the client level and creates an AccountsClient instance.
 *
 * Note: businessAccountId in the client config represents the WABA ID, not the Business Portfolio ID.
 * The WABA ID is used in endpoints like GET /<WABA_ID>/phone_numbers.
 *
 * AccountsClient treats wabaId as a "client" for the accounts namespace - different
 * wabaIds represent different WhatsApp Business Account endpoints.
 */
export class AccountsService {
  private readonly accountsClient: AccountsClient;

  constructor(httpClient: HttpClient) {
    // Validate that businessAccountId (WABA ID) is set at client level
    // This is the WhatsApp Business Account ID, not the Business Portfolio ID
    if (!httpClient.businessAccountId) {
      throw new WhatsAppValidationError(
        "businessAccountId (WABA ID - WhatsApp Business Account ID) is required for AccountsService. Provide it in WhatsAppClient config.",
        "businessAccountId"
      );
    }

    // Create accounts client with WABA ID baked in
    this.accountsClient = new AccountsClient(
      httpClient,
      httpClient.businessAccountId
    );
  }

  /**
   * List phone numbers for a WhatsApp Business Account
   *
   * @returns List of phone numbers associated with the WABA
   */
  async listPhoneNumbers(): Promise<PhoneNumberListResponse> {
    return listPhoneNumbers(this.accountsClient);
  }
}
