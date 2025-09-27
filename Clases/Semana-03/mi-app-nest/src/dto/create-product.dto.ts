import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDTO {
  @IsNotEmpty()
  @IsString()
  @Length(4, 40, { message: 'El nombre debe tener entre 4 y 40 caracteres' })
  nameProduct: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200, {
    message: 'La descripción debe tener máximo 200 caracteres',
  })
  description: string;

  @IsNotEmpty()
  @Min(1, { message: 'El precio debe ser mayor a 0' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  price: number;

  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
  imageUrl?: string;

  @IsNotEmpty()
  @IsBoolean()
  isAvailable: boolean;
}
