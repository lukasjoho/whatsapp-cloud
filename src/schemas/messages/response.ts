import { z } from "zod";

/**
 * Schema for message response
 */
export const messageResponseSchema = z.object({
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
      group_id: z.string().optional(),
      message_status: z.string().optional(),
    })
  ),
});
