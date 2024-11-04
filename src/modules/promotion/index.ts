import { Sequelize } from "sequelize";
import { init } from "./infras/repository/dto";
import { IPromotionService } from "./interface/interface";
import { MySQLPromotionRepository } from "./infras/repository/repo";
import { MySQLPromotionCommandRepository } from "./infras/repository/repo";
import { MySQLPromotionQueryRepository } from "./infras/repository/repo";
import { PromotionService } from "./service/service";
import { PromotionHttpService } from "./infras/transport/http-service";
import { ServiceContext } from "@share/interface/context";
import { UserRole } from "@share/interface";
import { Router } from "express";

export const setUpPromotionModule = (sequelize: Sequelize, sctx: ServiceContext) => {
  init(sequelize);
  const queryRepo = new MySQLPromotionQueryRepository(sequelize);
  const commandRepo = new MySQLPromotionCommandRepository(sequelize);
  const promotionRepo = new MySQLPromotionRepository(queryRepo, commandRepo);
  const promotionService = new PromotionService(promotionRepo);
  const promotionHttpService = new PromotionHttpService(promotionService);

  const { auth, allowRoles } = sctx.mdlFactory;
  const adminChecker = allowRoles([UserRole.ADMIN]);
  const router = Router();

  router.get("/", promotionHttpService.listAPI.bind(promotionHttpService));
  router.get("/:id", promotionHttpService.getDetailAPI.bind(promotionHttpService));
  router.post("/", auth, adminChecker, promotionHttpService.createAPI.bind(promotionHttpService));
  router.patch("/:id", auth, adminChecker, promotionHttpService.updateAPI.bind(promotionHttpService));
  router.delete("/:id", auth, adminChecker, promotionHttpService.deleteAPI.bind(promotionHttpService));

  return router;
};
