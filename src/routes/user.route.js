const UserController = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth");
const { allowRoles } = require("../middlewares/check-role");
const ImageController = require("../controllers/image.controller");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image."), false);
    }
  },
});

const router = require("express").Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/profile", authMiddleware, UserController.profile);

router.get("/users", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), UserController.list);
router.get("/users/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), UserController.getDetail);
router.post("/users", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), UserController.create);
router.patch("/users/:id", authMiddleware, UserController.update);
router.delete("/users/:id", authMiddleware, allowRoles(["ADMIN", "MANAGER"]), UserController.delete);

router.post("/users/avatar", authMiddleware, upload.single("avatar"), UserController.updateAvatar);

router.get("/images/:filename", ImageController.serveImage);

module.exports = router;
