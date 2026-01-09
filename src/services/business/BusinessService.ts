import type { HttpClient } from "../../client/HttpClient";
import { BusinessClient } from "./BusinessClient";
import { listAccounts } from "./methods/list-accounts";

import type { BusinessAccountsListResponse } from "../../types/business/account";

/**
 * Business service for managing Business Portfolios
 *
 * This service handles Business Portfolio operations like listing WABAs.
 * It supports both a globally configured businessId (in WhatsAppClient)
 * and per-request businessId overrides.
 */
export class BusinessService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Helper to create a Scoped Client (prefer override, fallback to config)
   */
  private getClient(overrideId?: string): BusinessClient {
    const id = overrideId || this.httpClient.businessId;
    if (!id) {
      throw new Error(
        "businessId (Business Portfolio ID) is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }

    // Just wrap the existing httpClient
    return new BusinessClient(this.httpClient, id);
  }

  /**
   * List WhatsApp Business Accounts (WABAs) for a Business Portfolio
   *
   * @param businessId - Optional Business Portfolio ID (overrides client config)
   * @returns List of WABAs associated with the Business Portfolio
   */
  async listAccounts(
    businessId?: string
  ): Promise<BusinessAccountsListResponse> {
    const client = this.getClient(businessId);
    return listAccounts(client);
  }
}
