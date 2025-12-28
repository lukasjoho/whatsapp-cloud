/**
 * Verify webhook GET request from Meta
 *
 * Meta sends GET requests to verify webhook endpoints:
 * GET /webhook?hub.mode=subscribe&hub.challenge=<CHALLENGE>&hub.verify_token=<TOKEN>
 *
 * @param query - Query parameters from GET request
 * @param verifyToken - Your verification token (stored on your server)
 * @returns Challenge string if valid, null if invalid
 */
export function verifyWebhook(
  query: {
    "hub.mode"?: string;
    "hub.verify_token"?: string;
    "hub.challenge"?: string;
  },
  verifyToken: string
): string | null {
  const mode = query["hub.mode"];
  const token = query["hub.verify_token"];
  const challenge = query["hub.challenge"];

  // Verify mode is "subscribe" and token matches
  if (mode === "subscribe" && token === verifyToken && challenge) {
    return challenge;
  }

  return null;
}
