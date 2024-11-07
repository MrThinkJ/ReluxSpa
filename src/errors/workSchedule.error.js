const ErrDayOfWeekRequired = new Error("Day of week is required");
const ErrDayOfWeekMinLength = new Error("Day of week must be at least 2 characters");
const ErrDayOfWeekMaxLength = new Error("Day of week must be at most 10 characters");

const ErrStartTimeRequired = new Error("Start time is required");
const ErrStartTimeInvalid = new Error("Start time must be in HH:mm format");

const ErrEndTimeRequired = new Error("End time is required");
const ErrEndTimeInvalid = new Error("End time must be in HH:mm format");

const ErrEndTimeBeforeStartTime = new Error("End time must be after start time");

const ErrWorkScheduleNotFound = new Error("Work schedule not found");
const ErrWorkScheduleAlreadyExists = new Error("Work schedule already exists for this day and time");

module.exports = {
  ErrDayOfWeekRequired,
  ErrDayOfWeekMinLength,
  ErrDayOfWeekMaxLength,
  ErrStartTimeRequired,
  ErrStartTimeInvalid,
  ErrEndTimeRequired,
  ErrEndTimeInvalid,
  ErrEndTimeBeforeStartTime,
  ErrWorkScheduleNotFound,
  ErrWorkScheduleAlreadyExists,
};
