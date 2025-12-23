import { ZodError } from "zod";
import { WhatsAppValidationError } from "../errors";

/**
 * Transform a ZodError into a WhatsAppValidationError
 *
 * Uses the first error's message (Zod already orders errors by importance)
 * Can be used for any validation: config, requests, responses, etc.
 */
export function transformZodError(error: ZodError): WhatsAppValidationError {
  const issues = error.issues.map((err) => ({
    path: err.path as readonly (string | number)[],
    message: err.message,
  }));

  // Use the first error as the main message (Zod orders by importance)
  const firstError = error.issues[0];
  if (firstError) {
    return new WhatsAppValidationError(
      firstError.message,
      typeof firstError.path[0] === "string" ? firstError.path[0] : undefined,
      issues
    );
  }

  // Fallback (shouldn't happen)
  return new WhatsAppValidationError("Validation failed", undefined, issues);
}
