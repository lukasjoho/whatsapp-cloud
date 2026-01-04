import type { MessagesClient } from "../MessagesClient";
import { sendReactionInputSchema } from "../../../schemas/messages/outgoing";
import type { SendReactionInput } from "../../../types/messages/outgoing";
import type { MessageResponse } from "../../../types/messages/response";
import { buildMessagePayload } from "../utils/build-message-payload";
import { transformZodError } from "../../../utils/zod-error";

/**
 * Send a reaction message
 *
 * @param messagesClient - Messages client with phone number ID baked in
 * @param input - Reaction message input (to, reaction)
 */
export async function sendReaction(
  messagesClient: MessagesClient,
  input: SendReactionInput
): Promise<MessageResponse> {
  // Validate input with schema - throws WhatsAppValidationError if invalid
  const result = sendReactionInputSchema.safeParse(input);
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
