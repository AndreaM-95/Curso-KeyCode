import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Injectable()
export class AuthService {
  //Inyectamos los usuarios dando el acceso a la base de datos
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateUserDTO) {
    const hashedPassword = await bcrypt.hash(data.password, 10); //Encriptar la contraseña, dará 10 vueltas
    const userCreated = this.userRepo.create({ //Crear el usuario con la contraseña encriptada
      ...data,
      password: hashedPassword,
    });
    await this.userRepo.save(userCreated); //Guardar el usuario en la base de datos
    return {
      message: 'Usuario registrado con exito',
      user: { id: userCreated.id, email: userCreated.email },
    };
  }

  async login(data: LoginDTO) {
    //Le paso el dato y él internamente busca el usuario
    const user = await this.userRepo.findOne({
      where: { email: data.email },
    });

    //Si no existe el usuario o la contraseña es incorrecta
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas'); //Siempre es mejor un mensaje genérico por seguridad
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password); //Compara la contraseña en texto plano con la encriptada
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payloadToken = { sub: user.id, name: user.name, email: user.email, role: user.role }; //Body del token JWT
    const tokenJWT = await this.jwtService.signAsync(payloadToken); //Genera el token JWT

    return { accessToken: tokenJWT };
  }
}
