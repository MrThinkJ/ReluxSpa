const router = require("express").Router();
const BookingController = require("../controllers/booking.controller");

router.get("/", BookingController.list);
router.get("/:id", BookingController.getDetail);
router.delete("/:id", BookingController.delete);
router.post("/", BookingController.makeBooking);

module.exports = router;
