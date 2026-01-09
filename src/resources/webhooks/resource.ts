import { webhookPayloadSchema } from "./schema";
import { verifyWebhook, extractMessages, extractStatuses } from "./utils";
import type {
  WebhookPayload,
  WebhookStatus,
  WebhookVerifyQuery,
  WebhookContext,
  WebhookHandlers,
  WebhookHandleOptions,
  MessageIncoming,
} from "./types";

/**
 * Extract the return type from beforeHandler
 */
type ExtractBeforeType<THandlers> = THandlers extends {
  beforeHandler: (...args: any[]) => infer R;
}
  ? Awaited<R>
  : Record<string, never>;

/**
 * Webhooks resource for handling incoming webhook payloads from Meta
 *
 * @example
 * ```typescript
 * // Verify webhook (GET request)
 * const challenge = client.webhooks.verify(req.query, VERIFY_TOKEN);
 * if (challenge) return res.send(challenge);
 *
 * // Handle webhook (POST request)
 * client.webhooks.handle(req.body, {
 *   text: async (message, ctx) => {
 *     console.log(`Text from ${message.from}: ${message.text.body}`);
 *   },
 *   image: async (message, ctx) => {
 *     const buffer = await client.media.download(message.image.id);
 *   },
 * });
 * ```
 */
export class WebhooksResource {
  /**
   * Verify webhook GET request from Meta
   *
   * @param query - Query parameters from GET request
   * @param verifyToken - Your verification token
   * @returns Challenge string if valid, null if invalid
   */
  verify(query: WebhookVerifyQuery, verifyToken: string): string | null {
    return verifyWebhook(query, verifyToken);
  }

  /**
   * Extract all incoming messages from webhook payload
   *
   * @param payload - Webhook payload from Meta
   * @returns Flat array of incoming messages
   */
  extractMessages(payload: WebhookPayload): MessageIncoming[] {
    return extractMessages(payload);
  }

  /**
   * Extract status updates from webhook payload
   *
   * @param payload - Webhook payload from Meta
   * @returns Flat array of status updates
   */
  extractStatuses(payload: WebhookPayload): WebhookStatus[] {
    return extractStatuses(payload);
  }

  /**
   * Validate and parse webhook payload
   *
   * @param payload - Raw payload to validate
   * @returns Parsed payload, or original if invalid (with console error)
   */
  private parsePayload(payload: unknown): WebhookPayload {
    const result = webhookPayloadSchema.safeParse(payload);
    if (!result.success) {
      console.error("Webhook payload validation failed:", result.error.format());
      return payload as WebhookPayload;
    }
    return result.data;
  }

  /**
   * Handle webhook payload with type-safe callbacks
   *
   * Handlers run asynchronously - this method returns immediately
   * to allow fast webhook responses to Meta.
   *
   * @param payload - Webhook payload from Meta
   * @param handlers - Handler functions for each message type
   * @param options - Error handling options
   *
   * @example
   * ```typescript
   * // With beforeHandler for dependency injection
   * client.webhooks.handle(payload, {
   *   beforeHandler: async (message, ctx) => {
   *     const user = await db.users.findByPhone(message.from);
   *     return { user };
   *   },
   *   text: async (message, ctx, before) => {
   *     if (before?.user) {
   *       await saveMessage(before.user.id, message.text.body);
   *     }
   *   },
   * });
   *
   * // With filter for multi-tenant setups
   * client.webhooks.handle(payload, {
   *   text: async (message, ctx) => {
   *     // Only called for messages to the specified phone number
   *   },
   * }, {
   *   filter: { phoneNumberIds: ["894206507114246"] },
   * });
   * ```
   */
  handle<THandlers extends WebhookHandlers<any>>(
    payload: unknown,
    handlers: THandlers,
    options?: WebhookHandleOptions
  ): void {
    const parsed = this.parsePayload(payload);

    for (const entry of parsed.entry) {
      for (const change of entry.changes) {
        if (change.field !== "messages" || !change.value.messages) continue;

        const metadata = {
          phoneNumberId: change.value.metadata.phone_number_id,
          displayPhoneNumber: change.value.metadata.display_phone_number,
          wabaId: entry.id,
        };

        // Apply filter - skip if doesn't match criteria
        if (options?.filter) {
          const { phoneNumberIds, wabaIds } = options.filter;

          if (phoneNumberIds?.length && !phoneNumberIds.includes(metadata.phoneNumberId)) {
            continue;
          }

          if (wabaIds?.length && !wabaIds.includes(metadata.wabaId)) {
            continue;
          }
        }

        const contacts = change.value.contacts || [];

        for (const message of change.value.messages) {
          const contact = contacts.find((c) => c.wa_id === message.from);

          const ctx: WebhookContext = {
            metadata,
            ...(contact && {
              contact: {
                name: contact.profile.name,
                waId: contact.wa_id,
              },
            }),
          };

          // Process asynchronously
          Promise.resolve()
            .then(async () => {
              type BeforeType = ExtractBeforeType<THandlers>;

              let before: BeforeType | undefined;
              if (handlers.beforeHandler) {
                try {
                  before = (await handlers.beforeHandler(message, ctx)) as BeforeType;
                } catch (error) {
                  if (options?.onError) {
                    options.onError(error as Error, message);
                  } else {
                    console.error(`beforeHandler error for ${message.id}:`, error);
                  }
                  before = undefined;
                }
              }

              switch (message.type) {
                case "text":
                  if (handlers.text) await handlers.text(message, ctx, before);
                  break;
                case "audio":
                  if (handlers.audio) await handlers.audio(message, ctx, before);
                  break;
                case "image":
                  if (handlers.image) await handlers.image(message, ctx, before);
                  break;
              }
            })
            .catch((error) => {
              if (options?.onError) {
                options.onError(error as Error, message);
              } else {
                console.error(`Handler error for ${message.type} ${message.id}:`, error);
              }
            });
        }
      }
    }
  }
}
