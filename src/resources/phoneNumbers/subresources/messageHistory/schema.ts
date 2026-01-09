import { z } from "zod";

// =============================================================================
// Enums
// =============================================================================

/**
 * Message delivery status
 */
export const messageDeliveryStatusSchema = z.enum([
  "SENT",
  "DELIVERED",
  "READ",
  "FAILED",
  "DELETED",
]);

/**
 * State of webhook update delivery
 */
export const webhookUpdateStateSchema = z.enum([
  "PENDING",
  "DELIVERED",
  "FAILED",
  "RETRYING",
]);

// =============================================================================
// Pagination
// =============================================================================

export const messageHistoryCursorsSchema = z.object({
  before: z.string().optional(),
  after: z.string().optional(),
});

export const messageHistoryPagingSchema = z.object({
  cursors: messageHistoryCursorsSchema.optional(),
  previous: z.string().optional(),
  next: z.string().optional(),
});

// =============================================================================
// Delivery Status Event
// =============================================================================

/**
 * Application information for the event
 */
export const eventApplicationSchema = z.object({
  id: z.string().optional(),
});

/**
 * Message delivery status event occurrence
 */
export const messageDeliveryStatusEventSchema = z.object({
  /** Unique identifier for the delivery status event */
  id: z.string(),
  /** Delivery status of the message */
  delivery_status: messageDeliveryStatusSchema,
  /** State of webhook update delivery */
  webhook_update_state: webhookUpdateStateSchema.optional(),
  /** Unix timestamp when the delivery status event occurred */
  timestamp: z.number(),
  /** Application information for the event */
  application: eventApplicationSchema.optional(),
  /** Webhook URI where the event was delivered */
  webhook_uri: z.string().optional(),
  /** Error description if the delivery failed */
  error_description: z.string().optional(),
});

/**
 * Events container with pagination
 */
export const messageEventsSchema = z.object({
  data: z.array(messageDeliveryStatusEventSchema).optional(),
  paging: messageHistoryPagingSchema.optional(),
});

// =============================================================================
// Message History Entry
// =============================================================================

/**
 * WhatsApp message history entry with delivery status information
 */
export const messageHistoryEntrySchema = z.object({
  /** Unique identifier for the message history entry */
  id: z.string(),
  /** WhatsApp message ID (WAMID) for the message */
  message_id: z.string(),
  /** Message delivery status events and occurrences */
  events: messageEventsSchema.optional(),
});

// =============================================================================
// Response
// =============================================================================

/**
 * Paginated response containing message history entries
 */
export const messageHistoryResponseSchema = z.object({
  data: z.array(messageHistoryEntrySchema).optional(),
  paging: messageHistoryPagingSchema.optional(),
});

// =============================================================================
// List Options
// =============================================================================

export const messageHistoryListOptionsSchema = z.object({
  /** Filter results by specific WhatsApp message ID (WAMID) */
  message_id: z.string().optional(),
  /** Comma-separated list of fields to include */
  fields: z.string().optional(),
  /** Maximum number of entries to return (1-100, default 25) */
  limit: z.number().min(1).max(100).optional(),
  /** Cursor for next page */
  after: z.string().optional(),
  /** Cursor for previous page */
  before: z.string().optional(),
});
