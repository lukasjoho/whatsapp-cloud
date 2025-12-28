import type { TemplatesClient } from "../TemplatesClient";
import { templateDeleteSchema } from "../../../schemas/templates/request";
import type { TemplateDelete } from "../../../types/templates/request";
import type { TemplateDeleteResponse } from "../../../types/templates/response";
import { transformZodError } from "../../../utils/zod-error";

/**
 * Delete a template
 *
 * @param templatesClient - Templates client with WABA ID baked in
 * @param options - Delete options (name or hsm_id)
 */
export async function deleteTemplate(
  templatesClient: TemplatesClient,
  options: TemplateDelete
): Promise<TemplateDeleteResponse> {
  // Validate request with schema - throws WhatsAppValidationError if invalid
  const result = templateDeleteSchema.safeParse(options);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;

  // Build query string
  const params = new URLSearchParams();
  if (data.name) {
    params.append("name", data.name);
  }
  if (data.hsm_id) {
    params.append("hsm_id", data.hsm_id);
  }
  const queryString = params.toString();
  const path = `/message_templates?${queryString}`;

  // Make API request - templatesClient handles the WABA ID prefix automatically
  return templatesClient.delete<TemplateDeleteResponse>(path);
}

