import { z } from "zod";
import {
  ErrDayOfWeekRequired,
  ErrDayOfWeekMinLength,
  ErrDayOfWeekMaxLength,
  ErrStartTimeRequired,
  ErrEndTimeRequired,
  ErrEndTimeBeforeStartTime,
} from "./error";

export const WorkScheduleSchema = z.object({
  id: z.number().optional(),
  dayOfWeek: z.string(ErrDayOfWeekRequired).min(2, ErrDayOfWeekMinLength).max(50, ErrDayOfWeekMaxLength),
  startTime: z.string(ErrStartTimeRequired),
  endTime: z.string(ErrEndTimeRequired),
  isAvailable: z.boolean().default(true),
});

export type WorkSchedule = z.infer<typeof WorkScheduleSchema>;

export const WorkScheduleCreateDTOSchema = WorkScheduleSchema.omit({
  id: true,
});

export type WorkScheduleCreateDTO = z.infer<typeof WorkScheduleCreateDTOSchema>;

export const WorkScheduleUpdateDTOSchema = WorkScheduleCreateDTOSchema.partial();

export type WorkScheduleUpdateDTO = z.infer<typeof WorkScheduleUpdateDTOSchema>;

export const WorkScheduleCondDTOSchema = z.object({
  id: z.number().optional(),
  dayOfWeek: z.string().min(2, ErrDayOfWeekMinLength).max(50, ErrDayOfWeekMaxLength).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isAvailable: z.boolean().optional(),
});

export type WorkScheduleCondDTO = z.infer<typeof WorkScheduleCondDTOSchema>;
