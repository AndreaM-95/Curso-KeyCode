import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { IUser } from 'src/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) //Inyectamos el repositorio de la entidad User (Métodos para un CRUD)
    private userRepository: Repository<User>,
  ) {}

  /**
   * @description Método para buscar todos los usuarios
   * @returns IUser[] - Múltiples registros de usuarios
   */
  findAll() {
    return this.userRepository.find();
  }

  /**
   * @description Método para buscar un usuario por su id
   * @typeParam id: number
   * @returns el usuario encontrado - unico registro
   */
  // Tiene que ser asíncrono por la gestión de la base de datos y no se bloquee
  async findOne(id: number) {
    //va a friltrar donde el donde (where) id sea igual al id que le estoy pasando
    const userFind = await this.userRepository.findOne({ where: { id } });
    if (!userFind) throw new NotFoundException('Usuario no encontrado');
    return userFind;
  }

  /**
   * @description Método para crear un usuario
   * @Param newUser: con las validaciones de CreateUserDTO
   * @returns el usuario creado
   */
  create(newUser: CreateUserDTO) {
    const userCreated = this.userRepository.create(newUser); //Crea el usuario
    return this.userRepository.save(userCreated); //Lo guarda en la base de datos
  }

  async update(id: number, updateUser: UpdateUserDTO) {
    await this.userRepository.update(id, updateUser); //Actualiza el usuario
    return this.findOne(id); //Devuelve el usuario actualizado
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id); //Eliminamos el usuario
    //Si no se ha eliminado ningún usuario (Si no lo encuentra es 0 = false)
    if (result.affected === 0)
      throw new BadRequestException(`Usuario con id #${id} no encontrado.`);
    return { message: 'Usuario eliminado correctamente' };
  }
}
