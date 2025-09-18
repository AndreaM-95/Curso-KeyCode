import { Injectable, NotFoundException } from '@nestjs/common';

export type IProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
};

@Injectable()
export class ProductsService {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'Hamburguesa',
      description: 'pan, lechuga, tomate, carne, queso y cebolla',
      price: 10000,
    },
    {
      id: 2,
      name: 'Perro',
      description: 'pan, salchicha, cebolla, mostaza y ketchup',
      price: 10000,
    },
    {
      id: 3,
      name: 'Pizza',
      description: 'salsa de tomate, queso y pepperoni',
      price: 20000,
    },
  ];

  //Me devuelve todos los productos
  findAll(): IProduct[] {
    return this.products;
  }

  //Me devuelve un producto por su nombre
  findByName(name: string): IProduct {
    const normalizedName = name.trim().toLocaleLowerCase('es-CO'); //Va a eliminar los espacios en blanco y va a convertir el nombre a minusculas según la locación del usuario
    const productFind = this.products.find(
      (product) => product.name.toLocaleLowerCase('es-CO') === normalizedName,
    );
    if (!productFind) throw new NotFoundException('Producto no encontrado');
    return productFind;
  }

  //Este método crea un nuevo producto, le asignamos manualmente el ID en orden secuencial y creamos un nuevo producto
  //Tengo un tipo IProduct pero indico que omita el ID
  createProduct(product: Omit<IProduct, 'id'>): IProduct {
    // generar un nuevo id
    const newId =
      this.products.length > 0 //Pregunta: ¿ya tengo productos en mi arreglo?
        ? this.products[this.products.length - 1].id + 1 // Accedemos directamente al último producto del arreglo con -1 y luego tomar su ID y así sumarle 1
        : 1; //Si no hay productos, el ID va a ser 1

    const newProduct: IProduct = {
      id: newId,
      ...product,
    };

    this.products.push(newProduct);
    return newProduct;
  }
}
