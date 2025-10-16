import { HttpException, HttpStatus } from "@nestjs/common";

export class BussinessException extends HttpException{
   constructor( message: string) { //Me va a esperar un mensaje
      // Super: accede al padre. 
      // De nuestra excepción personalizada, quiero modificar solo el mensaje y el status.
      // Llamo al constructor de HttpException y le paso el mensaje y el status 400
    super({ error: 'Bussiness Error', message }, HttpStatus.BAD_REQUEST); 
   }
}