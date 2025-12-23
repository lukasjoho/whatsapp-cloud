import { z } from "zod";
import { clientConfigSchema } from "../schemas/client";

/**
 * Client configuration type
 */
export type ClientConfig = z.infer<typeof clientConfigSchema>;

