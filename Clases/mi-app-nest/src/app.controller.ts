import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//Este controlador es el que tiene las rutas HTTP (los endpoints)
@Controller() // Es un decorador que define que esta clase es un controlador
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Endpoint de ruta localhost:3000/ que me responde un Hola Mundo
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //Endpoint de ruta localhost:3000/status que me responde el estado de mi app
  @Get('status')
  getStatus() {
    //Va a ejecutar la lógica que me provee el servicio
    return this.appService.getStatus(); //Me va a devolver de mi servicio la función getStatus
  }
}
