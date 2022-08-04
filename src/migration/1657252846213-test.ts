import {MigrationInterface, QueryRunner} from "typeorm";

export class test1657252846213 implements MigrationInterface {
    name = 'test1657252846213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_f3ece729bcd7240a512c55b99f9"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "manager_id_id" TO "manager_id"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_66ae2944af4393a6f2b3b0ab862"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "UQ_66ae2944af4393a6f2b3b0ab862" UNIQUE ("uid")`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_66ae2944af4393a6f2b3b0ab862" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_b925754780ce53c20179d7204f9" FOREIGN KEY ("manager_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_b925754780ce53c20179d7204f9"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_66ae2944af4393a6f2b3b0ab862"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "UQ_66ae2944af4393a6f2b3b0ab862"`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_66ae2944af4393a6f2b3b0ab862" FOREIGN KEY ("uid") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "manager_id" TO "manager_id_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_f3ece729bcd7240a512c55b99f9" FOREIGN KEY ("manager_id_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
