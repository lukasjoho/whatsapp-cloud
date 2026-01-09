import { z } from "zod";

// =============================================================================
// Enums
// =============================================================================

export const accountReviewStatusSchema = z.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "RESTRICTED",
]);

export const businessVerificationStatusSchema = z.enum([
  "VERIFIED",
  "UNVERIFIED",
  "PENDING",
  "REJECTED",
]);

export const wabaBusinessTypeSchema = z.enum(["ENTERPRISE", "SMB"]);

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
