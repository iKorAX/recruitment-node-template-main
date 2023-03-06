import { User } from "modules/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Farm {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column({ type: "point" })
  public coordinates: string;

  @Column({ type: "double precision" })
  public size: number;

  @Column({ type: "double precision" })
  public yield: number;

  @ManyToOne(() => User, (user): Array<Farm> => user.farms)
  public user: User;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}