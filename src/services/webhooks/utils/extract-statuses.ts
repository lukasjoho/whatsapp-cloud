import type { WebhookPayload, Status } from "../../../types/webhooks";

/**
 * Extract status updates from webhook payload
 *
 * Flattens the nested structure: entry[].changes[].value.statuses[]
 * Returns a flat array of status updates
 *
 * @param payload - Webhook payload from Meta
 * @returns Flat array of status updates
 */
export function extractStatuses(payload: WebhookPayload): Status[] {
  const statuses: Status[] = [];

  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (change.field === "messages" && change.value.statuses) {
        statuses.push(...change.value.statuses);
      }
    }
  }

  return statuses;
}
