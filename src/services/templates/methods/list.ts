import type { TemplatesClient } from "../TemplatesClient";
import { templateListSchema } from "../../../schemas/templates/request";
import type { TemplateList } from "../../../types/templates/request";
import type { TemplateListResponse } from "../../../types/templates/response";
import { transformZodError } from "../../../utils/zod-error";

/**
 * List message templates
 *
 * @param templatesClient - Templates client with WABA ID baked in
 * @param options - Optional filter options (name)
 */
export async function listTemplates(
  templatesClient: TemplatesClient,
  options?: TemplateList
): Promise<TemplateListResponse> {
  // Validate options if provided
  if (options) {
    const result = templateListSchema.safeParse(options);
    if (!result.success) {
      throw transformZodError(result.error);
    }
  }

  // Build query string
  const params = new URLSearchParams();
  if (options?.name) {
    params.append("name", options.name);
  }
  const queryString = params.toString();
  const path = queryString
    ? `/message_templates?${queryString}`
    : "/message_templates";

  // Make API request - templatesClient handles the WABA ID prefix automatically
  return templatesClient.get<TemplateListResponse>(path);
}
