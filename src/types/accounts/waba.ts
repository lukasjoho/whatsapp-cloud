import { z } from "zod";
import {
  wabaResponseSchema,
  wabaListResponseSchema,
  createWabaRequestSchema,
  wabaCreationResponseSchema,
} from "../../schemas/accounts/waba";

/**
 * Type for WABA (WhatsApp Business Account) response
 */
export type WabaResponse = z.infer<typeof wabaResponseSchema>;

/**
 * Type for WABA list response
 */
export type WabaListResponse = z.infer<typeof wabaListResponseSchema>;

/**
 * Type for creating a WABA
 */
export type CreateWabaRequest = z.infer<typeof createWabaRequestSchema>;

/**
 * Type for WABA creation response
 */
export type WabaCreationResponse = z.infer<typeof wabaCreationResponseSchema>;

