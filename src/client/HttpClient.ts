import type { ClientConfig } from "./types";
import { GraphAPIError, type GraphAPIErrorResponse } from "../common/errors";

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
   * Handle error responses - preserves FULL API error for debugging
   */
  private async handleError(response: Response): Promise<never> {
    let errorResponse: GraphAPIErrorResponse;

    try {
      errorResponse = (await response.json()) as GraphAPIErrorResponse;
    } catch {
      // If we can't parse JSON, create a minimal error structure
      errorResponse = {
        error: {
          message: response.statusText || "Unknown error",
          type: "HTTPError",
          code: response.status,
        },
      };
    }

    // Ensure the error structure is valid
    if (!errorResponse.error) {
      errorResponse = {
        error: {
          message: JSON.stringify(errorResponse) || "Unknown error",
          type: "UnknownError",
          code: response.status,
        },
      };
    }

    throw new GraphAPIError(errorResponse, response.status);
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
      await this.handleError(response);
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
      await this.handleError(response);
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
      await this.handleError(response);
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
      await this.handleError(response);
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
      await this.handleError(response);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a POST request with form-urlencoded body
   * Used by some Graph API endpoints like assigned_users
   */
  async postForm<T>(path: string, body: Record<string, string | string[]>): Promise<T> {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;

    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(body)) {
      if (Array.isArray(value)) {
        // For arrays, Graph API expects the format: tasks[0]=X&tasks[1]=Y
        value.forEach((v, i) => params.append(`${key}[${i}]`, v));
      } else {
        params.append(key, value);
      }
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      await this.handleError(response);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a DELETE request with form-urlencoded body
   * Used by some Graph API endpoints like assigned_users
   */
  async deleteForm<T>(path: string, body: Record<string, string>): Promise<T> {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;

    const params = new URLSearchParams(body);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: params.toString(),
    });

    if (!response.ok) {
      await this.handleError(response);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Make a DELETE request with JSON body
   * Used by some Graph API endpoints like block_users
   */
  async deleteWithBody<T>(path: string, body: unknown): Promise<T> {
    const url = `${this.baseURL}/${this.apiVersion}${path}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      await this.handleError(response);
    }

    return response.json() as Promise<T>;
  }
}
