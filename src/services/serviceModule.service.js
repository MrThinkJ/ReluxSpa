const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const {
  ServiceCondDTOSchema,
  ServiceCreateDTOSchema,
  ServiceUpdateDTOSchema,
} = require("../validation/service.validation");
const { Op } = require("sequelize");
const { ErrCategoryNotFound } = require("../errors/serviceCategory.error");
const { ErrPromotionNotFound } = require("../errors/promotion.error");
class ServiceModuleService {
  list = async (paging, cond) => {
    const condValue = ServiceCondDTOSchema.parse(cond);
    const result = await models.Service.findAll({
      where: condValue,
      limit: paging.limit,
      offset: paging.offset,
    });
    let resultData = result.map((service) => service.get({ plain: true }));
    const categoryIds = [
      ...new Set(result.map((service) => service.categoryId).filter((id) => id !== null && id !== undefined)),
    ];
    const categories = await models.ServiceCategory.findAll({
      where: { id: { [Op.in]: categoryIds } },
    });
    const categoryMap = new Map(
      categories.map((category) => [category.get({ plain: true }).id, category.get({ plain: true })])
    );
    const promotionIds = [
      ...new Set(result.map((service) => service.promotionId).filter((id) => id !== null && id !== undefined)),
    ];
    const promotions = await models.Promotion.findAll({
      where: { id: { [Op.in]: promotionIds } },
    });
    const promotionMap = new Map(
      promotions.map((promotion) => [promotion.get({ plain: true }).id, promotion.get({ plain: true })])
    );
    resultData.forEach((service) => {
      service.category = categoryMap.get(service.categoryId);
      service.promotion = promotionMap.get(service.promotionId);
    });
    return resultData;
  };

  getDetail = async (id) => {
    const service = await models.Service.findByPk(id);
    if (!service) {
      throw ErrDataNotFound;
    }
    const serviceData = service.get({ plain: true });
    if (serviceData.categoryId) {
      const serviceCategory = await models.ServiceCategory.findByPk(serviceData.categoryId);
      serviceData.category = serviceCategory.get({ plain: true });
    }
    if (serviceData.promotionId) {
      const promotion = await models.Promotion.findByPk(serviceData.promotionId);
      serviceData.promotion = promotion.get({ plain: true });
    }
    return serviceData;
  };

  create = async (data) => {
    const value = ServiceCreateDTOSchema.parse(data);
    if (value.categoryId) {
      const category = await models.ServiceCategory.findByPk(value.categoryId);
      if (!category) {
        throw ErrCategoryNotFound;
      }
    }
    if (value.promotionId) {
      const promotion = await models.Promotion.findByPk(value.promotionId);
      if (!promotion) {
        throw ErrPromotionNotFound;
      }
    }
    const result = await models.Service.create(value);
    return result.get({ plain: true });
  };

  update = async (id, data) => {
    const value = ServiceUpdateDTOSchema.parse(data);
    const service = await models.Service.findByPk(id);
    if (!service) {
      throw ErrDataNotFound;
    }
    if (value.categoryId) {
      const category = await models.ServiceCategory.findByPk(value.categoryId);
      if (!category) {
        throw ErrCategoryNotFound;
      }
    }
    if (value.promotionId) {
      const promotion = await models.Promotion.findByPk(value.promotionId);
      if (!promotion) {
        throw ErrPromotionNotFound;
      }
    }
    await models.Service.update(value, {
      where: { id },
    });
    return true;
  };

  delete = async (id) => {
    const service = await models.Service.findByPk(id);
    if (!service) {
      throw ErrDataNotFound;
    }
    await models.Service.destroy({
      where: { id },
    });
    return true;
  };
}

module.exports = new ServiceModuleService();
