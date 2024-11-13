const router = require("express").Router();
const BookingController = require("../controllers/booking.controller");

router.get("/", BookingController.list);
router.get("/:id", BookingController.getDetail);
router.delete("/:id", BookingController.delete);
router.post("/", BookingController.makeBooking);
router.get("/user/:id", BookingController.getByUserId);
module.exports = router;
