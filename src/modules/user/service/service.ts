import { PagingDTO } from "@share/component/model/paging";
import { IUserService } from "../interface";
import { IQueryRepository, IRepository, ITokenProvider, TokenPayload, UserRole } from "@share/interface";
import {
  User,
  UserCreateDTO,
  UserCreateDTOSchema,
  UserLoginDTO,
  UserLoginDTOSchema,
  UserRegistrationDTO,
  UserRegistrationDTOSchema,
  UserUpdateDTO,
  UserUpdateDTOSchema,
} from "../model";
import { UserCondDTO } from "../model";
import { ErrDataAlreadyExist, ErrDataNotFound, ErrInvalidToken } from "@share/component/model/base-error";
import bcrypt from "bcrypt";
import { ErrInvalidEmailAndPassword } from "../model/error";
import { RoleCondDTO } from "@modules/role/model/model";
import { Role } from "@modules/role/model/model";

export class UserService implements IUserService {
  constructor(
    readonly repository: IRepository<User, UserCondDTO, UserUpdateDTO>,
    readonly jwtProvider: ITokenProvider,
    readonly roleRepository: IQueryRepository<Role, RoleCondDTO>
  ) {}
  async profile(sub: string): Promise<User> {
    const user = await this.repository.findByCond({ username: sub });
    if (!user) {
      throw ErrDataNotFound;
    }
    return user;
  }
  async verifyToken(token: string): Promise<TokenPayload> {
    const payload = await this.jwtProvider.verifyToken(token);
    if (!payload) {
      throw ErrInvalidToken;
    }
    const user = await this.repository.findByCond({ username: payload.sub });
    if (!user) {
      throw ErrDataNotFound;
    }
    return payload;
  }
  async login(data: UserLoginDTO): Promise<string> {
    const userDTO = UserLoginDTOSchema.parse(data);
    const user = await this.repository.findByCond({ username: userDTO.username });
    if (!user) {
      throw ErrInvalidEmailAndPassword;
    }
    const isPasswordMatch = await bcrypt.compare(userDTO.password, user.passwordHash);
    if (!isPasswordMatch) {
      throw ErrInvalidEmailAndPassword;
    }
    const role = await this.roleRepository.findByCond({ id: user.roleId });
    if (!role) {
      throw ErrDataNotFound;
    }
    const payload: TokenPayload = {
      sub: user.username,
      role: role.name as UserRole,
    };
    const token = await this.jwtProvider.generateToken(payload);
    return token;
  }
  async register(data: UserRegistrationDTO): Promise<User> {
    const userDTO = UserRegistrationDTOSchema.parse(data);
    const isUsernameExist = await this.repository.findByCond({ username: userDTO.username });
    if (isUsernameExist) {
      throw ErrDataAlreadyExist;
    }
    const isEmailExist = await this.repository.findByCond({ email: userDTO.email });
    if (isEmailExist) {
      throw ErrDataAlreadyExist;
    }
    const isPhoneExist = await this.repository.findByCond({ phone: userDTO.phone });
    if (isPhoneExist) {
      throw ErrDataAlreadyExist;
    }
    const passwordHash = await bcrypt.hash(userDTO.password, 10);
    const role = await this.roleRepository.findByCond({ name: UserRole.USER });
    if (!role) {
      throw ErrDataNotFound;
    }
    const user = {
      ...userDTO,
      roleId: role.id,
      passwordHash,
    };
    await this.repository.insert(user);
    return user;
  }
  async list(paging: PagingDTO, cond: UserCondDTO): Promise<Array<User>> {
    return await this.repository.list(paging, cond);
  }
  async getDetail(id: number): Promise<User | null> {
    const user = await this.repository.get(id);
    if (!user) {
      throw ErrDataNotFound;
    }
    return user;
  }
  async create(data: UserCreateDTO): Promise<User> {
    const userDTO = UserCreateDTOSchema.parse(data);
    const isUsernameExist = await this.repository.findByCond({ username: userDTO.username });
    if (isUsernameExist) {
      throw ErrDataAlreadyExist;
    }
    const isEmailExist = await this.repository.findByCond({ email: userDTO.email });
    if (isEmailExist) {
      throw ErrDataAlreadyExist;
    }
    const isPhoneExist = await this.repository.findByCond({ phone: userDTO.phone });
    if (isPhoneExist) {
      throw ErrDataAlreadyExist;
    }
    const passwordHash = await bcrypt.hash(userDTO.password, 10);
    const role = await this.roleRepository.findByCond({ id: userDTO.roleId });
    if (!role) {
      throw ErrDataNotFound;
    }
    const user = {
      ...userDTO,
      roleId: role.id,
      passwordHash,
    };
    await this.repository.insert(user);
    return user;
  }
  async update(id: number, data: UserUpdateDTO): Promise<boolean> {
    const userDTO = UserUpdateDTOSchema.parse(data);
    const user = await this.repository.get(id);
    if (!user) {
      throw ErrDataNotFound;
    }
    await this.repository.update(id, userDTO);
    return true;
  }
  async delete(id: number): Promise<boolean> {
    const user = await this.repository.get(id);
    if (!user) {
      throw ErrDataNotFound;
    }
    await this.repository.delete(id);
    return true;
  }
}
