import { clientConfigSchema } from "./schema";
import type { ClientConfig, DebugTokenResponse } from "./types";
import { HttpClient } from "./HttpClient";
import { BusinessResource } from "../resources/business";
import { WabasResource } from "../resources/wabas";
import { PhoneNumbersResource } from "../resources/phoneNumbers";
import { MessagesResource } from "../resources/messages";
import { TemplatesResource } from "../resources/templates";
import { MediaResource } from "../resources/media";
import { WebhooksResource } from "../resources/webhooks";

/**
 * WhatsApp Cloud API client
 */
export class WhatsAppClient {
  public readonly business: BusinessResource;
  public readonly wabas: WabasResource;
  public readonly phoneNumbers: PhoneNumbersResource;
  public readonly messages: MessagesResource;
  public readonly templates: TemplatesResource;
  public readonly media: MediaResource;
  public readonly webhooks: WebhooksResource;

  private readonly httpClient: HttpClient;

  constructor(config: ClientConfig) {
    // Validate config - throws ZodError if invalid
    const validated = clientConfigSchema.parse(config);

    // Initialize HTTP client
    this.httpClient = new HttpClient(validated);

    // Initialize resources
    this.business = new BusinessResource(this.httpClient);
    this.wabas = new WabasResource(this.httpClient);
    this.phoneNumbers = new PhoneNumbersResource(this.httpClient);
    this.messages = new MessagesResource(this.httpClient);
    this.templates = new TemplatesResource(this.httpClient);
    this.media = new MediaResource(this.httpClient);
    this.webhooks = new WebhooksResource();
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
