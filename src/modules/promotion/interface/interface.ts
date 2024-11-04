import { IQueryRepository, IRepository, IService } from "@share/interface";
import { Promotion } from "../model/model";
import { PromotionCondDTO, PromotionCreateDTO, PromotionUpdateDTO } from "../model/dto";

export interface IPromotionService
  extends IService<Promotion, PromotionCondDTO, PromotionCreateDTO, PromotionUpdateDTO> {}

export interface IPromotionRepository extends IRepository<Promotion, PromotionCondDTO, PromotionUpdateDTO> {}

export interface IPromotionQueryRepository extends IQueryRepository<Promotion, PromotionCondDTO> {}

export interface IPromotionCommandRepository extends IRepository<Promotion, PromotionCondDTO, PromotionUpdateDTO> {}
