import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  //Inyectamos los usuarios dando el acceso a la base de datos
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(data: LoginDTO) {
    //Le paso el dato y él internamente busca el usuario
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    //Si no existe el usuario o la contraseña es incorrecta
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas'); //Siempre es mejor un mensaje genérico por seguridad
    }

    const isPasswordValid = data.password === user.password; //Validación simple para el ejemplo
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    //Si todo está bien, retorno el usuario (sin la contraseña) y un token falso
    //El token es solo un string que contiene el id del usuario y la fecha actual
    //En una aplicación real, aquí generaría un JWT o algún otro tipo de token
    return {
      user: { id: user.id, name: user.name, email: user.email, age: user.age },
      accessToken: `fake-token-${user.id}-${Date.now()}`,
    };
  }
}
