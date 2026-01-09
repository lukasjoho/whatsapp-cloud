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
  BusinessResource: () => BusinessResource,
  GraphAPIError: () => GraphAPIError,
  HttpClient: () => HttpClient,
  MediaResource: () => MediaResource,
  MessagesResource: () => MessagesResource,
  PhoneNumbersResource: () => PhoneNumbersResource,
  TemplatesResource: () => TemplatesResource,
  WabasResource: () => WabasResource,
  WebhooksResource: () => WebhooksResource,
  WhatsAppClient: () => WhatsAppClient,
  accountReviewStatusSchema: () => accountReviewStatusSchema,
  buildMessagePayload: () => buildMessagePayload,
  businessGetOptionsSchema: () => businessGetOptionsSchema,
  businessProfileResponseSchema: () => businessProfileResponseSchema,
  businessProfileSchema: () => businessProfileSchema,
  businessProfileUpdateResponseSchema: () => businessProfileUpdateResponseSchema,
  businessProfileUpdateSchema: () => businessProfileUpdateSchema,
  businessSchema: () => businessSchema,
  businessVerificationStatusSchema: () => businessVerificationStatusSchema,
  clientConfigSchema: () => clientConfigSchema,
  codeMethodSchema: () => codeMethodSchema,
  cursorPagingSchema: () => cursorPagingSchema,
  debugTokenResponseSchema: () => debugTokenResponseSchema,
  extractMessages: () => extractMessages,
  extractStatuses: () => extractStatuses,
  mediaDeleteResponseSchema: () => mediaDeleteResponseSchema,
  mediaMetadataSchema: () => mediaMetadataSchema,
  mediaMimeTypeSchema: () => mediaMimeTypeSchema,
  mediaTypeSchema: () => mediaTypeSchema,
  mediaUploadResponseSchema: () => mediaUploadResponseSchema,
  mediaUploadSchema: () => mediaUploadSchema,
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
  onBehalfOfBusinessInfoSchema: () => onBehalfOfBusinessInfoSchema,
  phoneNumberAddResponseSchema: () => phoneNumberAddResponseSchema,
  phoneNumberAddSchema: () => phoneNumberAddSchema,
  phoneNumberDeregisterSchema: () => phoneNumberDeregisterSchema,
  phoneNumberListOptionsSchema: () => phoneNumberListOptionsSchema,
  phoneNumberListResponseSchema: () => phoneNumberListResponseSchema,
  phoneNumberQualityRatingSchema: () => phoneNumberQualityRatingSchema,
  phoneNumberRegisterResponseSchema: () => phoneNumberRegisterResponseSchema,
  phoneNumberRegisterSchema: () => phoneNumberRegisterSchema,
  phoneNumberResponseSchema: () => phoneNumberResponseSchema,
  phoneNumberSchema: () => phoneNumberSchema,
  phoneNumberStatusSchema: () => phoneNumberStatusSchema,
  requestVerificationCodeSchema: () => requestVerificationCodeSchema,
  subscribeAppResponseSchema: () => subscribeAppResponseSchema,
  subscribedAppSchema: () => subscribedAppSchema,
  subscribedAppsListResponseSchema: () => subscribedAppsListResponseSchema,
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
  unsubscribeAppResponseSchema: () => unsubscribeAppResponseSchema,
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
  webhookValueSchema: () => webhookValueSchema,
  webhookVerifyQuerySchema: () => webhookVerifyQuerySchema
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
  // ===========================================================================
  // Subscribed Apps
  // ===========================================================================
  /**
   * List apps subscribed to this WABA
   *
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns List of subscribed apps
   */
  async listSubscribedApps(wabaId) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.get(
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
  async subscribeApp(wabaId) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.post(
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
  async unsubscribeApp(wabaId) {
    const id = this.getWabaId(wabaId);
    return this.httpClient.delete(
      `/${id}/subscribed_apps`
    );
  }
};

// src/resources/wabas/schema.ts
var import_zod3 = require("zod");
var accountReviewStatusSchema = import_zod3.z.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "RESTRICTED"
]);
var businessVerificationStatusSchema = import_zod3.z.enum([
  "VERIFIED",
  "UNVERIFIED",
  "PENDING",
  "REJECTED"
]);
var wabaBusinessTypeSchema = import_zod3.z.enum(["ENTERPRISE", "SMB"]);
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
var wabaListOptionsSchema = import_zod3.z.object({
  fields: import_zod3.z.string().optional(),
  business_type: import_zod3.z.array(wabaBusinessTypeSchema).optional(),
  limit: import_zod3.z.number().min(1).max(100).optional(),
  after: import_zod3.z.string().optional(),
  before: import_zod3.z.string().optional()
});
var subscribedAppSchema = import_zod3.z.object({
  whatsapp_business_api_data: import_zod3.z.object({
    id: import_zod3.z.string().optional(),
    link: import_zod3.z.string().optional(),
    name: import_zod3.z.string().optional()
  }).optional()
});
var subscribedAppsListResponseSchema = import_zod3.z.object({
  data: import_zod3.z.array(subscribedAppSchema)
});
var subscribeAppResponseSchema = import_zod3.z.object({
  success: import_zod3.z.boolean()
});
var unsubscribeAppResponseSchema = import_zod3.z.object({
  success: import_zod3.z.boolean()
});

// src/resources/phoneNumbers/resource.ts
var PhoneNumbersResource = class {
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
   * @param options - Query options (fields, pagination)
   * @param wabaId - WABA ID (overrides config.businessAccountId)
   * @returns List of phone numbers
   *
   * @example
   * ```typescript
   * const numbers = await client.phoneNumbers.list();
   *
   * // With specific fields
   * const numbers = await client.phoneNumbers.list({
   *   fields: "id,display_phone_number,verified_name,quality_rating"
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
   * @param phoneNumberId - Phone number ID (overrides config)
   * @param fields - Comma-separated list of fields to return
   * @returns Phone number details
   */
  async get(phoneNumberId, fields) {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get(`/${id}${query}`);
  }
  // ===========================================================================
  // Add Phone Number
  // ===========================================================================
  /**
   * Add a phone number to a Business Portfolio
   *
   * This adds a phone number and associates it with a specific WABA.
   * After adding, you need to verify and register the number.
   *
   * @param data - Phone number data (includes waba_id for assignment)
   * @param businessId - Business Portfolio ID (overrides config)
   * @returns Created phone number ID
   *
   * @example
   * ```typescript
   * const result = await client.phoneNumbers.add({
   *   phone_number: "+14155551234",
   *   waba_id: "WABA_ID",
   *   verified_name: "My Business"
   * });
   * console.log(result.id); // New phone number ID
   * ```
   */
  async add(data, businessId) {
    const id = this.getBusinessId(businessId);
    return this.httpClient.post(
      `/${id}/add_phone_numbers`,
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
    return this.httpClient.post(`/${id}/verify_code`, data);
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
var import_zod4 = require("zod");
var phoneNumberQualityRatingSchema = import_zod4.z.enum([
  "GREEN",
  "YELLOW",
  "RED",
  "UNKNOWN"
]);
var phoneNumberStatusSchema = import_zod4.z.enum([
  "PENDING",
  "DELETED",
  "MIGRATED",
  "BANNED",
  "RESTRICTED",
  "RATE_LIMITED",
  "FLAGGED",
  "CONNECTED",
  "DISCONNECTED",
  "UNKNOWN"
]);
var codeMethodSchema = import_zod4.z.enum(["SMS", "VOICE"]);
var verticalSchema = import_zod4.z.enum([
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
var phoneNumberResponseSchema = import_zod4.z.object({
  id: import_zod4.z.string(),
  display_phone_number: import_zod4.z.string(),
  verified_name: import_zod4.z.string(),
  quality_rating: phoneNumberQualityRatingSchema.optional(),
  code_verification_status: import_zod4.z.string().optional(),
  is_official_business_account: import_zod4.z.boolean().optional(),
  account_mode: import_zod4.z.string().optional(),
  eligibility_for_api_business_global_search: import_zod4.z.string().optional(),
  is_pin_enabled: import_zod4.z.boolean().optional(),
  name_status: import_zod4.z.string().optional(),
  new_name_status: import_zod4.z.string().optional(),
  status: phoneNumberStatusSchema.optional(),
  search_visibility: import_zod4.z.string().optional(),
  messaging_limit_tier: import_zod4.z.string().optional()
});
var phoneNumberListResponseSchema = import_zod4.z.object({
  data: import_zod4.z.array(phoneNumberResponseSchema),
  paging: import_zod4.z.object({
    cursors: import_zod4.z.object({
      before: import_zod4.z.string().optional(),
      after: import_zod4.z.string().optional()
    }).optional(),
    next: import_zod4.z.string().optional(),
    previous: import_zod4.z.string().optional()
  }).optional()
});
var phoneNumberAddSchema = import_zod4.z.object({
  phone_number: import_zod4.z.string(),
  country_code: import_zod4.z.string().optional(),
  verified_name: import_zod4.z.string().optional(),
  waba_id: import_zod4.z.string()
});
var phoneNumberAddResponseSchema = import_zod4.z.object({
  id: import_zod4.z.string()
});
var phoneNumberRegisterSchema = import_zod4.z.object({
  messaging_product: import_zod4.z.literal("whatsapp"),
  pin: import_zod4.z.string().min(6).max(6)
});
var phoneNumberDeregisterSchema = import_zod4.z.object({
  messaging_product: import_zod4.z.literal("whatsapp").optional()
});
var phoneNumberRegisterResponseSchema = import_zod4.z.object({
  success: import_zod4.z.boolean()
});
var requestVerificationCodeSchema = import_zod4.z.object({
  code_method: codeMethodSchema,
  language: import_zod4.z.string().optional()
});
var verifyCodeSchema = import_zod4.z.object({
  code: import_zod4.z.string()
});
var verificationResponseSchema = import_zod4.z.object({
  success: import_zod4.z.boolean()
});
var businessProfileSchema = import_zod4.z.object({
  messaging_product: import_zod4.z.literal("whatsapp").optional(),
  about: import_zod4.z.string().max(139).optional(),
  address: import_zod4.z.string().max(256).optional(),
  description: import_zod4.z.string().max(512).optional(),
  email: import_zod4.z.string().email().optional(),
  profile_picture_url: import_zod4.z.string().url().optional(),
  websites: import_zod4.z.array(import_zod4.z.string().url()).max(2).optional(),
  vertical: verticalSchema.optional()
});
var businessProfileResponseSchema = import_zod4.z.object({
  data: import_zod4.z.array(businessProfileSchema)
});
var businessProfileUpdateSchema = businessProfileSchema.extend({
  messaging_product: import_zod4.z.literal("whatsapp")
});
var businessProfileUpdateResponseSchema = import_zod4.z.object({
  success: import_zod4.z.boolean()
});
var phoneNumberListOptionsSchema = import_zod4.z.object({
  fields: import_zod4.z.string().optional(),
  limit: import_zod4.z.number().min(1).max(100).optional(),
  after: import_zod4.z.string().optional(),
  before: import_zod4.z.string().optional()
});

// src/resources/messages/schema.ts
var import_zod5 = require("zod");
var phoneNumberSchema = import_zod5.z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format (use E.164: +1234567890)");
var messageTextContentSchema = import_zod5.z.object({
  body: import_zod5.z.string().min(1).max(4096),
  preview_url: import_zod5.z.boolean().optional()
});
var messageImageContentSchema = import_zod5.z.object({
  id: import_zod5.z.string().optional(),
  link: import_zod5.z.string().url().optional(),
  caption: import_zod5.z.string().max(1024).optional()
}).refine((data) => data.link || data.id, "Either link or id must be provided");
var messageLocationContentSchema = import_zod5.z.object({
  longitude: import_zod5.z.number().min(-180).max(180),
  latitude: import_zod5.z.number().min(-90).max(90),
  name: import_zod5.z.string().optional(),
  address: import_zod5.z.string().optional()
});
var messageReactionContentSchema = import_zod5.z.object({
  message_id: import_zod5.z.string().min(1),
  emoji: import_zod5.z.string().min(1).max(1)
});
var messageSendTextSchema = import_zod5.z.object({
  to: phoneNumberSchema,
  text: messageTextContentSchema
});
var messageSendImageSchema = import_zod5.z.object({
  to: phoneNumberSchema,
  image: messageImageContentSchema
});
var messageSendLocationSchema = import_zod5.z.object({
  to: phoneNumberSchema,
  location: messageLocationContentSchema
});
var messageSendReactionSchema = import_zod5.z.object({
  to: phoneNumberSchema,
  reaction: messageReactionContentSchema
});
var messageTextSchema = messageSendTextSchema.extend({
  type: import_zod5.z.literal("text")
});
var messageImageSchema = messageSendImageSchema.extend({
  type: import_zod5.z.literal("image")
});
var messageLocationSchema = messageSendLocationSchema.extend({
  type: import_zod5.z.literal("location")
});
var messageReactionSchema = messageSendReactionSchema.extend({
  type: import_zod5.z.literal("reaction")
});
var messageOutgoingSchema = import_zod5.z.discriminatedUnion("type", [
  messageTextSchema,
  messageImageSchema,
  messageLocationSchema,
  messageReactionSchema
]);
var messageSendResponseSchema = import_zod5.z.object({
  messaging_product: import_zod5.z.literal("whatsapp"),
  contacts: import_zod5.z.array(
    import_zod5.z.object({
      input: import_zod5.z.string(),
      wa_id: import_zod5.z.string()
    })
  ),
  messages: import_zod5.z.array(
    import_zod5.z.object({
      id: import_zod5.z.string(),
      message_status: import_zod5.z.string().optional()
    })
  )
});
var incomingMessageBaseSchema = import_zod5.z.object({
  from: import_zod5.z.string(),
  id: import_zod5.z.string(),
  timestamp: import_zod5.z.string()
});
var messageIncomingTextSchema = incomingMessageBaseSchema.extend({
  type: import_zod5.z.literal("text"),
  text: import_zod5.z.object({
    body: import_zod5.z.string()
  })
});
var messageIncomingImageSchema = incomingMessageBaseSchema.extend({
  type: import_zod5.z.literal("image"),
  image: import_zod5.z.object({
    id: import_zod5.z.string(),
    mime_type: import_zod5.z.string().optional(),
    caption: import_zod5.z.string().optional()
  })
});
var messageIncomingAudioSchema = incomingMessageBaseSchema.extend({
  type: import_zod5.z.literal("audio"),
  audio: import_zod5.z.object({
    id: import_zod5.z.string(),
    mime_type: import_zod5.z.string().optional()
  })
});
var messageIncomingSchema = import_zod5.z.discriminatedUnion("type", [
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
var import_zod6 = require("zod");
var templateLanguageSchema = import_zod6.z.enum([
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
var templateCategorySchema = import_zod6.z.enum([
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY"
]);
var templateParameterFormatSchema = import_zod6.z.enum(["positional", "named"]);
var templateStatusSchema = import_zod6.z.enum([
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
var templateQualityScoreSchema = import_zod6.z.object({
  score: import_zod6.z.enum(["GREEN", "YELLOW", "RED", "UNKNOWN"]).optional(),
  date: import_zod6.z.number().optional()
});
var templateNamedParamExampleSchema = import_zod6.z.object({
  param_name: import_zod6.z.string(),
  example: import_zod6.z.string()
});
var templateQuickReplyButtonInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("QUICK_REPLY"),
  text: import_zod6.z.string().min(1).max(25, "Button text must be 25 characters or less")
});
var templateUrlButtonInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("URL"),
  text: import_zod6.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: import_zod6.z.string().url().max(2e3, "URL must be 2000 characters or less"),
  example: import_zod6.z.array(import_zod6.z.string()).optional()
});
var templatePhoneNumberButtonInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("PHONE_NUMBER"),
  text: import_zod6.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: import_zod6.z.string().min(1).max(20, "Phone number must be 20 characters or less")
});
var templateCopyCodeButtonInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("COPY_CODE"),
  example: import_zod6.z.string().max(15).optional()
});
var templateFlowButtonInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("FLOW"),
  text: import_zod6.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_id: import_zod6.z.string().optional(),
  flow_action: import_zod6.z.enum(["navigate", "data_exchange"]).optional(),
  navigate_screen: import_zod6.z.string().optional()
});
var templateButtonInputSchema = import_zod6.z.discriminatedUnion("type", [
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema
]);
var templateHeaderTextExampleSchema = import_zod6.z.object({
  // Positional: header_text: ["value1"]
  header_text: import_zod6.z.array(import_zod6.z.string()).optional(),
  // Named: header_text_named_params: [{ param_name: "name", example: "value" }]
  header_text_named_params: import_zod6.z.array(templateNamedParamExampleSchema).optional()
});
var templateHeaderTextInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("HEADER"),
  format: import_zod6.z.literal("TEXT"),
  text: import_zod6.z.string().min(1).max(60, "Header text must be 60 characters or less"),
  example: templateHeaderTextExampleSchema.optional()
});
var templateHeaderMediaInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("HEADER"),
  format: import_zod6.z.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  example: import_zod6.z.object({
    header_handle: import_zod6.z.array(import_zod6.z.string()).min(1, "At least one header_handle is required")
  })
});
var templateHeaderLocationInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("HEADER"),
  format: import_zod6.z.literal("LOCATION")
});
var templateHeaderComponentInputSchema = import_zod6.z.discriminatedUnion(
  "format",
  [
    templateHeaderTextInputSchema,
    templateHeaderMediaInputSchema,
    templateHeaderLocationInputSchema
  ]
);
var templateBodyExampleSchema = import_zod6.z.object({
  // Positional: body_text: [["value1", "value2"]]
  body_text: import_zod6.z.array(import_zod6.z.array(import_zod6.z.string())).optional(),
  // Named: body_text_named_params: [{ param_name: "name", example: "value" }]
  body_text_named_params: import_zod6.z.array(templateNamedParamExampleSchema).optional()
});
var templateBodyComponentInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("BODY"),
  text: import_zod6.z.string().min(1).max(1024, "Body text must be 1024 characters or less"),
  example: templateBodyExampleSchema.optional()
});
var templateFooterComponentInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("FOOTER"),
  text: import_zod6.z.string().min(1).max(60, "Footer text must be 60 characters or less")
});
var templateButtonsComponentInputSchema = import_zod6.z.object({
  type: import_zod6.z.literal("BUTTONS"),
  buttons: import_zod6.z.array(templateButtonInputSchema).min(1).max(10, "Maximum 10 buttons allowed")
});
var templateComponentInputSchema = import_zod6.z.union([
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema
]);
var templateButtonSchema = import_zod6.z.object({
  type: import_zod6.z.string(),
  text: import_zod6.z.string().optional(),
  url: import_zod6.z.string().optional(),
  phone_number: import_zod6.z.string().optional(),
  example: import_zod6.z.union([import_zod6.z.array(import_zod6.z.string()), import_zod6.z.string()]).optional(),
  flow_id: import_zod6.z.string().optional(),
  flow_action: import_zod6.z.string().optional(),
  navigate_screen: import_zod6.z.string().optional()
});
var templateComponentSchema = import_zod6.z.object({
  type: import_zod6.z.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  format: import_zod6.z.string().optional(),
  text: import_zod6.z.string().optional(),
  buttons: import_zod6.z.array(templateButtonSchema).optional(),
  example: import_zod6.z.object({
    header_text: import_zod6.z.array(import_zod6.z.string()).optional(),
    header_text_named_params: import_zod6.z.array(templateNamedParamExampleSchema).optional(),
    header_handle: import_zod6.z.array(import_zod6.z.string()).optional(),
    body_text: import_zod6.z.array(import_zod6.z.array(import_zod6.z.string())).optional(),
    body_text_named_params: import_zod6.z.array(templateNamedParamExampleSchema).optional()
  }).optional()
});
var hasBody = (components) => components.some((c) => c.type === "BODY");
var hasMaxOneHeader = (components) => components.filter((c) => c.type === "HEADER").length <= 1;
var hasMaxOneFooter = (components) => components.filter((c) => c.type === "FOOTER").length <= 1;
var hasMaxOneButtons = (components) => components.filter((c) => c.type === "BUTTONS").length <= 1;
var baseComponentsSchema = import_zod6.z.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" }).refine(hasMaxOneHeader, { message: "Only one HEADER component is allowed" }).refine(hasMaxOneFooter, { message: "Only one FOOTER component is allowed" }).refine(hasMaxOneButtons, {
  message: "Only one BUTTONS component is allowed"
});
var templateNameSchema = import_zod6.z.string().min(1, "Template name is required").max(512, "Template name must be 512 characters or less");
var templateCreateMarketingSchema = import_zod6.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod6.z.literal("MARKETING"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateUtilitySchema = import_zod6.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod6.z.literal("UTILITY"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateAuthenticationSchema = import_zod6.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod6.z.literal("AUTHENTICATION"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: import_zod6.z.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" })
});
var templateCreateSchema = import_zod6.z.discriminatedUnion("category", [
  templateCreateMarketingSchema,
  templateCreateUtilitySchema,
  templateCreateAuthenticationSchema
]);
var templateUpdateSchema = import_zod6.z.object({
  category: templateCategorySchema.optional(),
  components: import_zod6.z.array(templateComponentInputSchema).optional(),
  language: templateLanguageSchema.optional(),
  name: import_zod6.z.string().min(1).max(512).optional()
});
var templateListSchema = import_zod6.z.object({
  name: import_zod6.z.string().optional(),
  limit: import_zod6.z.number().min(1).max(1e3).optional(),
  after: import_zod6.z.string().optional(),
  before: import_zod6.z.string().optional()
});
var templateDeleteSchema = import_zod6.z.object({
  name: import_zod6.z.string().optional(),
  hsm_id: import_zod6.z.string().optional()
}).refine((data) => data.name || data.hsm_id, {
  message: "Either name or hsm_id must be provided"
});
var templateSchema = import_zod6.z.object({
  id: import_zod6.z.string(),
  name: import_zod6.z.string(),
  language: import_zod6.z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
  components: import_zod6.z.array(templateComponentSchema),
  parameter_format: templateParameterFormatSchema.optional(),
  quality_score: templateQualityScoreSchema.optional(),
  rejected_reason: import_zod6.z.string().optional(),
  previous_category: import_zod6.z.string().optional()
});
var templateCreateResponseSchema = import_zod6.z.object({
  id: import_zod6.z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema
});
var templatePagingCursorsSchema = import_zod6.z.object({
  before: import_zod6.z.string().optional(),
  after: import_zod6.z.string().optional()
});
var templatePagingSchema = import_zod6.z.object({
  cursors: templatePagingCursorsSchema.optional(),
  next: import_zod6.z.string().optional(),
  previous: import_zod6.z.string().optional()
});
var templateListResponseSchema = import_zod6.z.object({
  data: import_zod6.z.array(templateSchema),
  paging: templatePagingSchema.optional()
});
var templateUpdateResponseSchema = import_zod6.z.object({
  success: import_zod6.z.boolean()
});
var templateDeleteResponseSchema = import_zod6.z.object({
  success: import_zod6.z.boolean()
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
var import_zod7 = require("zod");
var mediaTypeSchema = import_zod7.z.enum([
  "image",
  "video",
  "audio",
  "document",
  "sticker"
]);
var mediaMimeTypeSchema = import_zod7.z.string();
var mediaUploadSchema = import_zod7.z.object({
  /**
   * The file to upload - can be Buffer, Blob, or File
   */
  file: import_zod7.z.union([import_zod7.z.instanceof(Blob), import_zod7.z.instanceof(ArrayBuffer)]),
  /**
   * MIME type of the file (e.g., "image/jpeg", "video/mp4")
   */
  mimeType: import_zod7.z.string().min(1),
  /**
   * Optional filename
   */
  filename: import_zod7.z.string().optional()
});
var mediaUploadResponseSchema = import_zod7.z.object({
  id: import_zod7.z.string()
});
var mediaMetadataSchema = import_zod7.z.object({
  messaging_product: import_zod7.z.literal("whatsapp"),
  url: import_zod7.z.string(),
  mime_type: import_zod7.z.string(),
  sha256: import_zod7.z.string(),
  file_size: import_zod7.z.string(),
  id: import_zod7.z.string()
});
var mediaDeleteResponseSchema = import_zod7.z.object({
  success: import_zod7.z.boolean()
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
var import_zod8 = require("zod");
var webhookContactSchema = import_zod8.z.object({
  profile: import_zod8.z.object({
    name: import_zod8.z.string()
  }),
  wa_id: import_zod8.z.string()
});
var webhookMetadataSchema = import_zod8.z.object({
  display_phone_number: import_zod8.z.string(),
  phone_number_id: import_zod8.z.string()
});
var webhookConversationOriginSchema = import_zod8.z.object({
  type: import_zod8.z.enum([
    "authentication",
    "authentication_international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var webhookConversationSchema = import_zod8.z.object({
  id: import_zod8.z.string(),
  expiration_timestamp: import_zod8.z.string().optional(),
  origin: webhookConversationOriginSchema
});
var webhookPricingSchema = import_zod8.z.object({
  billable: import_zod8.z.boolean(),
  pricing_model: import_zod8.z.enum(["CBP", "PMP"]),
  type: import_zod8.z.enum(["regular", "free_customer_service", "free_entry_point"]),
  category: import_zod8.z.enum([
    "authentication",
    "authentication-international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var webhookStatusErrorSchema = import_zod8.z.object({
  code: import_zod8.z.number(),
  title: import_zod8.z.string(),
  message: import_zod8.z.string(),
  error_data: import_zod8.z.object({
    details: import_zod8.z.string()
  }),
  href: import_zod8.z.string()
});
var webhookStatusSchema = import_zod8.z.object({
  id: import_zod8.z.string(),
  status: import_zod8.z.enum(["sent", "delivered", "read", "failed", "played"]),
  timestamp: import_zod8.z.string(),
  recipient_id: import_zod8.z.string(),
  recipient_type: import_zod8.z.literal("group").optional(),
  recipient_participant_id: import_zod8.z.string().optional(),
  recipient_identity_key_hash: import_zod8.z.string().optional(),
  biz_opaque_callback_data: import_zod8.z.string().optional(),
  conversation: webhookConversationSchema.optional(),
  pricing: webhookPricingSchema.optional(),
  errors: import_zod8.z.array(webhookStatusErrorSchema).optional()
});
var webhookValueSchema = import_zod8.z.object({
  messaging_product: import_zod8.z.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: import_zod8.z.array(webhookContactSchema).optional(),
  messages: import_zod8.z.array(messageIncomingSchema).optional(),
  statuses: import_zod8.z.array(webhookStatusSchema).optional()
});
var webhookChangeSchema = import_zod8.z.object({
  value: webhookValueSchema,
  field: import_zod8.z.literal("messages")
});
var webhookEntrySchema = import_zod8.z.object({
  id: import_zod8.z.string(),
  // WABA ID
  changes: import_zod8.z.array(webhookChangeSchema)
});
var webhookPayloadSchema = import_zod8.z.object({
  object: import_zod8.z.literal("whatsapp_business_account"),
  entry: import_zod8.z.array(webhookEntrySchema)
});
var webhookVerifyQuerySchema = import_zod8.z.object({
  "hub.mode": import_zod8.z.string().optional(),
  "hub.verify_token": import_zod8.z.string().optional(),
  "hub.challenge": import_zod8.z.string().optional()
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
  BusinessResource,
  GraphAPIError,
  HttpClient,
  MediaResource,
  MessagesResource,
  PhoneNumbersResource,
  TemplatesResource,
  WabasResource,
  WebhooksResource,
  WhatsAppClient,
  accountReviewStatusSchema,
  buildMessagePayload,
  businessGetOptionsSchema,
  businessProfileResponseSchema,
  businessProfileSchema,
  businessProfileUpdateResponseSchema,
  businessProfileUpdateSchema,
  businessSchema,
  businessVerificationStatusSchema,
  clientConfigSchema,
  codeMethodSchema,
  cursorPagingSchema,
  debugTokenResponseSchema,
  extractMessages,
  extractStatuses,
  mediaDeleteResponseSchema,
  mediaMetadataSchema,
  mediaMimeTypeSchema,
  mediaTypeSchema,
  mediaUploadResponseSchema,
  mediaUploadSchema,
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
  onBehalfOfBusinessInfoSchema,
  phoneNumberAddResponseSchema,
  phoneNumberAddSchema,
  phoneNumberDeregisterSchema,
  phoneNumberListOptionsSchema,
  phoneNumberListResponseSchema,
  phoneNumberQualityRatingSchema,
  phoneNumberRegisterResponseSchema,
  phoneNumberRegisterSchema,
  phoneNumberResponseSchema,
  phoneNumberSchema,
  phoneNumberStatusSchema,
  requestVerificationCodeSchema,
  subscribeAppResponseSchema,
  subscribedAppSchema,
  subscribedAppsListResponseSchema,
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
  unsubscribeAppResponseSchema,
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
  webhookValueSchema,
  webhookVerifyQuerySchema
});
