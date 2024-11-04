import { PagingDTO } from "@share/component/model/paging";
import { IWorkScheduleRepository, IWorkScheduleService } from "../interface/interface";
import {
  WorkSchedule,
  WorkScheduleCondDTO,
  WorkScheduleCreateDTO,
  WorkScheduleCreateDTOSchema,
  WorkScheduleUpdateDTO,
  WorkScheduleUpdateDTOSchema,
} from "../model/model";
import { ErrDataNotFound } from "@share/component/model/base-error";

export class WorkScheduleService implements IWorkScheduleService {
  constructor(private readonly workScheduleRepository: IWorkScheduleRepository) {}

  async list(paging: PagingDTO, cond: WorkScheduleCondDTO): Promise<Array<WorkSchedule>> {
    return await this.workScheduleRepository.list(paging, cond);
  }

  async getDetail(id: number): Promise<WorkSchedule | null> {
    const workSchedule = await this.workScheduleRepository.get(id);
    if (!workSchedule) {
      throw ErrDataNotFound;
    }
    return workSchedule;
  }

  async create(data: WorkScheduleCreateDTO): Promise<WorkSchedule> {
    const workScheduleDTO = WorkScheduleCreateDTOSchema.parse(data);
    return await this.workScheduleRepository.insert(workScheduleDTO);
  }

  async update(id: number, data: WorkScheduleUpdateDTO): Promise<boolean> {
    const workScheduleDTO = WorkScheduleUpdateDTOSchema.parse(data);
    const workSchedule = await this.workScheduleRepository.get(id);
    if (!workSchedule) {
      throw ErrDataNotFound;
    }
    await this.workScheduleRepository.update(id, workScheduleDTO);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const workSchedule = await this.workScheduleRepository.get(id);
    if (!workSchedule) {
      throw ErrDataNotFound;
    }
    await this.workScheduleRepository.delete(id);
    return true;
  }
}
