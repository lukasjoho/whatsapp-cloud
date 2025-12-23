import { z } from "zod";

/**
 * Schema for business profile response
 */
export const profileResponseSchema = z.object({
  about: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email().optional(),
  profile_picture_url: z.string().url().optional(),
  websites: z.array(z.string().url()).optional(),
  vertical: z.string().optional(),
});

/**
 * Schema for updating business profile
 */
export const updateProfileRequestSchema = z.object({
  about: z.string().optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  email: z.string().email().optional(),
  profilePictureUrl: z.string().url().optional(),
  websites: z.array(z.string().url()).optional(),
  vertical: z.string().optional(),
});

