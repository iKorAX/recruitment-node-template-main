import { Request } from "express";
import { UserAuthorizationDataDto } from "middlewares/dto/user-authorization-data.dto";

export interface AuthenticatedRequest extends Request {
  user: UserAuthorizationDataDto;
}
