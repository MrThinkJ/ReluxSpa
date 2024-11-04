import {
  BaseCommandRepositorySequelize,
  BaseQueryRepositorySequelize,
  BaseRepositorySequelize,
} from "@share/repository/repo-sequelize";
import { User, UserCondDTO, UserUpdateDTO } from "@modules/user/model";
import { modelName } from "./dto";
import { Sequelize } from "sequelize";

export class MySQLUserRepository extends BaseRepositorySequelize<User, UserCondDTO, UserUpdateDTO> {
  constructor(readonly queryRepo: MySQLUserQueryRepository, readonly commandRepo: MySQLUserCommandRepository) {
    super(queryRepo, commandRepo);
  }
}

export class MySQLUserQueryRepository extends BaseQueryRepositorySequelize<User, UserCondDTO> {
  constructor(readonly sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}

export class MySQLUserCommandRepository extends BaseCommandRepositorySequelize<User, UserUpdateDTO> {
  constructor(readonly sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}
