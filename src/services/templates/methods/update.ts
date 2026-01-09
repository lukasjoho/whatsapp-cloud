import type { HttpClient } from "../../../client/HttpClient";
import { templateUpdateSchema } from "../../../schemas/templates/request";
import type { TemplateUpdate } from "../../../types/templates/request";
import type { TemplateUpdateResponse } from "../../../types/templates/response";


/**
 * Update a template
 *
 * Note: This uses the template ID directly (no WABA prefix needed)
 *
 * @param httpClient - HTTP client
 * @param templateId - Template ID
 * @param request - Template update request
 */
export async function updateTemplate(
  httpClient: HttpClient,
  templateId: string,
  request: TemplateUpdate
): Promise<TemplateUpdateResponse> {
  if (!templateId || templateId.trim().length === 0) {
    throw new Error("Template ID is required");
  }

  // Validate request with schema - throws ZodError if invalid
  const result = templateUpdateSchema.safeParse(request);
  if (!result.success) {
    throw result.error;
  }
  const data = result.data;

  // Make API request - template ID is used directly, no WABA prefix
  return httpClient.post<TemplateUpdateResponse>(`/${templateId}`, data);
}
