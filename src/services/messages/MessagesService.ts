import type { HttpClient } from "../../client/HttpClient";
import { sendText } from "./methods/send-text";
import { sendImage } from "./methods/send-image";
import { sendLocation } from "./methods/send-location";
import { sendReaction } from "./methods/send-reaction";
import { MessagesClient } from "./MessagesClient";
import { WhatsAppValidationError } from "../../errors";
import type {
  SendTextRequest,
  SendImageRequest,
  SendLocationRequest,
  SendReactionRequest,
} from "../../types/messages/request";
import type { MessageResponse } from "../../types/messages/response";

/**
 * Messages service for sending WhatsApp messages
 *
 * The service validates that phoneNumberId is set at the client level and creates
 * a MessagesClient instance. MessagesClient treats phoneNumberId as a "client" for
 * the messaging namespace - different phoneNumberIds represent different endpoints.
 */
export class MessagesService {
  private readonly messagesClient: MessagesClient;

  constructor(httpClient: HttpClient) {
    // Validate that phoneNumberId is set at client level
    if (!httpClient.phoneNumberId) {
      throw new WhatsAppValidationError(
        "phoneNumberId is required for MessagesService. Provide it in WhatsAppClient config.",
        "phoneNumberId"
      );
    }

    // Create messages client with phone number ID baked in
    this.messagesClient = new MessagesClient(
      httpClient,
      httpClient.phoneNumberId
    );
  }

  /**
   * Send a text message
   *
   * @param request - Text message request (to, text)
   */
  async sendText(request: SendTextRequest): Promise<MessageResponse> {
    return sendText(this.messagesClient, request);
  }

  /**
   * Send an image message
   *
   * @param request - Image message request (to, image)
   */
  async sendImage(request: SendImageRequest): Promise<MessageResponse> {
    return sendImage(this.messagesClient, request);
  }

  /**
   * Send a location message
   *
   * @param request - Location message request (to, location)
   */
  async sendLocation(request: SendLocationRequest): Promise<MessageResponse> {
    return sendLocation(this.messagesClient, request);
  }

  /**
   * Send a reaction message
   *
   * @param request - Reaction message request (to, reaction)
   */
  async sendReaction(request: SendReactionRequest): Promise<MessageResponse> {
    return sendReaction(this.messagesClient, request);
  }
}
