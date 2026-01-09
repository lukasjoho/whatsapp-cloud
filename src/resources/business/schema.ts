import { z } from "zod";

// =============================================================================
// Business Portfolio Response
// =============================================================================

export const businessSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  timezone_id: z.number().optional(),
});

// =============================================================================
// Get Options (query parameters)
// =============================================================================

export const businessGetOptionsSchema = z.object({
  fields: z.string().optional(),
});
