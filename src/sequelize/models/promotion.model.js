const { DataTypes, Model } = require("sequelize");

class PromotionPersistence extends Model {}
const modelName = "Promotion";
module.exports = (sequelize) => {
  PromotionPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "PromotionID",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "Description",
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "StartDate",
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "EndDate",
      },
      discountPercentage: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "DiscountPercentage",
      },
    },
    {
      sequelize,
      tableName: "Promotions",
      modelName,
      timestamps: false,
    }
  );
};
