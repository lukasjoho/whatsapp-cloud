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

// src/services/templates/TemplatesClient.ts
var TemplatesClient = class {
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
   * Make a DELETE request with WABA ID prefix
   */
  async delete(path) {
    return this.httpClient.delete(`/${this.businessAccountId}${path}`);
  }
};

// src/schemas/templates/request.ts
import { z as z5 } from "zod";

// src/schemas/templates/component.ts
import { z as z3 } from "zod";
var templateQuickReplyButtonSchema = z3.object({
  type: z3.literal("QUICK_REPLY"),
  text: z3.string().min(1).max(25, "Button text must be 25 characters or less")
});
var templateUrlButtonSchema = z3.object({
  type: z3.literal("URL"),
  text: z3.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: z3.string().url().max(2e3, "URL must be 2000 characters or less")
  // example: z.array(z.string()).optional(), // For later: when URL contains variables
});
var templatePhoneNumberButtonSchema = z3.object({
  type: z3.literal("PHONE_NUMBER"),
  text: z3.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: z3.string().min(1).max(20, "Phone number must be 20 characters or less")
});
var templateCopyCodeButtonSchema = z3.object({
  type: z3.literal("COPY_CODE")
  // example: z.string().max(15).optional(), // For later: example value to copy
});
var templateFlowButtonSchema = z3.object({
  type: z3.literal("FLOW"),
  text: z3.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_action: z3.string().optional(),
  flow_id: z3.string().optional(),
  navigate_screen: z3.string().optional()
});
var templateButtonSchema = z3.discriminatedUnion("type", [
  templateQuickReplyButtonSchema,
  templateUrlButtonSchema,
  templatePhoneNumberButtonSchema,
  templateCopyCodeButtonSchema,
  templateFlowButtonSchema
]);
var templateHeaderComponentSchema = z3.object({
  type: z3.literal("HEADER"),
  format: z3.enum(["TEXT", "IMAGE", "VIDEO", "DOCUMENT", "LOCATION"]),
  text: z3.string().max(60, "Header text must be 60 characters or less").optional(),
  example: z3.object({
    header_handle: z3.array(z3.string()).min(1, "At least one header_handle is required")
  }).optional()
}).refine(
  (data) => {
    if (data.format === "TEXT" && !data.text) {
      return false;
    }
    if (data.format === "LOCATION") {
      return true;
    }
    if (["IMAGE", "VIDEO", "DOCUMENT"].includes(data.format)) {
      if (!data.example || !data.example.header_handle || data.example.header_handle.length === 0) {
        return false;
      }
    }
    return true;
  },
  {
    message: "TEXT format requires text field; IMAGE/VIDEO/DOCUMENT formats require example.header_handle"
  }
).refine(
  (data) => {
    if (data.format === "TEXT") {
      return !!data.text;
    }
    return true;
  },
  {
    message: "TEXT format header requires text field"
  }
).refine(
  (data) => {
    if (["IMAGE", "VIDEO", "DOCUMENT"].includes(data.format)) {
      return !!(data.example?.header_handle && data.example.header_handle.length > 0);
    }
    return true;
  },
  {
    message: "IMAGE/VIDEO/DOCUMENT format header requires example.header_handle (asset handle from Resumable Upload API)"
  }
);
var templateBodyComponentSchema = z3.object({
  type: z3.literal("BODY"),
  text: z3.string().min(1).max(1024, "Body text must be 1024 characters or less")
  // example: z.object({...}).optional(), // For later: when using variables
});
var templateFooterComponentSchema = z3.object({
  type: z3.literal("FOOTER"),
  text: z3.string().min(1).max(60, "Footer text must be 60 characters or less")
});
var templateButtonsComponentSchema = z3.object({
  type: z3.literal("BUTTONS"),
  buttons: z3.array(templateButtonSchema).min(1).max(10, "Maximum 10 buttons allowed")
});
var templateComponentSchema = z3.discriminatedUnion("type", [
  templateHeaderComponentSchema,
  templateBodyComponentSchema,
  templateFooterComponentSchema,
  templateButtonsComponentSchema
]);

// src/schemas/templates/language.ts
import { z as z4 } from "zod";
var templateLanguageSchema = z4.enum([
  "af",
  // Afrikaans
  "sq",
  // Albanisch
  "ar",
  // Arabisch
  "ar_EG",
  // Arabisch (Ägypten)
  "ar_AE",
  // Arabisch (Vereinigte Arabische Emirate)
  "ar_LB",
  // Arabisch (LBN)
  "ar_MA",
  // Arabisch (MAR)
  "ar_QA",
  // Arabisch (QAT)
  "az",
  // Aserbaidschanisch
  "be_BY",
  // Belarussisch
  "bn",
  // Bengalisch
  "bn_IN",
  // Bengali (IND)
  "bg",
  // Bulgarisch
  "ca",
  // Katalanisch
  "zh_CN",
  // Chinesisch (CHN)
  "zh_HK",
  // Chinesisch (HKG)
  "zh_TW",
  // Chinesisch (TAI)
  "hr",
  // Kroatisch
  "cs",
  // Tschechisch
  "da",
  // Dänisch
  "prs_AF",
  // Dari
  "nl",
  // Niederländisch
  "nl_BE",
  // Niederländisch (BEL)
  "en",
  // Englisch
  "en_GB",
  // Englisch (UK)
  "en_US",
  // Englisch (USA)
  "en_AE",
  // Englisch (Vereinigte Arabische Emirate)
  "en_AU",
  // Englisch (AUS)
  "en_CA",
  // Englisch (Kanada)
  "en_GH",
  // Englisch (GHA)
  "en_IE",
  // English (IRL)
  "en_IN",
  // Englisch (Indien)
  "en_JM",
  // Englisch (JAM)
  "en_MY",
  // Englisch (MYS)
  "en_NZ",
  // Englisch (Neuseeland)
  "en_QA",
  // Englisch (QAT)
  "en_SG",
  // Englisch (SGP)
  "en_UG",
  // Englisch (UGA)
  "en_ZA",
  // Englisch (ZAF)
  "et",
  // Estnisch
  "fil",
  // Filipino
  "fi",
  // Finnisch
  "fr",
  // Französisch
  "fr_BE",
  // Französisch (BEL)
  "fr_CA",
  // Französisch (Kanada)
  "fr_CH",
  // Französisch (CHE)
  "fr_CI",
  // Französisch (CIV)
  "fr_MA",
  // Französisch (MAR)
  "ka",
  // Georgisch
  "de",
  // Deutsch
  "de_AT",
  // Deutsch (Österreich)
  "de_CH",
  // Deutsch (CHE)
  "el",
  // Griechisch
  "gu",
  // Gujarati
  "ha",
  // Hausa
  "he",
  // Hebräisch
  "hi",
  // Hindi
  "hu",
  // Ungarisch
  "id",
  // Indonesisch
  "ga",
  // Irisch
  "it",
  // Italienisch
  "ja",
  // Japanisch
  "kn",
  // Kannada
  "kk",
  // Kasachisch
  "rw_RW",
  // Kinyarwanda
  "ko",
  // Koreanisch
  "ky_KG",
  // Kirgisisch (Kirgisistan)
  "lo",
  // Laotisch
  "lv",
  // Lettisch
  "lt",
  // Litauisch
  "mk",
  // Mazedonisch
  "ms",
  // Malaiisch
  "ml",
  // Malayalam
  "mr",
  // Marathi
  "nb",
  // Norwegisch
  "ps_AF",
  // Paschtunisch
  "fa",
  // Persisch
  "pl",
  // Polnisch
  "pt_BR",
  // Portugiesisch (BR)
  "pt_PT",
  // Portugiesisch (POR)
  "pa",
  // Panjabi
  "ro",
  // Rumänisch
  "ru",
  // Russisch
  "sr",
  // Serbisch
  "si_LK",
  // Sinhala
  "sk",
  // Slowakisch
  "sl",
  // Slowenisch
  "es",
  // Spanisch
  "es_AR",
  // Spanisch (ARG)
  "es_CL",
  // Spanisch (CHL)
  "es_CO",
  // Spanisch (Kolumbien)
  "es_CR",
  // Spanisch (CRI)
  "es_DO",
  // Spanisch (DOM)
  "es_EC",
  // Spanisch (ECU)
  "es_HN",
  // Spanisch (Honduras)
  "es_MX",
  // Spanisch (MEX)
  "es_PA",
  // Spanisch (PAN)
  "es_PE",
  // Spanisch (Peru)
  "es_ES",
  // Spanisch (SPA)
  "es_UY",
  // Spanisch (URY)
  "sw",
  // Swahili
  "sv",
  // Schwedisch
  "ta",
  // Tamil
  "te",
  // Telugu
  "th",
  // Thai
  "tr",
  // Türkisch
  "uk",
  // Ukrainisch
  "ur",
  // Urdu
  "uz",
  // Usbekisch
  "vi",
  // Vietnamesisch
  "zu"
  // Zulu
]);

// src/schemas/templates/request.ts
var templateCreateSchema = z5.object({
  name: z5.string().min(1).max(512, "Template name must be 512 characters or less"),
  language: templateLanguageSchema,
  category: z5.enum(["AUTHENTICATION", "MARKETING", "UTILITY"]),
  components: z5.array(templateComponentSchema).min(1, "At least one component is required").refine(
    (components) => {
      return components.some((c) => c.type === "BODY");
    },
    { message: "BODY component is required" }
  ).refine(
    (components) => {
      const headers = components.filter((c) => c.type === "HEADER");
      return headers.length <= 1;
    },
    { message: "Only one HEADER component is allowed" }
  ).refine(
    (components) => {
      const footers = components.filter((c) => c.type === "FOOTER");
      return footers.length <= 1;
    },
    { message: "Only one FOOTER component is allowed" }
  ).refine(
    (components) => {
      const buttons = components.filter((c) => c.type === "BUTTONS");
      return buttons.length <= 1;
    },
    { message: "Only one BUTTONS component is allowed" }
  )
});
var templateUpdateSchema = z5.object({
  category: z5.enum(["AUTHENTICATION", "MARKETING", "UTILITY"]).optional(),
  components: z5.array(templateComponentSchema).optional(),
  language: templateLanguageSchema.optional(),
  name: z5.string().min(1).max(512).optional()
});
var templateListSchema = z5.object({
  name: z5.string().optional()
  // Filter by template name
});
var templateDeleteSchema = z5.object({
  name: z5.string().optional(),
  hsm_id: z5.string().optional()
}).refine((data) => data.name || data.hsm_id, {
  message: "Either name or hsm_id must be provided"
});

// src/services/templates/methods/create.ts
async function createTemplate(templatesClient, request) {
  const result = templateCreateSchema.safeParse(request);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;
  return templatesClient.post(
    "/message_templates",
    data
  );
}

// src/services/templates/methods/list.ts
async function listTemplates(templatesClient, options) {
  if (options) {
    const result = templateListSchema.safeParse(options);
    if (!result.success) {
      throw transformZodError(result.error);
    }
  }
  const params = new URLSearchParams();
  if (options?.name) {
    params.append("name", options.name);
  }
  const queryString = params.toString();
  const path = queryString ? `/message_templates?${queryString}` : "/message_templates";
  return templatesClient.get(path);
}

// src/services/templates/methods/get.ts
async function getTemplate(httpClient, templateId) {
  if (!templateId || templateId.trim().length === 0) {
    throw new Error("Template ID is required");
  }
  return httpClient.get(`/${templateId}`);
}

// src/services/templates/methods/update.ts
async function updateTemplate(httpClient, templateId, request) {
  if (!templateId || templateId.trim().length === 0) {
    throw new Error("Template ID is required");
  }
  const result = templateUpdateSchema.safeParse(request);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;
  return httpClient.post(`/${templateId}`, data);
}

// src/services/templates/methods/delete.ts
async function deleteTemplate(templatesClient, options) {
  const result = templateDeleteSchema.safeParse(options);
  if (!result.success) {
    throw transformZodError(result.error);
  }
  const data = result.data;
  const params = new URLSearchParams();
  if (data.name) {
    params.append("name", data.name);
  }
  if (data.hsm_id) {
    params.append("hsm_id", data.hsm_id);
  }
  const queryString = params.toString();
  const path = `/message_templates?${queryString}`;
  return templatesClient.delete(path);
}

// src/services/templates/TemplatesService.ts
var TemplatesService = class {
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
        "businessAccountId (WABA ID) is required for templates. Provide it in WhatsAppClient config or as a parameter.",
        "businessAccountId"
      );
    }
    return new TemplatesClient(this.httpClient, id);
  }
  /**
   * Create a message template
   *
   * @param request - Template creation request
   * @param businessAccountId - Optional WABA ID (overrides client config)
   */
  async create(request, businessAccountId) {
    const client = this.getClient(businessAccountId);
    return createTemplate(client, request);
  }
  /**
   * List message templates
   *
   * @param options - Optional filter options (name)
   * @param businessAccountId - Optional WABA ID (overrides client config)
   */
  async list(options, businessAccountId) {
    const client = this.getClient(businessAccountId);
    return listTemplates(client, options);
  }
  /**
   * Get a template by ID
   *
   * Note: This uses the template ID directly (no WABA prefix needed)
   *
   * @param templateId - Template ID
   */
  async get(templateId) {
    return getTemplate(this.httpClient, templateId);
  }
  /**
   * Update a template
   *
   * Note: This uses the template ID directly (no WABA prefix needed)
   *
   * @param templateId - Template ID
   * @param request - Template update request
   */
  async update(templateId, request) {
    return updateTemplate(this.httpClient, templateId, request);
  }
  /**
   * Delete a template
   *
   * @param options - Delete options (name or hsm_id)
   * @param businessAccountId - Optional WABA ID (overrides client config)
   */
  async delete(options, businessAccountId) {
    const client = this.getClient(businessAccountId);
    return deleteTemplate(client, options);
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
import { z as z7 } from "zod";

// src/schemas/messages/incoming.ts
import { z as z6 } from "zod";
var baseIncomingMessageSchema = z6.object({
  from: z6.string(),
  // WhatsApp ID (phone number without +)
  id: z6.string(),
  // Message ID (wamid.*)
  timestamp: z6.string(),
  // Unix timestamp as string
  type: z6.string()
  // Message type discriminator
});
var incomingTextContentSchema = z6.object({
  body: z6.string()
});
var incomingAudioContentSchema = z6.object({
  id: z6.string(),
  // Media ID for downloading
  mime_type: z6.string().optional()
  // e.g., "audio/ogg; codecs=opus"
});
var incomingImageContentSchema = z6.object({
  id: z6.string(),
  // Media ID for downloading
  mime_type: z6.string().optional(),
  // e.g., "image/jpeg"
  caption: z6.string().optional()
  // Optional caption text
});
var incomingTextMessageSchema = baseIncomingMessageSchema.extend({
  type: z6.literal("text"),
  text: incomingTextContentSchema
});
var incomingAudioMessageSchema = baseIncomingMessageSchema.extend({
  type: z6.literal("audio"),
  audio: incomingAudioContentSchema
});
var incomingImageMessageSchema = baseIncomingMessageSchema.extend({
  type: z6.literal("image"),
  image: incomingImageContentSchema
});
var incomingMessageSchema = z6.discriminatedUnion("type", [
  incomingTextMessageSchema,
  incomingAudioMessageSchema,
  incomingImageMessageSchema
]);

// src/schemas/webhooks/payload.ts
var contactSchema = z7.object({
  profile: z7.object({
    name: z7.string()
  }),
  wa_id: z7.string()
});
var webhookMetadataSchema = z7.object({
  display_phone_number: z7.string(),
  phone_number_id: z7.string()
});
var conversationOriginSchema = z7.object({
  type: z7.enum([
    "authentication",
    "authentication_international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var conversationSchema = z7.object({
  id: z7.string(),
  expiration_timestamp: z7.string().optional(),
  // Only for sent status
  origin: conversationOriginSchema
});
var pricingSchema = z7.object({
  billable: z7.boolean(),
  // Deprecated but still present
  pricing_model: z7.enum(["CBP", "PMP"]),
  type: z7.enum(["regular", "free_customer_service", "free_entry_point"]),
  category: z7.enum([
    "authentication",
    "authentication-international",
    "marketing",
    "marketing_lite",
    "referral_conversion",
    "service",
    "utility"
  ])
});
var statusErrorSchema = z7.object({
  code: z7.number(),
  title: z7.string(),
  message: z7.string(),
  error_data: z7.object({
    details: z7.string()
  }),
  href: z7.string()
});
var statusSchema = z7.object({
  id: z7.string(),
  // WhatsApp message ID
  status: z7.enum(["sent", "delivered", "read", "failed", "played"]),
  timestamp: z7.string(),
  // Unix timestamp
  recipient_id: z7.string(),
  // User phone number or group ID
  recipient_type: z7.literal("group").optional(),
  // Only included if message sent to a group
  recipient_participant_id: z7.string().optional(),
  // Only included if message sent to a group
  recipient_identity_key_hash: z7.string().optional(),
  // Only included if identity change check enabled
  biz_opaque_callback_data: z7.string().optional(),
  // Only included if message sent with biz_opaque_callback_data
  conversation: conversationSchema.optional(),
  // Conditional inclusion (see conversationSchema docs)
  pricing: pricingSchema.optional(),
  // Conditional inclusion (see pricingSchema docs)
  errors: z7.array(statusErrorSchema).optional()
  // Only included if failure to send or deliver message
});
var webhookValueSchema = z7.object({
  messaging_product: z7.literal("whatsapp"),
  metadata: webhookMetadataSchema,
  contacts: z7.array(contactSchema).optional(),
  messages: z7.array(incomingMessageSchema).optional(),
  // Incoming messages
  statuses: z7.array(statusSchema).optional()
  // Status updates
});
var webhookChangeSchema = z7.object({
  value: webhookValueSchema,
  field: z7.literal("messages")
  // For now: only messages field
});
var webhookEntrySchema = z7.object({
  id: z7.string(),
  // WABA ID
  changes: z7.array(webhookChangeSchema)
});
var webhookPayloadSchema = z7.object({
  object: z7.literal("whatsapp_business_account"),
  entry: z7.array(webhookEntrySchema)
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
   * Download media file by media ID
   *
   * Downloads media files (images, audio, video, documents) from WhatsApp servers.
   * Uses the access token from the client configuration automatically.
   *
   * @param mediaId - Media ID from incoming message (e.g., message.image.id, message.audio.id)
   * @returns Promise resolving to ArrayBuffer containing the media file
   * @throws Error if download fails or media ID is invalid
   *
   * @example
   * ```typescript
   * client.webhooks.handle(req.body, {
   *   image: async (message, context) => {
   *     const mediaData = await client.webhooks.downloadMedia(message.image.id);
   *     // Upload to S3, save to disk, etc.
   *     await s3.upload({ key: message.image.id, body: Buffer.from(mediaData) });
   *   },
   * });
   * ```
   */
  async downloadMedia(mediaId) {
    if (!mediaId || mediaId.trim().length === 0) {
      throw new Error("Media ID is required");
    }
    return this.httpClient.getBinary(`/${mediaId}`);
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
import { ZodError as ZodError2 } from "zod";
var WhatsAppClient = class {
  messages;
  accounts;
  business;
  templates;
  webhooks;
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
    this.templates = new TemplatesService(this.httpClient);
    this.webhooks = new WebhooksService(this.httpClient);
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
import { z as z8 } from "zod";
var messageResponseSchema = z8.object({
  messaging_product: z8.literal("whatsapp"),
  contacts: z8.array(
    z8.object({
      input: z8.string(),
      wa_id: z8.string()
    })
  ),
  messages: z8.array(
    z8.object({
      id: z8.string(),
      group_id: z8.string().optional(),
      message_status: z8.string().optional()
    })
  )
});

// src/schemas/accounts/phone-number.ts
import { z as z9 } from "zod";
var phoneNumberResponseSchema = z9.object({
  verified_name: z9.string(),
  display_phone_number: z9.string(),
  id: z9.string(),
  quality_rating: z9.string()
});
var phoneNumberListResponseSchema = z9.object({
  data: z9.array(phoneNumberResponseSchema)
});

// src/schemas/business/account.ts
import { z as z10 } from "zod";
var businessAccountResponseSchema = z10.object({
  id: z10.string(),
  name: z10.string().optional(),
  account_review_status: z10.string().optional(),
  currency: z10.string().optional(),
  country: z10.string().optional(),
  timezone_id: z10.string().optional(),
  business_verification_status: z10.string().optional(),
  is_enabled_for_insights: z10.boolean().optional(),
  message_template_namespace: z10.string().optional()
});
var businessAccountsListResponseSchema = z10.object({
  data: z10.record(z10.string(), businessAccountResponseSchema).or(
    z10.array(businessAccountResponseSchema)
  ),
  paging: z10.object({
    cursors: z10.object({
      before: z10.string().optional(),
      after: z10.string().optional()
    }).optional(),
    next: z10.string().url().optional(),
    previous: z10.string().url().optional()
  }).optional()
});

// src/schemas/templates/response.ts
import { z as z11 } from "zod";
var templateSchema = z11.object({
  id: z11.string(),
  name: z11.string(),
  language: z11.string(),
  status: z11.string(),
  category: z11.string(),
  components: z11.array(templateComponentSchema)
});
var templateCreateResponseSchema = z11.object({
  id: z11.string(),
  status: z11.string(),
  category: z11.string()
});
var templateListResponseSchema = z11.object({
  data: z11.array(templateSchema),
  paging: z11.object({
    cursors: z11.object({
      before: z11.string().optional(),
      after: z11.string().optional()
    }).optional()
  }).optional()
});
var templateUpdateResponseSchema = z11.object({
  success: z11.boolean()
});
var templateDeleteResponseSchema = z11.object({
  success: z11.boolean()
});

// src/schemas/debug.ts
import { z as z12 } from "zod";
var debugTokenResponseSchema = z12.object({
  data: z12.object({
    app_id: z12.string().optional(),
    type: z12.string().optional(),
    application: z12.string().optional(),
    data_access_expires_at: z12.number().optional(),
    expires_at: z12.number().optional(),
    is_valid: z12.boolean().optional(),
    issued_at: z12.number().optional(),
    metadata: z12.object({
      auth_type: z12.string().optional(),
      sso: z12.string().optional()
    }).optional(),
    scopes: z12.array(z12.string()).optional(),
    user_id: z12.string().optional()
  })
});
export {
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
  templateBodyComponentSchema,
  templateButtonSchema,
  templateButtonsComponentSchema,
  templateComponentSchema,
  templateCopyCodeButtonSchema,
  templateCreateResponseSchema,
  templateCreateSchema,
  templateDeleteResponseSchema,
  templateDeleteSchema,
  templateFlowButtonSchema,
  templateFooterComponentSchema,
  templateHeaderComponentSchema,
  templateLanguageSchema,
  templateListResponseSchema,
  templateListSchema,
  templatePhoneNumberButtonSchema,
  templateQuickReplyButtonSchema,
  templateSchema,
  templateUpdateResponseSchema,
  templateUpdateSchema,
  templateUrlButtonSchema,
  webhookPayloadSchema
};
