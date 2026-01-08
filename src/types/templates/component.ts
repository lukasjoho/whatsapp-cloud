import { z } from "zod";
import {
  templateButtonSchema,
  templateComponentSchema,
  // Legacy schemas for backwards compatibility
  templateQuickReplyButtonSchema,
  templateUrlButtonSchema,
  templatePhoneNumberButtonSchema,
  templateCopyCodeButtonSchema,
  templateFlowButtonSchema,
  templateHeaderComponentSchema,
  templateBodyComponentSchema,
  templateFooterComponentSchema,
  templateButtonsComponentSchema,
} from "../../schemas/templates/component";

/**
 * Response types - what API returns
 */
export type TemplateButton = z.infer<typeof templateButtonSchema>;
export type TemplateComponent = z.infer<typeof templateComponentSchema>;

/**
 * Legacy types for backwards compatibility
 * @deprecated Use input types from component-input.ts for requests
 */
export type TemplateQuickReplyButton = z.infer<
  typeof templateQuickReplyButtonSchema
>;
export type TemplateUrlButton = z.infer<typeof templateUrlButtonSchema>;
export type TemplatePhoneNumberButton = z.infer<
  typeof templatePhoneNumberButtonSchema
>;
export type TemplateCopyCodeButton = z.infer<
  typeof templateCopyCodeButtonSchema
>;
export type TemplateFlowButton = z.infer<typeof templateFlowButtonSchema>;
export type TemplateHeaderComponent = z.infer<
  typeof templateHeaderComponentSchema
>;
export type TemplateBodyComponent = z.infer<typeof templateBodyComponentSchema>;
export type TemplateFooterComponent = z.infer<
  typeof templateFooterComponentSchema
>;
export type TemplateButtonsComponent = z.infer<
  typeof templateButtonsComponentSchema
>;
