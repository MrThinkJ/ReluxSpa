const { models } = require("../sequelize");
const { ErrDataNotFound } = require("../errors/base.error");
const { ContactCondDTOSchema, ContactCreateDTOSchema } = require("../validation/contact.validation");

class ContactService {
  list = async (paging, cond) => {
    const condValue = ContactCondDTOSchema.parse(cond);
    const result = await models.Contact.findAll({
      where: condValue,
      limit: paging.limit,
      offset: (paging.page - 1) * paging.limit,
    });
    return result.map((contact) => contact.get({ plain: true }));
  };

  getDetail = async (id) => {
    const contact = await models.Contact.findByPk(id);
    if (!contact) {
      throw ErrDataNotFound;
    }
    return contact.get({ plain: true });
  };

  getByEmail = async (email) => {
    const contact = await models.Contact.findOne({ where: { email } });
    return contact ? contact.get({ plain: true }) : null;
  };

  create = async (data) => {
    const value = ContactCreateDTOSchema.parse(data);
    const contact = await models.Contact.create(value);
    return contact.get({ plain: true }).id;
  };
}

module.exports = new ContactService();
