/**
 * Graph API Error Response - the FULL structure from Meta's API
 *
 * We preserve everything Meta returns, no fields stripped.
 */
export interface GraphAPIErrorResponse {
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
    [key: string]: unknown; // Preserve any additional fields Meta adds
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
export class GraphAPIError extends Error {
  constructor(
    /** The FULL error response from the Graph API - unmodified */
    public readonly response: GraphAPIErrorResponse,
    /** HTTP status code */
    public readonly statusCode: number
  ) {
    super(response.error.message);
    this.name = "GraphAPIError";
  }
}
