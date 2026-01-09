import type { z } from "zod";
import type { clientConfigSchema, debugTokenResponseSchema } from "./schema";

// =============================================================================
// Client Config
// =============================================================================

export type ClientConfig = z.infer<typeof clientConfigSchema>;

// =============================================================================
// Debug Token Response
// =============================================================================

export type DebugTokenResponse = z.infer<typeof debugTokenResponseSchema>;
