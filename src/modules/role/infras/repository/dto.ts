import { DataTypes, Model, Sequelize } from "sequelize";

export class RoleModel extends Model {}

export const modelName = "Role";

export const initRole = (sequelize: Sequelize) => {
  RoleModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "RoleID",
      },
      name: {
        type: DataTypes.STRING(255),
        field: "RoleName",
      },
    },
    {
      sequelize,
      modelName,
      tableName: "userroles",
      timestamps: false,
    }
  );
};
