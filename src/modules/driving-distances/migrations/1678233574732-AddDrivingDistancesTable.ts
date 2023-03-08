import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDrivingDistancesTable1678233574732 implements MigrationInterface {
  public name = "AddDrivingDistancesTable1678233574732";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "driving_distance" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "driving_distance" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "farmId" uuid, CONSTRAINT "PK_4c1c90d94d6c07eccf7912a545d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "driving_distance" ADD CONSTRAINT "FK_c156ab2f9016b83f014657c19fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "driving_distance" ADD CONSTRAINT "FK_34d12cd8b9e2109760595e150eb" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "driving_distance" DROP CONSTRAINT "FK_34d12cd8b9e2109760595e150eb"`);
    await queryRunner.query(`ALTER TABLE "driving_distance" DROP CONSTRAINT "FK_c156ab2f9016b83f014657c19fc"`);
    await queryRunner.query(`DROP TABLE "driving_distance"`);
  }
}
