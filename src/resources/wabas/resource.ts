import type { HttpClient } from "../../client/HttpClient";
import type {
  Waba,
  WabaListResponse,
  WabaCreate,
  WabaCreateResponse,
  WabaUpdate,
  WabaUpdateResponse,
  WabaListOptions,
  // Subscribed Apps
  SubscribedAppsResponse,
  SubscriptionRequest,
  SubscriptionResponse,
  // Assigned Users
  PermissionTask,
  AssignedUsersResponse,
  AssignedUsersListOptions,
  AssignedUserMutationResponse,
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

  /**
   * Update a WhatsApp Business Account
   *
   * @param data - Fields to update (name, timezone_id)
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.wabas.update({ name: "New Name" });
   *
   * // Update timezone
   * await client.wabas.update({ timezone_id: 1 });
   * ```
   */
  async update(data: WabaUpdate, wabaId?: string): Promise<WabaUpdateResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.post<WabaUpdateResponse>(`/${id}`, data);
  }

  // ===========================================================================
  // Subscribed Apps
  // ===========================================================================

  /**
   * List apps subscribed to this WABA
   *
   * @see GET /{WABA-ID}/subscribed_apps
   *
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @param fields - Comma-separated list of fields to return (id, name, link)
   * @returns List of subscribed apps
   *
   * @example
   * ```typescript
   * const apps = await client.wabas.listSubscribedApps();
   *
   * // With specific fields
   * const apps = await client.wabas.listSubscribedApps(undefined, "id,name,link");
   * ```
   */
  async listSubscribedApps(
    wabaId?: string,
    fields?: string
  ): Promise<SubscribedAppsResponse> {
    const id = this.getWabaId(wabaId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get<SubscribedAppsResponse>(
      `/${id}/subscribed_apps${query}`
    );
  }

  /**
   * Subscribe an app to this WABA
   *
   * This is required to receive webhooks (incoming messages, status updates).
   * Without subscribing, your app won't receive any webhook events.
   *
   * @see POST /{WABA-ID}/subscribed_apps
   *
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @param options - Optional webhook configuration (callback URI, verify token)
   * @returns Success status
   *
   * @example
   * ```typescript
   * // Subscribe using app's default webhook settings
   * await client.wabas.subscribeApp();
   *
   * // Subscribe with custom callback URL
   * await client.wabas.subscribeApp(undefined, {
   *   override_callback_uri: "https://example.com/webhook",
   *   verify_token: "my_verify_token"
   * });
   * ```
   */
  async subscribeApp(
    wabaId?: string,
    options?: SubscriptionRequest
  ): Promise<SubscriptionResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.post<SubscriptionResponse>(
      `/${id}/subscribed_apps`,
      options ?? {}
    );
  }

  /**
   * Unsubscribe an app from this WABA
   *
   * After unsubscribing, your app will no longer receive webhooks for this WABA.
   * This action takes effect immediately.
   *
   * @see DELETE /{WABA-ID}/subscribed_apps
   *
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.wabas.unsubscribeApp();
   * ```
   */
  async unsubscribeApp(wabaId?: string): Promise<SubscriptionResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.delete<SubscriptionResponse>(
      `/${id}/subscribed_apps`
    );
  }

  // ===========================================================================
  // Assigned Users
  // ===========================================================================

  /**
   * Build query string for assigned users list
   */
  private buildAssignedUsersQuery(
    businessId: string,
    options?: AssignedUsersListOptions
  ): string {
    const params = new URLSearchParams();
    params.set("business", businessId);

    if (options?.fields) params.set("fields", options.fields);
    if (options?.limit) params.set("limit", options.limit.toString());
    if (options?.after) params.set("after", options.after);
    if (options?.before) params.set("before", options.before);

    return `?${params.toString()}`;
  }

  /**
   * List users assigned to this WhatsApp Business Account
   *
   * @see GET /{WABA-ID}/assigned_users
   *
   * @param options - Query options (fields, pagination)
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @param businessId - Business Portfolio ID (overrides config.businessId) - required for this endpoint
   * @returns List of assigned users with their permissions
   *
   * @example
   * ```typescript
   * // List all assigned users
   * const users = await client.wabas.listAssignedUsers();
   *
   * // With specific fields
   * const users = await client.wabas.listAssignedUsers({
   *   fields: "id,name,user_type"
   * });
   * ```
   */
  async listAssignedUsers(
    options?: AssignedUsersListOptions,
    wabaId?: string,
    businessId?: string
  ): Promise<AssignedUsersResponse> {
    const wabaIdResolved = this.getWabaId(wabaId);
    const businessIdResolved = this.getBusinessId(businessId);
    const query = this.buildAssignedUsersQuery(businessIdResolved, options);
    return this.httpClient.get<AssignedUsersResponse>(
      `/${wabaIdResolved}/assigned_users${query}`
    );
  }

  /**
   * Add a user to this WhatsApp Business Account with specified permissions
   *
   * @see POST /{WABA-ID}/assigned_users
   *
   * @param userId - Facebook user ID to add
   * @param tasks - Permission tasks to grant (e.g., MANAGE, DEVELOP, MESSAGING)
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns Success status
   *
   * @example
   * ```typescript
   * // Add user with full control
   * await client.wabas.addAssignedUser("user123", ["FULL_CONTROL"]);
   *
   * // Add user with specific permissions
   * await client.wabas.addAssignedUser("user123", [
   *   "MESSAGING",
   *   "VIEW_TEMPLATES",
   *   "VIEW_INSIGHTS"
   * ]);
   * ```
   */
  async addAssignedUser(
    userId: string,
    tasks: PermissionTask[],
    wabaId?: string
  ): Promise<AssignedUserMutationResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.postForm<AssignedUserMutationResponse>(
      `/${id}/assigned_users`,
      { user: userId, tasks }
    );
  }

  /**
   * Remove a user from this WhatsApp Business Account
   *
   * This revokes ALL permissions for the user on this WABA.
   * The action cannot be undone - the user must be re-added if access is needed again.
   *
   * @see DELETE /{WABA-ID}/assigned_users
   *
   * @param userId - Facebook user ID to remove
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns Success status
   *
   * @example
   * ```typescript
   * // Remove user access
   * await client.wabas.removeAssignedUser("user123");
   * ```
   */
  async removeAssignedUser(
    userId: string,
    wabaId?: string
  ): Promise<AssignedUserMutationResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.deleteForm<AssignedUserMutationResponse>(
      `/${id}/assigned_users`,
      { user: userId }
    );
  }
}
