import {MigrationInterface, QueryRunner} from "typeorm";

export class test1659602915669 implements MigrationInterface {
    name = 'test1659602915669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("height" integer NOT NULL, "weight" integer NOT NULL, "uid" integer NOT NULL, CONSTRAINT "REL_66ae2944af4393a6f2b3b0ab86" UNIQUE ("uid"), CONSTRAINT "PK_66ae2944af4393a6f2b3b0ab862" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "manager_id" integer, CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "user_id" integer, CONSTRAINT "UQ_26e2f7347378254c076729d53cb" UNIQUE ("url"), CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projectMember" ("pid" integer NOT NULL, "user" integer NOT NULL, CONSTRAINT "PK_6fb8dc1bf190c400a0fe3adb787" PRIMARY KEY ("pid", "user"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9cfd6df637531dcffd6a22439b" ON "projectMember" ("pid") `);
        await queryRunner.query(`CREATE INDEX "IDX_bcfc8361f2142df019a836eafc" ON "projectMember" ("user") `);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_66ae2944af4393a6f2b3b0ab862" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_b925754780ce53c20179d7204f9" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_c8c60110b38af9f778106552c39" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projectMember" ADD CONSTRAINT "FK_9cfd6df637531dcffd6a22439b1" FOREIGN KEY ("pid") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "projectMember" ADD CONSTRAINT "FK_bcfc8361f2142df019a836eafc9" FOREIGN KEY ("user") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "projectMember" DROP CONSTRAINT "FK_bcfc8361f2142df019a836eafc9"`);
        await queryRunner.query(`ALTER TABLE "projectMember" DROP CONSTRAINT "FK_9cfd6df637531dcffd6a22439b1"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_c8c60110b38af9f778106552c39"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b925754780ce53c20179d7204f9"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_66ae2944af4393a6f2b3b0ab862"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bcfc8361f2142df019a836eafc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9cfd6df637531dcffd6a22439b"`);
        await queryRunner.query(`DROP TABLE "projectMember"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
