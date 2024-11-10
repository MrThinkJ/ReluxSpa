function applySetup(sequelize) {
  const {
    Service,
    ServiceCategory,
    Promotion,
    WorkSchedule,
    Role,
    Location,
    Employee,
    Booking,
    EmployeeWorkSchedule,
    Otp,
    PasswordResetToken,
    User,
    BookingService,
  } = sequelize.models;

  // Service & ServiceCategory relationship
  Service.belongsTo(ServiceCategory, {
    foreignKey: "categoryId",
    targetKey: "id",
    field: "CategoryID",
    as: "category",
  });
  ServiceCategory.hasMany(Service, {
    foreignKey: "categoryId",
    sourceKey: "id",
    field: "CategoryID",
    as: "services",
  });

  // Service & Promotion relationship
  Service.belongsTo(Promotion, {
    foreignKey: "promotionId",
    targetKey: "id",
    field: "PromotionID",
    as: "promotion",
  });
  Promotion.hasMany(Service, {
    foreignKey: "promotionId",
    sourceKey: "id",
    field: "PromotionID",
    as: "services",
  });

  // Employee & WorkSchedule relationship
  Employee.belongsToMany(WorkSchedule, {
    through: EmployeeWorkSchedule,
    foreignKey: "employeeId",
    otherKey: "workScheduleId",
  });
  WorkSchedule.belongsToMany(Employee, {
    through: EmployeeWorkSchedule,
    foreignKey: "workScheduleId",
    otherKey: "employeeId",
  });

  // Booking & Location relationship
  Booking.belongsTo(Location, {
    foreignKey: "locationId",
    targetKey: "id",
    field: "LocationID",
    as: "location",
  });
  Location.hasMany(Booking, {
    foreignKey: "locationId",
    sourceKey: "id",
    field: "LocationID",
  });

  // Booking & Employee relationship
  Booking.belongsTo(Employee, {
    foreignKey: "employeeId",
    targetKey: "id",
    field: "EmployeeID",
    as: "employee",
  });
  Employee.hasMany(Booking, {
    foreignKey: "employeeId",
    sourceKey: "id",
    field: "EmployeeID",
    as: "bookings",
  });

  // Booking & Customer relationship
  Booking.belongsTo(User, {
    foreignKey: "customerId",
    targetKey: "id",
    field: "CustomerID",
    as: "customer",
  });
  User.hasMany(Booking, {
    foreignKey: "customerId",
    sourceKey: "id",
    field: "CustomerID",
    as: "bookings",
  });

  // Booking & Service relationship
  Booking.belongsToMany(Service, {
    through: BookingService,
    foreignKey: "bookingId",
    otherKey: "serviceId",
  });
  Service.belongsToMany(Booking, {
    through: BookingService,
    foreignKey: "serviceId",
    otherKey: "bookingId",
  });

  // User & PasswordResetToken relationship
  User.hasMany(PasswordResetToken, {
    foreignKey: "userId",
    targetKey: "id",
    field: "UserID",
  });
  PasswordResetToken.belongsTo(User, {
    foreignKey: "userId",
    targetKey: "id",
    field: "UserID",
  });
}

module.exports = { applySetup };
