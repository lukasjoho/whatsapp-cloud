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
 * Conversation origin type in status webhook
 */
const conversationOriginSchema = z.object({
  type: z.enum([
    "authentication",
    "authentication_international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility",
  ]),
});

/**
 * Conversation object in status webhook
 * (1) Only included with sent status, and one of either delivered or read status
 * (2) Omitted entirely for v24.0+ unless webhook is for a free entry point conversation
 */
const conversationSchema = z.object({
  id: z.string(),
  expiration_timestamp: z.string().optional(), // Only for sent status
  origin: conversationOriginSchema,
});

/**
 * Pricing information in status webhook
 * Only included with sent status, and one of either delivered or read status
 */
const pricingSchema = z.object({
  billable: z.boolean(), // Deprecated but still present
  pricing_model: z.enum(["CBP", "PMP"]),
  type: z.enum(["regular", "free_customer_service", "free_entry_point"]),
  category: z.enum([
    "authentication",
    "authentication-international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility",
  ]),
});

/**
 * Error object in status webhook
 * Only included if failure to send or deliver message
 */
const statusErrorSchema = z.object({
  code: z.number(),
  title: z.string(),
  message: z.string(),
  error_data: z.object({
    details: z.string(),
  }),
  href: z.string(),
});

/**
 * Status update schema for webhook payloads
 * Represents the status of a sent message (sent, delivered, read, failed, played)
 */
export const statusSchema = z.object({
  id: z.string(), // WhatsApp message ID
  status: z.enum(["sent", "delivered", "read", "failed", "played"]),
  timestamp: z.string(), // Unix timestamp
  recipient_id: z.string(), // User phone number or group ID
  recipient_type: z.literal("group").optional(), // Only included if message sent to a group
  recipient_participant_id: z.string().optional(), // Only included if message sent to a group
  recipient_identity_key_hash: z.string().optional(), // Only included if identity change check enabled
  biz_opaque_callback_data: z.string().optional(), // Only included if message sent with biz_opaque_callback_data
  conversation: conversationSchema.optional(), // Conditional inclusion (see conversationSchema docs)
  pricing: pricingSchema.optional(), // Conditional inclusion (see pricingSchema docs)
  errors: z.array(statusErrorSchema).optional(), // Only included if failure to send or deliver message
});

/**
 * Webhook value (the actual data)
 */
const webhookValueSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: z.array(contactSchema).optional(),
  messages: z.array(incomingMessageSchema).optional(), // Incoming messages
  statuses: z.array(statusSchema).optional(), // Status updates
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
