"use strict";
const LocationService = require("../services/location.service");
const { PagingDTOSchema } = require("../validation/paging.validation");

class LocationController {
  list = async (req, res) => {
    try {
      const { success, data: paging, error } = PagingDTOSchema.safeParse(req.query);
      if (!success) {
        res.status(400).json({
          message: "Invalid paging",
          error: error.message,
        });
        return;
      }
      const result = await LocationService.list(paging, req.query);
      res.status(200).json({ data: result, paging, filter: req.query });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  getDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await LocationService.getDetail(Number(id));
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const result = await LocationService.create(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  update = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await LocationService.update(Number(id), req.body);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await LocationService.delete(Number(id));
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };
}

module.exports = new LocationController();
