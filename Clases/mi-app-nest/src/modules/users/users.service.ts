import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  /**
 * @description Actualiza los datos de un usuario existente por su ID.
 * Si se proporciona una nueva contraseña, esta será hasheada antes de guardar.
 * 
 * @param id - El identificador único del usuario a actualizar.
 * @param updateUser - Objeto con los campos a actualizar, basado en UpdateUserDTO.
 * @returns Una promesa que resuelve con el usuario actualizado.
 * @throws {NotFoundException} Si el usuario no existe.
 */
  async update(id: number, updateUser: UpdateUserDTO) {
    const dataToUpdate = { ...updateUser }
        let dataWithPassword;

        if (updateUser.password) {
            const hashedPassword = await bcrypt.hash(updateUser.password, 10)
            dataWithPassword = { ...dataToUpdate, password: hashedPassword }
        }

        await this.userRepository.update(id, updateUser.password ? dataWithPassword : dataToUpdate);
        return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id); //Eliminamos el usuario
    //Si no se ha eliminado ningún usuario (Si no lo encuentra es 0 = false)
    if (result.affected === 0)
      throw new BadRequestException(`Usuario con id #${id} no encontrado.`);
    return { message: 'Usuario eliminado correctamente' };
  }
}
