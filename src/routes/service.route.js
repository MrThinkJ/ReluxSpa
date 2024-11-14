const router = require("express").Router();
const ServiceController = require("../controllers/service.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

router.get("/", ServiceController.list);
router.get("/promotion", ServiceController.getServiceHasPromotion);
router.get("/:id", ServiceController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), ServiceController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), ServiceController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), ServiceController.delete);
router.get("/category/:categoryId", ServiceController.getByCategoryId);

module.exports = router;
