const router = require("express").Router();
const ServiceCategoryController = require("../controllers/serviceCategory.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

router.get("/", ServiceCategoryController.list);
router.get("/:id", ServiceCategoryController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), ServiceCategoryController.create);
router.put("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), ServiceCategoryController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), ServiceCategoryController.delete);

module.exports = router;
