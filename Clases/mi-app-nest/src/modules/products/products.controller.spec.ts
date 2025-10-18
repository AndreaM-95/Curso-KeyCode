import { RolesEnum } from "src/entities/user.entity"
import { CategoryEnum } from "src/entities/product.entity"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"
import { NotFoundException } from "@nestjs/common"

const usersFake = [
    { id: 1, name: "Jefferson", email: "jp@gmail.com", password: '123123', role: RolesEnum.ADMIN },
    { id: 2, name: "Pulido", email: "pulido@gmail.com", password: '123123', role: RolesEnum.ADMIN }
]

const mockProducts = [
    { id: 1, nameProduct: "Lomo de cerdo", description: "Carne de cerdo", price: 13000,  category: CategoryEnum.CARNES, imageUrl: "http://example.com/lomo.jpg", isAvailable: true },
    { id: 2, nameProduct: "Leche", description: "Entera x 900ml", price: 11000,  category: CategoryEnum.LACTEOS, imageUrl: "http://example.com/leche.jpg", isAvailable: false }
]

describe('ProductsController', () => {
    let controller: ProductsController
    let service: jest.Mocked<ProductsService>

    beforeEach(() => {
        service = {
            findAll: jest.fn(),
            findAvailable: jest.fn(),
            findOne: jest.fn(),
            findByName: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
        } as any

        controller = new ProductsController(service)
    })

    it('Debería devolver todos los productos', async()=>{
        //Organizar
        service.findAll.mockResolvedValue(mockProducts)
        //Actuar
        const products = await controller.findAll();
        //Afirmar
        expect(products.length).toBeGreaterThan(0);
    })

    it('Debería devolver todos los productos disponibles', async () =>{
        service.findAvailable.mockResolvedValue(mockProducts)
        const prodAvailable = await controller.findAvailable()
        expect(prodAvailable.length).toBeGreaterThan(0);
        expect(mockProducts[0].isAvailable).toEqual(true)
    })

    it('Debería retornar un producto por id', async()=>{
        service.findOne.mockResolvedValue(mockProducts[0])
        const result = await controller.findOne(1)
        expect(result.nameProduct).toEqual('Lomo de cerdo')
    })

    it('Debería retornar un producto por su nombre', async()=>{
        service.findByName.mockResolvedValue(mockProducts[1])
        const result = await controller.findByName("Leche")
        expect(result.nameProduct).toEqual('Leche')
    })
})