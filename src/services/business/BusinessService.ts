import type { HttpClient } from "../../client/HttpClient";
import { BusinessClient } from "./BusinessClient";
import { listAccounts } from "./methods/list-accounts";
import { WhatsAppValidationError } from "../../errors";
import type { BusinessAccountsListResponse } from "../../types/business/account";

/**
 * Business service for managing Business Portfolios
 *
 * The service validates that businessId (Business Portfolio ID) is set at the client level
 * and creates a BusinessClient instance.
 *
 * Note: businessId in the client config represents the Business Portfolio ID.
 * The Business Portfolio ID is used in endpoints like GET /<Business-ID>/whatsapp_business_accounts.
 *
 * BusinessClient treats businessId as a "client" for the business namespace - different
 * businessIds represent different Business Portfolio endpoints.
 */
export class BusinessService {
  private readonly businessClient: BusinessClient;

  constructor(httpClient: HttpClient) {
    // Validate that businessId (Business Portfolio ID) is set at client level
    if (!httpClient.businessId) {
      throw new WhatsAppValidationError(
        "businessId (Business Portfolio ID) is required for BusinessService. Provide it in WhatsAppClient config.",
        "businessId"
      );
    }

    // Create business client with Business Portfolio ID baked in
    this.businessClient = new BusinessClient(
      httpClient,
      httpClient.businessId
    );
  }

  /**
   * List WhatsApp Business Accounts (WABAs) for a Business Portfolio
   *
   * @returns List of WABAs associated with the Business Portfolio
   */
  async listAccounts(): Promise<BusinessAccountsListResponse> {
    return listAccounts(this.businessClient);
  }
}

