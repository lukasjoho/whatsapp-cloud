import { z } from "zod";

/**
 * Base schema for all message requests
 * phoneNumberId is handled at the client level, not in the request object
 */
const baseMessageRequestSchema = z.object({
  to: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
});

/**
 * Schema for image object in image messages
 * Matches WhatsApp API structure
 */
const imageSchema = z
  .object({
    id: z.string().optional(),
    link: z.string().url().optional(),
    caption: z.string().max(1024).optional(),
  })
  .refine((data) => data.link || data.id, "Either link or id must be provided");

/**
 * Schema for sending an image message
 * Matches the structure expected by WhatsApp API (minus messaging_product, recipient_type, type, and phoneNumberId)
 */
export const sendImageRequestSchema = baseMessageRequestSchema.extend({
  image: imageSchema,
});

/**
 * Schema for text object in text messages
 * Matches WhatsApp API structure
 */
const textSchema = z.object({
  body: z.string().min(1).max(4096),
  preview_url: z.boolean().optional(),
});

/**
 * Schema for sending a text message
 * Matches the structure expected by WhatsApp API (minus messaging_product, recipient_type, type, and phoneNumberId)
 */
export const sendTextRequestSchema = baseMessageRequestSchema.extend({
  text: textSchema,
});

/**
 * Schema for location object in location messages
 * Matches WhatsApp API structure
 */
const locationSchema = z.object({
  longitude: z.number().min(-180).max(180),
  latitude: z.number().min(-90).max(90),
  name: z.string().optional(),
  address: z.string().optional(),
});

/**
 * Schema for sending a location message
 * Matches the structure expected by WhatsApp API (minus messaging_product, recipient_type, type, and phoneNumberId)
 */
export const sendLocationRequestSchema = baseMessageRequestSchema.extend({
  location: locationSchema,
});

/**
 * Schema for reaction object in reaction messages
 * Matches WhatsApp API structure
 */
const reactionSchema = z.object({
  message_id: z.string().min(1),
  emoji: z.string().min(1).max(1), // Single emoji character
});

/**
 * Schema for sending a reaction message
 * Matches the structure expected by WhatsApp API (minus messaging_product, recipient_type, type, and phoneNumberId)
 */
export const sendReactionRequestSchema = baseMessageRequestSchema.extend({
  reaction: reactionSchema,
});
