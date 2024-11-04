import { Sequelize } from "sequelize";
import {
  BaseCommandRepositorySequelize,
  BaseQueryRepositorySequelize,
  BaseRepositorySequelize,
} from "@share/repository/repo-sequelize";
import { WorkSchedule, WorkScheduleCondDTO, WorkScheduleUpdateDTO } from "../../model/model";
import { modelName } from "./dto";
import { ICommandRepository, IQueryRepository } from "@share/interface";

export class MySQLWorkScheduleRepository extends BaseRepositorySequelize<
  WorkSchedule,
  WorkScheduleCondDTO,
  WorkScheduleUpdateDTO
> {
  constructor(
    readonly queryRepo: IQueryRepository<WorkSchedule, WorkScheduleCondDTO>,
    readonly commandRepo: ICommandRepository<WorkSchedule, WorkScheduleUpdateDTO>
  ) {
    super(queryRepo, commandRepo);
  }
}

export class MySQLWorkScheduleQueryRepository extends BaseQueryRepositorySequelize<WorkSchedule, WorkScheduleCondDTO> {
  constructor(readonly sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}

export class MySQLWorkScheduleCommandRepository extends BaseCommandRepositorySequelize<
  WorkSchedule,
  WorkScheduleUpdateDTO
> {
  constructor(readonly sequelize: Sequelize) {
    super(sequelize, modelName);
  }
}
