import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  //EndPoint que me devuelve sólo los productos disponibles con la ruta localhost:3000/products/available
  @Get('available')
  findAvailable() {
    return this.productsService.findAvailable();
  }

  //EndPoint que me devuelve un producto por su id con la ruta localhost:3000/products/1
  //El id siempre llega como string
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id)); //Casteamos el id de string a número
  }

  @Get('by-name/:name') //La ruta es http://localhost:3000/products/by-name/perro
  findByName(@Param('name') name: string) {
    return this.productsService.findByName(name);
  }

  @Post()
  createProduct(@Body() product: CreateProductDTO) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDTO,
  ) {
    return this.productsService.updateProduct(Number(id), updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.removeProduct(Number(id));
  }
}
