const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const { weekday } = require("../utils/helper");
const {
  EmployeeCondDTOSchema,
  EmployeeCreateDTOSchema,
  EmployeeUpdateDTOSchema,
  EmployeeBookingCondDTOSchema,
} = require("../validation/employee.validation");
const { Op } = require("sequelize");

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

  getEmployeeIsAvailable = async (cond) => {
    const condValue = EmployeeBookingCondDTOSchema.parse(cond);
    const bookTime = new Date(condValue.bookingTime);
    const duration = condValue.duration || 60;
    const bookEndTime = new Date(bookTime.getTime() + duration * 60000);

    const bookingTimeStr = bookTime.toTimeString().slice(0, 5);
    const bookingEndTimeStr = bookEndTime.toTimeString().slice(0, 5);

    const dayOfWeek = weekday[bookTime.getDay()];
    const employees = await models.Employee.findAll({
      include: [
        {
          as: "workSchedules",
          model: models.WorkSchedule,
          where: {
            dayOfWeek,
            isAvailable: true,
            startTime: { [Op.lte]: bookingTimeStr },
            endTime: { [Op.gte]: bookingEndTimeStr },
          },
        },
      ],
    });

    const availableEmployees = [];
    for (const employee of employees) {
      const overlappingBookings = await models.Booking.count({
        where: {
          employeeId: employee.id,
          bookingTime: {
            [Op.lt]: bookEndTime,
          },
          [Op.or]: [
            {
              bookingTime: {
                [Op.gte]: bookTime,
              },
            },
            {
              endTime: {
                [Op.gt]: bookTime,
              },
            },
          ],
        },
      });

      if (overlappingBookings === 0) {
        availableEmployees.push(employee.get({ plain: true }));
      }
    }
    return availableEmployees;
  };

  getEmployeeFreeTime = async (employeeId, cond) => {
    const condValue = EmployeeFreeTimeCondDTOSchema.parse(cond);
    const date = new Date(condValue.date);
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw ErrDataNotFound;
    }

    const workSchedules = await employee.getWorkSchedules({
      where: {
        isAvailable: true,
      },
    });

    const bookings = await models.Booking.findAll({
      where: {
        employeeId,
        [Op.and]: [
          {
            bookingTime: {
              [Op.gte]: new Date(),
            },
          },
          {
            bookingTime: {
              [Op.lte]: date,
            },
          },
        ],
      },
      order: [["bookingTime", "ASC"]],
    });

    const freeTimeSlots = [];
    const currentDate = new Date();
    const scheduleMap = {};
    workSchedules.forEach((schedule) => {
      const dayOfWeek = schedule.dayOfWeek;
      scheduleMap[dayOfWeek] = schedule;
    });
    while (currentDate.getDate() !== date.getDate()) {
      const dayOfWeek = weekday[currentDate.getDay()];
      if (scheduleMap[dayOfWeek]) {
        const schedule = scheduleMap[dayOfWeek];
        const startTime = schedule.startTime;
        const endTime = schedule.endTime;
        const [scheduleStartHours, scheduleStartMinutes] = startTime.split(":");
        const [scheduleEndHours, scheduleEndMinutes] = endTime.split(":");
        const scheduleStart = new Date(currentDate);
        scheduleStart.setHours(parseInt(scheduleStartHours), parseInt(scheduleStartMinutes), 0, 0);
        const scheduleEnd = new Date(currentDate);
        scheduleEnd.setHours(parseInt(scheduleEndHours), parseInt(scheduleEndMinutes), 0, 0);

        const dayBookings = bookings.filter((booking) => {
          const bookingDate = new Date(booking.bookingTime);
          return (
            bookingDate.getDate() === currentDate.getDate() &&
            bookingDate.getMonth() === currentDate.getMonth() &&
            bookingDate.getFullYear() === currentDate.getFullYear()
          );
        });

        if (dayBookings.length == 0) {
          freeTimeSlots.push({
            date: currentDate.toISOString().split("T")[0],
            startTime: scheduleStart.toTimeString().slice(0, 5),
            endTime: scheduleEnd.toTimeString().slice(0, 5),
          });
          continue;
        }

        dayBookings.sort((a, b) => new Date(a.bookingTime) - new Date(b.bookingTime));

        let currentTime = scheduleStart;

        for (const booking of dayBookings) {
          const bookingStart = new Date(booking.bookingTime);
          const bookingEnd = new Date(booking.endTime);

          if (currentTime < bookingStart) {
            freeTimeSlots.push({
              date: currentDate.toISOString().split("T")[0],
              startTime: currentTime.toTimeString().slice(0, 5),
              endTime: bookingStart.toTimeString().slice(0, 5),
            });
          }
          currentTime = bookingEnd;
        }

        if (currentTime < scheduleEnd) {
          freeTimeSlots.push({
            date: currentDate.toISOString().split("T")[0],
            startTime: currentTime.toTimeString().slice(0, 5),
            endTime: scheduleEnd.toTimeString().slice(0, 5),
          });
        }
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return freeTimeSlots;
  };
}

module.exports = new EmployeeService();
