import type { BusinessClient } from "../BusinessClient";
import type { BusinessAccountsListResponse } from "../../../types/business/account";

/**
 * List WhatsApp Business Accounts (WABAs) for a Business Portfolio
 *
 * @param businessClient - Business client with Business Portfolio ID baked in
 * @returns List of WABAs associated with the Business Portfolio
 */
export async function listAccounts(
  businessClient: BusinessClient
): Promise<BusinessAccountsListResponse> {
  // Make API request - businessClient handles the Business Portfolio ID prefix automatically
  return businessClient.get<BusinessAccountsListResponse>(
    "/whatsapp_business_accounts"
  );
}

