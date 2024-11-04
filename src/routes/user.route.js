const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/profile", authMiddleware, UserController.profile);

router.get("/users", authMiddleware, allowRoles(["ADMIN"]), UserController.list);
router.get("/users/:id", authMiddleware, allowRoles(["ADMIN"]), UserController.getDetail);
router.post("/users", authMiddleware, allowRoles(["ADMIN"]), UserController.create);
router.patch("/users/:id", authMiddleware, allowRoles(["ADMIN"]), UserController.update);
router.delete("/users/:id", authMiddleware, allowRoles(["ADMIN"]), UserController.delete);

module.exports = router;
