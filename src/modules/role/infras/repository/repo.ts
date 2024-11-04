import { BaseQueryRepositorySequelize } from "@share/repository/repo-sequelize";
import { Sequelize } from "sequelize";
import { Role, RoleCondDTO } from "../../model/model";
import { modelName } from "./dto";

export class MySQLRoleQueryRepository extends BaseQueryRepositorySequelize<Role, RoleCondDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}
