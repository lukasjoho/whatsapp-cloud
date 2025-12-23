import { z } from "zod";

/**
 * Helper message for access token errors
 */
const ACCESS_TOKEN_HELP_MESSAGE =
  "Get your access token from Meta for Developers: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started";

/**
 * Schema for access token with validation and helpful error messages
 */
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

/**
 * Client configuration schema
 */
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
  apiVersion: z.string().default("v18.0"),
  baseURL: z.string().url().default("https://graph.facebook.com"),
  timeout: z.number().positive().optional(),
});
