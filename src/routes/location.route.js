const LocationController = require("../controllers/location.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.get("/", LocationController.list);
router.get("/:id", LocationController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), LocationController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), LocationController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), LocationController.delete);

module.exports = router;
