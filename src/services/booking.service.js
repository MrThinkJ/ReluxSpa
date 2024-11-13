const { models } = require("../sequelize");
const {
  ErrLocationNotFound,
  ErrCustomerNotFound,
  ErrServiceNotFound,
  ErrEmployeeNotFound,
} = require("../errors/booking.error");
const { Op } = require("sequelize");
const { BookingCondDTOSchema, BookingCreateDTOSchema } = require("../validation/booking.validation");

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
      throw ErrDataNotFound;
    }
    return booking.get({ plain: true });
  };

  makeBooking = async (data) => {
    const bookingData = BookingCreateDTOSchema.parse(data);
    const location = await models.Location.findByPk(bookingData.locationId);
    if (!location) {
      throw ErrLocationNotFound;
    }
    const customer = await models.Customer.findByPk(bookingData.customerId);
    if (!customer) {
      throw ErrCustomerNotFound;
    }
    const employee = await models.Employee.findByPk(bookingData.employeeId);
    if (!employee) {
      throw ErrEmployeeNotFound;
    }
    const services = await models.Service.findAll({
      where: { id: { [Op.in]: bookingData.serviceIds } },
    });
    if (services.length !== bookingData.serviceIds.length) {
      throw ErrServiceNotFound;
    }
    const bookingTime = new Date(bookingData.bookingTime);
    let duration = 0;
    for (const service of services) {
      duration += service.duration;
    }
    const bookingEndTime = new Date(bookingTime.getTime() + duration * 60000);
    const result = await models.sequelize.transaction(async (t) => {
      const booking = await models.Booking.create(
        {
          ...bookingData,
          bookingTime,
          endTime: bookingEndTime,
        },
        { transaction: t }
      );
      await booking.addServices(services, { transaction: t });
      return booking;
    });

    return result.get({ plain: true }).id;
  };

  delete = async (id) => {
    const booking = await models.Booking.findByPk(id);
    if (!booking) {
      throw ErrDataNotFound;
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
