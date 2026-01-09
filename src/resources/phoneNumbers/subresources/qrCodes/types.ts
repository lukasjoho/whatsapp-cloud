import type { z } from "zod";
import type {
  qrImageFormatSchema,
  qrCodeSchema,
  qrCodeListResponseSchema,
  qrCodeResponseSchema,
  qrCodeMutationResponseSchema,
  qrCodeDeleteResponseSchema,
  createQrCodeRequestSchema,
  updateQrCodeRequestSchema,
  qrCodeListOptionsSchema,
} from "./schema";

export type QrImageFormat = z.infer<typeof qrImageFormatSchema>;
export type QrCode = z.infer<typeof qrCodeSchema>;
export type QrCodeListResponse = z.infer<typeof qrCodeListResponseSchema>;
export type QrCodeResponse = z.infer<typeof qrCodeResponseSchema>;
export type QrCodeMutationResponse = z.infer<typeof qrCodeMutationResponseSchema>;
export type QrCodeDeleteResponse = z.infer<typeof qrCodeDeleteResponseSchema>;
export type CreateQrCodeRequest = z.infer<typeof createQrCodeRequestSchema>;
export type UpdateQrCodeRequest = z.infer<typeof updateQrCodeRequestSchema>;
export type QrCodeListOptions = z.infer<typeof qrCodeListOptionsSchema>;
