import * as productEntity from 'src/entities/product.entity';
import { IsBoolean, IsNumber, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDTO {
    @ApiProperty({ example: 'Huevos', description: 'Nombre del producto', required: false })
    @IsOptional()
    nameProduct?: string;

    @ApiProperty({ example: 'Huevos de codorniz', description: 'Descripcion del producto', required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ example: '3000', description: 'Precio del producto', required: false })
    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número' })
    price?: number;
    
    @ApiProperty({ example: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaTXMzthGCE_LvJ3m85ezZQuAV7I5FRixokw&s', description: 'Foto del producto', required: false })
    @IsOptional()
    @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
    imageUrl?: string;

    @ApiProperty({ example: 'Vegetales', description: 'Categoría de alimentos', required: false })
    @IsOptional()
    category?: productEntity.Category;

    @ApiProperty({ example: 'true', description: 'Estado del producto', required: false })
    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}
