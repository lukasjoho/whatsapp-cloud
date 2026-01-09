/**
 * Builds the message payload structure for WhatsApp API
 *
 * All WhatsApp messages follow this structure:
 * {
 *   "messaging_product": "whatsapp",
 *   "recipient_type": "individual",
 *   "to": "<PHONE_NUMBER>",
 *   "type": "<MESSAGE_TYPE>",
 *   "<MESSAGE_TYPE>": {<CONTENT>}
 * }
 */
export function buildMessagePayload<T extends Record<string, unknown>>(
  to: string,
  type: string,
  content: T
) {
  return {
    messaging_product: "whatsapp" as const,
    recipient_type: "individual" as const,
    to,
    type,
    ...content,
  };
}
