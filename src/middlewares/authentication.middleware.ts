import config from "config/config";
import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AuthService } from "modules/auth/auth.service";
import { Validator } from "modules/utils/validator";
import { AuthenticatedRequest } from "../common/authenticated-request";
import { UserAuthorizationDataDto } from "./dto/user-authorization-data.dto";

export async function authenticateTokenMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const authHeaderArray = authHeader && authHeader.split(" ");

  if (authHeaderArray?.length !== 2) return res.sendStatus(401);

  const token = authHeaderArray[1];

  const validator = new Validator();
  const authService = new AuthService();

  if (token == null) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, config.JWT_SECRET) as object;

    const validatedUserData = await validator.convertAndValidate(UserAuthorizationDataDto, user);
    const tokenFromDb = await authService.getActiveUserToken(token, validatedUserData.id);

    if (!tokenFromDb) return res.sendStatus(401);

    req.user = validatedUserData;

    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}
