import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //Inyectamos el servicio

  //EndPoint que me devuelve todos los usuarios con la ruta localhost:3000/users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // //EndPoint que me devuelve un usuario por su id con la ruta localhost:3000/users/1
  // //El id siempre llega como string
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id)); //Lo convertimos a número
  }

  @Post() //Sea estricto con el body según mi DTO
  create(@Body() body: CreateUserDTO) {
    return this.usersService.create(body); //Esta es la información que me llega en el body
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.usersService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
