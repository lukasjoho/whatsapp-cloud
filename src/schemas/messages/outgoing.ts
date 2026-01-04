import { z } from "zod";

/**
 * Base schema for all outgoing messages
 * phoneNumberId is handled at the client level, not in the message object
 */
const baseOutgoingMessageSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
});

// =============================================================================
// Content Schemas (reusable content definitions)
// =============================================================================

/**
 * Schema for text content in text messages
 */
const textContentSchema = z.object({
  body: z.string().min(1).max(4096),
  preview_url: z.boolean().optional(),
});

/**
 * Schema for image content in image messages
 */
const imageContentSchema = z
  .object({
    id: z.string().optional(),
    link: z.string().url().optional(),
    caption: z.string().max(1024).optional(),
  })
  .refine((data) => data.link || data.id, "Either link or id must be provided");

/**
 * Schema for location content in location messages
 */
const locationContentSchema = z.object({
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
  name: z.string().optional(),
  address: z.string().optional(),
});

/**
 * Schema for reaction content in reaction messages
 */
const reactionContentSchema = z.object({
  message_id: z.string().min(1),
  emoji: z.string().min(1).max(1),
});

// =============================================================================
// Input Schemas (for SDK method parameters - no type field required)
// =============================================================================

/**
 * Input schema for sendText() method
 */
export const sendTextInputSchema = baseOutgoingMessageSchema.extend({
  text: textContentSchema,
});

/**
 * Input schema for sendImage() method
 */
export const sendImageInputSchema = baseOutgoingMessageSchema.extend({
  image: imageContentSchema,
});

/**
 * Input schema for sendLocation() method
 */
export const sendLocationInputSchema = baseOutgoingMessageSchema.extend({
  location: locationContentSchema,
});

/**
 * Input schema for sendReaction() method
 */
export const sendReactionInputSchema = baseOutgoingMessageSchema.extend({
  reaction: reactionContentSchema,
});

// =============================================================================
// Full Message Schemas (with type discriminator for union types)
// =============================================================================

/**
 * Full outgoing text message schema (includes type discriminator)
 */
export const outgoingTextMessageSchema = sendTextInputSchema.extend({
  type: z.literal("text"),
});

/**
 * Full outgoing image message schema (includes type discriminator)
 */
export const outgoingImageMessageSchema = sendImageInputSchema.extend({
  type: z.literal("image"),
});

/**
 * Full outgoing location message schema (includes type discriminator)
 */
export const outgoingLocationMessageSchema = sendLocationInputSchema.extend({
  type: z.literal("location"),
});

/**
 * Full outgoing reaction message schema (includes type discriminator)
 */
export const outgoingReactionMessageSchema = sendReactionInputSchema.extend({
  type: z.literal("reaction"),
});

/**
 * Union of all outgoing message types
 * Discriminated by the 'type' field
 */
export const outgoingMessageSchema = z.discriminatedUnion("type", [
  outgoingTextMessageSchema,
  outgoingImageMessageSchema,
  outgoingLocationMessageSchema,
  outgoingReactionMessageSchema,
]);
