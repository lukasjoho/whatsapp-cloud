import { z } from "zod";
import {
  profileResponseSchema,
  updateProfileRequestSchema,
} from "../../schemas/accounts/profile";

/**
 * Type for business profile response
 */
export type ProfileResponse = z.infer<typeof profileResponseSchema>;

/**
 * Type for updating business profile
 */
export type UpdateProfileRequest = z.infer<typeof updateProfileRequestSchema>;
