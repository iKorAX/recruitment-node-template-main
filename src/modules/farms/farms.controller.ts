import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "common/authenticated-request";
import { FarmsService } from "./farms.service";
import { Validator } from "modules/utils/validator";
import { CreateFarmDto } from "./dto/create-farm.dto";

export class FarmsController {
  private readonly farmsService: FarmsService;
  private readonly validator: Validator;

  constructor() {
    this.farmsService = new FarmsService();
    this.validator = new Validator();
  }

  public async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validatedBody = await this.validator.convertAndValidate(CreateFarmDto, req.body as object);

      await this.farmsService.create(validatedBody);

      res.send(200);
    } catch (error) {
      next(error);
    }
  }

  // public async get(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  //   try {
  //     //   const user = await this.usersService.createUser(req.body as CreateUserDto);
  //     //   res.status(201).send(UserDto.createFromEntity(user));
  //   } catch (error) {
  //     //   next(error);
  //   }
  // }
}
