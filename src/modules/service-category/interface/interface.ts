import { ICommandRepository, IQueryRepository, IRepository, IService } from "@share/interface";
import { ServiceCategory } from "../model/model";
import { ServiceCategoryCreateDTO, ServiceCategoryUpdateDTO, ServiceCategoryCondDTO } from "../model/dto";

export interface IServiceCategoryService
  extends IService<ServiceCategory, ServiceCategoryCondDTO, ServiceCategoryCreateDTO, ServiceCategoryUpdateDTO> {}

export interface IServiceCategoryRepository
  extends IRepository<ServiceCategory, ServiceCategoryCondDTO, ServiceCategoryUpdateDTO> {}

export interface IServiceCategoryQueryRepository extends IQueryRepository<ServiceCategory, ServiceCategoryCondDTO> {}

export interface IServiceCategoryCommandRepository
  extends ICommandRepository<ServiceCategory, ServiceCategoryUpdateDTO> {}
