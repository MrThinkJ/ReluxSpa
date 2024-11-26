const { models } = require("../sequelize");
const { AppError } = require("../app-error");
const { ErrDataNotFound } = require("../errors/base.error");
const {
  ServiceCategoryCondDTOSchema,
  ServiceCategoryCreateDTOSchema,
  ServiceCategoryUpdateDTOSchema,
} = require("../validation/serviceCategory.validation");

class ServiceCategoryService {
  list = async (paging, cond) => {
    const condValue = ServiceCategoryCondDTOSchema.parse(cond);
    const result = await models.ServiceCategory.findAll({
      where: condValue,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
    });
    const resultData = result.map((serviceCategory) => serviceCategory.get({ plain: true }));
    return resultData;
  };
  getDetail = async (id) => {
    const serviceCategory = await models.ServiceCategory.findByPk(id);
    if (!serviceCategory) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    return serviceCategory.get({ plain: true });
  };
  create = async (data) => {
    const value = ServiceCategoryCreateDTOSchema.parse(data);
    const serviceCategory = await models.ServiceCategory.create(value);
    return serviceCategory.get({ plain: true }).id;
  };
  update = async (id, data) => {
    const value = ServiceCategoryUpdateDTOSchema.parse(data);
    const serviceCategory = await models.ServiceCategory.findByPk(id);
    if (!serviceCategory) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.ServiceCategory.update(value, { where: { id } });
    return true;
  };
  delete = async (id) => {
    const serviceCategory = await models.ServiceCategory.findByPk(id);
    if (!serviceCategory) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.ServiceCategory.destroy({ where: { id } });
    return true;
  };
}

module.exports = new ServiceCategoryService();
