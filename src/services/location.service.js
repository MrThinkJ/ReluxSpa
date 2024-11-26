const { models } = require("../sequelize");
const { AppError } = require("../app-error");
const { ErrDataNotFound } = require("../errors/base.error");
const {
  LocationCondDTOSchema,
  LocationCreateDTOSchema,
  LocationUpdateDTOSchema,
} = require("../validation/location.validation");

class LocationService {
  list = async (paging, cond) => {
    const data = LocationCondDTOSchema.parse(cond);
    const result = await models.Location.findAll({
      where: data,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
    });
    return result.map((location) => location.get({ plain: true }));
  };

  getDetail = async (id) => {
    const location = await models.Location.findByPk(id);
    if (!location) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    return location.get({ plain: true });
  };

  create = async (data) => {
    const location = LocationCreateDTOSchema.parse(data);
    const newLocation = await models.Location.create(location);
    return newLocation.get({ plain: true }).id;
  };

  update = async (id, data) => {
    const locationData = LocationUpdateDTOSchema.parse(data);
    const location = await models.Location.findByPk(id);
    if (!location) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.Location.update(locationData, { where: { id } });
    return true;
  };

  delete = async (id) => {
    const location = await models.Location.findByPk(id);
    if (!location) {
      throw AppError.from(ErrDataNotFound, 404);
    }
    await models.Location.destroy({ where: { id } });
    return true;
  };
}

module.exports = new LocationService();
