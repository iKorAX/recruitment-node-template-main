import { IsNumber, IsString } from "class-validator";

export class CreateFarmDto {
  @IsString()
  public name: string;

  @IsString()
  public address: string;

  @IsNumber()
  public size: number;

  @IsNumber()
  public yield: number;
}
