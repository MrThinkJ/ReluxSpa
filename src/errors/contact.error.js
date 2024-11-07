const ErrNameRequired = new Error("Name is required");
const ErrNameMinLength = new Error("Name must be at least 2 characters");
const ErrNameMaxLength = new Error("Name must be at most 100 characters");

const ErrEmailRequired = new Error("Email is required");
const ErrEmailInvalid = new Error("Email is invalid");

const ErrMessageRequired = new Error("Message is required");
const ErrMessageMinLength = new Error("Message must be at least 10 characters");

module.exports = {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrEmailRequired,
  ErrEmailInvalid,
  ErrMessageRequired,
  ErrMessageMinLength,
};
