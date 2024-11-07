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

  create = async (data) => {
    const bookingData = BookingCreateDTOSchema.parse(data);
    const booking = await models.Booking.create(bookingData);
    return booking.get({ plain: true }).id;
  };

  update = async (id, data) => {
    const bookingData = BookingUpdateDTOSchema.parse(data);
    const booking = await models.Booking.findByPk(id);
    if (!booking) {
      throw ErrDataNotFound;
    }
    await models.Booking.update(bookingData, { where: { id } });
    return true;
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

module.exports = BookingService;
