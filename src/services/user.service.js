const bcrypt = require("bcrypt");
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

class UserService {
  profile = async (username) => {
    const user = await models.User.findOne({ where: { username } });
    if (!user) {
      throw ErrDataNotFound;
    }
    return user;
  };

  verifyToken = async (token) => {
    const payload = await verifyToken(token);
    if (!payload) {
      throw ErrInvalidToken;
    }
    const user = await models.User.findOne({ where: { username: payload.sub } });
    if (!user) {
      throw ErrDataNotFound;
    }
    return payload;
  };

  login = async (data) => {
    const loginData = UserLoginDTOSchema.parse(data);
    const user = await models.User.findOne({ where: { username: loginData.username } });
    if (!user) {
      throw ErrInvalidEmailAndPassword;
    }

    const isPasswordMatch = await bcrypt.compare(loginData.password, user.passwordHash);
    if (!isPasswordMatch) {
      throw ErrInvalidEmailAndPassword;
    }

    const role = await models.Role.findOne({ where: { id: user.roleId } });
    if (!role) {
      throw ErrDataNotFound;
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
      throw ErrDataAlreadyExist;
    }
    const isEmailExist = await models.User.findOne({ where: { email: registerData.email } });
    if (isEmailExist) {
      throw ErrDataAlreadyExist;
    }
    const isPhoneExist = await models.User.findOne({ where: { phone: registerData.phone } });
    if (isPhoneExist) {
      throw ErrDataAlreadyExist;
    }

    const passwordHash = await bcrypt.hash(registerData.password, 10);
    const role = await models.Role.findOne({ where: { name: "USER" } });
    if (!role) {
      throw ErrDataNotFound;
    }

    const user = {
      ...registerData,
      roleId: role.id,
      passwordHash,
    };

    await models.User.create(user);
    return user;
  };

  list = async (paging, cond) => {
    const condData = UserCondDTOSchema.parse(cond);
    const { limit, offset } = PagingDTOSchema.parse(paging);
    return await models.User.findAll({ where: condData, limit, offset });
  };

  getDetail = async (id) => {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw ErrDataNotFound;
    }
    return user;
  };

  create = async (data) => {
    const createData = UserCreateDTOSchema.parse(data);
    const isUsernameExist = await models.User.findOne({ where: { username: createData.username } });
    if (isUsernameExist) {
      throw ErrDataAlreadyExist;
    }

    const isEmailExist = await models.User.findOne({ where: { email: createData.email } });
    if (isEmailExist) {
      throw ErrDataAlreadyExist;
    }

    const isPhoneExist = await models.User.findOne({ where: { phone: createData.phone } });
    if (isPhoneExist) {
      throw ErrDataAlreadyExist;
    }

    const passwordHash = await bcrypt.hash(createData.password, 10);
    const role = await models.Role.findByPk(createData.roleId);
    if (!role) {
      throw ErrDataNotFound;
    }

    const user = {
      ...createData,
      roleId: role.id,
      passwordHash,
    };

    await models.User.create(user);
    return user;
  };

  update = async (id, data) => {
    const updateData = UserUpdateDTOSchema.parse(data);
    const user = await models.User.findByPk(id);
    if (!user) {
      throw ErrDataNotFound;
    }
    await models.User.update(updateData, { where: { id } });
    return true;
  };

  delete = async (id) => {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw ErrDataNotFound;
    }
    await models.User.destroy({ where: { id } });
    return true;
  };
}

module.exports = new UserService();
