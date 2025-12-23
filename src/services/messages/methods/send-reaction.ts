import type { MessagesClient } from "../MessagesClient";
import { sendReactionRequestSchema } from "../../../schemas/messages/request";
import type { SendReactionRequest } from "../../../types/messages/request";
import type { MessageResponse } from "../../../types/messages/response";
import { buildMessagePayload } from "../utils/build-message-payload";
import { transformZodError } from "../../../utils/zod-error";

/**
 * Send a reaction message
 * 
 * @param messagesClient - Messages client with phone number ID baked in
 * @param request - Reaction message request (to, reaction)
 */
export async function sendReaction(
  messagesClient: MessagesClient,
  request: SendReactionRequest
): Promise<MessageResponse> {
  // Validate request with schema - throws WhatsAppValidationError if invalid
  const result = sendReactionRequestSchema.safeParse(request);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;

  // Build message payload using common structure
  const payload = buildMessagePayload(data.to, "reaction", {
    reaction: data.reaction,
  });

  // Make API request - messagesClient handles the phoneNumberId prefix automatically
  return messagesClient.post<MessageResponse>("/messages", payload);
}

