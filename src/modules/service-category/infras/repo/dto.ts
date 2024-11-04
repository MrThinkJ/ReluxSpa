import { DataTypes, Model, Sequelize } from "sequelize";

export class ServiceCategoryPersistence extends Model {}

export const modelName = "ServiceCategory";

export const init = (sequelize: Sequelize) => {
  ServiceCategoryPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "CategoryID",
      },
      name: {
        type: DataTypes.STRING,
        field: "Name",
      },
      descriptionShort: {
        type: DataTypes.TEXT,
        field: "DescriptionShort",
      },
      typeService: {
        type: DataTypes.STRING,
        field: "TypeService",
      },
    },
    {
      sequelize,
      tableName: "ServicesCategories",
      modelName,
      timestamps: false,
    }
  );
};
