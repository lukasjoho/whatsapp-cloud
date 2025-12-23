import type { HttpClient } from "../../../client/HttpClient";
import type { ProfileResponse } from "../../../types/accounts/profile";

/**
 * Get business profile
 */
export async function getProfile(
  client: HttpClient,
  phoneNumberId?: string
): Promise<ProfileResponse> {
  const targetPhoneNumberId = phoneNumberId || client.phoneNumberId;
  if (!targetPhoneNumberId) {
    throw new Error("phoneNumberId is required");
  }

  return client.get<ProfileResponse>(`/${targetPhoneNumberId}`);
}
