const { z } = require("zod");
const {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrEmailRequired,
  ErrEmailInvalid,
  ErrMessageRequired,
  ErrMessageMinLength,
} = require("../errors/contact.error");

const ContactSchema = z.object({
  id: z.number().optional(),
  customerName: z.string(ErrNameRequired).min(2, ErrNameMinLength).max(100, ErrNameMaxLength),
  email: z.string(ErrEmailRequired).email(ErrEmailInvalid),
  message: z.string(ErrMessageRequired).min(10, ErrMessageMinLength),
});

const ContactCondDTOSchema = z.object({
  customerName: z.string().optional(),
  email: z.string().email().optional(),
});

module.exports = {
  ContactSchema,
  ContactCondDTOSchema,
};
