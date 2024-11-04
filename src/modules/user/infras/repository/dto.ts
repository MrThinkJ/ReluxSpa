import { DataTypes, Model, Sequelize } from "sequelize";

export class UserPersistence extends Model {}

export const modelName = "User";

export const init = (sequelize: Sequelize) => {
  UserPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "UserID",
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(255),
        field: "Username",
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        field: "PasswordHash",
      },
      roleId: {
        type: DataTypes.INTEGER,
        field: "RoleID",
      },
      email: {
        type: DataTypes.STRING(255),
        field: "Email",
      },
      phone: {
        type: DataTypes.STRING(255),
        field: "Phone",
      },
      fullName: {
        type: DataTypes.STRING(255),
        field: "FullName",
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName,
      timestamps: false,
    }
  );
};
