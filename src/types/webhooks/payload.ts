import { z } from "zod";
import { webhookPayloadSchema } from "../../schemas/webhooks/payload";

/**
 * Type for webhook payload
 */
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;

