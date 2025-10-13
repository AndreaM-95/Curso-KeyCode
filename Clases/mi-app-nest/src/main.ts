import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//Este es nuestro punto de entrada a la aplicacion
//Este archivo es el que crea el proyecto y lo despliega en el puerto 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Habilitar la validación global y usará mis validaciones también
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true, //Nos permite que nuestros pipes transformen los datos
    transformOptions: { enableImplicitConversion: true } //Nos permite hacer conversiones implícitas (como de string a number con ParseIntPipe)
  }))
  
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`App running on: http://localhost:${port}`);
}
bootstrap();
