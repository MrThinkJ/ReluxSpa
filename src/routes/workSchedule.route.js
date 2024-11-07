const WorkScheduleController = require("../controllers/workSchedule.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.get("/", authMiddleware, WorkScheduleController.list);
router.get("/:id", authMiddleware, WorkScheduleController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN"]), WorkScheduleController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN"]), WorkScheduleController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN"]), WorkScheduleController.delete);

module.exports = router;
