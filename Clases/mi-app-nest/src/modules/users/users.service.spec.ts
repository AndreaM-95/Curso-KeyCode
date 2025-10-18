import { NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt';

const usersFake = [
    { id: 1, name: 'Jefferson', email: 'jf@gmail.com', role: 'admin', password: 'hashedpassword1' },
    { id: 2, name: 'Orlando', email: 'or@gmail.com', role: 'user', password: 'hashedpassword2' },
]

jest.mock('bcrypt');

describe('UsersService', () => {
    
    let service: UsersService; //Service es de tipo UsersService. Decimos que se comporte como si fuera el original
    let fakeRepo; //Repositorio falso
    
    //Antes de cada test
    beforeEach(() =>{
        jest.clearAllMocks(); //Limpiamos los mocks antes de cada test
        fakeRepo = {
            find: jest.fn().mockResolvedValue(usersFake), //Simula que devuelve un array con todos los usuarios
            findOne: jest.fn().mockResolvedValue(usersFake),
            create: jest.fn().mockResolvedValue(usersFake),
            save: jest.fn().mockResolvedValue(usersFake),
            update: jest.fn().mockResolvedValue(usersFake),
            delete: jest.fn().mockResolvedValue(usersFake),
        }
        service = new UsersService(fakeRepo as any); //El servicio es una nueva instancia del servicio original pero con el repositorio falso
    });

    it('Debería devolver todos los usuarios', async () => { 
        const users = await service.findAll(); //Llamamos al método findAll
        expect(users.length).toBeGreaterThan(0); //Esperamos que devuelva más de 0 usuarios
        expect(fakeRepo.find).toHaveBeenCalled(); //Esperamos que se haya llamado al método find del repositorio falso
    });

    it('Debería devolver un usuario por su id', async () => {
        fakeRepo.findOne.mockResolvedValue(usersFake[0]); //Simula que devuelve el primer usuario
        const result = await service.findOne(1); //Llamamos al método findOne con id 1
        expect(result.email).toEqual('jf@gmail.com'); //Esperamos que el email del usuario devuelto sea igual al del primer usuario
    });

    it('Deberia lanzar NotFoundException si el usuario no existe', async () => {
        fakeRepo.findOne.mockResolvedValue(null); //Simula que no encuentra ningún usuario
        await expect(service.findOne(3)).rejects.toThrow(NotFoundException); //Esperamos que lance una excepción
    });

    it('Debería crear un usuario', async () => {
        const newUserMock = { name: 'Camilo', email: 'ca@gmail.com', rol: 'admin', password: 'hashedpassword3' }
        fakeRepo.save.mockResolvedValue({ id: 3, ...newUserMock }); //Simula que devuelve el nuevo usuario (Se simula que se creo primero y luego se guarda)
        const result = await service.create(newUserMock as any); //Llamamos al método create con el nuevo usuario 
        expect(result.id).toBe(3); //Esperamos que el id del usuario devuelto sea 3
    });

    it('Deberia actualizar un usuario', async () => {
        const updatedUser = { id: 1, name: 'Jefferson Dev', role: "admin" }
        fakeRepo.update.mockResolvedValue({ affected: 1 })
        fakeRepo.findOne.mockResolvedValue(updatedUser)

        const result = await service.update(1, { name: 'Jefferson Dev', role: "admin" })
        expect(fakeRepo.update).toHaveBeenCalledWith(1, { name: 'Jefferson Dev', role: "admin" })
        expect(result.name).toEqual('Jefferson Dev')
    })

    it('Deberia actualizar un usuario y encriptar la nueva contraseña', async () => {
        const updatedUser = { id: 1, name: 'Jefferson Dev', role: "admin", password: 'newpass' };
        (bcrypt.hash as jest.Mock).mockResolvedValue('new_hashed_password');
        fakeRepo.update.mockResolvedValue({ affected: 1 })
        fakeRepo.findOne.mockResolvedValue({ ...updatedUser, password: 'new_hashed_password' })

        const result = await service.update(1, updatedUser as any)
        expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 10)
        expect(fakeRepo.update).toHaveBeenCalledWith(1, { ...updatedUser, password: 'new_hashed_password' })
        expect(result.password).toBe('new_hashed_password')
    })

    it('Deberia eliminar un usuario', async () => {
        fakeRepo.delete.mockResolvedValue({ affected: 1 })
        const result = await service.remove(1)
        expect(fakeRepo.delete).toHaveBeenCalledWith(1)
        expect(result).toEqual({ message: `Usuario eliminado correctamente` })
    })
});