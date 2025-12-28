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
 * Incoming text message schema
 * Uses discriminated union pattern (type: "text")
 */
export const incomingTextMessageSchema = baseIncomingMessageSchema.extend({
  type: z.literal("text"),
  text: incomingTextContentSchema,
});

/**
 * Union of all incoming message types
 * For now: just text. Others (image, audio, etc.) will be added later
 */
export const incomingMessageSchema = z.discriminatedUnion("type", [
  incomingTextMessageSchema,
  // Future: incomingImageMessageSchema, incomingAudioMessageSchema, etc.
]);

