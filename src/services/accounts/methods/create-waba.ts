import type { HttpClient } from "../../../client/HttpClient";
import { createWabaRequestSchema } from "../../../schemas/accounts/waba";
import type { CreateWabaRequest } from "../../../types/accounts/waba";
import type { WabaCreationResponse } from "../../../types/accounts/waba";

/**
 * Create a new WABA
 */
export async function createWaba(
  client: HttpClient,
  businessId: string,
  request: CreateWabaRequest
): Promise<WabaCreationResponse> {
  // Validate request with schema
  const validated = createWabaRequestSchema.parse(request);

  return client.post<WabaCreationResponse>(
    `/${businessId}/whatsapp_business_accounts`,
    {
      name: validated.name,
      currency: validated.currency,
      timezone_id: validated.timezone_id,
    }
  );
}

