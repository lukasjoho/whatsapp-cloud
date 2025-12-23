import type { HttpClient } from "../../client/HttpClient";

/**
 * Accounts client - wraps HttpClient with WABA ID (WhatsApp Business Account ID) as base endpoint
 *
 * This client automatically prepends `/${wabaId}` to all request paths,
 * so methods can use relative paths like `/phone_numbers` instead of `/${wabaId}/phone_numbers`.
 *
 * Note: The wabaId is the WhatsApp Business Account ID (not the Business Portfolio ID).
 * This is used in endpoints like GET /<WABA_ID>/phone_numbers.
 *
 * This treats wabaId as a "client" for the accounts namespace - different
 * wabaIds represent different WhatsApp Business Account endpoints.
 */
export class AccountsClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly wabaId: string
  ) {}

  /**
   * Make a GET request with WABA ID prefix
   */
  async get<T>(path: string): Promise<T> {
    return this.httpClient.get<T>(`/${this.wabaId}${path}`);
  }

  /**
   * Make a POST request with WABA ID prefix
   */
  async post<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.post<T>(`/${this.wabaId}${path}`, body);
  }

  /**
   * Make a PATCH request with WABA ID prefix
   */
  async patch<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.patch<T>(`/${this.wabaId}${path}`, body);
  }
}

