const { DataTypes, Model } = require("sequelize");

class AccountTokenPersistence extends Model {}

const modelName = "AccountToken";

module.exports = (sequelize) =>
  AccountTokenPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "AccountTokenID",
      },
      expiryDate: {
        type: DataTypes.DATE,
        field: "ExpiryDate",
      },
      token: {
        type: DataTypes.STRING,
        field: "Token",
      },
      isUsed: {
        type: DataTypes.BOOLEAN,
        field: "IsUsed",
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "accounttokens",
      modelName,
      timestamps: false,
    }
  );
