import { z } from "zod";

// =============================================================================
// Client Config
// =============================================================================

const ACCESS_TOKEN_HELP_MESSAGE =
  "Get your access token from Meta for Developers: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started";

const accessTokenSchema = z
  .string({
    message: `accessToken is required. ${ACCESS_TOKEN_HELP_MESSAGE}`,
  })
  .min(1, {
    message: `accessToken cannot be empty. ${ACCESS_TOKEN_HELP_MESSAGE}`,
  })
  .trim()
  .refine((val) => val.length > 0, {
    message: `accessToken cannot be whitespace only. ${ACCESS_TOKEN_HELP_MESSAGE}`,
  });

export const clientConfigSchema = z.object({
  accessToken: accessTokenSchema,
  phoneNumberId: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: "phoneNumberId cannot be empty or whitespace only",
    }),
  businessAccountId: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: "businessAccountId cannot be empty or whitespace only",
    }),
  businessId: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: "businessId cannot be empty or whitespace only",
    }),
  apiVersion: z.string().default("v18.0").optional(),
  baseURL: z.string().url().default("https://graph.facebook.com").optional(),
  timeout: z.number().positive().optional(),
});

// =============================================================================
// Debug Token Response
// =============================================================================

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
    granular_scopes: z
      .array(
        z.object({
          scope: z.string().optional(),
          target_ids: z.array(z.string()).optional(),
        })
      )
      .optional(),
    user_id: z.string().optional(),
    profile_id: z.string().optional(),
  }),
});
