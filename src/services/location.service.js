const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const {
  LocationCondDTOSchema,
  LocationCreateDTOSchema,
  LocationUpdateDTOSchema,
} = require("../validation/location.validation");

class LocationService {
  list = async (paging, cond) => {
    const data = LocationCondDTOSchema.parse(cond);
    return await models.Location.findAll({
      where: data,
      limit: paging.limit,
      offset: paging.offset,
    });
  };

  getDetail = async (id) => {
    const location = await models.Location.findByPk(id);
    if (!location) {
      throw ErrDataNotFound;
    }
    return location;
  };

  create = async (data) => {
    const location = LocationCreateDTOSchema.parse(data);

    return await models.Location.create(location);
  };

  update = async (id, data) => {
    const locationData = LocationUpdateDTOSchema.parse(data);
    const location = await models.Location.findByPk(id);
    if (!location) {
      throw ErrDataNotFound;
    }
    await models.Location.update(locationData, { where: { id } });
    return true;
  };

  delete = async (id) => {
    const location = await models.Location.findByPk(id);
    if (!location) {
      throw ErrDataNotFound;
    }
    await models.Location.destroy({ where: { id } });
    return true;
  };
}

module.exports = new LocationService();
