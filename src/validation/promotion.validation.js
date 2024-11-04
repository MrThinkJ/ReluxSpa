const { z } = require("zod");

const PromotionSchema = z.object({
  id: z.number().optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(255, "Description must be at most 255 characters"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  discountPercentage: z.number().min(0).max(100),
});

const PromotionCreateDTOSchema = PromotionSchema.omit({ id: true });

const PromotionUpdateDTOSchema = PromotionCreateDTOSchema.partial();

const PromotionCondDTOSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(10).max(255).optional(),
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
