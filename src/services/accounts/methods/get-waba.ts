import type { HttpClient } from "../../../client/HttpClient";
import type { WabaResponse } from "../../../types/accounts/waba";

/**
 * Get a single WABA by ID
 */
export async function getWaba(
  client: HttpClient,
  wabaId: string,
  fields?: string[]
): Promise<WabaResponse> {
  const params = new URLSearchParams();
  if (fields && fields.length > 0) {
    params.append("fields", fields.join(","));
  }

  const queryString = params.toString();
  const path = `/${wabaId}${queryString ? `?${queryString}` : ""}`;

  return client.get<WabaResponse>(path);
}

