import { clientConfigSchema } from "../schemas/client";
import type { ClientConfig } from "../types/client";
import { HttpClient } from "./HttpClient";
import { MessagesService } from "../services/messages/index";
import { AccountsService } from "../services/accounts/index";
import { BusinessService } from "../services/business/index";
import { TemplatesService } from "../services/templates/index";
import { WebhooksService } from "../services/webhooks/index";
import { MediaService } from "../services/media/index";
import { ZodError } from "zod";
import { transformZodError } from "../utils/zod-error";
import type { DebugTokenResponse } from "../types/debug";

/**
 * WhatsApp Cloud API client
 */
export class WhatsAppClient {
  public readonly messages: MessagesService;
  public readonly accounts: AccountsService;
  public readonly business: BusinessService;
  public readonly templates: TemplatesService;
  public readonly webhooks: WebhooksService;
  public readonly media: MediaService;

  private readonly httpClient: HttpClient;

  constructor(config: ClientConfig) {
    // Validate config with schema - Zod provides detailed error messages
    let validated: ClientConfig;
    try {
      validated = clientConfigSchema.parse(config);
    } catch (error) {
      if (error instanceof ZodError) {
        throw transformZodError(error);
      }
      throw error;
    }

    // Initialize HTTP client
    this.httpClient = new HttpClient(validated);

    // Initialize services (namespaces)
    this.messages = new MessagesService(this.httpClient);
    this.accounts = new AccountsService(this.httpClient);
    this.business = new BusinessService(this.httpClient);
    this.templates = new TemplatesService(this.httpClient);
    this.webhooks = new WebhooksService(this.httpClient);
    this.media = new MediaService(this.httpClient);
  }

  /**
   * Debug the current access token
   *
   * This method calls the Graph API debug_token endpoint to inspect the access token
   * used by this client. Useful for understanding token permissions, expiration, and validity.
   *
   * @returns Debug information about the access token
   */
  async debugToken(): Promise<DebugTokenResponse> {
    return this.httpClient.get<DebugTokenResponse>(
      `/debug_token?input_token=${this.httpClient.accessToken}`
    );
  }
}
