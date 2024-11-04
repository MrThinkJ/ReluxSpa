import { z } from "zod";
import {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrDescriptionRequired,
  ErrDescriptionMinLength,
  ErrDescriptionMaxLength,
  ErrTypeServiceRequired,
  ErrTypeServiceMinLength,
  ErrTypeServiceMaxLength,
} from "./error";

export const ServiceCategorySchema = z.object({
  id: z.number().optional(),
  name: z.string(ErrNameRequired).min(2, ErrNameMinLength).max(100, ErrNameMaxLength),
  descriptionShort: z.string(ErrDescriptionRequired).min(10, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength),
  typeService: z.string(ErrTypeServiceRequired).min(2, ErrTypeServiceMinLength).max(50, ErrTypeServiceMaxLength),
});

export type ServiceCategory = z.infer<typeof ServiceCategorySchema>;
