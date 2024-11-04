import {
  BaseCommandRepositorySequelize,
  BaseQueryRepositorySequelize,
  BaseRepositorySequelize,
} from "@share/repository/repo-sequelize";
import { modelName, ServiceCategoryPersistence } from "./dto";
import { ServiceCategory } from "../../model/model";
import { ServiceCategoryCondDTO, ServiceCategoryUpdateDTO } from "../../model/dto";
import { ICommandRepository, IQueryRepository } from "@share/interface";
import { Sequelize } from "sequelize";

export class MySQLServiceCategoryRepository extends BaseRepositorySequelize<
  ServiceCategory,
  ServiceCategoryCondDTO,
  ServiceCategoryUpdateDTO
> {
  constructor(
    readonly queryRepo: IQueryRepository<ServiceCategory, ServiceCategoryCondDTO>,
    readonly commandRepo: ICommandRepository<ServiceCategory, ServiceCategoryUpdateDTO>
  ) {
    super(queryRepo, commandRepo);
  }
}

export class MySQLServiceCategoryQueryRepository extends BaseQueryRepositorySequelize<
  ServiceCategory,
  ServiceCategoryCondDTO
> {
  constructor(readonly sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}

export class MySQLServiceCategoryCommandRepository extends BaseCommandRepositorySequelize<
  ServiceCategory,
  ServiceCategoryUpdateDTO
> {
  constructor(readonly sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}
