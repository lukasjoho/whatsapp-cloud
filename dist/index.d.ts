import { z } from 'zod';

/**
 * Client configuration schema
 */
declare const clientConfigSchema: z.ZodObject<{
    accessToken: z.ZodString;
    phoneNumberId: z.ZodOptional<z.ZodString>;
    businessAccountId: z.ZodOptional<z.ZodString>;
    businessId: z.ZodOptional<z.ZodString>;
    apiVersion: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    baseURL: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    timeout: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;

/**
 * Client configuration type
 */
type ClientConfig = z.infer<typeof clientConfigSchema>;

/**
 * HTTP client for making requests to the WhatsApp Cloud API
 */
declare class HttpClient {
    readonly baseURL: string;
    readonly accessToken: string;
    readonly phoneNumberId?: string;
    readonly businessAccountId?: string;
    readonly businessId?: string;
    readonly apiVersion: string;
    constructor(config: ClientConfig);
    /**
     * Make a POST request
     */
    post<T>(path: string, body: unknown): Promise<T>;
    /**
     * Make a GET request
     */
    get<T>(path: string): Promise<T>;
    /**
     * Make a GET request and return binary data (ArrayBuffer)
     * Useful for downloading media files
     */
    getBinary(path: string): Promise<ArrayBuffer>;
    /**
     * Make a PATCH request
     */
    patch<T>(path: string, body: unknown): Promise<T>;
    /**
     * Make a DELETE request
     */
    delete<T>(path: string): Promise<T>;
}

/**
 * Input schema for sendText() method
 */
declare const sendTextInputSchema: z.ZodObject<{
    to: z.ZodString;
    text: z.ZodObject<{
        body: z.ZodString;
        preview_url: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Input schema for sendImage() method
 */
declare const sendImageInputSchema: z.ZodObject<{
    to: z.ZodString;
    image: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Input schema for sendLocation() method
 */
declare const sendLocationInputSchema: z.ZodObject<{
    to: z.ZodString;
    location: z.ZodObject<{
        longitude: z.ZodNumber;
        latitude: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Input schema for sendReaction() method
 */
declare const sendReactionInputSchema: z.ZodObject<{
    to: z.ZodString;
    reaction: z.ZodObject<{
        message_id: z.ZodString;
        emoji: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Full outgoing text message schema (includes type discriminator)
 */
declare const outgoingTextMessageSchema: z.ZodObject<{
    to: z.ZodString;
    text: z.ZodObject<{
        body: z.ZodString;
        preview_url: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"text">;
}, z.core.$strip>;
/**
 * Full outgoing image message schema (includes type discriminator)
 */
declare const outgoingImageMessageSchema: z.ZodObject<{
    to: z.ZodString;
    image: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"image">;
}, z.core.$strip>;
/**
 * Full outgoing location message schema (includes type discriminator)
 */
declare const outgoingLocationMessageSchema: z.ZodObject<{
    to: z.ZodString;
    location: z.ZodObject<{
        longitude: z.ZodNumber;
        latitude: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"location">;
}, z.core.$strip>;
/**
 * Full outgoing reaction message schema (includes type discriminator)
 */
declare const outgoingReactionMessageSchema: z.ZodObject<{
    to: z.ZodString;
    reaction: z.ZodObject<{
        message_id: z.ZodString;
        emoji: z.ZodString;
    }, z.core.$strip>;
    type: z.ZodLiteral<"reaction">;
}, z.core.$strip>;
/**
 * Union of all outgoing message types
 * Discriminated by the 'type' field
 */
declare const outgoingMessageSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    to: z.ZodString;
    text: z.ZodObject<{
        body: z.ZodString;
        preview_url: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"text">;
}, z.core.$strip>, z.ZodObject<{
    to: z.ZodString;
    image: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"image">;
}, z.core.$strip>, z.ZodObject<{
    to: z.ZodString;
    location: z.ZodObject<{
        longitude: z.ZodNumber;
        latitude: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"location">;
}, z.core.$strip>, z.ZodObject<{
    to: z.ZodString;
    reaction: z.ZodObject<{
        message_id: z.ZodString;
        emoji: z.ZodString;
    }, z.core.$strip>;
    type: z.ZodLiteral<"reaction">;
}, z.core.$strip>], "type">;

/**
 * Input type for sendText() method
 */
type SendTextInput = z.infer<typeof sendTextInputSchema>;
/**
 * Input type for sendImage() method
 */
type SendImageInput = z.infer<typeof sendImageInputSchema>;
/**
 * Input type for sendLocation() method
 */
type SendLocationInput = z.infer<typeof sendLocationInputSchema>;
/**
 * Input type for sendReaction() method
 */
type SendReactionInput = z.infer<typeof sendReactionInputSchema>;
/**
 * Full outgoing text message type (includes type discriminator)
 */
type OutgoingTextMessage = z.infer<typeof outgoingTextMessageSchema>;
/**
 * Full outgoing image message type (includes type discriminator)
 */
type OutgoingImageMessage = z.infer<typeof outgoingImageMessageSchema>;
/**
 * Full outgoing location message type (includes type discriminator)
 */
type OutgoingLocationMessage = z.infer<typeof outgoingLocationMessageSchema>;
/**
 * Full outgoing reaction message type (includes type discriminator)
 */
type OutgoingReactionMessage = z.infer<typeof outgoingReactionMessageSchema>;
/**
 * Union type for all outgoing message types
 */
type OutgoingMessage = z.infer<typeof outgoingMessageSchema>;

/**
 * Schema for message response
 */
declare const messageResponseSchema: z.ZodObject<{
    messaging_product: z.ZodLiteral<"whatsapp">;
    contacts: z.ZodArray<z.ZodObject<{
        input: z.ZodString;
        wa_id: z.ZodString;
    }, z.core.$strip>>;
    messages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        group_id: z.ZodOptional<z.ZodString>;
        message_status: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;

/**
 * Type for message response
 */
type MessageResponse = z.infer<typeof messageResponseSchema>;

/**
 * Messages service for sending WhatsApp messages
 *
 * This service handles message operations.
 * It supports both a globally configured phoneNumberId (in WhatsAppClient)
 * and per-request phoneNumberId overrides.
 */
declare class MessagesService {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Helper to create a Scoped Client (prefer override, fallback to config)
     */
    private getClient;
    /**
     * Send a text message
     *
     * @param input - Text message input (to, text)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendText(input: SendTextInput, phoneNumberId?: string): Promise<MessageResponse>;
    /**
     * Send an image message
     *
     * @param input - Image message input (to, image)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendImage(input: SendImageInput, phoneNumberId?: string): Promise<MessageResponse>;
    /**
     * Send a location message
     *
     * @param input - Location message input (to, location)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendLocation(input: SendLocationInput, phoneNumberId?: string): Promise<MessageResponse>;
    /**
     * Send a reaction message
     *
     * @param input - Reaction message input (to, reaction)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendReaction(input: SendReactionInput, phoneNumberId?: string): Promise<MessageResponse>;
    /**
     * Send any message type using the discriminated union
     *
     * @param message - Any outgoing message (text, image, location, reaction)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendMessage(message: OutgoingMessage, phoneNumberId?: string): Promise<MessageResponse>;
}

/**
 * Schema for phone number response
 * Matches WhatsApp API structure for phone number objects
 */
declare const phoneNumberResponseSchema: z.ZodObject<{
    verified_name: z.ZodString;
    display_phone_number: z.ZodString;
    id: z.ZodString;
    quality_rating: z.ZodString;
}, z.core.$strip>;
/**
 * Schema for phone number list response
 * Matches WhatsApp API structure for GET /phone_numbers endpoint
 */
declare const phoneNumberListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        verified_name: z.ZodString;
        display_phone_number: z.ZodString;
        id: z.ZodString;
        quality_rating: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;

/**
 * Type for phone number list response
 */
type PhoneNumberListResponse = z.infer<typeof phoneNumberListResponseSchema>;

/**
 * Accounts service for managing WhatsApp Business Accounts
 *
 * This service handles WABA operations like listing phone numbers.
 * It supports both a globally configured businessAccountId (in WhatsAppClient)
 * and per-request businessAccountId overrides.
 */
declare class AccountsService {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Helper to create a Scoped Client (prefer override, fallback to config)
     */
    private getClient;
    /**
     * List phone numbers for a WhatsApp Business Account
     *
     * @param businessAccountId - Optional WABA ID (overrides client config)
     * @returns List of phone numbers associated with the WABA
     */
    listPhoneNumbers(businessAccountId?: string): Promise<PhoneNumberListResponse>;
}

/**
 * Schema for WhatsApp Business Account (WABA) response
 * Matches WhatsApp API structure for WABA objects
 */
declare const businessAccountResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    account_review_status: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    timezone_id: z.ZodOptional<z.ZodString>;
    business_verification_status: z.ZodOptional<z.ZodString>;
    is_enabled_for_insights: z.ZodOptional<z.ZodBoolean>;
    message_template_namespace: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema for WhatsApp Business Accounts list response
 * Matches WhatsApp API structure for GET /whatsapp_business_accounts endpoint
 *
 * Note: The API returns data as an object with numeric string keys (e.g., "0", "1")
 * or as an array, plus optional paging information
 */
declare const businessAccountsListResponseSchema: z.ZodObject<{
    data: z.ZodUnion<[z.ZodRecord<z.ZodString, z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        account_review_status: z.ZodOptional<z.ZodString>;
        currency: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        timezone_id: z.ZodOptional<z.ZodString>;
        business_verification_status: z.ZodOptional<z.ZodString>;
        is_enabled_for_insights: z.ZodOptional<z.ZodBoolean>;
        message_template_namespace: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>, z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        account_review_status: z.ZodOptional<z.ZodString>;
        currency: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        timezone_id: z.ZodOptional<z.ZodString>;
        business_verification_status: z.ZodOptional<z.ZodString>;
        is_enabled_for_insights: z.ZodOptional<z.ZodBoolean>;
        message_template_namespace: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>]>;
    paging: z.ZodOptional<z.ZodObject<{
        cursors: z.ZodOptional<z.ZodObject<{
            before: z.ZodOptional<z.ZodString>;
            after: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        next: z.ZodOptional<z.ZodString>;
        previous: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;

/**
 * Type for WhatsApp Business Accounts list response
 */
type BusinessAccountsListResponse = z.infer<typeof businessAccountsListResponseSchema>;

/**
 * Business service for managing Business Portfolios
 *
 * This service handles Business Portfolio operations like listing WABAs.
 * It supports both a globally configured businessId (in WhatsAppClient)
 * and per-request businessId overrides.
 */
declare class BusinessService {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Helper to create a Scoped Client (prefer override, fallback to config)
     */
    private getClient;
    /**
     * List WhatsApp Business Accounts (WABAs) for a Business Portfolio
     *
     * @param businessId - Optional Business Portfolio ID (overrides client config)
     * @returns List of WABAs associated with the Business Portfolio
     */
    listAccounts(businessId?: string): Promise<BusinessAccountsListResponse>;
}

/**
 * Supported WhatsApp template languages
 */
declare const templateLanguageSchema: z.ZodEnum<{
    te: "te";
    id: "id";
    af: "af";
    sq: "sq";
    ar: "ar";
    ar_EG: "ar_EG";
    ar_AE: "ar_AE";
    ar_LB: "ar_LB";
    ar_MA: "ar_MA";
    ar_QA: "ar_QA";
    az: "az";
    be_BY: "be_BY";
    bn: "bn";
    bn_IN: "bn_IN";
    bg: "bg";
    ca: "ca";
    zh_CN: "zh_CN";
    zh_HK: "zh_HK";
    zh_TW: "zh_TW";
    hr: "hr";
    cs: "cs";
    da: "da";
    prs_AF: "prs_AF";
    nl: "nl";
    nl_BE: "nl_BE";
    en: "en";
    en_GB: "en_GB";
    en_US: "en_US";
    en_AE: "en_AE";
    en_AU: "en_AU";
    en_CA: "en_CA";
    en_GH: "en_GH";
    en_IE: "en_IE";
    en_IN: "en_IN";
    en_JM: "en_JM";
    en_MY: "en_MY";
    en_NZ: "en_NZ";
    en_QA: "en_QA";
    en_SG: "en_SG";
    en_UG: "en_UG";
    en_ZA: "en_ZA";
    et: "et";
    fil: "fil";
    fi: "fi";
    fr: "fr";
    fr_BE: "fr_BE";
    fr_CA: "fr_CA";
    fr_CH: "fr_CH";
    fr_CI: "fr_CI";
    fr_MA: "fr_MA";
    ka: "ka";
    de: "de";
    de_AT: "de_AT";
    de_CH: "de_CH";
    el: "el";
    gu: "gu";
    ha: "ha";
    he: "he";
    hi: "hi";
    hu: "hu";
    ga: "ga";
    it: "it";
    ja: "ja";
    kn: "kn";
    kk: "kk";
    rw_RW: "rw_RW";
    ko: "ko";
    ky_KG: "ky_KG";
    lo: "lo";
    lv: "lv";
    lt: "lt";
    mk: "mk";
    ms: "ms";
    ml: "ml";
    mr: "mr";
    nb: "nb";
    ps_AF: "ps_AF";
    fa: "fa";
    pl: "pl";
    pt_BR: "pt_BR";
    pt_PT: "pt_PT";
    pa: "pa";
    ro: "ro";
    ru: "ru";
    sr: "sr";
    si_LK: "si_LK";
    sk: "sk";
    sl: "sl";
    es: "es";
    es_AR: "es_AR";
    es_CL: "es_CL";
    es_CO: "es_CO";
    es_CR: "es_CR";
    es_DO: "es_DO";
    es_EC: "es_EC";
    es_HN: "es_HN";
    es_MX: "es_MX";
    es_PA: "es_PA";
    es_PE: "es_PE";
    es_ES: "es_ES";
    es_UY: "es_UY";
    sw: "sw";
    sv: "sv";
    ta: "ta";
    th: "th";
    tr: "tr";
    uk: "uk";
    ur: "ur";
    uz: "uz";
    vi: "vi";
    zu: "zu";
}>;
declare const templateCategorySchema: z.ZodEnum<{
    AUTHENTICATION: "AUTHENTICATION";
    MARKETING: "MARKETING";
    UTILITY: "UTILITY";
}>;
/**
 * Parameter format for template variables
 * - "positional": Variables use {{1}}, {{2}}, etc.
 * - "named": Variables use {{name}}, {{order_number}}, etc.
 */
declare const templateParameterFormatSchema: z.ZodEnum<{
    positional: "positional";
    named: "named";
}>;
declare const templateStatusSchema: z.ZodEnum<{
    APPROVED: "APPROVED";
    PENDING: "PENDING";
    REJECTED: "REJECTED";
    PAUSED: "PAUSED";
    DISABLED: "DISABLED";
    IN_APPEAL: "IN_APPEAL";
    PENDING_DELETION: "PENDING_DELETION";
    DELETED: "DELETED";
    LIMIT_EXCEEDED: "LIMIT_EXCEEDED";
}>;
declare const templateQualityScoreSchema: z.ZodObject<{
    score: z.ZodOptional<z.ZodEnum<{
        GREEN: "GREEN";
        YELLOW: "YELLOW";
        RED: "RED";
        UNKNOWN: "UNKNOWN";
    }>>;
    date: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Named parameter example (for parameter_format: "named")
 */
declare const templateNamedParamExampleSchema: z.ZodObject<{
    param_name: z.ZodString;
    example: z.ZodString;
}, z.core.$strip>;
declare const templateQuickReplyButtonInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"QUICK_REPLY">;
    text: z.ZodString;
}, z.core.$strip>;
declare const templateUrlButtonInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"URL">;
    text: z.ZodString;
    url: z.ZodString;
    example: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
declare const templatePhoneNumberButtonInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"PHONE_NUMBER">;
    text: z.ZodString;
    phone_number: z.ZodString;
}, z.core.$strip>;
declare const templateCopyCodeButtonInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"COPY_CODE">;
    example: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templateFlowButtonInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"FLOW">;
    text: z.ZodString;
    flow_id: z.ZodOptional<z.ZodString>;
    flow_action: z.ZodOptional<z.ZodEnum<{
        navigate: "navigate";
        data_exchange: "data_exchange";
    }>>;
    navigate_screen: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templateButtonInputSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"QUICK_REPLY">;
    text: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"URL">;
    text: z.ZodString;
    url: z.ZodString;
    example: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"PHONE_NUMBER">;
    text: z.ZodString;
    phone_number: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"COPY_CODE">;
    example: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"FLOW">;
    text: z.ZodString;
    flow_id: z.ZodOptional<z.ZodString>;
    flow_action: z.ZodOptional<z.ZodEnum<{
        navigate: "navigate";
        data_exchange: "data_exchange";
    }>>;
    navigate_screen: z.ZodOptional<z.ZodString>;
}, z.core.$strip>], "type">;
/**
 * Header text example schema
 * Supports both positional and named parameter formats
 */
declare const templateHeaderTextExampleSchema: z.ZodObject<{
    header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
    header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
        param_name: z.ZodString;
        example: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const templateHeaderTextInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodLiteral<"TEXT">;
    text: z.ZodString;
    example: z.ZodOptional<z.ZodObject<{
        header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
        header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
            param_name: z.ZodString;
            example: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const templateHeaderMediaInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodEnum<{
        IMAGE: "IMAGE";
        VIDEO: "VIDEO";
        DOCUMENT: "DOCUMENT";
    }>;
    example: z.ZodObject<{
        header_handle: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const templateHeaderLocationInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodLiteral<"LOCATION">;
}, z.core.$strip>;
declare const templateHeaderComponentInputSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodLiteral<"TEXT">;
    text: z.ZodString;
    example: z.ZodOptional<z.ZodObject<{
        header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
        header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
            param_name: z.ZodString;
            example: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodEnum<{
        IMAGE: "IMAGE";
        VIDEO: "VIDEO";
        DOCUMENT: "DOCUMENT";
    }>;
    example: z.ZodObject<{
        header_handle: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodLiteral<"LOCATION">;
}, z.core.$strip>], "format">;
/**
 * Body example schema
 * Supports both positional and named parameter formats
 */
declare const templateBodyExampleSchema: z.ZodObject<{
    body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
    body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
        param_name: z.ZodString;
        example: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
declare const templateBodyComponentInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"BODY">;
    text: z.ZodString;
    example: z.ZodOptional<z.ZodObject<{
        body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
        body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
            param_name: z.ZodString;
            example: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const templateFooterComponentInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"FOOTER">;
    text: z.ZodString;
}, z.core.$strip>;
declare const templateButtonsComponentInputSchema: z.ZodObject<{
    type: z.ZodLiteral<"BUTTONS">;
    buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"QUICK_REPLY">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"URL">;
        text: z.ZodString;
        url: z.ZodString;
        example: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"PHONE_NUMBER">;
        text: z.ZodString;
        phone_number: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"COPY_CODE">;
        example: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FLOW">;
        text: z.ZodString;
        flow_id: z.ZodOptional<z.ZodString>;
        flow_action: z.ZodOptional<z.ZodEnum<{
            navigate: "navigate";
            data_exchange: "data_exchange";
        }>>;
        navigate_screen: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>;
declare const templateComponentInputSchema: z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodLiteral<"TEXT">;
    text: z.ZodString;
    example: z.ZodOptional<z.ZodObject<{
        header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
        header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
            param_name: z.ZodString;
            example: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodEnum<{
        IMAGE: "IMAGE";
        VIDEO: "VIDEO";
        DOCUMENT: "DOCUMENT";
    }>;
    example: z.ZodObject<{
        header_handle: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodLiteral<"LOCATION">;
}, z.core.$strip>], "format">, z.ZodObject<{
    type: z.ZodLiteral<"BODY">;
    text: z.ZodString;
    example: z.ZodOptional<z.ZodObject<{
        body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
        body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
            param_name: z.ZodString;
            example: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"FOOTER">;
    text: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"BUTTONS">;
    buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"QUICK_REPLY">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"URL">;
        text: z.ZodString;
        url: z.ZodString;
        example: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"PHONE_NUMBER">;
        text: z.ZodString;
        phone_number: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"COPY_CODE">;
        example: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FLOW">;
        text: z.ZodString;
        flow_id: z.ZodOptional<z.ZodString>;
        flow_action: z.ZodOptional<z.ZodEnum<{
            navigate: "navigate";
            data_exchange: "data_exchange";
        }>>;
        navigate_screen: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>]>;
declare const templateButtonSchema: z.ZodObject<{
    type: z.ZodString;
    text: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
    phone_number: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodString]>>;
    flow_id: z.ZodOptional<z.ZodString>;
    flow_action: z.ZodOptional<z.ZodString>;
    navigate_screen: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templateComponentSchema: z.ZodObject<{
    type: z.ZodEnum<{
        HEADER: "HEADER";
        BODY: "BODY";
        FOOTER: "FOOTER";
        BUTTONS: "BUTTONS";
    }>;
    format: z.ZodOptional<z.ZodString>;
    text: z.ZodOptional<z.ZodString>;
    buttons: z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        text: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        phone_number: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodString]>>;
        flow_id: z.ZodOptional<z.ZodString>;
        flow_action: z.ZodOptional<z.ZodString>;
        navigate_screen: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    example: z.ZodOptional<z.ZodObject<{
        header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
        header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
            param_name: z.ZodString;
            example: z.ZodString;
        }, z.core.$strip>>>;
        header_handle: z.ZodOptional<z.ZodArray<z.ZodString>>;
        body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
        body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
            param_name: z.ZodString;
            example: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const templateCreateMarketingSchema: z.ZodObject<{
    name: z.ZodString;
    language: z.ZodEnum<{
        te: "te";
        id: "id";
        af: "af";
        sq: "sq";
        ar: "ar";
        ar_EG: "ar_EG";
        ar_AE: "ar_AE";
        ar_LB: "ar_LB";
        ar_MA: "ar_MA";
        ar_QA: "ar_QA";
        az: "az";
        be_BY: "be_BY";
        bn: "bn";
        bn_IN: "bn_IN";
        bg: "bg";
        ca: "ca";
        zh_CN: "zh_CN";
        zh_HK: "zh_HK";
        zh_TW: "zh_TW";
        hr: "hr";
        cs: "cs";
        da: "da";
        prs_AF: "prs_AF";
        nl: "nl";
        nl_BE: "nl_BE";
        en: "en";
        en_GB: "en_GB";
        en_US: "en_US";
        en_AE: "en_AE";
        en_AU: "en_AU";
        en_CA: "en_CA";
        en_GH: "en_GH";
        en_IE: "en_IE";
        en_IN: "en_IN";
        en_JM: "en_JM";
        en_MY: "en_MY";
        en_NZ: "en_NZ";
        en_QA: "en_QA";
        en_SG: "en_SG";
        en_UG: "en_UG";
        en_ZA: "en_ZA";
        et: "et";
        fil: "fil";
        fi: "fi";
        fr: "fr";
        fr_BE: "fr_BE";
        fr_CA: "fr_CA";
        fr_CH: "fr_CH";
        fr_CI: "fr_CI";
        fr_MA: "fr_MA";
        ka: "ka";
        de: "de";
        de_AT: "de_AT";
        de_CH: "de_CH";
        el: "el";
        gu: "gu";
        ha: "ha";
        he: "he";
        hi: "hi";
        hu: "hu";
        ga: "ga";
        it: "it";
        ja: "ja";
        kn: "kn";
        kk: "kk";
        rw_RW: "rw_RW";
        ko: "ko";
        ky_KG: "ky_KG";
        lo: "lo";
        lv: "lv";
        lt: "lt";
        mk: "mk";
        ms: "ms";
        ml: "ml";
        mr: "mr";
        nb: "nb";
        ps_AF: "ps_AF";
        fa: "fa";
        pl: "pl";
        pt_BR: "pt_BR";
        pt_PT: "pt_PT";
        pa: "pa";
        ro: "ro";
        ru: "ru";
        sr: "sr";
        si_LK: "si_LK";
        sk: "sk";
        sl: "sl";
        es: "es";
        es_AR: "es_AR";
        es_CL: "es_CL";
        es_CO: "es_CO";
        es_CR: "es_CR";
        es_DO: "es_DO";
        es_EC: "es_EC";
        es_HN: "es_HN";
        es_MX: "es_MX";
        es_PA: "es_PA";
        es_PE: "es_PE";
        es_ES: "es_ES";
        es_UY: "es_UY";
        sw: "sw";
        sv: "sv";
        ta: "ta";
        th: "th";
        tr: "tr";
        uk: "uk";
        ur: "ur";
        uz: "uz";
        vi: "vi";
        zu: "zu";
    }>;
    category: z.ZodLiteral<"MARKETING">;
    parameter_format: z.ZodOptional<z.ZodEnum<{
        positional: "positional";
        named: "named";
    }>>;
    components: z.ZodArray<z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"TEXT">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
            header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
        }>;
        example: z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"LOCATION">;
    }, z.core.$strip>], "format">, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
            body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FOOTER">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BUTTONS">;
        buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"QUICK_REPLY">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"URL">;
            text: z.ZodString;
            url: z.ZodString;
            example: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
            example: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_id: z.ZodOptional<z.ZodString>;
            flow_action: z.ZodOptional<z.ZodEnum<{
                navigate: "navigate";
                data_exchange: "data_exchange";
            }>>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
declare const templateCreateUtilitySchema: z.ZodObject<{
    name: z.ZodString;
    language: z.ZodEnum<{
        te: "te";
        id: "id";
        af: "af";
        sq: "sq";
        ar: "ar";
        ar_EG: "ar_EG";
        ar_AE: "ar_AE";
        ar_LB: "ar_LB";
        ar_MA: "ar_MA";
        ar_QA: "ar_QA";
        az: "az";
        be_BY: "be_BY";
        bn: "bn";
        bn_IN: "bn_IN";
        bg: "bg";
        ca: "ca";
        zh_CN: "zh_CN";
        zh_HK: "zh_HK";
        zh_TW: "zh_TW";
        hr: "hr";
        cs: "cs";
        da: "da";
        prs_AF: "prs_AF";
        nl: "nl";
        nl_BE: "nl_BE";
        en: "en";
        en_GB: "en_GB";
        en_US: "en_US";
        en_AE: "en_AE";
        en_AU: "en_AU";
        en_CA: "en_CA";
        en_GH: "en_GH";
        en_IE: "en_IE";
        en_IN: "en_IN";
        en_JM: "en_JM";
        en_MY: "en_MY";
        en_NZ: "en_NZ";
        en_QA: "en_QA";
        en_SG: "en_SG";
        en_UG: "en_UG";
        en_ZA: "en_ZA";
        et: "et";
        fil: "fil";
        fi: "fi";
        fr: "fr";
        fr_BE: "fr_BE";
        fr_CA: "fr_CA";
        fr_CH: "fr_CH";
        fr_CI: "fr_CI";
        fr_MA: "fr_MA";
        ka: "ka";
        de: "de";
        de_AT: "de_AT";
        de_CH: "de_CH";
        el: "el";
        gu: "gu";
        ha: "ha";
        he: "he";
        hi: "hi";
        hu: "hu";
        ga: "ga";
        it: "it";
        ja: "ja";
        kn: "kn";
        kk: "kk";
        rw_RW: "rw_RW";
        ko: "ko";
        ky_KG: "ky_KG";
        lo: "lo";
        lv: "lv";
        lt: "lt";
        mk: "mk";
        ms: "ms";
        ml: "ml";
        mr: "mr";
        nb: "nb";
        ps_AF: "ps_AF";
        fa: "fa";
        pl: "pl";
        pt_BR: "pt_BR";
        pt_PT: "pt_PT";
        pa: "pa";
        ro: "ro";
        ru: "ru";
        sr: "sr";
        si_LK: "si_LK";
        sk: "sk";
        sl: "sl";
        es: "es";
        es_AR: "es_AR";
        es_CL: "es_CL";
        es_CO: "es_CO";
        es_CR: "es_CR";
        es_DO: "es_DO";
        es_EC: "es_EC";
        es_HN: "es_HN";
        es_MX: "es_MX";
        es_PA: "es_PA";
        es_PE: "es_PE";
        es_ES: "es_ES";
        es_UY: "es_UY";
        sw: "sw";
        sv: "sv";
        ta: "ta";
        th: "th";
        tr: "tr";
        uk: "uk";
        ur: "ur";
        uz: "uz";
        vi: "vi";
        zu: "zu";
    }>;
    category: z.ZodLiteral<"UTILITY">;
    parameter_format: z.ZodOptional<z.ZodEnum<{
        positional: "positional";
        named: "named";
    }>>;
    components: z.ZodArray<z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"TEXT">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
            header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
        }>;
        example: z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"LOCATION">;
    }, z.core.$strip>], "format">, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
            body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FOOTER">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BUTTONS">;
        buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"QUICK_REPLY">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"URL">;
            text: z.ZodString;
            url: z.ZodString;
            example: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
            example: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_id: z.ZodOptional<z.ZodString>;
            flow_action: z.ZodOptional<z.ZodEnum<{
                navigate: "navigate";
                data_exchange: "data_exchange";
            }>>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
declare const templateCreateAuthenticationSchema: z.ZodObject<{
    name: z.ZodString;
    language: z.ZodEnum<{
        te: "te";
        id: "id";
        af: "af";
        sq: "sq";
        ar: "ar";
        ar_EG: "ar_EG";
        ar_AE: "ar_AE";
        ar_LB: "ar_LB";
        ar_MA: "ar_MA";
        ar_QA: "ar_QA";
        az: "az";
        be_BY: "be_BY";
        bn: "bn";
        bn_IN: "bn_IN";
        bg: "bg";
        ca: "ca";
        zh_CN: "zh_CN";
        zh_HK: "zh_HK";
        zh_TW: "zh_TW";
        hr: "hr";
        cs: "cs";
        da: "da";
        prs_AF: "prs_AF";
        nl: "nl";
        nl_BE: "nl_BE";
        en: "en";
        en_GB: "en_GB";
        en_US: "en_US";
        en_AE: "en_AE";
        en_AU: "en_AU";
        en_CA: "en_CA";
        en_GH: "en_GH";
        en_IE: "en_IE";
        en_IN: "en_IN";
        en_JM: "en_JM";
        en_MY: "en_MY";
        en_NZ: "en_NZ";
        en_QA: "en_QA";
        en_SG: "en_SG";
        en_UG: "en_UG";
        en_ZA: "en_ZA";
        et: "et";
        fil: "fil";
        fi: "fi";
        fr: "fr";
        fr_BE: "fr_BE";
        fr_CA: "fr_CA";
        fr_CH: "fr_CH";
        fr_CI: "fr_CI";
        fr_MA: "fr_MA";
        ka: "ka";
        de: "de";
        de_AT: "de_AT";
        de_CH: "de_CH";
        el: "el";
        gu: "gu";
        ha: "ha";
        he: "he";
        hi: "hi";
        hu: "hu";
        ga: "ga";
        it: "it";
        ja: "ja";
        kn: "kn";
        kk: "kk";
        rw_RW: "rw_RW";
        ko: "ko";
        ky_KG: "ky_KG";
        lo: "lo";
        lv: "lv";
        lt: "lt";
        mk: "mk";
        ms: "ms";
        ml: "ml";
        mr: "mr";
        nb: "nb";
        ps_AF: "ps_AF";
        fa: "fa";
        pl: "pl";
        pt_BR: "pt_BR";
        pt_PT: "pt_PT";
        pa: "pa";
        ro: "ro";
        ru: "ru";
        sr: "sr";
        si_LK: "si_LK";
        sk: "sk";
        sl: "sl";
        es: "es";
        es_AR: "es_AR";
        es_CL: "es_CL";
        es_CO: "es_CO";
        es_CR: "es_CR";
        es_DO: "es_DO";
        es_EC: "es_EC";
        es_HN: "es_HN";
        es_MX: "es_MX";
        es_PA: "es_PA";
        es_PE: "es_PE";
        es_ES: "es_ES";
        es_UY: "es_UY";
        sw: "sw";
        sv: "sv";
        ta: "ta";
        th: "th";
        tr: "tr";
        uk: "uk";
        ur: "ur";
        uz: "uz";
        vi: "vi";
        zu: "zu";
    }>;
    category: z.ZodLiteral<"AUTHENTICATION">;
    parameter_format: z.ZodOptional<z.ZodEnum<{
        positional: "positional";
        named: "named";
    }>>;
    components: z.ZodArray<z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"TEXT">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
            header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
        }>;
        example: z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"LOCATION">;
    }, z.core.$strip>], "format">, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
            body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FOOTER">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BUTTONS">;
        buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"QUICK_REPLY">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"URL">;
            text: z.ZodString;
            url: z.ZodString;
            example: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
            example: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_id: z.ZodOptional<z.ZodString>;
            flow_action: z.ZodOptional<z.ZodEnum<{
                navigate: "navigate";
                data_exchange: "data_exchange";
            }>>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
declare const templateCreateSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    name: z.ZodString;
    language: z.ZodEnum<{
        te: "te";
        id: "id";
        af: "af";
        sq: "sq";
        ar: "ar";
        ar_EG: "ar_EG";
        ar_AE: "ar_AE";
        ar_LB: "ar_LB";
        ar_MA: "ar_MA";
        ar_QA: "ar_QA";
        az: "az";
        be_BY: "be_BY";
        bn: "bn";
        bn_IN: "bn_IN";
        bg: "bg";
        ca: "ca";
        zh_CN: "zh_CN";
        zh_HK: "zh_HK";
        zh_TW: "zh_TW";
        hr: "hr";
        cs: "cs";
        da: "da";
        prs_AF: "prs_AF";
        nl: "nl";
        nl_BE: "nl_BE";
        en: "en";
        en_GB: "en_GB";
        en_US: "en_US";
        en_AE: "en_AE";
        en_AU: "en_AU";
        en_CA: "en_CA";
        en_GH: "en_GH";
        en_IE: "en_IE";
        en_IN: "en_IN";
        en_JM: "en_JM";
        en_MY: "en_MY";
        en_NZ: "en_NZ";
        en_QA: "en_QA";
        en_SG: "en_SG";
        en_UG: "en_UG";
        en_ZA: "en_ZA";
        et: "et";
        fil: "fil";
        fi: "fi";
        fr: "fr";
        fr_BE: "fr_BE";
        fr_CA: "fr_CA";
        fr_CH: "fr_CH";
        fr_CI: "fr_CI";
        fr_MA: "fr_MA";
        ka: "ka";
        de: "de";
        de_AT: "de_AT";
        de_CH: "de_CH";
        el: "el";
        gu: "gu";
        ha: "ha";
        he: "he";
        hi: "hi";
        hu: "hu";
        ga: "ga";
        it: "it";
        ja: "ja";
        kn: "kn";
        kk: "kk";
        rw_RW: "rw_RW";
        ko: "ko";
        ky_KG: "ky_KG";
        lo: "lo";
        lv: "lv";
        lt: "lt";
        mk: "mk";
        ms: "ms";
        ml: "ml";
        mr: "mr";
        nb: "nb";
        ps_AF: "ps_AF";
        fa: "fa";
        pl: "pl";
        pt_BR: "pt_BR";
        pt_PT: "pt_PT";
        pa: "pa";
        ro: "ro";
        ru: "ru";
        sr: "sr";
        si_LK: "si_LK";
        sk: "sk";
        sl: "sl";
        es: "es";
        es_AR: "es_AR";
        es_CL: "es_CL";
        es_CO: "es_CO";
        es_CR: "es_CR";
        es_DO: "es_DO";
        es_EC: "es_EC";
        es_HN: "es_HN";
        es_MX: "es_MX";
        es_PA: "es_PA";
        es_PE: "es_PE";
        es_ES: "es_ES";
        es_UY: "es_UY";
        sw: "sw";
        sv: "sv";
        ta: "ta";
        th: "th";
        tr: "tr";
        uk: "uk";
        ur: "ur";
        uz: "uz";
        vi: "vi";
        zu: "zu";
    }>;
    category: z.ZodLiteral<"MARKETING">;
    parameter_format: z.ZodOptional<z.ZodEnum<{
        positional: "positional";
        named: "named";
    }>>;
    components: z.ZodArray<z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"TEXT">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
            header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
        }>;
        example: z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"LOCATION">;
    }, z.core.$strip>], "format">, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
            body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FOOTER">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BUTTONS">;
        buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"QUICK_REPLY">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"URL">;
            text: z.ZodString;
            url: z.ZodString;
            example: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
            example: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_id: z.ZodOptional<z.ZodString>;
            flow_action: z.ZodOptional<z.ZodEnum<{
                navigate: "navigate";
                data_exchange: "data_exchange";
            }>>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>]>>;
}, z.core.$strip>, z.ZodObject<{
    name: z.ZodString;
    language: z.ZodEnum<{
        te: "te";
        id: "id";
        af: "af";
        sq: "sq";
        ar: "ar";
        ar_EG: "ar_EG";
        ar_AE: "ar_AE";
        ar_LB: "ar_LB";
        ar_MA: "ar_MA";
        ar_QA: "ar_QA";
        az: "az";
        be_BY: "be_BY";
        bn: "bn";
        bn_IN: "bn_IN";
        bg: "bg";
        ca: "ca";
        zh_CN: "zh_CN";
        zh_HK: "zh_HK";
        zh_TW: "zh_TW";
        hr: "hr";
        cs: "cs";
        da: "da";
        prs_AF: "prs_AF";
        nl: "nl";
        nl_BE: "nl_BE";
        en: "en";
        en_GB: "en_GB";
        en_US: "en_US";
        en_AE: "en_AE";
        en_AU: "en_AU";
        en_CA: "en_CA";
        en_GH: "en_GH";
        en_IE: "en_IE";
        en_IN: "en_IN";
        en_JM: "en_JM";
        en_MY: "en_MY";
        en_NZ: "en_NZ";
        en_QA: "en_QA";
        en_SG: "en_SG";
        en_UG: "en_UG";
        en_ZA: "en_ZA";
        et: "et";
        fil: "fil";
        fi: "fi";
        fr: "fr";
        fr_BE: "fr_BE";
        fr_CA: "fr_CA";
        fr_CH: "fr_CH";
        fr_CI: "fr_CI";
        fr_MA: "fr_MA";
        ka: "ka";
        de: "de";
        de_AT: "de_AT";
        de_CH: "de_CH";
        el: "el";
        gu: "gu";
        ha: "ha";
        he: "he";
        hi: "hi";
        hu: "hu";
        ga: "ga";
        it: "it";
        ja: "ja";
        kn: "kn";
        kk: "kk";
        rw_RW: "rw_RW";
        ko: "ko";
        ky_KG: "ky_KG";
        lo: "lo";
        lv: "lv";
        lt: "lt";
        mk: "mk";
        ms: "ms";
        ml: "ml";
        mr: "mr";
        nb: "nb";
        ps_AF: "ps_AF";
        fa: "fa";
        pl: "pl";
        pt_BR: "pt_BR";
        pt_PT: "pt_PT";
        pa: "pa";
        ro: "ro";
        ru: "ru";
        sr: "sr";
        si_LK: "si_LK";
        sk: "sk";
        sl: "sl";
        es: "es";
        es_AR: "es_AR";
        es_CL: "es_CL";
        es_CO: "es_CO";
        es_CR: "es_CR";
        es_DO: "es_DO";
        es_EC: "es_EC";
        es_HN: "es_HN";
        es_MX: "es_MX";
        es_PA: "es_PA";
        es_PE: "es_PE";
        es_ES: "es_ES";
        es_UY: "es_UY";
        sw: "sw";
        sv: "sv";
        ta: "ta";
        th: "th";
        tr: "tr";
        uk: "uk";
        ur: "ur";
        uz: "uz";
        vi: "vi";
        zu: "zu";
    }>;
    category: z.ZodLiteral<"UTILITY">;
    parameter_format: z.ZodOptional<z.ZodEnum<{
        positional: "positional";
        named: "named";
    }>>;
    components: z.ZodArray<z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"TEXT">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
            header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
        }>;
        example: z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"LOCATION">;
    }, z.core.$strip>], "format">, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
            body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FOOTER">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BUTTONS">;
        buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"QUICK_REPLY">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"URL">;
            text: z.ZodString;
            url: z.ZodString;
            example: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
            example: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_id: z.ZodOptional<z.ZodString>;
            flow_action: z.ZodOptional<z.ZodEnum<{
                navigate: "navigate";
                data_exchange: "data_exchange";
            }>>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>]>>;
}, z.core.$strip>, z.ZodObject<{
    name: z.ZodString;
    language: z.ZodEnum<{
        te: "te";
        id: "id";
        af: "af";
        sq: "sq";
        ar: "ar";
        ar_EG: "ar_EG";
        ar_AE: "ar_AE";
        ar_LB: "ar_LB";
        ar_MA: "ar_MA";
        ar_QA: "ar_QA";
        az: "az";
        be_BY: "be_BY";
        bn: "bn";
        bn_IN: "bn_IN";
        bg: "bg";
        ca: "ca";
        zh_CN: "zh_CN";
        zh_HK: "zh_HK";
        zh_TW: "zh_TW";
        hr: "hr";
        cs: "cs";
        da: "da";
        prs_AF: "prs_AF";
        nl: "nl";
        nl_BE: "nl_BE";
        en: "en";
        en_GB: "en_GB";
        en_US: "en_US";
        en_AE: "en_AE";
        en_AU: "en_AU";
        en_CA: "en_CA";
        en_GH: "en_GH";
        en_IE: "en_IE";
        en_IN: "en_IN";
        en_JM: "en_JM";
        en_MY: "en_MY";
        en_NZ: "en_NZ";
        en_QA: "en_QA";
        en_SG: "en_SG";
        en_UG: "en_UG";
        en_ZA: "en_ZA";
        et: "et";
        fil: "fil";
        fi: "fi";
        fr: "fr";
        fr_BE: "fr_BE";
        fr_CA: "fr_CA";
        fr_CH: "fr_CH";
        fr_CI: "fr_CI";
        fr_MA: "fr_MA";
        ka: "ka";
        de: "de";
        de_AT: "de_AT";
        de_CH: "de_CH";
        el: "el";
        gu: "gu";
        ha: "ha";
        he: "he";
        hi: "hi";
        hu: "hu";
        ga: "ga";
        it: "it";
        ja: "ja";
        kn: "kn";
        kk: "kk";
        rw_RW: "rw_RW";
        ko: "ko";
        ky_KG: "ky_KG";
        lo: "lo";
        lv: "lv";
        lt: "lt";
        mk: "mk";
        ms: "ms";
        ml: "ml";
        mr: "mr";
        nb: "nb";
        ps_AF: "ps_AF";
        fa: "fa";
        pl: "pl";
        pt_BR: "pt_BR";
        pt_PT: "pt_PT";
        pa: "pa";
        ro: "ro";
        ru: "ru";
        sr: "sr";
        si_LK: "si_LK";
        sk: "sk";
        sl: "sl";
        es: "es";
        es_AR: "es_AR";
        es_CL: "es_CL";
        es_CO: "es_CO";
        es_CR: "es_CR";
        es_DO: "es_DO";
        es_EC: "es_EC";
        es_HN: "es_HN";
        es_MX: "es_MX";
        es_PA: "es_PA";
        es_PE: "es_PE";
        es_ES: "es_ES";
        es_UY: "es_UY";
        sw: "sw";
        sv: "sv";
        ta: "ta";
        th: "th";
        tr: "tr";
        uk: "uk";
        ur: "ur";
        uz: "uz";
        vi: "vi";
        zu: "zu";
    }>;
    category: z.ZodLiteral<"AUTHENTICATION">;
    parameter_format: z.ZodOptional<z.ZodEnum<{
        positional: "positional";
        named: "named";
    }>>;
    components: z.ZodArray<z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"TEXT">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
            header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
        }>;
        example: z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"LOCATION">;
    }, z.core.$strip>], "format">, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
            body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FOOTER">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BUTTONS">;
        buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"QUICK_REPLY">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"URL">;
            text: z.ZodString;
            url: z.ZodString;
            example: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
            example: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_id: z.ZodOptional<z.ZodString>;
            flow_action: z.ZodOptional<z.ZodEnum<{
                navigate: "navigate";
                data_exchange: "data_exchange";
            }>>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>]>>;
}, z.core.$strip>], "category">;
declare const templateUpdateSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<{
        AUTHENTICATION: "AUTHENTICATION";
        MARKETING: "MARKETING";
        UTILITY: "UTILITY";
    }>>;
    components: z.ZodOptional<z.ZodArray<z.ZodUnion<readonly [z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"TEXT">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
            header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
        }>;
        example: z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodLiteral<"LOCATION">;
    }, z.core.$strip>], "format">, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
        example: z.ZodOptional<z.ZodObject<{
            body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
            body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FOOTER">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BUTTONS">;
        buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"QUICK_REPLY">;
            text: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"URL">;
            text: z.ZodString;
            url: z.ZodString;
            example: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
            example: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_id: z.ZodOptional<z.ZodString>;
            flow_action: z.ZodOptional<z.ZodEnum<{
                navigate: "navigate";
                data_exchange: "data_exchange";
            }>>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>]>>>;
    language: z.ZodOptional<z.ZodEnum<{
        te: "te";
        id: "id";
        af: "af";
        sq: "sq";
        ar: "ar";
        ar_EG: "ar_EG";
        ar_AE: "ar_AE";
        ar_LB: "ar_LB";
        ar_MA: "ar_MA";
        ar_QA: "ar_QA";
        az: "az";
        be_BY: "be_BY";
        bn: "bn";
        bn_IN: "bn_IN";
        bg: "bg";
        ca: "ca";
        zh_CN: "zh_CN";
        zh_HK: "zh_HK";
        zh_TW: "zh_TW";
        hr: "hr";
        cs: "cs";
        da: "da";
        prs_AF: "prs_AF";
        nl: "nl";
        nl_BE: "nl_BE";
        en: "en";
        en_GB: "en_GB";
        en_US: "en_US";
        en_AE: "en_AE";
        en_AU: "en_AU";
        en_CA: "en_CA";
        en_GH: "en_GH";
        en_IE: "en_IE";
        en_IN: "en_IN";
        en_JM: "en_JM";
        en_MY: "en_MY";
        en_NZ: "en_NZ";
        en_QA: "en_QA";
        en_SG: "en_SG";
        en_UG: "en_UG";
        en_ZA: "en_ZA";
        et: "et";
        fil: "fil";
        fi: "fi";
        fr: "fr";
        fr_BE: "fr_BE";
        fr_CA: "fr_CA";
        fr_CH: "fr_CH";
        fr_CI: "fr_CI";
        fr_MA: "fr_MA";
        ka: "ka";
        de: "de";
        de_AT: "de_AT";
        de_CH: "de_CH";
        el: "el";
        gu: "gu";
        ha: "ha";
        he: "he";
        hi: "hi";
        hu: "hu";
        ga: "ga";
        it: "it";
        ja: "ja";
        kn: "kn";
        kk: "kk";
        rw_RW: "rw_RW";
        ko: "ko";
        ky_KG: "ky_KG";
        lo: "lo";
        lv: "lv";
        lt: "lt";
        mk: "mk";
        ms: "ms";
        ml: "ml";
        mr: "mr";
        nb: "nb";
        ps_AF: "ps_AF";
        fa: "fa";
        pl: "pl";
        pt_BR: "pt_BR";
        pt_PT: "pt_PT";
        pa: "pa";
        ro: "ro";
        ru: "ru";
        sr: "sr";
        si_LK: "si_LK";
        sk: "sk";
        sl: "sl";
        es: "es";
        es_AR: "es_AR";
        es_CL: "es_CL";
        es_CO: "es_CO";
        es_CR: "es_CR";
        es_DO: "es_DO";
        es_EC: "es_EC";
        es_HN: "es_HN";
        es_MX: "es_MX";
        es_PA: "es_PA";
        es_PE: "es_PE";
        es_ES: "es_ES";
        es_UY: "es_UY";
        sw: "sw";
        sv: "sv";
        ta: "ta";
        th: "th";
        tr: "tr";
        uk: "uk";
        ur: "ur";
        uz: "uz";
        vi: "vi";
        zu: "zu";
    }>>;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templateListSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    after: z.ZodOptional<z.ZodString>;
    before: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templateDeleteSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    hsm_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templateSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    language: z.ZodString;
    status: z.ZodEnum<{
        APPROVED: "APPROVED";
        PENDING: "PENDING";
        REJECTED: "REJECTED";
        PAUSED: "PAUSED";
        DISABLED: "DISABLED";
        IN_APPEAL: "IN_APPEAL";
        PENDING_DELETION: "PENDING_DELETION";
        DELETED: "DELETED";
        LIMIT_EXCEEDED: "LIMIT_EXCEEDED";
    }>;
    category: z.ZodEnum<{
        AUTHENTICATION: "AUTHENTICATION";
        MARKETING: "MARKETING";
        UTILITY: "UTILITY";
    }>;
    components: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            HEADER: "HEADER";
            BODY: "BODY";
            FOOTER: "FOOTER";
            BUTTONS: "BUTTONS";
        }>;
        format: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
        buttons: z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            text: z.ZodOptional<z.ZodString>;
            url: z.ZodOptional<z.ZodString>;
            phone_number: z.ZodOptional<z.ZodString>;
            example: z.ZodOptional<z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodString]>>;
            flow_id: z.ZodOptional<z.ZodString>;
            flow_action: z.ZodOptional<z.ZodString>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
        example: z.ZodOptional<z.ZodObject<{
            header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
            header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
            header_handle: z.ZodOptional<z.ZodArray<z.ZodString>>;
            body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
            body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                param_name: z.ZodString;
                example: z.ZodString;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    parameter_format: z.ZodOptional<z.ZodEnum<{
        positional: "positional";
        named: "named";
    }>>;
    quality_score: z.ZodOptional<z.ZodObject<{
        score: z.ZodOptional<z.ZodEnum<{
            GREEN: "GREEN";
            YELLOW: "YELLOW";
            RED: "RED";
            UNKNOWN: "UNKNOWN";
        }>>;
        date: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    rejected_reason: z.ZodOptional<z.ZodString>;
    previous_category: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templateCreateResponseSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<{
        APPROVED: "APPROVED";
        PENDING: "PENDING";
        REJECTED: "REJECTED";
        PAUSED: "PAUSED";
        DISABLED: "DISABLED";
        IN_APPEAL: "IN_APPEAL";
        PENDING_DELETION: "PENDING_DELETION";
        DELETED: "DELETED";
        LIMIT_EXCEEDED: "LIMIT_EXCEEDED";
    }>;
    category: z.ZodEnum<{
        AUTHENTICATION: "AUTHENTICATION";
        MARKETING: "MARKETING";
        UTILITY: "UTILITY";
    }>;
}, z.core.$strip>;
declare const templatePagingCursorsSchema: z.ZodObject<{
    before: z.ZodOptional<z.ZodString>;
    after: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templatePagingSchema: z.ZodObject<{
    cursors: z.ZodOptional<z.ZodObject<{
        before: z.ZodOptional<z.ZodString>;
        after: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    next: z.ZodOptional<z.ZodString>;
    previous: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const templateListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        language: z.ZodString;
        status: z.ZodEnum<{
            APPROVED: "APPROVED";
            PENDING: "PENDING";
            REJECTED: "REJECTED";
            PAUSED: "PAUSED";
            DISABLED: "DISABLED";
            IN_APPEAL: "IN_APPEAL";
            PENDING_DELETION: "PENDING_DELETION";
            DELETED: "DELETED";
            LIMIT_EXCEEDED: "LIMIT_EXCEEDED";
        }>;
        category: z.ZodEnum<{
            AUTHENTICATION: "AUTHENTICATION";
            MARKETING: "MARKETING";
            UTILITY: "UTILITY";
        }>;
        components: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<{
                HEADER: "HEADER";
                BODY: "BODY";
                FOOTER: "FOOTER";
                BUTTONS: "BUTTONS";
            }>;
            format: z.ZodOptional<z.ZodString>;
            text: z.ZodOptional<z.ZodString>;
            buttons: z.ZodOptional<z.ZodArray<z.ZodObject<{
                type: z.ZodString;
                text: z.ZodOptional<z.ZodString>;
                url: z.ZodOptional<z.ZodString>;
                phone_number: z.ZodOptional<z.ZodString>;
                example: z.ZodOptional<z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodString]>>;
                flow_id: z.ZodOptional<z.ZodString>;
                flow_action: z.ZodOptional<z.ZodString>;
                navigate_screen: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
            example: z.ZodOptional<z.ZodObject<{
                header_text: z.ZodOptional<z.ZodArray<z.ZodString>>;
                header_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    param_name: z.ZodString;
                    example: z.ZodString;
                }, z.core.$strip>>>;
                header_handle: z.ZodOptional<z.ZodArray<z.ZodString>>;
                body_text: z.ZodOptional<z.ZodArray<z.ZodArray<z.ZodString>>>;
                body_text_named_params: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    param_name: z.ZodString;
                    example: z.ZodString;
                }, z.core.$strip>>>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        parameter_format: z.ZodOptional<z.ZodEnum<{
            positional: "positional";
            named: "named";
        }>>;
        quality_score: z.ZodOptional<z.ZodObject<{
            score: z.ZodOptional<z.ZodEnum<{
                GREEN: "GREEN";
                YELLOW: "YELLOW";
                RED: "RED";
                UNKNOWN: "UNKNOWN";
            }>>;
            date: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        rejected_reason: z.ZodOptional<z.ZodString>;
        previous_category: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    paging: z.ZodOptional<z.ZodObject<{
        cursors: z.ZodOptional<z.ZodObject<{
            before: z.ZodOptional<z.ZodString>;
            after: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        next: z.ZodOptional<z.ZodString>;
        previous: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const templateUpdateResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;
declare const templateDeleteResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;

/**
 * Supported WhatsApp template language codes
 */
type TemplateLanguage = z.infer<typeof templateLanguageSchema>;
/**
 * Template category
 */
type TemplateCategory = z.infer<typeof templateCategorySchema>;
/**
 * Parameter format for template variables
 * - "positional": Variables use {{1}}, {{2}}, etc.
 * - "named": Variables use {{name}}, {{order_number}}, etc.
 */
type TemplateParameterFormat = z.infer<typeof templateParameterFormatSchema>;
/**
 * Template approval status
 */
type TemplateStatus = z.infer<typeof templateStatusSchema>;
/**
 * Template quality score (returned by API)
 */
type TemplateQualityScore = z.infer<typeof templateQualityScoreSchema>;
/**
 * Named parameter example for use with parameter_format: "named"
 *
 * @example
 * ```typescript
 * const param: TemplateNamedParamExample = {
 *   param_name: "first_name",
 *   example: "Pablo"
 * };
 * ```
 */
type TemplateNamedParamExample = z.infer<typeof templateNamedParamExampleSchema>;
/**
 * Header text example (supports positional and named formats)
 */
type TemplateHeaderTextExample = z.infer<typeof templateHeaderTextExampleSchema>;
/**
 * Body example (supports positional and named formats)
 */
type TemplateBodyExample = z.infer<typeof templateBodyExampleSchema>;
type TemplateQuickReplyButtonInput = z.infer<typeof templateQuickReplyButtonInputSchema>;
type TemplateUrlButtonInput = z.infer<typeof templateUrlButtonInputSchema>;
type TemplatePhoneNumberButtonInput = z.infer<typeof templatePhoneNumberButtonInputSchema>;
type TemplateCopyCodeButtonInput = z.infer<typeof templateCopyCodeButtonInputSchema>;
type TemplateFlowButtonInput = z.infer<typeof templateFlowButtonInputSchema>;
type TemplateButtonInput = z.infer<typeof templateButtonInputSchema>;
type TemplateHeaderTextInput = z.infer<typeof templateHeaderTextInputSchema>;
type TemplateHeaderMediaInput = z.infer<typeof templateHeaderMediaInputSchema>;
type TemplateHeaderLocationInput = z.infer<typeof templateHeaderLocationInputSchema>;
type TemplateHeaderComponentInput = z.infer<typeof templateHeaderComponentInputSchema>;
type TemplateBodyComponentInput = z.infer<typeof templateBodyComponentInputSchema>;
type TemplateFooterComponentInput = z.infer<typeof templateFooterComponentInputSchema>;
type TemplateButtonsComponentInput = z.infer<typeof templateButtonsComponentInputSchema>;
type TemplateComponentInput = z.infer<typeof templateComponentInputSchema>;
/**
 * Button as returned by the API
 */
type TemplateButton = z.infer<typeof templateButtonSchema>;
/**
 * Component as returned by the API
 */
type TemplateComponent = z.infer<typeof templateComponentSchema>;
/**
 * Input for creating a template
 *
 * @example Positional parameters (default)
 * ```typescript
 * const input: TemplateCreate = {
 *   name: "order_confirmation",
 *   category: "UTILITY",
 *   language: "en_US",
 *   components: [
 *     {
 *       type: "BODY",
 *       text: "Hi {{1}}! Your order {{2}} is confirmed.",
 *       example: { body_text: [["Pablo", "860198-230332"]] }
 *     }
 *   ]
 * };
 * ```
 *
 * @example Named parameters
 * ```typescript
 * const input: TemplateCreate = {
 *   name: "order_confirmation",
 *   category: "UTILITY",
 *   language: "en_US",
 *   parameter_format: "named",
 *   components: [
 *     {
 *       type: "BODY",
 *       text: "Hi {{first_name}}! Your order {{order_number}} is confirmed.",
 *       example: {
 *         body_text_named_params: [
 *           { param_name: "first_name", example: "Pablo" },
 *           { param_name: "order_number", example: "860198-230332" }
 *         ]
 *       }
 *     }
 *   ]
 * };
 * ```
 */
type TemplateCreate = z.infer<typeof templateCreateSchema>;
/**
 * Input for updating a template
 */
type TemplateUpdate = z.infer<typeof templateUpdateSchema>;
/**
 * Input for listing templates (query params)
 */
type TemplateList = z.infer<typeof templateListSchema>;
/**
 * Input for deleting a template
 */
type TemplateDelete = z.infer<typeof templateDeleteSchema>;
/**
 * A WhatsApp message template
 */
type Template = z.infer<typeof templateSchema>;
/**
 * Response after creating a template
 */
type TemplateCreateResponse = z.infer<typeof templateCreateResponseSchema>;
/**
 * Response containing list of templates with pagination
 */
type TemplateListResponse = z.infer<typeof templateListResponseSchema>;
/**
 * Response after updating a template
 */
type TemplateUpdateResponse = z.infer<typeof templateUpdateResponseSchema>;
/**
 * Response after deleting a template
 */
type TemplateDeleteResponse = z.infer<typeof templateDeleteResponseSchema>;
/**
 * Pagination info for list responses
 */
type TemplatePaging = z.infer<typeof templatePagingSchema>;
/**
 * Pagination cursors
 */
type TemplatePagingCursors = z.infer<typeof templatePagingCursorsSchema>;

/**
 * Templates resource for managing WhatsApp message templates
 *
 * @example Positional parameters (default)
 * ```typescript
 * await client.templates.create({
 *   name: "order_confirmation",
 *   category: "UTILITY",
 *   language: "en_US",
 *   components: [
 *     {
 *       type: "BODY",
 *       text: "Hi {{1}}! Your order {{2}} is confirmed.",
 *       example: { body_text: [["Pablo", "860198-230332"]] }
 *     }
 *   ]
 * });
 * ```
 *
 * @example Named parameters
 * ```typescript
 * await client.templates.create({
 *   name: "order_confirmation",
 *   category: "UTILITY",
 *   language: "en_US",
 *   parameter_format: "named",
 *   components: [
 *     {
 *       type: "BODY",
 *       text: "Hi {{first_name}}! Your order {{order_number}} is confirmed.",
 *       example: {
 *         body_text_named_params: [
 *           { param_name: "first_name", example: "Pablo" },
 *           { param_name: "order_number", example: "860198-230332" }
 *         ]
 *       }
 *     }
 *   ]
 * });
 * ```
 */
declare class TemplatesResource {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get the business account ID (with validation)
     */
    private getBusinessAccountId;
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
    create(input: TemplateCreate, businessAccountId?: string): Promise<TemplateCreateResponse>;
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
    list(options?: TemplateList, businessAccountId?: string): Promise<TemplateListResponse>;
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
    get(templateId: string): Promise<Template>;
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
    update(templateId: string, input: TemplateUpdate): Promise<TemplateUpdateResponse>;
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
    delete(input: TemplateDelete, businessAccountId?: string): Promise<TemplateDeleteResponse>;
}

/**
 * Status update schema for webhook payloads
 * Represents the status of a sent message (sent, delivered, read, failed, played)
 */
declare const statusSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodEnum<{
        sent: "sent";
        delivered: "delivered";
        read: "read";
        failed: "failed";
        played: "played";
    }>;
    timestamp: z.ZodString;
    recipient_id: z.ZodString;
    recipient_type: z.ZodOptional<z.ZodLiteral<"group">>;
    recipient_participant_id: z.ZodOptional<z.ZodString>;
    recipient_identity_key_hash: z.ZodOptional<z.ZodString>;
    biz_opaque_callback_data: z.ZodOptional<z.ZodString>;
    conversation: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        expiration_timestamp: z.ZodOptional<z.ZodString>;
        origin: z.ZodObject<{
            type: z.ZodEnum<{
                authentication: "authentication";
                authentication_international: "authentication_international";
                marketing: "marketing";
                marketing_lite: "marketing_lite";
                referral_conversion: "referral_conversion";
                service: "service";
                utility: "utility";
            }>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    pricing: z.ZodOptional<z.ZodObject<{
        billable: z.ZodBoolean;
        pricing_model: z.ZodEnum<{
            CBP: "CBP";
            PMP: "PMP";
        }>;
        type: z.ZodEnum<{
            regular: "regular";
            free_customer_service: "free_customer_service";
            free_entry_point: "free_entry_point";
        }>;
        category: z.ZodEnum<{
            authentication: "authentication";
            marketing: "marketing";
            marketing_lite: "marketing_lite";
            referral_conversion: "referral_conversion";
            service: "service";
            utility: "utility";
            "authentication-international": "authentication-international";
        }>;
    }, z.core.$strip>>;
    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
        code: z.ZodNumber;
        title: z.ZodString;
        message: z.ZodString;
        error_data: z.ZodObject<{
            details: z.ZodString;
        }, z.core.$strip>;
        href: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
/**
 * Full webhook payload schema
 */
declare const webhookPayloadSchema: z.ZodObject<{
    object: z.ZodLiteral<"whatsapp_business_account">;
    entry: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        changes: z.ZodArray<z.ZodObject<{
            value: z.ZodObject<{
                messaging_product: z.ZodLiteral<"whatsapp">;
                metadata: z.ZodObject<{
                    display_phone_number: z.ZodString;
                    phone_number_id: z.ZodString;
                }, z.core.$strip>;
                contacts: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    profile: z.ZodObject<{
                        name: z.ZodString;
                    }, z.core.$strip>;
                    wa_id: z.ZodString;
                }, z.core.$strip>>>;
                messages: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                    from: z.ZodString;
                    id: z.ZodString;
                    timestamp: z.ZodString;
                    type: z.ZodLiteral<"text">;
                    text: z.ZodObject<{
                        body: z.ZodString;
                    }, z.core.$strip>;
                }, z.core.$strip>, z.ZodObject<{
                    from: z.ZodString;
                    id: z.ZodString;
                    timestamp: z.ZodString;
                    type: z.ZodLiteral<"audio">;
                    audio: z.ZodObject<{
                        id: z.ZodString;
                        mime_type: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                }, z.core.$strip>, z.ZodObject<{
                    from: z.ZodString;
                    id: z.ZodString;
                    timestamp: z.ZodString;
                    type: z.ZodLiteral<"image">;
                    image: z.ZodObject<{
                        id: z.ZodString;
                        mime_type: z.ZodOptional<z.ZodString>;
                        caption: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                }, z.core.$strip>], "type">>>;
                statuses: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    status: z.ZodEnum<{
                        sent: "sent";
                        delivered: "delivered";
                        read: "read";
                        failed: "failed";
                        played: "played";
                    }>;
                    timestamp: z.ZodString;
                    recipient_id: z.ZodString;
                    recipient_type: z.ZodOptional<z.ZodLiteral<"group">>;
                    recipient_participant_id: z.ZodOptional<z.ZodString>;
                    recipient_identity_key_hash: z.ZodOptional<z.ZodString>;
                    biz_opaque_callback_data: z.ZodOptional<z.ZodString>;
                    conversation: z.ZodOptional<z.ZodObject<{
                        id: z.ZodString;
                        expiration_timestamp: z.ZodOptional<z.ZodString>;
                        origin: z.ZodObject<{
                            type: z.ZodEnum<{
                                authentication: "authentication";
                                authentication_international: "authentication_international";
                                marketing: "marketing";
                                marketing_lite: "marketing_lite";
                                referral_conversion: "referral_conversion";
                                service: "service";
                                utility: "utility";
                            }>;
                        }, z.core.$strip>;
                    }, z.core.$strip>>;
                    pricing: z.ZodOptional<z.ZodObject<{
                        billable: z.ZodBoolean;
                        pricing_model: z.ZodEnum<{
                            CBP: "CBP";
                            PMP: "PMP";
                        }>;
                        type: z.ZodEnum<{
                            regular: "regular";
                            free_customer_service: "free_customer_service";
                            free_entry_point: "free_entry_point";
                        }>;
                        category: z.ZodEnum<{
                            authentication: "authentication";
                            marketing: "marketing";
                            marketing_lite: "marketing_lite";
                            referral_conversion: "referral_conversion";
                            service: "service";
                            utility: "utility";
                            "authentication-international": "authentication-international";
                        }>;
                    }, z.core.$strip>>;
                    errors: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        code: z.ZodNumber;
                        title: z.ZodString;
                        message: z.ZodString;
                        error_data: z.ZodObject<{
                            details: z.ZodString;
                        }, z.core.$strip>;
                        href: z.ZodString;
                    }, z.core.$strip>>>;
                }, z.core.$strip>>>;
            }, z.core.$strip>;
            field: z.ZodLiteral<"messages">;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;

/**
 * Type for webhook payload
 */
type WebhookPayload = z.infer<typeof webhookPayloadSchema>;
/**
 * Type for status update in webhook payload
 */
type Status = z.infer<typeof statusSchema>;

/**
 * Incoming text message schema
 * Uses discriminated union pattern (type: "text")
 */
declare const incomingTextMessageSchema: z.ZodObject<{
    from: z.ZodString;
    id: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodObject<{
        body: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Incoming audio message schema
 * Uses discriminated union pattern (type: "audio")
 */
declare const incomingAudioMessageSchema: z.ZodObject<{
    from: z.ZodString;
    id: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"audio">;
    audio: z.ZodObject<{
        id: z.ZodString;
        mime_type: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Incoming image message schema
 * Uses discriminated union pattern (type: "image")
 */
declare const incomingImageMessageSchema: z.ZodObject<{
    from: z.ZodString;
    id: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"image">;
    image: z.ZodObject<{
        id: z.ZodString;
        mime_type: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Union of all incoming message types
 */
declare const incomingMessageSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    from: z.ZodString;
    id: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodObject<{
        body: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    from: z.ZodString;
    id: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"audio">;
    audio: z.ZodObject<{
        id: z.ZodString;
        mime_type: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    from: z.ZodString;
    id: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"image">;
    image: z.ZodObject<{
        id: z.ZodString;
        mime_type: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>], "type">;

/**
 * Type for incoming text message
 */
type IncomingTextMessage = z.infer<typeof incomingTextMessageSchema>;
/**
 * Type for incoming audio message
 */
type IncomingAudioMessage = z.infer<typeof incomingAudioMessageSchema>;
/**
 * Type for incoming image message
 */
type IncomingImageMessage = z.infer<typeof incomingImageMessageSchema>;
/**
 * Union type for all incoming message types
 */
type IncomingMessage = z.infer<typeof incomingMessageSchema>;

/**
 * WhatsApp webhook context - data from Meta's webhook payload
 * This is the "domain" of WhatsApp, not your application
 */
type WebhookContext = {
    metadata: {
        phoneNumberId: string;
        displayPhoneNumber: string;
        wabaId: string;
    };
    contact?: {
        name: string;
        waId: string;
    };
};
/**
 * @deprecated Use `WebhookContext` instead. This alias is kept for backward compatibility.
 */
type MessageContext = WebhookContext;
/**
 * Handler functions for different message types
 *
 * The `beforeHandler` return type is automatically inferred and passed
 * as the third argument to message handlers for full type safety.
 *
 * @example
 * ```typescript
 * client.webhooks.handle(req.body, {
 *   beforeHandler: async (message, webhook) => {
 *     return { customerIds: ["123", "456"] };
 *   },
 *   text: async (message, webhook, before) => {
 *     // before is TBefore | undefined
 *     // - undefined = beforeHandler not set or failed
 *     // - object = beforeHandler succeeded (even if empty {})
 *     if (before) {
 *       // before.customerIds is typed as string[] ✅
 *       console.log(before.customerIds);
 *     }
 *   },
 * });
 * ```
 */
type MessageHandlers<TBefore = Record<string, never>> = {
    /**
     * Resolves webhook data to application entities
     * ALWAYS runs first if defined, before any message handler.
     * The return type is automatically inferred and passed to message handlers.
     */
    beforeHandler?: (message: IncomingMessage, webhook: WebhookContext) => Promise<TBefore> | TBefore;
    text?: (message: IncomingTextMessage, webhook: WebhookContext, before: TBefore | undefined) => Promise<void> | void;
    audio?: (message: IncomingAudioMessage, webhook: WebhookContext, before: TBefore | undefined) => Promise<void> | void;
    image?: (message: IncomingImageMessage, webhook: WebhookContext, before: TBefore | undefined) => Promise<void> | void;
};
/**
 * Options for handle() method
 */
type HandleOptions = {
    /**
     * Error handler called when a message handler throws an error
     * If not provided, errors are logged and processing continues
     */
    onError?: (error: Error, message: IncomingMessage) => void;
};
/**
 * Webhooks service for handling incoming webhook payloads
 *
 * Provides utilities for extracting messages and a convenience handler
 * for type-safe message processing.
 */
declare class WebhooksService {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
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
    verify(query: {
        "hub.mode"?: string;
        "hub.verify_token"?: string;
        "hub.challenge"?: string;
    }, verifyToken: string): string | null;
    /**
     * Extract all incoming messages from webhook payload
     *
     * Low-level utility that flattens the nested webhook structure
     * and returns messages directly.
     *
     * @param payload - Webhook payload from Meta
     * @returns Flat array of incoming messages
     */
    extractMessages(payload: WebhookPayload): IncomingMessage[];
    /**
     * Extract status updates from webhook payload
     *
     * Low-level utility for extracting status updates for outgoing messages.
     *
     * @param payload - Webhook payload from Meta
     * @returns Flat array of status updates
     */
    extractStatuses(payload: WebhookPayload): Status[];
    /**
     * Validate webhook payload structure
     *
     * Validates the payload against the schema. Logs errors if malformed
     * but doesn't throw, allowing processing to continue.
     *
     * @param payload - Raw payload to validate
     * @returns Validated payload if valid, original payload if invalid (with logged error)
     */
    private validatePayload;
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
    handle<THandlers extends MessageHandlers<any>>(payload: unknown, handlers: THandlers, options?: HandleOptions): void;
}

/**
 * Media service for downloading WhatsApp media files
 *
 * This service handles downloading media files from WhatsApp servers.
 */
declare class MediaService {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
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
    download(mediaId: string): Promise<ArrayBuffer>;
}

/**
 * Schema for debug token response
 * Matches Graph API debug_token endpoint response structure
 */
declare const debugTokenResponseSchema: z.ZodObject<{
    data: z.ZodObject<{
        app_id: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        application: z.ZodOptional<z.ZodString>;
        data_access_expires_at: z.ZodOptional<z.ZodNumber>;
        expires_at: z.ZodOptional<z.ZodNumber>;
        is_valid: z.ZodOptional<z.ZodBoolean>;
        issued_at: z.ZodOptional<z.ZodNumber>;
        metadata: z.ZodOptional<z.ZodObject<{
            auth_type: z.ZodOptional<z.ZodString>;
            sso: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        scopes: z.ZodOptional<z.ZodArray<z.ZodString>>;
        user_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;

/**
 * Type for debug token response
 */
type DebugTokenResponse = z.infer<typeof debugTokenResponseSchema>;

/**
 * WhatsApp Cloud API client
 */
declare class WhatsAppClient {
    readonly messages: MessagesService;
    readonly accounts: AccountsService;
    readonly business: BusinessService;
    readonly templates: TemplatesResource;
    readonly webhooks: WebhooksService;
    readonly media: MediaService;
    private readonly httpClient;
    constructor(config: ClientConfig);
    /**
     * Debug the current access token
     *
     * This method calls the Graph API debug_token endpoint to inspect the access token
     * used by this client. Useful for understanding token permissions, expiration, and validity.
     *
     * @returns Debug information about the access token
     */
    debugToken(): Promise<DebugTokenResponse>;
}

/**
 * Media metadata response (from GET /MEDIA_ID)
 */
type MediaMetadata = {
    messaging_product: "whatsapp";
    url: string;
    mime_type: string;
    sha256: string;
    file_size: string;
    id: string;
};

/**
 * Base error class for WhatsApp API errors
 */
declare class WhatsAppError extends Error {
    constructor(message: string);
}
/**
 * Error thrown when validation fails (configuration, requests, etc.)
 * Can be used for any Zod validation error
 */
declare class WhatsAppValidationError extends WhatsAppError {
    readonly field?: string | undefined;
    readonly issues?: Array<{
        path: readonly (string | number)[];
        message: string;
    }> | undefined;
    constructor(message: string, field?: string | undefined, issues?: Array<{
        path: readonly (string | number)[];
        message: string;
    }> | undefined);
}
/**
 * Error thrown when an API request fails
 */
declare class WhatsAppAPIError extends WhatsAppError {
    readonly code: number;
    readonly type: string;
    readonly statusCode?: number | undefined;
    readonly details?: unknown | undefined;
    constructor(code: number, type: string, message: string, statusCode?: number | undefined, details?: unknown | undefined);
}
/**
 * Error thrown when rate limit is exceeded
 */
declare class WhatsAppRateLimitError extends WhatsAppAPIError {
    readonly retryAfter?: number | undefined;
    constructor(message: string, retryAfter?: number | undefined);
}

/**
 * Template utilities
 */
/**
 * Converts an arbitrary string to a valid WhatsApp template name.
 *
 * WhatsApp template names must:
 * - Contain only lowercase letters, numbers, and underscores
 * - Be between 1 and 512 characters
 *
 * @example
 * ```typescript
 * import { toTemplateName } from 'whatsapp-cloud';
 *
 * toTemplateName("Order Confirmation");  // "order_confirmation"
 * toTemplateName("Welcome! New User");   // "welcome_new_user"
 * toTemplateName("2FA Code");            // "2fa_code"
 * ```
 */
declare function toTemplateName(input: string): string;

export { type BusinessAccountsListResponse, type ClientConfig, type DebugTokenResponse, type HandleOptions, type IncomingAudioMessage, type IncomingImageMessage, type IncomingMessage, type IncomingTextMessage, type MediaMetadata, type MessageContext, type MessageHandlers, type MessageResponse, type OutgoingImageMessage, type OutgoingLocationMessage, type OutgoingMessage, type OutgoingReactionMessage, type OutgoingTextMessage, type PhoneNumberListResponse, type SendImageInput, type SendLocationInput, type SendReactionInput, type SendTextInput, type Status, type Template, type TemplateBodyComponentInput, type TemplateBodyExample, type TemplateButton, type TemplateButtonInput, type TemplateButtonsComponentInput, type TemplateCategory, type TemplateComponent, type TemplateComponentInput, type TemplateCopyCodeButtonInput, type TemplateCreate, type TemplateCreateResponse, type TemplateDelete, type TemplateDeleteResponse, type TemplateFlowButtonInput, type TemplateFooterComponentInput, type TemplateHeaderComponentInput, type TemplateHeaderLocationInput, type TemplateHeaderMediaInput, type TemplateHeaderTextExample, type TemplateHeaderTextInput, type TemplateLanguage, type TemplateList, type TemplateListResponse, type TemplateNamedParamExample, type TemplatePaging, type TemplatePagingCursors, type TemplateParameterFormat, type TemplatePhoneNumberButtonInput, type TemplateQualityScore, type TemplateQuickReplyButtonInput, type TemplateStatus, type TemplateUpdate, type TemplateUpdateResponse, type TemplateUrlButtonInput, TemplatesResource, type WebhookContext, type WebhookPayload, WhatsAppAPIError, WhatsAppClient, WhatsAppError, WhatsAppRateLimitError, WhatsAppValidationError, businessAccountResponseSchema, businessAccountsListResponseSchema, clientConfigSchema, debugTokenResponseSchema, incomingAudioMessageSchema, incomingImageMessageSchema, incomingMessageSchema, incomingTextMessageSchema, messageResponseSchema, outgoingImageMessageSchema, outgoingLocationMessageSchema, outgoingMessageSchema, outgoingReactionMessageSchema, outgoingTextMessageSchema, phoneNumberListResponseSchema, phoneNumberResponseSchema, sendImageInputSchema, sendLocationInputSchema, sendReactionInputSchema, sendTextInputSchema, statusSchema, templateBodyComponentInputSchema, templateBodyExampleSchema, templateButtonInputSchema, templateButtonSchema, templateButtonsComponentInputSchema, templateCategorySchema, templateComponentInputSchema, templateComponentSchema, templateCopyCodeButtonInputSchema, templateCreateAuthenticationSchema, templateCreateMarketingSchema, templateCreateResponseSchema, templateCreateSchema, templateCreateUtilitySchema, templateDeleteResponseSchema, templateDeleteSchema, templateFlowButtonInputSchema, templateFooterComponentInputSchema, templateHeaderComponentInputSchema, templateHeaderLocationInputSchema, templateHeaderMediaInputSchema, templateHeaderTextExampleSchema, templateHeaderTextInputSchema, templateLanguageSchema, templateListResponseSchema, templateListSchema, templateNamedParamExampleSchema, templatePagingCursorsSchema, templatePagingSchema, templateParameterFormatSchema, templatePhoneNumberButtonInputSchema, templateQualityScoreSchema, templateQuickReplyButtonInputSchema, templateSchema, templateStatusSchema, templateUpdateResponseSchema, templateUpdateSchema, templateUrlButtonInputSchema, toTemplateName, webhookPayloadSchema };
