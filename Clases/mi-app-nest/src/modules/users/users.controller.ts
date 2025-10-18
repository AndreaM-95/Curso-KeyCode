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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') //Indicación del nombre del módulo
@ApiBearerAuth() //Indicación que mi controlador está protegido
@Controller('/api/users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {} //Inyectamos el servicio

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios retornados desde base de datos' })
  @Roles(RolesEnum.ADMIN) //Solo los admin pueden acceder a esta ruta
  findAll() {
    return this.usersService.findAll();
  }

  //El id siempre llega como string
  @Get(':id')
  @ApiOperation({ summary: 'Obtener el usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado en la base de datos' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado en la base de datos' })
  @Roles(RolesEnum.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() 
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente en la base de datos' })
  @Roles(RolesEnum.ADMIN)
  create(@Body() body: CreateUserDTO) { //Sea estricto con el body según mi DTO
    return this.usersService.create(body); //Esta es la información que me llega en el body
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un usuario existente en la base de datos' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado exitosamente en la base de datos' })
  @Roles(RolesEnum.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario de la base de datos' })
  @Roles(RolesEnum.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
