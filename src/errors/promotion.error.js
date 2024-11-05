const ErrDescriptionMinLength = new Error("Description must be at least 10 characters");
const ErrDescriptionMaxLength = new Error("Description must be at most 255 characters");
const ErrPromotionNotFound = new Error("Promotion not found");

module.exports = {
  ErrDescriptionMinLength,
  ErrDescriptionMaxLength,
  ErrPromotionNotFound,
};
