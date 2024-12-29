const bcrypt = require("bcrypt");
const { AppError } = require("../app-error");
const { sendMail } = require("./mail.service");
const {
  ErrDataAlreadyExist,
  ErrDataNotFound,
  ErrInvalidToken,
} = require("../errors/base.error");
const {
  ErrInvalidEmailAndPassword,
  ErrUserNotActive,
  ErrUserNotFound,
  ErrUserAlreadyExist,
} = require("../errors/user.error");
const { models } = require("../sequelize");
const { verifyToken, generateToken } = require("../utils/jwt");
const {
  UserLoginDTOSchema,
  UserRegistrationDTOSchema,
  UserUpdateDTOSchema,
  UserCondDTOSchema,
  UserCreateDTOSchema,
} = require("../validation/user.validation");
const { PagingDTOSchema } = require("../validation/paging.validation");
const fileUpload = require("../utils/fileUpload");
const fs = require("fs").promises;
const { v7 } = require("uuid");

class UserService {
  async sendMail(email, accountToken) {
    const activationLink = `${process.env.URL}/v1/activate-account?token=${accountToken}`;
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Account activation",
      text: `Please click on the following link to activate your account: ${activationLink}`,
      html: `
        <h1>Welcome to Relux!</h1>
        <p>Please click on the following link to activate your account:</p>
        <a href="${activationLink}">Activate Account</a>
        <p>This link will expire in 24 hours.</p>
      `,
    };
    sendMail(mailOptions).catch((error) => {
      console.error("Failed to send activation email:", error);
    });
  }
  profile = async (username) => {
    const user = await models.User.findOne({ where: { username } });
    if (!user) {
      throw AppError.from(ErrUserNotFound, 404);
    }
    return user;
  };

  verifyToken = async (token) => {
    const payload = await verifyToken(token);
    if (!payload) {
      throw AppError.from(ErrInvalidToken, 400);
    }
    const user = await models.User.findOne({
      where: { username: payload.sub },
    });
    if (!user) {
      throw AppError.from(ErrUserNotFound, 404);
    }
    const { passwordHash, ...userData } = user.get({ plain: true });
    return userData;
  };

  login = async (data) => {
    const loginData = UserLoginDTOSchema.parse(data);
    const user = await models.User.findOne({
      where: { username: loginData.username },
    });
    if (!user) {
      throw AppError.from(ErrInvalidEmailAndPassword, 400);
    }

    const isPasswordMatch = await bcrypt.compare(
      loginData.password,
      user.passwordHash
    );
    if (!isPasswordMatch) {
      throw AppError.from(ErrInvalidEmailAndPassword, 400);
    }

    const role = await models.Role.findOne({ where: { id: user.roleId } });
    if (!role) {
      throw AppError.from(ErrDataNotFound, 404);
    }

    if (!user.isActive) {
      throw AppError.from(ErrUserNotActive, 400);
    }

    const payload = {
      sub: user.username,
      role: role.name,
    };

    const token = await generateToken(payload);
    return token;
  };

  register = async (data) => {
    const registerData = UserRegistrationDTOSchema.parse(data);
    const isUsernameExist = await models.User.findOne({
      where: { username: registerData.username },
    });
    if (isUsernameExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }
    const isEmailExist = await models.User.findOne({
      where: { email: registerData.email },
    });
    if (isEmailExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }
    const isPhoneExist = await models.User.findOne({
      where: { phone: registerData.phone },
    });
    if (isPhoneExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }

    const passwordHash = await bcrypt.hash(registerData.password, 10);
    const role = await models.Role.findOne({ where: { name: "USER" } });
    if (!role) {
      throw AppError.from(ErrDataNotFound, 404);
    }

    const user = {
      ...registerData,
      roleId: role.id,
      passwordHash,
      bookingCount: 0,
      isActive: false,
    };

    const createdUser = await models.User.create(user);

    const token = this.generateToken();
    await models.AccountToken.create({
      token: token,
      userId: createdUser.id,
      expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isUsed: false,
    });

    this.sendMail(user.email, token);
    return user;
  };

  list = async (paging, cond) => {
    const condData = UserCondDTOSchema.parse(cond);
    const { limit, offset } = PagingDTOSchema.parse(paging);
    const result = await models.User.findAll({
      where: condData,
      limit,
      offset,
    });
    const resultData = result.map((user) => user.get({ plain: true }));
    return resultData;
  };

  getDetail = async (id) => {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    return user.get({ plain: true });
  };

  create = async (data) => {
    const createData = UserCreateDTOSchema.parse(data);
    const isUsernameExist = await models.User.findOne({
      where: { username: createData.username },
    });
    if (isUsernameExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }

    const isEmailExist = await models.User.findOne({
      where: { email: createData.email },
    });
    if (isEmailExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }

    const isPhoneExist = await models.User.findOne({
      where: { phone: createData.phone },
    });
    if (isPhoneExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }

    const passwordHash = await bcrypt.hash(createData.password, 10);
    const role = await models.Role.findByPk(createData.roleId);
    if (!role) {
      throw AppError.from(ErrDataNotFound, 404);
    }

    const user = {
      ...createData,
      roleId: role.id,
      passwordHash,
    };

    await models.User.create(user);
    return user;
  };

  update = async (username, data) => {
    const updateData = UserUpdateDTOSchema.parse(data);
    const user = await models.User.findOne({ where: { username } });
    if (!user) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.User.update(updateData, { where: { username } });
    return true;
  };

  delete = async (id) => {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.User.destroy({ where: { id } });
    return true;
  };

  updateAvatar = async (username, file) => {
    const user = await models.User.findOne({ where: { username } });
    if (!user) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    if (user.avatar) {
      try {
        await fs.unlink(fileUpload.getImagePath(user.avatar));
      } catch (error) {
        console.error("Error deleting old avatar:", error);
      }
    }

    const filename = await fileUpload.saveImage(file);
    await models.User.update({ avatar: filename }, { where: { username } });

    return true;
  };

  activateAccount = async (token) => {
    const accountToken = await models.AccountToken.findOne({
      where: { token, isUsed: false },
    });

    if (!accountToken) {
      throw AppError.from(ErrInvalidToken, 400);
    }

    if (accountToken.expiryDate < new Date()) {
      throw AppError.from(new Error("Activation link has expired"), 400);
    }

    const user = await models.User.findByPk(accountToken.userId);

    if (!user) {
      throw AppError.from(ErrUserNotFound, 404);
    }

    await Promise.all([
      models.User.update({ isActive: true }, { where: { id: user.id } }),
      models.AccountToken.update(
        { isUsed: true },
        { where: { id: accountToken.id } }
      ),
    ]);

    return true;
  };

  generateToken() {
    const token = v7();
    return token;
  }
}

module.exports = new UserService();
