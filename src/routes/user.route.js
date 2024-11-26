const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/profile", authMiddleware, UserController.profile);

router.get("/users", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), UserController.list);
router.get("/users/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), UserController.getDetail);
router.post("/users", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), UserController.create);
router.patch("/users/:id", authMiddleware, UserController.update);
router.delete("/users/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), UserController.delete);

module.exports = router;
