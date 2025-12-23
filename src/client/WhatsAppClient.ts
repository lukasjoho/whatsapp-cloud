import { clientConfigSchema } from "../schemas/client";
import type { ClientConfig } from "../types/client";
import { HttpClient } from "./HttpClient";
import { MessagesService } from "../services/messages/index";
import { AccountsService } from "../services/accounts/index";
import { ZodError } from "zod";
import { transformZodError } from "../utils/zod-error";

/**
 * WhatsApp Cloud API client
 */
export class WhatsAppClient {
  public readonly messages: MessagesService;
  public readonly accounts: AccountsService;

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
  }
}
