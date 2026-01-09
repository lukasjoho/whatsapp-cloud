import { clientConfigSchema } from "../schemas/client";
import type { ClientConfig } from "../types/client";
import { HttpClient } from "./HttpClient";
import { MessagesResource } from "../resources/messages";
import { TemplatesResource } from "../resources/templates";
import { MediaResource } from "../resources/media";
import { AccountsService } from "../services/accounts/index";
import { BusinessService } from "../services/business/index";
import { WebhooksService } from "../services/webhooks/index";
import type { DebugTokenResponse } from "../types/debug";

/**
 * WhatsApp Cloud API client
 */
export class WhatsAppClient {
  public readonly messages: MessagesResource;
  public readonly accounts: AccountsService;
  public readonly business: BusinessService;
  public readonly templates: TemplatesResource;
  public readonly webhooks: WebhooksService;
  public readonly media: MediaResource;

  private readonly httpClient: HttpClient;

  constructor(config: ClientConfig) {
    // Validate config - throws ZodError if invalid
    const validated = clientConfigSchema.parse(config);

    // Initialize HTTP client
    this.httpClient = new HttpClient(validated);

    // Initialize resources
    this.messages = new MessagesResource(this.httpClient);
    this.accounts = new AccountsService(this.httpClient);
    this.business = new BusinessService(this.httpClient);
    this.templates = new TemplatesResource(this.httpClient);
    this.webhooks = new WebhooksService(this.httpClient);
    this.media = new MediaResource(this.httpClient);
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
