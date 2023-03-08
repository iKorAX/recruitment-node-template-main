import { IsEmail, IsUUID } from "class-validator";

export class UserAuthorizationDataDto {
  @IsUUID()
  public id: string;

  @IsEmail()
  public email: string;
}
