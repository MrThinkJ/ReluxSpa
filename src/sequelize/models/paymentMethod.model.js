const { DataTypes, Model } = require("sequelize");

class PaymentMethodPersistence extends Model {}

const modelName = "PaymentMethod";

module.exports = (sequelize) =>
  PaymentMethodPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "PaymentMethodID",
      },
      paymentMethodName: {
        type: DataTypes.STRING,
        field: "PaymentMethodName",
      },
      description: {
        type: DataTypes.TEXT,
        field: "Description",
      },
    },
    {
      sequelize,
      tableName: "PaymentMethods",
      modelName,
      timestamps: false,
    }
  );
