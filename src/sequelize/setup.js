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
  });
  ServiceCategory.hasMany(Service, {
    foreignKey: "categoryId",
    sourceKey: "id",
    field: "CategoryID",
  });

  // Service & Promotion relationship
  Service.belongsTo(Promotion, {
    foreignKey: "promotionId",
    targetKey: "id",
    field: "PromotionID",
  });
  Promotion.hasMany(Service, {
    foreignKey: "promotionId",
    sourceKey: "id",
    field: "PromotionID",
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
  });
  Employee.hasMany(Booking, {
    foreignKey: "employeeId",
    sourceKey: "id",
    field: "EmployeeID",
  });

  // Booking & Customer relationship
  Booking.belongsTo(User, {
    foreignKey: "customerId",
    targetKey: "id",
    field: "CustomerID",
  });
  User.hasMany(Booking, {
    foreignKey: "customerId",
    sourceKey: "id",
    field: "CustomerID",
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
