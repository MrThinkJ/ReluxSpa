import { BaseHttpService } from "@share/transport/http-service";
import { UserService } from "../../service/service";
import { User } from "../../model";
import { UserCondDTO, UserCreateDTO, UserUpdateDTO } from "../../model";
import { Request, Response } from "express";
import { IUserService } from "../../interface";

export class UserHttpService extends BaseHttpService<User, UserCondDTO, UserCreateDTO, UserUpdateDTO> {
  constructor(private readonly userService: IUserService) {
    super(userService);
  }

  async registerAPI(req: Request, res: Response) {
    const result = await this.userService.register(req.body);
    res.status(201).json({ data: result });
  }

  async loginAPI(req: Request, res: Response) {
    const result = await this.userService.login(req.body);
    res.status(200).json({ data: result });
  }

  async profileAPI(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const payload = await this.userService.verifyToken(token);
    if (!payload) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const result = await this.userService.profile(payload.sub);
    const { passwordHash, roleId, ...user } = result;
    res.status(200).json({ data: user });
  }
}
