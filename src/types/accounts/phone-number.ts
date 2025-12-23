import { z } from "zod";
import { phoneNumberListResponseSchema } from "../../schemas/accounts/phone-number";

/**
 * Type for phone number list response
 */
export type PhoneNumberListResponse = z.infer<
  typeof phoneNumberListResponseSchema
>;
