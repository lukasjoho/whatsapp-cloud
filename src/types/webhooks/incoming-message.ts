import { z } from "zod";
import {
  incomingTextMessageSchema,
  incomingAudioMessageSchema,
  incomingImageMessageSchema,
  incomingMessageSchema,
} from "../../schemas/webhooks/incoming-message";

/**
 * Type for incoming text message
 */
export type IncomingTextMessage = z.infer<typeof incomingTextMessageSchema>;

/**
 * Type for incoming audio message
 */
export type IncomingAudioMessage = z.infer<typeof incomingAudioMessageSchema>;

/**
 * Type for incoming image message
 */
export type IncomingImageMessage = z.infer<typeof incomingImageMessageSchema>;

/**
 * Union type for all incoming message types
 */
export type IncomingMessage = z.infer<typeof incomingMessageSchema>;
