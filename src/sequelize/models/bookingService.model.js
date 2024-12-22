const { DataTypes, Model } = require("sequelize");

class BookingServicePersistence extends Model {}

const modelName = "BookingService";

module.exports = (sequelize) => {
  BookingServicePersistence.init(
    {
      bookingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "BookingID",
        references: {
          model: "Bookings",
          key: "BookingID",
        },
      },
      serviceId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "ServiceID",
        references: {
          model: "Services",
          key: "ServiceID",
        },
      },
    },
    {
      sequelize,
      tableName: "bookingservices",
      modelName,
      timestamps: false,
    }
  );
};
