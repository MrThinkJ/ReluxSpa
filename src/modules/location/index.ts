import { Sequelize } from "sequelize";
import { ServiceContext } from "@share/interface/context";
import { init } from "./infras/repository/dto";
import { MySQLLocationQueryRepository } from "./infras/repository/repo";
import { MySQLLocationCommandRepository } from "./infras/repository/repo";
import { LocationService } from "./service/service";
import { LocationHttpService } from "./infras/transport/http-service";
import { MySQLLocationRepository } from "./infras/repository/repo";
import { UserRole } from "@share/interface";
import { Router } from "express";

export const setUpLocationModule = (sequelize: Sequelize, sctx: ServiceContext) => {
  init(sequelize);
  const queryRepo = new MySQLLocationQueryRepository(sequelize);
  const commandRepo = new MySQLLocationCommandRepository(sequelize);
  const locationRepo = new MySQLLocationRepository(queryRepo, commandRepo);
  const locationService = new LocationService(locationRepo);
  const locationHttpService = new LocationHttpService(locationService);

  const { auth, allowRoles } = sctx.mdlFactory;
  const adminChecker = allowRoles([UserRole.ADMIN]);
  const router = Router();

  router.get("/", locationHttpService.listAPI.bind(locationHttpService));
  router.get("/:id", locationHttpService.getDetailAPI.bind(locationHttpService));
  router.post("/", auth, adminChecker, locationHttpService.createAPI.bind(locationHttpService));
  router.patch("/:id", auth, adminChecker, locationHttpService.updateAPI.bind(locationHttpService));
  router.delete("/:id", auth, adminChecker, locationHttpService.deleteAPI.bind(locationHttpService));

  return router;
};
