import { HttpClient } from "../../client/HttpClient";
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
 * This service handles message operations.
 * It supports both a globally configured phoneNumberId (in WhatsAppClient)
 * and per-request phoneNumberId overrides.
 */
export class MessagesService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Helper to create a Scoped Client (prefer override, fallback to config)
   */
  private getClient(overrideId?: string): MessagesClient {
    const id = overrideId || this.httpClient.phoneNumberId;
    if (!id) {
      throw new WhatsAppValidationError(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter.",
        "phoneNumberId"
      );
    }

    // Just wrap the existing httpClient
    return new MessagesClient(this.httpClient, id);
  }

  /**
   * Send a text message
   *
   * @param request - Text message request (to, text)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendText(
    request: SendTextRequest,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    const client = this.getClient(phoneNumberId);
    return sendText(client, request);
  }

  /**
   * Send an image message
   *
   * @param request - Image message request (to, image)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendImage(
    request: SendImageRequest,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    const client = this.getClient(phoneNumberId);
    return sendImage(client, request);
  }

  /**
   * Send a location message
   *
   * @param request - Location message request (to, location)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendLocation(
    request: SendLocationRequest,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    const client = this.getClient(phoneNumberId);
    return sendLocation(client, request);
  }

  /**
   * Send a reaction message
   *
   * @param request - Reaction message request (to, reaction)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendReaction(
    request: SendReactionRequest,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    const client = this.getClient(phoneNumberId);
    return sendReaction(client, request);
  }
}
