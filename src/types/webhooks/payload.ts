import { z } from "zod";
import { webhookPayloadSchema, statusSchema } from "../../schemas/webhooks/payload";

/**
 * Type for webhook payload
 */
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;

/**
 * Type for status update in webhook payload
 */
export type Status = z.infer<typeof statusSchema>;

