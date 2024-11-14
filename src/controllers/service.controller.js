const ServiceModuleService = require("../services/serviceModule.service");
const { PagingDTOSchema } = require("../validation/paging.validation");

class ServiceController {
  list = async (req, res) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
      res.status(400).json({
        message: "Invalid paging",
        error: error.message,
      });
      return;
    }
    const result = await ServiceModuleService.list(data, req.query);
    res.status(200).json({ data: result, paging: data, filter: req.query });
  };

  getDetail = async (req, res) => {
    const { id } = req.params;
    const result = await ServiceModuleService.getDetail(Number(id));
    res.status(200).json({ data: result });
  };

  create = async (req, res) => {
    const result = await ServiceModuleService.create(req.body);
    res.status(201).json({ data: result });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = await ServiceModuleService.update(Number(id), req.body);
    res.status(200).json({ data: result });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await ServiceModuleService.delete(Number(id));
    res.status(200).json({ data: result });
  };

  getByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    const result = await ServiceModuleService.getByCategoryId(Number(categoryId));
    res.status(200).json({ data: result });
  };

  getServiceHasPromotion = async (req, res) => {
    const result = await ServiceModuleService.getServiceHasPromotion();
    res.status(200).json({ data: result });
  };
}

module.exports = new ServiceController();
