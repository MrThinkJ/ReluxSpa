import { BaseHttpService } from "@share/transport/http-service";
import { ILocationService } from "../../interface/interface";
import { LocationCondDTO, LocationCreateDTO, LocationUpdateDTO } from "../../model/dto";
import { Location } from "../../model/model";

export class LocationHttpService extends BaseHttpService<
  Location,
  LocationCondDTO,
  LocationCreateDTO,
  LocationUpdateDTO
> {
  constructor(private readonly locationService: ILocationService) {
    super(locationService);
  }
}
