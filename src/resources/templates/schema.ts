import { z } from "zod";

// =============================================================================
// Language Schema
// =============================================================================

/**
 * Supported WhatsApp template languages
 */
export const templateLanguageSchema = z.enum([
  "af", // Afrikaans
  "sq", // Albanian
  "ar", // Arabic
  "ar_EG", // Arabic (Egypt)
  "ar_AE", // Arabic (UAE)
  "ar_LB", // Arabic (Lebanon)
  "ar_MA", // Arabic (Morocco)
  "ar_QA", // Arabic (Qatar)
  "az", // Azerbaijani
  "be_BY", // Belarusian
  "bn", // Bengali
  "bn_IN", // Bengali (India)
  "bg", // Bulgarian
  "ca", // Catalan
  "zh_CN", // Chinese (China)
  "zh_HK", // Chinese (Hong Kong)
  "zh_TW", // Chinese (Taiwan)
  "hr", // Croatian
  "cs", // Czech
  "da", // Danish
  "prs_AF", // Dari
  "nl", // Dutch
  "nl_BE", // Dutch (Belgium)
  "en", // English
  "en_GB", // English (UK)
  "en_US", // English (US)
  "en_AE", // English (UAE)
  "en_AU", // English (Australia)
  "en_CA", // English (Canada)
  "en_GH", // English (Ghana)
  "en_IE", // English (Ireland)
  "en_IN", // English (India)
  "en_JM", // English (Jamaica)
  "en_MY", // English (Malaysia)
  "en_NZ", // English (New Zealand)
  "en_QA", // English (Qatar)
  "en_SG", // English (Singapore)
  "en_UG", // English (Uganda)
  "en_ZA", // English (South Africa)
  "et", // Estonian
  "fil", // Filipino
  "fi", // Finnish
  "fr", // French
  "fr_BE", // French (Belgium)
  "fr_CA", // French (Canada)
  "fr_CH", // French (Switzerland)
  "fr_CI", // French (Ivory Coast)
  "fr_MA", // French (Morocco)
  "ka", // Georgian
  "de", // German
  "de_AT", // German (Austria)
  "de_CH", // German (Switzerland)
  "el", // Greek
  "gu", // Gujarati
  "ha", // Hausa
  "he", // Hebrew
  "hi", // Hindi
  "hu", // Hungarian
  "id", // Indonesian
  "ga", // Irish
  "it", // Italian
  "ja", // Japanese
  "kn", // Kannada
  "kk", // Kazakh
  "rw_RW", // Kinyarwanda
  "ko", // Korean
  "ky_KG", // Kyrgyz
  "lo", // Lao
  "lv", // Latvian
  "lt", // Lithuanian
  "mk", // Macedonian
  "ms", // Malay
  "ml", // Malayalam
  "mr", // Marathi
  "nb", // Norwegian
  "ps_AF", // Pashto
  "fa", // Persian
  "pl", // Polish
  "pt_BR", // Portuguese (Brazil)
  "pt_PT", // Portuguese (Portugal)
  "pa", // Punjabi
  "ro", // Romanian
  "ru", // Russian
  "sr", // Serbian
  "si_LK", // Sinhala
  "sk", // Slovak
  "sl", // Slovenian
  "es", // Spanish
  "es_AR", // Spanish (Argentina)
  "es_CL", // Spanish (Chile)
  "es_CO", // Spanish (Colombia)
  "es_CR", // Spanish (Costa Rica)
  "es_DO", // Spanish (Dominican Republic)
  "es_EC", // Spanish (Ecuador)
  "es_HN", // Spanish (Honduras)
  "es_MX", // Spanish (Mexico)
  "es_PA", // Spanish (Panama)
  "es_PE", // Spanish (Peru)
  "es_ES", // Spanish (Spain)
  "es_UY", // Spanish (Uruguay)
  "sw", // Swahili
  "sv", // Swedish
  "ta", // Tamil
  "te", // Telugu
  "th", // Thai
  "tr", // Turkish
  "uk", // Ukrainian
  "ur", // Urdu
  "uz", // Uzbek
  "vi", // Vietnamese
  "zu", // Zulu
]);

// =============================================================================
// Category Schema
// =============================================================================

export const templateCategorySchema = z.enum([
  "AUTHENTICATION",
  "MARKETING",
  "UTILITY",
]);

// =============================================================================
// Parameter Format Schema
// =============================================================================

/**
 * Parameter format for template variables
 * - "positional": Variables use {{1}}, {{2}}, etc.
 * - "named": Variables use {{name}}, {{order_number}}, etc.
 */
export const templateParameterFormatSchema = z.enum(["positional", "named"]);

// =============================================================================
// Status Schema (Response)
// =============================================================================

export const templateStatusSchema = z.enum([
  "APPROVED",
  "PENDING",
  "REJECTED",
  "PAUSED",
  "DISABLED",
  "IN_APPEAL",
  "PENDING_DELETION",
  "DELETED",
  "LIMIT_EXCEEDED",
]);

// =============================================================================
// Quality Score Schema (Response)
// =============================================================================

export const templateQualityScoreSchema = z.object({
  score: z.enum(["GREEN", "YELLOW", "RED", "UNKNOWN"]).optional(),
  date: z.number().optional(),
});

// =============================================================================
// Named Parameter Example Schema
// =============================================================================

/**
 * Named parameter example (for parameter_format: "named")
 */
export const templateNamedParamExampleSchema = z.object({
  param_name: z.string(),
  example: z.string(),
});

// =============================================================================
// Button Input Schemas
// =============================================================================

export const templateQuickReplyButtonInputSchema = z.object({
  type: z.literal("QUICK_REPLY"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
});

export const templateUrlButtonInputSchema = z.object({
  type: z.literal("URL"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  url: z.string().url().max(2000, "URL must be 2000 characters or less"),
  example: z.array(z.string()).optional(),
});

export const templatePhoneNumberButtonInputSchema = z.object({
  type: z.literal("PHONE_NUMBER"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  phone_number: z
    .string()
    .min(1)
    .max(20, "Phone number must be 20 characters or less"),
});

export const templateCopyCodeButtonInputSchema = z.object({
  type: z.literal("COPY_CODE"),
  example: z.string().max(15).optional(),
});

export const templateFlowButtonInputSchema = z.object({
  type: z.literal("FLOW"),
  text: z.string().min(1).max(25, "Button text must be 25 characters or less"),
  flow_id: z.string().optional(),
  flow_action: z.enum(["navigate", "data_exchange"]).optional(),
  navigate_screen: z.string().optional(),
});

export const templateButtonInputSchema = z.discriminatedUnion("type", [
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema,
]);

// =============================================================================
// Component Input Schemas
// =============================================================================

/**
 * Header text example schema
 * Supports both positional and named parameter formats
 */
export const templateHeaderTextExampleSchema = z.object({
  // Positional: header_text: ["value1"]
  header_text: z.array(z.string()).optional(),
  // Named: header_text_named_params: [{ param_name: "name", example: "value" }]
  header_text_named_params: z.array(templateNamedParamExampleSchema).optional(),
});

export const templateHeaderTextInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.literal("TEXT"),
  text: z.string().min(1).max(60, "Header text must be 60 characters or less"),
  example: templateHeaderTextExampleSchema.optional(),
});

export const templateHeaderMediaInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.enum(["IMAGE", "VIDEO", "DOCUMENT"]),
  example: z.object({
    header_handle: z
      .array(z.string())
      .min(1, "At least one header_handle is required"),
  }),
});

export const templateHeaderLocationInputSchema = z.object({
  type: z.literal("HEADER"),
  format: z.literal("LOCATION"),
});

export const templateHeaderComponentInputSchema = z.discriminatedUnion(
  "format",
  [
    templateHeaderTextInputSchema,
    templateHeaderMediaInputSchema,
    templateHeaderLocationInputSchema,
  ]
);

/**
 * Body example schema
 * Supports both positional and named parameter formats
 */
export const templateBodyExampleSchema = z.object({
  // Positional: body_text: [["value1", "value2"]]
  body_text: z.array(z.array(z.string())).optional(),
  // Named: body_text_named_params: [{ param_name: "name", example: "value" }]
  body_text_named_params: z.array(templateNamedParamExampleSchema).optional(),
});

export const templateBodyComponentInputSchema = z.object({
  type: z.literal("BODY"),
  text: z
    .string()
    .min(1)
    .max(1024, "Body text must be 1024 characters or less"),
  example: templateBodyExampleSchema.optional(),
});

export const templateFooterComponentInputSchema = z.object({
  type: z.literal("FOOTER"),
  text: z.string().min(1).max(60, "Footer text must be 60 characters or less"),
});

export const templateButtonsComponentInputSchema = z.object({
  type: z.literal("BUTTONS"),
  buttons: z
    .array(templateButtonInputSchema)
    .min(1)
    .max(10, "Maximum 10 buttons allowed"),
});

export const templateComponentInputSchema = z.union([
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema,
]);

// =============================================================================
// Component Response Schemas (permissive for API responses)
// =============================================================================

export const templateButtonSchema = z.object({
  type: z.string(),
  text: z.string().optional(),
  url: z.string().optional(),
  phone_number: z.string().optional(),
  example: z.union([z.array(z.string()), z.string()]).optional(),
  flow_id: z.string().optional(),
  flow_action: z.string().optional(),
  navigate_screen: z.string().optional(),
});

export const templateComponentSchema = z.object({
  type: z.enum(["HEADER", "BODY", "FOOTER", "BUTTONS"]),
  format: z.string().optional(),
  text: z.string().optional(),
  buttons: z.array(templateButtonSchema).optional(),
  example: z
    .object({
      header_text: z.array(z.string()).optional(),
      header_text_named_params: z
        .array(templateNamedParamExampleSchema)
        .optional(),
      header_handle: z.array(z.string()).optional(),
      body_text: z.array(z.array(z.string())).optional(),
      body_text_named_params: z
        .array(templateNamedParamExampleSchema)
        .optional(),
    })
    .optional(),
});

// =============================================================================
// Request Schemas (Input)
// =============================================================================

type ComponentArray = z.infer<typeof templateComponentInputSchema>[];

const hasBody = (components: ComponentArray) =>
  components.some((c) => c.type === "BODY");

const hasMaxOneHeader = (components: ComponentArray) =>
  components.filter((c) => c.type === "HEADER").length <= 1;

const hasMaxOneFooter = (components: ComponentArray) =>
  components.filter((c) => c.type === "FOOTER").length <= 1;

const hasMaxOneButtons = (components: ComponentArray) =>
  components.filter((c) => c.type === "BUTTONS").length <= 1;

const baseComponentsSchema = z
  .array(templateComponentInputSchema)
  .min(1, "At least one component is required")
  .refine(hasBody, { message: "BODY component is required" })
  .refine(hasMaxOneHeader, { message: "Only one HEADER component is allowed" })
  .refine(hasMaxOneFooter, { message: "Only one FOOTER component is allowed" })
  .refine(hasMaxOneButtons, {
    message: "Only one BUTTONS component is allowed",
  });

const templateNameSchema = z
  .string()
  .min(1, "Template name is required")
  .max(512, "Template name must be 512 characters or less");

export const templateCreateMarketingSchema = z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z.literal("MARKETING"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema,
});

export const templateCreateUtilitySchema = z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z.literal("UTILITY"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: baseComponentsSchema,
});

export const templateCreateAuthenticationSchema = z.object({
  name: templateNameSchema,
  language: templateLanguageSchema,
  category: z.literal("AUTHENTICATION"),
  parameter_format: templateParameterFormatSchema.optional(),
  components: z
    .array(templateComponentInputSchema)
    .min(1, "At least one component is required")
    .refine(hasBody, { message: "BODY component is required" }),
});

export const templateCreateSchema = z.discriminatedUnion("category", [
  templateCreateMarketingSchema,
  templateCreateUtilitySchema,
  templateCreateAuthenticationSchema,
]);

export const templateUpdateSchema = z.object({
  category: templateCategorySchema.optional(),
  components: z.array(templateComponentInputSchema).optional(),
  language: templateLanguageSchema.optional(),
  name: z.string().min(1).max(512).optional(),
});

export const templateListSchema = z.object({
  name: z.string().optional(),
  limit: z.number().min(1).max(1000).optional(),
  after: z.string().optional(),
  before: z.string().optional(),
});

export const templateDeleteSchema = z
  .object({
    name: z.string().optional(),
    hsm_id: z.string().optional(),
  })
  .refine((data) => data.name || data.hsm_id, {
    message: "Either name or hsm_id must be provided",
  });

// =============================================================================
// Response Schemas
// =============================================================================

export const templateSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
  components: z.array(templateComponentSchema),
  parameter_format: templateParameterFormatSchema.optional(),
  quality_score: templateQualityScoreSchema.optional(),
  rejected_reason: z.string().optional(),
  previous_category: z.string().optional(),
});

export const templateCreateResponseSchema = z.object({
  id: z.string(),
  status: templateStatusSchema,
  category: templateCategorySchema,
});

export const templatePagingCursorsSchema = z.object({
  before: z.string().optional(),
  after: z.string().optional(),
});

export const templatePagingSchema = z.object({
  cursors: templatePagingCursorsSchema.optional(),
  next: z.string().optional(),
  previous: z.string().optional(),
});

export const templateListResponseSchema = z.object({
  data: z.array(templateSchema),
  paging: templatePagingSchema.optional(),
});

export const templateUpdateResponseSchema = z.object({
  success: z.boolean(),
});

export const templateDeleteResponseSchema = z.object({
  success: z.boolean(),
});
