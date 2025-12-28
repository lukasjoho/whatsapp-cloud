import type { TemplatesClient } from "../TemplatesClient";
import { templateCreateSchema } from "../../../schemas/templates/request";
import type { TemplateCreate } from "../../../types/templates/request";
import type { TemplateCreateResponse } from "../../../types/templates/response";
import { transformZodError } from "../../../utils/zod-error";

/**
 * Create a message template
 *
 * @param templatesClient - Templates client with WABA ID baked in
 * @param request - Template creation request
 */
export async function createTemplate(
  templatesClient: TemplatesClient,
  request: TemplateCreate
): Promise<TemplateCreateResponse> {
  // Validate request with schema - throws WhatsAppValidationError if invalid
  const result = templateCreateSchema.safeParse(request);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;

  // Make API request - templatesClient handles the WABA ID prefix automatically
  return templatesClient.post<TemplateCreateResponse>(
    "/message_templates",
    data
  );
}
