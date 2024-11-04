import { PagingDTO } from "@share/component/model/paging";
import { IServiceCategoryRepository, IServiceCategoryService } from "../interface/interface";
import { ServiceCategory } from "../model/model";
import {
  ServiceCategoryCondDTO,
  ServiceCategoryCreateDTO,
  ServiceCategoryCreateDTOSchema,
  ServiceCategoryUpdateDTO,
  ServiceCategoryUpdateDTOSchema,
} from "../model/dto";
import { ErrDataNotFound } from "@share/component/model/base-error";

export class ServiceCategoryService implements IServiceCategoryService {
  constructor(private readonly serviceCategoryRepository: IServiceCategoryRepository) {}
  async list(paging: PagingDTO, cond: ServiceCategoryCondDTO): Promise<Array<ServiceCategory>> {
    return await this.serviceCategoryRepository.list(paging, cond);
  }
  async getDetail(id: number): Promise<ServiceCategory | null> {
    const serviceCategory = await this.serviceCategoryRepository.get(id);
    if (!serviceCategory) {
      throw ErrDataNotFound;
    }
    return serviceCategory;
  }
  async create(data: ServiceCategoryCreateDTO): Promise<ServiceCategory> {
    const serviceCategoryDTO = ServiceCategoryCreateDTOSchema.parse(data);
    return await this.serviceCategoryRepository.insert(serviceCategoryDTO);
  }
  async update(id: number, data: ServiceCategoryUpdateDTO): Promise<boolean> {
    const serviceCategoryDTO = ServiceCategoryUpdateDTOSchema.parse(data);
    const serviceCategory = await this.serviceCategoryRepository.get(id);
    if (!serviceCategory) {
      throw ErrDataNotFound;
    }
    await this.serviceCategoryRepository.update(id, serviceCategoryDTO);
    return true;
  }
  async delete(id: number): Promise<boolean> {
    const serviceCategory = await this.serviceCategoryRepository.get(id);
    if (!serviceCategory) {
      throw ErrDataNotFound;
    }
    await this.serviceCategoryRepository.delete(id);
    return true;
  }
}
