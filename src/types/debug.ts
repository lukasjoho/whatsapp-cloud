import { z } from "zod";
import { debugTokenResponseSchema } from "../schemas/debug";

/**
 * Type for debug token response
 */
export type DebugTokenResponse = z.infer<typeof debugTokenResponseSchema>;

