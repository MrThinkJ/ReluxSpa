const { DataTypes, Model } = require("sequelize");

class PasswordResetTokenPersistence extends Model {}

const modelName = "PasswordResetToken";

module.exports = (sequelize) =>
  PasswordResetTokenPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ResetTokenID",
      },
      expiryDate: {
        type: DataTypes.DATE,
        field: "ExpiryDate",
      },
      token: {
        type: DataTypes.STRING,
        field: "Token",
      },
    },
    {
      sequelize,
      tableName: "password_reset_token",
      modelName,
      timestamps: false,
    }
  );
