import { z } from "zod";
import {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrPriceRequired,
  ErrPriceMin,
  ErrDescriptionShortRequired,
  ErrDescriptionShortMinLength,
  ErrDescriptionShortMaxLength,
  ErrDescription1MinLength,
  ErrDescription1MaxLength,
  ErrDescription2MinLength,
  ErrDescription2MaxLength,
  ErrDurationRequired,
  ErrDurationMin,
  ErrCategoryIdRequired,
} from "./error";

export const ServiceSchema = z.object({
  serviceId: z.number().optional(),
  name: z.string(ErrNameRequired).min(2, ErrNameMinLength).max(100, ErrNameMaxLength),
  price: z.number(ErrPriceRequired).min(0, ErrPriceMin),
  descriptionShort: z
    .string(ErrDescriptionShortRequired)
    .min(10, ErrDescriptionShortMinLength)
    .max(255, ErrDescriptionShortMaxLength),
  description1: z.string().min(10, ErrDescription1MinLength).max(1000, ErrDescription1MaxLength).optional(),
  imageDescription: z.string().optional(),
  description2: z.string().min(10, ErrDescription2MinLength).max(1000, ErrDescription2MaxLength).optional(),
  imageMain: z.string().optional(),
  imageIcon: z.string().optional(),
  duration: z.number(ErrDurationRequired).min(1, ErrDurationMin),
  categoryId: z.number(ErrCategoryIdRequired),
  promotionId: z.number().optional(),
});

export type Service = z.infer<typeof ServiceSchema>;
