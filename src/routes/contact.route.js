const ContactController = require("../controllers/contact.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.get("/", authMiddleware, allowRoles(["ADMIN"]), ContactController.list);
router.get("/:id", authMiddleware, allowRoles(["ADMIN"]), ContactController.getDetail);
router.get("/email", ContactController.getByEmail);
router.post("/", ContactController.create);

module.exports = router;
