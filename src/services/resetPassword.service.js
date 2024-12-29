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
    const otp = await models.Otp.findOne({
      where: { email, code: otpCode, isUsed: false },
    });
    if (!otp) {
      throw AppError.from(ErrInvalidOTP, 400);
    }
    if (otp.expiryDate < new Date()) {
      throw AppError.from(ErrOTPUsed, 400);
    }
    const token = this.generateToken();
    let accountToken = await models.AccountToken.findOne({
      where: { userId: user.id },
    });
    if (accountToken) {
      await models.AccountToken.update(
        {
          token: token,
          expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
          isUsed: false,
        },
        {
          where: { id: accountToken.id },
        }
      );
    } else {
      await models.AccountToken.create({
        token: token,
        expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
        isUsed: false,
        userId: user.id,
      });
    }
    await models.Otp.update({ isUsed: true }, { where: { id: otp.id } });
    return { isSuccess: true, resetPasswordToken: token };
  }

  async resetPassword(token, newPassword, email) {
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw AppError.from(ErrOTPNotFound, 404);
    }
    const accountToken = await models.AccountToken.findOne({
      where: { token, userId: user.id },
    });
    if (!accountToken) {
      throw AppError.from(ErrPasswordResetNotFound, 404);
    }
    if (accountToken.expiryDate < new Date()) {
      throw AppError.from(ErrPasswordResetExpired, 400);
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await models.User.update({ passwordHash }, { where: { id: user.id } });
    await models.AccountToken.update(
      { isUsed: true },
      { where: { id: accountToken.id } }
    );
    return { isSuccess: true };
  }
}

module.exports = new ResetPasswordService();
