import { Sequelize } from "sequelize";
import { ServiceContext } from "@share/interface/context";
import { init } from "./infras/repo/dto";
import { MySQLServiceCategoryQueryRepository } from "./infras/repo/repo";
import { MySQLServiceCategoryCommandRepository } from "./infras/repo/repo";
import { ServiceCategoryService } from "./service/service";
import { ServiceCategoryHttpService } from "./infras/transport/http-service";
import { MySQLServiceCategoryRepository } from "./infras/repo/repo";
import { UserRole } from "@share/interface";
import { Router } from "express";

export const setUpServiceCategoryModule = (sequelize: Sequelize, sctx: ServiceContext) => {
  init(sequelize);
  const queryRepo = new MySQLServiceCategoryQueryRepository(sequelize);
  const commandRepo = new MySQLServiceCategoryCommandRepository(sequelize);
  const serviceCategoryRepo = new MySQLServiceCategoryRepository(queryRepo, commandRepo);
  const serviceCategoryService = new ServiceCategoryService(serviceCategoryRepo);
  const serviceCategoryHttpService = new ServiceCategoryHttpService(serviceCategoryService);

  const { auth, allowRoles } = sctx.mdlFactory;
  const adminChecker = allowRoles([UserRole.ADMIN]);
  const router = Router();

  router.get("/", serviceCategoryHttpService.listAPI.bind(serviceCategoryHttpService));
  router.get("/:id", serviceCategoryHttpService.getDetailAPI.bind(serviceCategoryHttpService));
  router.post("/", auth, adminChecker, serviceCategoryHttpService.createAPI.bind(serviceCategoryHttpService));
  router.patch("/:id", auth, adminChecker, serviceCategoryHttpService.updateAPI.bind(serviceCategoryHttpService));
  router.delete("/:id", auth, adminChecker, serviceCategoryHttpService.deleteAPI.bind(serviceCategoryHttpService));
  return router;
};
