import { z } from "zod";
import {
  sendTextRequestSchema,
  sendImageRequestSchema,
  sendLocationRequestSchema,
  sendReactionRequestSchema,
} from "../../schemas/messages/request";

/**
 * Type for sending a text message
 */
export type SendTextRequest = z.infer<typeof sendTextRequestSchema>;

/**
 * Type for sending an image message
 */
export type SendImageRequest = z.infer<typeof sendImageRequestSchema>;

/**
 * Type for sending a location message
 */
export type SendLocationRequest = z.infer<typeof sendLocationRequestSchema>;

/**
 * Type for sending a reaction message
 */
export type SendReactionRequest = z.infer<typeof sendReactionRequestSchema>;
