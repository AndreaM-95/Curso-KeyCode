import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//Este controlador es el que tiene las rutas HTTP (los endpoints)
@Controller() // Es un decorador que define que esta clase es un controlador
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //Dentro de los paréntesis va la ruta, como no la tiene es como si fuera "/" o http://localhost:3000/
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status') //Dentro de los paréntesis va la ruta, un ejemplo es http://localhost:3000/status
  getStatus() {
    //Va a ejecutar la lógica que me provee el servicio
    return this.appService.getStatus(); //Me va a devolver de mi servicio la función getStatus
  }
}
