const ContactService = require("../services/contact.service");
const { PagingDTOSchema } = require("../validation/paging.validation");

class ContactController {
  list = async (req, res) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
      res.status(400).json({
        message: "Invalid paging",
        error: error.message,
      });
      return;
    }
    const result = await ContactService.list(data, req.query);
    res.status(200).json({ data: result, paging: data, filter: req.query });
  };

  getDetail = async (req, res) => {
    const { id } = req.params;
    const result = await ContactService.getDetail(Number(id));
    res.status(200).json({ data: result });
  };

  getByEmail = async (req, res) => {
    const { email } = req.params;
    const result = await ContactService.getByEmail(email);
    res.status(200).json({ data: result });
  };

  create = async (req, res) => {
    const result = await ContactService.create(req.body);
    res.status(201).json({ data: result });
  };
}

module.exports = new ContactController();
