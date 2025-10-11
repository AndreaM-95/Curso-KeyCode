import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  @Min(18, { message: 'La edad debe ser mayor o igual a 18' })
  @Max(100, { message: 'La edad debe ser menor o igual a 100' })
  age?: number;

  @IsNotEmpty()
  @Length(6, 10, {
    message: 'La contraseña debe tener entre 6 y 10 caracteres',
  })
  password: string;
}
