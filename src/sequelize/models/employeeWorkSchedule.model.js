const { DataTypes, Model } = require("sequelize");

class EmployeeWorkSchedulePersistence extends Model {}

const modelName = "EmployeeWorkSchedule";

module.exports = (sequelize) => {
  EmployeeWorkSchedulePersistence.init(
    {
      employeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "EmployeeID",
        references: {
          model: "Employees",
          key: "EmployeeID",
        },
      },
      workScheduleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "WorkScheduleID",
        references: {
          model: "WorkSchedules",
          key: "WorkScheduleID",
        },
      },
    },
    {
      sequelize,
      tableName: "EmployeeWorkSchedules",
      modelName,
      timestamps: false,
    }
  );
};
