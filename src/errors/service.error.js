const ErrNameRequired = new Error("Name is required");
const ErrNameMinLength = new Error("Name must be at least 2 characters");
const ErrNameMaxLength = new Error("Name must be at most 100 characters");

const ErrPriceRequired = new Error("Price is required");
const ErrPriceMin = new Error("Price must be greater than 0");

const ErrDescriptionShortRequired = new Error("Short description is required");
const ErrDescriptionShortMinLength = new Error("Short description must be at least 10 characters");
const ErrDescriptionShortMaxLength = new Error("Short description must be at most 255 characters");

const ErrDescription1MinLength = new Error("Description 1 must be at least 10 characters");
const ErrDescription1MaxLength = new Error("Description 1 must be at most 1000 characters");

const ErrDescription2MinLength = new Error("Description 2 must be at least 10 characters");
const ErrDescription2MaxLength = new Error("Description 2 must be at most 1000 characters");

const ErrDurationRequired = new Error("Duration is required");
const ErrDurationMin = new Error("Duration must be greater than 0");

const ErrCategoryIdRequired = new Error("Category ID is required");

module.exports = {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrPriceRequired,
  ErrPriceMin,
  ErrDescriptionShortRequired,
  ErrDescriptionShortMinLength,
  ErrDescriptionShortMaxLength,
  ErrDescription1MinLength,
  ErrDescription1MaxLength,
  ErrDescription2MinLength,
  ErrDescription2MaxLength,
  ErrDurationRequired,
  ErrDurationMin,
  ErrCategoryIdRequired,
};
