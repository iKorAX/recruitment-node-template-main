import { GeographyService } from "modules/geography/geography.service";
import { UsersService } from "modules/users/users.service";
import { FindManyOptions, Repository } from "typeorm";
import { DrivingDistance } from "./entities/driving-distance.entity";
import dataSource from "orm/orm.config";
import { FarmsService } from "modules/farms/farms.service";
import { Farm } from "modules/farms/entities/farm.entity";
import { User } from "modules/users/entities/user.entity";

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

  public async createFromUsersToFarm(farm: Farm) {
    const users = await this.usersService.find();
    // const farm = await this.farmsService.getOneById(farmId);

    if (!users) return;
    if (!farm) return;

    for (const user of users) {
      const destination = user.coordinates;

      const distanceToFarm = await this.geographyService.getDrivingDistance(farm.coordinates, destination);

      const drivingDistance = this.drivingDistancesRepository.create({ farm, user, drivingDistance: distanceToFarm });

      await this.drivingDistancesRepository.save(drivingDistance);
    }
  }

  public async createFromFarmsToUser(user: User) {
    // const user = await this.usersService.findOneBy({ id: userId });
    const farms = await this.farmsService.find();

    if (!user) return;
    if (!farms) return;

    for (const farm of farms) {
      const destination = user.coordinates;

      const distanceToFarm = await this.geographyService.getDrivingDistance(farm.coordinates, destination);

      const drivingDistance = this.drivingDistancesRepository.create({ farm, user, drivingDistance: distanceToFarm });

      await this.drivingDistancesRepository.save(drivingDistance);
    }
  }

  public async getAll(query: FindManyOptions<DrivingDistance>): Promise<DrivingDistance[]> {
    try {
      return await this.drivingDistancesRepository.find(query);
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
