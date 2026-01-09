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
  GraphAPIError: () => GraphAPIError,
  MediaResource: () => MediaResource,
  MessagesResource: () => MessagesResource,
  TemplatesResource: () => TemplatesResource,
  WhatsAppClient: () => WhatsAppClient,
  buildMessagePayload: () => buildMessagePayload,
  businessAccountResponseSchema: () => businessAccountResponseSchema,
  businessAccountsListResponseSchema: () => businessAccountsListResponseSchema,
  clientConfigSchema: () => clientConfigSchema,
  debugTokenResponseSchema: () => debugTokenResponseSchema,
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
  phoneNumberListResponseSchema: () => phoneNumberListResponseSchema,
  phoneNumberResponseSchema: () => phoneNumberResponseSchema,
  phoneNumberSchema: () => phoneNumberSchema,
  statusSchema: () => statusSchema,
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
  webhookPayloadSchema: () => webhookPayloadSchema
});
module.exports = __toCommonJS(index_exports);

// src/schemas/client.ts
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

// src/errors.ts
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

// src/resources/messages/schema.ts
var import_zod2 = require("zod");
var phoneNumberSchema = import_zod2.z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format (use E.164: +1234567890)");
var messageTextContentSchema = import_zod2.z.object({
  body: import_zod2.z.string().min(1).max(4096),
  preview_url: import_zod2.z.boolean().optional()
});
var messageImageContentSchema = import_zod2.z.object({
  id: import_zod2.z.string().optional(),
  link: import_zod2.z.string().url().optional(),
  caption: import_zod2.z.string().max(1024).optional()
}).refine((data) => data.link || data.id, "Either link or id must be provided");
var messageLocationContentSchema = import_zod2.z.object({
  longitude: import_zod2.z.number().min(-180).max(180),
  latitude: import_zod2.z.number().min(-90).max(90),
  name: import_zod2.z.string().optional(),
  address: import_zod2.z.string().optional()
});
var messageReactionContentSchema = import_zod2.z.object({
  message_id: import_zod2.z.string().min(1),
  emoji: import_zod2.z.string().min(1).max(1)
});
var messageSendTextSchema = import_zod2.z.object({
  to: phoneNumberSchema,
  text: messageTextContentSchema
});
var messageSendImageSchema = import_zod2.z.object({
  to: phoneNumberSchema,
  image: messageImageContentSchema
});
var messageSendLocationSchema = import_zod2.z.object({
  to: phoneNumberSchema,
  location: messageLocationContentSchema
});
var messageSendReactionSchema = import_zod2.z.object({
  to: phoneNumberSchema,
  reaction: messageReactionContentSchema
});
var messageTextSchema = messageSendTextSchema.extend({
  type: import_zod2.z.literal("text")
});
var messageImageSchema = messageSendImageSchema.extend({
  type: import_zod2.z.literal("image")
});
var messageLocationSchema = messageSendLocationSchema.extend({
  type: import_zod2.z.literal("location")
});
var messageReactionSchema = messageSendReactionSchema.extend({
  type: import_zod2.z.literal("reaction")
});
var messageOutgoingSchema = import_zod2.z.discriminatedUnion("type", [
  messageTextSchema,
  messageImageSchema,
  messageLocationSchema,
  messageReactionSchema
]);
var messageSendResponseSchema = import_zod2.z.object({
  messaging_product: import_zod2.z.literal("whatsapp"),
  contacts: import_zod2.z.array(
    import_zod2.z.object({
      input: import_zod2.z.string(),
      wa_id: import_zod2.z.string()
    })
  ),
  messages: import_zod2.z.array(
    import_zod2.z.object({
      id: import_zod2.z.string(),
      message_status: import_zod2.z.string().optional()
    })
  )
});
var incomingMessageBaseSchema = import_zod2.z.object({
  from: import_zod2.z.string(),
  id: import_zod2.z.string(),
  timestamp: import_zod2.z.string()
});
var messageIncomingTextSchema = incomingMessageBaseSchema.extend({
  type: import_zod2.z.literal("text"),
  text: import_zod2.z.object({
    body: import_zod2.z.string()
  })
});
var messageIncomingImageSchema = incomingMessageBaseSchema.extend({
  type: import_zod2.z.literal("image"),
  image: import_zod2.z.object({
    id: import_zod2.z.string(),
    mime_type: import_zod2.z.string().optional(),
    caption: import_zod2.z.string().optional()
  })
});
var messageIncomingAudioSchema = incomingMessageBaseSchema.extend({
  type: import_zod2.z.literal("audio"),
  audio: import_zod2.z.object({
    id: import_zod2.z.string(),
    mime_type: import_zod2.z.string().optional()
  })
});
var messageIncomingSchema = import_zod2.z.discriminatedUnion("type", [
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
var import_zod3 = require("zod");
var templateLanguageSchema = import_zod3.z.enum([
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
var templateCategorySchema = import_zod3.z.enum([
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY"
]);
var templateParameterFormatSchema = import_zod3.z.enum(["positional", "named"]);
var templateStatusSchema = import_zod3.z.enum([
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
var templateQualityScoreSchema = import_zod3.z.object({
  score: import_zod3.z.enum(["GREEN", "YELLOW", "RED", "UNKNOWN"]).optional(),
  date: import_zod3.z.number().optional()
});
var templateNamedParamExampleSchema = import_zod3.z.object({
  param_name: import_zod3.z.string(),
  example: import_zod3.z.string()
});
var templateQuickReplyButtonInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("QUICK_REPLY"),
  text: import_zod3.z.string().min(1).max(25, "Button text must be 25 characters or less")
});
var templateUrlButtonInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("URL"),
  text: import_zod3.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: import_zod3.z.string().url().max(2e3, "URL must be 2000 characters or less"),
  example: import_zod3.z.array(import_zod3.z.string()).optional()
});
var templatePhoneNumberButtonInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("PHONE_NUMBER"),
  text: import_zod3.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: import_zod3.z.string().min(1).max(20, "Phone number must be 20 characters or less")
});
var templateCopyCodeButtonInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("COPY_CODE"),
  example: import_zod3.z.string().max(15).optional()
});
var templateFlowButtonInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("FLOW"),
  text: import_zod3.z.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_id: import_zod3.z.string().optional(),
  flow_action: import_zod3.z.enum(["navigate", "data_exchange"]).optional(),
  navigate_screen: import_zod3.z.string().optional()
});
var templateButtonInputSchema = import_zod3.z.discriminatedUnion("type", [
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema
]);
var templateHeaderTextExampleSchema = import_zod3.z.object({
  // Positional: header_text: ["value1"]
  header_text: import_zod3.z.array(import_zod3.z.string()).optional(),
  // Named: header_text_named_params: [{ param_name: "name", example: "value" }]
  header_text_named_params: import_zod3.z.array(templateNamedParamExampleSchema).optional()
});
var templateHeaderTextInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("HEADER"),
  format: import_zod3.z.literal("TEXT"),
  text: import_zod3.z.string().min(1).max(60, "Header text must be 60 characters or less"),
  example: templateHeaderTextExampleSchema.optional()
});
var templateHeaderMediaInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("HEADER"),
  format: import_zod3.z.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  example: import_zod3.z.object({
    header_handle: import_zod3.z.array(import_zod3.z.string()).min(1, "At least one header_handle is required")
  })
});
var templateHeaderLocationInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("HEADER"),
  format: import_zod3.z.literal("LOCATION")
});
var templateHeaderComponentInputSchema = import_zod3.z.discriminatedUnion(
  "format",
  [
    templateHeaderTextInputSchema,
    templateHeaderMediaInputSchema,
    templateHeaderLocationInputSchema
  ]
);
var templateBodyExampleSchema = import_zod3.z.object({
  // Positional: body_text: [["value1", "value2"]]
  body_text: import_zod3.z.array(import_zod3.z.array(import_zod3.z.string())).optional(),
  // Named: body_text_named_params: [{ param_name: "name", example: "value" }]
  body_text_named_params: import_zod3.z.array(templateNamedParamExampleSchema).optional()
});
var templateBodyComponentInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("BODY"),
  text: import_zod3.z.string().min(1).max(1024, "Body text must be 1024 characters or less"),
  example: templateBodyExampleSchema.optional()
});
var templateFooterComponentInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("FOOTER"),
  text: import_zod3.z.string().min(1).max(60, "Footer text must be 60 characters or less")
});
var templateButtonsComponentInputSchema = import_zod3.z.object({
  type: import_zod3.z.literal("BUTTONS"),
  buttons: import_zod3.z.array(templateButtonInputSchema).min(1).max(10, "Maximum 10 buttons allowed")
});
var templateComponentInputSchema = import_zod3.z.union([
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema
]);
var templateButtonSchema = import_zod3.z.object({
  type: import_zod3.z.string(),
  text: import_zod3.z.string().optional(),
  url: import_zod3.z.string().optional(),
  phone_number: import_zod3.z.string().optional(),
  example: import_zod3.z.union([import_zod3.z.array(import_zod3.z.string()), import_zod3.z.string()]).optional(),
  flow_id: import_zod3.z.string().optional(),
  flow_action: import_zod3.z.string().optional(),
  navigate_screen: import_zod3.z.string().optional()
});
var templateComponentSchema = import_zod3.z.object({
  type: import_zod3.z.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  format: import_zod3.z.string().optional(),
  text: import_zod3.z.string().optional(),
  buttons: import_zod3.z.array(templateButtonSchema).optional(),
  example: import_zod3.z.object({
    header_text: import_zod3.z.array(import_zod3.z.string()).optional(),
    header_text_named_params: import_zod3.z.array(templateNamedParamExampleSchema).optional(),
    header_handle: import_zod3.z.array(import_zod3.z.string()).optional(),
    body_text: import_zod3.z.array(import_zod3.z.array(import_zod3.z.string())).optional(),
    body_text_named_params: import_zod3.z.array(templateNamedParamExampleSchema).optional()
  }).optional()
});
var hasBody = (components) => components.some((c) => c.type === "BODY");
var hasMaxOneHeader = (components) => components.filter((c) => c.type === "HEADER").length <= 1;
var hasMaxOneFooter = (components) => components.filter((c) => c.type === "FOOTER").length <= 1;
var hasMaxOneButtons = (components) => components.filter((c) => c.type === "BUTTONS").length <= 1;
var baseComponentsSchema = import_zod3.z.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" }).refine(hasMaxOneHeader, { message: "Only one HEADER component is allowed" }).refine(hasMaxOneFooter, { message: "Only one FOOTER component is allowed" }).refine(hasMaxOneButtons, {
  message: "Only one BUTTONS component is allowed"
});
var templateNameSchema = import_zod3.z.string().min(1, "Template name is required").max(512, "Template name must be 512 characters or less");
var templateCreateMarketingSchema = import_zod3.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod3.z.literal("MARKETING"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateUtilitySchema = import_zod3.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod3.z.literal("UTILITY"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateAuthenticationSchema = import_zod3.z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: import_zod3.z.literal("AUTHENTICATION"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: import_zod3.z.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" })
});
var templateCreateSchema = import_zod3.z.discriminatedUnion("category", [
  templateCreateMarketingSchema,
  templateCreateUtilitySchema,
  templateCreateAuthenticationSchema
]);
var templateUpdateSchema = import_zod3.z.object({
  category: templateCategorySchema.optional(),
  components: import_zod3.z.array(templateComponentInputSchema).optional(),
  language: templateLanguageSchema.optional(),
  name: import_zod3.z.string().min(1).max(512).optional()
});
var templateListSchema = import_zod3.z.object({
  name: import_zod3.z.string().optional(),
  limit: import_zod3.z.number().min(1).max(1e3).optional(),
  after: import_zod3.z.string().optional(),
  before: import_zod3.z.string().optional()
});
var templateDeleteSchema = import_zod3.z.object({
  name: import_zod3.z.string().optional(),
  hsm_id: import_zod3.z.string().optional()
}).refine((data) => data.name || data.hsm_id, {
  message: "Either name or hsm_id must be provided"
});
var templateSchema = import_zod3.z.object({
  id: import_zod3.z.string(),
  name: import_zod3.z.string(),
  language: import_zod3.z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
  components: import_zod3.z.array(templateComponentSchema),
  parameter_format: templateParameterFormatSchema.optional(),
  quality_score: templateQualityScoreSchema.optional(),
  rejected_reason: import_zod3.z.string().optional(),
  previous_category: import_zod3.z.string().optional()
});
var templateCreateResponseSchema = import_zod3.z.object({
  id: import_zod3.z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema
});
var templatePagingCursorsSchema = import_zod3.z.object({
  before: import_zod3.z.string().optional(),
  after: import_zod3.z.string().optional()
});
var templatePagingSchema = import_zod3.z.object({
  cursors: templatePagingCursorsSchema.optional(),
  next: import_zod3.z.string().optional(),
  previous: import_zod3.z.string().optional()
});
var templateListResponseSchema = import_zod3.z.object({
  data: import_zod3.z.array(templateSchema),
  paging: templatePagingSchema.optional()
});
var templateUpdateResponseSchema = import_zod3.z.object({
  success: import_zod3.z.boolean()
});
var templateDeleteResponseSchema = import_zod3.z.object({
  success: import_zod3.z.boolean()
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
var import_zod4 = require("zod");
var mediaTypeSchema = import_zod4.z.enum([
  "image",
  "video",
  "audio",
  "document",
  "sticker"
]);
var mediaMimeTypeSchema = import_zod4.z.string();
var mediaUploadSchema = import_zod4.z.object({
  /**
   * The file to upload - can be Buffer, Blob, or File
   */
  file: import_zod4.z.union([import_zod4.z.instanceof(Blob), import_zod4.z.instanceof(ArrayBuffer)]),
  /**
   * MIME type of the file (e.g., "image/jpeg", "video/mp4")
   */
  mimeType: import_zod4.z.string().min(1),
  /**
   * Optional filename
   */
  filename: import_zod4.z.string().optional()
});
var mediaUploadResponseSchema = import_zod4.z.object({
  id: import_zod4.z.string()
});
var mediaMetadataSchema = import_zod4.z.object({
  messaging_product: import_zod4.z.literal("whatsapp"),
  url: import_zod4.z.string(),
  mime_type: import_zod4.z.string(),
  sha256: import_zod4.z.string(),
  file_size: import_zod4.z.string(),
  id: import_zod4.z.string()
});
var mediaDeleteResponseSchema = import_zod4.z.object({
  success: import_zod4.z.boolean()
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

// src/services/accounts/AccountsClient.ts
var AccountsClient = class {
  constructor(httpClient, businessAccountId) {
    this.httpClient = httpClient;
    this.businessAccountId = businessAccountId;
  }
  /**
   * Make a GET request with WABA ID prefix
   */
  async get(path) {
    return this.httpClient.get(`/${this.businessAccountId}${path}`);
  }
  /**
   * Make a POST request with WABA ID prefix
   */
  async post(path, body) {
    return this.httpClient.post(`/${this.businessAccountId}${path}`, body);
  }
  /**
   * Make a PATCH request with WABA ID prefix
   */
  async patch(path, body) {
    return this.httpClient.patch(`/${this.businessAccountId}${path}`, body);
  }
};

// src/services/accounts/methods/list-phone-numbers.ts
async function listPhoneNumbers(accountsClient) {
  return accountsClient.get("/phone_numbers");
}

// src/services/accounts/AccountsService.ts
var AccountsService = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Helper to create a Scoped Client (prefer override, fallback to config)
   */
  getClient(overrideId) {
    const id = overrideId || this.httpClient.businessAccountId;
    if (!id) {
      throw new Error(
        "businessAccountId (WABA ID) is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return new AccountsClient(this.httpClient, id);
  }
  /**
   * List phone numbers for a WhatsApp Business Account
   *
   * @param businessAccountId - Optional WABA ID (overrides client config)
   * @returns List of phone numbers associated with the WABA
   */
  async listPhoneNumbers(businessAccountId) {
    const client = this.getClient(businessAccountId);
    return listPhoneNumbers(client);
  }
};

// src/services/business/BusinessClient.ts
var BusinessClient = class {
  constructor(httpClient, businessId) {
    this.httpClient = httpClient;
    this.businessId = businessId;
  }
  /**
   * Make a GET request with Business Portfolio ID prefix
   */
  async get(path) {
    return this.httpClient.get(`/${this.businessId}${path}`);
  }
  /**
   * Make a POST request with Business Portfolio ID prefix
   */
  async post(path, body) {
    return this.httpClient.post(`/${this.businessId}${path}`, body);
  }
  /**
   * Make a PATCH request with Business Portfolio ID prefix
   */
  async patch(path, body) {
    return this.httpClient.patch(`/${this.businessId}${path}`, body);
  }
};

// src/services/business/methods/list-accounts.ts
async function listAccounts(businessClient) {
  return businessClient.get(
    "/whatsapp_business_accounts"
  );
}

// src/services/business/BusinessService.ts
var BusinessService = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Helper to create a Scoped Client (prefer override, fallback to config)
   */
  getClient(overrideId) {
    const id = overrideId || this.httpClient.businessId;
    if (!id) {
      throw new Error(
        "businessId (Business Portfolio ID) is required. Provide it in WhatsAppClient config or as a parameter."
      );
    }
    return new BusinessClient(this.httpClient, id);
  }
  /**
   * List WhatsApp Business Accounts (WABAs) for a Business Portfolio
   *
   * @param businessId - Optional Business Portfolio ID (overrides client config)
   * @returns List of WABAs associated with the Business Portfolio
   */
  async listAccounts(businessId) {
    const client = this.getClient(businessId);
    return listAccounts(client);
  }
};

// src/services/webhooks/utils/extract-messages.ts
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

// src/services/webhooks/utils/extract-statuses.ts
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

// src/services/webhooks/utils/verify.ts
function verifyWebhook(query, verifyToken) {
  const mode = query["hub.mode"];
  const token = query["hub.verify_token"];
  const challenge = query["hub.challenge"];
  if (mode === "subscribe" && token === verifyToken && challenge) {
    return challenge;
  }
  return null;
}

// src/schemas/webhooks/payload.ts
var import_zod6 = require("zod");

// src/schemas/messages/incoming.ts
var import_zod5 = require("zod");
var baseIncomingMessageSchema = import_zod5.z.object({
  from: import_zod5.z.string(),
  // WhatsApp ID (phone number without +)
  id: import_zod5.z.string(),
  // Message ID (wamid.*)
  timestamp: import_zod5.z.string(),
  // Unix timestamp as string
  type: import_zod5.z.string()
  // Message type discriminator
});
var incomingTextContentSchema = import_zod5.z.object({
  body: import_zod5.z.string()
});
var incomingAudioContentSchema = import_zod5.z.object({
  id: import_zod5.z.string(),
  // Media ID for downloading
  mime_type: import_zod5.z.string().optional()
  // e.g., "audio/ogg; codecs=opus"
});
var incomingImageContentSchema = import_zod5.z.object({
  id: import_zod5.z.string(),
  // Media ID for downloading
  mime_type: import_zod5.z.string().optional(),
  // e.g., "image/jpeg"
  caption: import_zod5.z.string().optional()
  // Optional caption text
});
var incomingTextMessageSchema = baseIncomingMessageSchema.extend({
  type: import_zod5.z.literal("text"),
  text: incomingTextContentSchema
});
var incomingAudioMessageSchema = baseIncomingMessageSchema.extend({
  type: import_zod5.z.literal("audio"),
  audio: incomingAudioContentSchema
});
var incomingImageMessageSchema = baseIncomingMessageSchema.extend({
  type: import_zod5.z.literal("image"),
  image: incomingImageContentSchema
});
var incomingMessageSchema = import_zod5.z.discriminatedUnion("type", [
  incomingTextMessageSchema,
  incomingAudioMessageSchema,
  incomingImageMessageSchema
]);

// src/schemas/webhooks/payload.ts
var contactSchema = import_zod6.z.object({
  profile: import_zod6.z.object({
    name: import_zod6.z.string()
  }),
  wa_id: import_zod6.z.string()
});
var webhookMetadataSchema = import_zod6.z.object({
  display_phone_number: import_zod6.z.string(),
  phone_number_id: import_zod6.z.string()
});
var conversationOriginSchema = import_zod6.z.object({
  type: import_zod6.z.enum([
    "authentication",
    "authentication_international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var conversationSchema = import_zod6.z.object({
  id: import_zod6.z.string(),
  expiration_timestamp: import_zod6.z.string().optional(),
  // Only for sent status
  origin: conversationOriginSchema
});
var pricingSchema = import_zod6.z.object({
  billable: import_zod6.z.boolean(),
  // Deprecated but still present
  pricing_model: import_zod6.z.enum(["CBP", "PMP"]),
  type: import_zod6.z.enum(["regular", "free_customer_service", "free_entry_point"]),
  category: import_zod6.z.enum([
    "authentication",
    "authentication-international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var statusErrorSchema = import_zod6.z.object({
  code: import_zod6.z.number(),
  title: import_zod6.z.string(),
  message: import_zod6.z.string(),
  error_data: import_zod6.z.object({
    details: import_zod6.z.string()
  }),
  href: import_zod6.z.string()
});
var statusSchema = import_zod6.z.object({
  id: import_zod6.z.string(),
  // WhatsApp message ID
  status: import_zod6.z.enum(["sent", "delivered", "read", "failed", "played"]),
  timestamp: import_zod6.z.string(),
  // Unix timestamp
  recipient_id: import_zod6.z.string(),
  // User phone number or group ID
  recipient_type: import_zod6.z.literal("group").optional(),
  // Only included if message sent to a group
  recipient_participant_id: import_zod6.z.string().optional(),
  // Only included if message sent to a group
  recipient_identity_key_hash: import_zod6.z.string().optional(),
  // Only included if identity change check enabled
  biz_opaque_callback_data: import_zod6.z.string().optional(),
  // Only included if message sent with biz_opaque_callback_data
  conversation: conversationSchema.optional(),
  // Conditional inclusion (see conversationSchema docs)
  pricing: pricingSchema.optional(),
  // Conditional inclusion (see pricingSchema docs)
  errors: import_zod6.z.array(statusErrorSchema).optional()
  // Only included if failure to send or deliver message
});
var webhookValueSchema = import_zod6.z.object({
  messaging_product: import_zod6.z.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: import_zod6.z.array(contactSchema).optional(),
  messages: import_zod6.z.array(incomingMessageSchema).optional(),
  // Incoming messages
  statuses: import_zod6.z.array(statusSchema).optional()
  // Status updates
});
var webhookChangeSchema = import_zod6.z.object({
  value: webhookValueSchema,
  field: import_zod6.z.literal("messages")
  // For now: only messages field
});
var webhookEntrySchema = import_zod6.z.object({
  id: import_zod6.z.string(),
  // WABA ID
  changes: import_zod6.z.array(webhookChangeSchema)
});
var webhookPayloadSchema = import_zod6.z.object({
  object: import_zod6.z.literal("whatsapp_business_account"),
  entry: import_zod6.z.array(webhookEntrySchema)
});

// src/services/webhooks/WebhooksService.ts
var WebhooksService = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Verify webhook GET request from Meta
   *
   * Meta sends GET requests to verify webhook endpoints during setup.
   * Returns the challenge string if valid, null if invalid.
   *
   * @param query - Query parameters from GET request
   * @param verifyToken - Your verification token (stored on your server)
   * @returns Challenge string if valid, null if invalid
   */
  verify(query, verifyToken) {
    return verifyWebhook(query, verifyToken);
  }
  /**
   * Extract all incoming messages from webhook payload
   *
   * Low-level utility that flattens the nested webhook structure
   * and returns messages directly.
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
   * Low-level utility for extracting status updates for outgoing messages.
   *
   * @param payload - Webhook payload from Meta
   * @returns Flat array of status updates
   */
  extractStatuses(payload) {
    return extractStatuses(payload);
  }
  /**
   * Validate webhook payload structure
   *
   * Validates the payload against the schema. Logs errors if malformed
   * but doesn't throw, allowing processing to continue.
   *
   * @param payload - Raw payload to validate
   * @returns Validated payload if valid, original payload if invalid (with logged error)
   */
  validatePayload(payload) {
    const result = webhookPayloadSchema.safeParse(payload);
    if (!result.success) {
      console.error(
        "Webhook payload validation failed:",
        result.error.format()
      );
      return payload;
    }
    return result.data;
  }
  /**
   * Handle webhook payload with type-safe callbacks
   *
   * High-level convenience method that extracts messages and dispatches
   * them to appropriate handlers based on message type.
   *
   * **Important**: This method returns quickly to allow fast webhook responses.
   * Handlers are processed asynchronously. If you need to await handler completion,
   * use the low-level `extractMessages()` method instead.
   *
   * The `beforeHandler` return type is automatically inferred and provides
   * full type safety in message handlers.
   *
   * @param payload - Webhook payload from Meta (will be validated)
   * @param handlers - Object with handler functions for each message type
   * @param options - Optional error handling configuration
   */
  handle(payload, handlers, options) {
    const validatedPayload = this.validatePayload(payload);
    for (const entry of validatedPayload.entry) {
      for (const change of entry.changes) {
        if (change.field === "messages" && change.value.messages) {
          const metadata = {
            phoneNumberId: change.value.metadata.phone_number_id,
            displayPhoneNumber: change.value.metadata.display_phone_number,
            wabaId: entry.id
          };
          const contacts = change.value.contacts || [];
          for (const message of change.value.messages) {
            const contact = contacts.find((c) => c.wa_id === message.from);
            const webhook = {
              metadata,
              ...contact && {
                contact: {
                  name: contact.profile.name,
                  waId: contact.wa_id
                }
              }
            };
            Promise.resolve().then(async () => {
              let before = void 0;
              if (handlers.beforeHandler) {
                try {
                  before = await handlers.beforeHandler(
                    message,
                    webhook
                  );
                } catch (error) {
                  if (options?.onError) {
                    options.onError(error, message);
                  } else {
                    console.error(
                      `Error in beforeHandler for message ${message.id}:`,
                      error
                    );
                  }
                  before = void 0;
                }
              }
              switch (message.type) {
                case "text":
                  if (handlers.text) {
                    await handlers.text(message, webhook, before);
                  }
                  break;
                case "audio":
                  if (handlers.audio) {
                    await handlers.audio(message, webhook, before);
                  }
                  break;
                case "image":
                  if (handlers.image) {
                    await handlers.image(message, webhook, before);
                  }
                  break;
                default:
                  break;
              }
            }).catch((error) => {
              if (options?.onError) {
                options.onError(error, message);
              } else {
                console.error(
                  `Error handling ${message.type} message ${message.id}:`,
                  error
                );
              }
            });
          }
        }
      }
    }
  }
};

// src/client/WhatsAppClient.ts
var WhatsAppClient = class {
  messages;
  accounts;
  business;
  templates;
  webhooks;
  media;
  httpClient;
  constructor(config) {
    const validated = clientConfigSchema.parse(config);
    this.httpClient = new HttpClient(validated);
    this.messages = new MessagesResource(this.httpClient);
    this.accounts = new AccountsService(this.httpClient);
    this.business = new BusinessService(this.httpClient);
    this.templates = new TemplatesResource(this.httpClient);
    this.webhooks = new WebhooksService(this.httpClient);
    this.media = new MediaResource(this.httpClient);
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

// src/schemas/accounts/phone-number.ts
var import_zod7 = require("zod");
var phoneNumberResponseSchema = import_zod7.z.object({
  verified_name: import_zod7.z.string(),
  display_phone_number: import_zod7.z.string(),
  id: import_zod7.z.string(),
  quality_rating: import_zod7.z.string()
});
var phoneNumberListResponseSchema = import_zod7.z.object({
  data: import_zod7.z.array(phoneNumberResponseSchema)
});

// src/schemas/business/account.ts
var import_zod8 = require("zod");
var businessAccountResponseSchema = import_zod8.z.object({
  id: import_zod8.z.string(),
  name: import_zod8.z.string().optional(),
  account_review_status: import_zod8.z.string().optional(),
  currency: import_zod8.z.string().optional(),
  country: import_zod8.z.string().optional(),
  timezone_id: import_zod8.z.string().optional(),
  business_verification_status: import_zod8.z.string().optional(),
  is_enabled_for_insights: import_zod8.z.boolean().optional(),
  message_template_namespace: import_zod8.z.string().optional()
});
var businessAccountsListResponseSchema = import_zod8.z.object({
  data: import_zod8.z.record(import_zod8.z.string(), businessAccountResponseSchema).or(
    import_zod8.z.array(businessAccountResponseSchema)
  ),
  paging: import_zod8.z.object({
    cursors: import_zod8.z.object({
      before: import_zod8.z.string().optional(),
      after: import_zod8.z.string().optional()
    }).optional(),
    next: import_zod8.z.string().url().optional(),
    previous: import_zod8.z.string().url().optional()
  }).optional()
});

// src/schemas/debug.ts
var import_zod9 = require("zod");
var debugTokenResponseSchema = import_zod9.z.object({
  data: import_zod9.z.object({
    app_id: import_zod9.z.string().optional(),
    type: import_zod9.z.string().optional(),
    application: import_zod9.z.string().optional(),
    data_access_expires_at: import_zod9.z.number().optional(),
    expires_at: import_zod9.z.number().optional(),
    is_valid: import_zod9.z.boolean().optional(),
    issued_at: import_zod9.z.number().optional(),
    metadata: import_zod9.z.object({
      auth_type: import_zod9.z.string().optional(),
      sso: import_zod9.z.string().optional()
    }).optional(),
    scopes: import_zod9.z.array(import_zod9.z.string()).optional(),
    user_id: import_zod9.z.string().optional()
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GraphAPIError,
  MediaResource,
  MessagesResource,
  TemplatesResource,
  WhatsAppClient,
  buildMessagePayload,
  businessAccountResponseSchema,
  businessAccountsListResponseSchema,
  clientConfigSchema,
  debugTokenResponseSchema,
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
  phoneNumberListResponseSchema,
  phoneNumberResponseSchema,
  phoneNumberSchema,
  statusSchema,
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
  webhookPayloadSchema
});
