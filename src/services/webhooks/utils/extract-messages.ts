import type { WebhookPayload } from "../../../types/webhooks";
import type { IncomingMessage } from "../../../types/webhooks/incoming-message";

/**
 * Extract all incoming messages from webhook payload
 *
 * Flattens the nested structure: entry[].changes[].value.messages[]
 * Returns a flat array of messages directly
 *
 * @param payload - Webhook payload from Meta
 * @returns Flat array of incoming messages
 */
export function extractMessages(payload: WebhookPayload): IncomingMessage[] {
  const messages: IncomingMessage[] = [];

  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (change.field === "messages" && change.value.messages) {
        messages.push(...change.value.messages);
      }
    }
  }

  return messages;
}
