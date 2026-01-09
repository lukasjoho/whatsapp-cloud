import type { z } from "zod";
import type {
  obaStatusSchema,
  officialAccountStatusSchema,
  officialAccountApplyRequestSchema,
  officialAccountApplyResponseSchema,
} from "./schema";

export type ObaStatus = z.infer<typeof obaStatusSchema>;
export type OfficialAccountStatus = z.infer<typeof officialAccountStatusSchema>;
export type OfficialAccountApplyRequest = z.infer<typeof officialAccountApplyRequestSchema>;
export type OfficialAccountApplyResponse = z.infer<typeof officialAccountApplyResponseSchema>;
