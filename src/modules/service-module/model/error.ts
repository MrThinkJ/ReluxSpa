export const ErrNameRequired = new Error("Name is required");
export const ErrNameMinLength = new Error("Name must be at least 2 characters");
export const ErrNameMaxLength = new Error("Name must be at most 100 characters");

export const ErrPriceRequired = new Error("Price is required");
export const ErrPriceMin = new Error("Price must be greater than 0");

export const ErrDescriptionShortRequired = new Error("Short description is required");
export const ErrDescriptionShortMinLength = new Error("Short description must be at least 10 characters");
export const ErrDescriptionShortMaxLength = new Error("Short description must be at most 255 characters");

export const ErrDescription1MinLength = new Error("Description 1 must be at least 10 characters");
export const ErrDescription1MaxLength = new Error("Description 1 must be at most 1000 characters");

export const ErrDescription2MinLength = new Error("Description 2 must be at least 10 characters");
export const ErrDescription2MaxLength = new Error("Description 2 must be at most 1000 characters");

export const ErrDurationRequired = new Error("Duration is required");
export const ErrDurationMin = new Error("Duration must be greater than 0");

export const ErrCategoryIdRequired = new Error("Category ID is required");
