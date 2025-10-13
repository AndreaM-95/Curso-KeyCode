import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumn1760317037889 implements MigrationInterface {
    name = 'AddRoleColumn1760317037889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role\` varchar(255) NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role\``);
    }

}
