import { BaseHttpService } from "@share/transport/http-service";
import { IServiceCategoryService } from "../../interface/interface";
import { ServiceCategory } from "../../model/model";
import { ServiceCategoryCondDTO, ServiceCategoryCreateDTO, ServiceCategoryUpdateDTO } from "../../model/dto";

export class ServiceCategoryHttpService extends BaseHttpService<
  ServiceCategory,
  ServiceCategoryCondDTO,
  ServiceCategoryCreateDTO,
  ServiceCategoryUpdateDTO
> {
  constructor(private readonly serviceCategoryService: IServiceCategoryService) {
    super(serviceCategoryService);
  }
}
