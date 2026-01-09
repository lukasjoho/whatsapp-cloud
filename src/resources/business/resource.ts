import type { HttpClient } from "../../client/HttpClient";
import type { Business, BusinessGetOptions } from "./types";

/**
 * Business Portfolio resource
 *
 * Retrieves information about a Meta Business Portfolio.
 *
 * @example
 * ```typescript
 * // Get business portfolio info
 * const business = await client.business.get();
 * console.log(business.name);
 * ```
 */
export class BusinessResource {
  constructor(private readonly httpClient: HttpClient) {}

  /**
   * Get the business ID (from parameter or config)
   */
  private getBusinessId(overrideId?: string): string {
    const id = overrideId ?? this.httpClient.businessId;
    if (!id) {
      throw new Error(
        "businessId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }

  /**
   * Get Business Portfolio information
   *
   * @param options - Query options (fields)
   * @param businessId - Business Portfolio ID (overrides config)
   * @returns Business portfolio details
   *
   * @example
   * ```typescript
   * const business = await client.business.get();
   * console.log(business.id, business.name, business.timezone_id);
   *
   * // With specific fields
   * const business = await client.business.get({ fields: "id,name" });
   *
   * // Override business ID
   * const business = await client.business.get({}, "other-business-id");
   * ```
   */
  async get(options?: BusinessGetOptions, businessId?: string): Promise<Business> {
    const id = this.getBusinessId(businessId);
    const query = options?.fields ? `?fields=${options.fields}` : "";
    return this.httpClient.get<Business>(`/${id}${query}`);
  }
}
