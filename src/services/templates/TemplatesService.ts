import type { HttpClient } from "../../client/HttpClient";
import { TemplatesClient } from "./TemplatesClient";
import { createTemplate } from "./methods/create";
import { listTemplates } from "./methods/list";
import { getTemplate } from "./methods/get";
import { updateTemplate } from "./methods/update";
import { deleteTemplate } from "./methods/delete";
import { WhatsAppValidationError } from "../../errors";
import type {
  CreateTemplateRequest,
  UpdateTemplateRequest,
  ListTemplatesRequest,
  DeleteTemplateRequest,
} from "../../types/templates/request";
import type {
  CreateTemplateResponse,
  ListTemplatesResponse,
  TemplateResponse,
  UpdateTemplateResponse,
  DeleteTemplateResponse,
} from "../../types/templates/response";

/**
 * Templates service for managing message templates
 *
 * This service handles template operations like creating, listing, and deleting templates.
 * It supports both a globally configured businessAccountId (in WhatsAppClient)
 * and per-request businessAccountId overrides.
 *
 * Note: Get and Update operations use template ID directly (no WABA prefix needed).
 */
export class TemplatesService {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Helper to create a Scoped Client (prefer override, fallback to config)
   */
  private getClient(overrideId?: string): TemplatesClient {
    const id = overrideId || this.httpClient.businessAccountId;
    if (!id) {
      throw new WhatsAppValidationError(
        "businessAccountId (WABA ID) is required for templates. Provide it in WhatsAppClient config or as a parameter.",
        "businessAccountId"
      );
    }

    return new TemplatesClient(this.httpClient, id);
  }

  /**
   * Create a message template
   *
   * @param request - Template creation request
   * @param businessAccountId - Optional WABA ID (overrides client config)
   */
  async create(
    request: CreateTemplateRequest,
    businessAccountId?: string
  ): Promise<CreateTemplateResponse> {
    const client = this.getClient(businessAccountId);
    return createTemplate(client, request);
  }

  /**
   * List message templates
   *
   * @param options - Optional filter options (name)
   * @param businessAccountId - Optional WABA ID (overrides client config)
   */
  async list(
    options?: ListTemplatesRequest,
    businessAccountId?: string
  ): Promise<ListTemplatesResponse> {
    const client = this.getClient(businessAccountId);
    return listTemplates(client, options);
  }

  /**
   * Get a template by ID
   *
   * Note: This uses the template ID directly (no WABA prefix needed)
   *
   * @param templateId - Template ID
   */
  async get(templateId: string): Promise<TemplateResponse> {
    return getTemplate(this.httpClient, templateId);
  }

  /**
   * Update a template
   *
   * Note: This uses the template ID directly (no WABA prefix needed)
   *
   * @param templateId - Template ID
   * @param request - Template update request
   */
  async update(
    templateId: string,
    request: UpdateTemplateRequest
  ): Promise<UpdateTemplateResponse> {
    return updateTemplate(this.httpClient, templateId, request);
  }

  /**
   * Delete a template
   *
   * @param options - Delete options (name or hsm_id)
   * @param businessAccountId - Optional WABA ID (overrides client config)
   */
  async delete(
    options: DeleteTemplateRequest,
    businessAccountId?: string
  ): Promise<DeleteTemplateResponse> {
    const client = this.getClient(businessAccountId);
    return deleteTemplate(client, options);
  }
}
