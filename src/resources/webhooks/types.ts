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
 * Options for the handle() method
 */
export type WebhookHandleOptions = {
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
