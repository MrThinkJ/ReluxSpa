const {
  PaymentMethodCondDTOSchema,
  PaymentMethodCreateDTOSchema,
  PaymentMethodUpdateDTOSchema,
} = require("../validation/paymentMethod.validation");
const { ErrDataNotFound } = require("../errors/base.error");

class PaymentMethodService {
  list = async (paging, cond) => {
    const condDTO = PaymentMethodCondDTOSchema.parse(cond);
    const result = await models.PaymentMethod.findAll({
      where: condDTO,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
    });
    return result.map((paymentMethod) => paymentMethod.get({ plain: true }));
  };

  getDetail = async (id) => {
    const paymentMethod = await models.PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      throw ErrDataNotFound;
    }
    return paymentMethod.get({ plain: true });
  };

  create = async (data) => {
    const value = PaymentMethodCreateDTOSchema.parse(data);
    const paymentMethod = await models.PaymentMethod.create(value);
    return paymentMethod.get({ plain: true }).id;
  };

  update = async (id, data) => {
    const value = PaymentMethodUpdateDTOSchema.parse(data);
    const paymentMethod = await models.PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      throw ErrDataNotFound;
    }
    await models.PaymentMethod.update(value, { where: { id } });
    return true;
  };

  delete = async (id) => {
    const paymentMethod = await models.PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      throw ErrDataNotFound;
    }
    await models.PaymentMethod.destroy({ where: { id } });
    return true;
  };
}

module.exports = new PaymentMethodService();
