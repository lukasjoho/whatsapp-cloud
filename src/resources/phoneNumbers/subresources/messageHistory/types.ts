import type { z } from "zod";
import type {
  messageDeliveryStatusSchema,
  webhookUpdateStateSchema,
  messageDeliveryStatusEventSchema,
  messageHistoryEntrySchema,
  messageHistoryResponseSchema,
  messageHistoryListOptionsSchema,
} from "./schema";

export type MessageDeliveryStatus = z.infer<typeof messageDeliveryStatusSchema>;
export type WebhookUpdateState = z.infer<typeof webhookUpdateStateSchema>;
export type MessageDeliveryStatusEvent = z.infer<typeof messageDeliveryStatusEventSchema>;
export type MessageHistoryEntry = z.infer<typeof messageHistoryEntrySchema>;
export type MessageHistoryResponse = z.infer<typeof messageHistoryResponseSchema>;
export type MessageHistoryListOptions = z.infer<typeof messageHistoryListOptionsSchema>;
