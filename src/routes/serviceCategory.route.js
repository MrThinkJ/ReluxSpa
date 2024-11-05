const router = require("express").Router();
const ServiceCategoryController = require("../controllers/serviceCategory.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

router.get("/", ServiceCategoryController.list);
router.get("/:id", ServiceCategoryController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN"]), ServiceCategoryController.create);
router.put("/:id", authMiddleware, allowRoles(["ADMIN"]), ServiceCategoryController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN"]), ServiceCategoryController.delete);

module.exports = router;
