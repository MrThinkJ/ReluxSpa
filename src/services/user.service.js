const bcrypt = require("bcrypt");
const { AppError } = require("../app-error");
const { ErrDataAlreadyExist, ErrDataNotFound, ErrInvalidToken } = require("../errors/base.error");
const { ErrInvalidEmailAndPassword } = require("../errors/user.error");
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

class UserService {
  profile = async (username) => {
    const user = await models.User.findOne({ where: { username } });
    if (!user) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    return user;
  };

  verifyToken = async (token) => {
    const payload = await verifyToken(token);
    if (!payload) {
      throw AppError.from(ErrInvalidToken, 400);
    }
    const user = await models.User.findOne({ where: { username: payload.sub } });
    if (!user) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    const { passwordHash, ...userData } = user.get({ plain: true });
    return userData;
  };

  login = async (data) => {
    const loginData = UserLoginDTOSchema.parse(data);
    const user = await models.User.findOne({ where: { username: loginData.username } });
    if (!user) {
      throw AppError.from(ErrInvalidEmailAndPassword, 400);
    }

    const isPasswordMatch = await bcrypt.compare(loginData.password, user.passwordHash);
    if (!isPasswordMatch) {
      throw AppError.from(ErrInvalidEmailAndPassword, 400);
    }

    const role = await models.Role.findOne({ where: { id: user.roleId } });
    if (!role) {
      throw AppError.from(ErrDataNotFound, 404);
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
    const isUsernameExist = await models.User.findOne({ where: { username: registerData.username } });
    if (isUsernameExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }
    const isEmailExist = await models.User.findOne({ where: { email: registerData.email } });
    if (isEmailExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }
    const isPhoneExist = await models.User.findOne({ where: { phone: registerData.phone } });
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
    };

    await models.User.create(user);
    return user;
  };

  list = async (paging, cond) => {
    const condData = UserCondDTOSchema.parse(cond);
    const { limit, offset } = PagingDTOSchema.parse(paging);
    const result = await models.User.findAll({ where: condData, limit, offset });
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
    const isUsernameExist = await models.User.findOne({ where: { username: createData.username } });
    if (isUsernameExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }

    const isEmailExist = await models.User.findOne({ where: { email: createData.email } });
    if (isEmailExist) {
      throw AppError.from(ErrDataAlreadyExist, 400);
    }

    const isPhoneExist = await models.User.findOne({ where: { phone: createData.phone } });
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
}

module.exports = new UserService();
