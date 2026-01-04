import { z } from "zod";
import { templateLanguageSchema } from "../../schemas/templates/language";

/**
 * Type for WhatsApp template language codes
 */
export type TemplateLanguage = z.infer<typeof templateLanguageSchema>;


