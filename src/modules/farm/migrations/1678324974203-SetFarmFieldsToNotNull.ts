import { MigrationInterface, QueryRunner } from "typeorm";

export class SetFarmFieldsToNotNull1678324974203 implements MigrationInterface {
  public name = "SetFarmFieldsToNotNull1678324974203";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "farm" DROP CONSTRAINT "FK_fe2fe67c9ca2dc03fff76cd04a9"`);
    await queryRunner.query(`ALTER TABLE "farm" ALTER COLUMN "userId" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "farm" ADD CONSTRAINT "FK_fe2fe67c9ca2dc03fff76cd04a9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "farm" DROP CONSTRAINT "FK_fe2fe67c9ca2dc03fff76cd04a9"`);
    await queryRunner.query(`ALTER TABLE "farm" ALTER COLUMN "userId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "farm" ADD CONSTRAINT "FK_fe2fe67c9ca2dc03fff76cd04a9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
