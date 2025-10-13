import * as productEntity from 'src/entities/product.entity';
import { CreateProductDTO } from './create-product.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateProductDTO extends CreateProductDTO {
    @IsNotEmpty()
    category: productEntity.Category;
}
