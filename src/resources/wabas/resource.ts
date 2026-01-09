import type { HttpClient } from "../../client/HttpClient";
import type {
  Waba,
  WabaListResponse,
  WabaCreate,
  WabaCreateResponse,
  WabaListOptions,
  SubscribedAppsListResponse,
  SubscribeAppResponse,
  UnsubscribeAppResponse,
} from "./types";

/**
 * WhatsApp Business Accounts (WABAs) resource
 *
 * Manages WhatsApp Business Account operations including listing, creating,
 * and retrieving WABAs.
 *
 * @example
 * ```typescript
 * // List WABAs for a business
 * const wabas = await client.wabas.list();
 *
 * // Create a new WABA
 * const newWaba = await client.wabas.create({ name: "My WABA" });
 *
 * // Get specific WABA details
 * const waba = await client.wabas.get();
 * ```
 */
export class WabasResource {
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
   * Get the WABA ID (from parameter or config)
   */
  private getWabaId(overrideId?: string): string {
    const id = overrideId ?? this.httpClient.businessAccountId;
    if (!id) {
      throw new Error(
        "wabaId (businessAccountId) is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }

  /**
   * Build query string from options
   */
  private buildQueryString(options?: WabaListOptions): string {
    if (!options) return "";

    const params = new URLSearchParams();

    if (options.fields) params.set("fields", options.fields);
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);
    if (options.business_type) {
      options.business_type.forEach((type) =>
        params.append("business_type", type)
      );
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }

  /**
   * List WhatsApp Business Accounts owned by a business
   *
   * @param options - Query options (fields, pagination, filters)
   * @param businessId - Business Portfolio ID (overrides config)
   * @returns List of WABAs
   *
   * @example
   * ```typescript
   * // List all WABAs
   * const wabas = await client.wabas.list();
   *
   * // With pagination
   * const wabas = await client.wabas.list({ limit: 10 });
   *
   * // Override business ID
   * const wabas = await client.wabas.list({}, "other-business-id");
   * ```
   */
  async list(
    options?: WabaListOptions,
    businessId?: string
  ): Promise<WabaListResponse> {
    const id = this.getBusinessId(businessId);
    const query = this.buildQueryString(options);
    return this.httpClient.get<WabaListResponse>(
      `/${id}/whatsapp_business_accounts${query}`
    );
  }

  /**
   * List client (shared) WhatsApp Business Accounts
   *
   * These are WABAs that have been shared with the business (agency model).
   *
   * @param options - Query options (fields, pagination, filters)
   * @param businessId - Business Portfolio ID (overrides config)
   * @returns List of client WABAs
   */
  async listClient(
    options?: WabaListOptions,
    businessId?: string
  ): Promise<WabaListResponse> {
    const id = this.getBusinessId(businessId);
    const query = this.buildQueryString(options);
    return this.httpClient.get<WabaListResponse>(
      `/${id}/client_whatsapp_business_accounts${query}`
    );
  }

  /**
   * Create a new WhatsApp Business Account
   *
   * @param data - WABA creation data
   * @param businessId - Business Portfolio ID (overrides config)
   * @returns Created WABA ID and payment account ID
   *
   * @example
   * ```typescript
   * const waba = await client.wabas.create({
   *   name: "My Business WABA",
   *   currency: "USD",
   *   timezone_id: 1,
   * });
   * console.log(waba.id);
   * ```
   */
  async create(
    data: WabaCreate,
    businessId?: string
  ): Promise<WabaCreateResponse> {
    const id = this.getBusinessId(businessId);
    return this.httpClient.post<WabaCreateResponse>(
      `/${id}/whatsapp_business_accounts`,
      data
    );
  }

  /**
   * Get details of a specific WhatsApp Business Account
   *
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @param fields - Comma-separated list of fields to return
   * @returns WABA details
   *
   * @example
   * ```typescript
   * const waba = await client.wabas.get();
   *
   * // With specific fields
   * const waba = await client.wabas.get(undefined, "id,name,currency");
   * ```
   */
  async get(wabaId?: string, fields?: string): Promise<Waba> {
    const id = this.getWabaId(wabaId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get<Waba>(`/${id}${query}`);
  }

  // ===========================================================================
  // Subscribed Apps
  // ===========================================================================

  /**
   * List apps subscribed to this WABA
   *
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns List of subscribed apps
   */
  async listSubscribedApps(wabaId?: string): Promise<SubscribedAppsListResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.get<SubscribedAppsListResponse>(
      `/${id}/subscribed_apps`
    );
  }

  /**
   * Subscribe an app to this WABA
   *
   * This is required to receive webhooks (incoming messages, status updates).
   * Without subscribing, your app won't receive any webhook events.
   *
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns Success status
   *
   * @example
   * ```typescript
   * // Subscribe your app to receive webhooks
   * await client.wabas.subscribeApp();
   * ```
   */
  async subscribeApp(wabaId?: string): Promise<SubscribeAppResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.post<SubscribeAppResponse>(
      `/${id}/subscribed_apps`,
      {}
    );
  }

  /**
   * Unsubscribe an app from this WABA
   *
   * After unsubscribing, your app will no longer receive webhooks for this WABA.
   *
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns Success status
   */
  async unsubscribeApp(wabaId?: string): Promise<UnsubscribeAppResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.delete<UnsubscribeAppResponse>(
      `/${id}/subscribed_apps`
    );
  }
}
