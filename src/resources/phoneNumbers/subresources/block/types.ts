import type { z } from "zod";
import type {
  blockedUserSchema,
  blockedUserOperationSchema,
  listBlockedUsersResponseSchema,
  blockUsersResponseSchema,
  unblockUsersResponseSchema,
  listBlockedUsersOptionsSchema,
} from "./schema";

export type BlockedUser = z.infer<typeof blockedUserSchema>;
export type BlockedUserOperation = z.infer<typeof blockedUserOperationSchema>;
export type ListBlockedUsersResponse = z.infer<typeof listBlockedUsersResponseSchema>;
export type BlockUsersResponse = z.infer<typeof blockUsersResponseSchema>;
export type UnblockUsersResponse = z.infer<typeof unblockUsersResponseSchema>;
export type ListBlockedUsersOptions = z.infer<typeof listBlockedUsersOptionsSchema>;
