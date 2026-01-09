// WhatsApp Cloud API SDK
export { WhatsAppClient } from "./client/index";

// Resources (domain-colocated structure)
export * from "./resources/index";

// Schemas
export * from "./schemas/index";

// Types
export type * from "./types/index";

// Webhook handler types
export type {
  WebhookContext,
  MessageContext,
  MessageHandlers,
  HandleOptions,
} from "./services/webhooks/index";

// Errors
export { GraphAPIError } from "./errors";
export type { GraphAPIErrorResponse } from "./errors";
