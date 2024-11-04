const { Model, DataTypes } = require("sequelize");

class Service extends Model {}

const modelName = "Service";

module.exports = (sequelize) => {
  Service.init(
    {
      ServiceID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING(255),
      },
      Price: {
        type: DataTypes.DECIMAL,
      },
      DescriptionShort: {
        type: DataTypes.TEXT,
      },
      Description1: {
        type: DataTypes.TEXT,
      },
      ImageDescription: {
        type: DataTypes.STRING(255),
      },
      Description2: {
        type: DataTypes.TEXT,
      },
      ImageMain: {
        type: DataTypes.STRING(255),
      },
      Image_icon: {
        type: DataTypes.STRING(255),
      },
      Duration: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName,
      tableName: "Services",
      timestamps: false,
    }
  );

  return Service;
};
