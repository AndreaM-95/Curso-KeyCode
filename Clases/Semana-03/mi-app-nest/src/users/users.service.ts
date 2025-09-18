import { Injectable, NotFoundException } from '@nestjs/common';

export type IUser = {
  id: number;
  name: string;
  email: string;
};

@Injectable()
export class UsersService {
  private users: IUser[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
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
}
