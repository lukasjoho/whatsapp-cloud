import { z } from "zod";

/**
 * Base fields present in ALL incoming messages
 */
const baseIncomingMessageSchema = z.object({
  from: z.string(), // WhatsApp ID (phone number without +)
  id: z.string(), // Message ID (wamid.*)
  timestamp: z.string(), // Unix timestamp as string
  type: z.string(), // Message type discriminator
});

/**
 * Text content in incoming text messages
 * Note: Incoming messages don't have preview_url like outgoing
 */
const incomingTextContentSchema = z.object({
  body: z.string(),
});

/**
 * Audio content in incoming audio messages
 */
const incomingAudioContentSchema = z.object({
  id: z.string(), // Media ID for downloading
  mime_type: z.string().optional(), // e.g., "audio/ogg; codecs=opus"
});

/**
 * Image content in incoming image messages
 */
const incomingImageContentSchema = z.object({
  id: z.string(), // Media ID for downloading
  mime_type: z.string().optional(), // e.g., "image/jpeg"
  caption: z.string().optional(), // Optional caption text
});

/**
 * Incoming text message schema
 * Uses discriminated union pattern (type: "text")
 */
export const incomingTextMessageSchema = baseIncomingMessageSchema.extend({
  type: z.literal("text"),
  text: incomingTextContentSchema,
});

/**
 * Incoming audio message schema
 * Uses discriminated union pattern (type: "audio")
 */
export const incomingAudioMessageSchema = baseIncomingMessageSchema.extend({
  type: z.literal("audio"),
  audio: incomingAudioContentSchema,
});

/**
 * Incoming image message schema
 * Uses discriminated union pattern (type: "image")
 */
export const incomingImageMessageSchema = baseIncomingMessageSchema.extend({
  type: z.literal("image"),
  image: incomingImageContentSchema,
});

/**
 * Union of all incoming message types
 */
export const incomingMessageSchema = z.discriminatedUnion("type", [
  incomingTextMessageSchema,
  incomingAudioMessageSchema,
  incomingImageMessageSchema,
]);
