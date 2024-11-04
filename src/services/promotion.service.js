const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const {
  PromotionCondDTOSchema,
  PromotionCreateDTOSchema,
  PromotionUpdateDTOSchema,
} = require("../validation/promotion.validation");

class PromotionService {
  list = async (paging, cond) => {
    const data = PromotionCondDTOSchema.parse(cond);
    return await models.Promotion.findAll({
      where: data,
      limit: paging.limit,
      offset: paging.offset,
    });
  };

  getDetail = async (id) => {
    const promotion = await models.Promotion.findByPk(id);
    if (!promotion) {
      throw ErrDataNotFound;
    }
    return promotion;
  };

  create = async (data) => {
    const promotion = PromotionCreateDTOSchema.parse(data);
    return await models.Promotion.create(promotion);
  };

  update = async (id, data) => {
    const promotionData = PromotionUpdateDTOSchema.parse(data);
    const promotion = await models.Promotion.findByPk(id);
    if (!promotion) {
      throw ErrDataNotFound;
    }
    await models.Promotion.update(promotionData, { where: { id } });
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
