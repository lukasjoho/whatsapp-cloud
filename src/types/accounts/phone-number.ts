import { z } from "zod";
import {
  phoneNumberResponseSchema,
  phoneNumberListResponseSchema,
  updatePhoneNumberRequestSchema,
} from "../../schemas/accounts/phone-number";

/**
 * Type for phone number response
 */
export type PhoneNumberResponse = z.infer<typeof phoneNumberResponseSchema>;

/**
 * Type for phone number list response
 */
export type PhoneNumberListResponse = z.infer<
  typeof phoneNumberListResponseSchema
>;

/**
 * Type for updating phone number
 */
export type UpdatePhoneNumberRequest = z.infer<
  typeof updatePhoneNumberRequestSchema
>;
