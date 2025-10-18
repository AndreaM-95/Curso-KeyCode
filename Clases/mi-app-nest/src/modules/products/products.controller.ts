import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';
import { RolesGuard } from '../auth/roles.guard';
import { ParseUpperTrimePipe } from 'src/common/pipes/parse-uppertrim.pipe';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('/api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos retornados desde BD' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Obtener todos los productos ACTIVOS' })
  @ApiResponse({ status: 200, description: 'Lista de productos activos retornados desde BD' })
  findAvailable() {
    return this.productsService.findAvailable();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener el producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto retornado desde BD' })
  @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get('by-name/:name')
  @ApiOperation({ summary: 'Obtener el producto por NOMBRE' })
  @ApiResponse({ status: 200, description: 'Producto retornado desde BD' })
  @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
  findByName(@Param('name', ParseUpperTrimePipe) name: string) {
    return this.productsService.findByName(name);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente en BD' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  createProduct(@Body() product: CreateProductDTO) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualiza un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente en BD' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDTO) {
    return this.productsService.updateProduct(id, body);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Inactiva un producto' })
  @ApiResponse({ status: 200, description: 'Producto inactivado exitosamente en BD' })
  @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  desactive(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.disabled(id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Elimina un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente en BD' })
  @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.removeProduct(id);
  }
}
