"use strict";
const LocationService = require("../services/location.service");
const { PagingDTOSchema } = require("../validation/paging.validation");

class LocationController {
  list = async (req, res) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
      res.status(400).json({
        message: "Invalid paging",
        error: error.message,
      });
      return;
    }
    const result = await LocationService.list(data, req.query);
    res.status(200).json({ data: result, paging: data, filter: req.query });
  };

  getDetail = async (req, res) => {
    const { id } = req.params;
    const result = await LocationService.getDetail(Number(id));
    res.status(200).json({ data: result });
  };

  create = async (req, res) => {
    const result = await LocationService.create(req.body);
    res.status(201).json({ data: result });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = await LocationService.update(Number(id), req.body);
    res.status(200).json({ data: result });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await LocationService.delete(Number(id));
    res.status(200).json({ data: result });
  };
}

module.exports = new LocationController();
