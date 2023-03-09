import { FindManyOptions, LessThan, MoreThan } from "typeorm";
import { GetFarmsDto } from "../../farms/dto/get-farms.dto";
import { FarmSortingAttribute } from "../../farms/enums/farm-sorting-attribute";
import { DrivingDistance } from "../entities/driving-distance.entity";

export class FarmFindQueryGenerator {
  public generateQuery(currentUserId: string, getFarmsDto: GetFarmsDto, averageYield: number) {
    const query: FindManyOptions<DrivingDistance> = {
      relations: ["user", "farm", "farm.user"],
      where: { user: { id: currentUserId } },
    };

    if (getFarmsDto.sortBy) {
      query.order = {};

      switch (getFarmsDto.sortBy) {
        case FarmSortingAttribute.DATE:
          query.order.farm = { createdAt: { direction: "DESC" } };
          break;
        case FarmSortingAttribute.NAME:
          query.order.farm = { name: { direction: "ASC" } };
          break;
        case FarmSortingAttribute.DRIVING_DISTANCE:
          query.order = { drivingDistance: { direction: "ASC" } };
          break;
        default:
          break;
      }
    }

    if (getFarmsDto.filterOutliers && averageYield > -1) {
      query.where = [{ farm: { yield: LessThan(averageYield * 0.7) } }, { farm: { yield: MoreThan(averageYield * 1.3) } }];
    }

    return query;
  }
}
