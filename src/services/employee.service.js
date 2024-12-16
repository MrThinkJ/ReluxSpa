const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const { AppError } = require("../app-error");
const { weekday } = require("../utils/helper");
const {
  EmployeeCondDTOSchema,
  EmployeeCreateDTOSchema,
  EmployeeUpdateDTOSchema,
  EmployeeBookingCondDTOSchema,
  EmployeeFreeTimeCondDTOSchema,
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
      throw AppError.from(ErrDataNotFound, 404);
    }
    return employee.get({ plain: true });
  };

  create = async (data) => {
    const value = EmployeeCreateDTOSchema.parse(data);
    if (value.locationId) {
      const location = await models.Location.findByPk(value.locationId);
      if (!location) {
        throw AppError.from(ErrDataNotFound, 404);
      }
    }
    const employee = await models.Employee.create(value);
    return employee.get({ plain: true });
  };

  update = async (id, data) => {
    const value = EmployeeUpdateDTOSchema.parse(data);
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    if (value.locationId) {
      const location = await models.Location.findByPk(value.locationId);
      if (!location) {
        throw AppError.from(ErrDataNotFound, 404);
      }
    }
    await models.Employee.update(value, { where: { id } });
    return true;
  };

  delete = async (id) => {
    const employee = await models.Employee.findByPk(id);
    if (!employee) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.Employee.destroy({ where: { id } });
    return true;
  };

  getWorkSchedules = async (employeeId) => {
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    const workSchedules = await employee.getWorkSchedules();
    return workSchedules.map((workSchedule) =>
      workSchedule.get({ plain: true })
    );
  };

  addWorkSchedule = async (employeeId, workScheduleId) => {
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    const workSchedule = await models.WorkSchedule.findByPk(workScheduleId);
    if (!workSchedule) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await employee.addWorkSchedule(workSchedule);
    return true;
  };

  removeWorkSchedule = async (employeeId, workScheduleId) => {
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    const workSchedule = await models.WorkSchedule.findByPk(workScheduleId);
    if (!workSchedule) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await employee.removeWorkSchedule(workSchedule);
    return true;
  };

  getBookings = async (employeeId) => {
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw AppError.from(ErrDataNotFound, 404);
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

  getEmployeeFreeTime = async (employeeId) => {
    // 1. Initial validation
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      throw AppError.from(ErrDataNotFound, 404);
    }

    const currentDate = this.getDateWithThaiOffset();

    const curDateUTC = new Date(currentDate.setUTCHours(0, 0, 0, 0));
    const currentDateCopy = new Date(currentDate);
    const nextWeekDate = new Date(
      currentDateCopy.setDate(currentDateCopy.getDate() + 7)
    );

    const [workSchedules, bookings] = await Promise.all([
      this.getEmployeeWorkSchedules(employee),
      this.getEmployeeBookings(employeeId, curDateUTC, nextWeekDate),
    ]);
    const scheduleMap = this.createScheduleMap(workSchedules);

    const freeTimeSlots = this.generateFreeTimeSlots(
      currentDate,
      nextWeekDate,
      scheduleMap,
      bookings
    );
    // 6. Filter out past slots
    return this.filterPastSlots(freeTimeSlots);
  };

  // Helper methods
  getDateWithThaiOffset() {
    const date = new Date();
    date.setUTCHours(date.getUTCHours() + 7);
    return date;
  }

  async getEmployeeWorkSchedules(employee) {
    return employee.getWorkSchedules({
      where: { isAvailable: true },
    });
  }

  async getEmployeeBookings(employeeId, startDate, endDate) {
    return models.Booking.findAll({
      where: {
        employeeId,
        [Op.and]: [
          { bookingTime: { [Op.gte]: startDate } },
          { bookingTime: { [Op.lte]: endDate } },
        ],
      },
      order: [["bookingTime", "ASC"]],
    });
  }

  createScheduleMap(workSchedules) {
    const scheduleMap = {};
    workSchedules.forEach((schedule) => {
      scheduleMap[schedule.dayOfWeek] = schedule;
    });
    return scheduleMap;
  }

  generateFreeTimeSlots(currentDate, nextWeekDate, scheduleMap, bookings) {
    const freeTimeSlots = [];
    const processDate = new Date(currentDate);

    while (processDate.getDate() !== nextWeekDate.getDate()) {
      const dayOfWeek = weekday[processDate.getDay()];
      const schedule = scheduleMap[dayOfWeek];
      if (schedule) {
        const slots = this.generateDaySlots(processDate, schedule, bookings);
        freeTimeSlots.push(...slots);
      }

      processDate.setDate(processDate.getDate() + 1);
    }

    return freeTimeSlots;
  }

  generateDaySlots(date, schedule, bookings) {
    const slots = [];
    const { startTime, endTime } = this.getScheduleTimes(schedule, date);

    const dayBookings = this.filterBookingsForDate(bookings, date);

    if (dayBookings.length === 0) {
      slots.push(this.createTimeSlot(date, startTime, endTime));
      return slots;
    }

    let currentTime = startTime;
    dayBookings.forEach((booking) => {
      const bookingStart = new Date(booking.bookingTime);
      const bookingEnd = new Date(booking.endTime);

      if (currentTime < bookingStart) {
        slots.push(this.createTimeSlot(date, currentTime, bookingStart));
      }
      currentTime = bookingEnd;
    });

    if (currentTime < endTime) {
      slots.push(this.createTimeSlot(date, currentTime, endTime));
    }
    return slots;
  }

  getScheduleTimes(schedule, date) {
    const parseTime = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const time = new Date(date);
      time.setUTCHours(hours, minutes, 0, 0);
      return time;
    };

    return {
      startTime: parseTime(schedule.startTime),
      endTime: parseTime(schedule.endTime),
    };
  }

  filterBookingsForDate(bookings, date) {
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingTime);
      return (
        bookingDate.getDate() === date.getDate() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getFullYear() === date.getFullYear()
      );
    });
  }

  createTimeSlot(date, startTime, endTime) {
    return {
      date: date.toISOString().split("T")[0],
      startTime: startTime.toUTCString().slice(17, 22),
      endTime: endTime.toUTCString().slice(17, 22),
    };
  }

  filterPastSlots(slots) {
    const now = this.getDateWithThaiOffset();
    return slots.filter((slot) => {
      const slotDate = new Date(`${slot.date}T${slot.startTime}`);
      return slotDate > now;
    });
  }
}

module.exports = new EmployeeService();
