import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //Inyectamos el servicio

  @Get()
  @Roles(RolesEnum.ADMIN) //Solo los admin pueden acceder a esta ruta
  findAll() {
    return this.usersService.findAll();
  }

  // //El id siempre llega como string
  @Get(':id')
  @Roles(RolesEnum.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() //Sea estricto con el body según mi DTO
  @Roles(RolesEnum.ADMIN)
  create(@Body() body: CreateUserDTO) {
    return this.usersService.create(body); //Esta es la información que me llega en el body
  }

  @Put(':id')
  @Roles(RolesEnum.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @Roles(RolesEnum.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
