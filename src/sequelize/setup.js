function applySetup(sequelize) {
  const {
    Service,
    ServiceCategory,
    Promotion,
    WorkSchedule,
    Role,
    Location,
    Employee,
    PaymentMethod,
    Booking,
    EmployeeWorkSchedule,
    Otp,
    PasswordResetToken,
    User,
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

  // Booking & PaymentMethod relationship
  Booking.belongsTo(PaymentMethod, {
    foreignKey: "paymentMethodId",
    targetKey: "id",
    field: "PaymentMethodID",
  });
  PaymentMethod.hasMany(Booking, {
    foreignKey: "paymentMethodId",
    sourceKey: "id",
    field: "PaymentMethodID",
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

  // Booking & Service relationship
  Booking.belongsTo(Service, {
    foreignKey: "serviceId",
    targetKey: "id",
    field: "ServiceID",
  });
  Service.hasMany(Booking, {
    foreignKey: "serviceId",
    sourceKey: "id",
    field: "ServiceID",
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
