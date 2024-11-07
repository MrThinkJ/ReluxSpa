const { z } = require("zod");
const {
  ErrDayOfWeekRequired,
  ErrDayOfWeekMinLength,
  ErrDayOfWeekMaxLength,
  ErrStartTimeRequired,
  ErrStartTimeInvalid,
  ErrEndTimeRequired,
  ErrEndTimeInvalid,
} = require("../errors/workSchedule.error");

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const WorkScheduleSchema = z.object({
  id: z.number().optional(),
  dayOfWeek: z.string(ErrDayOfWeekRequired).min(2, ErrDayOfWeekMinLength).max(10, ErrDayOfWeekMaxLength),
  startTime: z.string(ErrStartTimeRequired).regex(timeRegex, ErrStartTimeInvalid),
  endTime: z.string(ErrEndTimeRequired).regex(timeRegex, ErrEndTimeInvalid),
  isAvailable: z.boolean().default(true),
});

const WorkScheduleCreateDTOSchema = WorkScheduleSchema.omit({ id: true });

const WorkScheduleUpdateDTOSchema = WorkScheduleCreateDTOSchema.partial();

const WorkScheduleCondDTOSchema = z.object({
  dayOfWeek: z.string().optional(),
  isAvailable: z.boolean().optional(),
});

module.exports = {
  WorkScheduleSchema,
  WorkScheduleCondDTOSchema,
  WorkScheduleCreateDTOSchema,
  WorkScheduleUpdateDTOSchema,
};
