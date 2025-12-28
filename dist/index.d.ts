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
 * Schema for sending an image message
 * Matches the structure expected by WhatsApp API (minus messaging_product, recipient_type, type, and phoneNumberId)
 */
declare const sendImageRequestSchema: z.ZodObject<{
    to: z.ZodString;
    image: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema for sending a text message
 * Matches the structure expected by WhatsApp API (minus messaging_product, recipient_type, type, and phoneNumberId)
 */
declare const sendTextRequestSchema: z.ZodObject<{
    to: z.ZodString;
    text: z.ZodObject<{
        body: z.ZodString;
        preview_url: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema for sending a location message
 * Matches the structure expected by WhatsApp API (minus messaging_product, recipient_type, type, and phoneNumberId)
 */
declare const sendLocationRequestSchema: z.ZodObject<{
    to: z.ZodString;
    location: z.ZodObject<{
        longitude: z.ZodNumber;
        latitude: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Schema for sending a reaction message
 * Matches the structure expected by WhatsApp API (minus messaging_product, recipient_type, type, and phoneNumberId)
 */
declare const sendReactionRequestSchema: z.ZodObject<{
    to: z.ZodString;
    reaction: z.ZodObject<{
        message_id: z.ZodString;
        emoji: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;

/**
 * Type for sending a text message
 */
type SendTextRequest = z.infer<typeof sendTextRequestSchema>;
/**
 * Type for sending an image message
 */
type SendImageRequest = z.infer<typeof sendImageRequestSchema>;
/**
 * Type for sending a location message
 */
type SendLocationRequest = z.infer<typeof sendLocationRequestSchema>;
/**
 * Type for sending a reaction message
 */
type SendReactionRequest = z.infer<typeof sendReactionRequestSchema>;

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
     * @param request - Text message request (to, text)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendText(request: SendTextRequest, phoneNumberId?: string): Promise<MessageResponse>;
    /**
     * Send an image message
     *
     * @param request - Image message request (to, image)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendImage(request: SendImageRequest, phoneNumberId?: string): Promise<MessageResponse>;
    /**
     * Send a location message
     *
     * @param request - Location message request (to, location)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendLocation(request: SendLocationRequest, phoneNumberId?: string): Promise<MessageResponse>;
    /**
     * Send a reaction message
     *
     * @param request - Reaction message request (to, reaction)
     * @param phoneNumberId - Optional phone number ID (overrides client config)
     */
    sendReaction(request: SendReactionRequest, phoneNumberId?: string): Promise<MessageResponse>;
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
 * Schema for creating a template
 * Simplified - no variables/examples for now
 */
declare const templateCreateSchema: z.ZodObject<{
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
    category: z.ZodEnum<{
        AUTHENTICATION: "AUTHENTICATION";
        MARKETING: "MARKETING";
        UTILITY: "UTILITY";
    }>;
    components: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            TEXT: "TEXT";
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
            LOCATION: "LOCATION";
        }>;
        text: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
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
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_action: z.ZodOptional<z.ZodString>;
            flow_id: z.ZodOptional<z.ZodString>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>;
/**
 * Schema for updating a template
 * All fields optional - only update what's provided
 */
declare const templateUpdateSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodEnum<{
        AUTHENTICATION: "AUTHENTICATION";
        MARKETING: "MARKETING";
        UTILITY: "UTILITY";
    }>>;
    components: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            TEXT: "TEXT";
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
            LOCATION: "LOCATION";
        }>;
        text: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
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
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_action: z.ZodOptional<z.ZodString>;
            flow_id: z.ZodOptional<z.ZodString>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>], "type">>>;
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
/**
 * Schema for listing templates
 */
declare const templateListSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schema for deleting a template
 * Either name or hsm_id must be provided
 */
declare const templateDeleteSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    hsm_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

/**
 * Type for creating a template
 */
type TemplateCreate = z.infer<typeof templateCreateSchema>;
/**
 * Type for updating a template
 */
type TemplateUpdate = z.infer<typeof templateUpdateSchema>;
/**
 * Type for listing templates
 */
type TemplateList = z.infer<typeof templateListSchema>;
/**
 * Type for deleting a template
 */
type TemplateDelete = z.infer<typeof templateDeleteSchema>;

/**
 * Schema for template (the base/select model - what you get from API)
 */
declare const templateSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    language: z.ZodString;
    status: z.ZodString;
    category: z.ZodString;
    components: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"HEADER">;
        format: z.ZodEnum<{
            TEXT: "TEXT";
            IMAGE: "IMAGE";
            VIDEO: "VIDEO";
            DOCUMENT: "DOCUMENT";
            LOCATION: "LOCATION";
        }>;
        text: z.ZodOptional<z.ZodString>;
        example: z.ZodOptional<z.ZodObject<{
            header_handle: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"BODY">;
        text: z.ZodString;
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
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"PHONE_NUMBER">;
            text: z.ZodString;
            phone_number: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"COPY_CODE">;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"FLOW">;
            text: z.ZodString;
            flow_action: z.ZodOptional<z.ZodString>;
            flow_id: z.ZodOptional<z.ZodString>;
            navigate_screen: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>;
/**
 * Schema for create template response
 */
declare const templateCreateResponseSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodString;
    category: z.ZodString;
}, z.core.$strip>;
/**
 * Schema for list templates response
 */
declare const templateListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        language: z.ZodString;
        status: z.ZodString;
        category: z.ZodString;
        components: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"HEADER">;
            format: z.ZodEnum<{
                TEXT: "TEXT";
                IMAGE: "IMAGE";
                VIDEO: "VIDEO";
                DOCUMENT: "DOCUMENT";
                LOCATION: "LOCATION";
            }>;
            text: z.ZodOptional<z.ZodString>;
            example: z.ZodOptional<z.ZodObject<{
                header_handle: z.ZodArray<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"BODY">;
            text: z.ZodString;
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
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"PHONE_NUMBER">;
                text: z.ZodString;
                phone_number: z.ZodString;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"COPY_CODE">;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"FLOW">;
                text: z.ZodString;
                flow_action: z.ZodOptional<z.ZodString>;
                flow_id: z.ZodOptional<z.ZodString>;
                navigate_screen: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>], "type">>;
        }, z.core.$strip>], "type">>;
    }, z.core.$strip>>;
    paging: z.ZodOptional<z.ZodObject<{
        cursors: z.ZodOptional<z.ZodObject<{
            before: z.ZodOptional<z.ZodString>;
            after: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schema for update template response
 */
declare const templateUpdateResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;
/**
 * Schema for delete template response
 */
declare const templateDeleteResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;

/**
 * Type for a template (the base/select model - what you get from API)
 */
type Template = z.infer<typeof templateSchema>;
/**
 * Type for create template response
 */
type TemplateCreateResponse = z.infer<typeof templateCreateResponseSchema>;
/**
 * Type for list templates response
 */
type TemplateListResponse = z.infer<typeof templateListResponseSchema>;
/**
 * Type for update template response
 */
type TemplateUpdateResponse = z.infer<typeof templateUpdateResponseSchema>;
/**
 * Type for delete template response
 */
type TemplateDeleteResponse = z.infer<typeof templateDeleteResponseSchema>;

/**
 * Templates service for managing message templates
 *
 * This service handles template operations like creating, listing, and deleting templates.
 * It supports both a globally configured businessAccountId (in WhatsAppClient)
 * and per-request businessAccountId overrides.
 *
 * Note: Get and Update operations use template ID directly (no WABA prefix needed).
 */
declare class TemplatesService {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Helper to create a Scoped Client (prefer override, fallback to config)
     */
    private getClient;
    /**
     * Create a message template
     *
     * @param request - Template creation request
     * @param businessAccountId - Optional WABA ID (overrides client config)
     */
    create(request: TemplateCreate, businessAccountId?: string): Promise<TemplateCreateResponse>;
    /**
     * List message templates
     *
     * @param options - Optional filter options (name)
     * @param businessAccountId - Optional WABA ID (overrides client config)
     */
    list(options?: TemplateList, businessAccountId?: string): Promise<TemplateListResponse>;
    /**
     * Get a template by ID
     *
     * Note: This uses the template ID directly (no WABA prefix needed)
     *
     * @param templateId - Template ID
     */
    get(templateId: string): Promise<Template>;
    /**
     * Update a template
     *
     * Note: This uses the template ID directly (no WABA prefix needed)
     *
     * @param templateId - Template ID
     * @param request - Template update request
     */
    update(templateId: string, request: TemplateUpdate): Promise<TemplateUpdateResponse>;
    /**
     * Delete a template
     *
     * @param options - Delete options (name or hsm_id)
     * @param businessAccountId - Optional WABA ID (overrides client config)
     */
    delete(options: TemplateDelete, businessAccountId?: string): Promise<TemplateDeleteResponse>;
}

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
                statuses: z.ZodOptional<z.ZodArray<z.ZodAny>>;
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
 * Context provided to message handlers
 * Contains metadata and contact info (message is passed separately)
 */
type MessageContext = {
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
 * Handler functions for different message types
 * Receives message and context separately - message is the focus, context is optional metadata
 */
type MessageHandlers = {
    text?: (message: IncomingTextMessage, context: MessageContext) => Promise<void> | void;
    audio?: (message: IncomingAudioMessage, context: MessageContext) => Promise<void> | void;
    image?: (message: IncomingImageMessage, context: MessageContext) => Promise<void> | void;
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
    extractStatuses(payload: WebhookPayload): unknown[];
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
    downloadMedia(mediaId: string): Promise<ArrayBuffer>;
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
     * @param payload - Webhook payload from Meta (will be validated)
     * @param handlers - Object with handler functions for each message type
     * @param options - Optional error handling configuration
     */
    handle(payload: unknown, handlers: MessageHandlers, options?: HandleOptions): void;
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
    readonly templates: TemplatesService;
    readonly webhooks: WebhooksService;
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
 * Button schemas for template components
 * Simplified version without variables for now
 */
/**
 * Quick reply button schema
 */
declare const templateQuickReplyButtonSchema: z.ZodObject<{
    type: z.ZodLiteral<"QUICK_REPLY">;
    text: z.ZodString;
}, z.core.$strip>;
/**
 * URL button schema
 * Note: example field will be added later when we support variables
 */
declare const templateUrlButtonSchema: z.ZodObject<{
    type: z.ZodLiteral<"URL">;
    text: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>;
/**
 * Phone number button schema
 */
declare const templatePhoneNumberButtonSchema: z.ZodObject<{
    type: z.ZodLiteral<"PHONE_NUMBER">;
    text: z.ZodString;
    phone_number: z.ZodString;
}, z.core.$strip>;
/**
 * Copy code button schema
 * Note: example field will be added later
 */
declare const templateCopyCodeButtonSchema: z.ZodObject<{
    type: z.ZodLiteral<"COPY_CODE">;
}, z.core.$strip>;
/**
 * Flow button schema (for authentication templates)
 * Note: Will be expanded later when we support flow templates
 */
declare const templateFlowButtonSchema: z.ZodObject<{
    type: z.ZodLiteral<"FLOW">;
    text: z.ZodString;
    flow_action: z.ZodOptional<z.ZodString>;
    flow_id: z.ZodOptional<z.ZodString>;
    navigate_screen: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Union of all button types
 */
declare const templateButtonSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"QUICK_REPLY">;
    text: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"URL">;
    text: z.ZodString;
    url: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"PHONE_NUMBER">;
    text: z.ZodString;
    phone_number: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"COPY_CODE">;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"FLOW">;
    text: z.ZodString;
    flow_action: z.ZodOptional<z.ZodString>;
    flow_id: z.ZodOptional<z.ZodString>;
    navigate_screen: z.ZodOptional<z.ZodString>;
}, z.core.$strip>], "type">;
/**
 * Header component schema
 *
 * Note:
 * - TEXT format requires text field
 * - IMAGE/VIDEO/DOCUMENT formats require example.header_handle (asset handle from Resumable Upload API)
 * - LOCATION format requires neither text nor example
 */
declare const templateHeaderComponentSchema: z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodEnum<{
        TEXT: "TEXT";
        IMAGE: "IMAGE";
        VIDEO: "VIDEO";
        DOCUMENT: "DOCUMENT";
        LOCATION: "LOCATION";
    }>;
    text: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodObject<{
        header_handle: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Body component schema
 * Required component - no variables for now
 */
declare const templateBodyComponentSchema: z.ZodObject<{
    type: z.ZodLiteral<"BODY">;
    text: z.ZodString;
}, z.core.$strip>;
/**
 * Footer component schema
 */
declare const templateFooterComponentSchema: z.ZodObject<{
    type: z.ZodLiteral<"FOOTER">;
    text: z.ZodString;
}, z.core.$strip>;
/**
 * Buttons component schema
 */
declare const templateButtonsComponentSchema: z.ZodObject<{
    type: z.ZodLiteral<"BUTTONS">;
    buttons: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        type: z.ZodLiteral<"QUICK_REPLY">;
        text: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"URL">;
        text: z.ZodString;
        url: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"PHONE_NUMBER">;
        text: z.ZodString;
        phone_number: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"COPY_CODE">;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FLOW">;
        text: z.ZodString;
        flow_action: z.ZodOptional<z.ZodString>;
        flow_id: z.ZodOptional<z.ZodString>;
        navigate_screen: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>;
/**
 * Union of all component types
 */
declare const templateComponentSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"HEADER">;
    format: z.ZodEnum<{
        TEXT: "TEXT";
        IMAGE: "IMAGE";
        VIDEO: "VIDEO";
        DOCUMENT: "DOCUMENT";
        LOCATION: "LOCATION";
    }>;
    text: z.ZodOptional<z.ZodString>;
    example: z.ZodOptional<z.ZodObject<{
        header_handle: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"BODY">;
    text: z.ZodString;
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
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"PHONE_NUMBER">;
        text: z.ZodString;
        phone_number: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"COPY_CODE">;
    }, z.core.$strip>, z.ZodObject<{
        type: z.ZodLiteral<"FLOW">;
        text: z.ZodString;
        flow_action: z.ZodOptional<z.ZodString>;
        flow_id: z.ZodOptional<z.ZodString>;
        navigate_screen: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>], "type">>;
}, z.core.$strip>], "type">;

/**
 * Supported WhatsApp template languages
 * Based on WhatsApp Cloud API supported language codes
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

/**
 * Button types
 */
type TemplateQuickReplyButton = z.infer<typeof templateQuickReplyButtonSchema>;
type TemplateUrlButton = z.infer<typeof templateUrlButtonSchema>;
type TemplatePhoneNumberButton = z.infer<typeof templatePhoneNumberButtonSchema>;
type TemplateCopyCodeButton = z.infer<typeof templateCopyCodeButtonSchema>;
type TemplateFlowButton = z.infer<typeof templateFlowButtonSchema>;
type TemplateButton = z.infer<typeof templateButtonSchema>;
/**
 * Component types
 */
type TemplateHeaderComponent = z.infer<typeof templateHeaderComponentSchema>;
type TemplateBodyComponent = z.infer<typeof templateBodyComponentSchema>;
type TemplateFooterComponent = z.infer<typeof templateFooterComponentSchema>;
type TemplateButtonsComponent = z.infer<typeof templateButtonsComponentSchema>;
type TemplateComponent = z.infer<typeof templateComponentSchema>;

/**
 * Type for WhatsApp template language codes
 */
type TemplateLanguage = z.infer<typeof templateLanguageSchema>;

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

export { type BusinessAccountsListResponse, type ClientConfig, type DebugTokenResponse, type HandleOptions, type IncomingAudioMessage, type IncomingImageMessage, type IncomingMessage, type IncomingTextMessage, type MessageContext, type MessageHandlers, type MessageResponse, type PhoneNumberListResponse, type SendImageRequest, type SendLocationRequest, type SendReactionRequest, type SendTextRequest, type Template, type TemplateBodyComponent, type TemplateButton, type TemplateButtonsComponent, type TemplateComponent, type TemplateCopyCodeButton, type TemplateCreate, type TemplateCreateResponse, type TemplateDelete, type TemplateDeleteResponse, type TemplateFlowButton, type TemplateFooterComponent, type TemplateHeaderComponent, type TemplateLanguage, type TemplateList, type TemplateListResponse, type TemplatePhoneNumberButton, type TemplateQuickReplyButton, type TemplateUpdate, type TemplateUpdateResponse, type TemplateUrlButton, type WebhookPayload, WhatsAppAPIError, WhatsAppClient, WhatsAppError, WhatsAppRateLimitError, WhatsAppValidationError, businessAccountResponseSchema, businessAccountsListResponseSchema, clientConfigSchema, debugTokenResponseSchema, incomingAudioMessageSchema, incomingImageMessageSchema, incomingMessageSchema, incomingTextMessageSchema, messageResponseSchema, phoneNumberListResponseSchema, phoneNumberResponseSchema, sendImageRequestSchema, sendLocationRequestSchema, sendReactionRequestSchema, sendTextRequestSchema, templateBodyComponentSchema, templateButtonSchema, templateButtonsComponentSchema, templateComponentSchema, templateCopyCodeButtonSchema, templateCreateResponseSchema, templateCreateSchema, templateDeleteResponseSchema, templateDeleteSchema, templateFlowButtonSchema, templateFooterComponentSchema, templateHeaderComponentSchema, templateLanguageSchema, templateListResponseSchema, templateListSchema, templatePhoneNumberButtonSchema, templateQuickReplyButtonSchema, templateSchema, templateUpdateResponseSchema, templateUpdateSchema, templateUrlButtonSchema, webhookPayloadSchema };
