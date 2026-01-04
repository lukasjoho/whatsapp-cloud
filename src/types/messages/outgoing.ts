import { z } from "zod";
import {
  // Input schemas (for SDK method parameters)
  sendTextInputSchema,
  sendImageInputSchema,
  sendLocationInputSchema,
  sendReactionInputSchema,
  // Full message schemas (with type discriminator)
  outgoingTextMessageSchema,
  outgoingImageMessageSchema,
  outgoingLocationMessageSchema,
  outgoingReactionMessageSchema,
  outgoingMessageSchema,
} from "../../schemas/messages/outgoing";

// =============================================================================
// Input Types (for SDK method parameters - no type field required)
// =============================================================================

/**
 * Input type for sendText() method
 */
export type SendTextInput = z.infer<typeof sendTextInputSchema>;

/**
 * Input type for sendImage() method
 */
export type SendImageInput = z.infer<typeof sendImageInputSchema>;

/**
 * Input type for sendLocation() method
 */
export type SendLocationInput = z.infer<typeof sendLocationInputSchema>;

/**
 * Input type for sendReaction() method
 */
export type SendReactionInput = z.infer<typeof sendReactionInputSchema>;

// =============================================================================
// Full Message Types (with type discriminator for union types)
// =============================================================================

/**
 * Full outgoing text message type (includes type discriminator)
 */
export type OutgoingTextMessage = z.infer<typeof outgoingTextMessageSchema>;

/**
 * Full outgoing image message type (includes type discriminator)
 */
export type OutgoingImageMessage = z.infer<typeof outgoingImageMessageSchema>;

/**
 * Full outgoing location message type (includes type discriminator)
 */
export type OutgoingLocationMessage = z.infer<
  typeof outgoingLocationMessageSchema
>;

/**
 * Full outgoing reaction message type (includes type discriminator)
 */
export type OutgoingReactionMessage = z.infer<
  typeof outgoingReactionMessageSchema
>;

/**
 * Union type for all outgoing message types
 */
export type OutgoingMessage = z.infer<typeof outgoingMessageSchema>;
