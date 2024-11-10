const WorkScheduleService = require("../services/workSchedule.service");
const { PagingDTOSchema } = require("../validation/paging.validation");

class WorkScheduleController {
  list = async (req, res) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
      res.status(400).json({
        message: "Invalid paging",
        error: error.message,
      });
      return;
    }
    const result = await WorkScheduleService.list(data, req.body);
    res.status(200).json({ data: result, paging: data, filter: req.body });
  };

  getDetail = async (req, res) => {
    const { id } = req.params;
    const result = await WorkScheduleService.getDetail(Number(id));
    res.status(200).json({ data: result });
  };

  create = async (req, res) => {
    const result = await WorkScheduleService.create(req.body);
    res.status(201).json({ data: result });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = await WorkScheduleService.update(Number(id), req.body);
    res.status(200).json({ data: result });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await WorkScheduleService.delete(Number(id));
    res.status(200).json({ data: result });
  };
}

module.exports = new WorkScheduleController();
