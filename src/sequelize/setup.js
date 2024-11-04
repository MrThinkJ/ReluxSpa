function applySetup(sequelize) {
  const { Service, ServiceCategory, Promotion, WorkSchedule, Role, Location } = sequelize.models;

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
}

module.exports = { applySetup };
