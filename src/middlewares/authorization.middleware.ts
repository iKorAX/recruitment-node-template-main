import { NextFunction, Response } from "express";
import { AuthService } from "modules/auth/auth.service";
import { Validator } from "modules/utils/validator";
import { AuthenticatedRequest } from "../common/authenticated-request";
import { UserAuthorizationDataDto } from "./dto/user-authorization-data.dto";

export async function authorizeUserMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const validator = new Validator();
    const authService = new AuthService();

    const validatedUserData = await validator.convertAndValidate(UserAuthorizationDataDto, req.user);
    const token = await authService.getActiveUserToken(req.token, validatedUserData.id);

    if (!token) return res.sendStatus(401);

    next();
  } catch (err) {
    res.sendStatus(401);
  }
}
