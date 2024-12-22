const { DataTypes, Model } = require("sequelize");

class LocationPersistence extends Model {}

const modelName = "Location";

module.exports = (sequelize) =>
  LocationPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "LocationID",
      },
      locationName: {
        type: DataTypes.STRING,
        field: "LocationName",
      },
      address: {
        type: DataTypes.STRING,
        field: "Address",
      },
    },
    {
      sequelize,
      tableName: "locations",
      modelName,
      timestamps: false,
    }
  );
