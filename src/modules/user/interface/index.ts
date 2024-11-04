import { IService, TokenPayload } from "@share/interface";
import { User, UserCondDTO, UserCreateDTO, UserLoginDTO, UserRegistrationDTO, UserUpdateDTO } from "../model";

export interface IUserService extends IService<User, UserCondDTO, UserCreateDTO, UserUpdateDTO> {
  login(data: UserLoginDTO): Promise<string>;
  register(data: UserRegistrationDTO): Promise<User>;
  profile(sub: string): Promise<User>;
  verifyToken(token: string): Promise<TokenPayload>;
}
