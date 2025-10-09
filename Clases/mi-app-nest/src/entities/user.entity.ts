import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//Esta es la estructura de la tabla en la base de datos
@Entity('users')
export class User {
  @PrimaryGeneratedColumn() // Auto-incremental - llave primaria
  id: number;

  @Column({ nullable: false }) // NOT NULL - no puede estar vacio
  name: string;

  // NOT NULL - no puede estar vacio, UNIQUE - no se pueden repetir
  @Column({ nullable: false, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true }) // NULL - puede estar vacio
  age?: number;
}
