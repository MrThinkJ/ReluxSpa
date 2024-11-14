const router = require("express").Router();
const BookingController = require("../controllers/booking.controller");

const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

router.get("/", authMiddleware, BookingController.list);
router.get("/:id", authMiddleware, BookingController.getDetail);
router.delete("/:id", authMiddleware, BookingController.delete);
router.post("/", authMiddleware, BookingController.makeBooking);
router.get("/user/:id", authMiddleware, BookingController.getByUserId);
module.exports = router;
