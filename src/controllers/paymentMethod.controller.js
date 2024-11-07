const PaymentMethodService = require("../services/paymentMethod.service");
const { PagingDTOSchema } = require("../validation/paging.validation");

class PaymentMethodController {
  list = async (req, res, next) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
      res.status(400).json({
        message: "Invalid paging",
        error: error.message,
      });
    }
    const result = await PaymentMethodService.list(data, req.query);
    res.status(200).json({ data: result, paging: data, filter: req.query });
  };

  getDetail = async (req, res) => {
    const { id } = req.params;
    const result = await PaymentMethodService.getDetail(Number(id));
    res.status(200).json({ data: result });
  };

  create = async (req, res) => {
    const result = await PaymentMethodService.create(req.body);
    res.status(201).json({ data: result });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = await PaymentMethodService.update(Number(id), req.body);
    res.status(200).json({ data: result });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await PaymentMethodService.delete(Number(id));
    res.status(200).json({ data: result });
  };
}

module.exports = new PaymentMethodController();
