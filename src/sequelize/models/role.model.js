const { DataTypes, Model } = require("sequelize");

class RolePersistence extends Model {}

const modelName = "Role";

module.exports = (sequelize) => {
  RolePersistence.init(
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
