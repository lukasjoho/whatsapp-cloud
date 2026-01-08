import { z } from "zod";
import {
  // Language, Category, Parameter Format
  templateLanguageSchema,
  templateCategorySchema,
  templateParameterFormatSchema,
  templateStatusSchema,
  templateQualityScoreSchema,
  // Named param example
  templateNamedParamExampleSchema,
  // Component example schemas
  templateHeaderTextExampleSchema,
  templateBodyExampleSchema,
  // Component inputs
  templateQuickReplyButtonInputSchema,
  templateUrlButtonInputSchema,
  templatePhoneNumberButtonInputSchema,
  templateCopyCodeButtonInputSchema,
  templateFlowButtonInputSchema,
  templateButtonInputSchema,
  templateHeaderTextInputSchema,
  templateHeaderMediaInputSchema,
  templateHeaderLocationInputSchema,
  templateHeaderComponentInputSchema,
  templateBodyComponentInputSchema,
  templateFooterComponentInputSchema,
  templateButtonsComponentInputSchema,
  templateComponentInputSchema,
  // Component responses
  templateButtonSchema,
  templateComponentSchema,
  // Request schemas
  templateCreateSchema,
  templateUpdateSchema,
  templateListSchema,
  templateDeleteSchema,
  // Response schemas
  templateSchema,
  templateCreateResponseSchema,
  templateListResponseSchema,
  templateUpdateResponseSchema,
  templateDeleteResponseSchema,
  templatePagingSchema,
  templatePagingCursorsSchema,
} from "./schema";

// =============================================================================
// Enums & Shared Types
// =============================================================================

/**
 * Supported WhatsApp template language codes
 */
export type TemplateLanguage = z.infer<typeof templateLanguageSchema>;

/**
 * Template category
 */
export type TemplateCategory = z.infer<typeof templateCategorySchema>;

/**
 * Parameter format for template variables
 * - "positional": Variables use {{1}}, {{2}}, etc.
 * - "named": Variables use {{name}}, {{order_number}}, etc.
 */
export type TemplateParameterFormat = z.infer<
  typeof templateParameterFormatSchema
>;

/**
 * Template approval status
 */
export type TemplateStatus = z.infer<typeof templateStatusSchema>;

/**
 * Template quality score (returned by API)
 */
export type TemplateQualityScore = z.infer<typeof templateQualityScoreSchema>;

// =============================================================================
// Named Parameter Example Types
// =============================================================================

/**
 * Named parameter example for use with parameter_format: "named"
 *
 * @example
 * ```typescript
 * const param: TemplateNamedParamExample = {
 *   param_name: "first_name",
 *   example: "Pablo"
 * };
 * ```
 */
export type TemplateNamedParamExample = z.infer<
  typeof templateNamedParamExampleSchema
>;

/**
 * Header text example (supports positional and named formats)
 */
export type TemplateHeaderTextExample = z.infer<
  typeof templateHeaderTextExampleSchema
>;

/**
 * Body example (supports positional and named formats)
 */
export type TemplateBodyExample = z.infer<typeof templateBodyExampleSchema>;

// =============================================================================
// Component Input Types (for creating/updating templates)
// =============================================================================

// Button inputs
export type TemplateQuickReplyButtonInput = z.infer<
  typeof templateQuickReplyButtonInputSchema
>;
export type TemplateUrlButtonInput = z.infer<
  typeof templateUrlButtonInputSchema
>;
export type TemplatePhoneNumberButtonInput = z.infer<
  typeof templatePhoneNumberButtonInputSchema
>;
export type TemplateCopyCodeButtonInput = z.infer<
  typeof templateCopyCodeButtonInputSchema
>;
export type TemplateFlowButtonInput = z.infer<
  typeof templateFlowButtonInputSchema
>;
export type TemplateButtonInput = z.infer<typeof templateButtonInputSchema>;

// Header inputs (by format)
export type TemplateHeaderTextInput = z.infer<
  typeof templateHeaderTextInputSchema
>;
export type TemplateHeaderMediaInput = z.infer<
  typeof templateHeaderMediaInputSchema
>;
export type TemplateHeaderLocationInput = z.infer<
  typeof templateHeaderLocationInputSchema
>;
export type TemplateHeaderComponentInput = z.infer<
  typeof templateHeaderComponentInputSchema
>;

// Other component inputs
export type TemplateBodyComponentInput = z.infer<
  typeof templateBodyComponentInputSchema
>;
export type TemplateFooterComponentInput = z.infer<
  typeof templateFooterComponentInputSchema
>;
export type TemplateButtonsComponentInput = z.infer<
  typeof templateButtonsComponentInputSchema
>;

// Union of all component inputs
export type TemplateComponentInput = z.infer<
  typeof templateComponentInputSchema
>;

// =============================================================================
// Component Response Types (what API returns)
// =============================================================================

/**
 * Button as returned by the API
 */
export type TemplateButton = z.infer<typeof templateButtonSchema>;

/**
 * Component as returned by the API
 */
export type TemplateComponent = z.infer<typeof templateComponentSchema>;

// =============================================================================
// Request Types (Input) - Action follows Resource name
// =============================================================================

/**
 * Input for creating a template
 *
 * @example Positional parameters (default)
 * ```typescript
 * const input: TemplateCreate = {
 *   name: "order_confirmation",
 *   category: "UTILITY",
 *   language: "en_US",
 *   components: [
 *     {
 *       type: "BODY",
 *       text: "Hi {{1}}! Your order {{2}} is confirmed.",
 *       example: { body_text: [["Pablo", "860198-230332"]] }
 *     }
 *   ]
 * };
 * ```
 *
 * @example Named parameters
 * ```typescript
 * const input: TemplateCreate = {
 *   name: "order_confirmation",
 *   category: "UTILITY",
 *   language: "en_US",
 *   parameter_format: "named",
 *   components: [
 *     {
 *       type: "BODY",
 *       text: "Hi {{first_name}}! Your order {{order_number}} is confirmed.",
 *       example: {
 *         body_text_named_params: [
 *           { param_name: "first_name", example: "Pablo" },
 *           { param_name: "order_number", example: "860198-230332" }
 *         ]
 *       }
 *     }
 *   ]
 * };
 * ```
 */
export type TemplateCreate = z.infer<typeof templateCreateSchema>;

/**
 * Input for updating a template
 */
export type TemplateUpdate = z.infer<typeof templateUpdateSchema>;

/**
 * Input for listing templates (query params)
 */
export type TemplateList = z.infer<typeof templateListSchema>;

/**
 * Input for deleting a template
 */
export type TemplateDelete = z.infer<typeof templateDeleteSchema>;

// =============================================================================
// Response Types - Regular names for what API returns
// =============================================================================

/**
 * A WhatsApp message template
 */
export type Template = z.infer<typeof templateSchema>;

/**
 * Response after creating a template
 */
export type TemplateCreateResponse = z.infer<
  typeof templateCreateResponseSchema
>;

/**
 * Response containing list of templates with pagination
 */
export type TemplateListResponse = z.infer<typeof templateListResponseSchema>;

/**
 * Response after updating a template
 */
export type TemplateUpdateResponse = z.infer<
  typeof templateUpdateResponseSchema
>;

/**
 * Response after deleting a template
 */
export type TemplateDeleteResponse = z.infer<
  typeof templateDeleteResponseSchema
>;

/**
 * Pagination info for list responses
 */
export type TemplatePaging = z.infer<typeof templatePagingSchema>;

/**
 * Pagination cursors
 */
export type TemplatePagingCursors = z.infer<typeof templatePagingCursorsSchema>;
