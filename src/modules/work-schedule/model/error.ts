export const ErrDayOfWeekRequired = new Error("Day of week is required");
export const ErrDayOfWeekMinLength = new Error("Day of week must be at least 2 characters");
export const ErrDayOfWeekMaxLength = new Error("Day of week must be at most 50 characters");

export const ErrStartTimeRequired = new Error("Start time is required");
export const ErrEndTimeRequired = new Error("End time is required");
export const ErrEndTimeBeforeStartTime = new Error("End time cannot be before start time");
