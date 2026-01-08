// WhatsApp Cloud API SDK
export { WhatsAppClient } from "./client/index";

// Export resources (new domain-colocated structure)
export * from "./resources/index";

// Export schemas (AI-ready) - legacy path, prefer resources/
export * from "./schemas/index";

// Export types (primary export point) - legacy path, prefer resources/
export type * from "./types/index";

// Export webhook handler types (convenience exports)
export type {
  WebhookContext,
  MessageContext,
  MessageHandlers,
  HandleOptions,
} from "./services/webhooks/index";

// Export errors for error handling
export {
  WhatsAppError,
  WhatsAppValidationError,
  WhatsAppAPIError,
  WhatsAppRateLimitError,
} from "./errors";

// Export utilities
export { toTemplateName } from "./utils/templates";
