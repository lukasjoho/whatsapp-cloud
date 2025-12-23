import { z } from "zod";
import { businessAccountsListResponseSchema } from "../../schemas/business/account";

/**
 * Type for WhatsApp Business Accounts list response
 */
export type BusinessAccountsListResponse = z.infer<
  typeof businessAccountsListResponseSchema
>;

