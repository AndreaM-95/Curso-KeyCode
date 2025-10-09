import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IUser } from 'src/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //Inyectamos el repositorio de la entidad User (Métodos para un CRUD)
    private userRepository: Repository<User>,
  ) {}

  // //Me devuelve todos los usuarios
  findAll(): Promise<IUser[]> {
    return this.userRepository.find();
  }

  // //Me devuelve un usuario por su id
  // findOne(id: number): IUser {
  //   const userFind = this.users.find((user) => user.id === id);
  //   //Si userFind si existe pero no tiene información
  //   if (!userFind) throw new NotFoundException('Usuario no encontrado');
  //   return userFind;
  // }

  // //Crear un usuario
  // //De mi interfaz IUser le omitiré el id
  // create(user: Omit<IUser, 'id'>): IUser {
  //   const newId =
  //     this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;

  //   if (user.age && user.age >= 18) {
  //     const newUser: IUser = {
  //       id: newId,
  //       ...user,
  //     };
  //     this.users.push(newUser);
  //     return newUser;
  //   }

  //   throw new BadRequestException('El usuario debe ser mayor de edad');
  // }

  // //Método assign = Me pide el objeto original (userIndex)
  // //Qué le voy a cambiar? El nuevo usuario que le estoy pasando (newUser)
  // update(id: number, newUser: Omit<IUser, 'id'>): IUser {
  //   const userIndex = this.findOne(id);
  //   Object.assign(userIndex, newUser);
  //   return userIndex;
  // }

  // remove(id: number) {
  //   const userIndex = this.users.findIndex((user) => user.id === id);
  //   this.users.splice(userIndex, 1);
  //   return { message: 'Usuario eliminado correctamente' };
  // }
}
