import { DrivingDistance } from "modules/driving-distances/entities/driving-distance.entity";
import { Coordinate } from "modules/geography/dto/geocode-response.dto";
import { User } from "modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PointTransformer } from "../../utils/point-transformer";

@Entity()
export class Farm {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column({ type: "point", transformer: new PointTransformer() })
  public coordinates: Coordinate;

  @Column({ type: "double precision" })
  public size: number;

  @Column({ type: "double precision" })
  public yield: number;

  @ManyToOne(() => User, (user): Array<Farm> => user.farms)
  public user: User;

  @OneToMany(() => DrivingDistance, drivingDistance => drivingDistance.farm)
  public drivingDistances: Array<DrivingDistance>;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
