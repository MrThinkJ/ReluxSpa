export const ErrNameRequired = new Error("Name is required");
export const ErrNameMinLength = new Error("Name must be at least 2 characters");
export const ErrNameMaxLength = new Error("Name must be at most 100 characters");

export const ErrDescriptionRequired = new Error("Description is required");
export const ErrDescriptionMinLength = new Error("Description must be at least 10 characters");
export const ErrDescriptionMaxLength = new Error("Description must be at most 255 characters");

export const ErrTypeServiceRequired = new Error("Type service is required");
export const ErrTypeServiceMinLength = new Error("Type service must be at least 2 characters");
export const ErrTypeServiceMaxLength = new Error("Type service must be at most 50 characters");
