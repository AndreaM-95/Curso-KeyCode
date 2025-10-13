import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductsMigration1760333441173 implements MigrationInterface {
    name = 'ProductsMigration1760333441173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nameProduct\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`category\` varchar(255) NOT NULL DEFAULT 'otros', \`imageUrl\` varchar(255) NULL, \`isAvailable\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
