import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Validar usuario y contraseña
  async validateUser(user_name: string, pass: string): Promise<User> {
    const user = await this.usersService.findByUsername(user_name);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const passwordOk = await bcrypt.compare(pass, user.password);
    if (!passwordOk) throw new UnauthorizedException('Credenciales inválidas');

    return user;
  }

  // Generar el JWT
  async login(user: User) {
    const payload = {
      username: user.user_name,
      sub: user.id,
      roles: user.roles?.map((r) => r.name) || [], // nombres de los roles
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
