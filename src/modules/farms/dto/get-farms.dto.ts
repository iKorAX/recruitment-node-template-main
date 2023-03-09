import { IsBoolean, IsEnum, IsOptional } from "class-validator";
import { FarmSortingAttribute } from "../enums/farm-sorting-attribute";

export class GetFarmsDto {
  @IsEnum(FarmSortingAttribute)
  @IsOptional()
  public sortBy: FarmSortingAttribute;

  @IsBoolean()
  @IsOptional()
  public filterOutliers: boolean;
}
