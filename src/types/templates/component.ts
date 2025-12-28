import { z } from "zod";
import {
  templateButtonSchema,
  templateComponentSchema,
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
 * Button types
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
export type TemplateButton = z.infer<typeof templateButtonSchema>;

/**
 * Component types
 */
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
export type TemplateComponent = z.infer<typeof templateComponentSchema>;
