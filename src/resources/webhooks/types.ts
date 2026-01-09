import { z } from "zod";
import {
  webhookContactSchema,
  webhookMetadataSchema,
  webhookStatusSchema,
  webhookPayloadSchema,
  webhookVerifyQuerySchema,
  webhookConversationSchema,
  webhookPricingSchema,
  webhookStatusErrorSchema,
} from "./schema";
import type {
  MessageIncoming,
  MessageIncomingText,
  MessageIncomingImage,
  MessageIncomingAudio,
} from "../messages/types";

// =============================================================================
// Webhook Data Types
// =============================================================================

export type WebhookContact = z.infer<typeof webhookContactSchema>;
export type WebhookMetadata = z.infer<typeof webhookMetadataSchema>;
export type WebhookStatus = z.infer<typeof webhookStatusSchema>;
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;
export type WebhookVerifyQuery = z.infer<typeof webhookVerifyQuerySchema>;
export type WebhookConversation = z.infer<typeof webhookConversationSchema>;
export type WebhookPricing = z.infer<typeof webhookPricingSchema>;
export type WebhookStatusError = z.infer<typeof webhookStatusErrorSchema>;

// =============================================================================
// Handler Types
// =============================================================================

/**
 * Context provided to webhook handlers
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
 * Handler functions for different message types
 *
 * @example
 * ```typescript
 * client.webhooks.handle(payload, {
 *   beforeHandler: async (message, ctx) => {
 *     const user = await db.findUser(message.from);
 *     return { user };
 *   },
 *   text: async (message, ctx, before) => {
 *     if (before?.user) {
 *       console.log(`Message from ${before.user.name}`);
 *     }
 *   },
 * });
 * ```
 */
export type WebhookHandlers<TBefore = Record<string, never>> = {
  /**
   * Runs before message handlers. Return value is passed to handlers.
   */
  beforeHandler?: (
    message: MessageIncoming,
    ctx: WebhookContext
  ) => Promise<TBefore> | TBefore;

  text?: (
    message: MessageIncomingText,
    ctx: WebhookContext,
    before: TBefore | undefined
  ) => Promise<void> | void;

  audio?: (
    message: MessageIncomingAudio,
    ctx: WebhookContext,
    before: TBefore | undefined
  ) => Promise<void> | void;

  image?: (
    message: MessageIncomingImage,
    ctx: WebhookContext,
    before: TBefore | undefined
  ) => Promise<void> | void;
};

/**
 * Filter configuration for webhook handling
 *
 * Use this to only process messages for specific phone numbers or WABAs.
 * Messages that don't match the filter are silently ignored.
 *
 * @example
 * ```typescript
 * // Only process messages for a specific phone number
 * client.webhooks.handle(payload, {
 *   filter: {
 *     phoneNumberIds: ["894206507114246"],
 *   },
 *   text: async (message, ctx) => { ... },
 * });
 *
 * // Process messages for multiple phone numbers
 * client.webhooks.handle(payload, {
 *   filter: {
 *     phoneNumberIds: ["894206507114246", "846514031886910"],
 *   },
 *   text: async (message, ctx) => { ... },
 * });
 * ```
 */
export type WebhookFilter = {
  /**
   * Only process messages for these phone number IDs.
   * If empty or undefined, all phone numbers are processed.
   */
  phoneNumberIds?: string[];

  /**
   * Only process messages for these WABA IDs.
   * If empty or undefined, all WABAs are processed.
   */
  wabaIds?: string[];
};

/**
 * Options for the handle() method
 */
export type WebhookHandleOptions = {
  /**
   * Filter to only process messages matching certain criteria.
   * Messages that don't match are silently ignored (no handlers called).
   *
   * This is useful for multi-tenant setups where one webhook receives
   * messages for multiple phone numbers but each instance only cares
   * about specific numbers.
   */
  filter?: WebhookFilter;

  /**
   * Called when a handler throws an error
   */
  onError?: (error: Error, message: MessageIncoming) => void;
};

// Re-export message types for convenience
export type {
  MessageIncoming,
  MessageIncomingText,
  MessageIncomingImage,
  MessageIncomingAudio,
};
