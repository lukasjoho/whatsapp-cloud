import { z } from "zod";
import {
  // Content schemas
  messageTextContentSchema,
  messageImageContentSchema,
  messageLocationContentSchema,
  messageReactionContentSchema,
  // Send input schemas
  messageSendTextSchema,
  messageSendImageSchema,
  messageSendLocationSchema,
  messageSendReactionSchema,
  // Full message schemas
  messageTextSchema,
  messageImageSchema,
  messageLocationSchema,
  messageReactionSchema,
  messageOutgoingSchema,
  // Response schema
  messageSendResponseSchema,
  // Incoming schemas
  messageIncomingTextSchema,
  messageIncomingImageSchema,
  messageIncomingAudioSchema,
  messageIncomingSchema,
} from "./schema";

// =============================================================================
// Content Types
// =============================================================================

export type MessageTextContent = z.infer<typeof messageTextContentSchema>;
export type MessageImageContent = z.infer<typeof messageImageContentSchema>;
export type MessageLocationContent = z.infer<typeof messageLocationContentSchema>;
export type MessageReactionContent = z.infer<typeof messageReactionContentSchema>;

// =============================================================================
// Send Input Types
// =============================================================================

/**
 * Input for sending a text message
 */
export type MessageSendText = z.infer<typeof messageSendTextSchema>;

/**
 * Input for sending an image message
 */
export type MessageSendImage = z.infer<typeof messageSendImageSchema>;

/**
 * Input for sending a location message
 */
export type MessageSendLocation = z.infer<typeof messageSendLocationSchema>;

/**
 * Input for sending a reaction
 */
export type MessageSendReaction = z.infer<typeof messageSendReactionSchema>;

// =============================================================================
// Full Message Types (with type discriminator)
// =============================================================================

export type MessageText = z.infer<typeof messageTextSchema>;
export type MessageImage = z.infer<typeof messageImageSchema>;
export type MessageLocation = z.infer<typeof messageLocationSchema>;
export type MessageReaction = z.infer<typeof messageReactionSchema>;

/**
 * Union of all outgoing message types
 */
export type MessageOutgoing = z.infer<typeof messageOutgoingSchema>;

// =============================================================================
// Response Types
// =============================================================================

/**
 * Response from sending a message
 */
export type MessageSendResponse = z.infer<typeof messageSendResponseSchema>;

// =============================================================================
// Incoming Message Types
// =============================================================================

export type MessageIncomingText = z.infer<typeof messageIncomingTextSchema>;
export type MessageIncomingImage = z.infer<typeof messageIncomingImageSchema>;
export type MessageIncomingAudio = z.infer<typeof messageIncomingAudioSchema>;

/**
 * Union of all incoming message types
 */
export type MessageIncoming = z.infer<typeof messageIncomingSchema>;
