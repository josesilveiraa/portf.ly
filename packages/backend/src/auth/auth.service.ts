import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, providedPassword: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    const validPassword = await bcrypt.compare(providedPassword, user.password);

    if (!validPassword) return null;

    const { password, ...result } = user;

    return result;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
