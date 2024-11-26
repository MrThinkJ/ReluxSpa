const { v7 } = require("uuid");
const { sendMail } = require("./mail.service");
const { models } = require("../sequelize");
const bcrypt = require("bcrypt");
const { AppError } = require("../app-error");
const {
  ErrUserNotFound,
  ErrInvalidOTP,
  ErrOTPUsed,
  ErrPasswordResetNotFound,
  ErrOTPNotFound,
} = require("../app-error");

class ResetPasswordService {
  generateOTP() {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    return otpCode;
  }

  generateToken() {
    const id = v7();
    const token = id + "-" + this.generateOTP();
    return token;
  }

  async sendMail(email, otpCode) {
    console.log(email, otpCode);
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP for reset password",
      text: `Your OTP is ${otpCode}`,
    };
    await sendMail(mailOptions);
  }

  async sendOTP(email) {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw AppError.from(ErrUserNotFound, 404);
    }
    await models.Otp.destroy({ where: { email, isUsed: false } });
    const otpCode = this.generateOTP();
    await this.sendMail(email, otpCode);
    const otp = {
      email: email,
      code: otpCode,
      isUsed: false,
      expiryDate: new Date(Date.now() + 1000 * 60 * 5),
    };
    await models.Otp.create(otp);
    return { isSuccess: true };
  }

  async verifyOTP(email, otpCode) {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw AppError.from(ErrUserNotFound, 404);
    }
    const otp = await models.Otp.findOne({ where: { email, code: otpCode, isUsed: false } });
    if (!otp) {
      throw AppError.from(ErrInvalidOTP, 400);
    }
    if (otp.expiresAt < new Date()) {
      throw AppError.from(ErrOTPUsed, 400);
    }
    const token = this.generateToken();
    const passwordReset = {
      token: token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      userId: user.id,
    };
    await models.PasswordResetToken.create(passwordReset);
    await models.Otp.update({ isUsed: true }, { where: { id: otp.id } });
    return { isSuccess: true, resetPasswordToken: token };
  }

  async resetPassword(token, newPassword, email) {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw AppError.from(ErrOTPNotFound, 404);
    }
    const passwordReset = await models.PasswordResetToken.findOne({
      where: { token, userId: user.id },
    });
    if (!passwordReset) {
      throw AppError.from(ErrPasswordResetNotFound, 404);
    }
    if (passwordReset.expiresAt < new Date()) {
      throw AppError.from(ErrPasswordResetExpired, 400);
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await models.User.update({ passwordHash }, { where: { id: user.id } });
    return { isSuccess: true };
  }
}

module.exports = new ResetPasswordService();
