import { z } from "zod";

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Role = z.infer<typeof RoleSchema>;

export const RoleCondDTO = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
});
export type RoleCondDTO = z.infer<typeof RoleCondDTO>;
