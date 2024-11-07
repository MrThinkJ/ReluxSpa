const PaymentMethodController = require("../controllers/paymentMethod.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");
const router = require("express").Router();
router.get("/", authMiddleware, PaymentMethodController.list);
router.get("/:id", authMiddleware, PaymentMethodController.getDetail);
router.post("/", authMiddleware, allowRoles(["ADMIN"]), PaymentMethodController.create);
router.put("/:id", authMiddleware, allowRoles(["ADMIN"]), PaymentMethodController.update);
router.delete("/:id", authMiddleware, allowRoles(["ADMIN"]), PaymentMethodController.delete);

module.exports = router;
