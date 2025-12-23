import type { HttpClient } from "../../../../client/HttpClient";
import type { PhoneNumberResponse } from "../../../../types/accounts/phone-number";

/**
 * Get phone number details
 */
export async function get(
  client: HttpClient,
  phoneNumberId: string
): Promise<PhoneNumberResponse> {
  return client.get<PhoneNumberResponse>(`/${phoneNumberId}`);
}

