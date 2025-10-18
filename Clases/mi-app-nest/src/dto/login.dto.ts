import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: 'am@gmail.com', description: 'Email valido del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña minima de 6 caracteres y máximo de 10' })
  @Length(6, 10, {
    message: 'La contraseña debe tener entre 6 y 10 caracteres',
  })
  password: string;
}
