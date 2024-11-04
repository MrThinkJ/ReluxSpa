const { DataTypes, Model } = require("sequelize");

class WorkSchedulePersistence extends Model {}

const modelName = "WorkSchedule";

module.exports = (sequelize) => {
  WorkSchedulePersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "WorkScheduleID",
      },
      dayOfWeek: {
        type: DataTypes.STRING,
        field: "DayOfWeek",
      },
      startTime: {
        type: DataTypes.TIME,
        field: "StartTime",
      },
      endTime: {
        type: DataTypes.TIME,
        field: "EndTime",
      },
      isAvailable: {
        type: DataTypes.BOOLEAN,
        field: "IsAvailable",
        defaultValue: true,
      },
    },
    {
      sequelize,
      tableName: "WorkSchedules",
      modelName,
      timestamps: false,
    }
  );
};
