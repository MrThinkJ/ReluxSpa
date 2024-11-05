"use strict";
const UserService = require("../services/user.service");
const { PagingDTOSchema } = require("../validation/paging.validation");

class UserController {
  profile = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const payload = await UserService.verifyToken(token);
      if (!payload) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      res.status(200).json({ data: payload });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  verifyToken = async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const result = await UserService.verifyToken(token);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  login = async (req, res) => {
    const result = await UserService.login(req.body);
    res.status(200).json({ data: result });
  };

  register = async (req, res) => {
    const result = await UserService.register(req.body);
    res.status(201).json({ data: result });
  };

  list = async (req, res) => {
    const { success, data, error } = PagingDTOSchema.safeParse(req.query);
    if (!success) {
      res.status(400).json({
        message: "Invalid paging",
        error: error.message,
      });
      return;
    }
    const result = await UserService.list(data, req.query);
    res.status(200).json({ data: result, paging: data, filter: req.query });
  };

  getDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await UserService.getDetail(Number(id));
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  create = async (req, res) => {
    const result = await UserService.create(req.body);
    res.status(201).json({ data: result });
  };

  update = async (req, res) => {
    const { id } = req.params;
    const result = await UserService.update(Number(id), req.body);
    res.status(200).json({ data: result });
  };

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await UserService.delete(Number(id));
    res.status(200).json({ data: result });
  };
}

module.exports = new UserController();
