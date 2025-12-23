import type { HttpClient } from "../../client/HttpClient";
import { AccountsClient } from "./AccountsClient";
import { listPhoneNumbers } from "./methods/list-phone-numbers";
import { WhatsAppValidationError } from "../../errors";
import type { PhoneNumberListResponse } from "../../types/accounts/phone-number";

/**
 * Accounts service for managing WhatsApp Business Accounts
 *
 * The service validates that businessAccountId (WABA ID) is set at the client level and creates
 * an AccountsClient instance. AccountsClient treats wabaId as a "client" for
 * the accounts namespace - different wabaIds represent different endpoints.
 */
export class AccountsService {
  private readonly accountsClient: AccountsClient;

  constructor(httpClient: HttpClient) {
    // Validate that businessAccountId (WABA ID) is set at client level
    if (!httpClient.businessAccountId) {
      throw new WhatsAppValidationError(
        "businessAccountId (WABA ID) is required for AccountsService. Provide it in WhatsAppClient config.",
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
