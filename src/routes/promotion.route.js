const PromotionController = require("../controllers/promotion.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.get("/", PromotionController.list);
router.get("/:id", PromotionController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), PromotionController.create);
router.patch("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), PromotionController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), PromotionController.delete);

module.exports = router;
