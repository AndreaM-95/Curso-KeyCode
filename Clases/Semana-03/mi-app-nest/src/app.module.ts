import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

//El módulo raíz. Él va a agrupar todos los imports todos los controladores y todos los proveedores.
//@Module Es un decorador que define que esta clase es un módulo
@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
