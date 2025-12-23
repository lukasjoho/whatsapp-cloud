import type { HttpClient } from "../../../client/HttpClient";
import type { WabaListResponse } from "../../../types/accounts/waba";

/**
 * List WABAs for a business portfolio
 */
export async function listWabas(
  client: HttpClient,
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
  const params = new URLSearchParams();

  if (options?.fields) {
    params.append("fields", options.fields.join(","));
  }
  if (options?.businessType) {
    options.businessType.forEach((type) => {
      params.append("business_type[]", type);
    });
  }
  if (options?.limit) {
    params.append("limit", options.limit.toString());
  }
  if (options?.after) {
    params.append("after", options.after);
  }
  if (options?.before) {
    params.append("before", options.before);
  }
  if (options?.find) {
    params.append("find", options.find);
  }

  const queryString = params.toString();
  const path = `/${businessId}/whatsapp_business_accounts${
    queryString ? `?${queryString}` : ""
  }`;

  return client.get<WabaListResponse>(path);
}

