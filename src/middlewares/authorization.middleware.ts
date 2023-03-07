import { NextFunction, Response } from "express";
import { UsersService } from "modules/users/users.service";
import { Validator } from "modules/utils/validator";
import { AuthenticatedRequest } from "../common/authenticated-request";
import { UserAuthorizationDataDto } from "./user-authorization-data.dto";

export async function authorizeUserMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const validator = new Validator();
    const usersService = new UsersService();

    const validatedUserData = await validator.convertAndValidate(UserAuthorizationDataDto, req.user);

    const user = await usersService.findOneBy({ id: validatedUserData.id, email: validatedUserData.email });

    if (user == null) return res.sendStatus(401);

    next();
  } catch (err) {
    res.sendStatus(401);
  }
}
