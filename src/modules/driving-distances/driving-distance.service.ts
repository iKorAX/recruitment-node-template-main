import { GeographyService } from "modules/geography/geography.service";
import { UsersService } from "modules/users/users.service";
import { FindManyOptions, Repository } from "typeorm";
import { DrivingDistance } from "./entities/driving-distance.entity";
import dataSource from "orm/orm.config";
import { FarmsService } from "modules/farms/farms.service";
import { Farm } from "modules/farms/entities/farm.entity";
import { User } from "modules/users/entities/user.entity";
import { GetFarmsDto } from "modules/farms/dto/get-farms.dto";
import { FindQueryGenerator } from "./domain/find-query-generator";

export class DrivingDistanceService {
  private readonly usersService: UsersService;
  private readonly geographyService: GeographyService;
  private readonly drivingDistancesRepository: Repository<DrivingDistance>;
  private readonly farmsService: FarmsService;
  private findQueryGenerator: FindQueryGenerator;

  constructor() {
    this.usersService = new UsersService();
    this.geographyService = new GeographyService();
    this.farmsService = new FarmsService();
    this.drivingDistancesRepository = dataSource.getRepository(DrivingDistance);
    this.findQueryGenerator = new FindQueryGenerator();
  }

  public async createFromUsersToFarm(farm: Farm) {
    const users = await this.usersService.find();

    if (!users) return;

    for (const user of users) {
      const destination = user.coordinates;

      const distanceToFarm = await this.geographyService.getDrivingDistance(farm.coordinates, destination);

      const drivingDistance = this.drivingDistancesRepository.create({ farm, user, drivingDistance: distanceToFarm });

      await this.drivingDistancesRepository.save(drivingDistance);
    }
  }

  public async createFromFarmsToUser(user: User) {
    const farms = await this.farmsService.find();

    if (!farms) return;

    for (const farm of farms) {
      const destination = user.coordinates;

      const distanceToFarm = await this.geographyService.getDrivingDistance(farm.coordinates, destination);

      const drivingDistance = this.drivingDistancesRepository.create({ farm, user, drivingDistance: distanceToFarm });

      await this.drivingDistancesRepository.save(drivingDistance);
    }
  }

  public async getAllFarmsWithDistances(currentUserId: string, getFarmsDto: GetFarmsDto): Promise<DrivingDistance[]> {
    const query: FindManyOptions<DrivingDistance> = await this.getFarmsListQuery(currentUserId, getFarmsDto);

    return this.drivingDistancesRepository.find(query);
  }

  private async getFarmsListQuery(currentUserId: string, getFarmsDto: GetFarmsDto): Promise<FindManyOptions<DrivingDistance>> {
    let averageYield = -1;

    if (getFarmsDto.filterOutliers) {
      averageYield = await this.farmsService.getAverageYield();
    }

    return this.findQueryGenerator.generateQuery(currentUserId, getFarmsDto, averageYield);
  }
}
