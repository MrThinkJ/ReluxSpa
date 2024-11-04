import { z } from "zod";
import { ErrDescriptionMaxLength, ErrDescriptionMinLength } from "./error";

export const PromotionSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(10, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  discountPercentage: z.number().min(0).max(100),
});

export type Promotion = z.infer<typeof PromotionSchema>;
