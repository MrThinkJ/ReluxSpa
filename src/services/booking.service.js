const { models } = require("../sequelize");
const {
  ErrLocationNotFound,
  ErrCustomerNotFound,
  ErrServiceNotFound,
  ErrEmployeeNotFound,
} = require("../errors/booking.error");
const { Op } = require("sequelize");
const { BookingCondDTOSchema, BookingCreateDTOSchema } = require("../validation/booking.validation");
const { AppError } = require("../app-error");

const checkBookingOverlap = async (models, bookingTime, endTime, customerId, employeeId) => {
  // Check for customer's overlapping bookings
  const customerOverlap = await models.Booking.count({
    where: {
      customerId,
      bookingTime: {
        [Op.lt]: endTime,
      },
      [Op.or]: [
        {
          bookingTime: {
            [Op.gte]: bookingTime,
          },
        },
        {
          endTime: {
            [Op.gt]: bookingTime,
          },
        },
      ],
    },
  });

  // Check for employee's overlapping bookings
  const employeeOverlap = await models.Booking.count({
    where: {
      employeeId,
      bookingTime: {
        [Op.lt]: endTime,
      },
      [Op.or]: [
        {
          bookingTime: {
            [Op.gte]: bookingTime,
          },
        },
        {
          endTime: {
            [Op.gt]: bookingTime,
          },
        },
      ],
    },
  });

  return {
    hasCustomerOverlap: customerOverlap > 0,
    hasEmployeeOverlap: employeeOverlap > 0,
  };
};

class BookingService {
  list = async (paging, cond) => {
    const condDTO = BookingCondDTOSchema.parse(cond);
    const bookings = await models.Booking.findAll({
      where: condDTO,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
    });
    return bookings.map((booking) => booking.get({ plain: true }));
  };

  getDetail = async (id) => {
    const booking = await models.Booking.findByPk(id);
    if (!booking) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    return booking.get({ plain: true });
  };

  makeBooking = async (data) => {
    const bookingData = BookingCreateDTOSchema.parse(data);

    const customer = await models.User.findOne({
      where: { username: bookingData.customerUsername },
    });
    if (!customer) {
      throw AppError.from(ErrCustomerNotFound, 404);
    }

    bookingData.customerId = customer.id;

    const location = await models.Location.findByPk(bookingData.locationId);
    if (!location) {
      throw AppError.from(ErrLocationNotFound, 404);
    }
    const employee = await models.Employee.findByPk(bookingData.employeeId);
    if (!employee) {
      throw AppError.from(ErrEmployeeNotFound, 404);
    }

    const services = await models.Service.findAll({
      where: { id: { [Op.in]: bookingData.serviceIds } },
    });
    if (services.length !== bookingData.serviceIds.length) {
      throw AppError.from(ErrServiceNotFound, 404);
    }

    const bookingTime = new Date(bookingData.bookingTime);
    let duration = 0;
    for (const service of services) {
      duration += service.duration;
    }
    const bookingEndTime = new Date(bookingTime.getTime() + duration * 60000);

    // Check for booking overlaps
    const { hasCustomerOverlap, hasEmployeeOverlap } = await checkBookingOverlap(
      models,
      bookingTime,
      bookingEndTime,
      customer.id,
      bookingData.employeeId
    );

    if (hasCustomerOverlap) {
      throw AppError.from(new Error("You already have a booking during this time slot"), 400);
    }

    if (hasEmployeeOverlap) {
      throw AppError.from(new Error("The selected employee is not available during this time slot"), 400);
    }

    const result = await models.Booking.create({
      ...bookingData,
      bookingTime,
      endTime: bookingEndTime,
    });
    await result.addServices(services);

    return result.get({ plain: true }).id;
  };

  delete = async (id) => {
    const booking = await models.Booking.findByPk(id);
    if (!booking) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.Booking.destroy({ where: { id } });
    return true;
  };

  getByUserId = async (userId) => {
    const bookings = await models.Booking.findAll({
      where: { customerId: userId },
      include: [
        {
          model: models.Service,
          as: "services",
          through: { attributes: [] },
          attributes: ["id", "name", "price", "duration", "descriptionShort", "imageMain"],
        },
      ],
    });
    return bookings.map((booking) => booking.get({ plain: true }));
  };
}

module.exports = new BookingService();
