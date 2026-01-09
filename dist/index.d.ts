import { z } from 'zod';
import * as node_buffer from 'node:buffer';

declare const clientConfigSchema: z.ZodObject<{
    accessToken: z.ZodString;
    phoneNumberId: z.ZodOptional<z.ZodString>;
    businessAccountId: z.ZodOptional<z.ZodString>;
    businessId: z.ZodOptional<z.ZodString>;
    apiVersion: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    baseURL: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    timeout: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
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
        granular_scopes: z.ZodOptional<z.ZodArray<z.ZodObject<{
            scope: z.ZodOptional<z.ZodString>;
            target_ids: z.ZodOptional<z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>>;
        user_id: z.ZodOptional<z.ZodString>;
        profile_id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;

type ClientConfig = z.infer<typeof clientConfigSchema>;
type DebugTokenResponse = z.infer<typeof debugTokenResponseSchema>;

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
     * Handle error responses - preserves FULL API error for debugging
     */
    private handleError;
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

declare const businessSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    timezone_id: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
declare const businessGetOptionsSchema: z.ZodObject<{
    fields: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

type Business = z.infer<typeof businessSchema>;
type BusinessGetOptions = z.infer<typeof businessGetOptionsSchema>;

/**
 * Business Portfolio resource
 *
 * Retrieves information about a Meta Business Portfolio.
 *
 * @example
 * ```typescript
 * // Get business portfolio info
 * const business = await client.business.get();
 * console.log(business.name);
 * ```
 */
declare class BusinessResource {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get the business ID (from parameter or config)
     */
    private getBusinessId;
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
    get(options?: BusinessGetOptions, businessId?: string): Promise<Business>;
}

declare const accountReviewStatusSchema: z.ZodEnum<{
    APPROVED: "APPROVED";
    PENDING: "PENDING";
    REJECTED: "REJECTED";
    RESTRICTED: "RESTRICTED";
}>;
declare const businessVerificationStatusSchema: z.ZodEnum<{
    PENDING: "PENDING";
    REJECTED: "REJECTED";
    VERIFIED: "VERIFIED";
    UNVERIFIED: "UNVERIFIED";
}>;
declare const wabaBusinessTypeSchema: z.ZodEnum<{
    ENTERPRISE: "ENTERPRISE";
    SMB: "SMB";
}>;
declare const onBehalfOfBusinessInfoSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const cursorPagingSchema: z.ZodObject<{
    cursors: z.ZodOptional<z.ZodObject<{
        before: z.ZodOptional<z.ZodString>;
        after: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    previous: z.ZodOptional<z.ZodString>;
    next: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const wabaSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    account_review_status: z.ZodOptional<z.ZodEnum<{
        APPROVED: "APPROVED";
        PENDING: "PENDING";
        REJECTED: "REJECTED";
        RESTRICTED: "RESTRICTED";
    }>>;
    purchase_order_number: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodString>;
    timezone_id: z.ZodOptional<z.ZodString>;
    business_verification_status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        REJECTED: "REJECTED";
        VERIFIED: "VERIFIED";
        UNVERIFIED: "UNVERIFIED";
    }>>;
    country: z.ZodOptional<z.ZodString>;
    on_behalf_of_business_info: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    is_enabled_for_insights: z.ZodOptional<z.ZodBoolean>;
    message_template_namespace: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const wabaListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodOptional<z.ZodString>;
        account_review_status: z.ZodOptional<z.ZodEnum<{
            APPROVED: "APPROVED";
            PENDING: "PENDING";
            REJECTED: "REJECTED";
            RESTRICTED: "RESTRICTED";
        }>>;
        purchase_order_number: z.ZodOptional<z.ZodString>;
        currency: z.ZodOptional<z.ZodString>;
        timezone_id: z.ZodOptional<z.ZodString>;
        business_verification_status: z.ZodOptional<z.ZodEnum<{
            PENDING: "PENDING";
            REJECTED: "REJECTED";
            VERIFIED: "VERIFIED";
            UNVERIFIED: "UNVERIFIED";
        }>>;
        country: z.ZodOptional<z.ZodString>;
        on_behalf_of_business_info: z.ZodOptional<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        is_enabled_for_insights: z.ZodOptional<z.ZodBoolean>;
        message_template_namespace: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    paging: z.ZodOptional<z.ZodObject<{
        cursors: z.ZodOptional<z.ZodObject<{
            before: z.ZodOptional<z.ZodString>;
            after: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        previous: z.ZodOptional<z.ZodString>;
        next: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const wabaCreateSchema: z.ZodObject<{
    name: z.ZodString;
    primary_funding_id: z.ZodOptional<z.ZodString>;
    purchase_order_number: z.ZodOptional<z.ZodString>;
    currency: z.ZodOptional<z.ZodString>;
    timezone_id: z.ZodOptional<z.ZodNumber>;
    business_type: z.ZodOptional<z.ZodEnum<{
        ENTERPRISE: "ENTERPRISE";
        SMB: "SMB";
    }>>;
    on_behalf_of_business_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const wabaCreateResponseSchema: z.ZodObject<{
    id: z.ZodString;
    payment_account_id: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const wabaListOptionsSchema: z.ZodObject<{
    fields: z.ZodOptional<z.ZodString>;
    business_type: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        ENTERPRISE: "ENTERPRISE";
        SMB: "SMB";
    }>>>;
    limit: z.ZodOptional<z.ZodNumber>;
    after: z.ZodOptional<z.ZodString>;
    before: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const subscribedAppSchema: z.ZodObject<{
    whatsapp_business_api_data: z.ZodOptional<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const subscribedAppsListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        whatsapp_business_api_data: z.ZodOptional<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            link: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const subscribeAppResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;
declare const unsubscribeAppResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;

type AccountReviewStatus = z.infer<typeof accountReviewStatusSchema>;
type BusinessVerificationStatus = z.infer<typeof businessVerificationStatusSchema>;
type WabaBusinessType = z.infer<typeof wabaBusinessTypeSchema>;
type OnBehalfOfBusinessInfo = z.infer<typeof onBehalfOfBusinessInfoSchema>;
type CursorPaging = z.infer<typeof cursorPagingSchema>;
type Waba = z.infer<typeof wabaSchema>;
type WabaListResponse = z.infer<typeof wabaListResponseSchema>;
type WabaCreate = z.infer<typeof wabaCreateSchema>;
type WabaCreateResponse = z.infer<typeof wabaCreateResponseSchema>;
type WabaListOptions = z.infer<typeof wabaListOptionsSchema>;
type SubscribedApp = z.infer<typeof subscribedAppSchema>;
type SubscribedAppsListResponse = z.infer<typeof subscribedAppsListResponseSchema>;
type SubscribeAppResponse = z.infer<typeof subscribeAppResponseSchema>;
type UnsubscribeAppResponse = z.infer<typeof unsubscribeAppResponseSchema>;

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
declare class WabasResource {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get the business ID (from parameter or config)
     */
    private getBusinessId;
    /**
     * Get the WABA ID (from parameter or config)
     */
    private getWabaId;
    /**
     * Build query string from options
     */
    private buildQueryString;
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
    list(options?: WabaListOptions, businessId?: string): Promise<WabaListResponse>;
    /**
     * List client (shared) WhatsApp Business Accounts
     *
     * These are WABAs that have been shared with the business (agency model).
     *
     * @param options - Query options (fields, pagination, filters)
     * @param businessId - Business Portfolio ID (overrides config)
     * @returns List of client WABAs
     */
    listClient(options?: WabaListOptions, businessId?: string): Promise<WabaListResponse>;
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
    create(data: WabaCreate, businessId?: string): Promise<WabaCreateResponse>;
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
    get(wabaId?: string, fields?: string): Promise<Waba>;
    /**
     * List apps subscribed to this WABA
     *
     * @param wabaId - WABA ID (overrides config.businessAccountId)
     * @returns List of subscribed apps
     */
    listSubscribedApps(wabaId?: string): Promise<SubscribedAppsListResponse>;
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
    subscribeApp(wabaId?: string): Promise<SubscribeAppResponse>;
    /**
     * Unsubscribe an app from this WABA
     *
     * After unsubscribing, your app will no longer receive webhooks for this WABA.
     *
     * @param wabaId - WABA ID (overrides config.businessAccountId)
     * @returns Success status
     */
    unsubscribeApp(wabaId?: string): Promise<UnsubscribeAppResponse>;
}

declare const phoneNumberQualityRatingSchema: z.ZodEnum<{
    GREEN: "GREEN";
    YELLOW: "YELLOW";
    RED: "RED";
    UNKNOWN: "UNKNOWN";
}>;
declare const phoneNumberStatusSchema: z.ZodEnum<{
    PENDING: "PENDING";
    RESTRICTED: "RESTRICTED";
    UNKNOWN: "UNKNOWN";
    DELETED: "DELETED";
    MIGRATED: "MIGRATED";
    BANNED: "BANNED";
    RATE_LIMITED: "RATE_LIMITED";
    FLAGGED: "FLAGGED";
    CONNECTED: "CONNECTED";
    DISCONNECTED: "DISCONNECTED";
}>;
declare const codeMethodSchema: z.ZodEnum<{
    SMS: "SMS";
    VOICE: "VOICE";
}>;
declare const verticalSchema: z.ZodEnum<{
    UNDEFINED: "UNDEFINED";
    OTHER: "OTHER";
    AUTO: "AUTO";
    BEAUTY: "BEAUTY";
    APPAREL: "APPAREL";
    EDU: "EDU";
    ENTERTAIN: "ENTERTAIN";
    EVENT_PLAN: "EVENT_PLAN";
    FINANCE: "FINANCE";
    GROCERY: "GROCERY";
    GOVT: "GOVT";
    HOTEL: "HOTEL";
    HEALTH: "HEALTH";
    NONPROFIT: "NONPROFIT";
    PROF_SERVICES: "PROF_SERVICES";
    RETAIL: "RETAIL";
    TRAVEL: "TRAVEL";
    RESTAURANT: "RESTAURANT";
    NOT_A_BIZ: "NOT_A_BIZ";
}>;
declare const phoneNumberResponseSchema: z.ZodObject<{
    id: z.ZodString;
    display_phone_number: z.ZodString;
    verified_name: z.ZodString;
    quality_rating: z.ZodOptional<z.ZodEnum<{
        GREEN: "GREEN";
        YELLOW: "YELLOW";
        RED: "RED";
        UNKNOWN: "UNKNOWN";
    }>>;
    code_verification_status: z.ZodOptional<z.ZodString>;
    is_official_business_account: z.ZodOptional<z.ZodBoolean>;
    account_mode: z.ZodOptional<z.ZodString>;
    eligibility_for_api_business_global_search: z.ZodOptional<z.ZodString>;
    is_pin_enabled: z.ZodOptional<z.ZodBoolean>;
    name_status: z.ZodOptional<z.ZodString>;
    new_name_status: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PENDING: "PENDING";
        RESTRICTED: "RESTRICTED";
        UNKNOWN: "UNKNOWN";
        DELETED: "DELETED";
        MIGRATED: "MIGRATED";
        BANNED: "BANNED";
        RATE_LIMITED: "RATE_LIMITED";
        FLAGGED: "FLAGGED";
        CONNECTED: "CONNECTED";
        DISCONNECTED: "DISCONNECTED";
    }>>;
    search_visibility: z.ZodOptional<z.ZodString>;
    messaging_limit_tier: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const phoneNumberListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        display_phone_number: z.ZodString;
        verified_name: z.ZodString;
        quality_rating: z.ZodOptional<z.ZodEnum<{
            GREEN: "GREEN";
            YELLOW: "YELLOW";
            RED: "RED";
            UNKNOWN: "UNKNOWN";
        }>>;
        code_verification_status: z.ZodOptional<z.ZodString>;
        is_official_business_account: z.ZodOptional<z.ZodBoolean>;
        account_mode: z.ZodOptional<z.ZodString>;
        eligibility_for_api_business_global_search: z.ZodOptional<z.ZodString>;
        is_pin_enabled: z.ZodOptional<z.ZodBoolean>;
        name_status: z.ZodOptional<z.ZodString>;
        new_name_status: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<{
            PENDING: "PENDING";
            RESTRICTED: "RESTRICTED";
            UNKNOWN: "UNKNOWN";
            DELETED: "DELETED";
            MIGRATED: "MIGRATED";
            BANNED: "BANNED";
            RATE_LIMITED: "RATE_LIMITED";
            FLAGGED: "FLAGGED";
            CONNECTED: "CONNECTED";
            DISCONNECTED: "DISCONNECTED";
        }>>;
        search_visibility: z.ZodOptional<z.ZodString>;
        messaging_limit_tier: z.ZodOptional<z.ZodString>;
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
declare const phoneNumberAddSchema: z.ZodObject<{
    phone_number: z.ZodString;
    country_code: z.ZodOptional<z.ZodString>;
    verified_name: z.ZodOptional<z.ZodString>;
    waba_id: z.ZodString;
}, z.core.$strip>;
declare const phoneNumberAddResponseSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
declare const phoneNumberRegisterSchema: z.ZodObject<{
    messaging_product: z.ZodLiteral<"whatsapp">;
    pin: z.ZodString;
}, z.core.$strip>;
declare const phoneNumberDeregisterSchema: z.ZodObject<{
    messaging_product: z.ZodOptional<z.ZodLiteral<"whatsapp">>;
}, z.core.$strip>;
declare const phoneNumberRegisterResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;
declare const requestVerificationCodeSchema: z.ZodObject<{
    code_method: z.ZodEnum<{
        SMS: "SMS";
        VOICE: "VOICE";
    }>;
    language: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const verifyCodeSchema: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
declare const verificationResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;
declare const businessProfileSchema: z.ZodObject<{
    messaging_product: z.ZodOptional<z.ZodLiteral<"whatsapp">>;
    about: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    profile_picture_url: z.ZodOptional<z.ZodString>;
    websites: z.ZodOptional<z.ZodArray<z.ZodString>>;
    vertical: z.ZodOptional<z.ZodEnum<{
        UNDEFINED: "UNDEFINED";
        OTHER: "OTHER";
        AUTO: "AUTO";
        BEAUTY: "BEAUTY";
        APPAREL: "APPAREL";
        EDU: "EDU";
        ENTERTAIN: "ENTERTAIN";
        EVENT_PLAN: "EVENT_PLAN";
        FINANCE: "FINANCE";
        GROCERY: "GROCERY";
        GOVT: "GOVT";
        HOTEL: "HOTEL";
        HEALTH: "HEALTH";
        NONPROFIT: "NONPROFIT";
        PROF_SERVICES: "PROF_SERVICES";
        RETAIL: "RETAIL";
        TRAVEL: "TRAVEL";
        RESTAURANT: "RESTAURANT";
        NOT_A_BIZ: "NOT_A_BIZ";
    }>>;
}, z.core.$strip>;
declare const businessProfileResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        messaging_product: z.ZodOptional<z.ZodLiteral<"whatsapp">>;
        about: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        profile_picture_url: z.ZodOptional<z.ZodString>;
        websites: z.ZodOptional<z.ZodArray<z.ZodString>>;
        vertical: z.ZodOptional<z.ZodEnum<{
            UNDEFINED: "UNDEFINED";
            OTHER: "OTHER";
            AUTO: "AUTO";
            BEAUTY: "BEAUTY";
            APPAREL: "APPAREL";
            EDU: "EDU";
            ENTERTAIN: "ENTERTAIN";
            EVENT_PLAN: "EVENT_PLAN";
            FINANCE: "FINANCE";
            GROCERY: "GROCERY";
            GOVT: "GOVT";
            HOTEL: "HOTEL";
            HEALTH: "HEALTH";
            NONPROFIT: "NONPROFIT";
            PROF_SERVICES: "PROF_SERVICES";
            RETAIL: "RETAIL";
            TRAVEL: "TRAVEL";
            RESTAURANT: "RESTAURANT";
            NOT_A_BIZ: "NOT_A_BIZ";
        }>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
declare const businessProfileUpdateSchema: z.ZodObject<{
    about: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    profile_picture_url: z.ZodOptional<z.ZodString>;
    websites: z.ZodOptional<z.ZodArray<z.ZodString>>;
    vertical: z.ZodOptional<z.ZodEnum<{
        UNDEFINED: "UNDEFINED";
        OTHER: "OTHER";
        AUTO: "AUTO";
        BEAUTY: "BEAUTY";
        APPAREL: "APPAREL";
        EDU: "EDU";
        ENTERTAIN: "ENTERTAIN";
        EVENT_PLAN: "EVENT_PLAN";
        FINANCE: "FINANCE";
        GROCERY: "GROCERY";
        GOVT: "GOVT";
        HOTEL: "HOTEL";
        HEALTH: "HEALTH";
        NONPROFIT: "NONPROFIT";
        PROF_SERVICES: "PROF_SERVICES";
        RETAIL: "RETAIL";
        TRAVEL: "TRAVEL";
        RESTAURANT: "RESTAURANT";
        NOT_A_BIZ: "NOT_A_BIZ";
    }>>;
    messaging_product: z.ZodLiteral<"whatsapp">;
}, z.core.$strip>;
declare const businessProfileUpdateResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;
declare const phoneNumberListOptionsSchema: z.ZodObject<{
    fields: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodNumber>;
    after: z.ZodOptional<z.ZodString>;
    before: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

type PhoneNumberQualityRating = z.infer<typeof phoneNumberQualityRatingSchema>;
type PhoneNumberStatus = z.infer<typeof phoneNumberStatusSchema>;
type CodeMethod = z.infer<typeof codeMethodSchema>;
type Vertical = z.infer<typeof verticalSchema>;
type PhoneNumber = z.infer<typeof phoneNumberResponseSchema>;
type PhoneNumberListResponse = z.infer<typeof phoneNumberListResponseSchema>;
type PhoneNumberListOptions = z.infer<typeof phoneNumberListOptionsSchema>;
type PhoneNumberAdd = z.infer<typeof phoneNumberAddSchema>;
type PhoneNumberAddResponse = z.infer<typeof phoneNumberAddResponseSchema>;
type PhoneNumberRegister = z.infer<typeof phoneNumberRegisterSchema>;
type PhoneNumberDeregister = z.infer<typeof phoneNumberDeregisterSchema>;
type PhoneNumberRegisterResponse = z.infer<typeof phoneNumberRegisterResponseSchema>;
type RequestVerificationCode = z.infer<typeof requestVerificationCodeSchema>;
type VerifyCode = z.infer<typeof verifyCodeSchema>;
type VerificationResponse = z.infer<typeof verificationResponseSchema>;
type BusinessProfile = z.infer<typeof businessProfileSchema>;
type BusinessProfileResponse = z.infer<typeof businessProfileResponseSchema>;
type BusinessProfileUpdate = z.infer<typeof businessProfileUpdateSchema>;
type BusinessProfileUpdateResponse = z.infer<typeof businessProfileUpdateResponseSchema>;

/**
 * Phone Numbers resource
 *
 * Manages WhatsApp phone numbers including registration, verification,
 * and business profile settings.
 *
 * @example
 * ```typescript
 * // List phone numbers in a WABA
 * const numbers = await client.phoneNumbers.list();
 *
 * // Register a phone number
 * await client.phoneNumbers.register({
 *   messaging_product: "whatsapp",
 *   pin: "123456"
 * });
 *
 * // Update business profile
 * await client.phoneNumbers.updateProfile({
 *   messaging_product: "whatsapp",
 *   about: "Welcome to our business!"
 * });
 * ```
 */
declare class PhoneNumbersResource {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get the business ID (from parameter or config)
     */
    private getBusinessId;
    /**
     * Get the WABA ID (from parameter or config)
     */
    private getWabaId;
    /**
     * Get the phone number ID (from parameter or config)
     */
    private getPhoneNumberId;
    /**
     * Build query string from options
     */
    private buildQueryString;
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
    list(options?: PhoneNumberListOptions, wabaId?: string): Promise<PhoneNumberListResponse>;
    /**
     * Get details of a specific phone number
     *
     * @param phoneNumberId - Phone number ID (overrides config)
     * @param fields - Comma-separated list of fields to return
     * @returns Phone number details
     */
    get(phoneNumberId?: string, fields?: string): Promise<PhoneNumber>;
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
    add(data: PhoneNumberAdd, businessId?: string): Promise<PhoneNumberAddResponse>;
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
    requestVerificationCode(data: RequestVerificationCode, phoneNumberId?: string): Promise<VerificationResponse>;
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
    verifyCode(data: VerifyCode, phoneNumberId?: string): Promise<VerificationResponse>;
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
    register(data: PhoneNumberRegister, phoneNumberId?: string): Promise<PhoneNumberRegisterResponse>;
    /**
     * Deregister a phone number from WhatsApp
     *
     * This removes the phone number from WhatsApp's servers.
     * The number can be re-registered later.
     *
     * @param phoneNumberId - Phone number ID (overrides config)
     * @returns Success status
     */
    deregister(phoneNumberId?: string): Promise<PhoneNumberRegisterResponse>;
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
    getProfile(phoneNumberId?: string, fields?: string): Promise<BusinessProfileResponse>;
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
    updateProfile(data: BusinessProfileUpdate, phoneNumberId?: string): Promise<BusinessProfileUpdateResponse>;
}

/**
 * E.164 phone number format
 */
declare const phoneNumberSchema: z.ZodString;
/**
 * Text content for text messages
 */
declare const messageTextContentSchema: z.ZodObject<{
    body: z.ZodString;
    preview_url: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Image content for image messages
 */
declare const messageImageContentSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    link: z.ZodOptional<z.ZodString>;
    caption: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Location content for location messages
 */
declare const messageLocationContentSchema: z.ZodObject<{
    longitude: z.ZodNumber;
    latitude: z.ZodNumber;
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Reaction content for reaction messages
 */
declare const messageReactionContentSchema: z.ZodObject<{
    message_id: z.ZodString;
    emoji: z.ZodString;
}, z.core.$strip>;
/**
 * Input for sending a text message
 */
declare const messageSendTextSchema: z.ZodObject<{
    to: z.ZodString;
    text: z.ZodObject<{
        body: z.ZodString;
        preview_url: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Input for sending an image message
 */
declare const messageSendImageSchema: z.ZodObject<{
    to: z.ZodString;
    image: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Input for sending a location message
 */
declare const messageSendLocationSchema: z.ZodObject<{
    to: z.ZodString;
    location: z.ZodObject<{
        longitude: z.ZodNumber;
        latitude: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Input for sending a reaction
 */
declare const messageSendReactionSchema: z.ZodObject<{
    to: z.ZodString;
    reaction: z.ZodObject<{
        message_id: z.ZodString;
        emoji: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
declare const messageTextSchema: z.ZodObject<{
    to: z.ZodString;
    text: z.ZodObject<{
        body: z.ZodString;
        preview_url: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"text">;
}, z.core.$strip>;
declare const messageImageSchema: z.ZodObject<{
    to: z.ZodString;
    image: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        link: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"image">;
}, z.core.$strip>;
declare const messageLocationSchema: z.ZodObject<{
    to: z.ZodString;
    location: z.ZodObject<{
        longitude: z.ZodNumber;
        latitude: z.ZodNumber;
        name: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    type: z.ZodLiteral<"location">;
}, z.core.$strip>;
declare const messageReactionSchema: z.ZodObject<{
    to: z.ZodString;
    reaction: z.ZodObject<{
        message_id: z.ZodString;
        emoji: z.ZodString;
    }, z.core.$strip>;
    type: z.ZodLiteral<"reaction">;
}, z.core.$strip>;
/**
 * Union of all outgoing message types (discriminated by 'type')
 */
declare const messageOutgoingSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
 * Response from sending a message
 */
declare const messageSendResponseSchema: z.ZodObject<{
    messaging_product: z.ZodLiteral<"whatsapp">;
    contacts: z.ZodArray<z.ZodObject<{
        input: z.ZodString;
        wa_id: z.ZodString;
    }, z.core.$strip>>;
    messages: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        message_status: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Incoming text message
 */
declare const messageIncomingTextSchema: z.ZodObject<{
    from: z.ZodString;
    id: z.ZodString;
    timestamp: z.ZodString;
    type: z.ZodLiteral<"text">;
    text: z.ZodObject<{
        body: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
/**
 * Incoming image message
 */
declare const messageIncomingImageSchema: z.ZodObject<{
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
 * Incoming audio message
 */
declare const messageIncomingAudioSchema: z.ZodObject<{
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
 * Union of all incoming message types
 */
declare const messageIncomingSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
    type: z.ZodLiteral<"image">;
    image: z.ZodObject<{
        id: z.ZodString;
        mime_type: z.ZodOptional<z.ZodString>;
        caption: z.ZodOptional<z.ZodString>;
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
}, z.core.$strip>], "type">;

type MessageTextContent = z.infer<typeof messageTextContentSchema>;
type MessageImageContent = z.infer<typeof messageImageContentSchema>;
type MessageLocationContent = z.infer<typeof messageLocationContentSchema>;
type MessageReactionContent = z.infer<typeof messageReactionContentSchema>;
/**
 * Input for sending a text message
 */
type MessageSendText = z.infer<typeof messageSendTextSchema>;
/**
 * Input for sending an image message
 */
type MessageSendImage = z.infer<typeof messageSendImageSchema>;
/**
 * Input for sending a location message
 */
type MessageSendLocation = z.infer<typeof messageSendLocationSchema>;
/**
 * Input for sending a reaction
 */
type MessageSendReaction = z.infer<typeof messageSendReactionSchema>;
type MessageText = z.infer<typeof messageTextSchema>;
type MessageImage = z.infer<typeof messageImageSchema>;
type MessageLocation = z.infer<typeof messageLocationSchema>;
type MessageReaction = z.infer<typeof messageReactionSchema>;
/**
 * Union of all outgoing message types
 */
type MessageOutgoing = z.infer<typeof messageOutgoingSchema>;
/**
 * Response from sending a message
 */
type MessageSendResponse = z.infer<typeof messageSendResponseSchema>;
type MessageIncomingText = z.infer<typeof messageIncomingTextSchema>;
type MessageIncomingImage = z.infer<typeof messageIncomingImageSchema>;
type MessageIncomingAudio = z.infer<typeof messageIncomingAudioSchema>;
/**
 * Union of all incoming message types
 */
type MessageIncoming = z.infer<typeof messageIncomingSchema>;

/**
 * Messages resource for sending WhatsApp messages
 *
 * @example
 * ```typescript
 * // Send a text message
 * await client.messages.sendText({
 *   to: "+1234567890",
 *   text: { body: "Hello!" }
 * });
 *
 * // Send an image
 * await client.messages.sendImage({
 *   to: "+1234567890",
 *   image: { link: "https://example.com/image.jpg" }
 * });
 *
 * // Send using the generic send method
 * await client.messages.send({
 *   type: "text",
 *   to: "+1234567890",
 *   text: { body: "Hello!" }
 * });
 * ```
 */
declare class MessagesResource {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get the phone number ID (with validation)
     */
    private getPhoneNumberId;
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
    sendText(input: MessageSendText, phoneNumberId?: string): Promise<MessageSendResponse>;
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
    sendImage(input: MessageSendImage, phoneNumberId?: string): Promise<MessageSendResponse>;
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
    sendLocation(input: MessageSendLocation, phoneNumberId?: string): Promise<MessageSendResponse>;
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
    sendReaction(input: MessageSendReaction, phoneNumberId?: string): Promise<MessageSendResponse>;
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
    send(message: MessageOutgoing, phoneNumberId?: string): Promise<MessageSendResponse>;
}

/**
 * Builds the message payload structure for WhatsApp API
 *
 * All WhatsApp messages follow this structure:
 * {
 *   "messaging_product": "whatsapp",
 *   "recipient_type": "individual",
 *   "to": "<PHONE_NUMBER>",
 *   "type": "<MESSAGE_TYPE>",
 *   "<MESSAGE_TYPE>": {<CONTENT>}
 * }
 */
declare function buildMessagePayload<T extends Record<string, unknown>>(to: string, type: string, content: T): {
    messaging_product: "whatsapp";
    recipient_type: "individual";
    to: string;
    type: string;
} & T;

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
    DELETED: "DELETED";
    PAUSED: "PAUSED";
    DISABLED: "DISABLED";
    IN_APPEAL: "IN_APPEAL";
    PENDING_DELETION: "PENDING_DELETION";
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
        DELETED: "DELETED";
        PAUSED: "PAUSED";
        DISABLED: "DISABLED";
        IN_APPEAL: "IN_APPEAL";
        PENDING_DELETION: "PENDING_DELETION";
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
        DELETED: "DELETED";
        PAUSED: "PAUSED";
        DISABLED: "DISABLED";
        IN_APPEAL: "IN_APPEAL";
        PENDING_DELETION: "PENDING_DELETION";
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
            DELETED: "DELETED";
            PAUSED: "PAUSED";
            DISABLED: "DISABLED";
            IN_APPEAL: "IN_APPEAL";
            PENDING_DELETION: "PENDING_DELETION";
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

/**
 * Supported media types for upload
 */
declare const mediaTypeSchema: z.ZodEnum<{
    image: "image";
    audio: "audio";
    video: "video";
    document: "document";
    sticker: "sticker";
}>;
/**
 * Supported MIME types
 *
 * Audio: audio/aac, audio/amr, audio/mpeg, audio/mp4, audio/ogg
 * Image: image/jpeg, image/png
 * Video: video/3gpp, video/mp4
 * Document: text/plain, application/pdf, application/msword, etc.
 * Sticker: image/webp
 */
declare const mediaMimeTypeSchema: z.ZodString;
/**
 * Input for uploading media
 */
declare const mediaUploadSchema: z.ZodObject<{
    file: z.ZodUnion<readonly [z.ZodCustom<node_buffer.Blob, node_buffer.Blob>, z.ZodCustom<ArrayBuffer, ArrayBuffer>]>;
    mimeType: z.ZodString;
    filename: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Response from uploading media
 */
declare const mediaUploadResponseSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
/**
 * Media metadata response (from GET /MEDIA_ID)
 *
 * The URL is only valid for 5 minutes.
 */
declare const mediaMetadataSchema: z.ZodObject<{
    messaging_product: z.ZodLiteral<"whatsapp">;
    url: z.ZodString;
    mime_type: z.ZodString;
    sha256: z.ZodString;
    file_size: z.ZodString;
    id: z.ZodString;
}, z.core.$strip>;
/**
 * Response from deleting media
 */
declare const mediaDeleteResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
}, z.core.$strip>;

/**
 * Media type (image, video, audio, document, sticker)
 */
type MediaType = z.infer<typeof mediaTypeSchema>;
/**
 * Input for uploading media
 */
type MediaUpload = z.infer<typeof mediaUploadSchema>;
/**
 * Response from uploading media
 */
type MediaUploadResponse = z.infer<typeof mediaUploadResponseSchema>;
/**
 * Media metadata (from GET /MEDIA_ID)
 *
 * Contains the download URL (valid for 5 minutes), MIME type, file size, and hash.
 */
type MediaMetadata = z.infer<typeof mediaMetadataSchema>;
/**
 * Response from deleting media
 */
type MediaDeleteResponse = z.infer<typeof mediaDeleteResponseSchema>;

/**
 * Media resource for managing WhatsApp media files
 *
 * Media files are encrypted and persist for 30 days unless deleted.
 * Media IDs from uploads expire after 30 days.
 * Media IDs from webhooks expire after 7 days.
 * Media URLs expire after 5 minutes.
 *
 * @example
 * ```typescript
 * // Upload media
 * const { id } = await client.media.upload({
 *   file: imageBuffer,
 *   mimeType: "image/jpeg"
 * });
 *
 * // Get media metadata (includes download URL)
 * const metadata = await client.media.get(mediaId);
 * console.log(metadata.url); // Valid for 5 minutes
 *
 * // Download media binary
 * const buffer = await client.media.download(mediaId);
 *
 * // Delete media
 * await client.media.delete(mediaId);
 * ```
 */
declare class MediaResource {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    /**
     * Get the phone number ID (with validation)
     */
    private getPhoneNumberId;
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
    upload(input: MediaUpload, phoneNumberId?: string): Promise<MediaUploadResponse>;
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
    get(mediaId: string, phoneNumberId?: string): Promise<MediaMetadata>;
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
    download(mediaId: string): Promise<ArrayBuffer>;
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
    delete(mediaId: string, phoneNumberId?: string): Promise<MediaDeleteResponse>;
}

declare const webhookContactSchema: z.ZodObject<{
    profile: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
    wa_id: z.ZodString;
}, z.core.$strip>;
declare const webhookMetadataSchema: z.ZodObject<{
    display_phone_number: z.ZodString;
    phone_number_id: z.ZodString;
}, z.core.$strip>;
/**
 * Conversation origin type
 */
declare const webhookConversationOriginSchema: z.ZodObject<{
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
/**
 * Conversation object (conditional - see docs)
 */
declare const webhookConversationSchema: z.ZodObject<{
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
}, z.core.$strip>;
/**
 * Pricing information
 */
declare const webhookPricingSchema: z.ZodObject<{
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
}, z.core.$strip>;
/**
 * Status error
 */
declare const webhookStatusErrorSchema: z.ZodObject<{
    code: z.ZodNumber;
    title: z.ZodString;
    message: z.ZodString;
    error_data: z.ZodObject<{
        details: z.ZodString;
    }, z.core.$strip>;
    href: z.ZodString;
}, z.core.$strip>;
/**
 * Message status update
 */
declare const webhookStatusSchema: z.ZodObject<{
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
 * Webhook value (the actual data)
 */
declare const webhookValueSchema: z.ZodObject<{
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
        type: z.ZodLiteral<"image">;
        image: z.ZodObject<{
            id: z.ZodString;
            mime_type: z.ZodOptional<z.ZodString>;
            caption: z.ZodOptional<z.ZodString>;
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
/**
 * Webhook change entry
 */
declare const webhookChangeSchema: z.ZodObject<{
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
            type: z.ZodLiteral<"image">;
            image: z.ZodObject<{
                id: z.ZodString;
                mime_type: z.ZodOptional<z.ZodString>;
                caption: z.ZodOptional<z.ZodString>;
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
}, z.core.$strip>;
/**
 * Webhook entry
 */
declare const webhookEntrySchema: z.ZodObject<{
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
                type: z.ZodLiteral<"image">;
                image: z.ZodObject<{
                    id: z.ZodString;
                    mime_type: z.ZodOptional<z.ZodString>;
                    caption: z.ZodOptional<z.ZodString>;
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
}, z.core.$strip>;
/**
 * Full webhook payload from Meta
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
                    type: z.ZodLiteral<"image">;
                    image: z.ZodObject<{
                        id: z.ZodString;
                        mime_type: z.ZodOptional<z.ZodString>;
                        caption: z.ZodOptional<z.ZodString>;
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
 * Query parameters for webhook verification GET request
 */
declare const webhookVerifyQuerySchema: z.ZodObject<{
    "hub.mode": z.ZodOptional<z.ZodString>;
    "hub.verify_token": z.ZodOptional<z.ZodString>;
    "hub.challenge": z.ZodOptional<z.ZodString>;
}, z.core.$strip>;

type WebhookContact = z.infer<typeof webhookContactSchema>;
type WebhookMetadata = z.infer<typeof webhookMetadataSchema>;
type WebhookStatus = z.infer<typeof webhookStatusSchema>;
type WebhookPayload = z.infer<typeof webhookPayloadSchema>;
type WebhookVerifyQuery = z.infer<typeof webhookVerifyQuerySchema>;
type WebhookConversation = z.infer<typeof webhookConversationSchema>;
type WebhookPricing = z.infer<typeof webhookPricingSchema>;
type WebhookStatusError = z.infer<typeof webhookStatusErrorSchema>;
/**
 * Context provided to webhook handlers
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
 * Handler functions for different message types
 *
 * @example
 * ```typescript
 * client.webhooks.handle(payload, {
 *   beforeHandler: async (message, ctx) => {
 *     const user = await db.findUser(message.from);
 *     return { user };
 *   },
 *   text: async (message, ctx, before) => {
 *     if (before?.user) {
 *       console.log(`Message from ${before.user.name}`);
 *     }
 *   },
 * });
 * ```
 */
type WebhookHandlers<TBefore = Record<string, never>> = {
    /**
     * Runs before message handlers. Return value is passed to handlers.
     */
    beforeHandler?: (message: MessageIncoming, ctx: WebhookContext) => Promise<TBefore> | TBefore;
    text?: (message: MessageIncomingText, ctx: WebhookContext, before: TBefore | undefined) => Promise<void> | void;
    audio?: (message: MessageIncomingAudio, ctx: WebhookContext, before: TBefore | undefined) => Promise<void> | void;
    image?: (message: MessageIncomingImage, ctx: WebhookContext, before: TBefore | undefined) => Promise<void> | void;
};
/**
 * Options for the handle() method
 */
type WebhookHandleOptions = {
    /**
     * Called when a handler throws an error
     */
    onError?: (error: Error, message: MessageIncoming) => void;
};

/**
 * Webhooks resource for handling incoming webhook payloads from Meta
 *
 * @example
 * ```typescript
 * // Verify webhook (GET request)
 * const challenge = client.webhooks.verify(req.query, VERIFY_TOKEN);
 * if (challenge) return res.send(challenge);
 *
 * // Handle webhook (POST request)
 * client.webhooks.handle(req.body, {
 *   text: async (message, ctx) => {
 *     console.log(`Text from ${message.from}: ${message.text.body}`);
 *   },
 *   image: async (message, ctx) => {
 *     const buffer = await client.media.download(message.image.id);
 *   },
 * });
 * ```
 */
declare class WebhooksResource {
    /**
     * Verify webhook GET request from Meta
     *
     * @param query - Query parameters from GET request
     * @param verifyToken - Your verification token
     * @returns Challenge string if valid, null if invalid
     */
    verify(query: WebhookVerifyQuery, verifyToken: string): string | null;
    /**
     * Extract all incoming messages from webhook payload
     *
     * @param payload - Webhook payload from Meta
     * @returns Flat array of incoming messages
     */
    extractMessages(payload: WebhookPayload): MessageIncoming[];
    /**
     * Extract status updates from webhook payload
     *
     * @param payload - Webhook payload from Meta
     * @returns Flat array of status updates
     */
    extractStatuses(payload: WebhookPayload): WebhookStatus[];
    /**
     * Validate and parse webhook payload
     *
     * @param payload - Raw payload to validate
     * @returns Parsed payload, or original if invalid (with console error)
     */
    private parsePayload;
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
    handle<THandlers extends WebhookHandlers<any>>(payload: unknown, handlers: THandlers, options?: WebhookHandleOptions): void;
}

/**
 * Verify webhook GET request from Meta
 *
 * Meta sends GET requests to verify webhook endpoints:
 * GET /webhook?hub.mode=subscribe&hub.challenge=<CHALLENGE>&hub.verify_token=<TOKEN>
 *
 * @param query - Query parameters from GET request
 * @param verifyToken - Your verification token
 * @returns Challenge string if valid, null if invalid
 *
 * @example
 * ```typescript
 * // Express/Next.js route handler
 * app.get('/webhook', (req, res) => {
 *   const challenge = verifyWebhook(req.query, process.env.WEBHOOK_VERIFY_TOKEN);
 *   if (challenge) {
 *     res.send(challenge);
 *   } else {
 *     res.status(403).send('Forbidden');
 *   }
 * });
 * ```
 */
declare function verifyWebhook(query: WebhookVerifyQuery, verifyToken: string): string | null;
/**
 * Extract all incoming messages from webhook payload
 *
 * Flattens: entry[].changes[].value.messages[]
 *
 * @param payload - Webhook payload from Meta
 * @returns Flat array of incoming messages
 */
declare function extractMessages(payload: WebhookPayload): MessageIncoming[];
/**
 * Extract status updates from webhook payload
 *
 * Flattens: entry[].changes[].value.statuses[]
 *
 * @param payload - Webhook payload from Meta
 * @returns Flat array of status updates
 */
declare function extractStatuses(payload: WebhookPayload): WebhookStatus[];

/**
 * WhatsApp Cloud API client
 */
declare class WhatsAppClient {
    readonly business: BusinessResource;
    readonly wabas: WabasResource;
    readonly phoneNumbers: PhoneNumbersResource;
    readonly messages: MessagesResource;
    readonly templates: TemplatesResource;
    readonly media: MediaResource;
    readonly webhooks: WebhooksResource;
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
 * Graph API Error Response - the FULL structure from Meta's API
 *
 * We preserve everything Meta returns, no fields stripped.
 */
interface GraphAPIErrorResponse {
    error: {
        message: string;
        type: string;
        code: number;
        error_subcode?: number;
        error_user_title?: string;
        error_user_msg?: string;
        fbtrace_id?: string;
        is_transient?: boolean;
        error_data?: {
            messaging_product?: string;
            details?: string;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    };
}
/**
 * Error thrown when the Graph API returns an error response.
 *
 * The FULL error response from Meta is stored in `response`.
 * Nothing is stripped or transformed.
 *
 * @example
 * ```typescript
 * try {
 *   await client.templates.create(input);
 * } catch (error) {
 *   if (error instanceof GraphAPIError) {
 *     console.log(error.response.error.fbtrace_id);    // For Meta support
 *     console.log(error.response.error.error_user_msg); // User-friendly message
 *     console.log(error.response.error.error_subcode);  // Programmatic handling
 *   }
 * }
 * ```
 */
declare class GraphAPIError extends Error {
    /** The FULL error response from the Graph API - unmodified */
    readonly response: GraphAPIErrorResponse;
    /** HTTP status code */
    readonly statusCode: number;
    constructor(
    /** The FULL error response from the Graph API - unmodified */
    response: GraphAPIErrorResponse, 
    /** HTTP status code */
    statusCode: number);
}

export { type AccountReviewStatus, type Business, type BusinessGetOptions, type BusinessProfile, type BusinessProfileResponse, type BusinessProfileUpdate, type BusinessProfileUpdateResponse, BusinessResource, type BusinessVerificationStatus, type ClientConfig, type CodeMethod, type CursorPaging, type DebugTokenResponse, GraphAPIError, type GraphAPIErrorResponse, HttpClient, type MediaDeleteResponse, type MediaMetadata, MediaResource, type MediaType, type MediaUpload, type MediaUploadResponse, type MessageImage, type MessageImageContent, type MessageIncoming, type MessageIncomingAudio, type MessageIncomingImage, type MessageIncomingText, type MessageLocation, type MessageLocationContent, type MessageOutgoing, type MessageReaction, type MessageReactionContent, type MessageSendImage, type MessageSendLocation, type MessageSendReaction, type MessageSendResponse, type MessageSendText, type MessageText, type MessageTextContent, MessagesResource, type OnBehalfOfBusinessInfo, type PhoneNumber, type PhoneNumberAdd, type PhoneNumberAddResponse, type PhoneNumberDeregister, type PhoneNumberListOptions, type PhoneNumberListResponse, type PhoneNumberQualityRating, type PhoneNumberRegister, type PhoneNumberRegisterResponse, type PhoneNumberStatus, PhoneNumbersResource, type RequestVerificationCode, type SubscribeAppResponse, type SubscribedApp, type SubscribedAppsListResponse, type Template, type TemplateBodyComponentInput, type TemplateBodyExample, type TemplateButton, type TemplateButtonInput, type TemplateButtonsComponentInput, type TemplateCategory, type TemplateComponent, type TemplateComponentInput, type TemplateCopyCodeButtonInput, type TemplateCreate, type TemplateCreateResponse, type TemplateDelete, type TemplateDeleteResponse, type TemplateFlowButtonInput, type TemplateFooterComponentInput, type TemplateHeaderComponentInput, type TemplateHeaderLocationInput, type TemplateHeaderMediaInput, type TemplateHeaderTextExample, type TemplateHeaderTextInput, type TemplateLanguage, type TemplateList, type TemplateListResponse, type TemplateNamedParamExample, type TemplatePaging, type TemplatePagingCursors, type TemplateParameterFormat, type TemplatePhoneNumberButtonInput, type TemplateQualityScore, type TemplateQuickReplyButtonInput, type TemplateStatus, type TemplateUpdate, type TemplateUpdateResponse, type TemplateUrlButtonInput, TemplatesResource, type UnsubscribeAppResponse, type VerificationResponse, type VerifyCode, type Vertical, type Waba, type WabaBusinessType, type WabaCreate, type WabaCreateResponse, type WabaListOptions, type WabaListResponse, WabasResource, type WebhookContact, type WebhookContext, type WebhookConversation, type WebhookHandleOptions, type WebhookHandlers, type WebhookMetadata, type WebhookPayload, type WebhookPricing, type WebhookStatus, type WebhookStatusError, type WebhookVerifyQuery, WebhooksResource, WhatsAppClient, accountReviewStatusSchema, buildMessagePayload, businessGetOptionsSchema, businessProfileResponseSchema, businessProfileSchema, businessProfileUpdateResponseSchema, businessProfileUpdateSchema, businessSchema, businessVerificationStatusSchema, clientConfigSchema, codeMethodSchema, cursorPagingSchema, debugTokenResponseSchema, extractMessages, extractStatuses, mediaDeleteResponseSchema, mediaMetadataSchema, mediaMimeTypeSchema, mediaTypeSchema, mediaUploadResponseSchema, mediaUploadSchema, messageImageContentSchema, messageImageSchema, messageIncomingAudioSchema, messageIncomingImageSchema, messageIncomingSchema, messageIncomingTextSchema, messageLocationContentSchema, messageLocationSchema, messageOutgoingSchema, messageReactionContentSchema, messageReactionSchema, messageSendImageSchema, messageSendLocationSchema, messageSendReactionSchema, messageSendResponseSchema, messageSendTextSchema, messageTextContentSchema, messageTextSchema, onBehalfOfBusinessInfoSchema, phoneNumberAddResponseSchema, phoneNumberAddSchema, phoneNumberDeregisterSchema, phoneNumberListOptionsSchema, phoneNumberListResponseSchema, phoneNumberQualityRatingSchema, phoneNumberRegisterResponseSchema, phoneNumberRegisterSchema, phoneNumberResponseSchema, phoneNumberSchema, phoneNumberStatusSchema, requestVerificationCodeSchema, subscribeAppResponseSchema, subscribedAppSchema, subscribedAppsListResponseSchema, templateBodyComponentInputSchema, templateBodyExampleSchema, templateButtonInputSchema, templateButtonSchema, templateButtonsComponentInputSchema, templateCategorySchema, templateComponentInputSchema, templateComponentSchema, templateCopyCodeButtonInputSchema, templateCreateAuthenticationSchema, templateCreateMarketingSchema, templateCreateResponseSchema, templateCreateSchema, templateCreateUtilitySchema, templateDeleteResponseSchema, templateDeleteSchema, templateFlowButtonInputSchema, templateFooterComponentInputSchema, templateHeaderComponentInputSchema, templateHeaderLocationInputSchema, templateHeaderMediaInputSchema, templateHeaderTextExampleSchema, templateHeaderTextInputSchema, templateLanguageSchema, templateListResponseSchema, templateListSchema, templateNamedParamExampleSchema, templatePagingCursorsSchema, templatePagingSchema, templateParameterFormatSchema, templatePhoneNumberButtonInputSchema, templateQualityScoreSchema, templateQuickReplyButtonInputSchema, templateSchema, templateStatusSchema, templateUpdateResponseSchema, templateUpdateSchema, templateUrlButtonInputSchema, toTemplateName, unsubscribeAppResponseSchema, verificationResponseSchema, verifyCodeSchema, verifyWebhook, verticalSchema, wabaBusinessTypeSchema, wabaCreateResponseSchema, wabaCreateSchema, wabaListOptionsSchema, wabaListResponseSchema, wabaSchema, webhookChangeSchema, webhookContactSchema, webhookConversationOriginSchema, webhookConversationSchema, webhookEntrySchema, webhookMetadataSchema, webhookPayloadSchema, webhookPricingSchema, webhookStatusErrorSchema, webhookStatusSchema, webhookValueSchema, webhookVerifyQuerySchema };
