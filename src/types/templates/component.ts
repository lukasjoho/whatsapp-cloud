import { z } from "zod";
import {
  buttonSchema,
  componentSchema,
  quickReplyButtonSchema,
  urlButtonSchema,
  phoneNumberButtonSchema,
  copyCodeButtonSchema,
  flowButtonSchema,
  headerComponentSchema,
  bodyComponentSchema,
  footerComponentSchema,
  buttonsComponentSchema,
} from "../../schemas/templates/component";

/**
 * Button types
 */
export type QuickReplyButton = z.infer<typeof quickReplyButtonSchema>;
export type UrlButton = z.infer<typeof urlButtonSchema>;
export type PhoneNumberButton = z.infer<typeof phoneNumberButtonSchema>;
export type CopyCodeButton = z.infer<typeof copyCodeButtonSchema>;
export type FlowButton = z.infer<typeof flowButtonSchema>;
export type Button = z.infer<typeof buttonSchema>;

/**
 * Component types
 */
export type HeaderComponent = z.infer<typeof headerComponentSchema>;
export type BodyComponent = z.infer<typeof bodyComponentSchema>;
export type FooterComponent = z.infer<typeof footerComponentSchema>;
export type ButtonsComponent = z.infer<typeof buttonsComponentSchema>;
export type Component = z.infer<typeof componentSchema>;
