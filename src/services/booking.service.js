const { BookingCondDTOSchema } = require("../validation/booking.validation");
const { models } = require("../sequelize");

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
    const services = await models.Service.findAll({
      where: { id: { [Op.in]: bookingData.serviceIds } },
    });
    if (services.length !== bookingData.serviceIds.length) {
      throw ErrServiceNotFound;
    }
    const booking = await models.Booking.create(bookingData);
    return booking.get({ plain: true }).id;
  };

  delete = async (id) => {
    const booking = await models.Booking.findByPk(id);
    if (!booking) {
      throw ErrDataNotFound;
    }
    await models.Booking.destroy({ where: { id } });
    return true;
  };
}

module.exports = new BookingService();
