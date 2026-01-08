import { z } from "zod";
import {
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
} from "../../schemas/templates/component-input";

/**
 * Button input types (for template creation/update)
 */
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

/**
 * Header input types (by format)
 */
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

/**
 * Other component input types
 */
export type TemplateBodyComponentInput = z.infer<
  typeof templateBodyComponentInputSchema
>;
export type TemplateFooterComponentInput = z.infer<
  typeof templateFooterComponentInputSchema
>;
export type TemplateButtonsComponentInput = z.infer<
  typeof templateButtonsComponentInputSchema
>;

/**
 * Union of all component input types
 */
export type TemplateComponentInput = z.infer<
  typeof templateComponentInputSchema
>;
