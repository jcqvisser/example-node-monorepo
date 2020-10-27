import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthorToBook1603798208407 implements MigrationInterface {
  name = "AddAuthorToBook1603798208407";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" ADD "author" character varying DEFAULT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "author"`);
  }
}
