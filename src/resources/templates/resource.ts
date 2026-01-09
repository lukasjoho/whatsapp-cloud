import type { HttpClient } from "../../client/HttpClient";
import {
  templateCreateSchema,
  templateUpdateSchema,
  templateListSchema,
  templateDeleteSchema,
} from "./schema";
import type {
  Template,
  TemplateCreate,
  TemplateCreateResponse,
  TemplateUpdate,
  TemplateUpdateResponse,
  TemplateList,
  TemplateListResponse,
  TemplateDelete,
  TemplateDeleteResponse,
} from "./types";

/**
 * Templates resource for managing WhatsApp message templates
 *
 * @example Positional parameters (default)
 * ```typescript
 * await client.templates.create({
 *   name: "order_confirmation",
 *   category: "UTILITY",
 *   language: "en_US",
 *   components: [
 *     {
 *       type: "BODY",
 *       text: "Hi {{1}}! Your order {{2}} is confirmed.",
 *       example: { body_text: [["Pablo", "860198-230332"]] }
 *     }
 *   ]
 * });
 * ```
 *
 * @example Named parameters
 * ```typescript
 * await client.templates.create({
 *   name: "order_confirmation",
 *   category: "UTILITY",
 *   language: "en_US",
 *   parameter_format: "named",
 *   components: [
 *     {
 *       type: "BODY",
 *       text: "Hi {{first_name}}! Your order {{order_number}} is confirmed.",
 *       example: {
 *         body_text_named_params: [
 *           { param_name: "first_name", example: "Pablo" },
 *           { param_name: "order_number", example: "860198-230332" }
 *         ]
 *       }
 *     }
 *   ]
 * });
 * ```
 */
export class TemplatesResource {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get the business account ID (with validation)
   */
  private getBusinessAccountId(overrideId?: string): string {
    const id = overrideId || this.httpClient.businessAccountId;
    if (!id) {
      throw new Error(
        "businessAccountId (WABA ID) is required for templates. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }

  /**
   * Create a message template
   *
   * @param input - Template creation input
   * @param businessAccountId - Optional WABA ID (overrides client config)
   * @returns Created template info (id, status, category)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * const response = await client.templates.create({
   *   name: "welcome_message",
   *   category: "MARKETING",
   *   language: "en_US",
   *   components: [
   *     { type: "HEADER", format: "TEXT", text: "Welcome!" },
   *     {
   *       type: "BODY",
   *       text: "Hello {{1}}, thanks for joining us!",
   *       example: { body_text: [["Pablo"]] }
   *     },
   *     { type: "FOOTER", text: "Reply STOP to unsubscribe" }
   *   ]
   * });
   * ```
   */
  async create(
    input: TemplateCreate,
    businessAccountId?: string
  ): Promise<TemplateCreateResponse> {
    const wabaId = this.getBusinessAccountId(businessAccountId);
    const body = templateCreateSchema.parse(input);

    return this.httpClient.post<TemplateCreateResponse>(
      `/${wabaId}/message_templates`,
      body
    );
  }

  /**
   * List message templates
   *
   * @param options - Optional filter/pagination options
   * @param businessAccountId - Optional WABA ID (overrides client config)
   * @returns List of templates with pagination info
   * @throws {ZodError} If options validation fails
   *
   * @example
   * ```typescript
   * // List all templates
   * const all = await client.templates.list();
   *
   * // Filter by name
   * const filtered = await client.templates.list({ name: "welcome" });
   *
   * // With pagination
   * const page = await client.templates.list({ limit: 10, after: "cursor" });
   * ```
   */
  async list(
    options?: TemplateList,
    businessAccountId?: string
  ): Promise<TemplateListResponse> {
    const wabaId = this.getBusinessAccountId(businessAccountId);
    const query = options ? templateListSchema.parse(options) : {};

    // Build query string
    const params = new URLSearchParams();
    if (query.name) params.append("name", query.name);
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.after) params.append("after", query.after);
    if (query.before) params.append("before", query.before);

    const queryString = params.toString();
    const path = queryString
      ? `/${wabaId}/message_templates?${queryString}`
      : `/${wabaId}/message_templates`;

    return this.httpClient.get<TemplateListResponse>(path);
  }

  /**
   * Get a template by ID
   *
   * Note: Uses template ID directly (no WABA prefix needed)
   *
   * @param templateId - The template ID
   * @returns Template details
   *
   * @example
   * ```typescript
   * const template = await client.templates.get("123456789012345");
   * console.log(template.name, template.status);
   * ```
   */
  async get(templateId: string): Promise<Template> {
    if (!templateId?.trim()) {
      throw new Error("Template ID is required");
    }

    return this.httpClient.get<Template>(`/${templateId}`);
  }

  /**
   * Update a template
   *
   * Note: Uses template ID directly (no WABA prefix needed)
   *
   * @param templateId - The template ID
   * @param input - Fields to update
   * @returns Success status
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * await client.templates.update("123456789012345", {
   *   components: [
   *     { type: "BODY", text: "Updated message text" }
   *   ]
   * });
   * ```
   */
  async update(
    templateId: string,
    input: TemplateUpdate
  ): Promise<TemplateUpdateResponse> {
    if (!templateId?.trim()) {
      throw new Error("Template ID is required");
    }

    const body = templateUpdateSchema.parse(input);

    return this.httpClient.post<TemplateUpdateResponse>(`/${templateId}`, body);
  }

  /**
   * Delete a template
   *
   * @param input - Delete by name or hsm_id
   * @param businessAccountId - Optional WABA ID (overrides client config)
   * @returns Success status
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * // Delete by name
   * await client.templates.delete({ name: "old_template" });
   *
   * // Delete by template ID (hsm_id)
   * await client.templates.delete({ hsm_id: "123456789012345" });
   * ```
   */
  async delete(
    input: TemplateDelete,
    businessAccountId?: string
  ): Promise<TemplateDeleteResponse> {
    const wabaId = this.getBusinessAccountId(businessAccountId);
    const query = templateDeleteSchema.parse(input);

    // Build query string
    const params = new URLSearchParams();
    if (query.name) params.append("name", query.name);
    if (query.hsm_id) params.append("hsm_id", query.hsm_id);

    return this.httpClient.delete<TemplateDeleteResponse>(
      `/${wabaId}/message_templates?${params.toString()}`
    );
  }
}
