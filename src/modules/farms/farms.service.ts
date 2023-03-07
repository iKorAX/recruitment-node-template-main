import { Repository } from "typeorm";
import { CreateFarmDto } from "./dto/create-farm.dto";
import { Farm } from "./entities/farm.entity";
import dataSource from "orm/orm.config";
import { GeographyService } from "modules/geography/geography.service";

export class FarmsService {
  private farmsRepository: Repository<Farm>;
  private geographyService: GeographyService;

  constructor() {
    this.farmsRepository = dataSource.getRepository(Farm);
  }

  public async create(farm: CreateFarmDto) {
    const farmEntity = new Farm();
    farmEntity.name = farm.name;
    farmEntity.size = farm.size;
    farmEntity.yield = farm.yield;
    farmEntity.address = farm.address;

    const coordinates = await this.geographyService.getCoordinates(farm.address);

    farmEntity.coordinates = coordinates;

    await this.farmsRepository.save(farmEntity);
  }

  public async delete(id: string) {
    await this.farmsRepository.delete({ id });
  }

  public async getAll() {
    await this.farmsRepository.find();
  }
}
