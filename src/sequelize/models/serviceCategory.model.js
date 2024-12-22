const { DataTypes, Model } = require("sequelize");

class ServiceCategoryPersistence extends Model {}

const modelName = "ServiceCategory";

module.exports = (sequelize) => {
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
      tableName: "servicescategories",
      modelName,
      timestamps: false,
    }
  );
};
