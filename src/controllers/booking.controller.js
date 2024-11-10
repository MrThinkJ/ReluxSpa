const BookingService = require("../services/booking.service");

class BookingController {
  list = async (req, res) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
      res.status(400).json({
        message: "Invalid paging",
        error: error.message,
      });
      return;
    }
    const result = await BookingService.list(data, req.body);
    res.status(200).json({ data: result, paging: data, filter: req.body });
  };

  getDetail = async (req, res) => {
    const { id } = req.params;
    const result = await BookingService.getDetail(Number(id));
    res.status(200).json({ data: result });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await BookingService.delete(Number(id));
    res.status(200).json({ data: result });
  };

  makeBooking = async (req, res) => {
    const result = await BookingService.makeBooking(req.body);
    res.status(200).json({ data: result });
  };
}

module.exports = new BookingController();
