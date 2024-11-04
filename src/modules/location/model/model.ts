import { z } from "zod";
import {
  ErrLocationNameRequired,
  ErrLocationNameMinLength,
  ErrLocationNameMaxLength,
  ErrAddressRequired,
  ErrAddressMinLength,
  ErrAddressMaxLength,
} from "./error";

export const LocationSchema = z.object({
  id: z.number().optional(),
  locationName: z.string(ErrLocationNameRequired).min(2, ErrLocationNameMinLength).max(100, ErrLocationNameMaxLength),
  address: z.string(ErrAddressRequired).min(5, ErrAddressMinLength).max(255, ErrAddressMaxLength),
});

export type Location = z.infer<typeof LocationSchema>;
