const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const {
  PromotionCondDTOSchema,
  PromotionCreateDTOSchema,
  PromotionUpdateDTOSchema,
} = require("../validation/promotion.validation");

class PromotionService {
  list = async (paging, cond) => {
    const condValue = PromotionCondDTOSchema.parse(cond);
    const result = await models.Promotion.findAll({
      where: condValue,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
    });
    return result.map((promotion) => promotion.get({ plain: true }));
  };

  getDetail = async (id) => {
    const promotion = await models.Promotion.findByPk(id);
    if (!promotion) {
      throw ErrDataNotFound;
    }
    return promotion.get({ plain: true });
  };

  create = async (data) => {
    const value = PromotionCreateDTOSchema.parse(data);
    const promotion = await models.Promotion.create(value);
    return promotion.get({ plain: true }).id;
  };

  update = async (id, data) => {
    const value = PromotionUpdateDTOSchema.parse(data);
    const promotion = await models.Promotion.findByPk(id);
    if (!promotion) {
      throw ErrDataNotFound;
    }
    await models.Promotion.update(value, { where: { id } });
    return true;
  };

  delete = async (id) => {
    const promotion = await models.Promotion.findByPk(id);
    if (!promotion) {
      throw ErrDataNotFound;
    }
    await models.Promotion.destroy({ where: { id } });
    return true;
  };
}

module.exports = new PromotionService();
