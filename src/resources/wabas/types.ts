import type { z } from "zod";
import type {
  accountReviewStatusSchema,
  businessVerificationStatusSchema,
  wabaBusinessTypeSchema,
  ownershipTypeSchema,
  onBehalfOfBusinessInfoSchema,
  cursorPagingSchema,
  wabaSchema,
  wabaListResponseSchema,
  wabaCreateSchema,
  wabaCreateResponseSchema,
  wabaUpdateSchema,
  wabaUpdateResponseSchema,
  wabaListOptionsSchema,
  // Subscribed Apps
  whatsappBusinessApiDataSchema,
  subscribedAppSchema,
  subscribedAppsResponseSchema,
  subscriptionRequestSchema,
  subscriptionResponseSchema,
  // Assigned Users
  permissionTaskSchema,
  assignedUserTypeSchema,
  businessNodeSchema,
  assignedUserSchema,
  assignedUsersSummarySchema,
  assignedUsersResponseSchema,
  assignedUsersListOptionsSchema,
  assignedUserMutationResponseSchema,
  // Activities
  activityTypeSchema,
  actorTypeSchema,
  activitySchema,
  activitiesResponseSchema,
  activitiesListOptionsSchema,
} from "./schema";

// =============================================================================
// Enums
// =============================================================================

export type AccountReviewStatus = z.infer<typeof accountReviewStatusSchema>;
export type BusinessVerificationStatus = z.infer<typeof businessVerificationStatusSchema>;
export type WabaBusinessType = z.infer<typeof wabaBusinessTypeSchema>;
export type OwnershipType = z.infer<typeof ownershipTypeSchema>;

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
export type WabaUpdate = z.infer<typeof wabaUpdateSchema>;
export type WabaUpdateResponse = z.infer<typeof wabaUpdateResponseSchema>;
export type WabaListOptions = z.infer<typeof wabaListOptionsSchema>;

// =============================================================================
// Subscribed Apps
// =============================================================================

export type WhatsAppBusinessApiData = z.infer<typeof whatsappBusinessApiDataSchema>;
export type SubscribedApp = z.infer<typeof subscribedAppSchema>;
export type SubscribedAppsResponse = z.infer<typeof subscribedAppsResponseSchema>;
export type SubscriptionRequest = z.infer<typeof subscriptionRequestSchema>;
export type SubscriptionResponse = z.infer<typeof subscriptionResponseSchema>;

// =============================================================================
// Assigned Users
// =============================================================================

export type PermissionTask = z.infer<typeof permissionTaskSchema>;
export type AssignedUserType = z.infer<typeof assignedUserTypeSchema>;
export type BusinessNode = z.infer<typeof businessNodeSchema>;
export type AssignedUser = z.infer<typeof assignedUserSchema>;
export type AssignedUsersSummary = z.infer<typeof assignedUsersSummarySchema>;
export type AssignedUsersResponse = z.infer<typeof assignedUsersResponseSchema>;
export type AssignedUsersListOptions = z.infer<typeof assignedUsersListOptionsSchema>;
export type AssignedUserMutationResponse = z.infer<typeof assignedUserMutationResponseSchema>;

// =============================================================================
// Activities
// =============================================================================

export type ActivityType = z.infer<typeof activityTypeSchema>;
export type ActorType = z.infer<typeof actorTypeSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type ActivitiesResponse = z.infer<typeof activitiesResponseSchema>;
export type ActivitiesListOptions = z.infer<typeof activitiesListOptionsSchema>;
