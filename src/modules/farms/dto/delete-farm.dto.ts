import { IsUUID } from "class-validator";

export class DeleteFarmDto {
  @IsUUID()
  public id: string;
}
