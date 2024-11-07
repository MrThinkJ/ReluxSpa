const { DataTypes, Model } = require("sequelize");

class EmployeePersistence extends Model {}
const modelName = "Employee";

module.exports = (sequelize) => {
  EmployeePersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "EmployeeID",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "Name",
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "Description",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "Phone",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "Email",
      },
      specialtyType: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "SpecialtyType",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "Status",
      },
      hireDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "HireDate",
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "Avatar",
      },
    },
    {
      sequelize,
      tableName: "Employees",
      modelName,
      timestamps: false,
    }
  );
};
