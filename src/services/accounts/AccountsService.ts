import type { HttpClient } from "../../client/HttpClient";
import * as getProfileMethod from "./methods/get-profile";
import * as updateProfileMethod from "./methods/update-profile";
import * as listWabasMethod from "./methods/list-wabas";
import * as createWabaMethod from "./methods/create-waba";
import * as getWabaMethod from "./methods/get-waba";
import { PhoneNumbersService } from "./phone-numbers/index";
import type { ProfileResponse } from "../../types/accounts/profile";
import type { UpdateProfileRequest } from "../../types/accounts/profile";
import type { WabaListResponse, WabaResponse } from "../../types/accounts/waba";
import type {
  CreateWabaRequest,
  WabaCreationResponse,
} from "../../types/accounts/waba";

/**
 * Accounts service for managing WhatsApp business accounts
 */
export class AccountsService {
  public readonly phoneNumbers: PhoneNumbersService;

  constructor(private httpClient: HttpClient) {
    this.phoneNumbers = new PhoneNumbersService(this.httpClient);
  }

  /**
   * List WABAs for a business portfolio
   */
  async listWabas(
    businessId: string,
    options?: {
      fields?: string[];
      businessType?: ("ENTERPRISE" | "SMB")[];
      limit?: number;
      after?: string;
      before?: string;
      find?: string;
    }
  ): Promise<WabaListResponse> {
    return listWabasMethod.listWabas(this.httpClient, businessId, options);
  }

  /**
   * Create a new WABA
   */
  async createWaba(
    businessId: string,
    request: CreateWabaRequest
  ): Promise<WabaCreationResponse> {
    return createWabaMethod.createWaba(this.httpClient, businessId, request);
  }

  /**
   * Get a single WABA by ID
   */
  async getWaba(wabaId: string, fields?: string[]): Promise<WabaResponse> {
    return getWabaMethod.getWaba(this.httpClient, wabaId, fields);
  }

  /**
   * Get business profile
   */
  async getProfile(phoneNumberId?: string): Promise<ProfileResponse> {
    return getProfileMethod.getProfile(this.httpClient, phoneNumberId);
  }

  /**
   * Update business profile
   */
  async updateProfile(
    phoneNumberId: string,
    request: UpdateProfileRequest
  ): Promise<ProfileResponse> {
    return updateProfileMethod.updateProfile(
      this.httpClient,
      phoneNumberId,
      request
    );
  }
}
