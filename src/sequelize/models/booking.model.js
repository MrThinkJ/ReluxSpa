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
      name: {
        type: DataTypes.STRING,
        field: "Name",
      },
      email: {
        type: DataTypes.STRING,
        field: "Email",
      },
      phone: {
        type: DataTypes.STRING,
        field: "Phone",
      },
      bookingTime: {
        type: DataTypes.DATE,
        field: "BookingTime",
      },
      bookingNotes: {
        type: DataTypes.TEXT,
        field: "BookingNotes",
      },
    },
    {
      sequelize,
      tableName: "Bookings",
      modelName,
      timestamps: false,
    }
  );
