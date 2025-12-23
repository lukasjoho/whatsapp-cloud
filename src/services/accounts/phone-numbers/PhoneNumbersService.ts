import type { HttpClient } from "../../../client/HttpClient";
import * as listMethod from "./methods/list";
import * as getMethod from "./methods/get";
import * as updateMethod from "./methods/update";
import type { PhoneNumberListResponse } from "../../../types/accounts/phone-number";
import type { PhoneNumberResponse } from "../../../types/accounts/phone-number";
import type { UpdatePhoneNumberRequest } from "../../../types/accounts/phone-number";

/**
 * Phone numbers service for managing WhatsApp business phone numbers
 */
export class PhoneNumbersService {
  constructor(private httpClient: HttpClient) {}

  /**
   * List phone numbers for a business account
   */
  async list(businessAccountId?: string): Promise<PhoneNumberListResponse> {
    return listMethod.list(this.httpClient, businessAccountId);
  }

  /**
   * Get phone number details
   */
  async get(phoneNumberId: string): Promise<PhoneNumberResponse> {
    return getMethod.get(this.httpClient, phoneNumberId);
  }

  /**
   * Update phone number
   */
  async update(
    phoneNumberId: string,
    request: UpdatePhoneNumberRequest
  ): Promise<PhoneNumberResponse> {
    return updateMethod.update(this.httpClient, phoneNumberId, request);
  }
}
