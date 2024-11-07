const { z } = require("zod");
const {
  ErrPaymentMethodNameMinLength,
  ErrPaymentMethodNameMaxLength,
  ErrDescriptionMinLength,
  ErrDescriptionMaxLength,
} = require("../errors/paymentMethod.error");

const PaymentMethodSchema = z.object({
  id: z.number().optional(),
  paymentMethodName: z.string().min(1, ErrPaymentMethodNameMinLength).max(255, ErrPaymentMethodNameMaxLength),
  description: z.string().min(1, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength),
});
const PaymentMethodCondDTOSchema = z.object({
  id: z.number().optional(),
  paymentMethodName: z
    .string()
    .min(1, ErrPaymentMethodNameMinLength)
    .max(255, ErrPaymentMethodNameMaxLength)
    .optional(),
  description: z.string().min(1, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength).optional(),
});
const PaymentMethodCreateDTOSchema = PaymentMethodSchema.omit({ id: true });
const PaymentMethodUpdateDTOSchema = PaymentMethodCreateDTOSchema.partial();

module.exports = {
  PaymentMethodCondDTOSchema,
  PaymentMethodCreateDTOSchema,
  PaymentMethodUpdateDTOSchema,
};
