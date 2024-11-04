import { DataTypes, Model, Sequelize } from "sequelize";

class PromotionPersistence extends Model {}
export const modelName = "Promotion";
export const init = (sequelize: Sequelize) => {
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

export default PromotionPersistence;
