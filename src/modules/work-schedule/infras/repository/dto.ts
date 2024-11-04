import { DataTypes, Model, Sequelize } from "sequelize";

export class WorkSchedulePersistence extends Model {}

export const modelName = "WorkSchedule";

export const init = (sequelize: Sequelize) => {
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
