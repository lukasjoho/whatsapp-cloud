// WhatsApp Cloud API SDK
export { WhatsAppClient } from "./client/index";

// Export schemas (AI-ready)
export * from "./schemas/index";

// Export types (primary export point)
export type * from "./types/index";

// Export webhook handler types (convenience exports)
export type {
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
