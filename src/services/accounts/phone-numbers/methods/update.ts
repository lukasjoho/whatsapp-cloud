import type { HttpClient } from "../../../../client/HttpClient";
import { updatePhoneNumberRequestSchema } from "../../../../schemas/accounts/phone-number";
import type { UpdatePhoneNumberRequest } from "../../../../types/accounts/phone-number";
import type { PhoneNumberResponse } from "../../../../types/accounts/phone-number";

/**
 * Update phone number
 */
export async function update(
  client: HttpClient,
  phoneNumberId: string,
  request: UpdatePhoneNumberRequest
): Promise<PhoneNumberResponse> {
  // Validate request with schema
  const validated = updatePhoneNumberRequestSchema.parse(request);

  // Build request body (only include provided fields)
  const body: Record<string, unknown> = {};
  if (validated.displayName !== undefined) {
    body.display_name = validated.displayName;
  }
  if (validated.about !== undefined) {
    body.about = validated.about;
  }
  if (validated.profilePictureUrl !== undefined) {
    body.profile_picture_url = validated.profilePictureUrl;
  }

  return client.patch<PhoneNumberResponse>(`/${phoneNumberId}`, body);
}

