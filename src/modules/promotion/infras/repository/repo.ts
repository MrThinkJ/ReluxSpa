import { Promotion } from "../../model/model";
import { PromotionCondDTO, PromotionUpdateDTO } from "../../model/dto";

import {
  BaseCommandRepositorySequelize,
  BaseQueryRepositorySequelize,
  BaseRepositorySequelize,
} from "@share/repository/repo-sequelize";
import { Sequelize } from "sequelize";
import { ICommandRepository, IQueryRepository } from "@share/interface";
import { modelName } from "./dto";

export class MySQLPromotionQueryRepository extends BaseQueryRepositorySequelize<Promotion, PromotionCondDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}

export class MySQLPromotionCommandRepository extends BaseCommandRepositorySequelize<Promotion, PromotionUpdateDTO> {
  constructor(sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}

export class MySQLPromotionRepository extends BaseRepositorySequelize<Promotion, PromotionCondDTO, PromotionUpdateDTO> {
  constructor(
    queryRepo: IQueryRepository<Promotion, PromotionCondDTO>,
    commandRepo: ICommandRepository<Promotion, PromotionUpdateDTO>
  ) {
    super(queryRepo, commandRepo);
  }
}
