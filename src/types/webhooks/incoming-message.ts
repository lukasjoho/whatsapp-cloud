import { z } from "zod";
import {
  incomingTextMessageSchema,
  incomingMessageSchema,
} from "../../schemas/webhooks/incoming-message";

/**
 * Type for incoming text message
 */
export type IncomingTextMessage = z.infer<typeof incomingTextMessageSchema>;

/**
 * Union type for all incoming message types
 */
export type IncomingMessage = z.infer<typeof incomingMessageSchema>;

