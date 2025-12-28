import { z } from "zod";
import { incomingMessageSchema } from "./incoming-message";

/**
 * Contact information in webhook
 */
const contactSchema = z.object({
  profile: z.object({
    name: z.string(),
  }),
  wa_id: z.string(),
});

/**
 * Metadata in webhook value
 */
const webhookMetadataSchema = z.object({
  display_phone_number: z.string(),
  phone_number_id: z.string(),
});

/**
 * Webhook value (the actual data)
 */
const webhookValueSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: z.array(contactSchema).optional(),
  messages: z.array(incomingMessageSchema).optional(), // Incoming messages
  statuses: z.array(z.any()).optional(), // Status updates (for later)
});

/**
 * Webhook change entry
 */
const webhookChangeSchema = z.object({
  value: webhookValueSchema,
  field: z.literal("messages"), // For now: only messages field
});

/**
 * Webhook entry
 */
const webhookEntrySchema = z.object({
  id: z.string(), // WABA ID
  changes: z.array(webhookChangeSchema),
});

/**
 * Full webhook payload schema
 */
export const webhookPayloadSchema = z.object({
  object: z.literal("whatsapp_business_account"),
  entry: z.array(webhookEntrySchema),
});

