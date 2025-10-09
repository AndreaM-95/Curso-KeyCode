import * as dotenv from 'dotenv'; //Librería por defecto para manejar variables de entorno
import { DataSource } from 'typeorm';
import { User } from './src/entities/user.entity'; // siempre poner ./

dotenv.config(); // Carga las variables de entorno desde el archivo .env

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User], // Agrega aquí todas las entidades como user.entity.ts
  migrations: ['./src/migrations/*.ts'], // Ruta a las migraciones de la base de datos (El * es un comodín que toma todos los archivos .ts)
});
