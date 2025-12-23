import type { HttpClient } from "../../client/HttpClient";

/**
 * Business client - wraps HttpClient with Business Portfolio ID as base endpoint
 *
 * This client automatically prepends `/${businessId}` to all request paths,
 * so methods can use relative paths like `/whatsapp_business_accounts` instead of `/${businessId}/whatsapp_business_accounts`.
 *
 * Note: The businessId is the Business Portfolio ID (not the WABA ID).
 * This is used in endpoints like GET /<Business-ID>/whatsapp_business_accounts.
 *
 * This treats businessId as a "client" for the business namespace - different
 * businessIds represent different Business Portfolio endpoints.
 */
export class BusinessClient {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly businessId: string
  ) {}

  /**
   * Make a GET request with Business Portfolio ID prefix
   */
  async get<T>(path: string): Promise<T> {
    return this.httpClient.get<T>(`/${this.businessId}${path}`);
  }

  /**
   * Make a POST request with Business Portfolio ID prefix
   */
  async post<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.post<T>(`/${this.businessId}${path}`, body);
  }

  /**
   * Make a PATCH request with Business Portfolio ID prefix
   */
  async patch<T>(path: string, body: unknown): Promise<T> {
    return this.httpClient.patch<T>(`/${this.businessId}${path}`, body);
  }
}

