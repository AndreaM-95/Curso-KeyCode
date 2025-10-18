import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  /**
   * @description Método para encontrar todos los productos en la base de datos
   * @returns Devuelve un arreglo con todos los productos
   */
  findAll() {
    return this.productsRepository.find();
  }

  /**
   * @description Método asíncrono usado para encontrar un producto por su id
   * @param {number} id - Identificador del producto a buscar.
   * @returns {Promise<Product>} El producto encontrado.
   * @throws {NotFoundException} Si el producto no existe.
   */
  async findOne(id: number) {
    const productFind = await this.productsRepository.findOne({
      where: { id },
    });
    if (!productFind) throw new NotFoundException('Producto no encontrado');
    return productFind;
  }

  /**
   * @description Método asíncrono usado para encontrar un producto por su nombre
   * @param {string} nameProduct - Nombre exacto del producto a buscar.
   * @returns {Promise<Product>} El producto encontrado.
   * @throws {NotFoundException} Si no se encuentra un producto con ese nombre.
   */
  async findByName(nameProduct: string) {
    const productFind = await this.productsRepository.findOne({
      where: { nameProduct },
    });
    if (!productFind) throw new NotFoundException('Producto no encontrado');
    return productFind;
  }

  /**
   * @description Método para encontrar los productos disponibles
   * @returns Lista de productos con el campo `isAvailable` en `true`.
   */
  findAvailable() {
    return this.productsRepository.findBy({ isAvailable: true });
  }

  /**
   * @description Crea un nuevo producto y lo guarda en la base de datos.
   * @param {CreateProductDTO} newProduct - Objeto con los datos del nuevo producto.
   * @returns El producto recién creado.
   */
  createProduct(newProduct: CreateProductDTO) {
    const productCreated = this.productsRepository.create(newProduct);
    return this.productsRepository.save(productCreated);
  }

  /**
   * @description Actualiza los datos de un producto existente.
   * @param {number} id - Identificador del producto a actualizar.
   * @param {UpdateProductDTO} newProduct - Datos actualizados del producto.
   * @returns {Promise<Product>} El producto actualizado.
   * @throws {NotFoundException} Si el producto no existe.
   */
  async updateProduct(id: number, newProduct: UpdateProductDTO) {
    await this.productsRepository.update(id, newProduct);
    return this.findOne(id);
  }

  /**
   * @description Desactiva un producto estableciendo su campo `isAvailable` a `false`.
   * @param id del producto a desactivar.
   * @returns Mensaje de confirmación y el producto desactivado.
   */
  async disabled(id: number) {
    const productFind = await this.productsRepository.findOne({
      where: { id },
    });

    if (!productFind) {
      throw new NotFoundException('Producto no encontrado');
    }

    productFind.isAvailable = false;
    await this.productsRepository.save(productFind);

    return { message: `Producto ${id} desactivado correctamente`, productFind };
  }

  /**
   * @description Elimina un producto de la base de datos por su identificador.
   * @param {number} id - Identificador del producto a eliminar.
   * @returns {Promise<{ message: string }>} Mensaje de confirmación de eliminación.
   * @throws {NotFoundException} Si no se encuentra el producto a eliminar.
   */
  async removeProduct(id: number) {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Producto con id #${id} no encontrado.`);
    return { message: 'Producto eliminado correctamente' };
  }
}
