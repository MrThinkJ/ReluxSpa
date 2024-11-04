import { IQueryRepository } from "@share/interface";
import { IRoleService } from "../interface";
import { PagingDTO } from "@share/component/model/paging";
import { Role, RoleCondDTO } from "../model/model";
import { ErrDataNotFound } from "@share/component/model/base-error";

export class RoleService implements IRoleService {
  constructor(private readonly repository: IQueryRepository<Role, RoleCondDTO>) {}
  async getDetail(id: number): Promise<Role | null> {
    return await this.repository.get(id);
  }
  async list(paging: PagingDTO, cond: RoleCondDTO): Promise<Role[]> {
    return await this.repository.list(paging, cond);
  }
  async get(id: number): Promise<Role | null> {
    const role = await this.repository.get(id);
    if (!role) {
      throw ErrDataNotFound;
    }
    return role;
  }
}
