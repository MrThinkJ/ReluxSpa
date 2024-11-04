import { ICommandRepository, IQueryRepository, IRepository, IService } from "@share/interface";
import { Location } from "../model/model";
import { LocationCondDTO, LocationCreateDTO, LocationUpdateDTO } from "../model/dto";
export interface ILocationService extends IService<Location, LocationCondDTO, LocationCreateDTO, LocationUpdateDTO> {}

export interface ILocationRepository extends IRepository<Location, LocationCondDTO, LocationUpdateDTO> {}

export interface ILocationQueryRepository extends IQueryRepository<Location, LocationCondDTO> {}

export interface ILocationCommandRepository extends ICommandRepository<Location, LocationUpdateDTO> {}
