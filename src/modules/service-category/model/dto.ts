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
import { ServiceCategorySchema } from "./model";

export const ServiceCategoryCreateDTOSchema = ServiceCategorySchema.omit({
  id: true,
});

export type ServiceCategoryCreateDTO = z.infer<typeof ServiceCategoryCreateDTOSchema>;

export const ServiceCategoryUpdateDTOSchema = ServiceCategoryCreateDTOSchema.partial();

export type ServiceCategoryUpdateDTO = z.infer<typeof ServiceCategoryUpdateDTOSchema>;

export const ServiceCategoryCondDTOSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, ErrNameMinLength).max(100, ErrNameMaxLength).optional(),
  descriptionShort: z.string().min(10, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength).optional(),
  typeService: z.string().min(2, ErrTypeServiceMinLength).max(50, ErrTypeServiceMaxLength).optional(),
});

export type ServiceCategoryCondDTO = z.infer<typeof ServiceCategoryCondDTOSchema>;
