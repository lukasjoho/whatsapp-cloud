import type { HttpClient } from "../../client/HttpClient";
import type {
  PhoneNumber,
  PhoneNumberListResponse,
  PhoneNumberListOptions,
  PhoneNumberAdd,
  PhoneNumberAddResponse,
  PhoneNumberRegister,
  PhoneNumberRegisterResponse,
  RequestVerificationCode,
  VerifyCode,
  VerificationResponse,
  BusinessProfileResponse,
  BusinessProfileUpdate,
  BusinessProfileUpdateResponse,
} from "./types";

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
export class PhoneNumbersResource {
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
   * Get the phone number ID (from parameter or config)
   */
  private getPhoneNumberId(overrideId?: string): string {
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
  private buildQueryString(options?: PhoneNumberListOptions): string {
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
  async list(
    options?: PhoneNumberListOptions,
    wabaId?: string
  ): Promise<PhoneNumberListResponse> {
    const id = this.getWabaId(wabaId);
    const query = this.buildQueryString(options);
    return this.httpClient.get<PhoneNumberListResponse>(
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
  async get(phoneNumberId?: string, fields?: string): Promise<PhoneNumber> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get<PhoneNumber>(`/${id}${query}`);
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
  async add(
    data: PhoneNumberAdd,
    businessId?: string
  ): Promise<PhoneNumberAddResponse> {
    const id = this.getBusinessId(businessId);
    return this.httpClient.post<PhoneNumberAddResponse>(
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
  async requestVerificationCode(
    data: RequestVerificationCode,
    phoneNumberId?: string
  ): Promise<VerificationResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<VerificationResponse>(
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
  async verifyCode(
    data: VerifyCode,
    phoneNumberId?: string
  ): Promise<VerificationResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<VerificationResponse>(`/${id}/verify_code`, data);
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
  async register(
    data: PhoneNumberRegister,
    phoneNumberId?: string
  ): Promise<PhoneNumberRegisterResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<PhoneNumberRegisterResponse>(
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
  async deregister(
    phoneNumberId?: string
  ): Promise<PhoneNumberRegisterResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<PhoneNumberRegisterResponse>(
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
  async getProfile(
    phoneNumberId?: string,
    fields?: string
  ): Promise<BusinessProfileResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const defaultFields =
      "about,address,description,email,profile_picture_url,websites,vertical";
    const query = `?fields=${fields ?? defaultFields}`;
    return this.httpClient.get<BusinessProfileResponse>(
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
  async updateProfile(
    data: BusinessProfileUpdate,
    phoneNumberId?: string
  ): Promise<BusinessProfileUpdateResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<BusinessProfileUpdateResponse>(
      `/${id}/whatsapp_business_profile`,
      data
    );
  }
}
