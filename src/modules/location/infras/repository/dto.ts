import { DataTypes, Model, Sequelize } from "sequelize";

export class LocationPersistence extends Model {}

export const modelName = "Location";

export const init = (sequelize: Sequelize) => {
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
      tableName: "Locations",
      modelName,
      timestamps: false,
    }
  );
};
