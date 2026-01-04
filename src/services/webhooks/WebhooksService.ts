import type { HttpClient } from "../../client/HttpClient";
import { extractMessages } from "./utils/extract-messages";
import { extractStatuses } from "./utils/extract-statuses";
import { verifyWebhook } from "./utils/verify";
import { webhookPayloadSchema } from "../../schemas/webhooks/payload";
import type { WebhookPayload, Status } from "../../types/webhooks";
import type {
  IncomingTextMessage,
  IncomingAudioMessage,
  IncomingImageMessage,
  IncomingMessage,
} from "../../types/messages";

/**
 * WhatsApp webhook context - data from Meta's webhook payload
 * This is the "domain" of WhatsApp, not your application
 */
export type WebhookContext = {
  metadata: {
    phoneNumberId: string;
    displayPhoneNumber: string;
    wabaId: string;
  };
  contact?: {
    name: string;
    waId: string;
  };
};

/**
 * @deprecated Use `WebhookContext` instead. This alias is kept for backward compatibility.
 */
export type MessageContext = WebhookContext;

/**
 * Extract the return type from beforeHandler if it exists
 * Used for type inference to provide type safety in message handlers
 *
 * This works by:
 * 1. Checking if THandlers has a beforeHandler property
 * 2. Extracting the return type (R) using TypeScript's infer
 * 3. Unwrapping Promise types with Awaited
 * 4. Defaulting to empty object if no beforeHandler exists
 */
type ExtractBeforeType<THandlers> = THandlers extends {
  beforeHandler: (...args: any[]) => infer R;
}
  ? Awaited<R>
  : Record<string, never>;

/**
 * Handler functions for different message types
 *
 * The `beforeHandler` return type is automatically inferred and passed
 * as the third argument to message handlers for full type safety.
 *
 * @example
 * ```typescript
 * client.webhooks.handle(req.body, {
 *   beforeHandler: async (message, webhook) => {
 *     return { customerIds: ["123", "456"] };
 *   },
 *   text: async (message, webhook, before) => {
 *     // before is TBefore | undefined
 *     // - undefined = beforeHandler not set or failed
 *     // - object = beforeHandler succeeded (even if empty {})
 *     if (before) {
 *       // before.customerIds is typed as string[] ✅
 *       console.log(before.customerIds);
 *     }
 *   },
 * });
 * ```
 */
export type MessageHandlers<TBefore = Record<string, never>> = {
  /**
   * Resolves webhook data to application entities
   * ALWAYS runs first if defined, before any message handler.
   * The return type is automatically inferred and passed to message handlers.
   */
  beforeHandler?: (
    message: IncomingMessage,
    webhook: WebhookContext
  ) => Promise<TBefore> | TBefore;

  text?: (
    message: IncomingTextMessage,
    webhook: WebhookContext,
    before: TBefore | undefined
  ) => Promise<void> | void;

  audio?: (
    message: IncomingAudioMessage,
    webhook: WebhookContext,
    before: TBefore | undefined
  ) => Promise<void> | void;

  image?: (
    message: IncomingImageMessage,
    webhook: WebhookContext,
    before: TBefore | undefined
  ) => Promise<void> | void;
};

/**
 * Options for handle() method
 */
export type HandleOptions = {
  /**
   * Error handler called when a message handler throws an error
   * If not provided, errors are logged and processing continues
   */
  onError?: (error: Error, message: IncomingMessage) => void;
};

/**
 * Webhooks service for handling incoming webhook payloads
 *
 * Provides utilities for extracting messages and a convenience handler
 * for type-safe message processing.
 */
export class WebhooksService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Verify webhook GET request from Meta
   *
   * Meta sends GET requests to verify webhook endpoints during setup.
   * Returns the challenge string if valid, null if invalid.
   *
   * @param query - Query parameters from GET request
   * @param verifyToken - Your verification token (stored on your server)
   * @returns Challenge string if valid, null if invalid
   */
  verify(
    query: {
      "hub.mode"?: string;
      "hub.verify_token"?: string;
      "hub.challenge"?: string;
    },
    verifyToken: string
  ): string | null {
    return verifyWebhook(query, verifyToken);
  }

  /**
   * Extract all incoming messages from webhook payload
   *
   * Low-level utility that flattens the nested webhook structure
   * and returns messages directly.
   *
   * @param payload - Webhook payload from Meta
   * @returns Flat array of incoming messages
   */
  extractMessages(payload: WebhookPayload): IncomingMessage[] {
    return extractMessages(payload);
  }

  /**
   * Extract status updates from webhook payload
   *
   * Low-level utility for extracting status updates for outgoing messages.
   *
   * @param payload - Webhook payload from Meta
   * @returns Flat array of status updates
   */
  extractStatuses(payload: WebhookPayload): Status[] {
    return extractStatuses(payload);
  }

  /**
   * Download media file by media ID
   *
   * Downloads media files (images, audio, video, documents) from WhatsApp servers.
   * Uses the access token from the client configuration automatically.
   *
   * @param mediaId - Media ID from incoming message (e.g., message.image.id, message.audio.id)
   * @returns Promise resolving to ArrayBuffer containing the media file
   * @throws Error if download fails or media ID is invalid
   *
   * @example
   * ```typescript
   * client.webhooks.handle(req.body, {
   *   image: async (message, context) => {
   *     const mediaData = await client.webhooks.downloadMedia(message.image.id);
   *     // Upload to S3, save to disk, etc.
   *     await s3.upload({ key: message.image.id, body: Buffer.from(mediaData) });
   *   },
   * });
   * ```
   */
  async downloadMedia(mediaId: string): Promise<ArrayBuffer> {
    if (!mediaId || mediaId.trim().length === 0) {
      throw new Error("Media ID is required");
    }

    // WhatsApp API endpoint: GET /{version}/{media-id}
    // Use HttpClient's getBinary method which handles baseURL, apiVersion, and auth automatically
    return this.httpClient.getBinary(`/${mediaId}`);
  }

  /**
   * Validate webhook payload structure
   *
   * Validates the payload against the schema. Logs errors if malformed
   * but doesn't throw, allowing processing to continue.
   *
   * @param payload - Raw payload to validate
   * @returns Validated payload if valid, original payload if invalid (with logged error)
   */
  private validatePayload(payload: unknown): WebhookPayload {
    const result = webhookPayloadSchema.safeParse(payload);
    if (!result.success) {
      console.error(
        "Webhook payload validation failed:",
        result.error.format()
      );
      // Return as-is (TypeScript will treat it as WebhookPayload, but it's actually invalid)
      // This allows processing to continue, but handlers should be defensive
      return payload as WebhookPayload;
    }
    return result.data;
  }

  /**
   * Handle webhook payload with type-safe callbacks
   *
   * High-level convenience method that extracts messages and dispatches
   * them to appropriate handlers based on message type.
   *
   * **Important**: This method returns quickly to allow fast webhook responses.
   * Handlers are processed asynchronously. If you need to await handler completion,
   * use the low-level `extractMessages()` method instead.
   *
   * The `beforeHandler` return type is automatically inferred and provides
   * full type safety in message handlers.
   *
   * @param payload - Webhook payload from Meta (will be validated)
   * @param handlers - Object with handler functions for each message type
   * @param options - Optional error handling configuration
   */
  handle<THandlers extends MessageHandlers<any>>(
    payload: unknown,
    handlers: THandlers,
    options?: HandleOptions
  ): void {
    // Validate payload (logs error if malformed, but continues)
    const validatedPayload = this.validatePayload(payload);

    // Extract metadata and contacts from payload for context
    for (const entry of validatedPayload.entry) {
      for (const change of entry.changes) {
        if (change.field === "messages" && change.value.messages) {
          const metadata = {
            phoneNumberId: change.value.metadata.phone_number_id,
            displayPhoneNumber: change.value.metadata.display_phone_number,
            wabaId: entry.id,
          };

          const contacts = change.value.contacts || [];

          // Process each message with its context
          for (const message of change.value.messages) {
            // Find contact for this message (match by wa_id)
            const contact = contacts.find((c) => c.wa_id === message.from);

            // Build webhook context (metadata + contact, no message duplication)
            const webhook: WebhookContext = {
              metadata,
              ...(contact && {
                contact: {
                  name: contact.profile.name,
                  waId: contact.wa_id,
                },
              }),
            };

            // Process handler asynchronously (don't await)
            // This allows long-running handlers without blocking webhook response
            Promise.resolve()
              .then(async () => {
                // Extract the before type from handlers for type safety
                type BeforeType = ExtractBeforeType<THandlers>;

                // Run beforeHandler first if defined
                let before: BeforeType | undefined = undefined;
                if (handlers.beforeHandler) {
                  try {
                    before = (await handlers.beforeHandler(
                      message,
                      webhook
                    )) as BeforeType;
                  } catch (error) {
                    // If beforeHandler fails, set to undefined
                    // (graceful degradation - handlers can check if before exists)
                    if (options?.onError) {
                      options.onError(error as Error, message);
                    } else {
                      console.error(
                        `Error in beforeHandler for message ${message.id}:`,
                        error
                      );
                    }
                    // Continue with undefined - clear signal that beforeHandler failed
                    before = undefined;
                  }
                }

                // Type-safe dispatch based on message type
                switch (message.type) {
                  case "text":
                    if (handlers.text) {
                      await handlers.text(message, webhook, before);
                    }
                    break;

                  case "audio":
                    if (handlers.audio) {
                      await handlers.audio(message, webhook, before);
                    }
                    break;

                  case "image":
                    if (handlers.image) {
                      await handlers.image(message, webhook, before);
                    }
                    break;

                  default:
                    // Unhandled message type - silently continue
                    break;
                }
              })
              .catch((error) => {
                // Handle errors in handler execution
                if (options?.onError) {
                  options.onError(error as Error, message);
                } else {
                  // Default: log and continue (don't break webhook response)
                  console.error(
                    `Error handling ${message.type} message ${message.id}:`,
                    error
                  );
                }
              });
          }
        }
      }
    }
  }
}
