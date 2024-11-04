import {
  BaseCommandRepositorySequelize,
  BaseQueryRepositorySequelize,
  BaseRepositorySequelize,
} from "@share/repository/repo-sequelize";
import { Location } from "../../model/model";
import { LocationCondDTO, LocationUpdateDTO } from "../../model/dto";
import { ICommandRepository, IQueryRepository } from "@share/interface";
import { Sequelize } from "sequelize";
import { modelName } from "./dto";

export class MySQLLocationRepository extends BaseRepositorySequelize<Location, LocationCondDTO, LocationUpdateDTO> {
  constructor(
    readonly queryRepo: IQueryRepository<Location, LocationCondDTO>,
    readonly commandRepo: ICommandRepository<Location, LocationUpdateDTO>
  ) {
    super(queryRepo, commandRepo);
  }
}

export class MySQLLocationQueryRepository extends BaseQueryRepositorySequelize<Location, LocationCondDTO> {
  constructor(readonly sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}

export class MySQLLocationCommandRepository extends BaseCommandRepositorySequelize<Location, LocationUpdateDTO> {
  constructor(readonly sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}
