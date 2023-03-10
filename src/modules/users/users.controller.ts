import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { UserDto } from "../auth/dto/user.dto";
import { Validator } from "modules/utils/validator";

export class UsersController {
  private readonly usersService: UsersService;
  private readonly validator: Validator;

  constructor() {
    this.usersService = new UsersService();
    this.validator = new Validator();
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedBody = await this.validator.convertAndValidate(CreateUserDto, req.body as object);
      const user = await this.usersService.createUser(validatedBody);
      res.status(201).send(UserDto.createFromEntity(user));
    } catch (error) {
      next(error);
    }
  }
}
