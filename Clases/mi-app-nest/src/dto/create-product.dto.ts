import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Huevos', description: 'Nombre del producto' })
  @IsNotEmpty()
  @IsString()
  @Length(4, 40, { message: 'El nombre debe tener entre 4 y 40 caracteres' })
  nameProduct: string;

  @ApiProperty({ example: 'Huevos de codorniz', description: 'Descripcion del producto' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200, {
    message: 'La descripción debe tener máximo 200 caracteres',
  })
  description: string;

  @ApiProperty({ example: '3000', description: 'Precio del producto' })
  @IsNotEmpty()
  @Min(1, { message: 'El precio debe ser mayor a 0' })
  @IsNumber({}, { message: 'El precio debe ser un número' })
  price: number;

  @ApiProperty({ example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTXMzthGCE_LvJ3m85ezZQuAV7I5FRixokw&s', description: 'Foto del producto', required: false })
  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
  imageUrl?: string;
}
