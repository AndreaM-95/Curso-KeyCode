import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import * as userEntity from 'src/entities/user.entity';

export class CreateUserDTO {
  @ApiProperty({ example: 'Andrea Mejia', description: 'Nombre completo del usuario' }) //Me permite mostrar un ejemplo
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'am@gmail.com', description: 'Email válido del usuario' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '29', description: 'Edad del usuario' })
  @IsOptional()
  @IsInt()
  @Min(18, { message: 'La edad debe ser mayor o igual a 18' })
  @Max(100, { message: 'La edad debe ser menor o igual a 100' })
  age?: number;

  @ApiProperty({ example: '123456', description: 'Constraseña mínima de 6 caracteres y máximo de 10' })
  @IsNotEmpty()
  @Length(6, 10, {
    message: 'La contraseña debe tener entre 6 y 10 caracteres',
  })
  password: string;

  @ApiProperty({ example: 'admin', description: 'Rol del usuario', required: false })
  @IsOptional()
  @IsString()
  role?: userEntity.Roles;
}
