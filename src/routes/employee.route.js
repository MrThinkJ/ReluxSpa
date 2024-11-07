const EmployeeController = require("../controllers/employee.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.get("/", authMiddleware, EmployeeController.list);
router.get("/:id", authMiddleware, EmployeeController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN"]), EmployeeController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN"]), EmployeeController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN"]), EmployeeController.delete);

router.get("/:id/work-schedules", authMiddleware, EmployeeController.getWorkSchedules);
router.post(
  "/:id/work-schedules/:scheduleId",
  authMiddleware,
  allowRoles(["ADMIN"]),
  EmployeeController.addWorkSchedule
);
router.delete(
  "/:id/work-schedules/:scheduleId",
  authMiddleware,
  allowRoles(["ADMIN"]),
  EmployeeController.removeWorkSchedule
);

router.get("/:id/bookings", authMiddleware, EmployeeController.getBookings);

module.exports = router;
