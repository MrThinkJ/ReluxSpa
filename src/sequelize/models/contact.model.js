const { DataTypes, Model } = require("sequelize");

class ContactPersistence extends Model {}

const modelName = "Contact";

module.exports = (sequelize) =>
  ContactPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ContactID",
      },
      customerName: {
        type: DataTypes.STRING,
        field: "CustomerName",
      },
      email: {
        type: DataTypes.STRING,
        field: "Email",
      },
      message: {
        type: DataTypes.TEXT,
        field: "Message",
      },
    },
    {
      sequelize,
      tableName: "Contact",
      modelName,
      timestamps: false,
    }
  );
 