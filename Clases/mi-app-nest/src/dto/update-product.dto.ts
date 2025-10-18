import * as productEntity from 'src/entities/product.entity';
import { CreateProductDTO } from './create-product.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class UpdateProductDTO {
    @IsOptional()
    nameProduct?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsNumber({}, { message: 'El precio debe ser un número' })
    price?: number;
    
    @IsOptional()
    @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
    imageUrl?: string;

    @IsOptional()
    category?: productEntity.Category;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}
