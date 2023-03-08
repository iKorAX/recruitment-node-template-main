import { Coordinate } from "modules/geography/dto/geocode-response.dto";
import { GeographyService } from "modules/geography/geography.service";
import { UsersService } from "modules/users/users.service";
import { Repository } from "typeorm";
import { DrivingDistance } from "./entities/driving-distance.entity";
import dataSource from "orm/orm.config";
import { FarmsService } from "modules/farms/farms.service";

export class DrivingDistanceService {
  private readonly usersService: UsersService;
  private readonly geographyService: GeographyService;
  private readonly drivingDistancesRepository: Repository<DrivingDistance>;
  private readonly farmsService: FarmsService;

  constructor() {
    this.usersService = new UsersService();
    this.geographyService = new GeographyService();
    this.farmsService = new FarmsService();
    this.drivingDistancesRepository = dataSource.getRepository(DrivingDistance);
  }

  public async create(farmId: string) {
    const users = await this.usersService.find();
    const farm = await this.farmsService.getOneById(farmId);

    if (!users) return;
    if (!farm) return;

    for (const user of users) {
      const destination = user.coordinates;
      const distanceToFarm = await this.geographyService.getDrivingDistance(farm.coordinates, destination);
      const drivingDistance = new DrivingDistance();
      drivingDistance.farm = farm;
      drivingDistance.user = user;
      drivingDistance.drivingDistance = distanceToFarm;

      await this.drivingDistancesRepository.save(drivingDistance);
    }
  }
}
