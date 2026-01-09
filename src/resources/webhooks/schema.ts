import { z } from "zod";
import { messageIncomingSchema } from "../messages/schema";

// =============================================================================
// Contact Schema
// =============================================================================

export const webhookContactSchema = z.object({
  profile: z.object({
    name: z.string(),
  }),
  wa_id: z.string(),
});

// =============================================================================
// Metadata Schema
// =============================================================================

export const webhookMetadataSchema = z.object({
  display_phone_number: z.string(),
  phone_number_id: z.string(),
});

// =============================================================================
// Status Schemas
// =============================================================================

/**
 * Conversation origin type
 */
export const webhookConversationOriginSchema = z.object({
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
 * Conversation object (conditional - see docs)
 */
export const webhookConversationSchema = z.object({
  id: z.string(),
  expiration_timestamp: z.string().optional(),
  origin: webhookConversationOriginSchema,
});

/**
 * Pricing information
 */
export const webhookPricingSchema = z.object({
  billable: z.boolean(),
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
 * Status error
 */
export const webhookStatusErrorSchema = z.object({
  code: z.number(),
  title: z.string(),
  message: z.string(),
  error_data: z.object({
    details: z.string(),
  }),
  href: z.string(),
});

/**
 * Message status update
 */
export const webhookStatusSchema = z.object({
  id: z.string(),
  status: z.enum(["sent", "delivered", "read", "failed", "played"]),
  timestamp: z.string(),
  recipient_id: z.string(),
  recipient_type: z.literal("group").optional(),
  recipient_participant_id: z.string().optional(),
  recipient_identity_key_hash: z.string().optional(),
  biz_opaque_callback_data: z.string().optional(),
  conversation: webhookConversationSchema.optional(),
  pricing: webhookPricingSchema.optional(),
  errors: z.array(webhookStatusErrorSchema).optional(),
});

// =============================================================================
// Webhook Payload Schemas
// =============================================================================

/**
 * Webhook value (the actual data)
 */
export const webhookValueSchema = z.object({
  messaging_product: z.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: z.array(webhookContactSchema).optional(),
  messages: z.array(messageIncomingSchema).optional(),
  statuses: z.array(webhookStatusSchema).optional(),
});

/**
 * Webhook change entry
 */
export const webhookChangeSchema = z.object({
  value: webhookValueSchema,
  field: z.literal("messages"),
});

/**
 * Webhook entry
 */
export const webhookEntrySchema = z.object({
  id: z.string(), // WABA ID
  changes: z.array(webhookChangeSchema),
});

/**
 * Full webhook payload from Meta
 */
export const webhookPayloadSchema = z.object({
  object: z.literal("whatsapp_business_account"),
  entry: z.array(webhookEntrySchema),
});

// =============================================================================
// Verification Query Schema
// =============================================================================

/**
 * Query parameters for webhook verification GET request
 */
export const webhookVerifyQuerySchema = z.object({
  "hub.mode": z.string().optional(),
  "hub.verify_token": z.string().optional(),
  "hub.challenge": z.string().optional(),
});
