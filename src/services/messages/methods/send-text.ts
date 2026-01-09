import type { MessagesClient } from "../MessagesClient";
import { sendTextInputSchema } from "../../../schemas/messages/outgoing";
import type { SendTextInput } from "../../../types/messages/outgoing";
import type { MessageResponse } from "../../../types/messages/response";
import { buildMessagePayload } from "../utils/build-message-payload";


/**
 * Send a text message
 *
 * @param messagesClient - Messages client with phone number ID baked in
 * @param request - Text message request (to, text)
 */
export async function sendText(
  messagesClient: MessagesClient,
  input: SendTextInput
): Promise<MessageResponse> {
  // Validate input with schema - throws ZodError if invalid
  const result = sendTextInputSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  const data = result.data;

  // Build message payload using common structure
  const payload = buildMessagePayload(data.to, "text", {
    text: data.text,
  });

  // Make API request - messagesClient handles the phoneNumberId prefix automatically
  return messagesClient.post<MessageResponse>("/messages", payload);
}
