const { z } = require("zod");

module.exports = {
  PagingDTOSchema: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).default(10),
    total: z.coerce.number().optional(),
  }),
};
