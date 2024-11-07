const ResetPasswordService = require("../services/resetPassword.service");

class ResetPasswordController {
  async requestResetPassword(req, res) {
    const { email } = req.body;
    const result = await ResetPasswordService.sendOTP(email);
    res.json(result);
  }

  async verifyOTP(req, res) {
    const { email, otpCode } = req.body;
    const result = await ResetPasswordService.verifyOTP(email, otpCode);
    res.json(result);
  }

  async resetPassword(req, res) {
    const { token, newPassword, email } = req.body;
    const result = await ResetPasswordService.resetPassword(token, newPassword, email);
    res.json(result);
  }
}

module.exports = new ResetPasswordController();
