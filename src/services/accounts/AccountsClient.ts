import type { HttpClient } from "../../client/HttpClient";

/**
 * Accounts client - wraps HttpClient with WABA ID as base endpoint
 *
 * This client automatically prepends `/${businessAccountId}` to all request paths.
 */
export class AccountsClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly businessAccountId: string
  ) {}

  /**
   * Make a GET request with WABA ID prefix
   */
  async get<T>(path: string): Promise<T> {
    return this.httpClient.get<T>(`/${this.businessAccountId}${path}`);
  }

  /**
   * Make a POST request with WABA ID prefix
   */
  async post<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.post<T>(`/${this.businessAccountId}${path}`, body);
  }

  /**
   * Make a PATCH request with WABA ID prefix
   */
  async patch<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.patch<T>(`/${this.businessAccountId}${path}`, body);
  }
}
