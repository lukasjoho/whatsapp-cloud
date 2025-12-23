/**
 * Base error class for WhatsApp API errors
 */
export class WhatsAppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    const captureStackTrace = (Error as any).captureStackTrace;
    if (typeof captureStackTrace === "function") {
      captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error thrown when validation fails (configuration, requests, etc.)
 * Can be used for any Zod validation error
 */
export class WhatsAppValidationError extends WhatsAppError {
  constructor(
    message: string,
    public readonly field?: string,
    public readonly issues?: Array<{
      path: readonly (string | number)[];
      message: string;
    }>
  ) {
    super(message);
    this.name = "WhatsAppValidationError";
  }
}

/**
 * Error thrown when an API request fails
 */
export class WhatsAppAPIError extends WhatsAppError {
  constructor(
    public readonly code: number,
    public readonly type: string,
    message: string,
    public readonly statusCode?: number,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "WhatsAppAPIError";
  }
}

/**
 * Error thrown when rate limit is exceeded
 */
export class WhatsAppRateLimitError extends WhatsAppAPIError {
  constructor(message: string, public readonly retryAfter?: number) {
    super(131056, "rate_limit", message, 429, { retryAfter });
    this.name = "WhatsAppRateLimitError";
  }
}
