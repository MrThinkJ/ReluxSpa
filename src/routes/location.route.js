const LocationController = require("../controllers/location.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.get("/", authMiddleware, LocationController.list);
router.get("/:id", authMiddleware, LocationController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN"]), LocationController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN"]), LocationController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN"]), LocationController.delete);

module.exports = router;
