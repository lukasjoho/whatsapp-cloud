import type { z } from "zod";
import type {
  accountReviewStatusSchema,
  businessVerificationStatusSchema,
  wabaBusinessTypeSchema,
  onBehalfOfBusinessInfoSchema,
  cursorPagingSchema,
  wabaSchema,
  wabaListResponseSchema,
  wabaCreateSchema,
  wabaCreateResponseSchema,
  wabaListOptionsSchema,
  subscribedAppSchema,
  subscribedAppsListResponseSchema,
  subscribeAppResponseSchema,
  unsubscribeAppResponseSchema,
} from "./schema";

// =============================================================================
// Enums
// =============================================================================

export type AccountReviewStatus = z.infer<typeof accountReviewStatusSchema>;
export type BusinessVerificationStatus = z.infer<typeof businessVerificationStatusSchema>;
export type WabaBusinessType = z.infer<typeof wabaBusinessTypeSchema>;

// =============================================================================
// Common Components
// =============================================================================

export type OnBehalfOfBusinessInfo = z.infer<typeof onBehalfOfBusinessInfoSchema>;
export type CursorPaging = z.infer<typeof cursorPagingSchema>;

// =============================================================================
// WABA
// =============================================================================

export type Waba = z.infer<typeof wabaSchema>;
export type WabaListResponse = z.infer<typeof wabaListResponseSchema>;
export type WabaCreate = z.infer<typeof wabaCreateSchema>;
export type WabaCreateResponse = z.infer<typeof wabaCreateResponseSchema>;
export type WabaListOptions = z.infer<typeof wabaListOptionsSchema>;

// =============================================================================
// Subscribed Apps
// =============================================================================

export type SubscribedApp = z.infer<typeof subscribedAppSchema>;
export type SubscribedAppsListResponse = z.infer<typeof subscribedAppsListResponseSchema>;
export type SubscribeAppResponse = z.infer<typeof subscribeAppResponseSchema>;
export type UnsubscribeAppResponse = z.infer<typeof unsubscribeAppResponseSchema>;
