import type { HttpClient } from "../../../client/HttpClient";
import { updateProfileRequestSchema } from "../../../schemas/accounts/profile";
import type { UpdateProfileRequest } from "../../../types/accounts/profile";
import type { ProfileResponse } from "../../../types/accounts/profile";

/**
 * Update business profile
 */
export async function updateProfile(
  client: HttpClient,
  phoneNumberId: string,
  request: UpdateProfileRequest
): Promise<ProfileResponse> {
  // Validate request with schema
  const validated = updateProfileRequestSchema.parse(request);

  // Build request body (only include provided fields)
  const body: Record<string, unknown> = {};
  if (validated.about !== undefined) {
    body.about = validated.about;
  }
  if (validated.address !== undefined) {
    body.address = validated.address;
  }
  if (validated.description !== undefined) {
    body.description = validated.description;
  }
  if (validated.email !== undefined) {
    body.email = validated.email;
  }
  if (validated.profilePictureUrl !== undefined) {
    body.profile_picture_url = validated.profilePictureUrl;
  }
  if (validated.websites !== undefined) {
    body.websites = validated.websites;
  }
  if (validated.vertical !== undefined) {
    body.vertical = validated.vertical;
  }

  return client.patch<ProfileResponse>(`/${phoneNumberId}`, body);
}

