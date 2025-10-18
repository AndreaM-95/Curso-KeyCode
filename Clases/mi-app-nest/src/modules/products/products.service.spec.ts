import { NotFoundException } from "@nestjs/common";
import { ProductsService } from "./products.service"

const mockProducts = [
    { id: 1, nameProduct: "Lomo de cerdo", description: "Carne de cerdo", price: 13000,  category: "carnes", imageUrl: "http://example.com/lomo.jpg", isAvailable: true },
    { id: 2, nameProduct: "Leche", description: "Entera x 900ml", price: 11000,  category: "lacteos", imageUrl: "http://example.com/leche.jpg", isAvailable: false }
]

/**
 * A: Arrange - Organizar
 * A: Act - Actuar
 * A: Assert - Afirmar
 */

describe('ProductService', () => {
    let service: ProductsService;
    let fakeRepo: any;

    beforeEach(() => {
        jest.clearAllMocks();

        fakeRepo = {
            find: jest.fn(),
            findOne: jest.fn(),
            findBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
        }

        service = new ProductsService(fakeRepo)
    })

    it('Deberia retornar todos los productos', async () => {
        fakeRepo.find.mockResolvedValue(mockProducts)
        const result = await service.findAll();

        expect(fakeRepo.find).toHaveBeenCalled()
        expect(result[0].nameProduct).toEqual("Lomo de cerdo")
        expect(result[1].nameProduct).toEqual("Leche")
    })

    it('Deberia retornar los productos activos', async () => {
        fakeRepo.findBy.mockResolvedValue(mockProducts.filter(product => product.isAvailable));
        const result = await service.findAvailable();

        expect(fakeRepo.findBy).toHaveBeenCalledWith({ isAvailable: true })
    })

    it('Deberia retornar un producto por ID', async () => {
        //Organizar
        fakeRepo.findOne.mockResolvedValue(mockProducts[0])
        //Actuar
        const result = await service.findOne(1)
        //Afirmar
        expect(fakeRepo.findOne).toHaveBeenLastCalledWith({ where: { id: 1 } })
        expect(result.nameProduct).toEqual("Lomo de cerdo")
    })

    it('Deberia lanzar una excepcion si no encuentra el producto', async () => {
        //Organizar
        fakeRepo.findOne.mockResolvedValue(null)
        //Actuar
        //Afirmar
        await expect(service.findOne(99)).rejects.toThrow(NotFoundException)
        //Afirmar
        expect(fakeRepo.findOne).toHaveBeenLastCalledWith({ where: { id: 99 } })
    })

    it('Deberia retornar un producto por name', async () => {
        //Organizar
        fakeRepo.findOne.mockResolvedValue(mockProducts[1])
        //Actuar
        const result = await service.findByName("Leche")
        //Afirmar
        expect(fakeRepo.findOne).toHaveBeenLastCalledWith({ where: { nameProduct: "Leche" } })
        expect(result?.price).toBe(11000)
    })

    it('Deberia crear un producto correctamente', async () => {
        const newProduct = { nameProduct: 'Zanahorias', description: 'Kilo', price: 2000, category: 'verduras', imageUrl: 'http://example.com/zanahorias.jpg'}
        const savedProduct = { id: 3, isAvailable: true, ...newProduct }

        fakeRepo.create.mockReturnValue(newProduct)
        fakeRepo.save.mockResolvedValue(savedProduct)

        const result = await service.createProduct(newProduct as any)

        expect(fakeRepo.create).toHaveBeenCalledWith(newProduct)
        expect(fakeRepo.save).toHaveBeenCalledWith(newProduct)
        expect(result).toEqual(savedProduct)
    })

    it('Deberia actualzar un producto y retornar el producto actualizado', async () => {
        const updateData = { nameProduct: 'Lomo de cerdo', price: 18000 }
        const updatedData = { id: 1, isAvailable: true, ...updateData }

        fakeRepo.update.mockResolvedValue({ affected: 1 })
        fakeRepo.findOne.mockResolvedValue(updatedData)

        const result = await service.updateProduct(1, updateData);

        expect(fakeRepo.update).toHaveBeenCalledWith(1, updateData)
        expect(result).toEqual(updatedData)
    })

    it('Deberia desactivar un producto correctamente', async () => {
        const product = { id: 2, nameProduct: 'Leche', isAvailable: false };

        fakeRepo.findOne.mockResolvedValue(product);
        fakeRepo.save.mockResolvedValue({ ...product, isAvailable: true })

        const result = await service.disabled(2)

        expect(fakeRepo.findOne).toHaveBeenCalledWith({ where: { id: 2 } })
        expect(fakeRepo.save).toHaveBeenCalledWith({ ...product, isAvailable: false })
        expect(result).toEqual({
            message: `Producto 2 desactivado correctamente`,
            productFind: { ...product, isAvailable: false }
        })
    })
})