import { z } from "zod";
import {
  ErrLocationNameRequired,
  ErrLocationNameMinLength,
  ErrLocationNameMaxLength,
  ErrAddressRequired,
  ErrAddressMinLength,
  ErrAddressMaxLength,
} from "./error";
import { LocationSchema } from "./model";

export const LocationCreateDTOSchema = LocationSchema.omit({
  id: true,
});

export type LocationCreateDTO = z.infer<typeof LocationCreateDTOSchema>;

export const LocationUpdateDTOSchema = LocationCreateDTOSchema.partial();

export type LocationUpdateDTO = z.infer<typeof LocationUpdateDTOSchema>;

export const LocationCondDTOSchema = z.object({
  id: z.number().optional(),
  locationName: z.string().min(2, ErrLocationNameMinLength).max(100, ErrLocationNameMaxLength).optional(),
  address: z.string().min(5, ErrAddressMinLength).max(255, ErrAddressMaxLength).optional(),
});

export type LocationCondDTO = z.infer<typeof LocationCondDTOSchema>;
