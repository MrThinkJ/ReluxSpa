const router = require("express").Router();
const ResetPasswordController = require("../controllers/resetPassword.controller");
const { authMiddleware } = require("../middlewares/auth");

router.post("/reset-request", ResetPasswordController.requestResetPassword);
router.post("/verify-otp", ResetPasswordController.verifyOTP);
router.post("/reset-password", ResetPasswordController.resetPassword);

module.exports = router;
