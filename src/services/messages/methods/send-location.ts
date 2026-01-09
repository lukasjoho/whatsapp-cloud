import type { MessagesClient } from "../MessagesClient";
import { sendLocationInputSchema } from "../../../schemas/messages/outgoing";
import type { SendLocationInput } from "../../../types/messages/outgoing";
import type { MessageResponse } from "../../../types/messages/response";
import { buildMessagePayload } from "../utils/build-message-payload";


/**
 * Send a location message
 *
 * @param messagesClient - Messages client with phone number ID baked in
 * @param input - Location message input (to, location)
 */
export async function sendLocation(
  messagesClient: MessagesClient,
  input: SendLocationInput
): Promise<MessageResponse> {
  // Validate input with schema - throws ZodError if invalid
  const result = sendLocationInputSchema.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  const data = result.data;

  // Build message payload using common structure
  const payload = buildMessagePayload(data.to, "location", {
    location: data.location,
  });

  // Make API request - messagesClient handles the phoneNumberId prefix automatically
  return messagesClient.post<MessageResponse>("/messages", payload);
}
