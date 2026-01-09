import { HttpClient } from "../../client/HttpClient";
import { sendText } from "./methods/send-text";
import { sendImage } from "./methods/send-image";
import { sendLocation } from "./methods/send-location";
import { sendReaction } from "./methods/send-reaction";
import { MessagesClient } from "./MessagesClient";

import type {
  SendTextInput,
  SendImageInput,
  SendLocationInput,
  SendReactionInput,
  OutgoingMessage,
} from "../../types/messages/outgoing";
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
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }

    // Just wrap the existing httpClient
    return new MessagesClient(this.httpClient, id);
  }

  /**
   * Send a text message
   *
   * @param input - Text message input (to, text)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendText(
    input: SendTextInput,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    const client = this.getClient(phoneNumberId);
    return sendText(client, input);
  }

  /**
   * Send an image message
   *
   * @param input - Image message input (to, image)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendImage(
    input: SendImageInput,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    const client = this.getClient(phoneNumberId);
    return sendImage(client, input);
  }

  /**
   * Send a location message
   *
   * @param input - Location message input (to, location)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendLocation(
    input: SendLocationInput,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    const client = this.getClient(phoneNumberId);
    return sendLocation(client, input);
  }

  /**
   * Send a reaction message
   *
   * @param input - Reaction message input (to, reaction)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendReaction(
    input: SendReactionInput,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    const client = this.getClient(phoneNumberId);
    return sendReaction(client, input);
  }

  /**
   * Send any message type using the discriminated union
   *
   * @param message - Any outgoing message (text, image, location, reaction)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendMessage(
    message: OutgoingMessage,
    phoneNumberId?: string
  ): Promise<MessageResponse> {
    switch (message.type) {
      case "text":
        return this.sendText(message, phoneNumberId);
      case "image":
        return this.sendImage(message, phoneNumberId);
      case "location":
        return this.sendLocation(message, phoneNumberId);
      case "reaction":
        return this.sendReaction(message, phoneNumberId);
    }
  }
}
