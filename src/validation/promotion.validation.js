const { z } = require("zod");
const { ErrDescriptionMinLength, ErrDescriptionMaxLength } = require("../errors/promotion.error");

const PromotionSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(10, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  discountPercentage: z.number().min(0).max(100),
});

const PromotionCreateDTOSchema = PromotionSchema.omit({
  id: true,
});
const PromotionUpdateDTOSchema = PromotionCreateDTOSchema.partial();
const PromotionCondDTOSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(10, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  discountPercentage: z.number().min(0).max(100).optional(),
});

module.exports = {
  PromotionSchema,
  PromotionCreateDTOSchema,
  PromotionUpdateDTOSchema,
  PromotionCondDTOSchema,
};
