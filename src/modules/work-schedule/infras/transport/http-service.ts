import { BaseHttpService } from "@share/transport/http-service";
import { IWorkScheduleService } from "../../interface/interface";
import { WorkSchedule, WorkScheduleCondDTO, WorkScheduleCreateDTO, WorkScheduleUpdateDTO } from "../../model/model";

export class WorkScheduleHttpService extends BaseHttpService<
  WorkSchedule,
  WorkScheduleCondDTO,
  WorkScheduleCreateDTO,
  WorkScheduleUpdateDTO
> {
  constructor(private readonly workScheduleService: IWorkScheduleService) {
    super(workScheduleService);
  }
}
