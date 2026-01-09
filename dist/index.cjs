"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BlockResource: () => BlockResource,
  BusinessResource: () => BusinessResource,
  GraphAPIError: () => GraphAPIError,
  HttpClient: () => HttpClient,
  MediaResource: () => MediaResource,
  MessageHistoryResource: () => MessageHistoryResource,
  MessagesResource: () => MessagesResource,
  OfficialAccountResource: () => OfficialAccountResource,
  PhoneNumbersResource: () => PhoneNumbersResource,
  QrCodesResource: () => QrCodesResource,
  TemplatesResource: () => TemplatesResource,
  WabasResource: () => WabasResource,
  WebhooksResource: () => WebhooksResource,
  WhatsAppClient: () => WhatsAppClient,
  accountModeSchema: () => accountModeSchema,
  accountReviewStatusSchema: () => accountReviewStatusSchema,
  activitiesListOptionsSchema: () => activitiesListOptionsSchema,
  activitiesResponseSchema: () => activitiesResponseSchema,
  activitySchema: () => activitySchema,
  activityTypeSchema: () => activityTypeSchema,
  actorTypeSchema: () => actorTypeSchema,
  addPreverifiedRequestSchema: () => addPreverifiedRequestSchema,
  addPreverifiedResponseSchema: () => addPreverifiedResponseSchema,
  assignedUserMutationResponseSchema: () => assignedUserMutationResponseSchema,
  assignedUserSchema: () => assignedUserSchema,
  assignedUserTypeSchema: () => assignedUserTypeSchema,
  assignedUsersListOptionsSchema: () => assignedUsersListOptionsSchema,
  assignedUsersResponseSchema: () => assignedUsersResponseSchema,
  assignedUsersSummarySchema: () => assignedUsersSummarySchema,
  blockUsersResponseSchema: () => blockUsersResponseSchema,
  blockedUserOperationSchema: () => blockedUserOperationSchema,
  blockedUserSchema: () => blockedUserSchema,
  buildMessagePayload: () => buildMessagePayload,
  businessGetOptionsSchema: () => businessGetOptionsSchema,
  businessNodeSchema: () => businessNodeSchema,
  businessProfileResponseSchema: () => businessProfileResponseSchema,
  businessProfileSchema: () => businessProfileSchema,
  businessProfileUpdateResponseSchema: () => businessProfileUpdateResponseSchema,
  businessProfileUpdateSchema: () => businessProfileUpdateSchema,
  businessSchema: () => businessSchema,
  businessVerificationStatusSchema: () => businessVerificationStatusSchema,
  clientConfigSchema: () => clientConfigSchema,
  codeMethodSchema: () => codeMethodSchema,
  codeVerificationStatusSchema: () => codeVerificationStatusSchema,
  createQrCodeRequestSchema: () => createQrCodeRequestSchema,
  cursorPagingSchema: () => cursorPagingSchema,
  debugTokenResponseSchema: () => debugTokenResponseSchema,
  extractMessages: () => extractMessages,
  extractStatuses: () => extractStatuses,
  hostPlatformSchema: () => hostPlatformSchema,
  listBlockedUsersOptionsSchema: () => listBlockedUsersOptionsSchema,
  listBlockedUsersResponseSchema: () => listBlockedUsersResponseSchema,
  mediaDeleteResponseSchema: () => mediaDeleteResponseSchema,
  mediaMetadataSchema: () => mediaMetadataSchema,
  mediaMimeTypeSchema: () => mediaMimeTypeSchema,
  mediaTypeSchema: () => mediaTypeSchema,
  mediaUploadResponseSchema: () => mediaUploadResponseSchema,
  mediaUploadSchema: () => mediaUploadSchema,
  messageDeliveryStatusEventSchema: () => messageDeliveryStatusEventSchema,
  messageDeliveryStatusSchema: () => messageDeliveryStatusSchema,
  messageHistoryEntrySchema: () => messageHistoryEntrySchema,
  messageHistoryListOptionsSchema: () => messageHistoryListOptionsSchema,
  messageHistoryResponseSchema: () => messageHistoryResponseSchema,
  messageImageContentSchema: () => messageImageContentSchema,
  messageImageSchema: () => messageImageSchema,
  messageIncomingAudioSchema: () => messageIncomingAudioSchema,
  messageIncomingImageSchema: () => messageIncomingImageSchema,
  messageIncomingSchema: () => messageIncomingSchema,
  messageIncomingTextSchema: () => messageIncomingTextSchema,
  messageLocationContentSchema: () => messageLocationContentSchema,
  messageLocationSchema: () => messageLocationSchema,
  messageOutgoingSchema: () => messageOutgoingSchema,
  messageReactionContentSchema: () => messageReactionContentSchema,
  messageReactionSchema: () => messageReactionSchema,
  messageSendImageSchema: () => messageSendImageSchema,
  messageSendLocationSchema: () => messageSendLocationSchema,
  messageSendReactionSchema: () => messageSendReactionSchema,
  messageSendResponseSchema: () => messageSendResponseSchema,
  messageSendTextSchema: () => messageSendTextSchema,
  messageTextContentSchema: () => messageTextContentSchema,
  messageTextSchema: () => messageTextSchema,
  messagingLimitTierSchema: () => messagingLimitTierSchema,
  nameStatusSchema: () => nameStatusSchema,
  obaStatusSchema: () => obaStatusSchema,
  officialAccountApplyRequestSchema: () => officialAccountApplyRequestSchema,
  officialAccountApplyResponseSchema: () => officialAccountApplyResponseSchema,
  officialAccountStatusSchema: () => officialAccountStatusSchema,
  onBehalfOfBusinessInfoSchema: () => onBehalfOfBusinessInfoSchema,
  ownershipTypeSchema: () => ownershipTypeSchema,
  permissionTaskSchema: () => permissionTaskSchema,
  phoneNumberCreateRequestSchema: () => phoneNumberCreateRequestSchema,
  phoneNumberCreateResponseSchema: () => phoneNumberCreateResponseSchema,
  phoneNumberListOptionsSchema: () => phoneNumberListOptionsSchema,
  phoneNumberListResponseSchema: () => phoneNumberListResponseSchema,
  phoneNumberQualityRatingSchema: () => phoneNumberQualityRatingSchema,
  phoneNumberRegisterResponseSchema: () => phoneNumberRegisterResponseSchema,
  phoneNumberRegisterSchema: () => phoneNumberRegisterSchema,
  phoneNumberResponseSchema: () => phoneNumberResponseSchema,
  phoneNumberSchema: () => phoneNumberSchema,
  phoneNumberStatusSchema: () => phoneNumberStatusSchema,
  qrCodeDeleteResponseSchema: () => qrCodeDeleteResponseSchema,
  qrCodeListOptionsSchema: () => qrCodeListOptionsSchema,
  qrCodeListResponseSchema: () => qrCodeListResponseSchema,
  qrCodeMutationResponseSchema: () => qrCodeMutationResponseSchema,
  qrCodeResponseSchema: () => qrCodeResponseSchema,
  qrCodeSchema: () => qrCodeSchema,
  qrImageFormatSchema: () => qrImageFormatSchema,
  requestVerificationCodeSchema: () => requestVerificationCodeSchema,
  subscribedAppSchema: () => subscribedAppSchema,
  subscribedAppsResponseSchema: () => subscribedAppsResponseSchema,
  subscriptionRequestSchema: () => subscriptionRequestSchema,
  subscriptionResponseSchema: () => subscriptionResponseSchema,
  templateBodyComponentInputSchema: () => templateBodyComponentInputSchema,
  templateBodyExampleSchema: () => templateBodyExampleSchema,
  templateButtonInputSchema: () => templateButtonInputSchema,
  templateButtonSchema: () => templateButtonSchema,
  templateButtonsComponentInputSchema: () => templateButtonsComponentInputSchema,
  templateCategorySchema: () => templateCategorySchema,
  templateComponentInputSchema: () => templateComponentInputSchema,
  templateComponentSchema: () => templateComponentSchema,
  templateCopyCodeButtonInputSchema: () => templateCopyCodeButtonInputSchema,
  templateCreateAuthenticationSchema: () => templateCreateAuthenticationSchema,
  templateCreateMarketingSchema: () => templateCreateMarketingSchema,
  templateCreateResponseSchema: () => templateCreateResponseSchema,
  templateCreateSchema: () => templateCreateSchema,
  templateCreateUtilitySchema: () => templateCreateUtilitySchema,
  templateDeleteResponseSchema: () => templateDeleteResponseSchema,
  templateDeleteSchema: () => templateDeleteSchema,
  templateFlowButtonInputSchema: () => templateFlowButtonInputSchema,
  templateFooterComponentInputSchema: () => templateFooterComponentInputSchema,
  templateHeaderComponentInputSchema: () => templateHeaderComponentInputSchema,
  templateHeaderLocationInputSchema: () => templateHeaderLocationInputSchema,
  templateHeaderMediaInputSchema: () => templateHeaderMediaInputSchema,
  templateHeaderTextExampleSchema: () => templateHeaderTextExampleSchema,
  templateHeaderTextInputSchema: () => templateHeaderTextInputSchema,
  templateLanguageSchema: () => templateLanguageSchema,
  templateListResponseSchema: () => templateListResponseSchema,
  templateListSchema: () => templateListSchema,
  templateNamedParamExampleSchema: () => templateNamedParamExampleSchema,
  templatePagingCursorsSchema: () => templatePagingCursorsSchema,
  templatePagingSchema: () => templatePagingSchema,
  templateParameterFormatSchema: () => templateParameterFormatSchema,
  templatePhoneNumberButtonInputSchema: () => templatePhoneNumberButtonInputSchema,
  templateQualityScoreSchema: () => templateQualityScoreSchema,
  templateQuickReplyButtonInputSchema: () => templateQuickReplyButtonInputSchema,
  templateSchema: () => templateSchema,
  templateStatusSchema: () => templateStatusSchema,
  templateUpdateResponseSchema: () => templateUpdateResponseSchema,
  templateUpdateSchema: () => templateUpdateSchema,
  templateUrlButtonInputSchema: () => templateUrlButtonInputSchema,
  toTemplateName: () => toTemplateName,
  unblockUsersResponseSchema: () => unblockUsersResponseSchema,
  unifiedCertStatusSchema: () => unifiedCertStatusSchema,
  updateQrCodeRequestSchema: () => updateQrCodeRequestSchema,
  verificationResponseSchema: () => verificationResponseSchema,
  verifyCodeSchema: () => verifyCodeSchema,
  verifyWebhook: () => verifyWebhook,
  verticalSchema: () => verticalSchema,
  wabaBusinessTypeSchema: () => wabaBusinessTypeSchema,
  wabaCreateResponseSchema: () => wabaCreateResponseSchema,
  wabaCreateSchema: () => wabaCreateSchema,
  wabaListOptionsSchema: () => wabaListOptionsSchema,
  wabaListResponseSchema: () => wabaListResponseSchema,
  wabaSchema: () => wabaSchema,
  wabaUpdateResponseSchema: () => wabaUpdateResponseSchema,
  wabaUpdateSchema: () => wabaUpdateSchema,
  webhookChangeSchema: () => webhookChangeSchema,
  webhookContactSchema: () => webhookContactSchema,
  webhookConversationOriginSchema: () => webhookConversationOriginSchema,
  webhookConversationSchema: () => webhookConversationSchema,
  webhookEntrySchema: () => webhookEntrySchema,
  webhookMetadataSchema: () => webhookMetadataSchema,
  webhookPayloadSchema: () => webhookPayloadSchema,
  webhookPricingSchema: () => webhookPricingSchema,
  webhookStatusErrorSchema: () => webhookStatusErrorSchema,
  webhookStatusSchema: () => webhookStatusSchema,
  webhookUpdateStateSchema: () => webhookUpdateStateSchema,
  webhookValueSchema: () => webhookValueSchema,
  webhookVerifyQuerySchema: () => webhookVerifyQuerySchema,
  whatsappBusinessApiDataSchema: () => whatsappBusinessApiDataSchema
});
module.exports = __toCommonJS(index_exports);

// src/client/schema.ts
var import_zod = require("zod");
var ACCESS_TOKEN_HELP_MESSAGE = "Get your access token from Meta for Developers: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started";
var accessTokenSchema = import_zod.z.string({
  message: `accessToken is required. ${ACCESS_TOKEN_HELP_MESSAGE}`
}).min(1, {
  message: `accessToken cannot be empty. ${ACCESS_TOKEN_HELP_MESSAGE}`
}).trim().refine((val) => val.length > 0, {
  message: `accessToken cannot be whitespace only. ${ACCESS_TOKEN_HELP_MESSAGE}`
});
var clientConfigSchema = import_zod.z.object({
  accessToken: accessTokenSchema,
  phoneNumberId: import_zod.z.string().optional().refine((val) => val === void 0 || val.trim().length > 0, {
    message: "phoneNumberId cannot be empty or whitespace only"
  }),
  businessAccountId: import_zod.z.string().optional().refine((val) => val === void 0 || val.trim().length > 0, {
    message: "businessAccountId cannot be empty or whitespace only"
  }),
  businessId: import_zod.z.string().optional().refine((val) => val === void 0 || val.trim().length > 0, {
    message: "businessId cannot be empty or whitespace only"
  }),
  apiVersion: import_zod.z.string().default("v18.0").optional(),
  baseURL: import_zod.z.string().url().default("https://graph.facebook.com").optional(),
  timeout: import_zod.z.number().positive().optional()
});
var debugTokenResponseSchema = import_zod.z.object({
  data: import_zod.z.object({
    app_id: import_zod.z.string().optional(),
    type: import_zod.z.string().optional(),
    application: import_zod.z.string().optional(),
    data_access_expires_at: import_zod.z.number().optional(),
    expires_at: import_zod.z.number().optional(),
    is_valid: import_zod.z.boolean().optional(),
    issued_at: import_zod.z.number().optional(),
    metadata: import_zod.z.object({
      auth_type: import_zod.z.string().optional(),
      sso: import_zod.z.string().optional()
    }).optional(),
    scopes: import_zod.z.array(import_zod.z.string()).optional(),
    granular_scopes: import_zod.z.array(
      import_zod.z.object({
        scope: import_zod.z.string().optional(),
        target_ids: import_zod.z.array(import_zod.z.string()).optional()
      })
    ).optional(),
    user_id: import_zod.z.string().optional(),
    profile_id: import_zod.z.string().optional()
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
var import_zod2 = require("zod");
var businessSchema = import_zod2.z.object({
  id: import_zod2.z.string(),
  name: import_zod2.z.string().optional(),
  timezone_id: import_zod2.z.number().optional()
});
var businessGetOptionsSchema = import_zod2.z.object({
  fields: import_zod2.z.string().optional()
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
var import_zod3 = require("zod");
var accountReviewStatusSchema = import_zod3.z.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "RESTRICTED",
  "LIMIT_REACHED"
]);
var businessVerificationStatusSchema = import_zod3.z.enum([
  "VERIFIED",
  "UNVERIFIED",
  "PENDING",
  "REJECTED"
]);
var wabaBusinessTypeSchema = import_zod3.z.enum(["ENTERPRISE", "SMB"]);
var ownershipTypeSchema = import_zod3.z.enum([
  "OWNED_BY_BUSINESS_PORTFOLIO",
  "OWNED_BY_BUSINESS_ASSET_GROUP"
]);
var onBehalfOfBusinessInfoSchema = import_zod3.z.object({
  id: import_zod3.z.string().optional(),
  name: import_zod3.z.string().optional()
});
var cursorPagingSchema = import_zod3.z.object({
  cursors: import_zod3.z.object({
    before: import_zod3.z.string().optional(),
    after: import_zod3.z.string().optional()
  }).optional(),
  previous: import_zod3.z.string().optional(),
  next: import_zod3.z.string().optional()
});
var wabaSchema = import_zod3.z.object({
  id: import_zod3.z.string(),
  name: import_zod3.z.string().optional(),
  account_review_status: accountReviewStatusSchema.optional(),
  purchase_order_number: import_zod3.z.string().optional(),
  currency: import_zod3.z.string().optional(),
  timezone_id: import_zod3.z.string().optional(),
  business_verification_status: businessVerificationStatusSchema.optional(),
  country: import_zod3.z.string().optional(),
  ownership_type: ownershipTypeSchema.optional(),
  primary_business_location: import_zod3.z.string().optional(),
  on_behalf_of_business_info: onBehalfOfBusinessInfoSchema.optional(),
  is_enabled_for_insights: import_zod3.z.boolean().optional(),
  message_template_namespace: import_zod3.z.string().optional()
});
var wabaListResponseSchema = import_zod3.z.object({
  data: import_zod3.z.array(wabaSchema),
  paging: cursorPagingSchema.optional()
});
var wabaCreateSchema = import_zod3.z.object({
  name: import_zod3.z.string(),
  primary_funding_id: import_zod3.z.string().optional(),
  purchase_order_number: import_zod3.z.string().optional(),
  currency: import_zod3.z.string().optional(),
  timezone_id: import_zod3.z.number().optional(),
  business_type: wabaBusinessTypeSchema.optional(),
  on_behalf_of_business_id: import_zod3.z.string().optional()
});
var wabaCreateResponseSchema = import_zod3.z.object({
  id: import_zod3.z.string(),
  payment_account_id: import_zod3.z.string().optional()
});
var wabaUpdateSchema = import_zod3.z.object({
  name: import_zod3.z.string().optional(),
  timezone_id: import_zod3.z.number().optional()
});
var wabaUpdateResponseSchema = import_zod3.z.object({
  success: import_zod3.z.boolean()
});
var wabaListOptionsSchema = import_zod3.z.object({
  fields: import_zod3.z.string().optional(),
  business_type: import_zod3.z.array(wabaBusinessTypeSchema).optional(),
  limit: import_zod3.z.number().min(1).max(100).optional(),
  after: import_zod3.z.string().optional(),
  before: import_zod3.z.string().optional()
});
var whatsappBusinessApiDataSchema = import_zod3.z.object({
  id: import_zod3.z.string(),
  name: import_zod3.z.string(),
  link: import_zod3.z.string().optional()
});
var subscribedAppSchema = import_zod3.z.object({
  whatsapp_business_api_data: whatsappBusinessApiDataSchema,
  override_callback_uri: import_zod3.z.string().optional()
});
var subscribedAppsResponseSchema = import_zod3.z.object({
  data: import_zod3.z.array(subscribedAppSchema)
});
var subscriptionRequestSchema = import_zod3.z.object({
  /** Custom webhook callback URL to override app default */
  override_callback_uri: import_zod3.z.string().optional(),
  /** Verification token for webhook security */
  verify_token: import_zod3.z.string().optional()
});
var subscriptionResponseSchema = import_zod3.z.object({
  success: import_zod3.z.boolean(),
  data: import_zod3.z.array(subscribedAppSchema).optional()
});
var permissionTaskSchema = import_zod3.z.enum([
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
var assignedUserTypeSchema = import_zod3.z.enum([
  "BUSINESS_USER",
  "SYSTEM_USER",
  "PERSONAL_USER"
]);
var businessNodeSchema = import_zod3.z.object({
  id: import_zod3.z.string().optional(),
  name: import_zod3.z.string().optional()
});
var assignedUserSchema = import_zod3.z.object({
  id: import_zod3.z.string(),
  name: import_zod3.z.string(),
  business: businessNodeSchema.optional(),
  user_type: assignedUserTypeSchema.optional()
});
var assignedUsersSummarySchema = import_zod3.z.object({
  total_count: import_zod3.z.number().optional()
});
var assignedUsersResponseSchema = import_zod3.z.object({
  data: import_zod3.z.array(assignedUserSchema),
  paging: cursorPagingSchema.optional(),
  summary: assignedUsersSummarySchema.optional()
});
var assignedUsersListOptionsSchema = import_zod3.z.object({
  fields: import_zod3.z.string().optional(),
  limit: import_zod3.z.number().min(1).max(100).optional(),
  after: import_zod3.z.string().optional(),
  before: import_zod3.z.string().optional()
});
var assignedUserMutationResponseSchema = import_zod3.z.object({
  success: import_zod3.z.boolean()
});
var activityTypeSchema = import_zod3.z.enum([
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
var actorTypeSchema = import_zod3.z.enum([
  "USER",
  "SYSTEM",
  "API",
  "ADMIN",
  "AUTOMATED_PROCESS"
]);
var activitySchema = import_zod3.z.object({
  id: import_zod3.z.string(),
  activity_type: activityTypeSchema,
  timestamp: import_zod3.z.string(),
  actor_type: actorTypeSchema,
  actor_id: import_zod3.z.string().optional(),
  actor_name: import_zod3.z.string().optional(),
  description: import_zod3.z.string().optional(),
  details: import_zod3.z.record(import_zod3.z.string(), import_zod3.z.unknown()).optional(),
  ip_address: import_zod3.z.string().optional(),
  user_agent: import_zod3.z.string().optional()
});
var activitiesResponseSchema = import_zod3.z.object({
  data: import_zod3.z.array(activitySchema),
  paging: cursorPagingSchema.optional()
});
var activitiesListOptionsSchema = import_zod3.z.object({
  fields: import_zod3.z.string().optional(),
  limit: import_zod3.z.number().min(1).max(100).optional(),
  after: import_zod3.z.string().optional(),
  before: import_zod3.z.string().optional(),
  since: import_zod3.z.string().optional(),
  until: import_zod3.z.string().optional(),
  activity_type: import_zod3.z.string().optional()
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
var import_zod4 = require("zod");
var paginationCursorsSchema = import_zod4.z.object({
  after: import_zod4.z.string().optional(),
  before: import_zod4.z.string().optional()
});
var blockPagingSchema = import_zod4.z.object({
  cursors: paginationCursorsSchema.optional()
});
var blockedUserSchema = import_zod4.z.object({
  messaging_product: import_zod4.z.string().optional(),
  wa_id: import_zod4.z.string().optional()
});
var blockUserInputSchema = import_zod4.z.object({
  user: import_zod4.z.string()
});
var blockUsersRequestSchema = import_zod4.z.object({
  block_users: import_zod4.z.array(blockUserInputSchema),
  messaging_product: import_zod4.z.literal("whatsapp").optional()
});
var blockedUserOperationSchema = import_zod4.z.object({
  input: import_zod4.z.string().optional(),
  wa_id: import_zod4.z.string().optional()
});
var blockUsersResultSchema = import_zod4.z.object({
  added_users: import_zod4.z.array(blockedUserOperationSchema).optional()
});
var unblockUsersResultSchema = import_zod4.z.object({
  removed_users: import_zod4.z.array(blockedUserOperationSchema).optional()
});
var listBlockedUsersResponseSchema = import_zod4.z.object({
  data: import_zod4.z.array(blockedUserSchema).optional(),
  paging: blockPagingSchema.optional()
});
var blockUsersResponseSchema = import_zod4.z.object({
  block_users: blockUsersResultSchema.optional(),
  messaging_product: import_zod4.z.string().optional()
});
var unblockUsersResponseSchema = import_zod4.z.object({
  block_users: unblockUsersResultSchema.optional(),
  messaging_product: import_zod4.z.string().optional()
});
var listBlockedUsersOptionsSchema = import_zod4.z.object({
  limit: import_zod4.z.number().min(1).max(100).optional(),
  after: import_zod4.z.string().optional(),
  before: import_zod4.z.string().optional()
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
var import_zod5 = require("zod");
var qrCodeCursorsSchema = import_zod5.z.object({
  before: import_zod5.z.string().optional(),
  after: import_zod5.z.string().optional()
});
var qrCodePagingSchema = import_zod5.z.object({
  cursors: qrCodeCursorsSchema.optional(),
  previous: import_zod5.z.string().optional(),
  next: import_zod5.z.string().optional()
});
var qrImageFormatSchema = import_zod5.z.enum(["PNG", "SVG"]);
var qrCodeSchema = import_zod5.z.object({
  /** Unique 14-character QR code identifier */
  code: import_zod5.z.string(),
  /** Pre-filled message text that appears in customer chat */
  prefilled_message: import_zod5.z.string(),
  /** WhatsApp deep link URL for direct conversation initiation */
  deep_link_url: import_zod5.z.string(),
  /** Unix timestamp when QR code was created (first-party apps only) */
  creation_time: import_zod5.z.number().optional(),
  /** QR code image download URL (when format specified in fields) */
  qr_image_url: import_zod5.z.string().optional()
});
var qrCodeListResponseSchema = import_zod5.z.object({
  data: import_zod5.z.array(qrCodeSchema),
  paging: qrCodePagingSchema.optional()
});
var qrCodeResponseSchema = import_zod5.z.object({
  data: import_zod5.z.array(qrCodeSchema)
});
var qrCodeMutationResponseSchema = import_zod5.z.object({
  /** Unique 14-character identifier for the QR code */
  code: import_zod5.z.string(),
  /** The pre-filled message text associated with this QR code */
  prefilled_message: import_zod5.z.string(),
  /** WhatsApp deep link URL */
  deep_link_url: import_zod5.z.string(),
  /** URL to download the QR code image (if generate_qr_image was specified) */
  qr_image_url: import_zod5.z.string().optional()
});
var qrCodeDeleteResponseSchema = import_zod5.z.object({
  success: import_zod5.z.boolean()
});
var createQrCodeRequestSchema = import_zod5.z.object({
  /** Pre-filled message text (max 140 characters) */
  prefilled_message: import_zod5.z.string().max(140),
  /** QR image format - when specified, response includes qr_image_url */
  generate_qr_image: qrImageFormatSchema.optional()
});
var updateQrCodeRequestSchema = import_zod5.z.object({
  /** 14-character QR code identifier to update */
  code: import_zod5.z.string(),
  /** New pre-filled message text (max 140 characters) */
  prefilled_message: import_zod5.z.string().max(140)
});
var qrCodeListOptionsSchema = import_zod5.z.object({
  /** Comma-separated list of fields to include */
  fields: import_zod5.z.string().optional(),
  /** Filter results to a specific QR code by its identifier */
  code: import_zod5.z.string().optional(),
  /** Maximum number of QR codes to return (1-25) */
  limit: import_zod5.z.number().min(1).max(25).optional(),
  /** Cursor for next page */
  after: import_zod5.z.string().optional(),
  /** Cursor for previous page */
  before: import_zod5.z.string().optional()
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
var import_zod6 = require("zod");
var messageDeliveryStatusSchema = import_zod6.z.enum([
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
  "DELETED"
]);
var webhookUpdateStateSchema = import_zod6.z.enum([
  "PENDING",
  "DELIVERED",
  "FAILED",
  "RETRYING"
]);
var messageHistoryCursorsSchema = import_zod6.z.object({
  before: import_zod6.z.string().optional(),
  after: import_zod6.z.string().optional()
});
var messageHistoryPagingSchema = import_zod6.z.object({
  cursors: messageHistoryCursorsSchema.optional(),
  previous: import_zod6.z.string().optional(),
  next: import_zod6.z.string().optional()
});
var eventApplicationSchema = import_zod6.z.object({
  id: import_zod6.z.string().optional()
});
var messageDeliveryStatusEventSchema = import_zod6.z.object({
  /** Unique identifier for the delivery status event */
  id: import_zod6.z.string(),
  /** Delivery status of the message */
  delivery_status: messageDeliveryStatusSchema,
  /** State of webhook update delivery */
  webhook_update_state: webhookUpdateStateSchema.optional(),
  /** Unix timestamp when the delivery status event occurred */
  timestamp: import_zod6.z.number(),
  /** Application information for the event */
  application: eventApplicationSchema.optional(),
  /** Webhook URI where the event was delivered */
  webhook_uri: import_zod6.z.string().optional(),
  /** Error description if the delivery failed */
  error_description: import_zod6.z.string().optional()
});
var messageEventsSchema = import_zod6.z.object({
  data: import_zod6.z.array(messageDeliveryStatusEventSchema).optional(),
  paging: messageHistoryPagingSchema.optional()
});
var messageHistoryEntrySchema = import_zod6.z.object({
  /** Unique identifier for the message history entry */
  id: import_zod6.z.string(),
  /** WhatsApp message ID (WAMID) for the message */
  message_id: import_zod6.z.string(),
  /** Message delivery status events and occurrences */
  events: messageEventsSchema.optional()
});
var messageHistoryResponseSchema = import_zod6.z.object({
  data: import_zod6.z.array(messageHistoryEntrySchema).optional(),
  paging: messageHistoryPagingSchema.optional()
});
var messageHistoryListOptionsSchema = import_zod6.z.object({
  /** Filter results by specific WhatsApp message ID (WAMID) */
  message_id: import_zod6.z.string().optional(),
  /** Comma-separated list of fields to include */
  fields: import_zod6.z.string().optional(),
  /** Maximum number of entries to return (1-100, default 25) */
  limit: import_zod6.z.number().min(1).max(100).optional(),
  /** Cursor for next page */
  after: import_zod6.z.string().optional(),
  /** Cursor for previous page */
  before: import_zod6.z.string().optional()
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
var import_zod7 = require("zod");
var obaStatusSchema = import_zod7.z.enum([
  "PENDING",
  "APPROVED",
  "REJECTED",
  "UNDER_REVIEW",
  "EXPIRED",
  "CANCELLED"
]);
var officialAccountStatusSchema = import_zod7.z.object({
  /** Unique identifier for the WhatsApp Business Account phone number */
  id: import_zod7.z.string(),
  /** Current OBA verification status */
  oba_status: obaStatusSchema,
  /** Human-readable message describing the current status */
  status_message: import_zod7.z.string()
});
var officialAccountApplyRequestSchema = import_zod7.z.object({
  /** Official business website URL */
  business_website_url: import_zod7.z.string().url(),
  /** Primary country where the business operates */
  primary_country_of_operation: import_zod7.z.string(),
  /** Primary language used by the business */
  primary_language: import_zod7.z.string().optional(),
  /** Parent business or brand name */
  parent_business_or_brand: import_zod7.z.string().optional(),
  /** Supporting links that demonstrate business notability (min 5, max 10) */
  supporting_links: import_zod7.z.array(import_zod7.z.string().url()).min(5).max(10).optional(),
  /** Additional information to support the application */
  additional_supporting_information: import_zod7.z.string().optional()
});
var officialAccountApplyResponseSchema = import_zod7.z.object({
  /** Indicates if the operation was successful */
  success: import_zod7.z.boolean(),
  /** Human-readable message describing the result */
  message: import_zod7.z.string(),
  /** Updated status after the operation */
  updated_status: officialAccountStatusSchema.optional(),
  /** Unique identifier for tracking the application request */
  tracking_id: import_zod7.z.string().optional()
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
var import_zod8 = require("zod");
var phoneNumberQualityRatingSchema = import_zod8.z.enum([
  "GREEN",
  "YELLOW",
  "RED",
  "UNKNOWN",
  "NA"
]);
var phoneNumberStatusSchema = import_zod8.z.enum([
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
var codeVerificationStatusSchema = import_zod8.z.enum([
  "VERIFIED",
  "NOT_VERIFIED",
  "EXPIRED"
]);
var unifiedCertStatusSchema = import_zod8.z.enum([
  "APPROVED",
  "NAME_PENDING_REVIEW",
  "NAME_NOT_APPROVED",
  "ACCOUNT_REVIEW_NOT_STARTED",
  "LIMITED_ACCESS"
]);
var accountModeSchema = import_zod8.z.enum(["LIVE", "SANDBOX"]);
var hostPlatformSchema = import_zod8.z.enum([
  "CLOUD_API",
  "ON_PREMISE",
  "NOT_APPLICABLE"
]);
var nameStatusSchema = import_zod8.z.enum([
  "APPROVED",
  "AVAILABLE_WITHOUT_REVIEW",
  "DECLINED",
  "EXPIRED",
  "PENDING_REVIEW",
  "NONE"
]);
var messagingLimitTierSchema = import_zod8.z.enum([
  "TIER_50",
  "TIER_250",
  "TIER_1K",
  "TIER_10K",
  "TIER_100K",
  "TIER_UNLIMITED"
]);
var codeMethodSchema = import_zod8.z.enum(["SMS", "VOICE"]);
var verticalSchema = import_zod8.z.enum([
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
var phoneNumberResponseSchema = import_zod8.z.object({
  id: import_zod8.z.string(),
  display_phone_number: import_zod8.z.string(),
  verified_name: import_zod8.z.string().optional(),
  status: phoneNumberStatusSchema.optional(),
  quality_rating: phoneNumberQualityRatingSchema.optional(),
  country_code: import_zod8.z.string().optional(),
  country_dial_code: import_zod8.z.string().optional(),
  code_verification_status: codeVerificationStatusSchema.optional(),
  unified_cert_status: unifiedCertStatusSchema.optional(),
  account_mode: accountModeSchema.optional(),
  host_platform: hostPlatformSchema.optional(),
  messaging_limit_tier: messagingLimitTierSchema.optional(),
  is_official_business_account: import_zod8.z.boolean().optional(),
  username: import_zod8.z.string().optional(),
  name_status: nameStatusSchema.optional(),
  certificate: import_zod8.z.string().optional(),
  is_pin_enabled: import_zod8.z.boolean().optional(),
  search_visibility: import_zod8.z.string().optional()
});
var cursorPagingSchema2 = import_zod8.z.object({
  cursors: import_zod8.z.object({
    before: import_zod8.z.string().optional(),
    after: import_zod8.z.string().optional()
  }).optional(),
  previous: import_zod8.z.string().optional(),
  next: import_zod8.z.string().optional()
});
var phoneNumberListResponseSchema = import_zod8.z.object({
  data: import_zod8.z.array(phoneNumberResponseSchema),
  paging: cursorPagingSchema2.optional()
});
var phoneNumberListOptionsSchema = import_zod8.z.object({
  fields: import_zod8.z.string().optional(),
  filtering: import_zod8.z.string().optional(),
  sort: import_zod8.z.enum([
    "creation_time.asc",
    "creation_time.desc",
    "last_onboarded_time.asc",
    "last_onboarded_time.desc"
  ]).optional(),
  limit: import_zod8.z.number().min(1).max(100).optional(),
  after: import_zod8.z.string().optional(),
  before: import_zod8.z.string().optional()
});
var addPreverifiedRequestSchema = import_zod8.z.object({
  phone_number: import_zod8.z.string()
});
var addPreverifiedResponseSchema = import_zod8.z.object({
  id: import_zod8.z.string()
});
var phoneNumberCreateRequestSchema = import_zod8.z.object({
  /** Phone number in E.164 format without the + prefix */
  phone_number: import_zod8.z.string(),
  /** Business name to be verified for this phone number */
  verified_name: import_zod8.z.string(),
  /** Country code for the phone number */
  cc: import_zod8.z.string().optional(),
  /** Whether this is a phone number migration from on-premises */
  migrate_phone_number: import_zod8.z.boolean().optional(),
  /** Pre-verified phone number ID for BSP scenarios (from addPreverified) */
  preverified_id: import_zod8.z.string().optional()
});
var phoneNumberCreateResponseSchema = import_zod8.z.object({
  id: import_zod8.z.string()
});
var phoneNumberRegisterSchema = import_zod8.z.object({
  messaging_product: import_zod8.z.literal("whatsapp"),
  pin: import_zod8.z.string().min(6).max(6)
});
var phoneNumberRegisterResponseSchema = import_zod8.z.object({
  success: import_zod8.z.boolean()
});
var requestVerificationCodeSchema = import_zod8.z.object({
  code_method: codeMethodSchema,
  language: import_zod8.z.string().optional()
});
var verifyCodeSchema = import_zod8.z.object({
  code: import_zod8.z.string()
});
var verificationResponseSchema = import_zod8.z.object({
  success: import_zod8.z.boolean()
});
var businessProfileSchema = import_zod8.z.object({
  messaging_product: import_zod8.z.literal("whatsapp").optional(),
  about: import_zod8.z.string().max(139).optional(),
  address: import_zod8.z.string().max(256).optional(),
  description: import_zod8.z.string().max(512).optional(),
  email: import_zod8.z.string().email().optional(),
  profile_picture_url: import_zod8.z.string().url().optional(),
  websites: import_zod8.z.array(import_zod8.z.string().url()).max(2).optional(),
  vertical: verticalSchema.optional()
});
var businessProfileResponseSchema = import_zod8.z.object({
  data: import_zod8.z.array(businessProfileSchema)
});
var businessProfileUpdateSchema = businessProfileSchema.extend({
  messaging_product: import_zod8.z.literal("whatsapp")
});
var businessProfileUpdateResponseSchema = import_zod8.z.object({
  success: import_zod8.z.boolean()
});

// src/resources/messages/schema.ts
var import_zod9 = require("zod");
var phoneNumberSchema = import_zod9.z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format (use E.164: +1234567890)");
var messageTextContentSchema = import_zod9.z.object({
  body: import_zod9.z.string().min(1).max(4096),
  preview_url: import_zod9.z.boolean().optional()
});
var messageImageContentSchema = import_zod9.z.object({
  id: import_zod9.z.string().optional(),
  link: import_zod9.z.string().url().optional(),
  caption: import_zod9.z.string().max(1024).optional()
}).refine((data) => data.link || data.id, "Either link or id must be provided");
var messageLocationContentSchema = import_zod9.z.object({
  longitude: import_zod9.z.number().min(-180).max(180),
  latitude: import_zod9.z.number().min(-90).max(90),
  name: import_zod9.z.string().optional(),
  address: import_zod9.z.string().optional()
});
var messageReactionContentSchema = import_zod9.z.object({
  message_id: import_zod9.z.string().min(1),
  emoji: import_zod9.z.string().min(1).max(1)
});
var messageSendTextSchema = import_zod9.z.object({
  to: phoneNumberSchema,
  text: messageTextContentSchema
});
var messageSendImageSchema = import_zod9.z.object({
  to: phoneNumberSchema,
  image: messageImageContentSchema
});
var messageSendLocationSchema = import_zod9.z.object({
  to: phoneNumberSchema,
  location: messageLocationContentSchema
});
var messageSendReactionSchema = import_zod9.z.object({
  to: phoneNumberSchema,
  reaction: messageReactionContentSchema
});
var messageTextSchema = messageSendTextSchema.extend({
  type: import_zod9.z.literal("text")
});
var messageImageSchema = messageSendImageSchema.extend({
  type: import_zod9.z.literal("image")
});
var messageLocationSchema = messageSendLocationSchema.extend({
  type: import_zod9.z.literal("location")
});
var messageReactionSchema = messageSendReactionSchema.extend({
  type: import_zod9.z.literal("reaction")
});
var messageOutgoingSchema = import_zod9.z.discriminatedUnion("type", [
  messageTextSchema,
  messageImageSchema,
  messageLocationSchema,
  messageReactionSchema
]);
var messageSendResponseSchema = import_zod9.z.object({
  messaging_product: import_zod9.z.literal("whatsapp"),
  contacts: import_zod9.z.array(
    import_zod9.z.object({
      input: import_zod9.z.string(),
      wa_id: import_zod9.z.string()
    })
  ),
  messages: import_zod9.z.array(
    import_zod9.z.object({
      id: import_zod9.z.string(),
      message_status: import_zod9.z.string().optional()
    })
  )
});
var incomingMessageBaseSchema = import_zod9.z.object({
  from: import_zod9.z.string(),
  id: import_zod9.z.string(),
  timestamp: import_zod9.z.string()
});
var messageIncomingTextSchema = incomingMessageBaseSchema.extend({
  type: import_zod9.z.literal("text"),
  text: import_zod9.z.object({
    body: import_zod9.z.string()
  })
});
var messageIncomingImageSchema = incomingMessageBaseSchema.extend({
  type: import_zod9.z.literal("image"),
  image: import_zod9.z.object({
    id: import_zod9.z.string(),
    mime_type: import_zod9.z.string().optional(),
    caption: import_zod9.z.string().optional()
  })
});
var messageIncomingAudioSchema = incomingMessageBaseSchema.extend({
  type: import_zod9.z.literal("audio"),
  audio: import_zod9.z.object({
    id: import_zod9.z.string(),
    mime_type: import_zod9.z.string().optional()
  })
});
var messageIncomingSchema = import_zod9.z.discriminatedUnion("type", [
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
var import_zod10 = require("zod");
var templateLanguageSchema = import_zod10.z.enum([
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
var templateCategorySchema = import_zod10.z.enum([
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY"
]);
var templateParameterFormatSchema = import_zod10.z.enum(["positional", "named"]);
var templateStatusSchema = import_zod10.z.enum([
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
var templateQualityScoreSchema = import_zod10.z.object({
  score: import_zod10.z.enum(["GREEN", "YELLOW", "RED", "UNKNOWN"]).optional(),
  date: import_zod10.z.number().optional()
});
var templateNamedParamExampleSchema = import_zod10.z.object({
  param_name: import_zod10.z.string(),
  example: import_zod10.z.string()
});
var templateQuickReplyButtonInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("QUICK_REPLY"),
  text: import_zod10.z.string().min(1).max(25, "Button text must be 25 characters or less")
});
var templateUrlButtonInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("URL"),
  text: import_zod10.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: import_zod10.z.string().url().max(2e3, "URL must be 2000 characters or less"),
  example: import_zod10.z.array(import_zod10.z.string()).optional()
});
var templatePhoneNumberButtonInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("PHONE_NUMBER"),
  text: import_zod10.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: import_zod10.z.string().min(1).max(20, "Phone number must be 20 characters or less")
});
var templateCopyCodeButtonInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("COPY_CODE"),
  example: import_zod10.z.string().max(15).optional()
});
var templateFlowButtonInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("FLOW"),
  text: import_zod10.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_id: import_zod10.z.string().optional(),
  flow_action: import_zod10.z.enum(["navigate", "data_exchange"]).optional(),
  navigate_screen: import_zod10.z.string().optional()
});
var templateButtonInputSchema = import_zod10.z.discriminatedUnion("type", [
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema
]);
var templateHeaderTextExampleSchema = import_zod10.z.object({
  // Positional: header_text: ["value1"]
  header_text: import_zod10.z.array(import_zod10.z.string()).optional(),
  // Named: header_text_named_params: [{ param_name: "name", example: "value" }]
  header_text_named_params: import_zod10.z.array(templateNamedParamExampleSchema).optional()
});
var templateHeaderTextInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("HEADER"),
  format: import_zod10.z.literal("TEXT"),
  text: import_zod10.z.string().min(1).max(60, "Header text must be 60 characters or less"),
  example: templateHeaderTextExampleSchema.optional()
});
var templateHeaderMediaInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("HEADER"),
  format: import_zod10.z.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  example: import_zod10.z.object({
    header_handle: import_zod10.z.array(import_zod10.z.string()).min(1, "At least one header_handle is required")
  })
});
var templateHeaderLocationInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("HEADER"),
  format: import_zod10.z.literal("LOCATION")
});
var templateHeaderComponentInputSchema = import_zod10.z.discriminatedUnion(
  "format",
  [
    templateHeaderTextInputSchema,
    templateHeaderMediaInputSchema,
    templateHeaderLocationInputSchema
  ]
);
var templateBodyExampleSchema = import_zod10.z.object({
  // Positional: body_text: [["value1", "value2"]]
  body_text: import_zod10.z.array(import_zod10.z.array(import_zod10.z.string())).optional(),
  // Named: body_text_named_params: [{ param_name: "name", example: "value" }]
  body_text_named_params: import_zod10.z.array(templateNamedParamExampleSchema).optional()
});
var templateBodyComponentInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("BODY"),
  text: import_zod10.z.string().min(1).max(1024, "Body text must be 1024 characters or less"),
  example: templateBodyExampleSchema.optional()
});
var templateFooterComponentInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("FOOTER"),
  text: import_zod10.z.string().min(1).max(60, "Footer text must be 60 characters or less")
});
var templateButtonsComponentInputSchema = import_zod10.z.object({
  type: import_zod10.z.literal("BUTTONS"),
  buttons: import_zod10.z.array(templateButtonInputSchema).min(1).max(10, "Maximum 10 buttons allowed")
});
var templateComponentInputSchema = import_zod10.z.union([
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema
]);
var templateButtonSchema = import_zod10.z.object({
  type: import_zod10.z.string(),
  text: import_zod10.z.string().optional(),
  url: import_zod10.z.string().optional(),
  phone_number: import_zod10.z.string().optional(),
  example: import_zod10.z.union([import_zod10.z.array(import_zod10.z.string()), import_zod10.z.string()]).optional(),
  flow_id: import_zod10.z.string().optional(),
  flow_action: import_zod10.z.string().optional(),
  navigate_screen: import_zod10.z.string().optional()
});
var templateComponentSchema = import_zod10.z.object({
  type: import_zod10.z.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  format: import_zod10.z.string().optional(),
  text: import_zod10.z.string().optional(),
  buttons: import_zod10.z.array(templateButtonSchema).optional(),
  example: import_zod10.z.object({
    header_text: import_zod10.z.array(import_zod10.z.string()).optional(),
    header_text_named_params: import_zod10.z.array(templateNamedParamExampleSchema).optional(),
    header_handle: import_zod10.z.array(import_zod10.z.string()).optional(),
    body_text: import_zod10.z.array(import_zod10.z.array(import_zod10.z.string())).optional(),
    body_text_named_params: import_zod10.z.array(templateNamedParamExampleSchema).optional()
  }).optional()
});
var hasBody = (components) => components.some((c) => c.type === "BODY");
var hasMaxOneHeader = (components) => components.filter((c) => c.type === "HEADER").length <= 1;
var hasMaxOneFooter = (components) => components.filter((c) => c.type === "FOOTER").length <= 1;
var hasMaxOneButtons = (components) => components.filter((c) => c.type === "BUTTONS").length <= 1;
var baseComponentsSchema = import_zod10.z.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" }).refine(hasMaxOneHeader, { message: "Only one HEADER component is allowed" }).refine(hasMaxOneFooter, { message: "Only one FOOTER component is allowed" }).refine(hasMaxOneButtons, {
  message: "Only one BUTTONS component is allowed"
});
var templateNameSchema = import_zod10.z.string().min(1, "Template name is required").max(512, "Template name must be 512 characters or less");
var templateCreateMarketingSchema = import_zod10.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod10.z.literal("MARKETING"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateUtilitySchema = import_zod10.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod10.z.literal("UTILITY"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateAuthenticationSchema = import_zod10.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod10.z.literal("AUTHENTICATION"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: import_zod10.z.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" })
});
var templateCreateSchema = import_zod10.z.discriminatedUnion("category", [
  templateCreateMarketingSchema,
  templateCreateUtilitySchema,
  templateCreateAuthenticationSchema
]);
var templateUpdateSchema = import_zod10.z.object({
  category: templateCategorySchema.optional(),
  components: import_zod10.z.array(templateComponentInputSchema).optional(),
  language: templateLanguageSchema.optional(),
  name: import_zod10.z.string().min(1).max(512).optional()
});
var templateListSchema = import_zod10.z.object({
  name: import_zod10.z.string().optional(),
  limit: import_zod10.z.number().min(1).max(1e3).optional(),
  after: import_zod10.z.string().optional(),
  before: import_zod10.z.string().optional()
});
var templateDeleteSchema = import_zod10.z.object({
  name: import_zod10.z.string().optional(),
  hsm_id: import_zod10.z.string().optional()
}).refine((data) => data.name || data.hsm_id, {
  message: "Either name or hsm_id must be provided"
});
var templateSchema = import_zod10.z.object({
  id: import_zod10.z.string(),
  name: import_zod10.z.string(),
  language: import_zod10.z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
  components: import_zod10.z.array(templateComponentSchema),
  parameter_format: templateParameterFormatSchema.optional(),
  quality_score: templateQualityScoreSchema.optional(),
  rejected_reason: import_zod10.z.string().optional(),
  previous_category: import_zod10.z.string().optional()
});
var templateCreateResponseSchema = import_zod10.z.object({
  id: import_zod10.z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema
});
var templatePagingCursorsSchema = import_zod10.z.object({
  before: import_zod10.z.string().optional(),
  after: import_zod10.z.string().optional()
});
var templatePagingSchema = import_zod10.z.object({
  cursors: templatePagingCursorsSchema.optional(),
  next: import_zod10.z.string().optional(),
  previous: import_zod10.z.string().optional()
});
var templateListResponseSchema = import_zod10.z.object({
  data: import_zod10.z.array(templateSchema),
  paging: templatePagingSchema.optional()
});
var templateUpdateResponseSchema = import_zod10.z.object({
  success: import_zod10.z.boolean()
});
var templateDeleteResponseSchema = import_zod10.z.object({
  success: import_zod10.z.boolean()
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
var import_zod11 = require("zod");
var mediaTypeSchema = import_zod11.z.enum([
  "image",
  "video",
  "audio",
  "document",
  "sticker"
]);
var mediaMimeTypeSchema = import_zod11.z.string();
var mediaUploadSchema = import_zod11.z.object({
  /**
   * The file to upload - can be Buffer, Blob, or File
   */
  file: import_zod11.z.union([import_zod11.z.instanceof(Blob), import_zod11.z.instanceof(ArrayBuffer)]),
  /**
   * MIME type of the file (e.g., "image/jpeg", "video/mp4")
   */
  mimeType: import_zod11.z.string().min(1),
  /**
   * Optional filename
   */
  filename: import_zod11.z.string().optional()
});
var mediaUploadResponseSchema = import_zod11.z.object({
  id: import_zod11.z.string()
});
var mediaMetadataSchema = import_zod11.z.object({
  messaging_product: import_zod11.z.literal("whatsapp"),
  url: import_zod11.z.string(),
  mime_type: import_zod11.z.string(),
  sha256: import_zod11.z.string(),
  file_size: import_zod11.z.string(),
  id: import_zod11.z.string()
});
var mediaDeleteResponseSchema = import_zod11.z.object({
  success: import_zod11.z.boolean()
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
var import_zod12 = require("zod");
var webhookContactSchema = import_zod12.z.object({
  profile: import_zod12.z.object({
    name: import_zod12.z.string()
  }),
  wa_id: import_zod12.z.string()
});
var webhookMetadataSchema = import_zod12.z.object({
  display_phone_number: import_zod12.z.string(),
  phone_number_id: import_zod12.z.string()
});
var webhookConversationOriginSchema = import_zod12.z.object({
  type: import_zod12.z.enum([
    "authentication",
    "authentication_international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var webhookConversationSchema = import_zod12.z.object({
  id: import_zod12.z.string(),
  expiration_timestamp: import_zod12.z.string().optional(),
  origin: webhookConversationOriginSchema
});
var webhookPricingSchema = import_zod12.z.object({
  billable: import_zod12.z.boolean(),
  pricing_model: import_zod12.z.enum(["CBP", "PMP"]),
  type: import_zod12.z.enum(["regular", "free_customer_service", "free_entry_point"]),
  category: import_zod12.z.enum([
    "authentication",
    "authentication-international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var webhookStatusErrorSchema = import_zod12.z.object({
  code: import_zod12.z.number(),
  title: import_zod12.z.string(),
  message: import_zod12.z.string(),
  error_data: import_zod12.z.object({
    details: import_zod12.z.string()
  }),
  href: import_zod12.z.string()
});
var webhookStatusSchema = import_zod12.z.object({
  id: import_zod12.z.string(),
  status: import_zod12.z.enum(["sent", "delivered", "read", "failed", "played"]),
  timestamp: import_zod12.z.string(),
  recipient_id: import_zod12.z.string(),
  recipient_type: import_zod12.z.literal("group").optional(),
  recipient_participant_id: import_zod12.z.string().optional(),
  recipient_identity_key_hash: import_zod12.z.string().optional(),
  biz_opaque_callback_data: import_zod12.z.string().optional(),
  conversation: webhookConversationSchema.optional(),
  pricing: webhookPricingSchema.optional(),
  errors: import_zod12.z.array(webhookStatusErrorSchema).optional()
});
var webhookValueSchema = import_zod12.z.object({
  messaging_product: import_zod12.z.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: import_zod12.z.array(webhookContactSchema).optional(),
  messages: import_zod12.z.array(messageIncomingSchema).optional(),
  statuses: import_zod12.z.array(webhookStatusSchema).optional()
});
var webhookChangeSchema = import_zod12.z.object({
  value: webhookValueSchema,
  field: import_zod12.z.literal("messages")
});
var webhookEntrySchema = import_zod12.z.object({
  id: import_zod12.z.string(),
  // WABA ID
  changes: import_zod12.z.array(webhookChangeSchema)
});
var webhookPayloadSchema = import_zod12.z.object({
  object: import_zod12.z.literal("whatsapp_business_account"),
  entry: import_zod12.z.array(webhookEntrySchema)
});
var webhookVerifyQuerySchema = import_zod12.z.object({
  "hub.mode": import_zod12.z.string().optional(),
  "hub.verify_token": import_zod12.z.string().optional(),
  "hub.challenge": import_zod12.z.string().optional()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
