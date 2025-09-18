import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IProduct, ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('by-name/:name') //La ruta es http://localhost:3000/products/by-name/perro
  findByName(@Param('name') name: string) {
    return this.productsService.findByName(name);
  }

  @Post()
  createProduct(@Body() product: Omit<IProduct, 'id'>) {
    return this.productsService.createProduct(product);
  }
}
