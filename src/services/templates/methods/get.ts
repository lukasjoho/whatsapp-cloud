import type { HttpClient } from "../../../client/HttpClient";
import type { Template } from "../../../types/templates/response";

/**
 * Get a template by ID
 *
 * Note: This uses the template ID directly (no WABA prefix needed)
 *
 * @param httpClient - HTTP client
 * @param templateId - Template ID
 */
export async function getTemplate(
  httpClient: HttpClient,
  templateId: string
): Promise<Template> {
  if (!templateId || templateId.trim().length === 0) {
    throw new Error("Template ID is required");
  }

  // Make API request - template ID is used directly, no WABA prefix
  return httpClient.get<Template>(`/${templateId}`);
}
