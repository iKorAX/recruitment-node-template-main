import { Farm } from "modules/farms/entities/farm.entity";
import { User } from "modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class DrivingDistance {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @ManyToOne(() => User, (user): Array<DrivingDistance> => user.drivingDistances, { nullable: false })
  public user: User;

  @ManyToOne(() => Farm, farm => farm.drivingDistances, { nullable: false })
  public farm: Farm;

  @Column({ type: "double precision", name: "driving_distance" })
  public drivingDistance: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
