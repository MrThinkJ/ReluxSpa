import { PagingDTO } from "@share/component/model/paging";
import { ILocationRepository, ILocationService } from "../interface/interface";
import { Location } from "../model/model";
import {
  LocationCondDTO,
  LocationCreateDTO,
  LocationCreateDTOSchema,
  LocationUpdateDTO,
  LocationUpdateDTOSchema,
} from "../model/dto";
import { ErrDataNotFound } from "@share/component/model/base-error";

export class LocationService implements ILocationService {
  constructor(private readonly locationRepository: ILocationRepository) {}

  async list(paging: PagingDTO, cond: LocationCondDTO): Promise<Array<Location>> {
    return await this.locationRepository.list(paging, cond);
  }

  async getDetail(id: number): Promise<Location | null> {
    const location = await this.locationRepository.get(id);
    if (!location) {
      throw ErrDataNotFound;
    }
    return location;
  }

  async create(data: LocationCreateDTO): Promise<Location> {
    const locationDTO = LocationCreateDTOSchema.parse(data);
    return await this.locationRepository.insert(locationDTO);
  }

  async update(id: number, data: LocationUpdateDTO): Promise<boolean> {
    const locationDTO = LocationUpdateDTOSchema.parse(data);
    const location = await this.locationRepository.get(id);
    if (!location) {
      throw ErrDataNotFound;
    }
    await this.locationRepository.update(id, locationDTO);
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const location = await this.locationRepository.get(id);
    if (!location) {
      throw ErrDataNotFound;
    }
    await this.locationRepository.delete(id);
    return true;
  }
}
