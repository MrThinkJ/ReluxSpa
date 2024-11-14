const EmployeeController = require("../controllers/employee.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.get("/", EmployeeController.list);
router.get("/:id", EmployeeController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), EmployeeController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), EmployeeController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), EmployeeController.delete);

router.get("/:id/work-schedules", authMiddleware, EmployeeController.getWorkSchedules);
router.post(
  "/:id/work-schedules/:scheduleId",
  authMiddleware,
  allowRoles(["ADMIN", "MANAGER"]),
  EmployeeController.addWorkSchedule
);
router.delete(
  "/:id/work-schedules/:scheduleId",
  authMiddleware,
  allowRoles(["ADMIN", "MANAGER"]),
  EmployeeController.removeWorkSchedule
);

router.get("/:id/bookings", authMiddleware, EmployeeController.getBookings);

router.get("/:id/is-available", authMiddleware, EmployeeController.getEmployeeIsAvailable);
router.get("/:id/free-time", authMiddleware, EmployeeController.getEmployeeFreeTime);

module.exports = router;
