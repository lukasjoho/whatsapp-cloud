import type { HttpClient } from "../../../../client/HttpClient";
import type { PhoneNumberListResponse } from "../../../../types/accounts/phone-number";

/**
 * List phone numbers for a business account
 */
export async function list(
  client: HttpClient,
  businessAccountId?: string
): Promise<PhoneNumberListResponse> {
  const targetBusinessAccountId =
    businessAccountId || client.businessAccountId;
  if (!targetBusinessAccountId) {
    throw new Error("businessAccountId is required");
  }

  return client.get<PhoneNumberListResponse>(
    `/${targetBusinessAccountId}/phone_numbers`
  );
}

