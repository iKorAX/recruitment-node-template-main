import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressAndCoordinates1678232984085 implements MigrationInterface {
  public name = "AddAddressAndCoordinates1678232984085";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ADD "coordinates" point NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "coordinates"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
  }
}
