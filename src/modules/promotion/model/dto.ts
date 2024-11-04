import { z } from "zod";
import { ErrDescriptionMaxLength, ErrDescriptionMinLength } from "./error";
import { PromotionSchema } from "./model";

export const PromotionCreateDTOSchema = PromotionSchema.omit({
  id: true,
});

export type PromotionCreateDTO = z.infer<typeof PromotionCreateDTOSchema>;

export const PromotionUpdateDTOSchema = PromotionCreateDTOSchema.partial();

export type PromotionUpdateDTO = z.infer<typeof PromotionUpdateDTOSchema>;

export const PromotionCondDTOSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(10, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
});

export type PromotionCondDTO = z.infer<typeof PromotionCondDTOSchema>;
