const { z } = require("zod");
const {
  ErrNameRequired,
  ErrNameMinLength,
  ErrNameMaxLength,
  ErrDescriptionRequired,
  ErrDescriptionMinLength,
  ErrDescriptionMaxLength,
  ErrTypeServiceRequired,
  ErrTypeServiceMinLength,
  ErrTypeServiceMaxLength,
} = require("../errors/serviceCategory.error");

const ServiceCategorySchema = z.object({
  id: z.number().optional(),
  name: z.string(ErrNameRequired).min(2, ErrNameMinLength).max(100, ErrNameMaxLength),
  descriptionShort: z.string(ErrDescriptionRequired).min(10, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength),
  typeService: z.string(ErrTypeServiceRequired).min(2, ErrTypeServiceMinLength).max(50, ErrTypeServiceMaxLength),
});

const ServiceCategoryCreateDTOSchema = ServiceCategorySchema.omit({
  id: true,
});

const ServiceCategoryUpdateDTOSchema = ServiceCategoryCreateDTOSchema.partial();

const ServiceCategoryCondDTOSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, ErrNameMinLength).max(100, ErrNameMaxLength).optional(),
  descriptionShort: z.string().min(10, ErrDescriptionMinLength).max(255, ErrDescriptionMaxLength).optional(),
  typeService: z.string().min(2, ErrTypeServiceMinLength).max(50, ErrTypeServiceMaxLength).optional(),
});

module.exports = {
  ServiceCategorySchema,
  ServiceCategoryCreateDTOSchema,
  ServiceCategoryUpdateDTOSchema,
  ServiceCategoryCondDTOSchema,
};
