import type { HttpClient } from "../../client/HttpClient";

/**
 * Messages client - wraps HttpClient with phone number ID as base endpoint
 * 
 * This client automatically prepends `/${phoneNumberId}` to all request paths.
 */
export class MessagesClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly phoneNumberId: string
  ) {}

  /**
   * Make a POST request with phone number ID prefix
   */
  async post<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.post<T>(`/${this.phoneNumberId}${path}`, body);
  }

  /**
   * Make a GET request with phone number ID prefix
   */
  async get<T>(path: string): Promise<T> {
    return this.httpClient.get<T>(`/${this.phoneNumberId}${path}`);
  }

  /**
   * Make a PATCH request with phone number ID prefix
   */
  async patch<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.patch<T>(`/${this.phoneNumberId}${path}`, body);
  }
}
