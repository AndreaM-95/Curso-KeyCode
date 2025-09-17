import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Este es nuestro punto de entrada a la aplicacion
//Este archivo es el que crea el proyecto y lo despliega en el puerto 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); //Si no existe la variable de entorno PORT, usa el puerto 3000
}
bootstrap();
