import type { AccountsClient } from "../AccountsClient";
import type { PhoneNumberListResponse } from "../../../types/accounts/phone-number";

/**
 * List phone numbers for a WhatsApp Business Account
 *
 * @param accountsClient - Accounts client with WABA ID baked in
 * @returns List of phone numbers associated with the WABA
 */
export async function listPhoneNumbers(
  accountsClient: AccountsClient
): Promise<PhoneNumberListResponse> {
  // Make API request - accountsClient handles the WABA ID prefix automatically
  return accountsClient.get<PhoneNumberListResponse>("/phone_numbers");
}

