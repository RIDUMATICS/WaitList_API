import {MigrationInterface, QueryRunner} from "typeorm";

export class addedWaitListModel1643549559250 implements MigrationInterface {
    name = 'addedWaitListModel1643549559250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."WaitList_type_enum" AS ENUM('Investors', 'Asset listers')`);
        await queryRunner.query(`CREATE TABLE "WaitList" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "email" character varying NOT NULL, "description" character varying, "type" "public"."WaitList_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e8568ebf804d40b0a1800dc60b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f53cd25397c8a92a4066ba053d" ON "WaitList" ("email") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f53cd25397c8a92a4066ba053d"`);
        await queryRunner.query(`DROP TABLE "WaitList"`);
        await queryRunner.query(`DROP TYPE "public"."WaitList_type_enum"`);
    }

}
