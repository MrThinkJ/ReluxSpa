const ErrNameRequired = new Error("Name is required");
const ErrNameMinLength = new Error("Name must be at least 2 characters");
const ErrNameMaxLength = new Error("Name must be at most 100 characters");

const ErrEmailRequired = new Error("Email is required");
const ErrEmailInvalid = new Error("Email is invalid");

const ErrPhoneRequired = new Error("Phone is required");
const ErrPhoneMinLength = new Error("Phone must be at least 10 characters");
const ErrPhoneMaxLength = new Error("Phone must be at most 15 characters");

const ErrSpecialtyTypeRequired = new Error("Specialty type is required");
const ErrStatusRequired = new Error("Status is required");

module.exports = {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrEmailRequired,
  ErrEmailInvalid,
  ErrPhoneRequired,
  ErrPhoneMinLength,
  ErrPhoneMaxLength,
  ErrSpecialtyTypeRequired,
  ErrStatusRequired,
};
