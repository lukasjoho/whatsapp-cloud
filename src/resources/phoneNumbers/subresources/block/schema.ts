import { z } from "zod";

// =============================================================================
// Common
// =============================================================================

export const paginationCursorsSchema = z.object({
  after: z.string().optional(),
  before: z.string().optional(),
});

export const blockPagingSchema = z.object({
  cursors: paginationCursorsSchema.optional(),
});

// =============================================================================
// Blocked User
// =============================================================================

export const blockedUserSchema = z.object({
  messaging_product: z.string().optional(),
  wa_id: z.string().optional(),
});

// =============================================================================
// Request/Response
// =============================================================================

export const blockUserInputSchema = z.object({
  user: z.string(),
});

export const blockUsersRequestSchema = z.object({
  block_users: z.array(blockUserInputSchema),
  messaging_product: z.literal("whatsapp").optional(),
});

export const blockedUserOperationSchema = z.object({
  input: z.string().optional(),
  wa_id: z.string().optional(),
});

export const blockUsersResultSchema = z.object({
  added_users: z.array(blockedUserOperationSchema).optional(),
});

export const unblockUsersResultSchema = z.object({
  removed_users: z.array(blockedUserOperationSchema).optional(),
});

export const listBlockedUsersResponseSchema = z.object({
  data: z.array(blockedUserSchema).optional(),
  paging: blockPagingSchema.optional(),
});

export const blockUsersResponseSchema = z.object({
  block_users: blockUsersResultSchema.optional(),
  messaging_product: z.string().optional(),
});

export const unblockUsersResponseSchema = z.object({
  block_users: unblockUsersResultSchema.optional(),
  messaging_product: z.string().optional(),
});

// =============================================================================
// List Options
// =============================================================================

export const listBlockedUsersOptionsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
});
