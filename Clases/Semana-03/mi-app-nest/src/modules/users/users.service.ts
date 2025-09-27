import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from 'src/interfaces';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      name: 'John Ortiz',
      email: 'john@gmail.com',
      password: '123456789',
    },
    {
      id: 2,
      name: 'Jane Lopez',
      email: 'jane@outlook.com',
      age: 28,
      password: 'password456',
    },
  ];

  //Me devuelve todos los usuarios
  findAll(): IUser[] {
    return this.users;
  }

  //Me devuelve un usuario por su id
  findOne(id: number): IUser {
    const userFind = this.users.find((user) => user.id === id);
    //Si userFind si existe pero no tiene información
    if (!userFind) throw new NotFoundException('Usuario no encontrado');
    return userFind;
  }

  //Crear un usuario
  //De mi interfaz IUser le omitiré el id
  create(user: Omit<IUser, 'id'>): IUser {
    const newId =
      this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;

    if (user.age && user.age >= 18) {
      const newUser: IUser = {
        id: newId,
        ...user,
      };
      this.users.push(newUser);
      return newUser;
    }

    throw new BadRequestException('El usuario debe ser mayor de edad');
  }

  //Método assign = Me pide el objeto original (userIndex)
  //Qué le voy a cambiar? El nuevo usuario que le estoy pasando (newUser)
  update(id: number, newUser: Omit<IUser, 'id'>): IUser {
    const userIndex = this.findOne(id);
    Object.assign(userIndex, newUser);
    return userIndex;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);
    return { message: 'Usuario eliminado correctamente' };
  }
}
