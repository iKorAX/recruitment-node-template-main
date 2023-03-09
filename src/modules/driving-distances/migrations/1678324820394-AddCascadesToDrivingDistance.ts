import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadesToDrivingDistance1678324820394 implements MigrationInterface {
  public name = "AddCascadesToDrivingDistance1678324820394";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "driving_distance" DROP CONSTRAINT "FK_c156ab2f9016b83f014657c19fc"`);
    await queryRunner.query(`ALTER TABLE "driving_distance" DROP CONSTRAINT "FK_34d12cd8b9e2109760595e150eb"`);
    await queryRunner.query(`ALTER TABLE "driving_distance" ALTER COLUMN "userId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "driving_distance" ALTER COLUMN "farmId" SET NOT NULL`);
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
    await queryRunner.query(`ALTER TABLE "driving_distance" ALTER COLUMN "farmId" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "driving_distance" ALTER COLUMN "userId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "driving_distance" ADD CONSTRAINT "FK_34d12cd8b9e2109760595e150eb" FOREIGN KEY ("farmId") REFERENCES "farm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "driving_distance" ADD CONSTRAINT "FK_c156ab2f9016b83f014657c19fc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
