import { DeleteResult, Repository } from "typeorm";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { Farm } from "./entities/farm.entity";
import dataSource from "orm/orm.config";
import { GeographyService } from "modules/geography/geography.service";
import { DrivingDistance } from "modules/driving-distances/entities/driving-distance.entity";
import { GetFarmsResponseDto } from "./dto/get-farms-response.dto";
import { UnprocessableEntityError } from "errors/errors";

export class FarmsService {
  private farmsRepository: Repository<Farm>;
  private geographyService: GeographyService;

  constructor() {
    this.farmsRepository = dataSource.getRepository(Farm);
    this.geographyService = new GeographyService();
  }

  public async find(): Promise<Farm[]> {
    const farms = await this.farmsRepository.find();

    return farms;
  }

  public async create(farm: CreateFarmDto, currentUserId: string) {
    const farmEntity = this.farmsRepository.create({ ...farm, user: { id: currentUserId } });

    const coordinates = await this.geographyService.getCoordinates(farm.address);

    farmEntity.coordinates = coordinates;

    return this.farmsRepository.save(farmEntity);
  }

  public async delete(currentUserId: string, id: string): Promise<DeleteResult> {
    const farm = await this.farmsRepository.findOneBy({ id, user: { id: currentUserId } });

    if (!farm) throw new UnprocessableEntityError(`You don't own a farm with id ${id}`);

    return this.farmsRepository.delete(farm);
  }

  public async getOneById(id: string): Promise<Farm | null> {
    return this.farmsRepository.findOneBy({ id });
  }

  public async getAverageYield() {
    const { avg }: { avg: number | null } = (await this.farmsRepository.query("SELECT AVG(yield) from farms")) as {
      avg: number | null;
    };

    if (!avg) return 0;

    return avg;
  }

  public toFarmList(drivingDistances: DrivingDistance[]): GetFarmsResponseDto[] {
    return drivingDistances.map(drivingDistance => {
      const { name, address, user, size } = drivingDistance.farm;
      return {
        name,
        address,
        owner: user.email,
        size,
        yield: drivingDistance.farm.yield,
        drivingDistance: drivingDistance.drivingDistance,
      };
    });
  }
}
