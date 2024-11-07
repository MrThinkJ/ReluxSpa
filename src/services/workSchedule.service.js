const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const {
  WorkScheduleCondDTOSchema,
  WorkScheduleCreateDTOSchema,
  WorkScheduleUpdateDTOSchema,
} = require("../validation/workSchedule.validation");

class WorkScheduleService {
  list = async (paging, cond) => {
    const condValue = WorkScheduleCondDTOSchema.parse(cond);
    const result = await models.WorkSchedule.findAll({
      where: condValue,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
    });
    const resultData = result.map((schedule) => schedule.get({ plain: true }));
    return resultData;
  };

  getDetail = async (id) => {
    const schedule = await models.WorkSchedule.findByPk(id);
    if (!schedule) {
      throw ErrDataNotFound;
    }
    return schedule.get({ plain: true });
  };

  create = async (data) => {
    const value = WorkScheduleCreateDTOSchema.parse(data);
    if (value.startTime && value.endTime) {
      const [startHours, startMinutes] = value.startTime.split(":");
      const [endHours, endMinutes] = value.endTime.split(":");

      const startDate = new Date(1970, 0, 1, parseInt(startHours), parseInt(startMinutes));
      const endDate = new Date(1970, 0, 1, parseInt(endHours), parseInt(endMinutes));

      if (endDate <= startDate) {
        throw ErrEndTimeBeforeStartTime;
      }
      value.startTime = `${value.startTime}:00`;
      value.endTime = `${value.endTime}:00`;
    }

    const schedule = await models.WorkSchedule.create(value);
    return schedule.get({ plain: true });
  };

  update = async (id, data) => {
    const value = WorkScheduleUpdateDTOSchema.parse(data);
    const schedule = await models.WorkSchedule.findByPk(id);
    if (!schedule) {
      throw ErrDataNotFound;
    }
    await models.WorkSchedule.update(value, { where: { id } });
    return true;
  };

  delete = async (id) => {
    const schedule = await models.WorkSchedule.findByPk(id);
    if (!schedule) {
      throw ErrDataNotFound;
    }
    await models.WorkSchedule.destroy({ where: { id } });
    return true;
  };
}

module.exports = new WorkScheduleService();
