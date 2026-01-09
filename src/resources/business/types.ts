import type { z } from "zod";
import type { businessSchema, businessGetOptionsSchema } from "./schema";

// =============================================================================
// Business Portfolio
// =============================================================================

export type Business = z.infer<typeof businessSchema>;
export type BusinessGetOptions = z.infer<typeof businessGetOptionsSchema>;
