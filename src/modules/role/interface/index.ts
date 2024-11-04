import { IQueryRepository, IQueryService } from "@share/interface";
import { Role, RoleCondDTO } from "../model/model";

export interface IRoleService extends IQueryService<Role, RoleCondDTO> {}
