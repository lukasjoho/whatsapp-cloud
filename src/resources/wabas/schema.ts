import { z } from "zod";

// =============================================================================
// Enums
// =============================================================================

export const accountReviewStatusSchema = z.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "RESTRICTED",
  "LIMIT_REACHED",
]);

export const businessVerificationStatusSchema = z.enum([
  "VERIFIED",
  "UNVERIFIED",
  "PENDING",
  "REJECTED",
]);

export const wabaBusinessTypeSchema = z.enum(["ENTERPRISE", "SMB"]);

export const ownershipTypeSchema = z.enum([
  "OWNED_BY_BUSINESS_PORTFOLIO",
  "OWNED_BY_BUSINESS_ASSET_GROUP",
]);

// =============================================================================
// Common Components
// =============================================================================

export const onBehalfOfBusinessInfoSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export const cursorPagingSchema = z.object({
  cursors: z
    .object({
      before: z.string().optional(),
      after: z.string().optional(),
    })
    .optional(),
  previous: z.string().optional(),
  next: z.string().optional(),
});

// =============================================================================
// WABA Response
// =============================================================================

export const wabaSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  account_review_status: accountReviewStatusSchema.optional(),
  purchase_order_number: z.string().optional(),
  currency: z.string().optional(),
  timezone_id: z.string().optional(),
  business_verification_status: businessVerificationStatusSchema.optional(),
  country: z.string().optional(),
  ownership_type: ownershipTypeSchema.optional(),
  primary_business_location: z.string().optional(),
  on_behalf_of_business_info: onBehalfOfBusinessInfoSchema.optional(),
  is_enabled_for_insights: z.boolean().optional(),
  message_template_namespace: z.string().optional(),
});

// =============================================================================
// List WABAs Response
// =============================================================================

export const wabaListResponseSchema = z.object({
  data: z.array(wabaSchema),
  paging: cursorPagingSchema.optional(),
});

// =============================================================================
// Create WABA
// =============================================================================

export const wabaCreateSchema = z.object({
  name: z.string(),
  primary_funding_id: z.string().optional(),
  purchase_order_number: z.string().optional(),
  currency: z.string().optional(),
  timezone_id: z.number().optional(),
  business_type: wabaBusinessTypeSchema.optional(),
  on_behalf_of_business_id: z.string().optional(),
});

export const wabaCreateResponseSchema = z.object({
  id: z.string(),
  payment_account_id: z.string().optional(),
});

// =============================================================================
// Update WABA
// =============================================================================

export const wabaUpdateSchema = z.object({
  name: z.string().optional(),
  timezone_id: z.number().optional(),
});

export const wabaUpdateResponseSchema = z.object({
  success: z.boolean(),
});

// =============================================================================
// List Options (query parameters)
// =============================================================================

export const wabaListOptionsSchema = z.object({
  fields: z.string().optional(),
  business_type: z.array(wabaBusinessTypeSchema).optional(),
  limit: z.number().min(1).max(100).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
});

// =============================================================================
// Subscribed Apps
// =============================================================================

/**
 * Application subscription data for WhatsApp Business Account
 */
export const whatsappBusinessApiDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  link: z.string().optional(),
});

/**
 * Subscribed application details
 * @see GET /{WABA-ID}/subscribed_apps
 */
export const subscribedAppSchema = z.object({
  whatsapp_business_api_data: whatsappBusinessApiDataSchema,
  override_callback_uri: z.string().optional(),
});

/**
 * Response containing list of subscribed applications
 */
export const subscribedAppsResponseSchema = z.object({
  data: z.array(subscribedAppSchema),
});

/**
 * Request body for subscribing to WABA webhooks
 * @see POST /{WABA-ID}/subscribed_apps
 */
export const subscriptionRequestSchema = z.object({
  /** Custom webhook callback URL to override app default */
  override_callback_uri: z.string().optional(),
  /** Verification token for webhook security */
  verify_token: z.string().optional(),
});

/**
 * Response after successful subscription operation
 */
export const subscriptionResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(subscribedAppSchema).optional(),
});

// =============================================================================
// Assigned Users
// =============================================================================

/**
 * Permission tasks for WhatsApp Business Account access
 * @see POST /{WABA-ID}/assigned_users
 */
export const permissionTaskSchema = z.enum([
  "MANAGE",
  "DEVELOP",
  "MANAGE_TEMPLATES",
  "MANAGE_PHONE",
  "VIEW_COST",
  "MANAGE_EXTENSIONS",
  "VIEW_PHONE_ASSETS",
  "MANAGE_PHONE_ASSETS",
  "VIEW_TEMPLATES",
  "VIEW_INSIGHTS",
  "RECEIVE_INCOMING_MESSAGES",
  "MANAGE_BILLING",
  "MANAGE_USERS",
  "MESSAGING",
  "FULL_CONTROL",
]);

/**
 * Type of user assignment
 */
export const assignedUserTypeSchema = z.enum([
  "BUSINESS_USER",
  "SYSTEM_USER",
  "PERSONAL_USER",
]);

/**
 * Business entity associated with the user
 */
export const businessNodeSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

/**
 * User assigned to WhatsApp Business Account
 */
export const assignedUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  business: businessNodeSchema.optional(),
  user_type: assignedUserTypeSchema.optional(),
});

/**
 * Summary information about assigned users
 */
export const assignedUsersSummarySchema = z.object({
  total_count: z.number().optional(),
});

/**
 * Response from listing assigned users
 */
export const assignedUsersResponseSchema = z.object({
  data: z.array(assignedUserSchema),
  paging: cursorPagingSchema.optional(),
  summary: assignedUsersSummarySchema.optional(),
});

/**
 * Options for listing assigned users
 */
export const assignedUsersListOptionsSchema = z.object({
  fields: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
});

/**
 * Response from adding/removing assigned user
 */
export const assignedUserMutationResponseSchema = z.object({
  success: z.boolean(),
});

// =============================================================================
// Activities
// =============================================================================

/**
 * Type of activity performed on the WhatsApp Business Account
 */
export const activityTypeSchema = z.enum([
  "ACCOUNT_CREATED",
  "ACCOUNT_UPDATED",
  "ACCOUNT_DELETED",
  "PHONE_NUMBER_ADDED",
  "PHONE_NUMBER_REMOVED",
  "PHONE_NUMBER_VERIFIED",
  "USER_ADDED",
  "USER_REMOVED",
  "USER_ROLE_CHANGED",
  "PERMISSION_GRANTED",
  "PERMISSION_REVOKED",
  "TEMPLATE_CREATED",
  "TEMPLATE_UPDATED",
  "TEMPLATE_DELETED",
  "WEBHOOK_CONFIGURED",
  "API_ACCESS_GRANTED",
  "API_ACCESS_REVOKED",
  "BILLING_UPDATED",
  "COMPLIANCE_ACTION",
  "SECURITY_EVENT",
]);

/**
 * Type of entity that performed the activity
 */
export const actorTypeSchema = z.enum([
  "USER",
  "SYSTEM",
  "API",
  "ADMIN",
  "AUTOMATED_PROCESS",
]);

/**
 * WhatsApp Business Account activity record
 */
export const activitySchema = z.object({
  id: z.string(),
  activity_type: activityTypeSchema,
  timestamp: z.string(),
  actor_type: actorTypeSchema,
  actor_id: z.string().optional(),
  actor_name: z.string().optional(),
  description: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
});

/**
 * Response from listing activities
 */
export const activitiesResponseSchema = z.object({
  data: z.array(activitySchema),
  paging: cursorPagingSchema.optional(),
});

/**
 * Options for listing activities
 */
export const activitiesListOptionsSchema = z.object({
  fields: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
  since: z.string().optional(),
  until: z.string().optional(),
  activity_type: z.string().optional(),
});
