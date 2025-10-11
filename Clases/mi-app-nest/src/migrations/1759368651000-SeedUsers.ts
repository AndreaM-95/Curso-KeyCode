import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1759368651000 implements MigrationInterface {
  name = 'SeedUsers1759368651000';
  //Se ejecuta de primeras cuando aplico la migración
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (name, email, password, age) VALUES
      ('Ana López', 'ana@example.com', '12345', 25),
      ('Luis Gómez', 'luis@example.com', '12345', 30)
    `);
  }

  //Se ejecuta de últimas si quiero deshacer la migración (Borrar los datos que he insertado)
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                  DELETE FROM users WHERE email IN ('ana@example.com', 'luis@example.com')
            `);
  }
}
