import type { HttpClient } from "../../client/HttpClient";
import {
  messageSendTextSchema,
  messageSendImageSchema,
  messageSendLocationSchema,
  messageSendReactionSchema,
} from "./schema";
import type {
  MessageSendText,
  MessageSendImage,
  MessageSendLocation,
  MessageSendReaction,
  MessageOutgoing,
  MessageSendResponse,
} from "./types";
import { buildMessagePayload } from "./utils";

/**
 * Messages resource for sending WhatsApp messages
 *
 * @example
 * ```typescript
 * // Send a text message
 * await client.messages.sendText({
 *   to: "+1234567890",
 *   text: { body: "Hello!" }
 * });
 *
 * // Send an image
 * await client.messages.sendImage({
 *   to: "+1234567890",
 *   image: { link: "https://example.com/image.jpg" }
 * });
 *
 * // Send using the generic send method
 * await client.messages.send({
 *   type: "text",
 *   to: "+1234567890",
 *   text: { body: "Hello!" }
 * });
 * ```
 */
export class MessagesResource {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get the phone number ID (with validation)
   */
  private getPhoneNumberId(overrideId?: string): string {
    const id = overrideId || this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }

  /**
   * Send a text message
   *
   * @param input - Text message input
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * await client.messages.sendText({
   *   to: "+1234567890",
   *   text: { body: "Hello, world!" }
   * });
   * ```
   */
  async sendText(
    input: MessageSendText,
    phoneNumberId?: string
  ): Promise<MessageSendResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = messageSendTextSchema.parse(input);

    const payload = buildMessagePayload(data.to, "text", { text: data.text });

    return this.httpClient.post<MessageSendResponse>(`/${id}/messages`, payload);
  }

  /**
   * Send an image message
   *
   * @param input - Image message input
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * // Using a URL
   * await client.messages.sendImage({
   *   to: "+1234567890",
   *   image: { link: "https://example.com/photo.jpg", caption: "Check this out!" }
   * });
   *
   * // Using a media ID
   * await client.messages.sendImage({
   *   to: "+1234567890",
   *   image: { id: "media_id_from_upload" }
   * });
   * ```
   */
  async sendImage(
    input: MessageSendImage,
    phoneNumberId?: string
  ): Promise<MessageSendResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = messageSendImageSchema.parse(input);

    const payload = buildMessagePayload(data.to, "image", { image: data.image });

    return this.httpClient.post<MessageSendResponse>(`/${id}/messages`, payload);
  }

  /**
   * Send a location message
   *
   * @param input - Location message input
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * await client.messages.sendLocation({
   *   to: "+1234567890",
   *   location: {
   *     latitude: 37.7749,
   *     longitude: -122.4194,
   *     name: "San Francisco",
   *     address: "California, USA"
   *   }
   * });
   * ```
   */
  async sendLocation(
    input: MessageSendLocation,
    phoneNumberId?: string
  ): Promise<MessageSendResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = messageSendLocationSchema.parse(input);

    const payload = buildMessagePayload(data.to, "location", {
      location: data.location,
    });

    return this.httpClient.post<MessageSendResponse>(`/${id}/messages`, payload);
  }

  /**
   * Send a reaction to a message
   *
   * @param input - Reaction input
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * await client.messages.sendReaction({
   *   to: "+1234567890",
   *   reaction: {
   *     message_id: "wamid.xxx",
   *     emoji: "👍"
   *   }
   * });
   * ```
   */
  async sendReaction(
    input: MessageSendReaction,
    phoneNumberId?: string
  ): Promise<MessageSendResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = messageSendReactionSchema.parse(input);

    const payload = buildMessagePayload(data.to, "reaction", {
      reaction: data.reaction,
    });

    return this.httpClient.post<MessageSendResponse>(`/${id}/messages`, payload);
  }

  /**
   * Send any message type using the discriminated union
   *
   * @param message - Any outgoing message (text, image, location, reaction)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   *
   * @example
   * ```typescript
   * await client.messages.send({
   *   type: "text",
   *   to: "+1234567890",
   *   text: { body: "Hello!" }
   * });
   * ```
   */
  async send(
    message: MessageOutgoing,
    phoneNumberId?: string
  ): Promise<MessageSendResponse> {
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
