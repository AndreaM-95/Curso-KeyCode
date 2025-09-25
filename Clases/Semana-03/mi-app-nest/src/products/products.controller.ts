import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { IProduct } from 'src/models';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
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
  createProduct(@Body() product: Omit<IProduct, 'id'>) {
    return this.productsService.createProduct(product);
  }
}
