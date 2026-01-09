// src/client/schema.ts
import { z } from "zod";
var ACCESS_TOKEN_HELP_MESSAGE = "Get your access token from Meta for Developers: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started";
var accessTokenSchema = z.string({
  message: `accessToken is required. ${ACCESS_TOKEN_HELP_MESSAGE}`
}).min(1, {
  message: `accessToken cannot be empty. ${ACCESS_TOKEN_HELP_MESSAGE}`
}).trim().refine((val) => val.length > 0, {
  message: `accessToken cannot be whitespace only. ${ACCESS_TOKEN_HELP_MESSAGE}`
});
var clientConfigSchema = z.object({
  accessToken: accessTokenSchema,
  phoneNumberId: z.string().optional().refine((val) => val === void 0 || val.trim().length > 0, {
    message: "phoneNumberId cannot be empty or whitespace only"
  }),
  businessAccountId: z.string().optional().refine((val) => val === void 0 || val.trim().length > 0, {
    message: "businessAccountId cannot be empty or whitespace only"
  }),
  businessId: z.string().optional().refine((val) => val === void 0 || val.trim().length > 0, {
    message: "businessId cannot be empty or whitespace only"
  }),
  apiVersion: z.string().default("v18.0").optional(),
  baseURL: z.string().url().default("https://graph.facebook.com").optional(),
  timeout: z.number().positive().optional()
});
var debugTokenResponseSchema = z.object({
  data: z.object({
    app_id: z.string().optional(),
    type: z.string().optional(),
    application: z.string().optional(),
    data_access_expires_at: z.number().optional(),
    expires_at: z.number().optional(),
    is_valid: z.boolean().optional(),
    issued_at: z.number().optional(),
    metadata: z.object({
      auth_type: z.string().optional(),
      sso: z.string().optional()
    }).optional(),
    scopes: z.array(z.string()).optional(),
    granular_scopes: z.array(
      z.object({
        scope: z.string().optional(),
        target_ids: z.array(z.string()).optional()
      })
    ).optional(),
    user_id: z.string().optional(),
    profile_id: z.string().optional()
  })
});

// src/common/errors.ts
var GraphAPIError = class extends Error {
  constructor(response, statusCode) {
    super(response.error.message);
    this.response = response;
    this.statusCode = statusCode;
    this.name = "GraphAPIError";
  }
};

// src/client/HttpClient.ts
var HttpClient = class {
  baseURL;
  accessToken;
  phoneNumberId;
  businessAccountId;
  businessId;
  apiVersion;
  constructor(config) {
    this.accessToken = config.accessToken;
    if (config.phoneNumberId !== void 0) {
      this.phoneNumberId = config.phoneNumberId;
    }
    if (config.businessAccountId !== void 0) {
      this.businessAccountId = config.businessAccountId;
    }
    if (config.businessId !== void 0) {
      this.businessId = config.businessId;
    }
    this.apiVersion = config.apiVersion ?? "v18.0";
    this.baseURL = config.baseURL ?? "https://graph.facebook.com";
  }
  /**
   * Handle error responses - preserves FULL API error for debugging
   */
  async handleError(response) {
    let errorResponse;
    try {
      errorResponse = await response.json();
    } catch {
      errorResponse = {
        error: {
          message: response.statusText || "Unknown error",
          type: "HTTPError",
          code: response.status
        }
      };
    }
    if (!errorResponse.error) {
      errorResponse = {
        error: {
          message: JSON.stringify(errorResponse) || "Unknown error",
          type: "UnknownError",
          code: response.status
        }
      };
    }
    throw new GraphAPIError(errorResponse, response.status);
  }
  /**
   * Make a POST request
   */
  async post(path, body) {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.json();
  }
  /**
   * Make a GET request
   */
  async get(path) {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.json();
  }
  /**
   * Make a GET request and return binary data (ArrayBuffer)
   * Useful for downloading media files
   */
  async getBinary(path) {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.arrayBuffer();
  }
  /**
   * Make a PATCH request
   */
  async patch(path, body) {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.json();
  }
  /**
   * Make a DELETE request
   */
  async delete(path) {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.json();
  }
  /**
   * Make a POST request with form-urlencoded body
   * Used by some Graph API endpoints like assigned_users
   */
  async postForm(path, body) {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      if (Array.isArray(value)) {
        value.forEach((v, i) => params.append(`${key}[${i}]`, v));
      } else {
        params.append(key, value);
      }
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.accessToken}`
      },
      body: params.toString()
    });
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.json();
  }
  /**
   * Make a DELETE request with form-urlencoded body
   * Used by some Graph API endpoints like assigned_users
   */
  async deleteForm(path, body) {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;
    const params = new URLSearchParams(body);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.accessToken}`
      },
      body: params.toString()
    });
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.json();
  }
  /**
   * Make a DELETE request with JSON body
   * Used by some Graph API endpoints like block_users
   */
  async deleteWithBody(path, body) {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      },
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.json();
  }
};

// src/resources/business/resource.ts
var BusinessResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the business ID (from parameter or config)
   */
  getBusinessId(overrideId) {
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
  async get(options, businessId) {
    const id = this.getBusinessId(businessId);
    const query = options?.fields ? `?fields=${options.fields}` : "";
    return this.httpClient.get(`/${id}${query}`);
  }
};

// src/resources/business/schema.ts
import { z as z2 } from "zod";
var businessSchema = z2.object({
  id: z2.string(),
  name: z2.string().optional(),
  timezone_id: z2.number().optional()
});
var businessGetOptionsSchema = z2.object({
  fields: z2.string().optional()
});

// src/resources/wabas/resource.ts
var WabasResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the business ID (from parameter or config)
   */
  getBusinessId(overrideId) {
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
  getWabaId(overrideId) {
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
  buildQueryString(options) {
    if (!options) return "";
    const params = new URLSearchParams();
    if (options.fields) params.set("fields", options.fields);
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);
    if (options.business_type) {
      options.business_type.forEach(
        (type) => params.append("business_type", type)
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
  async list(options, businessId) {
    const id = this.getBusinessId(businessId);
    const query = this.buildQueryString(options);
    return this.httpClient.get(
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
  async listClient(options, businessId) {
    const id = this.getBusinessId(businessId);
    const query = this.buildQueryString(options);
    return this.httpClient.get(
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
  async create(data, businessId) {
    const id = this.getBusinessId(businessId);
    return this.httpClient.post(
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
  async get(wabaId, fields) {
    const id = this.getWabaId(wabaId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get(`/${id}${query}`);
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
  async update(data, wabaId) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.post(`/${id}`, data);
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
  async listSubscribedApps(wabaId, fields) {
    const id = this.getWabaId(wabaId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get(
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
  async subscribeApp(wabaId, options) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.post(
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
  async unsubscribeApp(wabaId) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.delete(
      `/${id}/subscribed_apps`
    );
  }
  // ===========================================================================
  // Assigned Users
  // ===========================================================================
  /**
   * Build query string for assigned users list
   */
  buildAssignedUsersQuery(businessId, options) {
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
  async listAssignedUsers(options, wabaId, businessId) {
    const wabaIdResolved = this.getWabaId(wabaId);
    const businessIdResolved = this.getBusinessId(businessId);
    const query = this.buildAssignedUsersQuery(businessIdResolved, options);
    return this.httpClient.get(
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
  async addAssignedUser(userId, tasks, wabaId) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.postForm(
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
  async removeAssignedUser(userId, wabaId) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.deleteForm(
      `/${id}/assigned_users`,
      { user: userId }
    );
  }
  // ===========================================================================
  // Activities
  // ===========================================================================
  /**
   * Build query string for activities list
   */
  buildActivitiesQuery(options) {
    if (!options) return "";
    const params = new URLSearchParams();
    if (options.fields) params.set("fields", options.fields);
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);
    if (options.since) params.set("since", options.since);
    if (options.until) params.set("until", options.until);
    if (options.activity_type) params.set("activity_type", options.activity_type);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }
  /**
   * List activities for this WhatsApp Business Account
   *
   * Retrieve activity logs and audit trails for a WABA.
   *
   * @see GET /{WABA-ID}/activities
   *
   * @param options - Query options (fields, pagination, time filters, activity_type)
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns List of activities
   *
   * @example
   * ```typescript
   * // List all activities
   * const activities = await client.wabas.listActivities();
   *
   * // With time filter
   * const activities = await client.wabas.listActivities({
   *   since: "2024-01-01T00:00:00Z",
   *   until: "2024-01-31T23:59:59Z"
   * });
   *
   * // Filter by activity type
   * const activities = await client.wabas.listActivities({
   *   activity_type: "USER_ADDED,USER_REMOVED"
   * });
   * ```
   */
  async listActivities(options, wabaId) {
    const id = this.getWabaId(wabaId);
    const query = this.buildActivitiesQuery(options);
    return this.httpClient.get(`/${id}/activities${query}`);
  }
};

// src/resources/wabas/schema.ts
import { z as z3 } from "zod";
var accountReviewStatusSchema = z3.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "RESTRICTED",
  "LIMIT_REACHED"
]);
var businessVerificationStatusSchema = z3.enum([
  "VERIFIED",
  "UNVERIFIED",
  "PENDING",
  "REJECTED"
]);
var wabaBusinessTypeSchema = z3.enum(["ENTERPRISE", "SMB"]);
var ownershipTypeSchema = z3.enum([
  "OWNED_BY_BUSINESS_PORTFOLIO",
  "OWNED_BY_BUSINESS_ASSET_GROUP"
]);
var onBehalfOfBusinessInfoSchema = z3.object({
  id: z3.string().optional(),
  name: z3.string().optional()
});
var cursorPagingSchema = z3.object({
  cursors: z3.object({
    before: z3.string().optional(),
    after: z3.string().optional()
  }).optional(),
  previous: z3.string().optional(),
  next: z3.string().optional()
});
var wabaSchema = z3.object({
  id: z3.string(),
  name: z3.string().optional(),
  account_review_status: accountReviewStatusSchema.optional(),
  purchase_order_number: z3.string().optional(),
  currency: z3.string().optional(),
  timezone_id: z3.string().optional(),
  business_verification_status: businessVerificationStatusSchema.optional(),
  country: z3.string().optional(),
  ownership_type: ownershipTypeSchema.optional(),
  primary_business_location: z3.string().optional(),
  on_behalf_of_business_info: onBehalfOfBusinessInfoSchema.optional(),
  is_enabled_for_insights: z3.boolean().optional(),
  message_template_namespace: z3.string().optional()
});
var wabaListResponseSchema = z3.object({
  data: z3.array(wabaSchema),
  paging: cursorPagingSchema.optional()
});
var wabaCreateSchema = z3.object({
  name: z3.string(),
  primary_funding_id: z3.string().optional(),
  purchase_order_number: z3.string().optional(),
  currency: z3.string().optional(),
  timezone_id: z3.number().optional(),
  business_type: wabaBusinessTypeSchema.optional(),
  on_behalf_of_business_id: z3.string().optional()
});
var wabaCreateResponseSchema = z3.object({
  id: z3.string(),
  payment_account_id: z3.string().optional()
});
var wabaUpdateSchema = z3.object({
  name: z3.string().optional(),
  timezone_id: z3.number().optional()
});
var wabaUpdateResponseSchema = z3.object({
  success: z3.boolean()
});
var wabaListOptionsSchema = z3.object({
  fields: z3.string().optional(),
  business_type: z3.array(wabaBusinessTypeSchema).optional(),
  limit: z3.number().min(1).max(100).optional(),
  after: z3.string().optional(),
  before: z3.string().optional()
});
var whatsappBusinessApiDataSchema = z3.object({
  id: z3.string(),
  name: z3.string(),
  link: z3.string().optional()
});
var subscribedAppSchema = z3.object({
  whatsapp_business_api_data: whatsappBusinessApiDataSchema,
  override_callback_uri: z3.string().optional()
});
var subscribedAppsResponseSchema = z3.object({
  data: z3.array(subscribedAppSchema)
});
var subscriptionRequestSchema = z3.object({
  /** Custom webhook callback URL to override app default */
  override_callback_uri: z3.string().optional(),
  /** Verification token for webhook security */
  verify_token: z3.string().optional()
});
var subscriptionResponseSchema = z3.object({
  success: z3.boolean(),
  data: z3.array(subscribedAppSchema).optional()
});
var permissionTaskSchema = z3.enum([
  "MANAGE",
  "DEVELOP",
  "MANAGE_TEMPLATES",
  "MANAGE_PHONE",
  "VIEW_COST",
  "MANAGE_EXTENSIONS",
  "VIEW_PHONE_ASSETS",
  "MANAGE_PHONE_ASSETS",
  "VIEW_TEMPLATES",
  "VIEW_INSIGHTS",
  "RECEIVE_INCOMING_MESSAGES",
  "MANAGE_BILLING",
  "MANAGE_USERS",
  "MESSAGING",
  "FULL_CONTROL"
]);
var assignedUserTypeSchema = z3.enum([
  "BUSINESS_USER",
  "SYSTEM_USER",
  "PERSONAL_USER"
]);
var businessNodeSchema = z3.object({
  id: z3.string().optional(),
  name: z3.string().optional()
});
var assignedUserSchema = z3.object({
  id: z3.string(),
  name: z3.string(),
  business: businessNodeSchema.optional(),
  user_type: assignedUserTypeSchema.optional()
});
var assignedUsersSummarySchema = z3.object({
  total_count: z3.number().optional()
});
var assignedUsersResponseSchema = z3.object({
  data: z3.array(assignedUserSchema),
  paging: cursorPagingSchema.optional(),
  summary: assignedUsersSummarySchema.optional()
});
var assignedUsersListOptionsSchema = z3.object({
  fields: z3.string().optional(),
  limit: z3.number().min(1).max(100).optional(),
  after: z3.string().optional(),
  before: z3.string().optional()
});
var assignedUserMutationResponseSchema = z3.object({
  success: z3.boolean()
});
var activityTypeSchema = z3.enum([
  "ACCOUNT_CREATED",
  "ACCOUNT_UPDATED",
  "ACCOUNT_DELETED",
  "PHONE_NUMBER_ADDED",
  "PHONE_NUMBER_REMOVED",
  "PHONE_NUMBER_VERIFIED",
  "USER_ADDED",
  "USER_REMOVED",
  "USER_ROLE_CHANGED",
  "PERMISSION_GRANTED",
  "PERMISSION_REVOKED",
  "TEMPLATE_CREATED",
  "TEMPLATE_UPDATED",
  "TEMPLATE_DELETED",
  "WEBHOOK_CONFIGURED",
  "API_ACCESS_GRANTED",
  "API_ACCESS_REVOKED",
  "BILLING_UPDATED",
  "COMPLIANCE_ACTION",
  "SECURITY_EVENT"
]);
var actorTypeSchema = z3.enum([
  "USER",
  "SYSTEM",
  "API",
  "ADMIN",
  "AUTOMATED_PROCESS"
]);
var activitySchema = z3.object({
  id: z3.string(),
  activity_type: activityTypeSchema,
  timestamp: z3.string(),
  actor_type: actorTypeSchema,
  actor_id: z3.string().optional(),
  actor_name: z3.string().optional(),
  description: z3.string().optional(),
  details: z3.record(z3.string(), z3.unknown()).optional(),
  ip_address: z3.string().optional(),
  user_agent: z3.string().optional()
});
var activitiesResponseSchema = z3.object({
  data: z3.array(activitySchema),
  paging: cursorPagingSchema.optional()
});
var activitiesListOptionsSchema = z3.object({
  fields: z3.string().optional(),
  limit: z3.number().min(1).max(100).optional(),
  after: z3.string().optional(),
  before: z3.string().optional(),
  since: z3.string().optional(),
  until: z3.string().optional(),
  activity_type: z3.string().optional()
});

// src/resources/phoneNumbers/subresources/block/resource.ts
var BlockResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the phone number ID (from parameter or config)
   */
  getPhoneNumberId(overrideId) {
    const id = overrideId ?? this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Build query string for list options
   */
  buildQueryString(options) {
    if (!options) return "";
    const params = new URLSearchParams();
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }
  /**
   * List blocked users for a phone number
   *
   * @see GET /{Phone-Number-ID}/block_users
   *
   * @param options - Pagination options
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns List of blocked users
   *
   * @example
   * ```typescript
   * const blocked = await client.phoneNumbers.block.list();
   *
   * // With pagination
   * const blocked = await client.phoneNumbers.block.list({ limit: 10 });
   * ```
   */
  async list(options, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = this.buildQueryString(options);
    return this.httpClient.get(
      `/${id}/block_users${query}`
    );
  }
  /**
   * Block one or more users
   *
   * @see POST /{Phone-Number-ID}/block_users
   *
   * @param users - Array of phone numbers to block (with country code)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Block operation result
   *
   * @example
   * ```typescript
   * // Block a single user
   * await client.phoneNumbers.block.add(["+1234567890"]);
   *
   * // Block multiple users
   * await client.phoneNumbers.block.add(["+1234567890", "+0987654321"]);
   * ```
   */
  async add(users, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(`/${id}/block_users`, {
      messaging_product: "whatsapp",
      block_users: users.map((user) => ({ user }))
    });
  }
  /**
   * Unblock one or more users
   *
   * @see DELETE /{Phone-Number-ID}/block_users
   *
   * @param users - Array of phone numbers to unblock (with country code)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Unblock operation result
   *
   * @example
   * ```typescript
   * // Unblock a single user
   * await client.phoneNumbers.block.remove(["+1234567890"]);
   *
   * // Unblock multiple users
   * await client.phoneNumbers.block.remove(["+1234567890", "+0987654321"]);
   * ```
   */
  async remove(users, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.deleteWithBody(
      `/${id}/block_users`,
      {
        messaging_product: "whatsapp",
        block_users: users.map((user) => ({ user }))
      }
    );
  }
};

// src/resources/phoneNumbers/subresources/block/schema.ts
import { z as z4 } from "zod";
var paginationCursorsSchema = z4.object({
  after: z4.string().optional(),
  before: z4.string().optional()
});
var blockPagingSchema = z4.object({
  cursors: paginationCursorsSchema.optional()
});
var blockedUserSchema = z4.object({
  messaging_product: z4.string().optional(),
  wa_id: z4.string().optional()
});
var blockUserInputSchema = z4.object({
  user: z4.string()
});
var blockUsersRequestSchema = z4.object({
  block_users: z4.array(blockUserInputSchema),
  messaging_product: z4.literal("whatsapp").optional()
});
var blockedUserOperationSchema = z4.object({
  input: z4.string().optional(),
  wa_id: z4.string().optional()
});
var blockUsersResultSchema = z4.object({
  added_users: z4.array(blockedUserOperationSchema).optional()
});
var unblockUsersResultSchema = z4.object({
  removed_users: z4.array(blockedUserOperationSchema).optional()
});
var listBlockedUsersResponseSchema = z4.object({
  data: z4.array(blockedUserSchema).optional(),
  paging: blockPagingSchema.optional()
});
var blockUsersResponseSchema = z4.object({
  block_users: blockUsersResultSchema.optional(),
  messaging_product: z4.string().optional()
});
var unblockUsersResponseSchema = z4.object({
  block_users: unblockUsersResultSchema.optional(),
  messaging_product: z4.string().optional()
});
var listBlockedUsersOptionsSchema = z4.object({
  limit: z4.number().min(1).max(100).optional(),
  after: z4.string().optional(),
  before: z4.string().optional()
});

// src/resources/phoneNumbers/subresources/qrCodes/resource.ts
var QrCodesResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the phone number ID (from parameter or config)
   */
  getPhoneNumberId(overrideId) {
    const id = overrideId ?? this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Build query string for list options
   */
  buildQueryString(options) {
    if (!options) return "";
    const params = new URLSearchParams();
    if (options.fields) params.set("fields", options.fields);
    if (options.code) params.set("code", options.code);
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }
  /**
   * List all QR codes for a phone number
   *
   * Returns QR codes sorted by creation time (newest first).
   *
   * @see GET /{Phone-Number-ID}/message_qrdls
   *
   * @param options - Query options (fields, code filter, pagination)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns List of QR codes
   *
   * @example
   * ```typescript
   * // List all QR codes
   * const codes = await client.phoneNumbers.qrCodes.list();
   *
   * // With image URLs
   * const codes = await client.phoneNumbers.qrCodes.list({
   *   fields: "code,prefilled_message,qr_image_url.format(PNG)"
   * });
   *
   * // Filter by specific code
   * const codes = await client.phoneNumbers.qrCodes.list({
   *   code: "QRCODE123456"
   * });
   * ```
   */
  async list(options, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = this.buildQueryString(options);
    return this.httpClient.get(
      `/${id}/message_qrdls${query}`
    );
  }
  /**
   * Get a specific QR code by ID
   *
   * @see GET /{Phone-Number-ID}/message_qrdls/{QR-Code-ID}
   *
   * @param qrCodeId - The 14-character QR code identifier
   * @param fields - Optional fields to include (e.g., "code,prefilled_message,qr_image_url.format(SVG)")
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns QR code details (wrapped in data array)
   *
   * @example
   * ```typescript
   * const qr = await client.phoneNumbers.qrCodes.get("QRCODE123456");
   * console.log(qr.data[0].deep_link_url);
   *
   * // With QR image
   * const qr = await client.phoneNumbers.qrCodes.get(
   *   "QRCODE123456",
   *   "code,prefilled_message,qr_image_url.format(PNG)"
   * );
   * ```
   */
  async get(qrCodeId, fields, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get(
      `/${id}/message_qrdls/${qrCodeId}${query}`
    );
  }
  /**
   * Create a new QR code
   *
   * Creates a QR code with a pre-filled message. When scanned,
   * it opens WhatsApp with the message ready to send.
   *
   * @see POST /{Phone-Number-ID}/message_qrdls
   *
   * @param data - QR code creation data
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Created QR code details
   *
   * @example
   * ```typescript
   * // Create with PNG image
   * const qr = await client.phoneNumbers.qrCodes.create({
   *   prefilled_message: "Hi! I saw your ad and want to learn more.",
   *   generate_qr_image: "PNG"
   * });
   * console.log(qr.code);           // "QRCODE123456"
   * console.log(qr.deep_link_url);  // "https://wa.me/..."
   * console.log(qr.qr_image_url);   // "https://..."
   *
   * // Create without image (use deep_link_url to generate your own)
   * const qr = await client.phoneNumbers.qrCodes.create({
   *   prefilled_message: "Hello!"
   * });
   * ```
   */
  async create(data, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(
      `/${id}/message_qrdls`,
      data
    );
  }
  /**
   * Update an existing QR code
   *
   * Updates the pre-filled message for an existing QR code.
   * The QR code identifier and deep link URL remain the same.
   *
   * @see POST /{Phone-Number-ID}/message_qrdls
   *
   * @param data - QR code update data (must include code)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Updated QR code details
   *
   * @example
   * ```typescript
   * const qr = await client.phoneNumbers.qrCodes.update({
   *   code: "QRCODE123456",
   *   prefilled_message: "New promotional message!"
   * });
   * ```
   */
  async update(data, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(
      `/${id}/message_qrdls`,
      data
    );
  }
  /**
   * Delete a QR code
   *
   * Permanently deletes a QR code. Once deleted, the QR code and
   * deep link become invalid. This cannot be undone.
   *
   * @see DELETE /{Phone-Number-ID}/message_qrdls/{QR-Code-ID}
   *
   * @param qrCodeId - The 14-character QR code identifier
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.phoneNumbers.qrCodes.delete("QRCODE123456");
   * ```
   */
  async delete(qrCodeId, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.delete(
      `/${id}/message_qrdls/${qrCodeId}`
    );
  }
};

// src/resources/phoneNumbers/subresources/qrCodes/schema.ts
import { z as z5 } from "zod";
var qrCodeCursorsSchema = z5.object({
  before: z5.string().optional(),
  after: z5.string().optional()
});
var qrCodePagingSchema = z5.object({
  cursors: qrCodeCursorsSchema.optional(),
  previous: z5.string().optional(),
  next: z5.string().optional()
});
var qrImageFormatSchema = z5.enum(["PNG", "SVG"]);
var qrCodeSchema = z5.object({
  /** Unique 14-character QR code identifier */
  code: z5.string(),
  /** Pre-filled message text that appears in customer chat */
  prefilled_message: z5.string(),
  /** WhatsApp deep link URL for direct conversation initiation */
  deep_link_url: z5.string(),
  /** Unix timestamp when QR code was created (first-party apps only) */
  creation_time: z5.number().optional(),
  /** QR code image download URL (when format specified in fields) */
  qr_image_url: z5.string().optional()
});
var qrCodeListResponseSchema = z5.object({
  data: z5.array(qrCodeSchema),
  paging: qrCodePagingSchema.optional()
});
var qrCodeResponseSchema = z5.object({
  data: z5.array(qrCodeSchema)
});
var qrCodeMutationResponseSchema = z5.object({
  /** Unique 14-character identifier for the QR code */
  code: z5.string(),
  /** The pre-filled message text associated with this QR code */
  prefilled_message: z5.string(),
  /** WhatsApp deep link URL */
  deep_link_url: z5.string(),
  /** URL to download the QR code image (if generate_qr_image was specified) */
  qr_image_url: z5.string().optional()
});
var qrCodeDeleteResponseSchema = z5.object({
  success: z5.boolean()
});
var createQrCodeRequestSchema = z5.object({
  /** Pre-filled message text (max 140 characters) */
  prefilled_message: z5.string().max(140),
  /** QR image format - when specified, response includes qr_image_url */
  generate_qr_image: qrImageFormatSchema.optional()
});
var updateQrCodeRequestSchema = z5.object({
  /** 14-character QR code identifier to update */
  code: z5.string(),
  /** New pre-filled message text (max 140 characters) */
  prefilled_message: z5.string().max(140)
});
var qrCodeListOptionsSchema = z5.object({
  /** Comma-separated list of fields to include */
  fields: z5.string().optional(),
  /** Filter results to a specific QR code by its identifier */
  code: z5.string().optional(),
  /** Maximum number of QR codes to return (1-25) */
  limit: z5.number().min(1).max(25).optional(),
  /** Cursor for next page */
  after: z5.string().optional(),
  /** Cursor for previous page */
  before: z5.string().optional()
});

// src/resources/phoneNumbers/subresources/messageHistory/resource.ts
var MessageHistoryResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the phone number ID (from parameter or config)
   */
  getPhoneNumberId(overrideId) {
    const id = overrideId ?? this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Build query string for list options
   */
  buildQueryString(options) {
    if (!options) return "";
    const params = new URLSearchParams();
    if (options.message_id) params.set("message_id", options.message_id);
    if (options.fields) params.set("fields", options.fields);
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }
  /**
   * List message history for a phone number
   *
   * Retrieve paginated message history including delivery status events,
   * timestamps, and webhook update information.
   *
   * @see GET /{Phone-Number-ID}/message_history
   *
   * @param options - Query options (message_id filter, fields, pagination)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Paginated message history
   *
   * @example
   * ```typescript
   * // List all message history
   * const history = await client.phoneNumbers.messageHistory.list();
   *
   * // Filter by specific message
   * const history = await client.phoneNumbers.messageHistory.list({
   *   message_id: "wamid.HBgLMTIzNDU2Nzg5MAA="
   * });
   *
   * // With pagination
   * const history = await client.phoneNumbers.messageHistory.list({
   *   limit: 50
   * });
   *
   * // With detailed event fields
   * const history = await client.phoneNumbers.messageHistory.list({
   *   fields: "id,message_id,events{delivery_status,timestamp,error_description}"
   * });
   * ```
   */
  async list(options, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = this.buildQueryString(options);
    return this.httpClient.get(
      `/${id}/message_history${query}`
    );
  }
};

// src/resources/phoneNumbers/subresources/messageHistory/schema.ts
import { z as z6 } from "zod";
var messageDeliveryStatusSchema = z6.enum([
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
  "DELETED"
]);
var webhookUpdateStateSchema = z6.enum([
  "PENDING",
  "DELIVERED",
  "FAILED",
  "RETRYING"
]);
var messageHistoryCursorsSchema = z6.object({
  before: z6.string().optional(),
  after: z6.string().optional()
});
var messageHistoryPagingSchema = z6.object({
  cursors: messageHistoryCursorsSchema.optional(),
  previous: z6.string().optional(),
  next: z6.string().optional()
});
var eventApplicationSchema = z6.object({
  id: z6.string().optional()
});
var messageDeliveryStatusEventSchema = z6.object({
  /** Unique identifier for the delivery status event */
  id: z6.string(),
  /** Delivery status of the message */
  delivery_status: messageDeliveryStatusSchema,
  /** State of webhook update delivery */
  webhook_update_state: webhookUpdateStateSchema.optional(),
  /** Unix timestamp when the delivery status event occurred */
  timestamp: z6.number(),
  /** Application information for the event */
  application: eventApplicationSchema.optional(),
  /** Webhook URI where the event was delivered */
  webhook_uri: z6.string().optional(),
  /** Error description if the delivery failed */
  error_description: z6.string().optional()
});
var messageEventsSchema = z6.object({
  data: z6.array(messageDeliveryStatusEventSchema).optional(),
  paging: messageHistoryPagingSchema.optional()
});
var messageHistoryEntrySchema = z6.object({
  /** Unique identifier for the message history entry */
  id: z6.string(),
  /** WhatsApp message ID (WAMID) for the message */
  message_id: z6.string(),
  /** Message delivery status events and occurrences */
  events: messageEventsSchema.optional()
});
var messageHistoryResponseSchema = z6.object({
  data: z6.array(messageHistoryEntrySchema).optional(),
  paging: messageHistoryPagingSchema.optional()
});
var messageHistoryListOptionsSchema = z6.object({
  /** Filter results by specific WhatsApp message ID (WAMID) */
  message_id: z6.string().optional(),
  /** Comma-separated list of fields to include */
  fields: z6.string().optional(),
  /** Maximum number of entries to return (1-100, default 25) */
  limit: z6.number().min(1).max(100).optional(),
  /** Cursor for next page */
  after: z6.string().optional(),
  /** Cursor for previous page */
  before: z6.string().optional()
});

// src/resources/phoneNumbers/subresources/officialAccount/resource.ts
var OfficialAccountResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the phone number ID (from parameter or config)
   */
  getPhoneNumberId(overrideId) {
    const id = overrideId ?? this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Get Official Business Account status
   *
   * Retrieve the current OBA verification status for a phone number.
   *
   * @see GET /{Phone-Number-ID}/official_business_account
   *
   * @param fields - Comma-separated list of fields (oba_status, status_message)
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Current OBA status
   *
   * @example
   * ```typescript
   * const status = await client.phoneNumbers.officialAccount.get();
   * console.log(status.oba_status);     // "APPROVED"
   * console.log(status.status_message); // "Your account is verified"
   * ```
   */
  async get(fields, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get(
      `/${id}/official_business_account${query}`
    );
  }
  /**
   * Apply for Official Business Account verification
   *
   * Submit an application for OBA verification. Requires business website,
   * country of operation, and supporting links that demonstrate notability.
   *
   * @see POST /{Phone-Number-ID}/official_business_account
   *
   * @param data - Application data
   * @param phoneNumberId - Phone Number ID (overrides config)
   * @returns Application result with tracking ID
   *
   * @example
   * ```typescript
   * const result = await client.phoneNumbers.officialAccount.apply({
   *   business_website_url: "https://example.com",
   *   primary_country_of_operation: "US",
   *   primary_language: "en",
   *   parent_business_or_brand: "Example Corp",
   *   supporting_links: [
   *     "https://wikipedia.org/wiki/Example_Corp",
   *     "https://forbes.com/companies/example",
   *     "https://techcrunch.com/example-raises-funding",
   *     "https://linkedin.com/company/example",
   *     "https://crunchbase.com/organization/example"
   *   ],
   *   additional_supporting_information: "We are a Fortune 500 company..."
   * });
   *
   * if (result.success) {
   *   console.log("Application submitted:", result.tracking_id);
   * }
   * ```
   */
  async apply(data, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(
      `/${id}/official_business_account`,
      data
    );
  }
};

// src/resources/phoneNumbers/subresources/officialAccount/schema.ts
import { z as z7 } from "zod";
var obaStatusSchema = z7.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
  "UNDER_REVIEW",
  "EXPIRED",
  "CANCELLED"
]);
var officialAccountStatusSchema = z7.object({
  /** Unique identifier for the WhatsApp Business Account phone number */
  id: z7.string(),
  /** Current OBA verification status */
  oba_status: obaStatusSchema,
  /** Human-readable message describing the current status */
  status_message: z7.string()
});
var officialAccountApplyRequestSchema = z7.object({
  /** Official business website URL */
  business_website_url: z7.string().url(),
  /** Primary country where the business operates */
  primary_country_of_operation: z7.string(),
  /** Primary language used by the business */
  primary_language: z7.string().optional(),
  /** Parent business or brand name */
  parent_business_or_brand: z7.string().optional(),
  /** Supporting links that demonstrate business notability (min 5, max 10) */
  supporting_links: z7.array(z7.string().url()).min(5).max(10).optional(),
  /** Additional information to support the application */
  additional_supporting_information: z7.string().optional()
});
var officialAccountApplyResponseSchema = z7.object({
  /** Indicates if the operation was successful */
  success: z7.boolean(),
  /** Human-readable message describing the result */
  message: z7.string(),
  /** Updated status after the operation */
  updated_status: officialAccountStatusSchema.optional(),
  /** Unique identifier for tracking the application request */
  tracking_id: z7.string().optional()
});

// src/resources/phoneNumbers/resource.ts
var PhoneNumbersResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.block = new BlockResource(httpClient);
    this.qrCodes = new QrCodesResource(httpClient);
    this.messageHistory = new MessageHistoryResource(httpClient);
    this.officialAccount = new OfficialAccountResource(httpClient);
  }
  /**
   * Block users subresource
   *
   * @example
   * ```typescript
   * // List blocked users
   * const blocked = await client.phoneNumbers.block.list();
   *
   * // Block users
   * await client.phoneNumbers.block.add(["+1234567890"]);
   *
   * // Unblock users
   * await client.phoneNumbers.block.remove(["+1234567890"]);
   * ```
   */
  block;
  /**
   * QR Codes subresource
   *
   * @example
   * ```typescript
   * // List QR codes
   * const codes = await client.phoneNumbers.qrCodes.list();
   *
   * // Create a QR code
   * const qr = await client.phoneNumbers.qrCodes.create({
   *   prefilled_message: "Hello!",
   *   generate_qr_image: "PNG"
   * });
   *
   * // Delete a QR code
   * await client.phoneNumbers.qrCodes.delete("QRCODE123456");
   * ```
   */
  qrCodes;
  /**
   * Message History subresource
   *
   * @example
   * ```typescript
   * // List message history
   * const history = await client.phoneNumbers.messageHistory.list();
   *
   * // Filter by message ID
   * const history = await client.phoneNumbers.messageHistory.list({
   *   message_id: "wamid.ABC123..."
   * });
   * ```
   */
  messageHistory;
  /**
   * Official Business Account subresource
   *
   * @example
   * ```typescript
   * // Get OBA status
   * const status = await client.phoneNumbers.officialAccount.get();
   *
   * // Apply for OBA verification
   * await client.phoneNumbers.officialAccount.apply({
   *   business_website_url: "https://example.com",
   *   primary_country_of_operation: "US",
   *   supporting_links: ["...", "...", "...", "...", "..."]
   * });
   * ```
   */
  officialAccount;
  /**
   * Get the business ID (from parameter or config)
   */
  getBusinessId(overrideId) {
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
  getWabaId(overrideId) {
    const id = overrideId ?? this.httpClient.businessAccountId;
    if (!id) {
      throw new Error(
        "wabaId (businessAccountId) is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Get the phone number ID (from parameter or config)
   */
  getPhoneNumberId(overrideId) {
    const id = overrideId ?? this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Build query string from options
   */
  buildQueryString(options) {
    if (!options) return "";
    const params = new URLSearchParams();
    if (options.fields) params.set("fields", options.fields);
    if (options.filtering) params.set("filtering", options.filtering);
    if (options.sort) params.set("sort", options.sort);
    if (options.limit) params.set("limit", options.limit.toString());
    if (options.after) params.set("after", options.after);
    if (options.before) params.set("before", options.before);
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }
  // ===========================================================================
  // List & Get
  // ===========================================================================
  /**
   * List phone numbers in a WhatsApp Business Account
   *
   * @see GET /{WABA-ID}/phone_numbers
   *
   * @param options - Query options (fields, filtering, sort, pagination)
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns List of phone numbers
   *
   * @example
   * ```typescript
   * const numbers = await client.phoneNumbers.list();
   *
   * // With specific fields
   * const numbers = await client.phoneNumbers.list({
   *   fields: "id,display_phone_number,verified_name,quality_rating,status"
   * });
   *
   * // With filtering
   * const numbers = await client.phoneNumbers.list({
   *   filtering: JSON.stringify([{ field: "account_mode", operator: "EQUAL", value: "LIVE" }])
   * });
   * ```
   */
  async list(options, wabaId) {
    const id = this.getWabaId(wabaId);
    const query = this.buildQueryString(options);
    return this.httpClient.get(
      `/${id}/phone_numbers${query}`
    );
  }
  /**
   * Get details of a specific phone number
   *
   * @see GET /{Phone-Number-ID}
   *
   * @param phoneNumberId - Phone number ID (overrides config)
   * @param fields - Comma-separated list of fields to return
   * @returns Phone number details
   *
   * @example
   * ```typescript
   * const phone = await client.phoneNumbers.get("123456789");
   *
   * // With specific fields
   * const phone = await client.phoneNumbers.get("123456789",
   *   "id,display_phone_number,verified_name,quality_rating,status,name_status"
   * );
   * ```
   */
  async get(phoneNumberId, fields) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get(`/${id}${query}`);
  }
  // ===========================================================================
  // Add Preverified (Partner flow)
  // ===========================================================================
  /**
   * Add a preverified phone number to the Business Portfolio pool
   *
   * This is the **Partner/BSP flow** for managing phone numbers. It adds a phone
   * number to the Partner's inventory as a preverified entity. The number is NOT
   * yet in any WABA - it's just reserved and ready to be assigned.
   *
   * Use the returned `id` as `preverified_id` when calling `create()` to assign
   * the number to a specific WABA.
   *
   * @see POST /{Business-ID}/add_phone_numbers
   *
   * @param phoneNumber - Phone number in E.164 format (e.g., "+14155551234")
   * @param businessId - Business Portfolio ID (overrides config.businessId)
   * @returns The preverified phone number entity ID
   *
   * @example
   * ```typescript
   * // Step 1: Add to Partner's pool
   * const preverified = await client.phoneNumbers.addPreverified("+14155551234");
   * console.log(preverified.id); // "preverified_123"
   *
   * // Step 2: Assign to customer's WABA
   * const phone = await client.phoneNumbers.create({
   *   phone_number: "14155551234",
   *   verified_name: "Customer Corp",
   *   preverified_id: preverified.id,
   * }, "customer_waba_id");
   * ```
   */
  async addPreverified(phoneNumber, businessId) {
    const id = this.getBusinessId(businessId);
    return this.httpClient.post(
      `/${id}/add_phone_numbers`,
      { phone_number: phoneNumber }
    );
  }
  // ===========================================================================
  // Create in WABA (Standard flow)
  // ===========================================================================
  /**
   * Create a phone number in a WhatsApp Business Account
   *
   * This is the **standard flow** for adding phone numbers to a WABA. It initiates
   * the phone number onboarding process including verification and business name
   * approval.
   *
   * If you're a Partner/BSP and have a `preverified_id` from `addPreverified()`,
   * you can use it here to skip the verification step.
   *
   * @see POST /{WABA-ID}/phone_numbers
   *
   * @param data - Phone number creation data
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns The created phone number ID
   *
   * @example
   * ```typescript
   * // Standard flow: create and verify
   * const phone = await client.phoneNumbers.create({
   *   phone_number: "14155551234",  // E.164 without +
   *   verified_name: "Acme Corp",
   * });
   *
   * // With preverified_id from Partner flow
   * const phone = await client.phoneNumbers.create({
   *   phone_number: "14155551234",
   *   verified_name: "Customer Corp",
   *   preverified_id: "preverified_123",
   * });
   *
   * // Migration from on-premises
   * const phone = await client.phoneNumbers.create({
   *   phone_number: "14155551234",
   *   verified_name: "Acme Corp",
   *   migrate_phone_number: true,
   * });
   * ```
   */
  async create(data, wabaId) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.post(
      `/${id}/phone_numbers`,
      data
    );
  }
  // ===========================================================================
  // Verification
  // ===========================================================================
  /**
   * Request a verification code for a phone number
   *
   * Meta will send a verification code via SMS or voice call.
   * Use verifyCode() to submit the received code.
   *
   * @see POST /{Phone-Number-ID}/request_code
   *
   * @param data - Verification method (SMS or VOICE) and optional language
   * @param phoneNumberId - Phone number ID (overrides config)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.phoneNumbers.requestVerificationCode({
   *   code_method: "SMS",
   *   language: "en"
   * });
   * ```
   */
  async requestVerificationCode(data, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(
      `/${id}/request_code`,
      data
    );
  }
  /**
   * Submit verification code for a phone number
   *
   * Submit the code received via SMS or voice call.
   *
   * @see POST /{Phone-Number-ID}/verify_code
   *
   * @param data - The verification code
   * @param phoneNumberId - Phone number ID (overrides config)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.phoneNumbers.verifyCode({
   *   code: "123456"
   * });
   * ```
   */
  async verifyCode(data, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(
      `/${id}/verify_code`,
      data
    );
  }
  // ===========================================================================
  // Registration
  // ===========================================================================
  /**
   * Register a phone number with WhatsApp
   *
   * This activates the phone number on WhatsApp's servers.
   * The number must be verified first.
   *
   * @see POST /{Phone-Number-ID}/register
   *
   * @param data - Registration data including 6-digit PIN
   * @param phoneNumberId - Phone number ID (overrides config)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.phoneNumbers.register({
   *   messaging_product: "whatsapp",
   *   pin: "123456"  // 6-digit PIN for 2FA
   * });
   * ```
   */
  async register(data, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(
      `/${id}/register`,
      data
    );
  }
  /**
   * Deregister a phone number from WhatsApp
   *
   * This removes the phone number from WhatsApp's servers.
   * The number can be re-registered later.
   *
   * @see POST /{Phone-Number-ID}/deregister
   *
   * @param phoneNumberId - Phone number ID (overrides config)
   * @returns Success status
   */
  async deregister(phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(
      `/${id}/deregister`,
      { messaging_product: "whatsapp" }
    );
  }
  // ===========================================================================
  // Business Profile
  // ===========================================================================
  /**
   * Get the WhatsApp Business Profile for a phone number
   *
   * @see GET /{Phone-Number-ID}/whatsapp_business_profile
   *
   * @param phoneNumberId - Phone number ID (overrides config)
   * @param fields - Comma-separated list of fields
   * @returns Business profile data
   *
   * @example
   * ```typescript
   * const profile = await client.phoneNumbers.getProfile();
   * console.log(profile.data[0].about);
   * ```
   */
  async getProfile(phoneNumberId, fields) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const defaultFields = "about,address,description,email,profile_picture_url,websites,vertical";
    const query = `?fields=${fields ?? defaultFields}`;
    return this.httpClient.get(
      `/${id}/whatsapp_business_profile${query}`
    );
  }
  /**
   * Update the WhatsApp Business Profile for a phone number
   *
   * @see POST /{Phone-Number-ID}/whatsapp_business_profile
   *
   * @param data - Profile data to update
   * @param phoneNumberId - Phone number ID (overrides config)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.phoneNumbers.updateProfile({
   *   messaging_product: "whatsapp",
   *   about: "Welcome to our business!",
   *   description: "We provide excellent service.",
   *   vertical: "RETAIL"
   * });
   * ```
   */
  async updateProfile(data, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post(
      `/${id}/whatsapp_business_profile`,
      data
    );
  }
};

// src/resources/phoneNumbers/schema.ts
import { z as z8 } from "zod";
var phoneNumberQualityRatingSchema = z8.enum([
  "GREEN",
  "YELLOW",
  "RED",
  "UNKNOWN",
  "NA"
]);
var phoneNumberStatusSchema = z8.enum([
  "PENDING",
  "LINKED",
  "UNLINKED",
  "DELETED",
  "MIGRATED",
  "BANNED",
  "RESTRICTED",
  "CONNECTED",
  "DISCONNECTED",
  "FLAGGED",
  "RATE_LIMITED"
]);
var codeVerificationStatusSchema = z8.enum([
  "VERIFIED",
  "NOT_VERIFIED",
  "EXPIRED"
]);
var unifiedCertStatusSchema = z8.enum([
  "APPROVED",
  "NAME_PENDING_REVIEW",
  "NAME_NOT_APPROVED",
  "ACCOUNT_REVIEW_NOT_STARTED",
  "LIMITED_ACCESS"
]);
var accountModeSchema = z8.enum(["LIVE", "SANDBOX"]);
var hostPlatformSchema = z8.enum([
  "CLOUD_API",
  "ON_PREMISE",
  "NOT_APPLICABLE"
]);
var nameStatusSchema = z8.enum([
  "APPROVED",
  "AVAILABLE_WITHOUT_REVIEW",
  "DECLINED",
  "EXPIRED",
  "PENDING_REVIEW",
  "NONE"
]);
var messagingLimitTierSchema = z8.enum([
  "TIER_50",
  "TIER_250",
  "TIER_1K",
  "TIER_10K",
  "TIER_100K",
  "TIER_UNLIMITED"
]);
var codeMethodSchema = z8.enum(["SMS", "VOICE"]);
var verticalSchema = z8.enum([
  "UNDEFINED",
  "OTHER",
  "AUTO",
  "BEAUTY",
  "APPAREL",
  "EDU",
  "ENTERTAIN",
  "EVENT_PLAN",
  "FINANCE",
  "GROCERY",
  "GOVT",
  "HOTEL",
  "HEALTH",
  "NONPROFIT",
  "PROF_SERVICES",
  "RETAIL",
  "TRAVEL",
  "RESTAURANT",
  "NOT_A_BIZ"
]);
var phoneNumberResponseSchema = z8.object({
  id: z8.string(),
  display_phone_number: z8.string(),
  verified_name: z8.string().optional(),
  status: phoneNumberStatusSchema.optional(),
  quality_rating: phoneNumberQualityRatingSchema.optional(),
  country_code: z8.string().optional(),
  country_dial_code: z8.string().optional(),
  code_verification_status: codeVerificationStatusSchema.optional(),
  unified_cert_status: unifiedCertStatusSchema.optional(),
  account_mode: accountModeSchema.optional(),
  host_platform: hostPlatformSchema.optional(),
  messaging_limit_tier: messagingLimitTierSchema.optional(),
  is_official_business_account: z8.boolean().optional(),
  username: z8.string().optional(),
  name_status: nameStatusSchema.optional(),
  certificate: z8.string().optional(),
  is_pin_enabled: z8.boolean().optional(),
  search_visibility: z8.string().optional()
});
var cursorPagingSchema2 = z8.object({
  cursors: z8.object({
    before: z8.string().optional(),
    after: z8.string().optional()
  }).optional(),
  previous: z8.string().optional(),
  next: z8.string().optional()
});
var phoneNumberListResponseSchema = z8.object({
  data: z8.array(phoneNumberResponseSchema),
  paging: cursorPagingSchema2.optional()
});
var phoneNumberListOptionsSchema = z8.object({
  fields: z8.string().optional(),
  filtering: z8.string().optional(),
  sort: z8.enum([
    "creation_time.asc",
    "creation_time.desc",
    "last_onboarded_time.asc",
    "last_onboarded_time.desc"
  ]).optional(),
  limit: z8.number().min(1).max(100).optional(),
  after: z8.string().optional(),
  before: z8.string().optional()
});
var addPreverifiedRequestSchema = z8.object({
  phone_number: z8.string()
});
var addPreverifiedResponseSchema = z8.object({
  id: z8.string()
});
var phoneNumberCreateRequestSchema = z8.object({
  /** Phone number in E.164 format without the + prefix */
  phone_number: z8.string(),
  /** Business name to be verified for this phone number */
  verified_name: z8.string(),
  /** Country code for the phone number */
  cc: z8.string().optional(),
  /** Whether this is a phone number migration from on-premises */
  migrate_phone_number: z8.boolean().optional(),
  /** Pre-verified phone number ID for BSP scenarios (from addPreverified) */
  preverified_id: z8.string().optional()
});
var phoneNumberCreateResponseSchema = z8.object({
  id: z8.string()
});
var phoneNumberRegisterSchema = z8.object({
  messaging_product: z8.literal("whatsapp"),
  pin: z8.string().min(6).max(6)
});
var phoneNumberRegisterResponseSchema = z8.object({
  success: z8.boolean()
});
var requestVerificationCodeSchema = z8.object({
  code_method: codeMethodSchema,
  language: z8.string().optional()
});
var verifyCodeSchema = z8.object({
  code: z8.string()
});
var verificationResponseSchema = z8.object({
  success: z8.boolean()
});
var businessProfileSchema = z8.object({
  messaging_product: z8.literal("whatsapp").optional(),
  about: z8.string().max(139).optional(),
  address: z8.string().max(256).optional(),
  description: z8.string().max(512).optional(),
  email: z8.string().email().optional(),
  profile_picture_url: z8.string().url().optional(),
  websites: z8.array(z8.string().url()).max(2).optional(),
  vertical: verticalSchema.optional()
});
var businessProfileResponseSchema = z8.object({
  data: z8.array(businessProfileSchema)
});
var businessProfileUpdateSchema = businessProfileSchema.extend({
  messaging_product: z8.literal("whatsapp")
});
var businessProfileUpdateResponseSchema = z8.object({
  success: z8.boolean()
});

// src/resources/messages/schema.ts
import { z as z9 } from "zod";
var phoneNumberSchema = z9.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format (use E.164: +1234567890)");
var messageTextContentSchema = z9.object({
  body: z9.string().min(1).max(4096),
  preview_url: z9.boolean().optional()
});
var messageImageContentSchema = z9.object({
  id: z9.string().optional(),
  link: z9.string().url().optional(),
  caption: z9.string().max(1024).optional()
}).refine((data) => data.link || data.id, "Either link or id must be provided");
var messageLocationContentSchema = z9.object({
  longitude: z9.number().min(-180).max(180),
  latitude: z9.number().min(-90).max(90),
  name: z9.string().optional(),
  address: z9.string().optional()
});
var messageReactionContentSchema = z9.object({
  message_id: z9.string().min(1),
  emoji: z9.string().min(1).max(1)
});
var messageSendTextSchema = z9.object({
  to: phoneNumberSchema,
  text: messageTextContentSchema
});
var messageSendImageSchema = z9.object({
  to: phoneNumberSchema,
  image: messageImageContentSchema
});
var messageSendLocationSchema = z9.object({
  to: phoneNumberSchema,
  location: messageLocationContentSchema
});
var messageSendReactionSchema = z9.object({
  to: phoneNumberSchema,
  reaction: messageReactionContentSchema
});
var messageTextSchema = messageSendTextSchema.extend({
  type: z9.literal("text")
});
var messageImageSchema = messageSendImageSchema.extend({
  type: z9.literal("image")
});
var messageLocationSchema = messageSendLocationSchema.extend({
  type: z9.literal("location")
});
var messageReactionSchema = messageSendReactionSchema.extend({
  type: z9.literal("reaction")
});
var messageOutgoingSchema = z9.discriminatedUnion("type", [
  messageTextSchema,
  messageImageSchema,
  messageLocationSchema,
  messageReactionSchema
]);
var messageSendResponseSchema = z9.object({
  messaging_product: z9.literal("whatsapp"),
  contacts: z9.array(
    z9.object({
      input: z9.string(),
      wa_id: z9.string()
    })
  ),
  messages: z9.array(
    z9.object({
      id: z9.string(),
      message_status: z9.string().optional()
    })
  )
});
var incomingMessageBaseSchema = z9.object({
  from: z9.string(),
  id: z9.string(),
  timestamp: z9.string()
});
var messageIncomingTextSchema = incomingMessageBaseSchema.extend({
  type: z9.literal("text"),
  text: z9.object({
    body: z9.string()
  })
});
var messageIncomingImageSchema = incomingMessageBaseSchema.extend({
  type: z9.literal("image"),
  image: z9.object({
    id: z9.string(),
    mime_type: z9.string().optional(),
    caption: z9.string().optional()
  })
});
var messageIncomingAudioSchema = incomingMessageBaseSchema.extend({
  type: z9.literal("audio"),
  audio: z9.object({
    id: z9.string(),
    mime_type: z9.string().optional()
  })
});
var messageIncomingSchema = z9.discriminatedUnion("type", [
  messageIncomingTextSchema,
  messageIncomingImageSchema,
  messageIncomingAudioSchema
]);

// src/resources/messages/utils.ts
function buildMessagePayload(to, type, content) {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type,
    ...content
  };
}

// src/resources/messages/resource.ts
var MessagesResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the phone number ID (with validation)
   */
  getPhoneNumberId(overrideId) {
    const id = overrideId || this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Send a text message
   *
   * @param input - Text message input
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * await client.messages.sendText({
   *   to: "+1234567890",
   *   text: { body: "Hello, world!" }
   * });
   * ```
   */
  async sendText(input, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = messageSendTextSchema.parse(input);
    const payload = buildMessagePayload(data.to, "text", { text: data.text });
    return this.httpClient.post(`/${id}/messages`, payload);
  }
  /**
   * Send an image message
   *
   * @param input - Image message input
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * // Using a URL
   * await client.messages.sendImage({
   *   to: "+1234567890",
   *   image: { link: "https://example.com/photo.jpg", caption: "Check this out!" }
   * });
   *
   * // Using a media ID
   * await client.messages.sendImage({
   *   to: "+1234567890",
   *   image: { id: "media_id_from_upload" }
   * });
   * ```
   */
  async sendImage(input, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = messageSendImageSchema.parse(input);
    const payload = buildMessagePayload(data.to, "image", { image: data.image });
    return this.httpClient.post(`/${id}/messages`, payload);
  }
  /**
   * Send a location message
   *
   * @param input - Location message input
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * await client.messages.sendLocation({
   *   to: "+1234567890",
   *   location: {
   *     latitude: 37.7749,
   *     longitude: -122.4194,
   *     name: "San Francisco",
   *     address: "California, USA"
   *   }
   * });
   * ```
   */
  async sendLocation(input, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = messageSendLocationSchema.parse(input);
    const payload = buildMessagePayload(data.to, "location", {
      location: data.location
    });
    return this.httpClient.post(`/${id}/messages`, payload);
  }
  /**
   * Send a reaction to a message
   *
   * @param input - Reaction input
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * await client.messages.sendReaction({
   *   to: "+1234567890",
   *   reaction: {
   *     message_id: "wamid.xxx",
   *     emoji: "👍"
   *   }
   * });
   * ```
   */
  async sendReaction(input, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = messageSendReactionSchema.parse(input);
    const payload = buildMessagePayload(data.to, "reaction", {
      reaction: data.reaction
    });
    return this.httpClient.post(`/${id}/messages`, payload);
  }
  /**
   * Send any message type using the discriminated union
   *
   * @param message - Any outgoing message (text, image, location, reaction)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   *
   * @example
   * ```typescript
   * await client.messages.send({
   *   type: "text",
   *   to: "+1234567890",
   *   text: { body: "Hello!" }
   * });
   * ```
   */
  async send(message, phoneNumberId) {
    switch (message.type) {
      case "text":
        return this.sendText(message, phoneNumberId);
      case "image":
        return this.sendImage(message, phoneNumberId);
      case "location":
        return this.sendLocation(message, phoneNumberId);
      case "reaction":
        return this.sendReaction(message, phoneNumberId);
    }
  }
};

// src/resources/templates/schema.ts
import { z as z10 } from "zod";
var templateLanguageSchema = z10.enum([
  "af",
  // Afrikaans
  "sq",
  // Albanian
  "ar",
  // Arabic
  "ar_EG",
  // Arabic (Egypt)
  "ar_AE",
  // Arabic (UAE)
  "ar_LB",
  // Arabic (Lebanon)
  "ar_MA",
  // Arabic (Morocco)
  "ar_QA",
  // Arabic (Qatar)
  "az",
  // Azerbaijani
  "be_BY",
  // Belarusian
  "bn",
  // Bengali
  "bn_IN",
  // Bengali (India)
  "bg",
  // Bulgarian
  "ca",
  // Catalan
  "zh_CN",
  // Chinese (China)
  "zh_HK",
  // Chinese (Hong Kong)
  "zh_TW",
  // Chinese (Taiwan)
  "hr",
  // Croatian
  "cs",
  // Czech
  "da",
  // Danish
  "prs_AF",
  // Dari
  "nl",
  // Dutch
  "nl_BE",
  // Dutch (Belgium)
  "en",
  // English
  "en_GB",
  // English (UK)
  "en_US",
  // English (US)
  "en_AE",
  // English (UAE)
  "en_AU",
  // English (Australia)
  "en_CA",
  // English (Canada)
  "en_GH",
  // English (Ghana)
  "en_IE",
  // English (Ireland)
  "en_IN",
  // English (India)
  "en_JM",
  // English (Jamaica)
  "en_MY",
  // English (Malaysia)
  "en_NZ",
  // English (New Zealand)
  "en_QA",
  // English (Qatar)
  "en_SG",
  // English (Singapore)
  "en_UG",
  // English (Uganda)
  "en_ZA",
  // English (South Africa)
  "et",
  // Estonian
  "fil",
  // Filipino
  "fi",
  // Finnish
  "fr",
  // French
  "fr_BE",
  // French (Belgium)
  "fr_CA",
  // French (Canada)
  "fr_CH",
  // French (Switzerland)
  "fr_CI",
  // French (Ivory Coast)
  "fr_MA",
  // French (Morocco)
  "ka",
  // Georgian
  "de",
  // German
  "de_AT",
  // German (Austria)
  "de_CH",
  // German (Switzerland)
  "el",
  // Greek
  "gu",
  // Gujarati
  "ha",
  // Hausa
  "he",
  // Hebrew
  "hi",
  // Hindi
  "hu",
  // Hungarian
  "id",
  // Indonesian
  "ga",
  // Irish
  "it",
  // Italian
  "ja",
  // Japanese
  "kn",
  // Kannada
  "kk",
  // Kazakh
  "rw_RW",
  // Kinyarwanda
  "ko",
  // Korean
  "ky_KG",
  // Kyrgyz
  "lo",
  // Lao
  "lv",
  // Latvian
  "lt",
  // Lithuanian
  "mk",
  // Macedonian
  "ms",
  // Malay
  "ml",
  // Malayalam
  "mr",
  // Marathi
  "nb",
  // Norwegian
  "ps_AF",
  // Pashto
  "fa",
  // Persian
  "pl",
  // Polish
  "pt_BR",
  // Portuguese (Brazil)
  "pt_PT",
  // Portuguese (Portugal)
  "pa",
  // Punjabi
  "ro",
  // Romanian
  "ru",
  // Russian
  "sr",
  // Serbian
  "si_LK",
  // Sinhala
  "sk",
  // Slovak
  "sl",
  // Slovenian
  "es",
  // Spanish
  "es_AR",
  // Spanish (Argentina)
  "es_CL",
  // Spanish (Chile)
  "es_CO",
  // Spanish (Colombia)
  "es_CR",
  // Spanish (Costa Rica)
  "es_DO",
  // Spanish (Dominican Republic)
  "es_EC",
  // Spanish (Ecuador)
  "es_HN",
  // Spanish (Honduras)
  "es_MX",
  // Spanish (Mexico)
  "es_PA",
  // Spanish (Panama)
  "es_PE",
  // Spanish (Peru)
  "es_ES",
  // Spanish (Spain)
  "es_UY",
  // Spanish (Uruguay)
  "sw",
  // Swahili
  "sv",
  // Swedish
  "ta",
  // Tamil
  "te",
  // Telugu
  "th",
  // Thai
  "tr",
  // Turkish
  "uk",
  // Ukrainian
  "ur",
  // Urdu
  "uz",
  // Uzbek
  "vi",
  // Vietnamese
  "zu"
  // Zulu
]);
var templateCategorySchema = z10.enum([
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY"
]);
var templateParameterFormatSchema = z10.enum(["positional", "named"]);
var templateStatusSchema = z10.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "PAUSED",
  "DISABLED",
  "IN_APPEAL",
  "PENDING_DELETION",
  "DELETED",
  "LIMIT_EXCEEDED"
]);
var templateQualityScoreSchema = z10.object({
  score: z10.enum(["GREEN", "YELLOW", "RED", "UNKNOWN"]).optional(),
  date: z10.number().optional()
});
var templateNamedParamExampleSchema = z10.object({
  param_name: z10.string(),
  example: z10.string()
});
var templateQuickReplyButtonInputSchema = z10.object({
  type: z10.literal("QUICK_REPLY"),
  text: z10.string().min(1).max(25, "Button text must be 25 characters or less")
});
var templateUrlButtonInputSchema = z10.object({
  type: z10.literal("URL"),
  text: z10.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: z10.string().url().max(2e3, "URL must be 2000 characters or less"),
  example: z10.array(z10.string()).optional()
});
var templatePhoneNumberButtonInputSchema = z10.object({
  type: z10.literal("PHONE_NUMBER"),
  text: z10.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: z10.string().min(1).max(20, "Phone number must be 20 characters or less")
});
var templateCopyCodeButtonInputSchema = z10.object({
  type: z10.literal("COPY_CODE"),
  example: z10.string().max(15).optional()
});
var templateFlowButtonInputSchema = z10.object({
  type: z10.literal("FLOW"),
  text: z10.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_id: z10.string().optional(),
  flow_action: z10.enum(["navigate", "data_exchange"]).optional(),
  navigate_screen: z10.string().optional()
});
var templateButtonInputSchema = z10.discriminatedUnion("type", [
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema
]);
var templateHeaderTextExampleSchema = z10.object({
  // Positional: header_text: ["value1"]
  header_text: z10.array(z10.string()).optional(),
  // Named: header_text_named_params: [{ param_name: "name", example: "value" }]
  header_text_named_params: z10.array(templateNamedParamExampleSchema).optional()
});
var templateHeaderTextInputSchema = z10.object({
  type: z10.literal("HEADER"),
  format: z10.literal("TEXT"),
  text: z10.string().min(1).max(60, "Header text must be 60 characters or less"),
  example: templateHeaderTextExampleSchema.optional()
});
var templateHeaderMediaInputSchema = z10.object({
  type: z10.literal("HEADER"),
  format: z10.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  example: z10.object({
    header_handle: z10.array(z10.string()).min(1, "At least one header_handle is required")
  })
});
var templateHeaderLocationInputSchema = z10.object({
  type: z10.literal("HEADER"),
  format: z10.literal("LOCATION")
});
var templateHeaderComponentInputSchema = z10.discriminatedUnion(
  "format",
  [
    templateHeaderTextInputSchema,
    templateHeaderMediaInputSchema,
    templateHeaderLocationInputSchema
  ]
);
var templateBodyExampleSchema = z10.object({
  // Positional: body_text: [["value1", "value2"]]
  body_text: z10.array(z10.array(z10.string())).optional(),
  // Named: body_text_named_params: [{ param_name: "name", example: "value" }]
  body_text_named_params: z10.array(templateNamedParamExampleSchema).optional()
});
var templateBodyComponentInputSchema = z10.object({
  type: z10.literal("BODY"),
  text: z10.string().min(1).max(1024, "Body text must be 1024 characters or less"),
  example: templateBodyExampleSchema.optional()
});
var templateFooterComponentInputSchema = z10.object({
  type: z10.literal("FOOTER"),
  text: z10.string().min(1).max(60, "Footer text must be 60 characters or less")
});
var templateButtonsComponentInputSchema = z10.object({
  type: z10.literal("BUTTONS"),
  buttons: z10.array(templateButtonInputSchema).min(1).max(10, "Maximum 10 buttons allowed")
});
var templateComponentInputSchema = z10.union([
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema
]);
var templateButtonSchema = z10.object({
  type: z10.string(),
  text: z10.string().optional(),
  url: z10.string().optional(),
  phone_number: z10.string().optional(),
  example: z10.union([z10.array(z10.string()), z10.string()]).optional(),
  flow_id: z10.string().optional(),
  flow_action: z10.string().optional(),
  navigate_screen: z10.string().optional()
});
var templateComponentSchema = z10.object({
  type: z10.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  format: z10.string().optional(),
  text: z10.string().optional(),
  buttons: z10.array(templateButtonSchema).optional(),
  example: z10.object({
    header_text: z10.array(z10.string()).optional(),
    header_text_named_params: z10.array(templateNamedParamExampleSchema).optional(),
    header_handle: z10.array(z10.string()).optional(),
    body_text: z10.array(z10.array(z10.string())).optional(),
    body_text_named_params: z10.array(templateNamedParamExampleSchema).optional()
  }).optional()
});
var hasBody = (components) => components.some((c) => c.type === "BODY");
var hasMaxOneHeader = (components) => components.filter((c) => c.type === "HEADER").length <= 1;
var hasMaxOneFooter = (components) => components.filter((c) => c.type === "FOOTER").length <= 1;
var hasMaxOneButtons = (components) => components.filter((c) => c.type === "BUTTONS").length <= 1;
var baseComponentsSchema = z10.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" }).refine(hasMaxOneHeader, { message: "Only one HEADER component is allowed" }).refine(hasMaxOneFooter, { message: "Only one FOOTER component is allowed" }).refine(hasMaxOneButtons, {
  message: "Only one BUTTONS component is allowed"
});
var templateNameSchema = z10.string().min(1, "Template name is required").max(512, "Template name must be 512 characters or less");
var templateCreateMarketingSchema = z10.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z10.literal("MARKETING"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateUtilitySchema = z10.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z10.literal("UTILITY"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateAuthenticationSchema = z10.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z10.literal("AUTHENTICATION"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: z10.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" })
});
var templateCreateSchema = z10.discriminatedUnion("category", [
  templateCreateMarketingSchema,
  templateCreateUtilitySchema,
  templateCreateAuthenticationSchema
]);
var templateUpdateSchema = z10.object({
  category: templateCategorySchema.optional(),
  components: z10.array(templateComponentInputSchema).optional(),
  language: templateLanguageSchema.optional(),
  name: z10.string().min(1).max(512).optional()
});
var templateListSchema = z10.object({
  name: z10.string().optional(),
  limit: z10.number().min(1).max(1e3).optional(),
  after: z10.string().optional(),
  before: z10.string().optional()
});
var templateDeleteSchema = z10.object({
  name: z10.string().optional(),
  hsm_id: z10.string().optional()
}).refine((data) => data.name || data.hsm_id, {
  message: "Either name or hsm_id must be provided"
});
var templateSchema = z10.object({
  id: z10.string(),
  name: z10.string(),
  language: z10.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
  components: z10.array(templateComponentSchema),
  parameter_format: templateParameterFormatSchema.optional(),
  quality_score: templateQualityScoreSchema.optional(),
  rejected_reason: z10.string().optional(),
  previous_category: z10.string().optional()
});
var templateCreateResponseSchema = z10.object({
  id: z10.string(),
  status: templateStatusSchema,
  category: templateCategorySchema
});
var templatePagingCursorsSchema = z10.object({
  before: z10.string().optional(),
  after: z10.string().optional()
});
var templatePagingSchema = z10.object({
  cursors: templatePagingCursorsSchema.optional(),
  next: z10.string().optional(),
  previous: z10.string().optional()
});
var templateListResponseSchema = z10.object({
  data: z10.array(templateSchema),
  paging: templatePagingSchema.optional()
});
var templateUpdateResponseSchema = z10.object({
  success: z10.boolean()
});
var templateDeleteResponseSchema = z10.object({
  success: z10.boolean()
});

// src/resources/templates/resource.ts
var TemplatesResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the business account ID (with validation)
   */
  getBusinessAccountId(overrideId) {
    const id = overrideId || this.httpClient.businessAccountId;
    if (!id) {
      throw new Error(
        "businessAccountId (WABA ID) is required for templates. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Create a message template
   *
   * @param input - Template creation input
   * @param businessAccountId - Optional WABA ID (overrides client config)
   * @returns Created template info (id, status, category)
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * const response = await client.templates.create({
   *   name: "welcome_message",
   *   category: "MARKETING",
   *   language: "en_US",
   *   components: [
   *     { type: "HEADER", format: "TEXT", text: "Welcome!" },
   *     {
   *       type: "BODY",
   *       text: "Hello {{1}}, thanks for joining us!",
   *       example: { body_text: [["Pablo"]] }
   *     },
   *     { type: "FOOTER", text: "Reply STOP to unsubscribe" }
   *   ]
   * });
   * ```
   */
  async create(input, businessAccountId) {
    const wabaId = this.getBusinessAccountId(businessAccountId);
    const body = templateCreateSchema.parse(input);
    return this.httpClient.post(
      `/${wabaId}/message_templates`,
      body
    );
  }
  /**
   * List message templates
   *
   * @param options - Optional filter/pagination options
   * @param businessAccountId - Optional WABA ID (overrides client config)
   * @returns List of templates with pagination info
   * @throws {ZodError} If options validation fails
   *
   * @example
   * ```typescript
   * // List all templates
   * const all = await client.templates.list();
   *
   * // Filter by name
   * const filtered = await client.templates.list({ name: "welcome" });
   *
   * // With pagination
   * const page = await client.templates.list({ limit: 10, after: "cursor" });
   * ```
   */
  async list(options, businessAccountId) {
    const wabaId = this.getBusinessAccountId(businessAccountId);
    const query = options ? templateListSchema.parse(options) : {};
    const params = new URLSearchParams();
    if (query.name) params.append("name", query.name);
    if (query.limit) params.append("limit", query.limit.toString());
    if (query.after) params.append("after", query.after);
    if (query.before) params.append("before", query.before);
    const queryString = params.toString();
    const path = queryString ? `/${wabaId}/message_templates?${queryString}` : `/${wabaId}/message_templates`;
    return this.httpClient.get(path);
  }
  /**
   * Get a template by ID
   *
   * Note: Uses template ID directly (no WABA prefix needed)
   *
   * @param templateId - The template ID
   * @returns Template details
   *
   * @example
   * ```typescript
   * const template = await client.templates.get("123456789012345");
   * console.log(template.name, template.status);
   * ```
   */
  async get(templateId) {
    if (!templateId?.trim()) {
      throw new Error("Template ID is required");
    }
    return this.httpClient.get(`/${templateId}`);
  }
  /**
   * Update a template
   *
   * Note: Uses template ID directly (no WABA prefix needed)
   *
   * @param templateId - The template ID
   * @param input - Fields to update
   * @returns Success status
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * await client.templates.update("123456789012345", {
   *   components: [
   *     { type: "BODY", text: "Updated message text" }
   *   ]
   * });
   * ```
   */
  async update(templateId, input) {
    if (!templateId?.trim()) {
      throw new Error("Template ID is required");
    }
    const body = templateUpdateSchema.parse(input);
    return this.httpClient.post(`/${templateId}`, body);
  }
  /**
   * Delete a template
   *
   * @param input - Delete by name or hsm_id
   * @param businessAccountId - Optional WABA ID (overrides client config)
   * @returns Success status
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * // Delete by name
   * await client.templates.delete({ name: "old_template" });
   *
   * // Delete by template ID (hsm_id)
   * await client.templates.delete({ hsm_id: "123456789012345" });
   * ```
   */
  async delete(input, businessAccountId) {
    const wabaId = this.getBusinessAccountId(businessAccountId);
    const query = templateDeleteSchema.parse(input);
    const params = new URLSearchParams();
    if (query.name) params.append("name", query.name);
    if (query.hsm_id) params.append("hsm_id", query.hsm_id);
    return this.httpClient.delete(
      `/${wabaId}/message_templates?${params.toString()}`
    );
  }
};

// src/resources/templates/utils.ts
function toTemplateName(input) {
  return input.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "").replace(/_+/g, "_").replace(/^_|_$/g, "");
}

// src/resources/media/schema.ts
import { z as z11 } from "zod";
var mediaTypeSchema = z11.enum([
  "image",
  "video",
  "audio",
  "document",
  "sticker"
]);
var mediaMimeTypeSchema = z11.string();
var mediaUploadSchema = z11.object({
  /**
   * The file to upload - can be Buffer, Blob, or File
   */
  file: z11.union([z11.instanceof(Blob), z11.instanceof(ArrayBuffer)]),
  /**
   * MIME type of the file (e.g., "image/jpeg", "video/mp4")
   */
  mimeType: z11.string().min(1),
  /**
   * Optional filename
   */
  filename: z11.string().optional()
});
var mediaUploadResponseSchema = z11.object({
  id: z11.string()
});
var mediaMetadataSchema = z11.object({
  messaging_product: z11.literal("whatsapp"),
  url: z11.string(),
  mime_type: z11.string(),
  sha256: z11.string(),
  file_size: z11.string(),
  id: z11.string()
});
var mediaDeleteResponseSchema = z11.object({
  success: z11.boolean()
});

// src/resources/media/resource.ts
var MediaResource = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Get the phone number ID (with validation)
   */
  getPhoneNumberId(overrideId) {
    const id = overrideId || this.httpClient.phoneNumberId;
    if (!id) {
      throw new Error(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return id;
  }
  /**
   * Upload media to WhatsApp
   *
   * Uploaded media persists for 30 days unless deleted.
   * Returns a media ID that can be used in messages or templates.
   *
   * @param input - Upload input (file, mimeType, optional filename)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   * @returns Media ID
   * @throws {ZodError} If input validation fails
   *
   * @example
   * ```typescript
   * // Upload an image
   * const { id } = await client.media.upload({
   *   file: imageBuffer,
   *   mimeType: "image/jpeg",
   *   filename: "photo.jpg"
   * });
   *
   * // Use in a message
   * await client.messages.sendImage({
   *   to: "+1234567890",
   *   image: { id }
   * });
   * ```
   */
  async upload(input, phoneNumberId) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const data = mediaUploadSchema.parse(input);
    const formData = new FormData();
    formData.append("messaging_product", "whatsapp");
    const blob = data.file instanceof Blob ? data.file : new Blob([data.file], { type: data.mimeType });
    formData.append("file", blob, data.filename || "file");
    formData.append("type", data.mimeType);
    const url = `${this.httpClient.baseURL}/${this.httpClient.apiVersion}/${id}/media`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.httpClient.accessToken}`
      },
      body: formData
    });
    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        error: { message: response.statusText, type: "HTTPError", code: response.status }
      }));
      throw new GraphAPIError(errorResponse, response.status);
    }
    return response.json();
  }
  /**
   * Get media metadata including download URL
   *
   * The returned URL is only valid for 5 minutes.
   * If expired, call this method again to get a fresh URL.
   *
   * @param mediaId - Media ID from upload or webhook
   * @param phoneNumberId - Optional phone number ID (validates ownership)
   * @returns Media metadata including download URL
   *
   * @example
   * ```typescript
   * const metadata = await client.media.get(mediaId);
   * console.log(metadata.mime_type);  // "image/jpeg"
   * console.log(metadata.file_size);  // "12345"
   * console.log(metadata.url);        // Download URL (5 min expiry)
   * ```
   */
  async get(mediaId, phoneNumberId) {
    if (!mediaId?.trim()) {
      throw new Error("Media ID is required");
    }
    const params = new URLSearchParams();
    if (phoneNumberId) {
      params.append("phone_number_id", phoneNumberId);
    }
    const query = params.toString();
    const path = query ? `/${mediaId}?${query}` : `/${mediaId}`;
    return this.httpClient.get(path);
  }
  /**
   * Download media binary data
   *
   * This is a convenience method that:
   * 1. Gets the media URL (via `get()`)
   * 2. Downloads the binary content
   *
   * @param mediaId - Media ID from upload or webhook
   * @returns Binary data as ArrayBuffer
   *
   * @example
   * ```typescript
   * const buffer = await client.media.download(message.image.id);
   *
   * // Save to file (Node.js)
   * fs.writeFileSync("image.jpg", Buffer.from(buffer));
   *
   * // Upload to S3
   * await s3.upload({ Body: Buffer.from(buffer), Key: "image.jpg" });
   * ```
   */
  async download(mediaId) {
    if (!mediaId?.trim()) {
      throw new Error("Media ID is required");
    }
    const metadata = await this.get(mediaId);
    const response = await fetch(metadata.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.httpClient.accessToken}`
      }
    });
    if (!response.ok) {
      const errorResponse = await response.json().catch(() => ({
        error: { message: response.statusText, type: "HTTPError", code: response.status }
      }));
      throw new GraphAPIError(errorResponse, response.status);
    }
    return response.arrayBuffer();
  }
  /**
   * Delete media
   *
   * @param mediaId - Media ID to delete
   * @param phoneNumberId - Optional phone number ID (validates ownership)
   * @returns Success status
   *
   * @example
   * ```typescript
   * await client.media.delete(mediaId);
   * ```
   */
  async delete(mediaId, phoneNumberId) {
    if (!mediaId?.trim()) {
      throw new Error("Media ID is required");
    }
    const params = new URLSearchParams();
    if (phoneNumberId) {
      params.append("phone_number_id", phoneNumberId);
    }
    const query = params.toString();
    const path = query ? `/${mediaId}?${query}` : `/${mediaId}`;
    return this.httpClient.delete(path);
  }
};

// src/resources/webhooks/schema.ts
import { z as z12 } from "zod";
var webhookContactSchema = z12.object({
  profile: z12.object({
    name: z12.string()
  }),
  wa_id: z12.string()
});
var webhookMetadataSchema = z12.object({
  display_phone_number: z12.string(),
  phone_number_id: z12.string()
});
var webhookConversationOriginSchema = z12.object({
  type: z12.enum([
    "authentication",
    "authentication_international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var webhookConversationSchema = z12.object({
  id: z12.string(),
  expiration_timestamp: z12.string().optional(),
  origin: webhookConversationOriginSchema
});
var webhookPricingSchema = z12.object({
  billable: z12.boolean(),
  pricing_model: z12.enum(["CBP", "PMP"]),
  type: z12.enum(["regular", "free_customer_service", "free_entry_point"]),
  category: z12.enum([
    "authentication",
    "authentication-international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var webhookStatusErrorSchema = z12.object({
  code: z12.number(),
  title: z12.string(),
  message: z12.string(),
  error_data: z12.object({
    details: z12.string()
  }),
  href: z12.string()
});
var webhookStatusSchema = z12.object({
  id: z12.string(),
  status: z12.enum(["sent", "delivered", "read", "failed", "played"]),
  timestamp: z12.string(),
  recipient_id: z12.string(),
  recipient_type: z12.literal("group").optional(),
  recipient_participant_id: z12.string().optional(),
  recipient_identity_key_hash: z12.string().optional(),
  biz_opaque_callback_data: z12.string().optional(),
  conversation: webhookConversationSchema.optional(),
  pricing: webhookPricingSchema.optional(),
  errors: z12.array(webhookStatusErrorSchema).optional()
});
var webhookValueSchema = z12.object({
  messaging_product: z12.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: z12.array(webhookContactSchema).optional(),
  messages: z12.array(messageIncomingSchema).optional(),
  statuses: z12.array(webhookStatusSchema).optional()
});
var webhookChangeSchema = z12.object({
  value: webhookValueSchema,
  field: z12.literal("messages")
});
var webhookEntrySchema = z12.object({
  id: z12.string(),
  // WABA ID
  changes: z12.array(webhookChangeSchema)
});
var webhookPayloadSchema = z12.object({
  object: z12.literal("whatsapp_business_account"),
  entry: z12.array(webhookEntrySchema)
});
var webhookVerifyQuerySchema = z12.object({
  "hub.mode": z12.string().optional(),
  "hub.verify_token": z12.string().optional(),
  "hub.challenge": z12.string().optional()
});

// src/resources/webhooks/utils.ts
function verifyWebhook(query, verifyToken) {
  const mode = query["hub.mode"];
  const token = query["hub.verify_token"];
  const challenge = query["hub.challenge"];
  if (mode === "subscribe" && token === verifyToken && challenge) {
    return challenge;
  }
  return null;
}
function extractMessages(payload) {
  const messages = [];
  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (change.field === "messages" && change.value.messages) {
        messages.push(...change.value.messages);
      }
    }
  }
  return messages;
}
function extractStatuses(payload) {
  const statuses = [];
  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (change.field === "messages" && change.value.statuses) {
        statuses.push(...change.value.statuses);
      }
    }
  }
  return statuses;
}

// src/resources/webhooks/resource.ts
var WebhooksResource = class {
  /**
   * Verify webhook GET request from Meta
   *
   * @param query - Query parameters from GET request
   * @param verifyToken - Your verification token
   * @returns Challenge string if valid, null if invalid
   */
  verify(query, verifyToken) {
    return verifyWebhook(query, verifyToken);
  }
  /**
   * Extract all incoming messages from webhook payload
   *
   * @param payload - Webhook payload from Meta
   * @returns Flat array of incoming messages
   */
  extractMessages(payload) {
    return extractMessages(payload);
  }
  /**
   * Extract status updates from webhook payload
   *
   * @param payload - Webhook payload from Meta
   * @returns Flat array of status updates
   */
  extractStatuses(payload) {
    return extractStatuses(payload);
  }
  /**
   * Validate and parse webhook payload
   *
   * @param payload - Raw payload to validate
   * @returns Parsed payload, or original if invalid (with console error)
   */
  parsePayload(payload) {
    const result = webhookPayloadSchema.safeParse(payload);
    if (!result.success) {
      console.error("Webhook payload validation failed:", result.error.format());
      return payload;
    }
    return result.data;
  }
  /**
   * Handle webhook payload with type-safe callbacks
   *
   * Handlers run asynchronously - this method returns immediately
   * to allow fast webhook responses to Meta.
   *
   * @param payload - Webhook payload from Meta
   * @param handlers - Handler functions for each message type
   * @param options - Error handling options
   *
   * @example
   * ```typescript
   * // With beforeHandler for dependency injection
   * client.webhooks.handle(payload, {
   *   beforeHandler: async (message, ctx) => {
   *     const user = await db.users.findByPhone(message.from);
   *     return { user };
   *   },
   *   text: async (message, ctx, before) => {
   *     if (before?.user) {
   *       await saveMessage(before.user.id, message.text.body);
   *     }
   *   },
   * });
   *
   * // With filter for multi-tenant setups
   * client.webhooks.handle(payload, {
   *   text: async (message, ctx) => {
   *     // Only called for messages to the specified phone number
   *   },
   * }, {
   *   filter: { phoneNumberIds: ["894206507114246"] },
   * });
   * ```
   */
  handle(payload, handlers, options) {
    const parsed = this.parsePayload(payload);
    for (const entry of parsed.entry) {
      for (const change of entry.changes) {
        if (change.field !== "messages" || !change.value.messages) continue;
        const metadata = {
          phoneNumberId: change.value.metadata.phone_number_id,
          displayPhoneNumber: change.value.metadata.display_phone_number,
          wabaId: entry.id
        };
        if (options?.filter) {
          const { phoneNumberIds, wabaIds } = options.filter;
          if (phoneNumberIds?.length && !phoneNumberIds.includes(metadata.phoneNumberId)) {
            continue;
          }
          if (wabaIds?.length && !wabaIds.includes(metadata.wabaId)) {
            continue;
          }
        }
        const contacts = change.value.contacts || [];
        for (const message of change.value.messages) {
          const contact = contacts.find((c) => c.wa_id === message.from);
          const ctx = {
            metadata,
            ...contact && {
              contact: {
                name: contact.profile.name,
                waId: contact.wa_id
              }
            }
          };
          Promise.resolve().then(async () => {
            let before;
            if (handlers.beforeHandler) {
              try {
                before = await handlers.beforeHandler(message, ctx);
              } catch (error) {
                if (options?.onError) {
                  options.onError(error, message);
                } else {
                  console.error(`beforeHandler error for ${message.id}:`, error);
                }
                before = void 0;
              }
            }
            switch (message.type) {
              case "text":
                if (handlers.text) await handlers.text(message, ctx, before);
                break;
              case "audio":
                if (handlers.audio) await handlers.audio(message, ctx, before);
                break;
              case "image":
                if (handlers.image) await handlers.image(message, ctx, before);
                break;
            }
          }).catch((error) => {
            if (options?.onError) {
              options.onError(error, message);
            } else {
              console.error(`Handler error for ${message.type} ${message.id}:`, error);
            }
          });
        }
      }
    }
  }
};

// src/client/WhatsAppClient.ts
var WhatsAppClient = class {
  business;
  wabas;
  phoneNumbers;
  messages;
  templates;
  media;
  webhooks;
  httpClient;
  constructor(config) {
    const validated = clientConfigSchema.parse(config);
    this.httpClient = new HttpClient(validated);
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
  async debugToken() {
    return this.httpClient.get(
      `/debug_token?input_token=${this.httpClient.accessToken}`
    );
  }
};
export {
  BlockResource,
  BusinessResource,
  GraphAPIError,
  HttpClient,
  MediaResource,
  MessageHistoryResource,
  MessagesResource,
  OfficialAccountResource,
  PhoneNumbersResource,
  QrCodesResource,
  TemplatesResource,
  WabasResource,
  WebhooksResource,
  WhatsAppClient,
  accountModeSchema,
  accountReviewStatusSchema,
  activitiesListOptionsSchema,
  activitiesResponseSchema,
  activitySchema,
  activityTypeSchema,
  actorTypeSchema,
  addPreverifiedRequestSchema,
  addPreverifiedResponseSchema,
  assignedUserMutationResponseSchema,
  assignedUserSchema,
  assignedUserTypeSchema,
  assignedUsersListOptionsSchema,
  assignedUsersResponseSchema,
  assignedUsersSummarySchema,
  blockUsersResponseSchema,
  blockedUserOperationSchema,
  blockedUserSchema,
  buildMessagePayload,
  businessGetOptionsSchema,
  businessNodeSchema,
  businessProfileResponseSchema,
  businessProfileSchema,
  businessProfileUpdateResponseSchema,
  businessProfileUpdateSchema,
  businessSchema,
  businessVerificationStatusSchema,
  clientConfigSchema,
  codeMethodSchema,
  codeVerificationStatusSchema,
  createQrCodeRequestSchema,
  cursorPagingSchema,
  debugTokenResponseSchema,
  extractMessages,
  extractStatuses,
  hostPlatformSchema,
  listBlockedUsersOptionsSchema,
  listBlockedUsersResponseSchema,
  mediaDeleteResponseSchema,
  mediaMetadataSchema,
  mediaMimeTypeSchema,
  mediaTypeSchema,
  mediaUploadResponseSchema,
  mediaUploadSchema,
  messageDeliveryStatusEventSchema,
  messageDeliveryStatusSchema,
  messageHistoryEntrySchema,
  messageHistoryListOptionsSchema,
  messageHistoryResponseSchema,
  messageImageContentSchema,
  messageImageSchema,
  messageIncomingAudioSchema,
  messageIncomingImageSchema,
  messageIncomingSchema,
  messageIncomingTextSchema,
  messageLocationContentSchema,
  messageLocationSchema,
  messageOutgoingSchema,
  messageReactionContentSchema,
  messageReactionSchema,
  messageSendImageSchema,
  messageSendLocationSchema,
  messageSendReactionSchema,
  messageSendResponseSchema,
  messageSendTextSchema,
  messageTextContentSchema,
  messageTextSchema,
  messagingLimitTierSchema,
  nameStatusSchema,
  obaStatusSchema,
  officialAccountApplyRequestSchema,
  officialAccountApplyResponseSchema,
  officialAccountStatusSchema,
  onBehalfOfBusinessInfoSchema,
  ownershipTypeSchema,
  permissionTaskSchema,
  phoneNumberCreateRequestSchema,
  phoneNumberCreateResponseSchema,
  phoneNumberListOptionsSchema,
  phoneNumberListResponseSchema,
  phoneNumberQualityRatingSchema,
  phoneNumberRegisterResponseSchema,
  phoneNumberRegisterSchema,
  phoneNumberResponseSchema,
  phoneNumberSchema,
  phoneNumberStatusSchema,
  qrCodeDeleteResponseSchema,
  qrCodeListOptionsSchema,
  qrCodeListResponseSchema,
  qrCodeMutationResponseSchema,
  qrCodeResponseSchema,
  qrCodeSchema,
  qrImageFormatSchema,
  requestVerificationCodeSchema,
  subscribedAppSchema,
  subscribedAppsResponseSchema,
  subscriptionRequestSchema,
  subscriptionResponseSchema,
  templateBodyComponentInputSchema,
  templateBodyExampleSchema,
  templateButtonInputSchema,
  templateButtonSchema,
  templateButtonsComponentInputSchema,
  templateCategorySchema,
  templateComponentInputSchema,
  templateComponentSchema,
  templateCopyCodeButtonInputSchema,
  templateCreateAuthenticationSchema,
  templateCreateMarketingSchema,
  templateCreateResponseSchema,
  templateCreateSchema,
  templateCreateUtilitySchema,
  templateDeleteResponseSchema,
  templateDeleteSchema,
  templateFlowButtonInputSchema,
  templateFooterComponentInputSchema,
  templateHeaderComponentInputSchema,
  templateHeaderLocationInputSchema,
  templateHeaderMediaInputSchema,
  templateHeaderTextExampleSchema,
  templateHeaderTextInputSchema,
  templateLanguageSchema,
  templateListResponseSchema,
  templateListSchema,
  templateNamedParamExampleSchema,
  templatePagingCursorsSchema,
  templatePagingSchema,
  templateParameterFormatSchema,
  templatePhoneNumberButtonInputSchema,
  templateQualityScoreSchema,
  templateQuickReplyButtonInputSchema,
  templateSchema,
  templateStatusSchema,
  templateUpdateResponseSchema,
  templateUpdateSchema,
  templateUrlButtonInputSchema,
  toTemplateName,
  unblockUsersResponseSchema,
  unifiedCertStatusSchema,
  updateQrCodeRequestSchema,
  verificationResponseSchema,
  verifyCodeSchema,
  verifyWebhook,
  verticalSchema,
  wabaBusinessTypeSchema,
  wabaCreateResponseSchema,
  wabaCreateSchema,
  wabaListOptionsSchema,
  wabaListResponseSchema,
  wabaSchema,
  wabaUpdateResponseSchema,
  wabaUpdateSchema,
  webhookChangeSchema,
  webhookContactSchema,
  webhookConversationOriginSchema,
  webhookConversationSchema,
  webhookEntrySchema,
  webhookMetadataSchema,
  webhookPayloadSchema,
  webhookPricingSchema,
  webhookStatusErrorSchema,
  webhookStatusSchema,
  webhookUpdateStateSchema,
  webhookValueSchema,
  webhookVerifyQuerySchema,
  whatsappBusinessApiDataSchema
};
