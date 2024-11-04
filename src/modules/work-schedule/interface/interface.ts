import { ICommandRepository, IQueryRepository, IRepository, IService } from "@share/interface";
import { WorkSchedule, WorkScheduleCondDTO, WorkScheduleCreateDTO, WorkScheduleUpdateDTO } from "../model/model";

export interface IWorkScheduleService
  extends IService<WorkSchedule, WorkScheduleCondDTO, WorkScheduleCreateDTO, WorkScheduleUpdateDTO> {}

export interface IWorkScheduleRepository
  extends IRepository<WorkSchedule, WorkScheduleCondDTO, WorkScheduleUpdateDTO> {}

export interface IWorkScheduleQueryRepository extends IQueryRepository<WorkSchedule, WorkScheduleCondDTO> {}

export interface IWorkScheduleCommandRepository extends ICommandRepository<WorkSchedule, WorkScheduleUpdateDTO> {}
