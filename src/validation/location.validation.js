const { z } = require("zod");

const LocationSchema = z.object({
  id: z.number().optional(),
  locationName: z.string().min(2, { message: "Location name must be at least 2 characters" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
});

const LocationCondDTOSchema = z.object({
  locationName: z.string().optional(),
  address: z.string().optional(),
});

const LocationCreateDTOSchema = LocationSchema.omit({ id: true });

const LocationUpdateDTOSchema = z.object({
  locationName: z.string().optional(),
  address: z.string().optional(),
});

module.exports = {
  LocationSchema,
  LocationCondDTOSchema,
  LocationCreateDTOSchema,
  LocationUpdateDTOSchema,
};
