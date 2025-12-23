import { z } from "zod";

/**
 * Schema for debug token response
 * Matches Graph API debug_token endpoint response structure
 */
export const debugTokenResponseSchema = z.object({
  data: z.object({
    app_id: z.string().optional(),
    type: z.string().optional(),
    application: z.string().optional(),
    data_access_expires_at: z.number().optional(),
    expires_at: z.number().optional(),
    is_valid: z.boolean().optional(),
    issued_at: z.number().optional(),
    metadata: z
      .object({
        auth_type: z.string().optional(),
        sso: z.string().optional(),
      })
      .optional(),
    scopes: z.array(z.string()).optional(),
    user_id: z.string().optional(),
  }),
});
