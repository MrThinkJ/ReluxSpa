import { PagingDTO } from "@share/component/model/paging";
import { IPromotionRepository, IPromotionService } from "../interface/interface";
import { Promotion } from "../model/model";
import {
  PromotionCondDTO,
  PromotionCondDTOSchema,
  PromotionCreateDTO,
  PromotionCreateDTOSchema,
  PromotionUpdateDTO,
  PromotionUpdateDTOSchema,
} from "../model/dto";
import { ErrDataNotFound } from "@share/component/model/base-error";

export class PromotionService implements IPromotionService {
  constructor(readonly repository: IPromotionRepository) {}
  async list(paging: PagingDTO, cond: PromotionCondDTO): Promise<Array<Promotion>> {
    const condDTO = PromotionCondDTOSchema.parse(cond);
    return await this.repository.list(paging, condDTO);
  }
  async getDetail(id: number): Promise<Promotion | null> {
    const promotion = await this.repository.get(id);
    if (!promotion) {
      throw ErrDataNotFound;
    }
    return promotion;
  }
  async create(data: PromotionCreateDTO): Promise<Promotion> {
    const promotionDTO = PromotionCreateDTOSchema.parse(data);
    return await this.repository.insert(promotionDTO);
  }
  async update(id: number, data: PromotionUpdateDTO): Promise<boolean> {
    const promotionDTO = PromotionUpdateDTOSchema.parse(data);
    const promotion = await this.repository.get(id);
    if (!promotion) {
      throw ErrDataNotFound;
    }
    await this.repository.update(id, promotionDTO);
    return true;
  }
  async delete(id: number): Promise<boolean> {
    const promotion = await this.repository.findByCond({ id });
    if (!promotion) {
      throw ErrDataNotFound;
    }
    await this.repository.delete(id);
    return true;
  }
}
