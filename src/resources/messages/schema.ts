import { z } from "zod";

// =============================================================================
// Phone Number Schema
// =============================================================================

/**
 * E.164 phone number format
 */
export const phoneNumberSchema = z
  .string()
  .regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format (use E.164: +1234567890)");

// =============================================================================
// Content Schemas (reusable content definitions)
// =============================================================================

/**
 * Text content for text messages
 */
export const messageTextContentSchema = z.object({
  body: z.string().min(1).max(4096),
  preview_url: z.boolean().optional(),
});

/**
 * Image content for image messages
 */
export const messageImageContentSchema = z
  .object({
    id: z.string().optional(),
    link: z.string().url().optional(),
    caption: z.string().max(1024).optional(),
  })
  .refine((data) => data.link || data.id, "Either link or id must be provided");

/**
 * Location content for location messages
 */
export const messageLocationContentSchema = z.object({
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
  name: z.string().optional(),
  address: z.string().optional(),
});

/**
 * Reaction content for reaction messages
 */
export const messageReactionContentSchema = z.object({
  message_id: z.string().min(1),
  emoji: z.string().min(1).max(1),
});

// =============================================================================
// Send Input Schemas
// =============================================================================

/**
 * Input for sending a text message
 */
export const messageSendTextSchema = z.object({
  to: phoneNumberSchema,
  text: messageTextContentSchema,
});

/**
 * Input for sending an image message
 */
export const messageSendImageSchema = z.object({
  to: phoneNumberSchema,
  image: messageImageContentSchema,
});

/**
 * Input for sending a location message
 */
export const messageSendLocationSchema = z.object({
  to: phoneNumberSchema,
  location: messageLocationContentSchema,
});

/**
 * Input for sending a reaction
 */
export const messageSendReactionSchema = z.object({
  to: phoneNumberSchema,
  reaction: messageReactionContentSchema,
});

// =============================================================================
// Full Message Schemas (with type discriminator)
// =============================================================================

export const messageTextSchema = messageSendTextSchema.extend({
  type: z.literal("text"),
});

export const messageImageSchema = messageSendImageSchema.extend({
  type: z.literal("image"),
});

export const messageLocationSchema = messageSendLocationSchema.extend({
  type: z.literal("location"),
});

export const messageReactionSchema = messageSendReactionSchema.extend({
  type: z.literal("reaction"),
});

/**
 * Union of all outgoing message types (discriminated by 'type')
 */
export const messageOutgoingSchema = z.discriminatedUnion("type", [
  messageTextSchema,
  messageImageSchema,
  messageLocationSchema,
  messageReactionSchema,
]);

// =============================================================================
// Response Schema
// =============================================================================

/**
 * Response from sending a message
 */
export const messageSendResponseSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  contacts: z.array(
    z.object({
      input: z.string(),
      wa_id: z.string(),
    })
  ),
  messages: z.array(
    z.object({
      id: z.string(),
      message_status: z.string().optional(),
    })
  ),
});

// =============================================================================
// Incoming Message Schemas
// =============================================================================

/**
 * Base fields present in all incoming messages
 */
const incomingMessageBaseSchema = z.object({
  from: z.string(),
  id: z.string(),
  timestamp: z.string(),
});

/**
 * Incoming text message
 */
export const messageIncomingTextSchema = incomingMessageBaseSchema.extend({
  type: z.literal("text"),
  text: z.object({
    body: z.string(),
  }),
});

/**
 * Incoming image message
 */
export const messageIncomingImageSchema = incomingMessageBaseSchema.extend({
  type: z.literal("image"),
  image: z.object({
    id: z.string(),
    mime_type: z.string().optional(),
    caption: z.string().optional(),
  }),
});

/**
 * Incoming audio message
 */
export const messageIncomingAudioSchema = incomingMessageBaseSchema.extend({
  type: z.literal("audio"),
  audio: z.object({
    id: z.string(),
    mime_type: z.string().optional(),
  }),
});

/**
 * Union of all incoming message types
 */
export const messageIncomingSchema = z.discriminatedUnion("type", [
  messageIncomingTextSchema,
  messageIncomingImageSchema,
  messageIncomingAudioSchema,
]);
