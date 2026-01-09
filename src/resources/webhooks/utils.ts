import type { WebhookPayload, WebhookStatus, WebhookVerifyQuery } from "./types";
import type { MessageIncoming } from "../messages/types";

/**
 * Verify webhook GET request from Meta
 *
 * Meta sends GET requests to verify webhook endpoints:
 * GET /webhook?hub.mode=subscribe&hub.challenge=<CHALLENGE>&hub.verify_token=<TOKEN>
 *
 * @param query - Query parameters from GET request
 * @param verifyToken - Your verification token
 * @returns Challenge string if valid, null if invalid
 *
 * @example
 * ```typescript
 * // Express/Next.js route handler
 * app.get('/webhook', (req, res) => {
 *   const challenge = verifyWebhook(req.query, process.env.WEBHOOK_VERIFY_TOKEN);
 *   if (challenge) {
 *     res.send(challenge);
 *   } else {
 *     res.status(403).send('Forbidden');
 *   }
 * });
 * ```
 */
export function verifyWebhook(
  query: WebhookVerifyQuery,
  verifyToken: string
): string | null {
  const mode = query["hub.mode"];
  const token = query["hub.verify_token"];
  const challenge = query["hub.challenge"];

  if (mode === "subscribe" && token === verifyToken && challenge) {
    return challenge;
  }

  return null;
}

/**
 * Extract all incoming messages from webhook payload
 *
 * Flattens: entry[].changes[].value.messages[]
 *
 * @param payload - Webhook payload from Meta
 * @returns Flat array of incoming messages
 */
export function extractMessages(payload: WebhookPayload): MessageIncoming[] {
  const messages: MessageIncoming[] = [];

  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (change.field === "messages" && change.value.messages) {
        messages.push(...change.value.messages);
      }
    }
  }

  return messages;
}

/**
 * Extract status updates from webhook payload
 *
 * Flattens: entry[].changes[].value.statuses[]
 *
 * @param payload - Webhook payload from Meta
 * @returns Flat array of status updates
 */
export function extractStatuses(payload: WebhookPayload): WebhookStatus[] {
  const statuses: WebhookStatus[] = [];

  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (change.field === "messages" && change.value.statuses) {
        statuses.push(...change.value.statuses);
      }
    }
  }

  return statuses;
}
