const { models } = require("../sequelize");
const { AppError } = require("../app-error");
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
      throw AppError.from(ErrDataNotFound, 404);
    }
    return service.get({ plain: true });
  };

  create = async (data) => {
    const value = ServiceCreateDTOSchema.parse(data);
    if (value.categoryId) {
      const category = await models.ServiceCategory.findByPk(value.categoryId);
      if (!category) {
        throw AppError.from(ErrCategoryNotFound, 404);
      }
    }
    if (value.promotionId) {
      const promotion = await models.Promotion.findByPk(value.promotionId);
      if (!promotion) {
        throw AppError.from(ErrPromotionNotFound, 404);
      }
    }
    const result = await models.Service.create(value);
    return result.get({ plain: true });
  };

  update = async (id, data) => {
    const value = ServiceUpdateDTOSchema.parse(data);
    const service = await models.Service.findByPk(id);
    if (!service) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    if (value.categoryId) {
      const category = await models.ServiceCategory.findByPk(value.categoryId);
      if (!category) {
        throw AppError.from(ErrCategoryNotFound, 404);
      }
    }
    if (value.promotionId) {
      const promotion = await models.Promotion.findByPk(value.promotionId);
      if (!promotion) {
        throw AppError.from(ErrPromotionNotFound, 404);
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
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.Service.destroy({
      where: { id },
    });
    return true;
  };

  getByCategoryId = async (categoryId) => {
    const category = await models.ServiceCategory.findByPk(categoryId);
    if (!category) {
      throw AppError.from(ErrCategoryNotFound, 404);
    }
    const services = await models.Service.findAll({ where: { categoryId } });
    return services.map((service) => service.get({ plain: true }));
  };

  getServiceHasPromotion = async () => {
    const services = await models.Service.findAll({
      where: { promotionId: { [Op.ne]: null } },
      include: [
        {
          model: models.Promotion,
          as: "promotion",
          attributes: ["id", "description", "startDate", "endDate", "discountPercentage"],
        },
      ],
    });
    return services.map((service) => service.get({ plain: true }));
  };
}

module.exports = new ServiceModuleService();
