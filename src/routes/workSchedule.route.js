const WorkScheduleController = require("../controllers/workSchedule.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.get("/", WorkScheduleController.list);
router.get("/:id", WorkScheduleController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), WorkScheduleController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), WorkScheduleController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), WorkScheduleController.delete);

module.exports = router;
