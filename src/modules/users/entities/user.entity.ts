import { DrivingDistance } from "modules/driving-distances/entities/driving-distance.entity";
import { Farm } from "modules/farms/entities/farm.entity";
import { PointTransformer } from "modules/utils/point-transformer";
import { Coordinate } from "modules/geography/dto/geocode-response.dto";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public hashedPassword: string;

  @Column()
  public address: string;

  @Column({ type: "point", transformer: new PointTransformer() })
  public coordinates: Coordinate;

  @OneToMany(() => Farm, farm => farm.user)
  public farms: Array<Farm>;

  @OneToMany(() => DrivingDistance, drivingDistance => drivingDistance.user)
  public drivingDistances: Array<DrivingDistance>;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
