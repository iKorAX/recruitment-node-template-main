import * as bcrypt from "bcrypt";
import config from "config/config";
import { UnprocessableEntityError } from "errors/errors";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import dataSource from "orm/orm.config";
import { GeographyService } from "modules/geography/geography.service";

export class UsersService {
  private readonly usersRepository: Repository<User>;
  private readonly geographyService: GeographyService;

  constructor() {
    this.usersRepository = dataSource.getRepository(User);
    this.geographyService = new GeographyService();
  }

  public async createUser(data: CreateUserDto): Promise<User> {
    const { email, password, address } = data;

    const existingUser = await this.findOneBy({ email: email });
    if (existingUser) throw new UnprocessableEntityError("A user for the email already exists");

    const hashedPassword = await this.hashPassword(password);
    const coordinates = await this.geographyService.getCoordinates(address);

    const userData: DeepPartial<User> = { email, address, coordinates, hashedPassword };

    const newUser = this.usersRepository.create(userData);

    return this.usersRepository.save(newUser);
  }

  public async findOneBy(param: FindOptionsWhere<User>): Promise<User | null> {
    return this.usersRepository.findOneBy({ ...param });
  }

  public async find(): Promise<User[]> {
    return this.usersRepository.find();
  }

  private async hashPassword(password: string, salt_rounds = config.SALT_ROUNDS): Promise<string> {
    const salt = await bcrypt.genSalt(salt_rounds);
    return bcrypt.hash(password, salt);
  }
}
