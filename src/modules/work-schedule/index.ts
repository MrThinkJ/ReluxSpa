import { Sequelize } from "sequelize";
import { ServiceContext } from "@share/interface/context";
import { init } from "./infras/repository/dto";
import { MySQLWorkScheduleQueryRepository } from "./infras/repository/repo";
import { MySQLWorkScheduleCommandRepository } from "./infras/repository/repo";
import { WorkScheduleService } from "./service/service";
import { WorkScheduleHttpService } from "./infras/transport/http-service";
import { MySQLWorkScheduleRepository } from "./infras/repository/repo";
import { UserRole } from "@share/interface";
import { Router } from "express";

export const setUpWorkScheduleModule = (sequelize: Sequelize, sctx: ServiceContext) => {
  init(sequelize);
  const queryRepo = new MySQLWorkScheduleQueryRepository(sequelize);
  const commandRepo = new MySQLWorkScheduleCommandRepository(sequelize);
  const workScheduleRepo = new MySQLWorkScheduleRepository(queryRepo, commandRepo);
  const workScheduleService = new WorkScheduleService(workScheduleRepo);
  const workScheduleHttpService = new WorkScheduleHttpService(workScheduleService);

  const { auth, allowRoles } = sctx.mdlFactory;
  const adminChecker = allowRoles([UserRole.ADMIN]);
  const router = Router();

  router.get("/", workScheduleHttpService.listAPI.bind(workScheduleHttpService));
  router.get("/:id", workScheduleHttpService.getDetailAPI.bind(workScheduleHttpService));
  router.post("/", auth, adminChecker, workScheduleHttpService.createAPI.bind(workScheduleHttpService));
  router.patch("/:id", auth, adminChecker, workScheduleHttpService.updateAPI.bind(workScheduleHttpService));
  router.delete("/:id", auth, adminChecker, workScheduleHttpService.deleteAPI.bind(workScheduleHttpService));

  return router;
};
