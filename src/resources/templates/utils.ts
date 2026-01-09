/**
 * Template utilities
 */

/**
 * Converts an arbitrary string to a valid WhatsApp template name.
 *
 * WhatsApp template names must:
 * - Contain only lowercase letters, numbers, and underscores
 * - Be between 1 and 512 characters
 *
 * @example
 * ```typescript
 * import { toTemplateName } from 'whatsapp-cloud';
 *
 * toTemplateName("Order Confirmation");  // "order_confirmation"
 * toTemplateName("Welcome! New User");   // "welcome_new_user"
 * toTemplateName("2FA Code");            // "2fa_code"
 * ```
 */
export function toTemplateName(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_") // Replace whitespace with underscores
    .replace(/[^a-z0-9_]/g, "") // Remove invalid characters
    .replace(/_+/g, "_") // Collapse multiple underscores
    .replace(/^_|_$/g, ""); // Trim leading/trailing underscores
}
