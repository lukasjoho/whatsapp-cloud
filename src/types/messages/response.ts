import { z } from "zod";
import { messageResponseSchema } from "../../schemas/messages/response";

/**
 * Type for message response
 */
export type MessageResponse = z.infer<typeof messageResponseSchema>;
