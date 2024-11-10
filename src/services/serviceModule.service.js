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
    console.log(condValue);
    const result = await models.Service.findAll({
      where: condValue,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
      include: [
        {
          model: models.ServiceCategory,
          as: "category",
          attributes: ["id", "name", "descriptionShort", "typeService"],
        },
        {
          model: models.Promotion,
          as: "promotion",
          attributes: ["id", "description", "startDate", "endDate", "discountPercentage"],
        },
      ],
    });

    return result.map((service) => service.get({ plain: true }));
  };

  getDetail = async (id) => {
    const service = await models.Service.findByPk(id, {
      include: [
        {
          model: models.ServiceCategory,
          as: "category",
          attributes: ["id", "name", "descriptionShort", "typeService"],
        },
        {
          model: models.Promotion,
          as: "promotion",
          attributes: ["id", "description", "startDate", "endDate", "discountPercentage"],
        },
      ],
    });
    if (!service) {
      throw ErrDataNotFound;
    }
    return service.get({ plain: true });
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

  getByCategoryId = async (categoryId) => {
    const category = await models.ServiceCategory.findByPk(categoryId);
    if (!category) {
      throw ErrCategoryNotFound;
    }
    const services = await models.Service.findAll({ where: { categoryId } });
    return services.map((service) => service.get({ plain: true }));
  };
}

module.exports = new ServiceModuleService();
