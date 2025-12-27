import type { HttpClient } from "../../client/HttpClient";

/**
 * Templates client - wraps HttpClient with WABA ID as base endpoint
 *
 * This client automatically prepends `/${businessAccountId}` to all request paths.
 * Similar to AccountsClient, since templates are scoped to WABA.
 */
export class TemplatesClient {
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
   * Make a DELETE request with WABA ID prefix
   */
  async delete<T>(path: string): Promise<T> {
    return this.httpClient.delete<T>(`/${this.businessAccountId}${path}`);
  }
}
