import type { MessagesClient } from "../MessagesClient";
import { sendImageInputSchema } from "../../../schemas/messages/outgoing";
import type { SendImageInput } from "../../../types/messages/outgoing";
import type { MessageResponse } from "../../../types/messages/response";
import { buildMessagePayload } from "../utils/build-message-payload";
import { transformZodError } from "../../../utils/zod-error";

/**
 * Send an image message
 *
 * @param messagesClient - Messages client with phone number ID baked in
 * @param request - Image message request (to, image)
 */
export async function sendImage(
  messagesClient: MessagesClient,
  input: SendImageInput
): Promise<MessageResponse> {
  // Validate input with schema - throws WhatsAppValidationError if invalid
  const result = sendImageInputSchema.safeParse(input);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;

  // Build message payload using common structure
  // The request.image already matches the API structure, so we can pass it directly
  const payload = buildMessagePayload(data.to, "image", {
    image: data.image,
  });

  // Make API request - messagesClient handles the phoneNumberId prefix automatically
  return messagesClient.post<MessageResponse>("/messages", payload);
}
