/**
 * Builds the base message payload structure that's common to all WhatsApp messages
 *
 * According to WhatsApp API docs, all messages follow this structure:
 * {
 *   "messaging_product": "whatsapp",
 *   "recipient_type": "individual",
 *   "to": "<WHATSAPP_USER_PHONE_NUMBER>",
 *   "type": "<MESSAGE_TYPE>",
 *   "<MESSAGE_TYPE>": {<MESSAGE_CONTENTS>}
 * }
 *
 * Note: undefined values in content are automatically omitted by JSON.stringify
 *
 * @param to - WhatsApp phone number (E.164 format)
 * @param type - Message type (text, image, video, etc.)
 * @param content - Message-specific content object
 * @returns Complete message payload ready for API request
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
