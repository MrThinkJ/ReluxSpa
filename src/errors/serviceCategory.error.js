const ErrNameRequired = new Error("Name is required");
const ErrNameMinLength = new Error("Name must be at least 2 characters");
const ErrNameMaxLength = new Error("Name must be at most 100 characters");
const ErrDescriptionRequired = new Error("Description is required");
const ErrDescriptionMinLength = new Error("Description must be at least 10 characters");
const ErrDescriptionMaxLength = new Error("Description must be at most 255 characters");
const ErrTypeServiceRequired = new Error("Type service is required");
const ErrTypeServiceMinLength = new Error("Type service must be at least 2 characters");
const ErrTypeServiceMaxLength = new Error("Type service must be at most 50 characters");
const ErrCategoryNotFound = new Error("Category not found");

module.exports = {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrDescriptionRequired,
  ErrDescriptionMinLength,
  ErrDescriptionMaxLength,
  ErrTypeServiceRequired,
  ErrTypeServiceMinLength,
  ErrTypeServiceMaxLength,
  ErrCategoryNotFound,
};
