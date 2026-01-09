import type { HttpClient } from "../../../../client/HttpClient";
import type {
  OfficialAccountStatus,
  OfficialAccountApplyRequest,
  OfficialAccountApplyResponse,
} from "./types";

/**
 * Official Business Account subresource for Phone Numbers
 *
 * Manage Official Business Account (OBA) verification status for a WhatsApp Business phone number.
 * OBA verification provides a green checkmark badge and enhanced credibility.
 *
 * @example
 * ```typescript
 * // Get current OBA status
 * const status = await client.phoneNumbers.officialAccount.get();
 * console.log(status.oba_status); // "PENDING", "APPROVED", etc.
 *
 * // Apply for OBA verification
 * const result = await client.phoneNumbers.officialAccount.apply({
 *   business_website_url: "https://example.com",
 *   primary_country_of_operation: "US",
 *   supporting_links: [
 *     "https://wikipedia.org/wiki/Example",
 *     "https://news.example.com/article1",
 *     "https://news.example.com/article2",
 *     "https://forbes.com/example",
 *     "https://linkedin.com/company/example"
 *   ]
 * });
 * ```
 */
export class OfficialAccountResource {
  constructor(private readonly httpClient: HttpClient) {}

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
  async get(
    fields?: string,
    phoneNumberId?: string
  ): Promise<OfficialAccountStatus> {
    const id = this.getPhoneNumberId(phoneNumberId);
    const query = fields ? `?fields=${fields}` : "";
    return this.httpClient.get<OfficialAccountStatus>(
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
  async apply(
    data: OfficialAccountApplyRequest,
    phoneNumberId?: string
  ): Promise<OfficialAccountApplyResponse> {
    const id = this.getPhoneNumberId(phoneNumberId);
    return this.httpClient.post<OfficialAccountApplyResponse>(
      `/${id}/official_business_account`,
      data
    );
  }
}
