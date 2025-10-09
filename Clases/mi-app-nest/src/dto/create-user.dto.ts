import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
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
  @MinLength(6)
  @MaxLength(10)
  password: string;
}
