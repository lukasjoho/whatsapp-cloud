import type { ClientConfig } from "../types/client";

interface APIErrorResponse {
  error?: {
    message?: string;
    code?: number;
  };
}

/**
 * HTTP client for making requests to the WhatsApp Cloud API
 */
export class HttpClient {
  public readonly baseURL: string;
  public readonly accessToken: string;
  public readonly phoneNumberId?: string;
  public readonly businessAccountId?: string;
  public readonly businessId?: string;
  public readonly apiVersion: string;

  constructor(config: ClientConfig) {
    this.accessToken = config.accessToken;
    if (config.phoneNumberId !== undefined) {
      this.phoneNumberId = config.phoneNumberId;
    }
    if (config.businessAccountId !== undefined) {
      this.businessAccountId = config.businessAccountId;
    }
    if (config.businessId !== undefined) {
      this.businessId = config.businessId;
    }
    this.apiVersion = config.apiVersion ?? "v18.0";
    this.baseURL = config.baseURL ?? "https://graph.facebook.com";
  }

  /**
   * Make a POST request
   */
  async post<T>(path: string, body: unknown): Promise<T> {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = (await response.json().catch(() => ({
        error: {
          message: response.statusText,
          code: response.status,
        },
      }))) as APIErrorResponse;
      throw new Error(
        `API Error: ${error.error?.message || response.statusText} (${
          error.error?.code || response.status
        })`
      );
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a GET request
   */
  async get<T>(path: string): Promise<T> {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      const error = (await response.json().catch(() => ({
        error: {
          message: response.statusText,
          code: response.status,
        },
      }))) as APIErrorResponse;
      throw new Error(
        `API Error: ${error.error?.message || response.statusText} (${
          error.error?.code || response.status
        })`
      );
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a GET request and return binary data (ArrayBuffer)
   * Useful for downloading media files
   */
  async getBinary(path: string): Promise<ArrayBuffer> {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      // Try to parse error response
      let errorMessage = `API Error: ${response.statusText}`;
      try {
        const error = (await response.json()) as APIErrorResponse;
        errorMessage = `API Error: ${
          error.error?.message || response.statusText
        } (${error.error?.code || response.status})`;
      } catch {
        // If JSON parsing fails, use default message
      }
      throw new Error(errorMessage);
    }

    return response.arrayBuffer();
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(path: string, body: unknown): Promise<T> {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = (await response.json().catch(() => ({
        error: {
          message: response.statusText,
          code: response.status,
        },
      }))) as APIErrorResponse;
      throw new Error(
        `API Error: ${error.error?.message || response.statusText} (${
          error.error?.code || response.status
        })`
      );
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(path: string): Promise<T> {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    if (!response.ok) {
      const error = (await response.json().catch(() => ({
        error: {
          message: response.statusText,
          code: response.status,
        },
      }))) as APIErrorResponse;
      throw new Error(
        `API Error: ${error.error?.message || response.statusText} (${
          error.error?.code || response.status
        })`
      );
    }

    return response.json() as Promise<T>;
  }
}
