import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "common/authenticated-request";
import { FarmsService } from "./farms.service";
import { Validator } from "modules/utils/validator";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { GetFarmsDto } from "./dto/get-farms.dto";
import { DrivingDistanceService } from "modules/driving-distances/driving-distance.service";
import { DeleteFarmDto } from "./dto/delete-farm.dto";

export class FarmsController {
  private readonly farmsService: FarmsService;
  private readonly drivingDistanceService: DrivingDistanceService;
  private readonly validator: Validator;

  constructor() {
    this.farmsService = new FarmsService();
    this.drivingDistanceService = new DrivingDistanceService();
    this.validator = new Validator();
  }

  public async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validatedBody = await this.validator.convertAndValidate(CreateFarmDto, req.body as object);

      await this.farmsService.create(validatedBody, req.user.id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  public async get(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validatedBody = await this.validator.convertAndValidate(GetFarmsDto, req.query as object);

      const rawList = await this.drivingDistanceService.getAllFarmsWithDistances(req.user.id, validatedBody);
      const result = this.farmsService.toFarmList(rawList);

      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validatedBody = await this.validator.convertAndValidate(DeleteFarmDto, req.body as object);

      const result = this.farmsService.delete(req.user.id, validatedBody.id);

      res.send(result);
    } catch (error) {
      next(error);
    }
  }
}
