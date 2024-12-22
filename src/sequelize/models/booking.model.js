const { DataTypes, Model } = require("sequelize");

class BookingPersistence extends Model {}

const modelName = "Booking";

module.exports = (sequelize) =>
  BookingPersistence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "BookingID",
      },
      bookingTime: {
        type: DataTypes.DATE,
        field: "BookingTime",
      },
      bookingNotes: {
        type: DataTypes.TEXT,
        field: "BookingNotes",
      },
      endTime: {
        type: DataTypes.DATE,
        field: "EndTime",
      },
    },
    {
      sequelize,
      tableName: "bookings",
      modelName,
      timestamps: false,
    }
  );
