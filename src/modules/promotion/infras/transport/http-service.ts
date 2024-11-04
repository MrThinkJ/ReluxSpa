import { PromotionUpdateDTO, PromotionCondDTO, PromotionCreateDTO } from "../../model/dto";
import { Promotion } from "../../model/model";

import { BaseHttpService } from "@share/transport/http-service";
import { IPromotionService } from "../../interface/interface";

export class PromotionHttpService extends BaseHttpService<
  Promotion,
  PromotionCondDTO,
  PromotionCreateDTO,
  PromotionUpdateDTO
> {
  constructor(readonly service: IPromotionService) {
    super(service);
  }
}
