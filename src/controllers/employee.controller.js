const EmployeeService = require("../services/employee.service");
const { PagingDTOSchema } = require("../validation/paging.validation");

class EmployeeController {
  list = async (req, res) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
      res.status(400).json({
        message: "Invalid paging",
        error: error.message,
      });
      return;
    }
    const result = await EmployeeService.list(data, req.query);
    res.status(200).json({ data: result, paging: data, filter: req.query });
  };

  getDetail = async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeService.getDetail(Number(id));
    res.status(200).json({ data: result });
  };

  create = async (req, res) => {
    const result = await EmployeeService.create(req.body);
    res.status(201).json({ data: result });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeService.update(Number(id), req.body);
    res.status(200).json({ data: result });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeService.delete(Number(id));
    res.status(200).json({ data: result });
  };

  getWorkSchedules = async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeService.getWorkSchedules(Number(id));
    res.status(200).json({ data: result });
  };

  addWorkSchedule = async (req, res) => {
    const { id, scheduleId } = req.params;
    const result = await EmployeeService.addWorkSchedule(Number(id), Number(scheduleId));
    res.status(200).json({ data: result });
  };

  removeWorkSchedule = async (req, res) => {
    const { id, scheduleId } = req.params;
    const result = await EmployeeService.removeWorkSchedule(Number(id), Number(scheduleId));
    res.status(200).json({ data: result });
  };

  getBookings = async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeService.getBookings(Number(id));
    res.status(200).json({ data: result });
  };

  getEmployeeIsAvailable = async (req, res) => {
    const result = await EmployeeService.getEmployeeIsAvailable(req.body);
    res.status(200).json({ data: result });
  };

  getEmployeeFreeTime = async (req, res) => {
    const { id } = req.params;
    const result = await EmployeeService.getEmployeeFreeTime(Number(id), req.body);
    res.status(200).json({ data: result });
  };
}

module.exports = new EmployeeController();
