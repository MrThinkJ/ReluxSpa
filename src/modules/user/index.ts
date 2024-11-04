import { MySQLUserCommandRepository, MySQLUserRepository } from "./infras/repository/repo";

import { Sequelize } from "sequelize";
import { MySQLUserQueryRepository } from "./infras/repository/repo";
import { jwtProvider } from "@share/component/jwt";
import { UserService } from "./service/service";
import { ServiceContext } from "@share/interface/context";
import { Router } from "express";
import { UserHttpService } from "./infras/transport/http-service";
import { MySQLRoleQueryRepository } from "../role/infras/repository/repo";
import { IQueryRepository, UserRole } from "@share/interface";
import { init } from "./infras/repository/dto";
import { initRole } from "../role/infras/repository/dto";
import { Role } from "../role/model/model";
import { RoleCondDTO } from "../role/model/model";

export const setUpUserModule = (
  sequelize: Sequelize,
  roleRepo: IQueryRepository<Role, RoleCondDTO>,
  sctx: ServiceContext
) => {
  init(sequelize);
  initRole(sequelize);
  const queryRepo = new MySQLUserQueryRepository(sequelize);
  const commandRepo = new MySQLUserCommandRepository(sequelize);
  const userRepo = new MySQLUserRepository(queryRepo, commandRepo);
  const jwt = jwtProvider;

  const userService = new UserService(userRepo, jwt, roleRepo);
  const httpService = new UserHttpService(userService);

  const { auth, allowRoles } = sctx.mdlFactory;
  const adminChecker = allowRoles([UserRole.ADMIN]);

  const router = Router();
  router.post("/register", httpService.registerAPI.bind(httpService));
  router.post("/login", httpService.loginAPI.bind(httpService));
  router.get("/profile", auth, httpService.profileAPI.bind(httpService));

  router.post("/users", auth, adminChecker, httpService.createAPI.bind(httpService));
  router.patch("/users/:id", auth, adminChecker, httpService.updateAPI.bind(httpService));
  router.delete("/users/:id", auth, adminChecker, httpService.deleteAPI.bind(httpService));
  router.get("/users/:id", auth, adminChecker, httpService.getDetailAPI.bind(httpService));
  router.get("/users", auth, adminChecker, httpService.listAPI.bind(httpService));

  return router;
};
