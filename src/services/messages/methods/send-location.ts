import type { MessagesClient } from "../MessagesClient";
import { sendLocationRequestSchema } from "../../../schemas/messages/request";
import type { SendLocationRequest } from "../../../types/messages/request";
import type { MessageResponse } from "../../../types/messages/response";
import { buildMessagePayload } from "../utils/build-message-payload";
import { transformZodError } from "../../../utils/zod-error";

/**
 * Send a location message
 * 
 * @param messagesClient - Messages client with phone number ID baked in
 * @param request - Location message request (to, location)
 */
export async function sendLocation(
  messagesClient: MessagesClient,
  request: SendLocationRequest
): Promise<MessageResponse> {
  // Validate request with schema - throws WhatsAppValidationError if invalid
  const result = sendLocationRequestSchema.safeParse(request);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;

  // Build message payload using common structure
  const payload = buildMessagePayload(data.to, "location", {
    location: data.location,
  });

  // Make API request - messagesClient handles the phoneNumberId prefix automatically
  return messagesClient.post<MessageResponse>("/messages", payload);
}
