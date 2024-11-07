const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const {
  EmployeeCondDTOSchema,
  EmployeeCreateDTOSchema,
  EmployeeUpdateDTOSchema,
} = require("../validation/employee.validation");

class EmployeeService {
  list = async (paging, cond) => {
    const condValue = EmployeeCondDTOSchema.parse(cond);
    const result = await models.Employee.findAll({
      where: condValue,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
      include: [
        {
          as: "location",
          model: models.Location,
          attributes: ["id", "locationName", "address"],
        },
      ],
    });
    return result.map((employee) => employee.get({ plain: true }));
  };

  getDetail = async (id) => {
    const employee = await models.Employee.findByPk(id, {
      include: [
        {
          as: "location",
          model: models.Location,
          attributes: ["id", "locationName", "address"],
        },
      ],
    });
    if (!employee) {
      throw ErrDataNotFound;
    }
    return employee.get({ plain: true });
  };

  create = async (data) => {
    const value = EmployeeCreateDTOSchema.parse(data);
    if (value.locationId) {
      const location = await models.Location.findByPk(value.locationId);
      if (!location) {
        throw ErrDataNotFound;
      }
    }
    const employee = await models.Employee.create(value);
    return employee.get({ plain: true });
  };

  update = async (id, data) => {
    const value = EmployeeUpdateDTOSchema.parse(data);
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      throw ErrDataNotFound;
    }
    if (value.locationId) {
      const location = await models.Location.findByPk(value.locationId);
      if (!location) {
        throw ErrDataNotFound;
      }
    }
    await models.Employee.update(value, { where: { id } });
    return true;
  };

  delete = async (id) => {
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      throw ErrDataNotFound;
    }
    await models.Employee.destroy({ where: { id } });
    return true;
  };

  getWorkSchedules = async (employeeId) => {
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw ErrDataNotFound;
    }
    const workSchedules = await employee.getWorkSchedules();
    return workSchedules.map((workSchedule) => workSchedule.get({ plain: true }));
  };

  addWorkSchedule = async (employeeId, workScheduleId) => {
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw ErrDataNotFound;
    }
    const workSchedule = await models.WorkSchedule.findByPk(workScheduleId);
    if (!workSchedule) {
      throw ErrDataNotFound;
    }
    await employee.addWorkSchedule(workSchedule);
    return true;
  };

  removeWorkSchedule = async (employeeId, workScheduleId) => {
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw ErrDataNotFound;
    }
    const workSchedule = await models.WorkSchedule.findByPk(workScheduleId);
    if (!workSchedule) {
      throw ErrDataNotFound;
    }
    await employee.removeWorkSchedule(workSchedule);
    return true;
  };

  getBookings = async (employeeId) => {
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw ErrDataNotFound;
    }
    const bookings = await models.Booking.findAll({
      where: { employeeId },
    });
    return bookings.map((booking) => booking.get({ plain: true }));
  };
}

module.exports = new EmployeeService();
