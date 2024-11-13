const router = require("express").Router();
const ServiceController = require("../controllers/service.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

router.get("/", ServiceController.list);
router.get("/:id", ServiceController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN"]), ServiceController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN"]), ServiceController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN"]), ServiceController.delete);
router.get("/category/:categoryId", ServiceController.getByCategoryId);
router.get("/promotion", ServiceController.getServiceHasPromotion);
module.exports = router;
