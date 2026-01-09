import type { HttpClient } from "../../client/HttpClient";
import type {
  PhoneNumber,
  PhoneNumberListResponse,
  PhoneNumberListOptions,
  AddPreverifiedResponse,
  PhoneNumberCreateRequest,
  PhoneNumberCreateResponse,
  PhoneNumberRegister,
  PhoneNumberRegisterResponse,
  RequestVerificationCode,
  VerifyCode,
  VerificationResponse,
  BusinessProfileResponse,
  BusinessProfileUpdate,
  BusinessProfileUpdateResponse,
} from "./types";
import { BlockResource } from "./subresources/block";
import { QrCodesResource } from "./subresources/qrCodes";
import { MessageHistoryResource } from "./subresources/messageHistory";
import { OfficialAccountResource } from "./subresources/officialAccount";

/**
 * Phone Numbers resource
 *
 * Manages WhatsApp phone numbers including registration, verification,
 * and business profile settings.
 *
 * There are two ways to add phone numbers:
 *
 * 1. **Partner flow (addPreverified)**: Add a phone number to the Business Portfolio
 *    pool. This creates a preverified entity that can later be assigned to a WABA.
 *    Use this if you're a BSP managing phone numbers for multiple clients.
 *
 * 2. **Standard flow (create)**: Create a phone number directly in a WABA.
 *    This initiates the verification and business name approval process.
 *    You can optionally use a preverified_id from the Partner flow.
 *
 * @example
 * ```typescript
 * // List phone numbers in a WABA
 * const numbers = await client.phoneNumbers.list();
 *
 * // Partner flow: add to business portfolio pool
 * const preverified = await client.phoneNumbers.addPreverified("+14155551234");
 *
 * // Standard flow: create in a WABA (optionally using preverified_id)
 * const phone = await client.phoneNumbers.create({
 *   phone_number: "14155551234",
 *   verified_name: "Acme Corp",
 *   preverified_id: preverified.id, // optional
 * });
 *
 * // Register the phone number
 * await client.phoneNumbers.register({
 *   messaging_product: "whatsapp",
 *   pin: "123456"
 * });
 * ```
 */
export class PhoneNumbersResource {
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
  public readonly block: BlockResource;

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
  public readonly qrCodes: QrCodesResource;

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
  public readonly messageHistory: MessageHistoryResource;

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
  public readonly officialAccount: OfficialAccountResource;

  constructor(private readonly httpClient: HttpClient) {
    this.block = new BlockResource(httpClient);
    this.qrCodes = new QrCodesResource(httpClient);
    this.messageHistory = new MessageHistoryResource(httpClient);
    this.officialAccount = new OfficialAccountResource(httpClient);
  }

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
  async get(phoneNumberId?: string, fields?: string): Promise<PhoneNumber> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get<PhoneNumber>(`/${id}${query}`);
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
  async addPreverified(
    phoneNumber: string,
    businessId?: string
  ): Promise<AddPreverifiedResponse> {
    const id = this.getBusinessId(businessId);
    return this.httpClient.post<AddPreverifiedResponse>(
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
  async create(
    data: PhoneNumberCreateRequest,
    wabaId?: string
  ): Promise<PhoneNumberCreateResponse> {
    const id = this.getWabaId(wabaId);
    return this.httpClient.post<PhoneNumberCreateResponse>(
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
  async verifyCode(
    data: VerifyCode,
    phoneNumberId?: string
  ): Promise<VerificationResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<VerificationResponse>(
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
   * @see POST /{Phone-Number-ID}/deregister
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
