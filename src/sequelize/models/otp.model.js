const { DataTypes, Model } = require("sequelize");

class OtpPersistence extends Model {}

const modelName = "Otp";

module.exports = (sequelize) => {
  OtpPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        field: "OTPID",
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        field: "Code",
      },
      email: {
        type: DataTypes.STRING,
        field: "Email",
      },
      expiryDate: {
        type: DataTypes.DATE,
        field: "ExpiryDate",
      },
      isUsed: {
        type: DataTypes.BOOLEAN,
        field: "IsUsed",
      },
    },
    {
      sequelize,
      tableName: "Otps",
      modelName,
      timestamps: false,
    }
  );
};
