// src/schemas/client.ts
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
      const error = await response.json().catch(() => ({
        error: {
          message: response.statusText,
          code: response.status
        }
      }));
      throw new Error(
        `API Error: ${error.error?.message || response.statusText} (${error.error?.code || response.status})`
      );
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
      const error = await response.json().catch(() => ({
        error: {
          message: response.statusText,
          code: response.status
        }
      }));
      throw new Error(
        `API Error: ${error.error?.message || response.statusText} (${error.error?.code || response.status})`
      );
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
      let errorMessage = `API Error: ${response.statusText}`;
      try {
        const error = await response.json();
        errorMessage = `API Error: ${error.error?.message || response.statusText} (${error.error?.code || response.status})`;
      } catch {
      }
      throw new Error(errorMessage);
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
      const error = await response.json().catch(() => ({
        error: {
          message: response.statusText,
          code: response.status
        }
      }));
      throw new Error(
        `API Error: ${error.error?.message || response.statusText} (${error.error?.code || response.status})`
      );
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
      const error = await response.json().catch(() => ({
        error: {
          message: response.statusText,
          code: response.status
        }
      }));
      throw new Error(
        `API Error: ${error.error?.message || response.statusText} (${error.error?.code || response.status})`
      );
    }
    return response.json();
  }
};

// src/schemas/messages/outgoing.ts
import { z as z2 } from "zod";
var baseOutgoingMessageSchema = z2.object({
  to: z2.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format")
});
var textContentSchema = z2.object({
  body: z2.string().min(1).max(4096),
  preview_url: z2.boolean().optional()
});
var imageContentSchema = z2.object({
  id: z2.string().optional(),
  link: z2.string().url().optional(),
  caption: z2.string().max(1024).optional()
}).refine((data) => data.link || data.id, "Either link or id must be provided");
var locationContentSchema = z2.object({
  longitude: z2.number().min(-180).max(180),
  latitude: z2.number().min(-90).max(90),
  name: z2.string().optional(),
  address: z2.string().optional()
});
var reactionContentSchema = z2.object({
  message_id: z2.string().min(1),
  emoji: z2.string().min(1).max(1)
});
var sendTextInputSchema = baseOutgoingMessageSchema.extend({
  text: textContentSchema
});
var sendImageInputSchema = baseOutgoingMessageSchema.extend({
  image: imageContentSchema
});
var sendLocationInputSchema = baseOutgoingMessageSchema.extend({
  location: locationContentSchema
});
var sendReactionInputSchema = baseOutgoingMessageSchema.extend({
  reaction: reactionContentSchema
});
var outgoingTextMessageSchema = sendTextInputSchema.extend({
  type: z2.literal("text")
});
var outgoingImageMessageSchema = sendImageInputSchema.extend({
  type: z2.literal("image")
});
var outgoingLocationMessageSchema = sendLocationInputSchema.extend({
  type: z2.literal("location")
});
var outgoingReactionMessageSchema = sendReactionInputSchema.extend({
  type: z2.literal("reaction")
});
var outgoingMessageSchema = z2.discriminatedUnion("type", [
  outgoingTextMessageSchema,
  outgoingImageMessageSchema,
  outgoingLocationMessageSchema,
  outgoingReactionMessageSchema
]);

// src/services/messages/utils/build-message-payload.ts
function buildMessagePayload(to, type, content) {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type,
    ...content
  };
}

// src/utils/zod-error.ts
import "zod";

// src/errors.ts
var WhatsAppError = class extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    const captureStackTrace = Error.captureStackTrace;
    if (typeof captureStackTrace === "function") {
      captureStackTrace(this, this.constructor);
    }
  }
};
var WhatsAppValidationError = class extends WhatsAppError {
  constructor(message, field, issues) {
    super(message);
    this.field = field;
    this.issues = issues;
    this.name = "WhatsAppValidationError";
  }
};
var WhatsAppAPIError = class extends WhatsAppError {
  constructor(code, type, message, statusCode, details) {
    super(message);
    this.code = code;
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
    this.name = "WhatsAppAPIError";
  }
};
var WhatsAppRateLimitError = class extends WhatsAppAPIError {
  constructor(message, retryAfter) {
    super(131056, "rate_limit", message, 429, { retryAfter });
    this.retryAfter = retryAfter;
    this.name = "WhatsAppRateLimitError";
  }
};

// src/utils/zod-error.ts
function transformZodError(error) {
  const issues = error.issues.map((err) => ({
    path: err.path,
    message: err.message
  }));
  const firstError = error.issues[0];
  if (firstError) {
    return new WhatsAppValidationError(
      firstError.message,
      typeof firstError.path[0] === "string" ? firstError.path[0] : void 0,
      issues
    );
  }
  return new WhatsAppValidationError("Validation failed", void 0, issues);
}

// src/services/messages/methods/send-text.ts
async function sendText(messagesClient, input) {
  const result = sendTextInputSchema.safeParse(input);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;
  const payload = buildMessagePayload(data.to, "text", {
    text: data.text
  });
  return messagesClient.post("/messages", payload);
}

// src/services/messages/methods/send-image.ts
async function sendImage(messagesClient, input) {
  const result = sendImageInputSchema.safeParse(input);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;
  const payload = buildMessagePayload(data.to, "image", {
    image: data.image
  });
  return messagesClient.post("/messages", payload);
}

// src/services/messages/methods/send-location.ts
async function sendLocation(messagesClient, input) {
  const result = sendLocationInputSchema.safeParse(input);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;
  const payload = buildMessagePayload(data.to, "location", {
    location: data.location
  });
  return messagesClient.post("/messages", payload);
}

// src/services/messages/methods/send-reaction.ts
async function sendReaction(messagesClient, input) {
  const result = sendReactionInputSchema.safeParse(input);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;
  const payload = buildMessagePayload(data.to, "reaction", {
    reaction: data.reaction
  });
  return messagesClient.post("/messages", payload);
}

// src/services/messages/MessagesClient.ts
var MessagesClient = class {
  constructor(httpClient, phoneNumberId) {
    this.httpClient = httpClient;
    this.phoneNumberId = phoneNumberId;
  }
  /**
   * Make a POST request with phone number ID prefix
   */
  async post(path, body) {
    return this.httpClient.post(`/${this.phoneNumberId}${path}`, body);
  }
  /**
   * Make a GET request with phone number ID prefix
   */
  async get(path) {
    return this.httpClient.get(`/${this.phoneNumberId}${path}`);
  }
  /**
   * Make a PATCH request with phone number ID prefix
   */
  async patch(path, body) {
    return this.httpClient.patch(`/${this.phoneNumberId}${path}`, body);
  }
};

// src/services/messages/MessagesService.ts
var MessagesService = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Helper to create a Scoped Client (prefer override, fallback to config)
   */
  getClient(overrideId) {
    const id = overrideId || this.httpClient.phoneNumberId;
    if (!id) {
      throw new WhatsAppValidationError(
        "phoneNumberId is required. Provide it in WhatsAppClient config or as a parameter.",
        "phoneNumberId"
      );
    }
    return new MessagesClient(this.httpClient, id);
  }
  /**
   * Send a text message
   *
   * @param input - Text message input (to, text)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendText(input, phoneNumberId) {
    const client = this.getClient(phoneNumberId);
    return sendText(client, input);
  }
  /**
   * Send an image message
   *
   * @param input - Image message input (to, image)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendImage(input, phoneNumberId) {
    const client = this.getClient(phoneNumberId);
    return sendImage(client, input);
  }
  /**
   * Send a location message
   *
   * @param input - Location message input (to, location)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendLocation(input, phoneNumberId) {
    const client = this.getClient(phoneNumberId);
    return sendLocation(client, input);
  }
  /**
   * Send a reaction message
   *
   * @param input - Reaction message input (to, reaction)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendReaction(input, phoneNumberId) {
    const client = this.getClient(phoneNumberId);
    return sendReaction(client, input);
  }
  /**
   * Send any message type using the discriminated union
   *
   * @param message - Any outgoing message (text, image, location, reaction)
   * @param phoneNumberId - Optional phone number ID (overrides client config)
   */
  async sendMessage(message, phoneNumberId) {
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
      throw new WhatsAppValidationError(
        "businessAccountId (WABA ID) is required. Provide it in WhatsAppClient config or as a parameter.",
        "businessAccountId"
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
      throw new WhatsAppValidationError(
        "businessId (Business Portfolio ID) is required. Provide it in WhatsAppClient config or as a parameter.",
        "businessId"
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

// src/resources/templates/schema.ts
import { z as z3 } from "zod";
var templateLanguageSchema = z3.enum([
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
var templateCategorySchema = z3.enum([
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY"
]);
var templateParameterFormatSchema = z3.enum(["positional", "named"]);
var templateStatusSchema = z3.enum([
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
var templateQualityScoreSchema = z3.object({
  score: z3.enum(["GREEN", "YELLOW", "RED", "UNKNOWN"]).optional(),
  date: z3.number().optional()
});
var templateNamedParamExampleSchema = z3.object({
  param_name: z3.string(),
  example: z3.string()
});
var templateQuickReplyButtonInputSchema = z3.object({
  type: z3.literal("QUICK_REPLY"),
  text: z3.string().min(1).max(25, "Button text must be 25 characters or less")
});
var templateUrlButtonInputSchema = z3.object({
  type: z3.literal("URL"),
  text: z3.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: z3.string().url().max(2e3, "URL must be 2000 characters or less"),
  example: z3.array(z3.string()).optional()
});
var templatePhoneNumberButtonInputSchema = z3.object({
  type: z3.literal("PHONE_NUMBER"),
  text: z3.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: z3.string().min(1).max(20, "Phone number must be 20 characters or less")
});
var templateCopyCodeButtonInputSchema = z3.object({
  type: z3.literal("COPY_CODE"),
  example: z3.string().max(15).optional()
});
var templateFlowButtonInputSchema = z3.object({
  type: z3.literal("FLOW"),
  text: z3.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_id: z3.string().optional(),
  flow_action: z3.enum(["navigate", "data_exchange"]).optional(),
  navigate_screen: z3.string().optional()
});
var templateButtonInputSchema = z3.discriminatedUnion("type", [
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema
]);
var templateHeaderTextExampleSchema = z3.object({
  // Positional: header_text: ["value1"]
  header_text: z3.array(z3.string()).optional(),
  // Named: header_text_named_params: [{ param_name: "name", example: "value" }]
  header_text_named_params: z3.array(templateNamedParamExampleSchema).optional()
});
var templateHeaderTextInputSchema = z3.object({
  type: z3.literal("HEADER"),
  format: z3.literal("TEXT"),
  text: z3.string().min(1).max(60, "Header text must be 60 characters or less"),
  example: templateHeaderTextExampleSchema.optional()
});
var templateHeaderMediaInputSchema = z3.object({
  type: z3.literal("HEADER"),
  format: z3.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  example: z3.object({
    header_handle: z3.array(z3.string()).min(1, "At least one header_handle is required")
  })
});
var templateHeaderLocationInputSchema = z3.object({
  type: z3.literal("HEADER"),
  format: z3.literal("LOCATION")
});
var templateHeaderComponentInputSchema = z3.discriminatedUnion(
  "format",
  [
    templateHeaderTextInputSchema,
    templateHeaderMediaInputSchema,
    templateHeaderLocationInputSchema
  ]
);
var templateBodyExampleSchema = z3.object({
  // Positional: body_text: [["value1", "value2"]]
  body_text: z3.array(z3.array(z3.string())).optional(),
  // Named: body_text_named_params: [{ param_name: "name", example: "value" }]
  body_text_named_params: z3.array(templateNamedParamExampleSchema).optional()
});
var templateBodyComponentInputSchema = z3.object({
  type: z3.literal("BODY"),
  text: z3.string().min(1).max(1024, "Body text must be 1024 characters or less"),
  example: templateBodyExampleSchema.optional()
});
var templateFooterComponentInputSchema = z3.object({
  type: z3.literal("FOOTER"),
  text: z3.string().min(1).max(60, "Footer text must be 60 characters or less")
});
var templateButtonsComponentInputSchema = z3.object({
  type: z3.literal("BUTTONS"),
  buttons: z3.array(templateButtonInputSchema).min(1).max(10, "Maximum 10 buttons allowed")
});
var templateComponentInputSchema = z3.union([
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema
]);
var templateButtonSchema = z3.object({
  type: z3.string(),
  text: z3.string().optional(),
  url: z3.string().optional(),
  phone_number: z3.string().optional(),
  example: z3.union([z3.array(z3.string()), z3.string()]).optional(),
  flow_id: z3.string().optional(),
  flow_action: z3.string().optional(),
  navigate_screen: z3.string().optional()
});
var templateComponentSchema = z3.object({
  type: z3.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  format: z3.string().optional(),
  text: z3.string().optional(),
  buttons: z3.array(templateButtonSchema).optional(),
  example: z3.object({
    header_text: z3.array(z3.string()).optional(),
    header_text_named_params: z3.array(templateNamedParamExampleSchema).optional(),
    header_handle: z3.array(z3.string()).optional(),
    body_text: z3.array(z3.array(z3.string())).optional(),
    body_text_named_params: z3.array(templateNamedParamExampleSchema).optional()
  }).optional()
});
var hasBody = (components) => components.some((c) => c.type === "BODY");
var hasMaxOneHeader = (components) => components.filter((c) => c.type === "HEADER").length <= 1;
var hasMaxOneFooter = (components) => components.filter((c) => c.type === "FOOTER").length <= 1;
var hasMaxOneButtons = (components) => components.filter((c) => c.type === "BUTTONS").length <= 1;
var baseComponentsSchema = z3.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" }).refine(hasMaxOneHeader, { message: "Only one HEADER component is allowed" }).refine(hasMaxOneFooter, { message: "Only one FOOTER component is allowed" }).refine(hasMaxOneButtons, {
  message: "Only one BUTTONS component is allowed"
});
var templateNameSchema = z3.string().min(1, "Template name is required").max(512, "Template name must be 512 characters or less");
var templateCreateMarketingSchema = z3.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z3.literal("MARKETING"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateUtilitySchema = z3.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z3.literal("UTILITY"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema
});
var templateCreateAuthenticationSchema = z3.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z3.literal("AUTHENTICATION"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: z3.array(templateComponentInputSchema).min(1, "At least one component is required").refine(hasBody, { message: "BODY component is required" })
});
var templateCreateSchema = z3.discriminatedUnion("category", [
  templateCreateMarketingSchema,
  templateCreateUtilitySchema,
  templateCreateAuthenticationSchema
]);
var templateUpdateSchema = z3.object({
  category: templateCategorySchema.optional(),
  components: z3.array(templateComponentInputSchema).optional(),
  language: templateLanguageSchema.optional(),
  name: z3.string().min(1).max(512).optional()
});
var templateListSchema = z3.object({
  name: z3.string().optional(),
  limit: z3.number().min(1).max(1e3).optional(),
  after: z3.string().optional(),
  before: z3.string().optional()
});
var templateDeleteSchema = z3.object({
  name: z3.string().optional(),
  hsm_id: z3.string().optional()
}).refine((data) => data.name || data.hsm_id, {
  message: "Either name or hsm_id must be provided"
});
var templateSchema = z3.object({
  id: z3.string(),
  name: z3.string(),
  language: z3.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
  components: z3.array(templateComponentSchema),
  parameter_format: templateParameterFormatSchema.optional(),
  quality_score: templateQualityScoreSchema.optional(),
  rejected_reason: z3.string().optional(),
  previous_category: z3.string().optional()
});
var templateCreateResponseSchema = z3.object({
  id: z3.string(),
  status: templateStatusSchema,
  category: templateCategorySchema
});
var templatePagingCursorsSchema = z3.object({
  before: z3.string().optional(),
  after: z3.string().optional()
});
var templatePagingSchema = z3.object({
  cursors: templatePagingCursorsSchema.optional(),
  next: z3.string().optional(),
  previous: z3.string().optional()
});
var templateListResponseSchema = z3.object({
  data: z3.array(templateSchema),
  paging: templatePagingSchema.optional()
});
var templateUpdateResponseSchema = z3.object({
  success: z3.boolean()
});
var templateDeleteResponseSchema = z3.object({
  success: z3.boolean()
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
      throw new WhatsAppValidationError(
        "businessAccountId (WABA ID) is required for templates. Provide it in WhatsAppClient config or as a parameter.",
        "businessAccountId"
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
      throw new WhatsAppValidationError(
        "Template ID is required",
        "templateId"
      );
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
      throw new WhatsAppValidationError(
        "Template ID is required",
        "templateId"
      );
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
import { z as z5 } from "zod";

// src/schemas/messages/incoming.ts
import { z as z4 } from "zod";
var baseIncomingMessageSchema = z4.object({
  from: z4.string(),
  // WhatsApp ID (phone number without +)
  id: z4.string(),
  // Message ID (wamid.*)
  timestamp: z4.string(),
  // Unix timestamp as string
  type: z4.string()
  // Message type discriminator
});
var incomingTextContentSchema = z4.object({
  body: z4.string()
});
var incomingAudioContentSchema = z4.object({
  id: z4.string(),
  // Media ID for downloading
  mime_type: z4.string().optional()
  // e.g., "audio/ogg; codecs=opus"
});
var incomingImageContentSchema = z4.object({
  id: z4.string(),
  // Media ID for downloading
  mime_type: z4.string().optional(),
  // e.g., "image/jpeg"
  caption: z4.string().optional()
  // Optional caption text
});
var incomingTextMessageSchema = baseIncomingMessageSchema.extend({
  type: z4.literal("text"),
  text: incomingTextContentSchema
});
var incomingAudioMessageSchema = baseIncomingMessageSchema.extend({
  type: z4.literal("audio"),
  audio: incomingAudioContentSchema
});
var incomingImageMessageSchema = baseIncomingMessageSchema.extend({
  type: z4.literal("image"),
  image: incomingImageContentSchema
});
var incomingMessageSchema = z4.discriminatedUnion("type", [
  incomingTextMessageSchema,
  incomingAudioMessageSchema,
  incomingImageMessageSchema
]);

// src/schemas/webhooks/payload.ts
var contactSchema = z5.object({
  profile: z5.object({
    name: z5.string()
  }),
  wa_id: z5.string()
});
var webhookMetadataSchema = z5.object({
  display_phone_number: z5.string(),
  phone_number_id: z5.string()
});
var conversationOriginSchema = z5.object({
  type: z5.enum([
    "authentication",
    "authentication_international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var conversationSchema = z5.object({
  id: z5.string(),
  expiration_timestamp: z5.string().optional(),
  // Only for sent status
  origin: conversationOriginSchema
});
var pricingSchema = z5.object({
  billable: z5.boolean(),
  // Deprecated but still present
  pricing_model: z5.enum(["CBP", "PMP"]),
  type: z5.enum(["regular", "free_customer_service", "free_entry_point"]),
  category: z5.enum([
    "authentication",
    "authentication-international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var statusErrorSchema = z5.object({
  code: z5.number(),
  title: z5.string(),
  message: z5.string(),
  error_data: z5.object({
    details: z5.string()
  }),
  href: z5.string()
});
var statusSchema = z5.object({
  id: z5.string(),
  // WhatsApp message ID
  status: z5.enum(["sent", "delivered", "read", "failed", "played"]),
  timestamp: z5.string(),
  // Unix timestamp
  recipient_id: z5.string(),
  // User phone number or group ID
  recipient_type: z5.literal("group").optional(),
  // Only included if message sent to a group
  recipient_participant_id: z5.string().optional(),
  // Only included if message sent to a group
  recipient_identity_key_hash: z5.string().optional(),
  // Only included if identity change check enabled
  biz_opaque_callback_data: z5.string().optional(),
  // Only included if message sent with biz_opaque_callback_data
  conversation: conversationSchema.optional(),
  // Conditional inclusion (see conversationSchema docs)
  pricing: pricingSchema.optional(),
  // Conditional inclusion (see pricingSchema docs)
  errors: z5.array(statusErrorSchema).optional()
  // Only included if failure to send or deliver message
});
var webhookValueSchema = z5.object({
  messaging_product: z5.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: z5.array(contactSchema).optional(),
  messages: z5.array(incomingMessageSchema).optional(),
  // Incoming messages
  statuses: z5.array(statusSchema).optional()
  // Status updates
});
var webhookChangeSchema = z5.object({
  value: webhookValueSchema,
  field: z5.literal("messages")
  // For now: only messages field
});
var webhookEntrySchema = z5.object({
  id: z5.string(),
  // WABA ID
  changes: z5.array(webhookChangeSchema)
});
var webhookPayloadSchema = z5.object({
  object: z5.literal("whatsapp_business_account"),
  entry: z5.array(webhookEntrySchema)
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

// src/services/media/MediaService.ts
var MediaService = class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  /**
   * Download media file by media ID
   *
   * Downloads media files (images, audio, video, documents) from WhatsApp servers.
   * Uses the access token from the client configuration automatically.
   *
   * According to WhatsApp API docs, you cannot download directly from the media ID endpoint.
   * The flow is:
   * 1. GET /MEDIA_ID → returns JSON metadata with a URL
   * 2. GET /MEDIA_URL → returns the actual binary data
   *
   * @param mediaId - Media ID from incoming message (e.g., message.image.id, message.audio.id)
   * @returns Promise resolving to ArrayBuffer containing the media file
   * @throws Error if download fails or media ID is invalid
   *
   * @example
   * ```typescript
   * const mediaData = await client.media.download(message.image.id);
   * // Upload to S3, save to disk, etc.
   * await s3.upload({ key: message.image.id, body: Buffer.from(mediaData) });
   * ```
   */
  async download(mediaId) {
    if (!mediaId || mediaId.trim().length === 0) {
      throw new Error("Media ID is required");
    }
    const metadata = await this.httpClient.get(`/${mediaId}`);
    const response = await fetch(metadata.url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.httpClient.accessToken}`
      }
    });
    if (!response.ok) {
      let errorMessage = `API Error: ${response.statusText}`;
      try {
        const error = await response.json();
        errorMessage = `API Error: ${error.error?.message || response.statusText} (${error.error?.code || response.status})`;
      } catch {
      }
      throw new Error(errorMessage);
    }
    return response.arrayBuffer();
  }
};

// src/client/WhatsAppClient.ts
import { ZodError as ZodError2 } from "zod";
var WhatsAppClient = class {
  messages;
  accounts;
  business;
  templates;
  webhooks;
  media;
  httpClient;
  constructor(config) {
    let validated;
    try {
      validated = clientConfigSchema.parse(config);
    } catch (error) {
      if (error instanceof ZodError2) {
        throw transformZodError(error);
      }
      throw error;
    }
    this.httpClient = new HttpClient(validated);
    this.messages = new MessagesService(this.httpClient);
    this.accounts = new AccountsService(this.httpClient);
    this.business = new BusinessService(this.httpClient);
    this.templates = new TemplatesResource(this.httpClient);
    this.webhooks = new WebhooksService(this.httpClient);
    this.media = new MediaService(this.httpClient);
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

// src/schemas/messages/response.ts
import { z as z6 } from "zod";
var messageResponseSchema = z6.object({
  messaging_product: z6.literal("whatsapp"),
  contacts: z6.array(
    z6.object({
      input: z6.string(),
      wa_id: z6.string()
    })
  ),
  messages: z6.array(
    z6.object({
      id: z6.string(),
      group_id: z6.string().optional(),
      message_status: z6.string().optional()
    })
  )
});

// src/schemas/accounts/phone-number.ts
import { z as z7 } from "zod";
var phoneNumberResponseSchema = z7.object({
  verified_name: z7.string(),
  display_phone_number: z7.string(),
  id: z7.string(),
  quality_rating: z7.string()
});
var phoneNumberListResponseSchema = z7.object({
  data: z7.array(phoneNumberResponseSchema)
});

// src/schemas/business/account.ts
import { z as z8 } from "zod";
var businessAccountResponseSchema = z8.object({
  id: z8.string(),
  name: z8.string().optional(),
  account_review_status: z8.string().optional(),
  currency: z8.string().optional(),
  country: z8.string().optional(),
  timezone_id: z8.string().optional(),
  business_verification_status: z8.string().optional(),
  is_enabled_for_insights: z8.boolean().optional(),
  message_template_namespace: z8.string().optional()
});
var businessAccountsListResponseSchema = z8.object({
  data: z8.record(z8.string(), businessAccountResponseSchema).or(
    z8.array(businessAccountResponseSchema)
  ),
  paging: z8.object({
    cursors: z8.object({
      before: z8.string().optional(),
      after: z8.string().optional()
    }).optional(),
    next: z8.string().url().optional(),
    previous: z8.string().url().optional()
  }).optional()
});

// src/schemas/debug.ts
import { z as z9 } from "zod";
var debugTokenResponseSchema = z9.object({
  data: z9.object({
    app_id: z9.string().optional(),
    type: z9.string().optional(),
    application: z9.string().optional(),
    data_access_expires_at: z9.number().optional(),
    expires_at: z9.number().optional(),
    is_valid: z9.boolean().optional(),
    issued_at: z9.number().optional(),
    metadata: z9.object({
      auth_type: z9.string().optional(),
      sso: z9.string().optional()
    }).optional(),
    scopes: z9.array(z9.string()).optional(),
    user_id: z9.string().optional()
  })
});

// src/utils/templates.ts
function toTemplateName(input) {
  return input.toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "").replace(/_+/g, "_").replace(/^_|_$/g, "");
}
export {
  TemplatesResource,
  WhatsAppAPIError,
  WhatsAppClient,
  WhatsAppError,
  WhatsAppRateLimitError,
  WhatsAppValidationError,
  businessAccountResponseSchema,
  businessAccountsListResponseSchema,
  clientConfigSchema,
  debugTokenResponseSchema,
  incomingAudioMessageSchema,
  incomingImageMessageSchema,
  incomingMessageSchema,
  incomingTextMessageSchema,
  messageResponseSchema,
  outgoingImageMessageSchema,
  outgoingLocationMessageSchema,
  outgoingMessageSchema,
  outgoingReactionMessageSchema,
  outgoingTextMessageSchema,
  phoneNumberListResponseSchema,
  phoneNumberResponseSchema,
  sendImageInputSchema,
  sendLocationInputSchema,
  sendReactionInputSchema,
  sendTextInputSchema,
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
};
